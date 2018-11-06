import fs from 'fs';
import os from 'os';
import path from 'path';
import util from 'util';
import proc from 'process';
import mri from 'mri';
import JSTransformer from 'jstransformer';
import transformer from 'jstransformer-jstransformer';
import fastGlob from 'fast-glob';
import arrayify from 'arrify';
import objectAssign from 'mixin-deep';
import { __dirname } from './cjs-globals';
import makeDefaults from './defaults';

const jstransformer = JSTransformer(transformer);

async function charlike(settings = {}) {
  const proj = settings.project;

  if (!proj || (proj && typeof proj !== 'object')) {
    throw new TypeError('expect `settings.project` to be an object');
  }

  const options = makeDefaults(settings);
  const { project, templates } = options;

  const cfgDir = path.join(os.homedir(), '.config', 'charlike');
  const tplDir = path.join(cfgDir, 'templates');
  const templatesDir = templates ? path.resolve(templates) : null;

  if (templatesDir && fs.existsSync(templatesDir)) {
    project.templates = templatesDir;
  } else if (fs.existsSync(cfgDir) && fs.existsSync(tplDir)) {
    project.templates = tplDir;
  } else {
    project.templates = path.join(path.dirname(__dirname), 'templates');
  }

  if (!fs.existsSync(project.templates)) {
    throw new Error(`source templates folder not exist: ${project.templates}`);
  }

  const locals = objectAssign({}, options.locals, { project });

  const stream = fastGlob.stream('**/*', {
    cwd: project.templates,
    ignore: arrayify(null),
  });

  return new Promise((resolve, reject) => {
    stream.on('error', reject);
    stream.on('end', () => {
      // Note: Seems to be called before really write to the destination directory.
      // Stream are still fucking shit even in Node v10.
      // Feels like nothing happend since v0.10.
      // For proof, `process.exit` from inside the `.then` in the CLI,
      // it will end/close the program before even create the dest folder.
      // One more proof: put one console.log in stream.on('data')
      // and you will see that it still outputs even after calling the resolve()
      resolve({ locals, project });
    });
    stream.on('data', async (filepath) => {
      try {
        const tplFilepath = path.join(project.templates, filepath);
        const { body } = await jstransformer.renderFileAsync(
          tplFilepath,
          { engine: options.engine },
          locals,
        );

        const newFilepath = path
          .join(project.dest, filepath)
          .replace('_circleci', '.circleci');

        const basename = path
          .basename(newFilepath)
          .replace(/^__/, '')
          .replace(/^\$/, '')
          .replace(/^_/, '.');

        const fp = path.join(path.dirname(newFilepath), basename);
        const fpDirname = path.dirname(fp);

        if (!fs.existsSync(fpDirname)) {
          await util.promisify(fs.mkdir)(fpDirname);
        }

        await util.promisify(fs.writeFile)(fp, body);
      } catch (err) {
        reject(err);
      }
    });
  });
}

charlike.cli = async (showHelp, procArgv = [], { pkg = {}, isUpdate } = {}) => {
  const argv = mri(procArgv, {
    alias: {
      v: 'version',
      h: 'help',
      'project.name': ['n', 'name'],
      'project.owner': ['o', 'owner'],
      'project.description': ['d', 'desc', 'description'],
      t: 'templates',
    },
  });

  if (argv.help) {
    showHelp(0);
    return null;
  }

  if (argv.version) {
    console.log(pkg.version);
    proc.exit(0);
    return null;
  }

  argv.name = argv._[0] || argv.name;

  if (!argv.name && !isUpdate) {
    console.error('At least project name is required.');
    showHelp(1);
    return null;
  }

  argv.project = Object.assign({}, argv.project);

  return argv;
};

export default charlike;

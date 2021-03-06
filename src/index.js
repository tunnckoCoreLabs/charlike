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

/**
 * Generates a complete project using a set of templates.
 *
 * You can define what _"templates"_ files to be used
 * by passing `settings.templates`, by default it uses [./templates](./templates)
 * folder from this repository root.
 *
 * You can define project metadata in `settings.project` object, which should contain
 * `name`, `description` properties and also can contain `repo` and `dest`.
 * By default the destination folder is dynamically built from `settings.cwd` and `settings.project.name`,
 * but this behavior can be changed. If `settings.project.repo` is passed, then it will be used
 * instead of the `settings.project.name`.
 *
 * To control the context of the templates, pass `settings.locals`. The default set of locals
 * includes `version` string and `project`, `author` and `license` objects.
 *
 * @example
 * import charlike from 'charlike';
 *
 * const settings = {
 *   project: { name: 'foobar', description: 'Awesome project' },
 *   cwd: '/home/charlike/code',
 *   templates: '/home/charlike/config/.jsproject',
 *   locals: {
 *     foo: 'bar',
 *     // some helper
 *     toUpperCase: (val) => val.toUpperCase(),
 *   },
 * };
 *
 * // the `dest` will be `/home/charlike/code/foobar`
 * charlike(settings)
 *   .then(({ dest }) => console.log(`Project generated to ${dest}`))
 *   .catch((err) => console.error(`Error occures: ${err.message}; Sorry!`));
 *
 *
 * @name   charlike
 * @param  {object} settings the only required is `project` which should be an object
 * @param  {object} settings.cwd working directory to create project to, defaults to `process.cwd()`
 * @param  {object} settings.project should contain `name`, `description`, `repo` and `dest`
 * @param  {object} settings.locals to pass more context to template files
 * @param  {string} settings.engine for different template engine to be used in template files, default is `lodash`
 * @return {Promise<object>} if successful, will resolve to object like `{ locals, project, dest, options }`
 * @public
 */
async function charlike(settings = {}) {
  const proj = settings.project;

  if (!proj || (proj && typeof proj !== 'object')) {
    throw new TypeError('expect `settings.project` to be an object');
  }

  const options = await makeDefaults(settings);
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
      // Note: Seems to be called before really write to the optionsination directory.
      // Stream are still fucking shit even in Node v10.
      // Feels like nothing happend since v0.10.
      // For proof, `process.exit` from inside the `.then` in the CLI,
      // it will end/close the program before even create the options folder.
      // One more proof: put one console.log in stream.on('data')
      // and you will see that it still outputs even after calling the resolve()
      resolve({ locals, project, dest: options.dest, options });
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
          .join(options.dest, filepath)
          .replace('_circleci', '.circleci')
          .replace('_github', '.github');

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

charlike.cli = async (showHelp, procArgv = [], opts) => {
  const options = objectAssign({ isUpdate: false }, opts);
  const argv = mri(
    procArgv,
    objectAssign(
      {
        alias: {
          v: 'version',
          h: 'help',
          'locals.license.year': 'ly',
          'locals.license.name': 'ln',
          'project.name': ['n', 'name'],
          'project.owner': ['o', 'owner'],
          'project.description': ['d', 'desc', 'description'],
          t: 'templates',
        },
      },
      options,
    ),
  );

  if (argv.help) {
    showHelp(0);
    return null;
  }

  if (argv.version) {
    console.log(options.pkg.version);
    proc.exit(0);
    return null;
  }

  argv.name = argv._[0] || argv.name;

  if (!argv.name && !options.isUpdate) {
    console.error('At least project name is required.');
    showHelp(1);
    return null;
  }

  argv.project = Object.assign({}, argv.project);

  return argv;
};

export default charlike;

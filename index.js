/*!
 * charlike <https://github.com/tunnckoCore/charlike>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (http://i.am.charlike.online)
 * Released under the MIT license.
 */

/* eslint-disable import/no-commonjs, import/no-nodejs-modules */

const fs = require('fs');
const path = require('path');
const camelcase = require('camelcase');
const dateformat = require('dateformat');
const streamCopyDir = require('stream-copy-dir');
const JSTransformer = require('jstransformer');
const transformer = JSTransformer(require('jstransformer-jstransformer'));

const copyFolder = (src, dest, plugin) =>
  new Promise((resolve, reject) => {
    if (fs.existsSync(src)) {
      streamCopyDir(src, dest, plugin)
        .once('error', reject)
        .on('finish', resolve);
    } else {
      resolve();
    }
  });

const readFile = (fp) =>
  new Promise((resolve, reject) => {
    fs.readFile(fp, 'utf8', (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });

/**
 * > Scaffolds project with `name` and `desc` by
 * creating folder with `name` to some folder.
 * By default it generates folder with `name` to current
 * working directory (or `options.cwd`).
 * You can also define what _"templates"_ files to be used
 * by passing `options.templates`, by default it uses [./templates](./templates)
 * folder from this repository root.
 *
 * ```js
 * const charlike = require('charlike')
 * const opts = {
 *   cwd: '/home/charlike/code',
 *   templates: '/home/charlike/config/.jsproject',
 *   locals: {
 *     foo: 'bar',
 *     // some helper
 *     toUpperCase: (val) => val.toUpperCase()
 *   }
 * }
 *
 * charlike('my-awesome-project', 'some cool description here', opts)
 *   .then((dest) => console.log(`Project generated to ${dest}`))
 *   .catch((err) => console.error(`Error occures: ${err.message}; Sorry!`))
 * ```
 *
 * @name   charlike
 * @param  {String} `<name>` project name
 * @param  {String} `<desc>` project description
 * @param  {Object} `[options]` use `options.locals` to pass more context to template files,
 *                              use `options.engine` for different template engine to be used
 *                              in template files, or pass `options.render` function
 *                              to use your favorite engine
 * @return {Promise} if successful, resolved promise with absolute path to the project
 * @api public
 */

module.exports = async function charlike(name, desc, options) {
  if (typeof name !== 'string') {
    throw new TypeError('charlike: expect `name` to be string');
  }
  if (typeof desc !== 'string') {
    throw new TypeError('charlike: expect `desc` to be string');
  }
  const opts = options && typeof options === 'object' ? options : {};
  const cwd = typeof opts.cwd === 'string' ? path.resolve(opts.cwd) : process.cwd();

  const localPkg = path.join(cwd, 'package.json');

  let pkg = {};
  if (fs.existsSync(localPkg)) {
    const promise = readFile(localPkg);
    pkg = await promise.then(JSON.parse);
  }

  const srcPath =
    typeof opts.templates === 'string'
      ? path.resolve(cwd, opts.templates)
      : path.resolve(__dirname, 'templates');

  const destPath = path.join(cwd, name);
  const joined = (x) => ({
    src: path.join(srcPath, x),
    dest: path.join(destPath, x),
  });
  const makeArgs = (x) => [pkg, joined(x), { name, desc, opts }];

  const copySrc = () => copy(...makeArgs('src'));
  const copyTest = () => copy(...makeArgs('test'));
  const copyCircle = () => copy(...makeArgs('.circleci'));

  return copySrc()
    .then(copyTest)
    .then(copyCircle)
    .then(() => {
      const opt = { name, desc, opts };
      return copy(pkg, { src: srcPath, dest: destPath }, opt);
    });
};

function copy(pkg, { src, dest }, { name, desc, opts }) {
  return new Promise((resolve, reject) => {
    const plugin = (file, cb) => {
      // convert templates names to normal names
      file.basename = file.basename.replace(/^_/, '.').replace(/^\$/, ''); // eslint-disable-line

      /**
       * Common helper functions passed
       * as locals to the template engine.
       *
       * - dateformat
       * - camelcase
       * - uppercase
       * - lowercase
       * - ucfirst
       *
       * @type {Object}
       */

      const helpers = {
        date: dateformat,
        camelcase,
        toCamelCase: camelcase,
        toUpperCase: (val) => val.toUpperCase(),
        toLowerCase: (val) => val.toLowerCase(),
        ucFirst: (val) => val.charAt(0).toUpperCase() + val.slice(1),
      };

      /**
       * Minimum basic locals
       * for template engne.
       *
       * @type {Object}
       */

      const author = {
        url: 'https://i.am.charlike.online',
        realname: 'Charlike Mike Reagent',
        username: 'tunnckoCore',
      };

      const locals = Object.assign(
        {
          pkg,
          name,
          description: desc,
          owner: author.username,
          author: 'Charlike Mike Reagent <olsten.larck@gmail.com>',
        },
        helpers,
        opts.locals || {},
      );

      const repo = `${locals.owner}/${locals.name}`;
      locals.repository = locals.repository ? locals.repository : repo;
      locals.varname = camelcase(locals.name);

      const input = file.contents.toString();

      if (typeof opts.render === 'function') {
        file.contents = Buffer.from(opts.render(input, locals)); // eslint-disable-line
        cb(null, file);
        return;
      }

      opts.engine = typeof opts.engine === 'string' ? opts.engine : 'j140';
      const result = transformer.render(input, opts, locals);

      file.contents = Buffer.from(result.body); // eslint-disable-line
      cb(null, file);
    };

    copyFolder(src, dest, plugin)
      .catch(reject)
      .then(() => resolve(dest));
  });
}

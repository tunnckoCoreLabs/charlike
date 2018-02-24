/**
 * @copyright 2016-present, Charlike Mike Reagent <olsten.larck@gmail.com>
 * @license Apache-2.0
 */

/* eslint-disable import/no-nodejs-modules */

import fs from 'fs';
import path from 'path';
import proc from 'process';
import resolve from 'resolve';
import copy from './utils';

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
 * import charlike from 'charlike';
 *
 * const opts = {
 *   cwd: '/home/charlike/code',
 *   templates: '/home/charlike/config/.jsproject',
 *   locals: {
 *     foo: 'bar',
 *     // some helper
 *     toUpperCase: (val) => val.toUpperCase(),
 *   },
 * };
 *
 * charlike('my-awesome-project', 'some cool description here', opts)
 *   .then((dest) => console.log(`Project generated to ${dest}`))
 *   .catch((err) => console.error(`Error occures: ${err.message}; Sorry!`));
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

export default async function charlike(name, desc, options) {
  if (typeof name !== 'string') {
    throw new TypeError('charlike: expect `name` to be string');
  }
  if (typeof desc !== 'string') {
    throw new TypeError('charlike: expect `desc` to be string');
  }
  const opts = options && typeof options === 'object' ? options : {};
  const cwd = typeof opts.cwd === 'string' ? path.resolve(opts.cwd) : proc.cwd();

  let srcPath = null;
  if (typeof opts.templates === 'string') {
    srcPath = path.resolve(opts.templates);
  } else {
    const selfPath = resolve.sync('..'); // should work?
    const dirname = path.dirname(path.dirname(selfPath));
    srcPath = path.join(dirname, 'templates');
  }

  if (!fs.existsSync(srcPath)) {
    throw new Error('charlike: source templates directory not found');
  }

  const destPath = path.join(cwd, name);
  const joined = (x) => ({
    src: path.join(srcPath, x),
    dest: path.join(destPath, x),
  });
  const makeArgs = (x) => [joined(x), { name, desc, opts }];

  const copySrc = () => copy(...makeArgs('src'));

  return copySrc()
    .then(() => copy(...makeArgs('test')))
    .then(() => copy(...makeArgs('.circleci')))
    .then(() => {
      const opt = { name, desc, opts };
      return copy({ src: srcPath, dest: destPath }, opt);
    })
    .then(() => destPath);
}

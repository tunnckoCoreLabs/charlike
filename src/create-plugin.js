/**
 * @copyright 2016-present, Charlike Mike Reagent <olsten.larck@gmail.com>
 * @license Apache-2.0
 */

import camelcase from 'camelcase';
import dateformat from 'dateformat';
import JSTransformer from 'jstransformer';
import jstransformer from 'jstransformer-jstransformer';

const transformer = JSTransformer(jstransformer);

/**
 * Creates and returns plugin function that
 * later is passed directly to `stream-copy-dir`.
 *
 * @param {string} name
 * @param {string} desc
 * @param {obect} opts
 * @returns Function
 * @private
 */
export default function createPlugin(name, desc, opts) {
  return function plugin(file, cb) {
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
      camelCase: camelcase,
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
      url: 'https://tunnckocore.com',
      name: 'Charlike Mike Reagent',
      email: 'mameto2011@gmail.com',
      twitter: 'tunnckoCore',
      username: 'tunnckoCore',
    };

    const locals = Object.assign(
      {
        name: opts.pkgName,
        pkgName: name,
        author,
      },
      helpers,
      opts.locals || {},
    );

    const repo = `${locals.owner}/${locals.name}`;
    locals.repository = locals.repository ? locals.repository : repo;
    locals.varname = camelcase(locals.name);

    const input = file.contents.toString();

    if (typeof opts.render === 'function') {
      file.contents = Buffer.from(opts.render(input, locals, file)); // eslint-disable-line
      cb(null, file);
      return;
    }

    opts.engine = typeof opts.engine === 'string' ? opts.engine : 'j140';
    const result = transformer.render(input, opts, locals);

    file.contents = Buffer.from(result.body); // eslint-disable-line
    cb(null, file);
  };
}

import camelcase from 'camelcase';
import dateformat from 'dateformat';
import JSTransformer from 'jstransformer';
import jstransformer from 'jstransformer-jstransformer';
import gitName from 'git-user-name';
import gitEmail from 'git-user-email';
import { gitUsername } from './utils';

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
export default function createPlugin(settings) {
  settings = Object.assign({ opts: {} }, settings); // eslint-disable-line no-param-reassign
  return function plugin(file, cb) {
    // convert templates names to normal names

    // eslint-disable-next-line no-param-reassign
    file.basename = file.basename
      .replace(/^___/, '')
      .replace(/^_/, '.')
      .replace(/^\$/, '');

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
      name: gitName(),
      email: gitEmail() || 'mameto2011@gmail.com',
      twitter: 'tunnckoCore',
      username: gitUsername(),
      login: gitUsername(),
      avatar: 'https://avatars3.githubusercontent.com/u/5038030?v=4',
    };

    const { opts } = settings;
    const locals = Object.assign(
      {
        name: settings.pkgName,
        pkgName: settings.name,
        repo: settings.name,
        desc: settings.desc,
        description: settings.desc,
        licenseStart: opts.licenseStart || dateformat('yyyy'),
        author,
      },
      helpers,
      opts.locals || {},
    );
    locals.owner = opts.owner || locals.owner || locals.author.username;

    locals.deps = locals.deps || JSON.stringify({ esm: '^3.0.84' }, null, 2);
    locals.devDeps =
      locals.devDeps ||
      JSON.stringify(
        {
          '@tunnckocore/config': '^0.5.1',
          '@tunnckocore/scripts': '^1.0.1',
          asia: '^0.19.7',
        },
        null,
        2,
      );

    const repo = `${locals.owner}/${locals.name}`;
    locals.repository = locals.repository ? locals.repository : repo;
    locals.varname = camelcase(locals.name);

    const input = file.contents.toString();

    if (typeof opts.render === 'function') {
      // eslint-disable-next-line no-param-reassign
      file.contents = Buffer.from(opts.render(input, locals, file));
      cb(null, file);
      return;
    }

    opts.engine = typeof opts.engine === 'string' ? opts.engine : 'j140';
    const result = transformer.render(input, opts, locals);

    // eslint-disable-next-line no-param-reassign
    file.contents = Buffer.from(result.body);
    cb(null, file);
  };
}

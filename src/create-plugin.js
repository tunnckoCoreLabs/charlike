import camelcase from 'camelcase';
import dateformat from 'dateformat';
import JSTransformer from 'jstransformer';
import jstransformer from 'jstransformer-jstransformer';
import gitName from 'git-user-name';
import gitEmail from 'git-user-email';
import packageJson from '@tunnckocore/package-json';
import { gitUsername } from './utils';

const transformer = JSTransformer(jstransformer);

/* eslint-disable promise/always-return */

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
export default async function createPlugin(settings) {
  // eslint-disable-next-line no-param-reassign
  settings = Object.assign({ opts: {} }, settings);

  let pkg = null;
  try {
    pkg = await packageJson(settings.pkgName);
  } catch (err) {
    if (err.response && err.response.status === 404) {
      pkg = {};
    } else {
      // Probably not needed.
    }
  }

  return function plugin(file, cb) {
    fn({ pkg, file, settings, cb });
  };
}

function fn({ pkg, file, settings, cb }) {
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
    // packageJson,
    // getPkg: packageJson,
    // get: (field) => packageJson(settings.pkgName, field),
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
      author,
      pkg,
    },
    helpers,
    opts.locals || {},
  );

  locals.owner = opts.owner || locals.owner || locals.author.username;
  locals.version = locals.version || locals.pkg.version || '0.0.0';
  locals.license = Object.assign(
    {
      name: locals.pkg.license || 'MIT',
      year: locals.pkg.licenseStart,
    },
    locals.license,
  );
  locals.license.year = locals.license.year || dateformat('yyyy');

  locals.deps = locals.deps || JSON.stringify({ esm: '^3.0.84' }, null, 4);
  locals.deps = `${locals.deps.slice(0, -1)}  }`;
  locals.devDeps =
    locals.devDeps ||
    JSON.stringify(
      {
        '@tunnckocore/config': '^0.5.1',
        '@tunnckocore/scripts': '^1.0.1',
        asia: '^0.19.7',
      },
      null,
      4,
    );
  locals.devDeps = `${locals.devDeps.slice(0, -1)}  }`;

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
}

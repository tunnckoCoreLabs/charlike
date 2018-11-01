/**
 * @copyright 2016-present, Charlike Mike Reagent <olsten.larck@gmail.com>
 * @license Apache-2.0
 */

/* eslint-disable import/no-nodejs-modules */

import fs from 'fs';
import streamCopyDir from 'stream-copy-dir';
import createPlugin from './create-plugin';

/**
 * Copy given `src` to `dest` templates which are
 * modified with `createPlugin` and JSTransformer.
 *
 * @param {object} `{ src, dest }`
 * @param {object} `{ name, pkgName, desc, opts }`
 * @returns Promise
 * @private
 */
export default async function copy({ src, dest }, settings) {
  return copyFolder(src, dest, createPlugin(settings));
}

/**
 * Thin promise wrapper around `stream-copy-dir` module.
 *
 * @param {string} src
 * @param {string} dest
 * @param {function} plugin
 * @returns Promise
 * @private
 */
function copyFolder(src, dest, plugin) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(src)) {
      streamCopyDir(src, dest, plugin)
        .once('error', reject)
        .on('finish', resolve);
    } else {
      resolve();
    }
  });
}

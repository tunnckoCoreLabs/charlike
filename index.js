/*!
 * charlike <https://github.com/tunnckoCore/charlike>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (http://i.am.charlike.online)
 * Released under the MIT license.
 */

'use strict'

const fs = require('fs')
const path = require('path')
const exists = require('fs-exists-sync')
const camelcase = require('camelcase')
const dateformat = require('dateformat')
const copyFolder = require('stream-copy-dir')
const JSTransformer = require('jstransformer')
const transformer = JSTransformer(require('jstransformer-jstransformer'))

const readFile = (fp) => new Promise((resolve, reject) => {
  fs.readFile(fp, 'utf8', (err, res) => {
    if (err) return reject(err)
    resolve(res)
  })
})

/**
 * > Scaffolds project with `name` and `desc` by
 * creating folder with `name` to some folder.
 * By default it generates folder with `name` to current
 * working directory (or `options.cwd`).
 * You can also define what _"templates"_ files to be used
 * by passing `options.templates`, by default it uses [./templates](./templates)
 * folder from this repository root.
 *
 * **Example**
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
 * @param  {String} `<name>` project name
 * @param  {String} `<desc>` project description
 * @param  {Object} `[options]` use `options.locals` to pass more context to template files,
 *                              use `options.engine` for different template engine to be used
 *                              in template files, or pass `options.render` function
 *                              to use your favorite engine
 * @return {Promise} if successful, resolved promise with absolute path to the project
 * @api public
 */

module.exports = function charlike (name, desc, options) {
  return new Promise((resolve, reject) => {
    if (typeof name !== 'string') {
      return reject(new TypeError('charlike: expect `name` to be string'))
    }
    if (typeof desc !== 'string') {
      return reject(new TypeError('charlike: expect `desc` to be string'))
    }
    const opts = options && typeof options === 'object' ? options : {}
    const cwd = typeof opts.cwd === 'string'
      ? path.resolve(opts.cwd)
      : process.cwd()

    const localPkg = path.join(cwd, 'package.json')
    const promise = exists(localPkg)
      ? readFile(localPkg).then(JSON.parse)
      : Promise.resolve()

    promise
      .then((pkg) => {
        const src = typeof opts.templates === 'string'
          ? path.resolve(cwd, opts.templates)
          : path.resolve(__dirname, 'templates')

        const dest = path.join(cwd, name)
        const plugin = (file, cb) => {
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
            camelcase: camelcase,
            toCamelCase: camelcase,
            toUpperCase: (val) => val.toUpperCase(),
            toLowerCase: (val) => val.toLowerCase(),
            ucFirst: (val) => {
              return val.charAt(0).toUpperCase() + val.slice(1)
            }
          }

          /**
           * Minimum basic locals
           * for template engne.
           *
           * @type {Object}
           */

          const locals = Object.assign({
            pkg: pkg,
            name: name,
            description: desc,
            owner: 'tunnckoCore',
            author: 'Charlike Mike Reagent <@tunnckoCore> (http://i.am.charlike.online)'
          }, helpers, opts.locals || {})

          locals.repository = locals.repository || `${locals.owner}/${locals.name}`
          locals.varname = camelcase(locals.name)

          const input = file.contents.toString()

          if (typeof opts.render === 'function') {
            file.contents = Buffer.from(opts.render(input, locals))
            cb(null, file)
            return
          }

          opts.engine = typeof opts.engine === 'string' ? opts.engine : 'j140'
          const result = transformer.render(input, opts, locals)

          file.contents = Buffer.from(result.body)
          cb(null, file)
        }

        copyFolder(src, dest, plugin)
          .once('error', reject)
          .once('finish', () => resolve(dest))
      }, reject)
  })
}

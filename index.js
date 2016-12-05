/*!
 * charlike <https://github.com/tunnckoCore/charlike>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (http://i.am.charlike.online)
 * Released under the MIT license.
 */

'use strict'

const fs = require('fs')
const path = require('path')
const render = require('j140').render
const exists = require('fs-exists-sync')
const dateformat = require('dateformat')
const copyFolder = require('stream-copy-dir')

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
 * @param  {Object} `[options]` use `options.locals` to pass more context to template files
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
          : './templates'

        const dest = path.join(cwd, name)
        const plugin = (file, cb) => {
          const context = Object.assign({
            name: name,
            description: desc,
            date: dateformat,
            pkg: pkg,
            owner: 'tunnckoCore',
            author: 'Charlike Mike Reagent <@tunnckoCore> (http://i.am.charlike.online)'
          }, opts.locals || opts)
          context.repository = context.repository || `${context.owner}/${context.name}`
          const template = render(file.contents.toString(), context)

          file.contents = Buffer.from(template)

          cb(null, file)
        }

        copyFolder(src, dest, plugin)
          .once('error', reject)
          .once('finish', () => resolve(dest))
      }, reject)
  })
}

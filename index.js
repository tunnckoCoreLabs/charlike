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
const dateformat = require('dateformat')
const copyFolder = require('stream-copy-dir')

const readFile = (fp) => new Promise((resolve, reject) => {
  fs.readFile(fp, 'utf8', (err, res) => {
    if (err) return reject(err)
    resolve(res)
  })
})

module.exports = (name, desc, options) => new Promise((resolve, reject) => {
  if (typeof name !== 'string') {
    return reject(new TypeError('charlike: expect `name` to be string'))
  }
  if (typeof desc !== 'string') {
    return reject(new TypeError('charlike: expect `desc` to be string'))
  }
  const opts = options && typeof options === 'object' ? options : {}
  const cwd = typeof opts.cwd === 'string' ? opts.cwd : process.cwd()

  readFile(path.resolve(cwd, 'package.json'))
    .then(JSON.parse)
    .then((pkg) => {
      const src = typeof opts.templates === 'string'
        ? path.resolve(cwd, opts.templates)
        : './templates'

      const dest = path.resolve(cwd, name)
      const plugin = (file, cb) => {
        const template = render(file.contents.toString(), Object.assign({
          name: name,
          description: desc,
          date: dateformat,
          pkg: pkg,
          owner: 'tunnckoCore',
          author: 'Charlike Mike Reagent <@tunnckoCore> (http://i.am.charlike.online)'
        }, opts.locals || opts))

        file.contents = Buffer.from(template)

        cb(null, file)
      }

      copyFolder(src, dest, plugin)
        .once('error', reject)
        .once('finish', () => resolve(dest))
    }, reject)
})

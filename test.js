/*!
 * charlike <https://github.com/tunnckoCore/charlike>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (http://i.am.charlike.online)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

const test = require('mukla')
const index = require('./index')

test('charlike', () => {
  return index('./node_modules/yeah-foo-bar', 'quxie bar, that was easy!!!', {
    // templates: '../_xtemplates',
    locals: {
      customFoo: '// oooook hahahah'
    }
  })
})

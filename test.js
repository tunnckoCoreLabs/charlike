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
  return index('yeah-foo-bar', 'quxie hoohy bar desc, that was easy!!!', {
    cwd: './node_modules',
    // templates: '../../config/.jsproject',
    locals: {
      customFoo: '// oooook hahahah'
    }
  })
})

/*!
 * charlike <https://github.com/tunnckoCore/charlike>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (https://i.am.charlike.online)
 * Released under the MIT license.
 */

/* eslint-disable import/no-commonjs, import/no-nodejs-modules */

const test = require('mukla');
const charlike = require('./index');

test('charlike', async () => {
  await charlike('yezzah-foo-bar', 'quxie hoohy bar desc, that was easy!!!', {
    cwd: './node_modules',
    // templates: '../../config/.jsproject',
    locals: {
      customFoo: '// oooook hahahah',
    },
  });
});

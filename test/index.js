/**
 * @copyright 2016-present, Charlike Mike Reagent <olsten.larck@gmail.com>
 * @license Apache-2.0
 */

/* eslint-disable import/no-commonjs */

const test = require('mukla');
const charlike = require('../dist/index.cjs');

test('charlike', async () => {
  await charlike('yeahx', 'quxie hoohy bar desc, that was easy!!!', {
    cwd: './node_modules',
    // templates: '../../config/.jsproject',
    locals: {
      nspId: 'e6f9f165-cc4d-41be-ad83-aa54e30caaab',
    },
  });
});

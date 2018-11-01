/**
 * @copyright 2016-present, Charlike Mike Reagent <olsten.larck@gmail.com>
 * @license Apache-2.0
 */

/* eslint-disable import/no-commonjs */

const test = require('mukla');
const charlike = require('../index').default;

test('charlike', async () => {
  const destPath = await charlike('@aaa/zzzzzzz', 'quxie hoohy bar desc, that was easy!!!', {
    cwd: './node_modules',
    // templates: '~/.jsproject',
    locals: {
      nspId: 'e6fdasdasd4e30caaab',
    },
  });

  test.strictEqual(typeof destPath, 'string');
  test.strictEqual(destPath.endsWith('node_modules/zzzzzzz'), true);
});

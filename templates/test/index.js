import test from 'asia';
import mod from '../src';

test('some fake example test', (t) => {
  t.strictEqual(typeof mod, 'function');
  t.strictEqual(mod(1, 2), 103);
});

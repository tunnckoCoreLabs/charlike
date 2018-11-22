import assert from 'assert';
import test from 'asia';
import charlike from '../src';

test('should work properly', async () => {
  const { locals, project } = await charlike({
    project: { name: '@tunnckocore/foobar', description: 'wo hooo' },
    cwd: './node_modules',
  });

  assert.deepStrictEqual(locals.license, { name: 'Apache-2.0', year: '2018' });
  assert.strictEqual(locals.repository, 'tunnckoCoreLabs/foobar');
  assert.strictEqual(project.name, '@tunnckocore/foobar');
  assert.strictEqual(project.owner, 'tunnckoCoreLabs');
  assert.strictEqual(project.description, 'wo hooo');
  assert.deepStrictEqual(locals.project, project);
});

#!/usr/bin/env node

const proc = require('process');
const pkg = require('./package.json');
const charlike = require('./index');

(async () => {
  const argv = await charlike.cli(showHelp, proc.argv.slice(2), { pkg });

  /* eslint-disable promise/always-return */
  charlike(argv)
    .then((result = {}) => {
      console.log('Project is generated at', result.project.dest);
    })
    .catch((err) => {
      console.error('Oooh! Some error occured.');
      console.error(argv.verbose ? err.stack : err.message);
      proc.exit(1);
    });
})();

function showHelp(exitCode = 0) {
  const log = exitCode === 0 ? console.log : console.error;

  log(`  charlike v${pkg.version}
  ${pkg.description}

  Usage: charlike [name] [description] [flags]

  Common Flags:
    -h, --help                Display this help.
    -v, --version             Display current version.

  Flags:
    -n, --name                Project's name.
    -d, --desc                Project description, short for "--project.description".
    -o, --owner               Usually your GitHub username or organization.
    -t, --templates           Source templates directory.
    --engine                  Engine to be used in the template files.
    --locals                  Locals for the template files. Support dot notation.
    --locals.author.name      Project's author name.
    --locals.author.email     Project's author email. And so on.
    --project                 Project metadata like name, description
    --project.name            Project name.
    --project.description     Project description.
    --cwd                     Folder to be used as current working dir.
    --ly                      Shortcut for --locals.license.year (license start year).
    --ln                      Set --locals.license.name.

  Examples:
    charlike my-new-project --ly 2018 --ln MIT -o myOrg
    charlike --project.name foobar --locals.author 'John Snow'
    charlike foobar --locals.author.name 'John Snow'
    charlike foobar --locals.license 'Apache-2.0' --locals.foo bar
    charlike foobar 'This is description'
    charlike foobar --project.description 'Some description here'
    charlike foobar --desc 'Some description here'
    charlike foobar 'Awesome description' --owner tunnckoCoreLabs
    charlike --project.name qux --desc 'Yeah descr' --owner tunnckoCore
  `);

  proc.exit(exitCode);
}

#!/usr/bin/env node

'use strict';

const proc = require('process');
const getPkg = require('@tunnckocore/package-json').default;
const autoUpdater = require('auto-install-updates');
const mri = require('mri');
const pkg = require('./package.json');

autoUpdater({ pkg, updateCheckInterval: 1000 * 60 * 2 });

const cli = mri(proc.argv.slice(2), {
  alias: {
    owner: 'o',
    name: 'n',
    desc: 'd',
    repo: 'r',
    engine: 'e',
    licenseStart: 'l',
    locals: 'L',
    templates: 't',
    help: 'h',
    version: 'v',
  },
});

const charlike = require('./index');

proc.title = 'charlike-cli';

const name = cli._[0] || cli.name;
const desc = cli._[1] || cli.desc;

delete cli._;

function get(pkgName, field = 'version') {
  return getPkg(pkgName).then((pkg) => pkg[field]);
}

async function showHelp(status = 0) {
  console.log(`
  (charlike v${await get('charlike')})
  ${await get('charlike', 'description')}

  Usage
    $ charlike <name> <description> [flags]

  Common Flags
    --help              Show this output
    --version           Show version

  Options
    --owner, -o         Project github owner - username or organization
    --name, -n          Name of the project, same as to pass first param
    --desc, -d          Project description, same as to pass second param
    --repo, -r          Repository pattern like username/projectName
    --engine, -e        Engine to be used, j140 by default
    --licenseStart, -l  License start year
    --locals, -L        Context to pass to template files
    --templates, -t     Path to templates folder
    --cwd               Folder to be used as current working dir

  Examples
    $ charlike my-awesome-project 'some cool description'
    $ charlike minibase-data 'we are awesome' --owner node-minibase
    $ charlike --desc 'abc description here' -n beta-trans -o gulpjs

  Issues: ${await get('charlike', 'homepage')}
`);

  if (status !== 1) {
    throw new Error('charlike: foo');
  }

  proc.exit(status);
}

if (cli.help) {
  showHelp();
}

if (!name || !desc) {
  showHelp(1).catch(() => proc.exit(1));
} else {
  cli.description = desc;

  /* eslint-disable promise/always-return */

  charlike(name, desc, cli)
    .then((dest) => {
      console.log(`Project "${name}" scaffolded to "${dest}"`);
    })
    .catch((err) => {
      /* istanbul ignore next */
      console.error(`Sorry, some error occured!`);
      /* istanbul ignore next */
      console.error(`ERROR: ${err.message}`);
      /* istanbul ignore next */
      proc.exit(1);
    });
}

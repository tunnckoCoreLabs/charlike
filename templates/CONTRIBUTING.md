# Contributing Guide :100:

> _Hello stranger! :sparkles: Please, read the [Code Of Conduct](./CODE_OF_CONDUCT.md) and the full guide at
> [tunnckoCore/contributing](https://github.com/tunnckoCoreLabs/contributing)!  
> Even if you are an experienced developer or active open source maintainer, it worth look over there._

![welcome-teal](https://cloud.githubusercontent.com/assets/194400/22215755/76cb4dbc-e194-11e6-95ed-7def95e68f14.png)

> “_Every thought, **every word**, and **every action**
> that **adds to** the **positive** is a **contribution to peace**. <br />
> Each and **every one** of us is **capable** of making such a **contribution**_.”
> ~ [Aung San Suu Kyi](https://en.wikipedia.org/wiki/Aung_San_Suu_Kyi)

<!-- Part 1 -->

## Are you new to Open Source?

If you’re a **new** open source contributor, the process can be intimidating.  
_What if you don’t know how to code?_ What if something goes wrong? **Don't worry!**

**You don’t have to contribute code!** A common misconception about contributing to open source is that you
need to _contribute code_. In fact, it’s often the other parts of a project that are most neglected or
overlooked. You’ll do the project a _huge favor_ by offering to pitch in with these types of **contributions**!

**Even if you like to write code**, other types of contributions are a great way to get involved with a
project and meet other community members. Building those relationships will give you opportunities to work on other parts of the project.

## Short developer guide

Hello and thanks for choosing to contribute to this project!

Since we do not use and maintain GitHub Issues for bug reports and feature requests, you should look
around the threads in our [Spectrum community forum](https://spectrum.chat/tunnckoCore). In case you want
to _implement_ some bugfix or feature, then you should:

1. Create new branch
2. Do your bugfix or feature
3. Open a Pull Request
4. Link the related forum thread

We highly recommend to use Yarn for installing dependencies and using the scripts, so there won't have
some unexpected results and different `node_modules` trees.

We have few scripts for managing this project, you can see them on `package.json` or just run `yarn scripts` to list all available ones.

### Scripts

All the management behind the scenes is done through the [@tunnckocore/scripts](https://npmjs.com/package/@tunnckocore/scripts) cli, which gives us the `scripts` executable. 
But you still can use your favorite package manager.  
All of the following are equivalent:
- `yarn lint`
- `npm run lint`
- `yarn scripts lint`
- `scripts lint`

So, lets look over the available commands:

#### `test`

Runs the tests and reports test coverage using [nyc](https://npmjs.com/package/nyc).
Note that it will exit with non-zero code (command will fail) if the threshold is not met, but don't worry that's configurable through its `.nycrc.json` config file.  
_Note that this script may fail if you don't have `nyc` installed globally, since we don't have it as devDependency here either._

#### `test-only`

Running the tests, without checking the test coverage. We are using [AsiaJS](https://github.com/tunnckoCoreLabs/asia) testing framework which in syntax is very similar to `tap`, `tape` and `ava`. It is blazingly fast, minimalist, highly customizable and well working with Babel or whatever you want.

#### `lint`

Using ESLint ensures (lints and formats) the code style is okey with [Airbnb](https://github.com/airbnb/javascript) style guide and [Prettier](https://prettier.io).  
_Don't worry if you don't run that script. The CircleCI job will run everything needed._

#### `commit`

It combines `lint`, `test-only` and `dry` scripts, which means it will lint, format, test, `git add` and `git commit` the whole project.

#### `dry`

Adds the all changed files, using `git add -A`; and calls interactive helper [gitcommit](https://ghub.io/gitcommit) which will
ask you what type of change you've done, a description and etc. It constructs a commit message compliant to the [Conventional Commits](https://conventionalcommits.org) specification. For those familiar with the "Angular commit message style", it's basically the same.

This script is useful, when you want to commit more faster than usual, and when you don't change any of the source or test files. Or if you want intentionally to commit something that can't pass the tests or the linting.

#### `docs`

Looks over the source code JSDoc/Javadoc-style block comments, generates API documentation (using [docks](https://ghub.io/docks)) from them and puts it on the `.verb.md` file, which in turn is used by [Verb](https://github.com/verbose/verb/tree/dev) to generate the whole `README.md` file. _So please don't modify the readme file manually._

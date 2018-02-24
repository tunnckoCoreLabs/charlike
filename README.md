<p align="center">
  <a href="https://github.com/tunnckoCore/charlike">
    <img height="250" width="250" src="./logo.png">
  </a>
</p>

# charlike [![npm version][npmv-img]][npmv-url] [![github release][github-release-img]][github-release-url] [![License][license-img]][license-url]

> Small, fast, simple and streaming project scaffolder for myself, but not only. Supports hundreds of template engines through the @JSTransformers API or if you want custom `render` function passed through options

<div id="thetop"></div>

_You might also be interested in [charlike-cli][highlighted-link] or in the other [related projects](#related-projects)._

## Quality Assurance :100:

[![bitHound Code][bithound-code-img]][bithound-code-url] 
[![Code Style Standard][standard-img]][standard-url] 
[![Linux Build][circleci-img]][circleci-url] 
[![Code Coverage][codecov-img]][codecov-url] 
[![bitHound Score][bithound-score-img]][bithound-score-url] 
[![bitHound Deps][bithound-deps-img]][bithound-deps-url] 
[![Dependencies Status][dependencies-img]][dependencies-url] 

If you have any _how-to_ kind of questions, please read [Code of Conduct](./CODE_OF_CONDUCT.md) and **ping me on [twitter](https://twitter.com/tunnckoCore)** or [open an issue][open-issue-url].  
You may also read the [Contributing Guide](./CONTRIBUTING.md). There, beside _"How to contribute?"_, we describe everything **_stated_** by  the badges.

[![Make A Pull Request][prs-welcome-img]][prs-welcome-url] 
[![Code Format Prettier][prettier-img]][prettier-url] 
[![Node Security Status][nodesecurity-img]][nodesecurity-url] 
[![Conventional Commits][ccommits-img]][ccommits-url] 
[![Semantically Released][new-release-img]][new-release-url] 
[![Renovate App Status][renovate-img]][renovate-url] 

Project is [semantically](https://semver.org) & automatically released on [CircleCI][codecov-url] with [new-release][] and its [New Release](https://github.com/apps/new-release) Github Bot.

[![All Contributors Spec][all-contributors-img]](#contributors) 
[![Newsletter Subscribe][tinyletter-img]][tinyletter-url] 
[![Give thanks][give-donate-img]][give-donate-url] 
[![Share Love Tweet][share-love-img]][share-love-url] 
[![NPM Downloads Weekly][downloads-weekly-img]][npmv-url] 
[![NPM Downloads Monthly][downloads-monthly-img]][npmv-url] 
[![NPM Downloads Total][downloads-total-img]][npmv-url] 

## Table of Contents
- [Install](#install)
- [API](#api)
  * [charlike](#charlike)
- [Related Projects](#related-projects)
- [Contributing](#contributing)
- [Contributors](#contributors)
- [Users](#users)
- [Logo](#logo)
- [License](#license)

## Install

This project requires [**Node.js**][nodeversion-url] **v8.6** or above. Install it using [**yarn**](https://yarnpkg.com) **v1.3+** or [**npm**](https://www.npmjs.com) **v5.2+** package managers.

```
$ yarn global add charlike
# or
$ yarn add charlike
```
<!-- 
A browser usage is also possible, thanks to the [unpkg.com](https://unpkg.com) CDN and [Rollup](https://ghub.now.sh/rollup) bundler.  
See available bundles at [`https://unpkg.com/charlike/dist/browser/`](https://unpkg.com/charlike/dist/browser/).

> _**Note:** May not work in the browser if some of the [Node.js builtin modules](https://github.com/juliangruber/builtins/blob/master/builtins.json) are used here._
 -->
 
## API
Review carefully the provided examples and the working [tests](./test).

### [charlike](src/index.js#L52)
> Scaffolds project with `name` and `desc` by creating folder with `name` to some folder. By default it generates folder with `name` to current working directory (or `options.cwd`). You can also define what _"templates"_ files to be used by passing `options.templates`, by default it uses [./templates](./templates) folder from this repository root.

**Params**

* `<name>` **{String}**: project name    
* `<desc>` **{String}**: project description    
* `[options]` **{Object}**: use `options.locals` to pass more context to template files, use `options.engine` for different template engine to be used in template files, or pass `options.render` function to use your favorite engine    
* `returns` **{Promise}**: if successful, resolved promise with absolute path to the project  

**Example**

```js
import charlike from 'charlike';

const opts = {
  cwd: '/home/charlike/code',
  templates: '/home/charlike/config/.jsproject',
  locals: {
    foo: 'bar',
    // some helper
    toUpperCase: (val) => val.toUpperCase(),
  },
};

charlike('my-awesome-project', 'some cool description here', opts)
  .then((dest) => console.log(`Project generated to ${dest}`))
  .catch((err) => console.error(`Error occures: ${err.message}; Sorry!`));
```

**[back to top](#thetop)**

## Related Projects
Some of these projects are used here or were inspiration for this one, others are just related. So, thanks for your existance! 
- [gitcommit](https://www.npmjs.com/package/gitcommit): Simple, small and stable helper & prompter for submitting conventional commits | [homepage](https://github.com/tunnckoCore/gitcommit#readme "Simple, small and stable helper & prompter for submitting conventional commits")
- [hela-config-tunnckocore](https://www.npmjs.com/package/hela-config-tunnckocore): Shareable Config (preset of tasks) for [hela][] task runner | [homepage](https://github.com/tunnckoCore/hela-config-tunnckocore "Shareable Config (preset of tasks) for [hela][] task runner")
- [hela](https://www.npmjs.com/package/hela): Powerful & flexible task runner framework in 80 lines, based on [execa… [more](https://github.com/tunnckoCore/hela#readme) | [homepage](https://github.com/tunnckoCore/hela#readme "Powerful & flexible task runner framework in 80 lines, based on [execa][]. Supports shareable configs, a la ESLint")
- [jstransformer](https://www.npmjs.com/package/jstransformer): Normalize the API of any jstransformer | [homepage](https://github.com/jstransformers/jstransformer#readme "Normalize the API of any jstransformer")

**[back to top](#thetop)**

## Contributing
Please read the [Contributing Guide](./CONTRIBUTING.md) and [Code of Conduct](./CODE_OF_CONDUCT.md) documents for advices.  
For bugs reports and feature requests, [please create an issue][open-issue-url].
  
## Contributors
Thanks to the hard work of [these wonderful people](./CONTRIBUTORS.md) this project is alive and it also follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification.  
[Pull requests](https://github.com/tunnckoCore/contributing#opening-a-pull-request), stars and all kind of [contributions](https://opensource.guide/how-to-contribute/#what-it-means-to-contribute) are always welcome.

## Users
You can see who uses `charlike` in the [USERS.md](./USERS.md) file. Please feel free adding this file if it not exists.  
If you or your organization are using this project, consider adding yourself to the list of users. **Thank You!**

## Logo
The logo is [Monster Icon](http://thenounproject.com/term/moster/63928/) by [Christian Mohr](http://www.thenounproject.com/mom-digital). Released under the [CC BY 3.0](http://creativecommons.org/licenses/by/3.0/us/) license.

## License
Copyright (c) 2016-present, [Charlike Mike Reagent][author-link] `<olsten.larck@gmail.com>`.  
Released under the [Apache-2.0 License][license-url].

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.6.0, on February 24, 2018._  
_Project automation and management with [hela][] task framework._

[execa]: https://github.com/sindresorhus/execa
[hela]: https://github.com/tunnckoCore/hela
[new-release]: https://github.com/tunnckoCore/new-release

<!-- Heading badges -->
[npmv-url]: https://www.npmjs.com/package/charlike
[npmv-img]: https://img.shields.io/npm/v/charlike.svg?label=npm%20version

[github-release-url]: https://github.com/tunnckoCore/charlike/releases/latest
[github-release-img]: https://img.shields.io/github/release/tunnckoCore/charlike.svg?label=github%20release

[license-url]: https://github.com/tunnckoCore/charlike/blob/master/LICENSE
[license-img]: https://img.shields.io/badge/license-Apache%202.0-blue.svg
<!-- [license-img]: https://img.shields.io/badge/license-tunnckoCore_1%2E0-blue.svg -->

<!-- Front line badges -->
[bithound-score-url]: https://www.bithound.io/github/tunnckoCore/charlike
[bithound-score-img]: https://www.bithound.io/github/tunnckoCore/charlike/badges/score.svg

[bithound-code-url]: https://www.bithound.io/github/tunnckoCore/charlike
[bithound-code-img]: https://www.bithound.io/github/tunnckoCore/charlike/badges/code.svg

[standard-url]: https://github.com/airbnb/javascript
[standard-img]: https://img.shields.io/badge/code_style-airbnb-brightgreen.svg

[circleci-url]: https://circleci.com/gh/tunnckoCore/charlike/tree/master
[circleci-img]: https://img.shields.io/circleci/project/github/tunnckoCore/charlike/master.svg

[codecov-url]: https://codecov.io/gh/tunnckoCore/charlike
[codecov-img]: https://img.shields.io/codecov/c/github/tunnckoCore/charlike/master.svg

[bithound-deps-url]: https://www.bithound.io/github/tunnckoCore/charlike/dependencies/npm
[bithound-deps-img]: https://www.bithound.io/github/tunnckoCore/charlike/badges/dependencies.svg

[dependencies-url]: https://david-dm.org/tunnckoCore/charlike
[dependencies-img]: https://img.shields.io/david/tunnckoCore/charlike.svg

<!-- Second front of badges -->
[prs-welcome-img]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg
[prs-welcome-url]: http://makeapullrequest.com

[prettier-url]: https://github.com/prettier/prettier
[prettier-img]: https://img.shields.io/badge/styled_with-prettier-f952a5.svg

[nodesecurity-url]: https://nodesecurity.io/orgs/tunnckocore/projects/e6f9f165-cc4d-41be-ad83-aa54e30caaab/master
[nodesecurity-img]: https://nodesecurity.io/orgs/tunnckocore/projects/e6f9f165-cc4d-41be-ad83-aa54e30caaab/badge
<!-- the original color of nsp: 
[nodesec-img]: https://img.shields.io/badge/nsp-no_known_vulns-35a9e0.svg -->

[ccommits-url]: https://conventionalcommits.org/
[ccommits-img]: https://img.shields.io/badge/conventional_commits-1.0.0-yellow.svg

[new-release-url]: https://github.com/tunnckoCore/new-release
[new-release-img]: https://img.shields.io/badge/semantically-released-05C5FF.svg

[nodeversion-url]: https://nodejs.org/en/download
[nodeversion-img]: https://img.shields.io/node/v/charlike.svg

[renovate-url]: https://renovateapp.com
[renovate-img]: https://img.shields.io/badge/renovate-enabled-brightgreen.svg

<!-- Third badges line (After CodeSponsor.io ad) -->
[all-contributors-img]: https://img.shields.io/github/contributors/tunnckoCore/charlike.svg?label=all%20contributors&colorB=ffa500

[tinyletter-url]: https://tinyletter.com/tunnckoCore
[tinyletter-img]: https://img.shields.io/badge/join-newsletter-9caaf8.svg
<!-- 
[paypal-donate-url]: https://paypal.me/tunnckoCore/10
[paypal-donate-img]: https://img.shields.io/badge/$-support-f47721.svg
 -->
[give-donate-url]: https://paypal.me/tunnckoCore/10
[give-donate-img]: https://img.shields.io/badge/give-donation-f47721.svg

[downloads-weekly-img]: https://img.shields.io/npm/dw/charlike.svg
[downloads-monthly-img]: https://img.shields.io/npm/dm/charlike.svg
[downloads-total-img]: https://img.shields.io/npm/dt/charlike.svg

<!-- Miscellaneous -->
[share-love-url]: https://twitter.com/intent/tweet?text=https://github.com/tunnckoCore/charlike&via=tunnckoCore
[share-love-img]: https://img.shields.io/badge/tweet-about-1da1f2.svg

[open-issue-url]: https://github.com/tunnckoCore/charlike/issues/new
[highlighted-link]: https://ghub.now.sh/charlike-cli
[author-link]: www.tunnckocore.com


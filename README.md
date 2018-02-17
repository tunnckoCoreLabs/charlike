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
- [License](#license)

## Install

This project requires [**Node.js**][nodeversion-url] **v8.6** or above. Install it using [**yarn**](https://yarnpkg.com) **v1.3+** or [**npm**](https://www.npmjs.com) **v5.2+** package managers.

```
$ yarn global add charlike
```
<!-- 
A browser usage is also possible, thanks to the [unpkg.com](https://unpkg.com) CDN and [Rollup](https://ghub.now.sh/rollup) bundler.  
See available bundles at [`https://unpkg.com/charlike/dist/browser/`](https://unpkg.com/charlike/dist/browser/).

> _**Note:** May not work in the browser if some of the [Node.js builtin modules](https://github.com/juliangruber/builtins/blob/master/builtins.json) are used here._
 -->
 
## API
Review carefully the provided examples and the working [tests](./test).

### [charlike](index.js#L78)
> Scaffolds project with `name` and `desc` by creating folder with `name` to some folder. By default it generates folder with `name` to current working directory (or `options.cwd`). You can also define what _"templates"_ files to be used by passing `options.templates`, by default it uses [./templates](./templates) folder from this repository root.

**Params**

* `<name>` **{String}**: project name    
* `<desc>` **{String}**: project description    
* `[options]` **{Object}**: use `options.locals` to pass more context to template files, use `options.engine` for different template engine to be used in template files, or pass `options.render` function to use your favorite engine    
* `returns` **{Promise}**: if successful, resolved promise with absolute path to the project  

**Example**

```js
const charlike = require('charlike')
const opts = {
  cwd: '/home/charlike/code',
  templates: '/home/charlike/config/.jsproject',
  locals: {
    foo: 'bar',
    // some helper
    toUpperCase: (val) => val.toUpperCase()
  }
}

charlike('my-awesome-project', 'some cool description here', opts)
  .then((dest) => console.log(`Project generated to ${dest}`))
  .catch((err) => console.error(`Error occures: ${err.message}; Sorry!`))
```

**[back to top](#thetop)**

## Related Projects
Some of these projects are used here or were inspiration for this one, others are just related. So, thanks for your existance! 
- [always-done](https://www.npmjs.com/package/always-done): Handle completion and errors with elegance! Support for streams, callbacks, promises, child… [more](https://github.com/hybridables/always-done#readme) | [homepage](https://github.com/hybridables/always-done#readme "Handle completion and errors with elegance! Support for streams, callbacks, promises, child processes, async/await and sync functions. A drop-in replacement for [async-done][] - pass 100% of its tests plus more")
- [each-promise](https://www.npmjs.com/package/each-promise): Iterate over promises, promise-returning or async/await functions in series or parallel. Support… [more](https://github.com/tunnckocore/each-promise#readme) | [homepage](https://github.com/tunnckocore/each-promise#readme "Iterate over promises, promise-returning or async/await functions in series or parallel. Support settle (fail-fast), concurrency (limiting) and hooks system (start, beforeEach, afterEach, finish)")
- [j140](https://www.npmjs.com/package/j140): Template engine in 140 bytes, by @jed Schmidt. Support helpers, partials and… [more](https://github.com/tunnckocore/j140#readme) | [homepage](https://github.com/tunnckocore/j140#readme "Template engine in 140 bytes, by @jed Schmidt. Support helpers, partials and pre-compiled templates. For nodejs and the browser. Browserify-ready.")
- [jstransformer](https://www.npmjs.com/package/jstransformer): Normalize the API of any jstransformer | [homepage](https://github.com/jstransformers/jstransformer#readme "Normalize the API of any jstransformer")
- [minibase](https://www.npmjs.com/package/minibase): Minimalist alternative for Base. Build complex APIs with small units called plugins… [more](https://github.com/node-minibase/minibase#readme) | [homepage](https://github.com/node-minibase/minibase#readme "Minimalist alternative for Base. Build complex APIs with small units called plugins. Works well with most of the already existing [base][] plugins.")
- [try-catch-core](https://www.npmjs.com/package/try-catch-core): Low-level package to handle completion and errors of sync or asynchronous functions… [more](https://github.com/hybridables/try-catch-core#readme) | [homepage](https://github.com/hybridables/try-catch-core#readme "Low-level package to handle completion and errors of sync or asynchronous functions, using [once][] and [dezalgo][] libs. Useful for and used in higher-level libs such as [always-done][] to handle completion of anything.")

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

## License
Copyright (c) 2016-present, [Charlike Mike Reagent][author-link] `<olsten.larck@gmail.com>`.  
Released under the [MIT License][license-url].

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.6.0, on February 17, 2018._  
_Project automation and management with [hela][] task framework._

[always-done]: https://github.com/hybridables/always-done
[async-done]: https://github.com/gulpjs/async-done
[base]: https://github.com/node-base/base
[commitizen]: https://github.com/commitizen/cz-cli
[dezalgo]: https://github.com/npm/dezalgo
[hela]: https://github.com/tunnckoCore/hela
[new-release]: https://github.com/tunnckoCore/new-release
[once]: https://github.com/isaacs/once
[standard-version]: https://github.com/conventional-changelog/standard-version
[verb-generate-readme]: https://github.com/verbose/verb-generate-readme
[verb]: https://github.com/verbose/verb

<!-- Heading badges -->
[npmv-url]: https://www.npmjs.com/package/charlike
[npmv-img]: https://img.shields.io/npm/v/charlike.svg?label=npm%20version

[github-release-url]: https://github.com/tunnckoCore/charlike/releases/latest
[github-release-img]: https://img.shields.io/github/release/tunnckoCore/charlike.svg?label=github%20release

[license-url]: https://github.com/tunnckoCore/charlike/blob/master/LICENSE
[license-img]: https://img.shields.io/badge/license-MIT-blue.svg
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

[nodesecurity-url]: https://nodesecurity.io/orgs/tunnckocore/projects/todo/master
[nodesecurity-img]: https://nodesecurity.io/orgs/tunnckocore/projects/todo/badge
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
[author-link]: https://i.am.charlike.online 


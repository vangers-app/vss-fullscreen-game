# Fullscreen game addon
[![Node.js CI](https://github.com/vangers-app/vss-fullscreen-game/actions/workflows/release.yml/badge.svg)](https://github.com/vangers-app/vss-fullscreen-game/actions/workflows/release.yml)

This repository contains addon for Vangers that makes game use fullscreen map mode
by default.

**This repository also is a template repository**, so you can make you own repository
from it. Its useful if you want to develop your own addon.

## Project structure

`src` folder contains source code of addon:
* **main.ts** - is a standard loader from vangers repository, you should not change it
* **vss.ts** - is a `vss` module provided by game. This API you should use to interact with game
* **vss-fullscreen-game.ts** - is a addon it self

**NOTE:** `main.ts` and `vss.ts` are same for all addons and taken from [vangers repository](https://github.com/vangers-app/vangers-android-cpp/tree/vandroid/scripting/src).
**Keep them up to date.**

## How to develop

You need to install **node.js** with **npm** or **yarn**. We suppose that you will use
yarn. 

1. Install dependencies by calling `yarn install`
2. Run tsc compiler in watch mode `yarn run tsc --watch`
3. tsc will build js into **build** directory
4. Run the game with following args `vangers -vss <path-to-build-directory>`

**NOTE:** Vangers support hot-reload, to reload scrips press F8 when you on a road.

## How to publish

If you used this repository as template, then you have configured action that will
publish builded addon into releases page on github. To do a release you need to create a
tag and push it to github.

```
git tag v1.0
git push origin v1.0
```

After that release will appear on releases page. Download the release archive and extract it somewhere, 
then you can start vangers with `-vss` flag:

`vangers -vss <path-to-extracted-release>`

## Documentation

Please read [documentation](https://github.com/vangers-app/vangers-android-cpp/blob/vandroid/scripting/README.md) from vangers repository.

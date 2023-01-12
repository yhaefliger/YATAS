# Frederik Schönfeldt – Website

## Install

```
pnpm install
```

## Local Dev

```
pnpm start
```

## Build

Minified production build

```bash
pnpm build
```

## Custom A4 Docs

You can generate custom A4 PDFs by putting markdown files under the `src/a4docs` directy, see [example](src/a4docs/example.md). Run the server and open `http://localhost:8080/a4docs/example` to see the result.

## E2E Tests

```bash
pnpm playwright test
```

### Updating Snapshots

in case screenshots changes intentionally (https://playwright.dev/docs/test-snapshots)

#### Regenerate

```test
pnpm playwright test -u
```

#### CI Snapshots

If you are not on the same operating system as your CI system, you can use Docker to generate/update the screenshots:

```bash
docker run --rm --network host -v $(pwd):/work/ -w /work/ -it mcr.microsoft.com/playwright:v1.29.0-focal /bin/bash
npm i -g pnpm
pnpm install
pnpm playwright test --update-snapshots
```

After that, [you most probably need to recreate `node_modules`](#install) cause it now got different packages.

## Assets versioning

This starter includes a small js script to which can add a hash to your assets when building for production builds.
The script will look for files to include a hash (based on the md5 of the built file content) eg: `styles.734a7607648afdb.css` instead of `styles.css`.

The entry point for matching regular file path to versionned path is generated as an 11ty global data object in `_data/hash.json` with the simple structure

```js
{
  'path/to/resource.css': 'path/to/resource.hash.css'
}
```

In your 11ty template, you can then simply retrieve the versioned path from the array `{{ hash['path/to/resource.css'] }}`

If you want to add other assets to this generated data array, simply include the path in the `assets` const in the `hash.js` file in the root directory (files listed below are already included).

```js
const assets = ["css/styles.css", "js/scripts.js"];
```

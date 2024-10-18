# sf.gov front end

This is the future [SF.gov] front end, built with the [SF.gov design system] and [Next.js].

## Versioning and dependencies

Some important things to note when managing versions of Node, npm, and other environment-specific dependencies:

### Node version

We can avoid lots of issues by keeping the version of Node that we develop,
test, build, and run on needs to be kept _exactly the same_ across all
environments. Here are all of the places that we specify the Node version; if
you change it one, you **must** change it in all of the others:

| Location | Environment(s) | Notes |
| :--- | :--- | :--- |
| [`nextjs_prod` inventory](https://github.com/SFDigitalServices/ansible-platform/blob/main/inventory/nextjs_prod/group_vars/all/vars) | Production | Update the `node_version:` variable
| [`nextjs_staging` inventory](https://github.com/SFDigitalServices/ansible-platform/blob/main/inventory/nextjs_staging/group_vars/all/vars) | Staging | Update the `node_version:` variable
| [package.json](./package.json) | All | After updating, run `npm i --package-lock` to ensure that `package-lock.json` is also updated.
| [.circleci/config.yml](./.circleci/config.yml) | Test (CircleCI) | The Node version is in the `cimg/node:{version}` value of `jobs.test.docker[0].image`
| [.tool-version](./.tool-versions) | [Development](#setup) |
| [.github/workflows/playwright.yml](./.github/workflows/playwright.yml) | Test (Actions) | The Node version is specified in the `node-version` argument to `actions/node` and/or `NODE_ENV` environment variable settings
| [.github/workflows/chromatic.yml](./.github/workflows/chromatic.yml) | n/a | (Same as above)

### Production and development dependencies

**Production** dependencies in this repo are packages that are required to
_build_ the site. This is because Next.js generates a standalone build with all
of the dependencies and doesn't import files from `node_modules` at runtime.
Notably, the following packages **must** be production dependencies:

- React (specifically `react` and `react-dom`, the versions of which should be
  kept in sync across workspaces)
- **All packages imported directly or indirectly by server and client code** in
  the `sfgov` and `design-system` workspaces (e.g. React packages, CSS imports)

If it's not clear whether a dependency is required to build the site, you
verify by:

1. Moving the package from `dependencies` to `devDependencies` in the relevant
   `package.json` (`npm i -D <package>`, or edit the `package.json` and run `npm
   i --package-lock` in the project root)
2. Running `npm prune --omit=dev` in the project root to remove dev dependencies
   from `node_modules`
3. Building the site with `npm run build -w @sfgov/next`

Inversely, **development** dependencies are packages that are _not_ required
to build the site. These include:

- Linting tools, including ESLint and its presets and plugins
- Testing tools, including Jest and its related packages
- JavaScript compilers such as Babel and its plugins

#### Optional dependencies

Platform- or environment-specific packages should be declared in the
`optionalDependencies` field of the relevant `package.json` so that they don't
cause errors in `npm install` or `npm ci` when they fail to install in
environments where they're not needed.

## Local development

### Setup

0. **Optional, but highly recommended**: install [asdf] and [asdf-nodejs]. Once
   asdf is active in your shell, the [.tool-versions](./.tool-versions) file
   should prompt for the installation of the required Node.js version.

1. `npm install` to install required dependencies

2. Copy the local dev config:

   ```sh
   cp ./packages/sfgov/.env.development.example ./packages/sfgov/.env.development
   ```

### Development server

#### From the Console

Run `npm run dev` (or `npx next dev`) to run the [Next.js development
server][next dev]. This should automatically open a web browser to
`http://localhost:3000`.

#### VS Code

There are 4 launch configurations available to run the server through VS Code. For the most part, they should just be a one-click operation to get it working and are all controlled through VS Code's `Run and Debug` section.

1. `Next.js: debug server-side` - Use this to just run the server. If you set breakpoints in the code, it should respect them.
2. `Next.js: debug client-side` - This will launch a Chrome browser and attach to the session so you can do frontend debugging should you not be using the browser built-in debugger.
3. `Next.js: debug full stack` - A combination of option 1 & 2.
4. `SFGOV:Jest: Current File` - This is not a runtime, per say, but instead, allows you to debug any tests you're writing as it will respect your breakpoints. To use this, make sure you have focus on the file you want to run and then click on the "play" button. It should pop-up a console in which you can do debugging things and see the output.

### Figma export

We use [figma-export] to export icons as SVG and React components from our
design system Figma files. To update the icons, you'll need to set `FIGMA_TOKEN`
in your `.env` file, which you can bootstrap by copying `.env.example` and
filling it with an access token [from Figma][figma access token].

### Translations

```sh
npm run translations-gather
```

Parse out strings from `t()` translation function calls and store them in
[locales/en/translation.json](./locales/en/translation.json), using the
[i18next-parser] configuration defined in
[i18next-parser.config.mjs](./i18next-parser.config.mjs).

```sh
npm run translations-upload
```

Upload the key/value pairs in translation.json to the translation service. This
functionality requires the `TRANSLATIONS_API_TOKEN` environment variable to be
set. The token can be assigned in the platform Django admin.

```sh
npm run translate
```

Run `translations-gather` then `translations-upload`.

[asdf-nodejs]: https://github.com/asdf-vm/asdf-nodejs
[asdf]: https://github.com/asdf-vm/asdf
[figma access token]: https://help.figma.com/hc/en-us/articles/8085703771159-Manage-personal-access-tokens
[figma-export]: https://figma-export.marcomontalbano.com/
[i18next-parser]: https://github.com/i18next/i18next-parser?tab=readme-ov-file#readme
[next dev]: https://nextjs.org/docs/api-reference/cli#development
[next.js]: https://nextjs.org/
[sf.gov design system]: https://design-system.sf.gov
[sf.gov]: https://sf.gov

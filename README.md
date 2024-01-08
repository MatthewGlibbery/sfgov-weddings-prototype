# sf.gov front end

This is the future [SF.gov] front end, built with the [SF.gov design system] and [Next.js].

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

[sf.gov]: https://sf.gov
[sf.gov design system]: https://design-system.sf.gov
[asdf]: https://github.com/asdf-vm/asdf
[asdf-nodejs]: https://github.com/asdf-vm/asdf-nodejs
[figma-export]: https://figma-export.marcomontalbano.com/
[figma access token]: https://help.figma.com/hc/en-us/articles/8085703771159-Manage-personal-access-tokens
[next.js]: https://nextjs.org/
[next dev]: https://nextjs.org/docs/api-reference/cli#development

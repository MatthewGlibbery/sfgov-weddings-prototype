# sf.gov front end

This is the future [SF.gov] front end, built with the [SF.gov design system] and [Next.js].

## Local development

### Setup

0. **Optional, but highly recommended**: install [asdf] and [asdf-nodejs]. Once
   asdf is active in your shell, the [.tool-versions](./.tool-versions) file
   should prompt for the installation of the required Node.js version.

1. `npm install` to install required dependencies

### Development server

Run `npm run dev` (or `npx next dev`) to run the [Next.js development
server][next dev]. This should automatically open a web browser to
`http://localhost:3000`.

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

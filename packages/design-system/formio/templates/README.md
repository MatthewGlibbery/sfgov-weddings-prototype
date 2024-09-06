# formio templates

This directory exports a mapping of template names to template objects that
the [formio.js template system] uses to render different types of content. For
some reason, formio.js templates are not functions themselves, but objects with
the following interface:

```ts
{
  form (context: object): string
}
```

To cut down on the boilerplate and number of files, we use ES module imports and
exports to shape our template mapping in [index.ts](./index.ts) and each
template module like so:

```js
// index.js
import * as debug from './debug'

export default {
  debug
}

// debug.js
export function form (ctx) {
  return `<pre>${JSON.stringify(ctx.component, null, 2)}</pre>`
}
```

Which makes the default export of this directory something we can use in the
plugin ("module") object we pass to [Formio.use()]. Note one last bit of extra
fiddling we need to do here is nest the `templates` export under the same named
key under `templates` as the value of `framework`:

```js
import templates from './templates'

Formio.use({
  framework: 'sfgov',
  templates: {
    sfgov: templates
  }
})
```

[formio.js template system]: https://help.form.io/developers/form-development/form-templates
[Formio.use()]: https://help.form.io/developers/modules#creating-a-module

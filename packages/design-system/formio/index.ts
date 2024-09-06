import type formiojs from 'formiojs'
import type { FormioPlugin } from './types'
import { hook } from './utils'

import templates from './templates'

export * from './types'

// making this a constant ensures that the 'framework' property of the plugin
// and the key under which the templates are nested in 'templates' always match
const framework = 'sfgov'

/**
 * @see https://help.form.io/developers/modules#creating-a-module
 */
export const plugin: FormioPlugin = {
  framework,
  templates: {
    [framework]: templates
  }
}

/**
 *
 * @param Formio
 * @param Components
 */
export function initializeFormio(
  Formio: typeof formiojs.Formio,
  Components: typeof formiojs.Components
) {
  Formio.use(plugin)

  const ComponentPrototype = Components.components.base.prototype
  hook(ComponentPrototype, 'renderTemplate', (renderTemplate, ...args) => {
    const content = renderTemplate(...args)
    console.info('renderTemplate(', args, ') ->', typeof content)
    return content
  })
}

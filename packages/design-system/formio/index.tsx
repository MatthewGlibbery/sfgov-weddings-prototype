/* eslint-disable react/function-component-definition */
import { Components, Form as FormioReactForm, Formio } from '@formio/react'
import type { Form as _Form } from 'formiojs'
import type { ComponentProps } from 'react'
import templates from './templates'
import type { FormioPlugin, FormSchema } from './types'
import { hook } from './utils'

export * from './types'

export type Form = _Form & {
  element: HTMLElement
  alert: HTMLElement
  submit(before?: boolean, options?: object): Promise<object>
}

// @formio/react doesn't export the props type, and doing it here allows us to
// keep it in sync with a wrapping component if need be
export type FormProps = ComponentProps<typeof FormioReactForm> & {
  form?: FormSchema
  formReady?: (form: Form) => void
}

// making this a constant ensures that the 'framework' property of the plugin
// and the key under which the templates are nested in 'templates' always match
const framework = 'sfgov'

// internal property for determining whether we've initialized an object
const INITIALIZED = new Map<object, boolean>()

/**
 * @see https://help.form.io/developers/modules#creating-a-module
 */
export const plugin: FormioPlugin = {
  framework,
  templates: {
    [framework]: templates
  }
}

// FIXME: for some reason, coverage for this function isn't being properly
// calculated in tests even though it's _definitely_ getting called.
// istanbul ignore next
export function useFormio(isDev?: boolean) {
  const debug = isDev ? console.debug.bind(console) : noop
  const info = isDev ? console.info.bind(console) : noop
  // const log = isDev ? console.log.bind(console) : noop
  const warn = console.warn.bind(console)
  // const error = console.error.bind(console)

  once(Formio, () => {
    Formio.use(plugin)

    const ComponentPrototype = Components.components.base.prototype
    hook(ComponentPrototype, 'renderTemplate', (renderTemplate, ...args) => {
      const content = renderTemplate(...args)
      info('renderTemplate(', args, ') ->', typeof content)
      return Array.isArray(content) ? content.join('') : content
    })
  })

  function FormioForm(props: FormProps) {
    const { formReady, ...rest } = props
    return (
      <FormioReactForm
        formReady={(form: Form) => {
          once(form, addFormHooks)
          formReady?.(form)
        }}
        {...rest}
      />
    )
  }

  return { Formio, FormioForm }

  function addFormHooks(form: Form) {
    /**
     * This hook moves the "alert" element to the bottom of the form whenever
     * setAlert() is called.
     */
    hook(
      form,
      // @ts-expect-error yeah yeah
      'setAlert',
      function (
        this: Form,
        setAlert,
        type: string,
        message: string,
        options?: unknown
      ) {
        debug('form.setAlert(', [type, message, options], ')')
        setAlert(type, message, options)
        if (this.alert) {
          this.element.append(this.alert)
        } else {
          warn('form.setAlert() did not set this.alert')
        }
      }
    )
  }
}

function once<T extends object>(obj: T, fn: (obj: T) => void) {
  if (!INITIALIZED.has(obj)) {
    fn(obj)
    INITIALIZED.set(obj, true)
  }
}

function noop(...args: unknown[]) {
  /* noop */
}

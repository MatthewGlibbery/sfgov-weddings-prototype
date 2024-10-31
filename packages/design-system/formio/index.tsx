/* eslint-disable react/function-component-definition */
import { Components, Form as FormioReactForm, Formio } from '@formio/react'
import type { ComponentProps } from 'react'
import { FORM_CLASS } from './constants.mjs'
import templates from './templates'
import type {
  Form,
  FormioPlugin,
  FormOptions,
  FormSchema,
  FormSubmission,
  Override
} from './types'
import { hook } from './utils'
import { classed } from '../components/utils'

// @ts-expect-error not typescript
import formioStyle from './bootstrap.css'

export * from './types'

// this is our "fixed" version of @formio/react's Form component props type with
// more precise/accurate types for callbacks, options, etc. We use Override here
// instead of `&` because we want our type declarations to supersede theirs.
type FormOwnProps = Override<
  ComponentProps<typeof FormioReactForm>,
  {
    form?: FormSchema
    formReady?: (form: Form) => void
    onFormLoad?: (this: Form | undefined, schema: FormSchema) => void
    onSubmit?: (
      this: Form | undefined,
      submission: FormSubmission,
      saved?: boolean
    ) => void
    onSubmitDone?: (this: Form | undefined, submission: FormSubmission) => void
    options?: FormOptions
  }
>

// @formio/react doesn't export the props type, and doing it here allows us to
// keep it in sync with a wrapping component, surface the props to parent, etc.
// We use Override here because some props are common (`onFocus`, `onBlur`) and
// we need the Form props to supersede the intrinsic ones.
export type FormProps = Override<JSX.IntrinsicElements['div'], FormOwnProps>

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

const FormWrapper = classed('div', {
  base: FORM_CLASS
})

type FormWrapperProps = ComponentProps<typeof FormWrapper>

// FIXME: for some reason, coverage for this function isn't being properly
// calculated in tests even though it's _definitely_ getting called.
// istanbul ignore next
export function useFormio(isDev?: boolean) {
  const debug = isDev ? console.debug.bind(console) : noop
  const info = isDev ? console.info.bind(console) : noop
  // const log = isDev ? console.log.bind(console) : noop
  const warn = console.warn.bind(console)
  // const error = console.error.bind(console)

  addFormioStyle()

  once(Formio, () => {
    Formio.use(plugin)

    /**
     * There doesn't appear to be any good way to override the Formio.CDN base
     * URL via default form options. In fact, formio recommends "duck punching"
     * `Formio.requireLibrary()` instead:
     * https://github.com/formio/formio.js/issues/3750#issuecomment-775245758
     */
    hook(
      Formio,
      'requireLibrary',
      (
        requireLibrary,
        name: string,
        property: string,
        source: string | { type: string; src: string }[],
        poll: boolean
      ) => {
        if (Array.isArray(source)) {
          for (const lib of source) {
            lib.src = rewriteLibraryUrl(lib.src)
          }
        } else {
          source = rewriteLibraryUrl(source)
        }
        return requireLibrary(name, property, source, poll)
      }
    )

    const ComponentPrototype = Components.components.base.prototype
    hook(ComponentPrototype, 'renderTemplate', (renderTemplate, ...args) => {
      const content = renderTemplate(...args)
      info('renderTemplate(', args, ') ->', typeof content)
      return Array.isArray(content) ? content.join('') : content
    })
  })

  function FormioForm(props: FormProps) {
    const { formReady, ...rest } = props

    const formProps: Partial<FormProps> = {}
    const wrapperProps: FormWrapperProps = {}
    for (const [prop, value] of Object.entries(rest)) {
      if (FORMIO_FORM_PROPS.includes(prop as keyof FormProps)) {
        formProps[prop as keyof FormProps] = value
      } else {
        wrapperProps[prop as keyof FormWrapperProps] = value
      }
    }

    return (
      <FormWrapper {...wrapperProps}>
        <FormioReactForm
          formReady={(form: Form) => {
            once(form, addFormHooks)
            formReady?.(form)
          }}
          {...formProps}
        />
      </FormWrapper>
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
      'setAlert',
      function (this: Form, setAlert, type: string | boolean, ...rest) {
        debug('form.setAlert(', [type, ...rest], ')')

        // XXX: formio.js immediately hides the success alert; this skips
        // calling form.setAlert(...) if the type is falsy and it's submitted
        if (isDev && !type && this.submitted) return

        setAlert(type, ...rest)
        if (this.alert) {
          this.element.append(this.alert)
        } else {
          warn('form.setAlert() did not set this.alert')
        }
      }
    )
  }
}

function addFormioStyle() {
  // istanbul ignore next
  if (typeof formioStyle !== 'string') {
    console.warn(
      [
        'It looks like formio styles are imported automatically;',
        'changes to the CSS may require a hard refresh.'
      ].join(' ')
    )
    return
  }
  // reusing the existing element allows us to hot-reload CSS in development
  const styleId = `${FORM_CLASS}-style`
  let style = document.getElementById(styleId)
  if (!style) {
    style = document.createElement('style')
    style.id = styleId
    document.head.append(style)
  }
  style.textContent = formioStyle
}

/**
 * Rewrite formio CDN URLs to use JSDelivr. Formio's CDN tracks with cookies and
 * is almost certainly slower/flakier than JSDelivr. Note that some versions of
 * formio.js use different cdn.form.io URL formats. The "un-qualified" format:
 *
 * https://cdn.form.io{/package}{/path*}
 * e.g. https://cdn.form.io/flatpickr/flatpickr.min.js
 *
 * and the versioned ("qualified") format:
 *
 * https://cdn.form.io{/package}{/version}{/path*}
 * e.g. https://cdn.form.io/flatpickr-formio/4.6.13-formio.3/flatpickr.min.js
 *
 * In both cases, cdn.form.io URLs omit the /dist/ file path prefix.
 */
export function rewriteLibraryUrl(url: string) {
  const parsed = new URL(url)

  if (parsed.hostname === 'cdn.form.io') {
    let [pkg, ...path] = parsed.pathname.slice(1).split('/')
    if (/^\d/.test(path[0])) {
      pkg = `${pkg}@${path.shift()}`
    }
    if (path[0] !== 'dist') path.unshift('dist')
    return `https://cdn.jsdelivr.net/npm/${pkg}/${path.join('/')}`
  }
  return url
}

// list props here that should be passed through to the Form component instead of the wrapping div
const FORMIO_FORM_PROPS: Array<keyof FormProps> = [
  'form',
  'formioform',
  'formReady',
  'onAttach',
  'onBlur',
  'onBuild',
  'onCancel',
  'onChange',
  'onComponentChange',
  'onCustomEvent',
  'onError',
  'onFocus',
  'onFormLoad',
  'onInitialized',
  'onNextPage',
  'onPrevPage',
  'onRender',
  'onSubmit',
  'onSubmitDone',
  'options',
  'src',
  'submission',
  'url'
]

function once<T extends object>(obj: T, fn: (obj: T) => void) {
  if (!INITIALIZED.has(obj)) {
    fn(obj)
    INITIALIZED.set(obj, true)
  }
}

function noop() {
  /* noop */
}

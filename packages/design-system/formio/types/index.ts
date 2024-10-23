/* eslint-disable @typescript-eslint/no-explicit-any */
import type { EventEmitter } from 'formiojs/types/eventEmitter'
import type { Formio, Form as _Form } from 'formiojs'
import type { i18n } from 'i18next'
import type { AnyComponentSchema } from './components'
import type { Override } from './utils'

export * from './components'
export * from './forms'
export * from './templates'
export * from './utils'

export type Form = Override<
  _Form,
  {
    element: HTMLElement
    alert: HTMLElement
    submitted: boolean
    setAlert(type: string | boolean, message?: string, options?: object): void
    submit(before?: boolean, options?: object): Promise<object>
    // focus on a component by its unique id
    focusOnComponent(key: string): Promise<void>
    /**
     * This method only exists on multi-page forms, which render with the Wizard
     * class: https://github.com/formio/formio.js/blob/v4.21.3/src/Wizard.js#L642
     */
    setPage?: (page: number) => Promise<void>
  }
>

export type FormSubmission = {
  _id?: string
  state?: 'draft' | 'submitted'
  data: Record<string, any>
  // https://github.com/formio/formio.js/blob/v4.21.3/src/Webform.js#L1468-L1475
  metadata?: {
    timezone: string
    offset: number
    origin: string
    referrer: string
    browserName: string
    userAgent: string
    pathName: string
    onLine: boolean
  }
}

type SubmissionHookData = FormSubmission & { component?: AnyComponentSchema }

export type FormOptions = Partial<{
  allowPrevious: boolean
  alwaysDirty: boolean
  breadcrumbSettings: object
  buttonSettings: {
    showPrevious?: boolean
    showNext?: boolean
    showCancel?: boolean
  }
  cdnUrl: string
  componentErrorClass: string
  decimalSeparator: string
  disabled: Record<string, boolean>
  display: 'form' | 'wizard'
  events: EventEmitter
  // fileService: any
  flatten: boolean
  formio: Formio
  hide: Record<string, boolean>
  highlightErrors: boolean
  // https://github.com/formio/formio.js/blob/66d554e28589e1be222d12fdad530a4d4acff164/src/Form.js#L25-L34
  hooks?: Partial<{
    // https://github.com/formio/formio.js/blob/v4.21.3/src/Webform.js#L1075
    attachWebform: (this: Form, element: HTMLElement, form: Form) => void
    // https://github.com/formio/formio.js/blob/v4.21.3/src/Webform.js#L1453
    beforeCancel: (this: Form, cancel: boolean) => boolean | undefined
    // https://github.com/formio/formio.js/blob/v4.21.3/src/Wizard.js#L748
    beforeNext: (
      this: Form,
      currentPage: number,
      submission: FormSubmission
    ) => void
    beforePrev: (
      this: Form,
      currentPage: number,
      submission: FormSubmission
    ) => void
    //
    beforeSubmit: (this: Form, data: SubmissionHookData) => void
    // https://github.com/formio/formio.js/blob/v4.21.3/src/Webform.js#L1523
    customValidation: (
      this: Form,
      data: SubmissionHookData
    ) => boolean | undefined
  }>
  i18n: Record<string, string>
  i18next: i18n
  iconset: string
  language: string
  noAlerts: boolean
  noDefaults: boolean
  readOnly: boolean
  renderMode: 'form' | 'html' | 'flat' | 'builder' | 'pdf'
  sanitize: boolean
  // sanitizeConfig: SanitizeConfig
  saveDraft: boolean
  saveDraftThrottle: number
  show: Record<string, boolean>
  showCheckboxBackground: boolean
  showHiddenFields: boolean
  skipDraftRestore: boolean
  submitOnEnter?: boolean
  template: string
  // templates: object
  thousandsSeparator: string
  useSessionToken: boolean
  viewAsHtml: boolean
  wizardButtonOrder: string[]
  zoom: number
}>

export type FormioPlugin = {
  framework?: string
  templates?: Record<
    string,
    Record<
      string,
      {
        form?: (context: any) => string | string[] | JSX.Element
      }
    >
  >
}

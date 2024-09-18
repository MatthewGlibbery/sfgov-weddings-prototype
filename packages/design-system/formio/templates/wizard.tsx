/** @jsx h */
/** @jsxFrag null */
/** @jsxRuntime classic */
import h from 'vhtml'
import type { ComponentContext, PageSchema, WizardFormSchema } from '../types'

export default { form }

export type ButtonType = 'cancel' | 'previous' | 'next' | 'submit'

/**
 * The Wizard class has a base render context that it passes to all three of its
 * templates.
 * @see https://github.com/formio/formio.js/blob/v4.21.3/src/Wizard.js#L185-L196
 */
export type WizardRenderContext = ComponentContext & {
  disableWizardSubmit: boolean
  wizardKey: string
  isBreadcrumbClickable: boolean
  isSubForm: boolean
  panels: PageSchema[]
  currentPage: number
  buttons: Record<ButtonType, boolean>
  buttonOrder: ButtonType[]
}

/**
 * The 'wizard' template gets the component schema and pre-rendered content for:
 * - the header (page navigation) in `wizardHeader`
 * - the current page's rendered component(s) in `components`
 * - the back and forward (+ submit + cancel) navigation in `wizardNav`
 */
// https://github.com/formio/formio.js/blob/v4.21.3/src/Wizard.js#L239-L251
type WizardContext = WizardRenderContext & {
  component: WizardFormSchema
  className: string
  components: string
  wizardHeader: string
  wizardHeaderType: string
  wizardHeaderLocation: string
  wizardNav: string
}

/**
 * @see https://github.com/formio/bootstrap/blob/main/src/templates/bootstrap5/input/form.ejs
 */
export function form(ctx: WizardContext) {
  const title = ctx.panels[ctx.currentPage].title
  return (
    <div data-formio-template="wizard" className={`TODO ${ctx.className}`}>
      <div dangerouslySetInnerHTML={{ __html: ctx.wizardHeader }} />
      <h2 className="text-display-lg">{title}</h2>
      <div
        ref={ctx.wizardKey}
        className="space-y-20"
        dangerouslySetInnerHTML={{ __html: ctx.components }}
      />
      <div dangerouslySetInnerHTML={{ __html: ctx.wizardNav }} />
    </div>
  )
}

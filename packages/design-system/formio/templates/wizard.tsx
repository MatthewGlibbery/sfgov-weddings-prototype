/** @jsx h */
/** @jsxFrag null */
/** @jsxRuntime classic */
import h from 'vhtml'
import type { ComponentContext, PanelSchema, WizardFormSchema } from '../types'

export default { form }

export type ButtonType = 'cancel' | 'previous' | 'next' | 'submit'

/**
 * The Wizard class has a base render context that it passes to all three of its
 * templates.
 * @see https://github.com/formio/formio.js/blob/v4.21.3/src/Wizard.js#L185-L196
 */
export type WizardRenderContext = ComponentContext<WizardFormSchema> & {
  disableWizardSubmit: boolean
  wizardKey: string
  isBreadcrumbClickable: boolean
  isSubForm: boolean
  panels: PanelSchema[]
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
  className: string
  components: string
  wizardHeader: string
  wizardHeaderType: string
  wizardHeaderLocation: string
  wizardNav: string
}

function isMobile() {
  return window.innerWidth <= 1024
}

/**
 * @see https://github.com/formio/formio.js/blob/v4.21.3/src/templates/bootstrap/wizard/form.ejs
 */
export function form(ctx: WizardContext) {
  const title = ctx.panels[ctx.currentPage].title
  return (
    <div
      data-formio-template="wizard"
      className={`
        flex flex-col
        lg:grid lg:grid-cols-3
        ${ctx.className}
      `}
    >
      <div className="col-span-2 flex flex-col">
        <h1 className="my-space-desktop-md text-desktop-display-xxxl font-slab lg:hidden">
          {title}
        </h1>

        {!isMobile() ? (
          ''
        ) : (
          <div dangerouslySetInnerHTML={{ __html: ctx.wizardHeader ?? '' }} />
        )}

        <div>
          <h1 className="text-desktop-display-xxxl font-slab max-lg:hidden lg:block">
            {title}
          </h1>

          <div
            ref={ctx.wizardKey}
            dangerouslySetInnerHTML={{ __html: ctx.components ?? '' }}
            className="my-space-desktop-xxl"
          />

          <div
            dangerouslySetInnerHTML={{ __html: ctx.wizardNav ?? '' }}
            className="mb-space-desktop-xxl"
          />
        </div>
      </div>
      {isMobile() ? (
        ''
      ) : (
        <div dangerouslySetInnerHTML={{ __html: ctx.wizardHeader ?? '' }} />
      )}
    </div>
  )
}

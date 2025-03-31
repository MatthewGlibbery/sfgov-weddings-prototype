/** @jsx h */
/** @jsxFrag null */
/** @jsxRuntime classic */
import h from 'vhtml'
import { classed } from '@tw-classed/core'
import { BUTTON_VARIANTS } from '../../components/Button'
import type { ButtonType, WizardRenderContext } from './wizard'

export default { form }

const buttonClass = classed(BUTTON_VARIANTS)

/**
 * @see https://github.com/formio/bootstrap/blob/main/src/templates/bootstrap5/wizardNav/form.ejs
 */
export function form({ t, ...ctx }: WizardRenderContext) {
  const buttonProps: Partial<
    Record<ButtonType, { text: string; className: string }>
  > = {
    previous: {
      text: t('back-button', { defaultValue: '← Back' }),
      className: buttonClass({ variant: 'secondary' })
    },
    next: {
      text: t('next-button', { defaultValue: 'Next →' }),
      className: buttonClass()
    },
    submit: {
      text: t('submit-button', { defaultValue: 'Submit' }),
      className: buttonClass()
    }
  }

  return (
    <ul
      className="list-none mt-20 p-0 flex space-x-8 justify-between lg:mb-space-desktop-xxl md:mb-space-tablet-xxl xs:mb-space-lg"
      id={`${ctx.wizardKey}-nav`}
    >
      {ctx.buttonOrder.map((type) => {
        const { text, ...props } = buttonProps[type] || {}
        const isSinglePage = ctx.panels.length === 1
        return ctx.buttons[type] && text ? (
          <li className="m-0 p-0" key={type}>
            <button ref={`${ctx.wizardKey}-${type}`} {...props}>
              {ctx.currentPage === 0 && !isSinglePage
                ? t('get-started', { defaultValue: 'Get started →' })
                : text}
            </button>
          </li>
        ) : null
      })}
    </ul>
  )
}

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
      text: t('Back'),
      className: buttonClass({ variant: 'secondary' })
    },
    next: {
      text: t('Next'),
      className: buttonClass()
    },
    submit: {
      text: t('Submit'),
      className: buttonClass()
    }
  }
  return (
    <ul
      className="list-none m-0 mt-20 p-0 flex space-x-8 justify-between"
      id={`${ctx.wizardKey}-nav`}
    >
      {ctx.buttonOrder.map((type) => {
        const { text, ...props } = buttonProps[type] || {}
        return ctx.buttons[type] && text ? (
          <li className="m-0 p-0" key={type}>
            <button ref={`${ctx.wizardKey}-${type}`} {...props}>
              {ctx.currentPage === 0 ? t('Get started') : text}
            </button>
          </li>
        ) : null
      })}
    </ul>
  )
}

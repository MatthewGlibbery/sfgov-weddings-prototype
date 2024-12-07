/** @jsx h */
/** @jsxFrag null */
/** @jsxRuntime classic */
import { classes } from '../../components'
import h from 'vhtml'
import type { WizardRenderContext } from './wizard'

export default { form }

/**
 * @see https://github.com/formio/formio.js/blob/v4.21.3/src/templates/bootstrap/wizardHeader/form.ejs
 */
export function form({ t, ...ctx }: WizardRenderContext) {
  return (
    <nav
      aria-label="navigation"
      id={`${ctx.wizardKey}-header`}
      className="shrink-0 sticky md:mb-0 md:ml-96 md:mt-[1px] md:top-space-xl md:leading-24"
    >
      <ul className="pagination md:flex md:flex-col">
        {ctx.panels.map((panel, index) => {
          const completed = index < ctx.currentPage
          const isCurrentPage = index === ctx.currentPage
          const isLastPage = index === ctx.panels.length - 1

          return (
            <li
              key={`wizard-panel-${index}`}
              data-testid={`wizardHeader-${index}`}
              className={classes(
                'flex w-full pb-[24px]',
                isCurrentPage ? 'active font-bold text-[18px]' : 'text-[16px]',
                isLastPage
                  ? 'translate-x-[1px]'
                  : completed
                  ? 'border-l-2 border-solid border-success500'
                  : 'border-l-2 border-dashed border-neutral200 cursor-default'
              )}
            >
              <span
                className={`${classes(
                  'w-12 h-12 rounded-full shrink-0 transform -translate-y-1/2'
                )} ${
                  isCurrentPage
                    ? 'bg-black -translate-x-[6.5px]'
                    : completed
                    ? 'panel-completed -translate-x-[9.5px]'
                    : 'bg-neutral200 -translate-x-[6.5px]'
                }`}
              ></span>

              <button
                ref={`${ctx.wizardKey}-link`}
                disabled={!completed}
                className={classes(
                  'text-left transform -translate-y-1/2',
                  isCurrentPage
                    ? 'text-black pl-20'
                    : completed
                    ? 'text-primary600 underline cursor-pointer pl-[14px]'
                    : 'cursor-default text-neutral600 pl-20'
                )}
              >
                {panel.title}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

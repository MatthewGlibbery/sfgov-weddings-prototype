// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

/** @jsx h */
/** @jsxFrag null */
/** @jsxRuntime classic */
import { classes } from '../../components'
import h from 'vhtml'
import type { CheckboxSchema, ComponentContext } from '../types'

export default { form }
export type CheckboxContext = ComponentContext<CheckboxSchema> & {
  input: {
    type: 'input'
    component: CheckboxSchema
    changeEvent: string
    attr: object
    label: string
    labelClass: string
  }
  checked: boolean
  tooltip: string
}
/**
 * @see https://github.com/formio/formio.js/blob/v4.21.3/src/components/checkbox/Checkbox.js#L115C2-L120
 * @see https://github.com/formio/formio.js/blob/v4.21.3/src/templates/bootstrap/checkbox/form.ejs
 */
export function form(ctx: CheckboxContext) {
  return (
    <label
      class={`${ctx.input.labelClass} flex items-center gap-x-16 my-20`}
      data-testid={`checkbox-${ctx.instance.id}`}
    >
      <input
        ref="input"
        id={`${ctx.instance.id}-${ctx.component.key}`}
        {...ctx.input.attr}
        checked={ctx.checked}
        class={classes(
          'appearance-none',
          'w-40',
          'h-40',
          'shrink-0',
          'border',
          'border-2',
          'outline-2',
          'outline-offset-4',
          'outline-primary500',
          'focus:outline',
          'disabled:bg-neutral100',
          'disabled:border-neutral300',
          'rounded',
          'checked:border-primary500',
          'checked:bg-check-white'
        )}
        aria-required={ctx.component.validate?.required ? 'true' : 'false'}
        aria-describedby={`d-${ctx.instance.id}-${ctx.component.key}`}
      />
      <span>{ctx.input.label}</span>
    </label>
  )
}

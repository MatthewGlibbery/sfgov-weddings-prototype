/** @jsx h */
/** @jsxFrag null */
/** @jsxRuntime classic */
import h from 'vhtml'
import { classes } from '../../components'
import type { SelectSchema, ComponentContext } from '../types'

export default { form }
export type SelectContext = ComponentContext<SelectSchema> & {
  input: {
    ref: string
    type: 'select'
    component: SelectSchema
    attr: object
    multiple: boolean
  }
  selectOptions: string
}
/**
 * @see https://github.com/formio/formio.js/blob/v4.21.3/src/components/select/Select.js#L864-L869
 * @see https://github.com/formio/formio.js/blob/v4.21.3/src/templates/bootstrap/select/form.ejs
 */
export function form({ t, ...ctx }: SelectContext) {
  const isMultiple = ctx.input.multiple ? 'multiple' : null
  const isDescribed = ctx.component.description
    ? `aria-describedby="d-${ctx.instance.id}-${ctx.component.key}`
    : ''
  return (
    <>
      <select
        className={classes(
          'appearance-none',
          '!h-[56px] w-full p-16',
          '!border-1 !border-black bg-white !rounded-4',
          'dropdown-open !bg-[right_0.5rem_top_50%]',
          'focus:!border-primary500',
          'focus:!ring focus:!ring-2 focus:!ring-primary500'
        )}
        {...{ isMultiple, isDescribed }}
        ref={ctx.input.ref || 'selectContainer'}
        {...Object.entries(ctx.input.attr).map(([key, value]) => (
          <div key={key}>
            {key}={value}
          </div>
        ))}
        aria-required={ctx.component.validate?.required}
        data-testid="formio-sfds-select"
      >
        <div dangerouslySetInnerHTML={{ __html: ctx.selectOptions }} />
      </select>

      {/* for the future multiselect autocomplete styling
      <input
        type="text"
        className="formio-select-autocomplete-input"
        ref="autocompleteInput"
        autoComplete={
          ctx.input.attr.autocomplete ? ctx.input.attr.autocomplete : ''
        }
        tabIndex={-1}
        aria-label={t('autocomplete', { defaultValue: 'Autocomplete' })}
      /> */}
    </>
  )
}

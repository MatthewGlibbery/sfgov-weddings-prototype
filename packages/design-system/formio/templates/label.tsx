/** @jsx h */
/** @jsxFrag null */
/** @jsxRuntime classic */
import h from 'vhtml'
import type { ComponentContext } from '../types'

export default { form }

/**
 * @see https://github.com/formio/bootstrap/blob/f2326e05ed5515c86396abf04c44e513f6043ea8/src/templates/bootstrap5/label/form.ejs
 */
export function form({ t, ...ctx }: ComponentContext) {
  const uniqueId = `${ctx.instance.id}-${ctx.component.key}`
  const required = ctx.component.validate?.required ? (
    <span
      className="text-danger600"
      aria-label={t('required', { defaultValue: 'Required' })}
    >
      {' '}
      {t('*', { defaultValue: '*' })}
    </span>
  ) : (
    ''
  )
  const labelText = (ctx.component.label || '') + required

  return (
    <>
      <label
        ref="label"
        className={`text-label-md ${ctx.label?.className?.replace(
          'field-required',
          ''
        )}`}
        id={`l-${uniqueId}`}
        dangerouslySetInnerHTML={{
          __html: labelText
        }}
      ></label>
    </>
  )
}

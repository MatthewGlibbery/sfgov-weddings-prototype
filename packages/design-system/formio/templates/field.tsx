/** @jsx h */
/** @jsxFrag null */
/** @jsxRuntime classic */
import h from 'vhtml'
import type { ComponentContext } from '../types'

export default { form }
export type FieldContext = ComponentContext & {
  label: JSX.IntrinsicElements['label'] & { labelPosition?: string }
  labelMarkup: string
  element: string
}
/**
 * @see https://github.com/formio/formio.js/blob/v4.21.3/src/components/_classes/field/Field.js
 * @see https://github.com/formio/formio.js/blob/v4.21.3/src/templates/bootstrap/field/form.ejs
 */
export function form({ ...ctx }: FieldContext) {
  const description = ctx.component.description

  return (
    <>
      {!ctx.label.hidden && ctx.label.labelPosition !== 'bottom'
        ? ctx.labelMarkup
        : ''}

      {description ? (
        <div
          id={`d-${ctx.instance.id}-${ctx.component.key}`}
          className="text-neutral600 my-8"
        >
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </div>
      ) : (
        ''
      )}
      <div ref="messageContainer" className="text-danger600" />
      <div dangerouslySetInnerHTML={{ __html: ctx.element }} className="mt-4" />

      {!ctx.label.hidden && ctx.label.labelPosition === 'bottom'
        ? ctx.labelMarkup
        : ''}
    </>
  )
}

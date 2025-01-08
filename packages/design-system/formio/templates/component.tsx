/** @jsx h */
/** @jsxFrag null */
/** @jsxRuntime classic */
import h from 'vhtml'
import type { ComponentContext } from '../types'

export default { form }

/**
 * @see https://github.com/formio/formio.js/blob/v4.21.3/src/components/_classes/component/Component.js#L1192-L1198
 * @see https://github.com/formio/bootstrap/blob/main/src/templates/bootstrap5/component/form.ejs
 */
export function form(ctx: ComponentContext) {
  return (
    <div
      id={ctx.id}
      // 'row' caused fieldset rows with multiple columns to be misaligned
      className={ctx.classes?.replace('row', '')}
      ref="component"
    >
      {ctx.visible ? (
        <>
          <div dangerouslySetInnerHTML={{ __html: ctx.children }} />
        </>
      ) : null}
    </div>
  )
}

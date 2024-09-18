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
    <div id={ctx.id} ref="component">
      {ctx.visible ? (
        <>
          <div dangerouslySetInnerHTML={{ __html: ctx.children }} />
          <div ref="messageContainer" className="text-danger600" />
        </>
      ) : null}
    </div>
  )
}

/** @jsx h */
/** @jsxFrag null */
/** @jsxRuntime classic */
import h from 'vhtml'
import type { ComponentProps } from 'react'
import type { ComponentContext } from '../types'
import { omit } from '../utils'

export default { form }

// https://github.com/formio/formio.js/blob/v4.21.3/src/components/_classes/input/Input.js#L157-L164
type AlertContext = ComponentContext & {
  type: 'danger' | 'warning' | 'success'
  message: string
  attrs: ComponentProps<'div'>
}

/**
 * @see https://github.com/formio/bootstrap/blob/main/src/templates/bootstrap5/alert/form.ejs
 */
export function form(ctx: AlertContext) {
  let className = 'text-warning600 bg-warning100'
  // istanbul ignore next
  switch (ctx.type) {
    case 'danger':
      className = 'text-danger600 bg-danger100'
      break
    case 'success':
      className = 'text-success600 bg-success100'
      break
  }
  const attrs = omit(ctx.attrs, ['class', 'style', 'role'])
  return (
    <div
      role="alert"
      className={`
      mt-20 rounded-4 p-16 border-1 border-solid border-current ${className}
      `.trim()}
      dangerouslySetInnerHTML={{ __html: ctx.message }}
      {...attrs}
    />
  )
}

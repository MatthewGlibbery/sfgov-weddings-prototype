/* eslint-disable dot-notation */
/** @jsx h */
/** @jsxFrag null */
/** @jsxRuntime classic */
import { classes } from '../../components'
import h from 'vhtml'
import type { HTMLElementSchema, FormSchema, ComponentContext } from '../types'

export default { form }
export type HTMLElementContext = ComponentContext<FormSchema> & {
  component: HTMLElementSchema
  tag: string
  attrs: {
    attr: string
    value: string
  }[]
  content: string
  singleTags: string[]
}
/**
 * @see https://github.com/formio/formio.js/blob/v4.21.3/src/components/html/HTML.js#L70-L89
 * @see https://github.com/formio/formio.js/blob/v4.21.3/src/templates/bootstrap/html/form.ejs
 */
export function form({ t, ...ctx }: HTMLElementContext) {
  // build an object from the attrs array
  const attrs = ctx.attrs
    .filter(({ attr, value }) => attr && value)
    .reduce((attrs, { attr, value }) => ({ ...attrs, [attr]: value }), {})
  const Tag = ctx.tag !== 'p' ? ctx.tag : 'div'
  return (
    <Tag
      {...attrs}
      ref="html"
      className={classes(
        'formio-component-htmlelement',
        ctx.component.className
      )}
      dangerouslySetInnerHTML={{ __html: ctx.content }}
    />
  )
}

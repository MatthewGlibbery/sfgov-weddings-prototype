/* eslint-disable react/function-component-definition */
/** @jsx h */
/** @jsxFrag null */
/** @jsxRuntime classic */
import h from 'vhtml'
import type { ComponentProps, HTMLAttributes } from 'react'
import type { ComponentContext, ComponentSchema } from '../types'
import { omit } from '../utils'

export default { form }

type InputType = 'input' | 'select'

// https://github.com/formio/formio.js/blob/v4.21.3/src/components/_classes/input/Input.js#L157-L164
export type InputContext = ComponentContext & {
  component: ComponentSchema
  prefix?: string | HTMLElement
  suffix?: string | HTMLElement
  hasValueMaskInput: boolean
  // https://github.com/formio/formio.js/blob/v4.21.3/src/components/_classes/input/Input.js#L21-L62
  input: {
    type: InputType
    attr: HTMLAttributes<InputType>
    content?: string
    ref?: string
  }
}

/**
 * @see https://github.com/formio/bootstrap/blob/main/src/templates/bootstrap5/input/form.ejs
 */
export function form(ctx: InputContext) {
  // istanbul ignore next
  const required =
    ctx.input.ref === 'input' || !ctx.input.ref
      ? ctx.component.validate?.required
      : ctx.component.fields?.[ctx.input.ref]?.required || false

  const uniqueId = `${ctx.instance.id}-${ctx.component.key}`
  const { prefix, suffix } = ctx

  return prefix || suffix ? (
    <div className="flex">
      <Addendum text={prefix} ref="prefix" className="flex-shrink self-start" />
      <Input className="flex-auto" />
      <Addendum text={suffix} ref="suffix" className="flex-shrink self-end" />
    </div>
  ) : (
    <Input />
  )

  function Input({ className }: { className?: string }) {
    const Tag = ctx.input.type
    const attrs = omit(ctx.input.attr, ['class', 'className', 'style'])
    return (
      <>
        <Tag
          ref={ctx.input.ref || 'input'}
          id={uniqueId}
          aria-labelledby={[
            `l-${uniqueId}`,
            ctx.component.description ? `d-${uniqueId}` : ''
          ]
            .join(' ')
            .trim()}
          required={required}
          aria-required={required}
          className={[
            'rounded-4 px-8 py-4',
            'text-neutral800',
            'border-1 border-solid border-[currentcolor]',
            'shadow-sm',
            'shadow-[transparent]',
            'flex-auto',
            'focus:shadow-neutral300',
            'aria-invalid:text-danger600',
            'aria-invalid:bg-danger100',
            className || ''
          ].join(' ')}
          {...attrs}
          dangerouslySetInnerHTML={{ __html: ctx.input.content || '' }}
        />
        {
          /* istanbul ignore next */
          ctx.hasValueMaskInput ? <input ref="valueMaskInput" /> : null
        }
        {ctx.component.type === 'datetime' ? (
          <span
            id={`${ctx.instance.id}-liveRegion`}
            className="sr-only"
            aria-live="assertive"
            ref="liveRegion"
            data-testid="datetime-live-region"
          ></span>
        ) : null}
        {ctx.component.showCharCount || ctx.component.showWordCount ? (
          <div className="flex">
            {ctx.component.showCharCount ? (
              <span
                ref="charcount"
                aria-live="polite"
                data-testid="charcount"
              />
            ) : null}
            {ctx.component.showWordCount ? (
              <span
                ref="wordcount"
                aria-live="polite"
                data-testid="wordcount"
              />
            ) : null}
          </div>
        ) : null}
      </>
    )
  }
}

function Addendum({
  text,
  ...rest
}: ComponentProps<'span'> & { text?: string | HTMLElement }) {
  if (text instanceof HTMLElement) text = text.outerHTML
  return text ? (
    <span {...rest} dangerouslySetInnerHTML={{ __html: text }} />
  ) : null
}

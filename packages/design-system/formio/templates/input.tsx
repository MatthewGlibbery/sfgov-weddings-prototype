/** @jsx h */
/** @jsxFrag null */
/** @jsxRuntime classic */
import h from 'vhtml'
import type { ComponentProps, HTMLAttributes } from 'react'
import type { ComponentContext, InputComponentSchema } from '../types'
import { omit } from '../utils'
import { classes } from '../../components'
import { classed } from '@tw-classed/core'

export default { form }

type InputType = 'input' | 'select'

// https://github.com/formio/formio.js/blob/v4.21.3/src/components/_classes/input/Input.js#L157-L164
export type InputContext = ComponentContext<InputComponentSchema> & {
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

const addendumClass = classed({
  base: classes(
    'flex align-middle px-8 py-4',
    'border-1 border-solid border-neutral300 bg-neutral100 text-neutral700'
  ),
  variants: {
    variant: {
      prefix: 'rounded-l border-r-0',
      suffix: 'rounded-r border-l-0'
    }
  }
})

/**
 * @see https://github.com/formio/bootstrap/blob/main/src/templates/bootstrap5/input/form.ejs
 */
export function form({ component, input, ...ctx }: InputContext) {
  const { ref } = input
  // istanbul ignore next
  const required =
    ref === 'input' || !ref
      ? component.validate?.required
      : // @ts-expect-error this can be a "day" component with sub-fields
        component.fields?.[ref]?.required || null

  const uniqueId = `${ctx.instance.id}-${component.key}`
  const { prefix, suffix } = ctx

  return prefix || suffix ? (
    <div className="flex items-stretch">
      <Addendum
        text={prefix}
        ref="prefix"
        className={addendumClass({ variant: 'prefix' })}
      />
      <Input
        className={classes(
          'flex-auto',
          prefix && 'rounded-l-0',
          suffix && 'rounded-r-0'
        )}
      />
      <Addendum
        text={suffix}
        ref="suffix"
        className={addendumClass({ variant: 'suffix' })}
      />
    </div>
  ) : (
    <Input />
  )

  function Input({ className }: { className?: string }) {
    const Tag = input.type
    const attrs = omit(input.attr, ['class', 'className', 'style'])
    return (
      <>
        <Tag
          ref={input.ref || 'input'}
          id={uniqueId}
          aria-labelledby={`l-${uniqueId} d-${uniqueId}`}
          required={required}
          aria-required={required}
          className={[
            'h-[56px]',
            'w-full',
            'rounded-4 px-8 py-4',
            'text-neutral800',
            'border-1 border-solid border-black',
            'shadow-sm',
            'shadow-[transparent]',
            'flex-auto',
            'focus:outline-none focus:border-[transparent]',
            'focus:!ring focus:!ring-3 focus:!ring-primary500',
            'aria-invalid:text-danger600',
            'aria-invalid:border-danger600',
            'aria-invalid:bg-danger100',
            'disabled:border-neutral300',
            'disabled:bg-neutral100',
            className || ''
          ].join(' ')}
          {...attrs}
          dangerouslySetInnerHTML={{ __html: input.content || '' }}
        />
        {
          /* istanbul ignore next */
          ctx.hasValueMaskInput ? <input ref="valueMaskInput" /> : null
        }
        {component.type === 'datetime' ? (
          <span
            id={`${ctx.instance.id}-liveRegion`}
            className="sr-only"
            aria-live="assertive"
            ref="liveRegion"
            data-testid="datetime-live-region"
          ></span>
        ) : null}
        {component.showCharCount || component.showWordCount ? (
          <div className="flex justify-end text-neutral700">
            {component.showCharCount ? (
              <span
                ref="charcount"
                aria-live="polite"
                data-testid="charcount"
              />
            ) : null}
            {component.showWordCount ? (
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

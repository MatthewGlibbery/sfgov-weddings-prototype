import {
  classed,
  classes,
  HeadingMd,
  HeadingSm,
  HeadingXl,
  IconInfo,
  Link
} from '@/design-system'
import type { TypeAlertBlockValues } from '@/types'
import type { ComponentProps } from 'react'
import { RichText } from './RichText'
import type { HTMLComponentMap } from './wagtail'

const PreviewAlert = classed(
  'div',
  'w-full bg-[#1F7E9A] flex space-x-12 p-20 md:px-28 lg:p-28 text-white'
)

const SitewideAlertWrapper = classed('div', {
  base: 'flex border-1 items-start',
  variants: {
    variant: {
      information: 'bg-information50 border-information600',
      critical: 'bg-danger10 border-danger600'
    }
  }
})

const InfoAlert = classed(
  'div',
  'w-full bg-information50 border-1 border-information600 flex items-start space-x-12 p-20 md:px-28 lg:p-28'
)

export const ALERT_RICH_TEXT_COMPONENTS = {
  h2: (props) => <HeadingXl as="h2" className="mb-8 last:mb-0" {...props} />,
  h3: (props) => <HeadingMd as="h3" className="mb-8 last:mb-0" {...props} />,
  h4: (props) => <HeadingSm as="h4" className="mb-8 last:mb-0" {...props} />,
  a: (props) => (
    <Link as="a" className="text-primary600 mb-8 last:mb-0" {...props} />
  ),
  p: classed('p', 'mb-8 last:mb-0'),
  ul: classed('ul', 'mb-8 last:mb-0'),
  ol: classed('ol', 'mb-8 last:mb-0'),
  li: classed('li', 'mb-8 last:mb-0'),
  br: () => <br data-testid="test-br" />,
  blockquote: classed(
    'blockquote',
    'bg-neutral50 p-20 rounded-4 mb-8 last:mb-0'
  )
} as const satisfies HTMLComponentMap

export type AlertProps = ComponentProps<
  typeof PreviewAlert | typeof InfoAlert
> &
  TypeAlertBlockValues

export const Alert = ({
  description,
  expiration_date: expirationDate,
  variant,
  ...rest
}: AlertProps) =>
  variant === 'preview' ? (
    <PreviewAlert {...rest}>
      <IconInfo className="shrink-0" width={24} />
      <div>
        <RichText html={description} components={ALERT_RICH_TEXT_COMPONENTS} />
      </div>
    </PreviewAlert>
  ) : !expirationDate || new Date(expirationDate) > new Date() ? (
    <InfoAlert {...rest}>
      <IconInfo className="text-information600 shrink-0" width={24} />
      <div>
        <RichText html={description} components={ALERT_RICH_TEXT_COMPONENTS} />
      </div>
    </InfoAlert>
  ) : null

export const SitewideAlert = ({
  alert_style: style,
  alert_text: text
}: {
  alert_style: 'information' | 'critical'
  alert_text: string
}) => (
  <SitewideAlertWrapper variant={style}>
    <div className="flex items-start space-x-20 m-20 max-w-xl md:mx-28 lg:mx-96 xl:mx-auto">
      <IconInfo
        className={classes(
          style === 'information' ? 'text-information600' : 'text-danger600',
          'shrink-0'
        )}
        width={20}
      />
      <RichTextWrapper className="xl:w-[1280px]">
        <RichText html={text} />
      </RichTextWrapper>
    </div>
  </SitewideAlertWrapper>
)

/**
 * This wrapper undoes the margins on its direct descendants and adds it back in
 * more consistently with a vertical spacing utility:
 * https://v3.tailwindcss.com/docs/space#add-vertical-space-between-children
 */
const RichTextWrapper = classed('div', '*:!m-0 !space-y-8')

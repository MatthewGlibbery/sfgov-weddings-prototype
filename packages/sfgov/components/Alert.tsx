import { classed, classes, IconInfo } from '@/design-system'
import type { TypeAlertBlockValues } from '@/types'
import type { ComponentProps } from 'react'
import { RichText } from './RichText'

const PreviewAlert = classed(
  'div',
  'w-full bg-[#1F7E9A] flex space-x-20 lg:mb-28 py-28 px-20 md:px-28 lg:px-96 text-white'
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
  'w-full bg-information10 border-1 border-information600 flex items-start md:items-center space-x-20 mb-28 py-28 px-20 md:px-28 lg:px-96'
)

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
      <IconInfo className="shrink-0" width={20} />
      <RichText html={description} />
    </PreviewAlert>
  ) : (expirationDate ? new Date(expirationDate) > new Date() : false) ? (
    <InfoAlert {...rest}>
      <IconInfo className="text-information600 shrink-0" width={20} />
      <RichText html={description} />
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

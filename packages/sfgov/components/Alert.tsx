import { classed, IconInfo } from '@/design-system'
import { TypeAlertBlockValues } from '@/types'
import { ComponentProps } from 'react'
import { RichText } from './RichText'

const PreviewAlert = classed(
  'div',
  'w-full bg-[#1F7E9A] flex space-x-20 mb-28 py-28 px-20 md:px-28 lg:px-96 text-white'
)
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

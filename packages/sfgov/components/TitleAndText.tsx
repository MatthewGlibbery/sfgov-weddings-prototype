import { TypeTitleAndTextValues } from '@/types'
import { TitleLg } from '@/design-system'
import { RichText } from './RichText'

export type TitleAndTextProps = JSX.IntrinsicElements['section'] &
  TypeTitleAndTextValues

export const TitleAndText = ({ title, text, ...rest }: TitleAndTextProps) => {
  if (!title && !text) return null
  return (
    <section {...rest}>
      {title ? <TitleLg as="h3">{title}</TitleLg> : null}
      {text ? <RichText html={text} /> : null}
    </section>
  )
}

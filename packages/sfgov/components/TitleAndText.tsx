import { TypeTitleAndTextValues } from '@/types'
import { HeadingXl, HeadingXXl } from '@/design-system'
import { RichText } from './RichText'
import { When } from 'react-if'

export type TitleAndTextProps = JSX.IntrinsicElements['section'] &
  TypeTitleAndTextValues

export const TitleAndText = ({
  title,
  text,
  as = 'h3',
  id,
  ...rest
}: TitleAndTextProps) => {
  if (!title && !text) return null
  return (
    <section className="flex flex-col gap-y-12" {...rest}>
      <When condition={!!title}>
        <HeadingXl as={as} id={id || ''}>
          {title}
        </HeadingXl>
      </When>
      <When condition={!!text}>
        <RichText html={text} />
      </When>
    </section>
  )
}

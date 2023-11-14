import { TypeTitleAndTextValues } from '@/types'
import { HeadingXl, HeadingXXl } from '@/design-system'
import { RichText } from './RichText'
import { When } from 'react-if'

export type TitleAndTextProps = JSX.IntrinsicElements['section'] &
  TypeTitleAndTextValues

export const TitleAndText = ({
  title,
  text,
  h2 = false,
  id,
  ...rest
}: TitleAndTextProps) => {
  if (!title && !text) return null
  const TitleComponent = h2 ? HeadingXXl : HeadingXl
  return (
    <section className="flex flex-col gap-y-12" {...rest}>
      <When condition={!!title}>
        <TitleComponent as={h2 ? 'h2' : 'h3'} id={id || ''}>
          {title}
        </TitleComponent>
      </When>
      <When condition={!!text}>
        <RichText html={text} />
      </When>
    </section>
  )
}

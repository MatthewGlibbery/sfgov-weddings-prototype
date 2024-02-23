import { TypeTitleAndTextValues } from '@/types'
import { HeadingSm } from '@/design-system'
import { RichText } from './RichText'
import { When } from 'react-if'

export type TitleAndTextProps = JSX.IntrinsicElements['section'] &
  TypeTitleAndTextValues

export const TitleAndText = ({
  title,
  text,
  as = 'h3',
  id,
  heading,
  ...rest
}: TitleAndTextProps) => {
  if (!title && !text) return null
  const TitleComponent = heading ?? HeadingSm
  return (
    <section className="flex flex-col gap-y-12" {...rest}>
      <When condition={!!title}>
        <TitleComponent as={as} id={id || ''}>
          {title}
        </TitleComponent>
      </When>
      <When condition={!!text}>
        <RichText html={text} />
      </When>
    </section>
  )
}

import { TypeTitleAndTextValues } from '@/types'
import { HeadingSm } from '@/design-system'
import { RichText } from './RichText'
import { When } from 'react-if'

export type TitleAndTextProps = JSX.IntrinsicElements['section'] &
  TypeTitleAndTextValues & {
    as?: string
    id?: string
    heading?: React.FC
    headingClasses?: string
  }

export const TitleAndText = ({
  title,
  text,
  as = 'h3',
  id,
  heading,
  headingClasses,
  ...rest
}: TitleAndTextProps) => {
  if (!title && !text) return null
  const TitleComponent = heading ?? HeadingSm
  return (
    <section className="flex flex-col gap-y-12" {...rest}>
      <When condition={!!title}>
        <TitleComponent as={as} id={id || ''} className={headingClasses}>
          {title}
        </TitleComponent>
      </When>
      <When condition={!!text}>
        <RichText html={text} />
      </When>
    </section>
  )
}

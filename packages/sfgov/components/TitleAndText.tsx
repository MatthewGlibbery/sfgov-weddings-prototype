import type { TypeTitleAndTextValues } from '@/types'
import { HeadingSm } from '@/design-system'
import { RichText } from './RichText'
import type { HTMLComponentMap } from './wagtail'

export type TitleAndTextProps = JSX.IntrinsicElements['section'] &
  TypeTitleAndTextValues & {
    as?: string
    id?: string
    heading?: React.FC
    headingClasses?: string
    richTextComponents?: HTMLComponentMap
  }

export const TitleAndText = ({
  title,
  text,
  as = 'h3',
  id,
  heading,
  headingClasses,
  richTextComponents,
  ...rest
}: TitleAndTextProps) => {
  if (!title && !text) return null
  const TitleComponent = heading ?? HeadingSm
  return (
    <section className="flex flex-col gap-y-12" {...rest}>
      {title ? (
        <TitleComponent as={as} id={id || ''} className={headingClasses}>
          {title}
        </TitleComponent>
      ) : null}
      {text ? <RichText html={text} components={richTextComponents} /> : null}
    </section>
  )
}

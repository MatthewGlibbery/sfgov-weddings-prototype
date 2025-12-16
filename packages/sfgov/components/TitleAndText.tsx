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
  richTextComponents = undefined,
  ...rest
}: TitleAndTextProps) => {
  if (!title && !text) return null
  const TitleComponent = heading ?? HeadingSm
  return (
    // TODO: richTextComponents and this conditional class can go
    // away once we've finalized the default rich text components
    // CMS-1226, CMS-1272, CMS-1273, CMS-1274
    <section
      className={`${!richTextComponents ? 'flex flex-col gap-y-12' : ''}`}
      {...rest}
    >
      {title ? (
        <TitleComponent as={as} id={id || ''} className={headingClasses}>
          {title}
        </TitleComponent>
      ) : null}
      {text ? <RichText html={text} components={richTextComponents} /> : null}
    </section>
  )
}

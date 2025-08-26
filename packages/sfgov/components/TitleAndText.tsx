import { TypeTitleAndTextValues } from '@/types'
import { HeadingSm } from '@/design-system'
import { RichText } from './RichText'

export type TitleAndTextProps = JSX.IntrinsicElements['section'] &
  TypeTitleAndTextValues & {
    as?: string
    id?: string
    heading?: React.FC
    headingClasses?: string
    isDarkBg?: boolean
  }

export const TitleAndText = ({
  title,
  text,
  as = 'h3',
  id,
  heading,
  headingClasses,
  isDarkBg = false,
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
      {text ? (
        <RichText
          html={text}
          isDarkBg={isDarkBg}
          headingClasses={headingClasses}
        />
      ) : null}
    </section>
  )
}

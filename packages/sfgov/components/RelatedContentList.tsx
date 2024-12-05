import { PageLink } from './PageLink'
import { HeadingXXl } from '@/design-system'
import type { RelatedContentData } from '@/types'
import type { ComponentType } from 'react'

type PageLinkProps = Omit<JSX.IntrinsicElements['div'], 'className'> & {
  item: RelatedContentData
}

type RelatedContentProps = Omit<JSX.IntrinsicElements['div'], 'content'> & {
  content: RelatedContentData[]
  component?: ComponentType<PageLinkProps>
}

const PageLinkWithBorder = ({ item, ...rest }: PageLinkProps) => (
  <div
    className="
    pb-20
    md:[&:nth-child(3n+1)]:border-r-1 
    md:[&:nth-child(3n+1)]:pr-28
    md:[&:nth-child(3n)]:border-l-1 
    md:[&:only-child]:border-r-0
    md:border-neutral200 md:[&:not(:nth-child(3n+1))]:pl-28 
  "
    {...rest}
  >
    <PageLink page={item} />
  </div>
)

export const RelatedContentList = ({
  content,
  title,
  component,
  ...rest
}: RelatedContentProps) => {
  if (!content?.length) return null

  const Content = component || PageLinkWithBorder

  const gridClass =
    !component && content.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'
  const gapClass = component ? 'gap-y-28' : ''
  return (
    <div {...rest}>
      {title ? (
        <HeadingXXl as="h2" className="!mb-20">
          {title}
        </HeadingXXl>
      ) : null}
      <div
        className={`flex flex-col md:grid gap-x-28 ${gridClass} ${gapClass}`}
      >
        {content.map((item: RelatedContentData, i) => (
          <Content key={i} item={item} />
        ))}
      </div>
    </div>
  )
}

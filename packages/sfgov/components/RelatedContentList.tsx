import { PageLink } from './PageLink'
import { HeadingXXl, type ContainerProps } from '@/design-system'
import { RelatedContentData } from '@/types'
import { FC } from 'react'

type ComponentProps = {
  item: RelatedContentData
}

type RelatedContentProps = {
  content: RelatedContentData[]
  component?: FC<ComponentProps>
} & ContainerProps

const PageLinkWithBorder = ({ item }: ComponentProps) => (
  <div
    className="
    pb-20
    md:[&:nth-child(3n+1)]:border-r-1 
    md:[&:nth-child(3n)]:border-l-1 
    md:border-neutral200 md:[&:not(:nth-child(3n+1))]:pl-28 
  "
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
  return (
    <div {...rest}>
      <HeadingXXl as="h2" className="mb-[20px]">
        {title}
      </HeadingXXl>
      <div className="flex flex-col md:grid md:grid-cols-3 gap-28">
        {content.map((item: RelatedContentData) => (
          <Content key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

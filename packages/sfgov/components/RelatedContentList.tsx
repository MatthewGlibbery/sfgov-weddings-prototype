import { PageLink } from './PageLink'
import { Grid, HeadingXXl, type ContainerProps } from '@/design-system'
import { RelatedContentData } from '@/types'

type RelatedContentProps = {
  content: RelatedContentData[]
} & ContainerProps

export const RelatedContentList = ({
  content,
  title,
  ...rest
}: RelatedContentProps) => {
  if (!content?.length) return null
  return (
    <div {...rest}>
      <HeadingXXl as="h2">{title}</HeadingXXl>
      <div className="md:grid md:grid-cols-3">
        {content.map((item: RelatedContentData, i: number) => (
          <div
            key={i}
            className="
              py-20 md:[&:nth-child(3n+1)]:border-r-1 
              md:[&:nth-child(3n)]:border-l-1 
              md:border-neutral200 md:[&:not(:nth-child(3n+1))]:pl-28 
            "
          >
            <PageLink page={item} />
          </div>
        ))}
      </div>
    </div>
  )
}

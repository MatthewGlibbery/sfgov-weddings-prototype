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
      <Grid className="grid-cols-2 gap-x-28">
        {content.map((item: RelatedContentData, i: number) => (
          <div
            key={i}
            className="my-20 even:pl-12 md:even:border-l-1 md:even:border-l-grey300"
          >
            <PageLink page={item} />
          </div>
        ))}
      </Grid>
    </div>
  )
}

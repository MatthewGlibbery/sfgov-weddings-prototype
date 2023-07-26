import { PageLink } from './PageLink'
import { Container, HeadingXXl, type ContainerProps } from '@/design-system'
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
    <Container {...rest}>
      <HeadingXXl as="h2">{title}</HeadingXXl>
      <ul>
        {content.map((item: RelatedContentData, i: number) => (
          <li key={i}>
            <PageLink page={item.page_content} />
          </li>
        ))}
      </ul>
    </Container>
  )
}

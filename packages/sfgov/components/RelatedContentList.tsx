import { PageLink } from './PageLink'
import { Container, HeadingMd, type ContainerProps } from '@/design-system'
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
      <HeadingMd as="h2">{title}</HeadingMd>
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

import React, { ComponentProps } from 'react'
import { PageLink } from './PageLink'
import { Container, TitleMd } from '@/design-system'
import { RelatedContentData } from '@/types'

type ContainerProps = ComponentProps<typeof Container>
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
      <TitleMd as="h2">{title}</TitleMd>
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

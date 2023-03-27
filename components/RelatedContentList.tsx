import React, { ComponentProps } from 'react'
import { Container, TitleMd } from '@/design-system'
import { RelatedContentData } from '@/types'
import { PageLink } from './PageLink'

type ContainerProps = ComponentProps<typeof Container>
type RelatedContentProps = {
  content: RelatedContentData[]
} & ContainerProps

export const RelatedContentList = ({ content, title, ...rest }: RelatedContentProps) => {
  if (!content?.length) return null
  const actualTitle = title ? <TitleMd as='h2'>{title}</TitleMd> : null
  return <Container {...rest}>
    {actualTitle}
    <ul>
      {content.map((item: RelatedContentData, i: number) => <li key={i}>
        <PageLink page={item.page_content} />
      </li>)}
    </ul>
  </Container>
}

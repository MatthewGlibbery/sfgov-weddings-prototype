import NextImage from 'next/image'
import { resolveImage } from '@/lib/utils'
import { BigDesc, Container, DisplayLg, TitleMd } from '@sfgov/design-system/dist/react'
import Image from './Image'
import { InfoPageData, PageComponent, PageProps, RelatedContentData, WagtailImageData } from '@/types'
import React, { ComponentProps } from 'react'
import PageLink from './PageLink'
import TitleAndText from './TitleAndText'
import PageWrapper from './page/PageWrapper'

export type InfoPageProps = PageProps<InfoPageData>

type ContainerProps = ComponentProps<typeof Container>
type ContentBlock = InfoPageData['information_section'][number]

const InformationPage: PageComponent<InfoPageProps> = props => {
  const {
    title,
    description,
    related_content_part_of: partOf,
    information_section: infoSections,
    related_content_agencies: agencies,
    related_content_topics: topics,
    related_content_page: pages
  } = props.page
  return (
    <PageWrapper title={title}>
      <Container css={{ mb: 20 }}>
        <DisplayLg as='h1' css={{ my: 40 }} data-testid='info-page-title'>{title}</DisplayLg>
        {description
          ? <BigDesc as='p' data-testid='info-page-description'>{description}</BigDesc>
          : null}
      </Container>
      <RelatedContentList
        title='Part of' /* FIXME: translate */
        content={partOf}
        data-testid='info-page-part-of' />
      <InfoSectionList
        as='main'
        blocks={infoSections}
        data-testid='info-page-content' />
      <RelatedContentList
        id='divisions'
        title='Departments' /* FIXME: translate */
        content={agencies}
        data-testid='info-page-agencies' />
      <RelatedContentList
        id='topics'
        title='Topics' /* FIXME: translate */
        content={topics}
        data-testid='info-page-topics' />
      <RelatedContentList
        id='related'
        title='Related' /* FIXME: translate */
        content={pages}
        data-testid='info-page-related' />
    </PageWrapper>
  )
}

/* istanbul ignore next */
InformationPage.loadReferences = async (data, api) => {
  if (Array.isArray(data.information_section)) {
    for (const block of data.information_section) {
      if (block.type === 'image') {
        block.value = await resolveImage(block.value, api)
      }
    }
  }
}

export default InformationPage

type RelatedContentProps = {
  content: RelatedContentData[]
} & ContainerProps

function InfoSectionList ({ blocks, ...rest }: { blocks: ContentBlock[] } & ContainerProps) {
  if (!blocks?.length) return null
  return <Container {...rest}>
    {blocks.map(block => (
      <InfoSectionContent
        key={block.id}
        block={block}
        data-testid={`block-${block.id}`}
      />
    ))}
  </Container>
}

function InfoSectionContent ({ block, ...rest }: { block: ContentBlock }) {
  switch (block.type) {
    case 'image':
      return <Image as={NextImage} alt='' imageRef={block.value as WagtailImageData} {...rest} />
    case 'title_and_text':
      return <TitleAndText block={block} {...rest} />
  }
  return null
}

function RelatedContentList ({ content, title, ...rest }: RelatedContentProps) {
  if (!content?.length) return null
  const actualTitle = title ? <TitleMd as='h2'>{title}</TitleMd> : null
  return <Container {...rest}>
    {actualTitle}
    <ul>
      {content.map((item: RelatedContentData, i: number) => <li key={i}>
        <PageLink page={item.related_content} />
      </li>)}
    </ul>
  </Container>
}

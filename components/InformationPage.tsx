import React from 'react'
import NextImage from 'next/image'
import { resolveImage } from '@/lib/utils'
import { PageLink, TitleAndText } from '@/components'
import { BigDesc, Container, ContainerProps, DisplayLg, Image, TitleMd } from '@/design-system'
import { InfoPageData, InfoPageSection, PageComponent, RelatedContentData, WagtailImageData } from '@/types'
import PageWrapper from './page/PageWrapper'
import { FIXMEAsableProps } from 'design-system/types'

export const InformationPage: PageComponent<InfoPageData> = props => {
  const page = props.page as InfoPageData
  const {
    title,
    description,
    related_content_part_of: partOf,
    information_section: infoSections,
    related_content_agencies: agencies,
    related_content_topics: topics,
    related_content_page: pages
  } = page
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
InformationPage.loadReferences = async (untypedData, api) => {
  const data = untypedData as InfoPageData
  if (Array.isArray(data.information_section)) {
    for (const block of data.information_section) {
      if (block.type === 'image') {
        block.value = await resolveImage(block.value, api) as WagtailImageData
      }
    }
  }
}

type InfoSectionListProps = ContainerProps & {
  blocks: InfoPageSection[] | undefined
} & FIXMEAsableProps

function InfoSectionList ({ blocks, ...rest }: InfoSectionListProps) {
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

type InfoSectionContentProps = {
  block: InfoPageSection
}

function InfoSectionContent ({ block, ...rest }: InfoSectionContentProps) {
  switch (block.type) {
    case 'image':
      return <Image as={NextImage} alt='' imageRef={block.value as WagtailImageData} {...rest} />
    case 'title_and_text':
      return <TitleAndText block={block} {...rest} />
  }
  return null
}

type RelatedContentListProps = {
  title: string
  content: RelatedContentData[] | undefined
  id?: string
} & JSX.IntrinsicAttributes

function RelatedContentList ({ content, title, ...rest }: RelatedContentListProps) {
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

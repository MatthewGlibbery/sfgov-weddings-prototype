import NextImage from 'next/image'
import { BigDesc, Container, ContainerProps, DisplayLg, FIXMEAsableProps } from '@/design-system'
import type { InfoPageData, InfoPageSection, PageComponent, WagtailImageData } from '@/types'
import { resolveImage } from '@/lib/utils'
import { RelatedContentList } from '../RelatedContentList'
import { TitleAndText } from '../TitleAndText'
import { Image } from '../Image'
import { PageWrapper } from './PageWrapper'

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
        content={partOf} />
      <InfoSectionList
        as='main'
        blocks={infoSections} />
      <RelatedContentList
        id='divisions'
        title='Departments' /* FIXME: translate */
        content={agencies} />
      <RelatedContentList
        id='topics'
        title='Topics' /* FIXME: translate */
        content={topics} />
      <RelatedContentList
        id='related'
        title='Related' /* FIXME: translate */
        content={pages} />
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

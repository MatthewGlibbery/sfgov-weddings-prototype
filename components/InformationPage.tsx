import NextImage from 'next/image'
import { resolveImage, resolvePage } from '@/lib/utils'
import { BigDesc, Box, Container, DisplayLg, TitleMd } from '@sfgov/design-system/dist/react'
import Image from './Image'
import { AgencyData, InfoPageData, PageBlock, PageComponent, PageProps, WagtailImageData } from '@/types'
import React, { ComponentProps } from 'react'
import PageLink from './PageLink'
import TitleAndText from './TitleAndText'

export type InfoPageProps = PageProps<InfoPageData>

type ContainerProps = ComponentProps<typeof Container>
type ContentBlock = InfoPageData['information_section'][number]

const InformationPage: PageComponent<InfoPageProps> = props => {
  const {
    title,
    description,
    part_of: partOf,
    information_section: infoSections,
    departments_or_public_bodies: agencies,
    topics,
    related
  } = props.page
  return (
    <Box css={{ mt: 40, mb: 80 }}>
      <Container css={{ mb: 20 }}>
        <DisplayLg as='h1' css={{ my: 40 }} data-testid='info-page-title'>{title}</DisplayLg>
        {description
          ? <BigDesc as='p' data-testid='info-page-description'>{description}</BigDesc>
          : null}
      </Container>
      <PageBlockList
        title='Part of' /* FIXME: translate */
        blocks={partOf}
        data-testid='info-page-part-of' />
      <InfoSectionList
        as='main'
        blocks={infoSections}
        data-testid='info-page-content' />
      <PageBlockList
        id='divisions'
        title='Departments' /* FIXME: translate */
        blocks={agencies}
        data-testid='info-page-agencies' />
      <PageBlockList
        id='topics'
        title='Topics' /* FIXME: translate */
        blocks={topics}
        data-testid='info-page-topics' />
      <PageBlockList
        id='related'
        title='Related' /* FIXME: translate */
        blocks={related}
        data-testid='info-page-related' />
    </Box>
  )
}

/* istanbul ignore next */
InformationPage.loadReferences = async (data, api) => {
  for (const block of data.information_section) {
    if (block.type === 'image') {
      block.value = await resolveImage(block.value, api)
    }
  }
  if (Array.isArray(data.departments_or_public_bodies)) {
    for (const block of data.departments_or_public_bodies) {
      block.value = await resolvePage<AgencyData>(block.value, api)
    }
  }
  if (Array.isArray(data.topics)) {
    for (const block of data.topics) {
      block.value = await resolvePage(block.value, api)
    }
  }
  if (Array.isArray(data.related)) {
    for (const block of data.related) {
      block.value = await resolvePage(block.value, api)
    }
  }
}

export default InformationPage

type PageBlockListProps = {
  blocks: PageBlock[]
  title?: string | JSX.Element
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

function PageBlockList ({ blocks, title, ...rest }: PageBlockListProps) {
  if (!blocks?.length) return null
  const actualTitle = title ? <TitleMd as='h2'>{title}</TitleMd> : null
  return <Container {...rest}>
    {actualTitle}
    <ul>
      {blocks.map((block: PageBlock, i: number) => <li key={i}>
        <PageLink page={block.value} />
      </li>)}
    </ul>
  </Container>
}

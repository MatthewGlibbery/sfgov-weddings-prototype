import { resolveImage, resolvePage } from '@/lib/utils'
import { BigDesc, Box, Container, DisplayLg, TitleLg } from '@sfgov/design-system/dist/react'
import AgencyList from './AgencyList'
import Image from './Image'
import { AgencyData, InfoPageData, PageComponent, PageData, PageProps, WagtailImageData } from '@/types'
import { ComponentProps } from 'react'
import PageLink from './PageLink'
import TitleAndText from './TitleAndText'

export type InfoPageProps = PageProps<InfoPageData>

type ContainerProps = ComponentProps<typeof Container>
type ContentBlock = InfoPageData['information_section'][number]
type TopicBlock = InfoPageData['topics'][number]
type RelatedBlock = InfoPageData['related'][number]

const InformationPage: PageComponent<InfoPageProps> = props => {
  const {
    title,
    description,
    information_section: content,
    departments_or_public_bodies: divisions,
    topics,
    related
  } = props.page
  return (
    <Box css={{ mt: 40, mb: 80 }}>
      <Container css={{ mb: 20 }}>
        <DisplayLg as='h1' css={{ my: 40 }}>{title}</DisplayLg>
        {description ? <BigDesc as='p'>{description}</BigDesc> : null}
      </Container>
      <InfoPageContent as='main' blocks={content} />
      <InfoPageAgencyList id='divisions' agencies={divisions.map(block => block.value as AgencyData)} />
      <InfoPageTopicList id='topics' topics={topics} />
      <InfoPageRelatedList id='related' related={related} />
    </Box>
  )
}

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

function InfoPageContent ({ blocks, ...rest }: { blocks: ContentBlock[] } & ContainerProps) {
  if (!blocks?.length) return null
  return <Container {...rest}>
    {blocks.map(block => <InfoPageContentBlock key={block.id} block={block} />)}
  </Container>
}

function InfoPageContentBlock ({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'image':
      return <Image alt='' imageRef={block.value as WagtailImageData} />
    case 'title_and_text':
      return <TitleAndText block={block} />
  }
}

function InfoPageAgencyList ({ agencies, ...rest }: { agencies: AgencyData[] } & ContainerProps) {
  if (!agencies?.length) return null
  return (
    <Container {...rest}>
      <TitleLg as='h2'>Divisions</TitleLg>
      <p>The title of this section is currently hard-coded in the template.</p>
      <AgencyList agencies={agencies} />
    </Container>
  )
}

function InfoPageTopicList ({ topics, ...rest }: ContainerProps & { topics: TopicBlock[] }) {
  if (!topics?.length) return null
  return (
    <Container {...rest}>
      <TitleLg as='h2'>Topics</TitleLg>
      <ul>
        {topics.map(block => <li key={block.id}>
          <PageLink page={block.value as PageData} />
        </li>)}
      </ul>
    </Container>
  )
}

function InfoPageRelatedList ({ related, ...rest }: { related: RelatedBlock[] } & ContainerProps) {
  if (!related?.length) return null
  return (
    <Container {...rest}>
      <TitleLg as='h2'>Related</TitleLg>
      <ul>
        {related.map(block => <li key={block.id}>
          <PageLink page={block.value as PageData} />
        </li>)}
      </ul>
    </Container>
  )
}

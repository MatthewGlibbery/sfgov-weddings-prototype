import {
  BigDesc,
  Container,
  DisplayLg,
  type ContainerProps
} from '@/design-system'
import { RelatedContentList } from '../RelatedContentList'
import { TitleAndText } from '../TitleAndText'
import { Image } from '../Image'
import { PageWrapper } from './PageWrapper'
import type { InfoPageData, InfoPageSection } from '@/types'
import type { ComponentType } from 'react'

export const InformationPage: ComponentType<{ page: InfoPageData }> = ({
  page
}) => {
  const {
    title,
    description,
    related_content_part_of: partOf,
    information_section: infoSections,
    related_content_agencies: agencies,
    related_content_topics: topics,
    related_content_pages: pages
  } = page

  return (
    <PageWrapper title={title}>
      <Container className="mb-20">
        <DisplayLg as="h1" className="my-40" data-testid="info-page-title">
          {title}
        </DisplayLg>
        {description ? (
          <BigDesc as="p" data-testid="info-page-description">
            {description}
          </BigDesc>
        ) : null}
      </Container>
      <RelatedContentList
        title="Part of" /* FIXME: translate */
        content={partOf}
      />
      <InfoSectionList as="main" blocks={infoSections} />
      <RelatedContentList
        id="divisions"
        title="Departments" /* FIXME: translate */
        content={agencies}
      />
      <RelatedContentList
        id="topics"
        title="Topics" /* FIXME: translate */
        content={topics}
      />
      <RelatedContentList
        id="related"
        title="Related" /* FIXME: translate */
        content={pages}
      />
    </PageWrapper>
  )
}

type InfoSectionListProps = ContainerProps & {
  blocks: InfoPageSection[] | undefined
}

const InfoSectionList = ({ blocks, ...rest }: InfoSectionListProps) => {
  if (!blocks?.length) return null
  return (
    <Container {...rest}>
      {blocks.map((block) => (
        <InfoSectionContent
          key={block.id}
          block={block}
          data-testid={`block-${block.id}`}
        />
      ))}
    </Container>
  )
}

type InfoSectionContentProps = {
  block: InfoPageSection
}

const InfoSectionContent = ({ block, ...rest }: InfoSectionContentProps) => {
  switch (block.type) {
    case 'image':
      return <Image alt="" imageRef={block.value} {...rest} />
    case 'title_and_text':
      return <TitleAndText {...block.value} {...rest} />
  }
  return null
}

import {
  Container,
  DisplayLg,
  Grid,
  HeadingXXl,
  PageTitleSection,
  type ContainerProps
} from '@/design-system'
import type { InfoPageData, InfoPageSection } from '@/types'
import type { ComponentType } from 'react'
import { useTranslation } from 'next-i18next'
import { Callout } from '../Callout'
import { Image } from '../Image'
import { PageLinksList } from '../PageLinksList'
import { RelatedContentList } from '../RelatedContentList'
import { TitleAndText } from '../TitleAndText'
import { PageWrapper } from './PageWrapper'

export const InformationPage: ComponentType<{ page: InfoPageData }> = ({
  page
}) => {
  const {
    title,
    description,
    primary_agency: primaryAgency,
    part_of: partOf,
    information_section: infoSections,
    partner_agencies: agencies,
    topics,
    related: pages
  } = page

  const { t } = useTranslation()
  const filteredPartOf = partOf.filter((item) => item?.value?.live)

  return (
    <PageWrapper title={title} meta={{ ...page.meta, description }}>
      <Container>
        <Grid>
          <div className="col-span-full">
            <div className=" flex flex-col">
              <PageTitleSection
                title={title}
                label={t('info-page', { defaultValue: 'Info Page' })}
                isHidden={true}
              >
                {description ? (
                  <DisplayLg
                    as="p"
                    className="mb-12"
                    data-testid="info-page-description"
                  >
                    {description}
                  </DisplayLg>
                ) : null}
                {primaryAgency ? (
                  <PageLinksList pageLinks={[primaryAgency]} />
                ) : null}
                {filteredPartOf.length ? (
                  <div>
                    <PageLinksList
                      label={t('info-page-part-of-label', {
                        defaultValue: 'Part of '
                      })}
                      pageLinks={filteredPartOf}
                    />
                  </div>
                ) : null}
              </PageTitleSection>
            </div>
          </div>
          <div className="flex flex-col gap-[36px] md:gap-28 lg:gap-40 col-span-full lg:col-span-7">
            <InfoSectionList as="main" blocks={infoSections} />
            <RelatedContentList
              id="divisions"
              title={t('departments', { defaultValue: 'Departments' })}
              content={agencies}
            />
            <RelatedContentList
              id="topics"
              title={t('topics', { defaultValue: 'Topics' })}
              content={topics}
            />
            <RelatedContentList
              id="related"
              title={t('related', { defaultValue: 'Related' })}
              content={pages}
            />
          </div>
        </Grid>
      </Container>
    </PageWrapper>
  )
}

type InfoSectionListProps = ContainerProps & {
  blocks: InfoPageSection[] | undefined
}

const InfoSectionList = ({ blocks, ...rest }: InfoSectionListProps) => {
  if (!blocks?.length) return null
  return (
    <span className="flex flex-col space-y-40" {...rest}>
      {blocks.map((block) => (
        <InfoSectionContent
          key={block.id}
          block={block}
          data-testid={`block-${block.id}`}
        />
      ))}
    </span>
  )
}

type InfoSectionContentProps = {
  block: InfoPageSection
}

const InfoSectionContent = ({ block, ...rest }: InfoSectionContentProps) => {
  switch (block.type) {
    case 'image':
      return <Image imageRef={block.value} {...rest} />
    case 'title_and_text':
      return (
        <TitleAndText {...block.value} as="h2" heading={HeadingXXl} {...rest} />
      )
    case 'callout':
      return <Callout html={block.value} {...rest} />
  }
}

import {
  Container,
  DisplayLg,
  DisplayXXXl,
  Grid,
  PageTitleSection,
  type ContainerProps
} from '@/design-system'
import { RelatedContentList } from '../RelatedContentList'
import { TitleAndText } from '../TitleAndText'
import { Image } from '../Image'
import { PageWrapper } from './PageWrapper'
import type { InfoPageData, InfoPageSection } from '@/types'
import type { ComponentType } from 'react'
import { PageLinksList } from '../PageLinksList'
import { useTranslation } from 'react-i18next'
import { Callout } from '../Callout'
import { When } from 'react-if'

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

  return (
    <PageWrapper title={title}>
      <Container>
        <Grid>
          <div className="col-span-full">
            <div className="flex flex-col gap-y-60">
              <div className="mb-20 flex flex-col">
                <PageTitleSection
                  title={title}
                  label={t('Info Page', { defaultValue: 'Info Page' })}
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
                  <When condition={!!primaryAgency}>
                    <PageLinksList pageLinks={[primaryAgency]} />
                  </When>
                  <When condition={!!partOf.length}>
                    <div className="my-space-xxl">
                      <PageLinksList
                        label={t('Part of', { defaultValue: 'Part of ' }) || ''}
                        pageLinks={partOf}
                      />
                    </div>
                  </When>
                </PageTitleSection>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-40 col-span-full lg:col-span-7">
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
      return <Image alt="" imageRef={block.value} {...rest} />
    case 'title_and_text':
      return <TitleAndText {...block.value} as="h2" {...rest} />
    case 'callout':
      return <Callout html={block.value} {...rest} />
  }
  return null
}

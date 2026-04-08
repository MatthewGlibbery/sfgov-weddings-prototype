import type { TileSetProps } from '@/design-system'
import {
  Container,
  Grid,
  HeadingXXl,
  IconArrowLeft,
  PageTitleSection,
  Tile,
  TileSection,
  TileSet
} from '@/design-system'
import { filterTruthy, getPageURL } from '@/lib/utils'
import type { AboutPageData, ResourceBlock } from '@/types'
import { useTranslation } from 'next-i18next'
import { ITERATIVE_RICH_TEXT_COMPONENTS, PageLink } from '../'
import { DownloadableFilesSection } from '../DownloadableFilesSection'
import { TitleAndText } from '../TitleAndText'
import type { HTMLComponentMap } from '../wagtail'
import { PageWrapper } from './PageWrapper'

export type AboutPageProps = {
  page: AboutPageData
  richTextComponents?: HTMLComponentMap
}

export function AboutPage({ page, richTextComponents }: AboutPageProps) {
  const { t } = useTranslation()
  const {
    title,
    primary_agency: primaryAgency,
    about_info: aboutInfo,
    resources
  } = page

  return (
    <PageWrapper title={title} meta={page.meta}>
      <Container>
        <Grid>
          <div className="col-span-full">
            <div className="flex flex-col gap-y-40 md:gap-y-60">
              <div>
                <PageTitleSection
                  label={t('about-us', { defaultValue: 'About Us' })}
                  title={title}
                  isHidden={true}
                >
                  <div className="flex gap-4">
                    <IconArrowLeft className="text-primary500" width={20} />
                    <PageLink page={primaryAgency!}>
                      {t('back-to-main-page', {
                        defaultValue: 'Back to main page'
                      })}
                    </PageLink>
                  </div>
                </PageTitleSection>
              </div>
              {aboutInfo.length
                ? aboutInfo.map((item) => (
                    <TitleAndText
                      key={item.id}
                      as="h2"
                      heading={HeadingXXl}
                      richTextComponents={{
                        ...richTextComponents,
                        ...ITERATIVE_RICH_TEXT_COMPONENTS
                      }}
                      {...item.value}
                    />
                  ))
                : /* istanbul ignore next */ null}
              {resources.length ? (
                <TileSection
                  id="resources"
                  heading={t('resources', { defaultValue: 'Resources' })}
                >
                  {resources.map((section) => {
                    switch (section.type) {
                      case 'resources': {
                        return (
                          <ResourcesSection
                            key={section.id}
                            heading={section.value.title}
                            blocks={section.value.resources}
                          />
                        )
                      }
                      case 'downloadable_files': {
                        return (
                          <DownloadableFilesSection
                            key={section.id}
                            title={section?.value?.title}
                            documents={section?.value?.documents}
                          />
                        )
                      }
                    }
                  })}
                </TileSection>
              ) : /* istanbul ignore next */ null}
            </div>
          </div>
        </Grid>
      </Container>
    </PageWrapper>
  )
}

type ResourceSectionProps = Omit<TileSetProps, 'children'> & {
  blocks: ResourceBlock[]
}

function ResourcesSection({ blocks, ...rest }: ResourceSectionProps) {
  const tiles = filterTruthy(
    blocks.map((block) => {
      switch (block.type) {
        case 'external_link':
          return (
            <Tile
              href={block.value.url}
              heading={block.value.title}
              description={block.value.description}
              key={block.id}
            />
          )
        case 'page': {
          if (!block.value) return null
          const url = getPageURL(block.value)
          return url ? (
            <Tile
              href={url}
              heading={block.value.title}
              description={block.value.description}
              key={block.id}
            />
          ) : null
        }
      }
    })
  )
  if (!tiles.length) return null
  return <TileSet {...rest}>{tiles}</TileSet>
}

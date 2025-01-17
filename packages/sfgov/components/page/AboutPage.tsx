import {
  Container,
  Grid,
  HeadingXXl,
  HeadingXl,
  IconArrowLeft,
  IconDownload,
  Link,
  PageTitleSection
} from '@/design-system'
import type { AboutPageData } from '@/types'
import { useTranslation } from 'next-i18next'
import type { ComponentType } from 'react'
import { ContentTileList, PageLink, TileContentSection } from '../'
import { DownloadableFilesSection } from '../DownloadableFilesSection'
import { TitleAndText } from '../TitleAndText'
import { PageWrapper } from './PageWrapper'

export const AboutPage: ComponentType<{ page: AboutPageData }> = ({ page }) => {
  const { t } = useTranslation()
  const {
    title,
    primary_agency: primaryAgency,
    about_info: aboutInfo,
    resources
  } = page

  return (
    <PageWrapper title={title}>
      <Container>
        <Grid>
          <div className="col-span-full">
            <div className="flex flex-col gap-y-40 md:gap-y-60">
              <div>
                <PageTitleSection
                  label={t('about-us', { defaultValue: 'About Us' })}
                  title={title}
                >
                  <div className="flex gap-4">
                    <IconArrowLeft className="text-primary500" width={20} />
                    <PageLink page={primaryAgency}>
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
                      {...item.value}
                    />
                  ))
                : null}
              {resources.length ? (
                <div>
                  <HeadingXXl as="h2">
                    {t('resources', { defaultValue: 'Resources' })}
                  </HeadingXXl>
                  {resources.map((section) => {
                    switch (section.type) {
                      case 'resources': {
                        return (
                          <TileContentSection
                            key={section.id}
                            title={section.value.title}
                            tileList={
                              <ContentTileList
                                links={section.value.resources}
                              />
                            }
                          />
                        )
                      }
                      case 'downloadable_files': {
                        return (
                          <DownloadableFilesSection
                            title={section?.value?.title}
                            documents={section?.value?.documents}
                          />
                        )
                      }
                      /* istanbul ignore next */
                      default:
                        return <></>
                    }
                  })}
                </div>
              ) : null}
            </div>
          </div>
        </Grid>
      </Container>
    </PageWrapper>
  )
}

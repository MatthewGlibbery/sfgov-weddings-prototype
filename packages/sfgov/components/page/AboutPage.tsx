import type { ComponentType } from 'react'
import { When } from 'react-if'
import { useTranslation } from 'next-i18next'

import type { AboutPageData } from '@/types'

import { TitleAndText } from '../TitleAndText'
import { PageWrapper } from './PageWrapper'
import {
  Container,
  Grid,
  HeadingXXl,
  IconArrowLeft,
  PageTitleSection
} from '@/design-system'
import { PageLink, ContentTileList, TileContentSection } from '../'

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
                    <IconArrowLeft className="text-primary600" width={20} />
                    <PageLink page={primaryAgency}>
                      {t('back to main page', {
                        defaultValue: 'Back to main page'
                      })}
                    </PageLink>
                  </div>
                </PageTitleSection>
              </div>
              <When condition={!!aboutInfo.length}>
                {aboutInfo.map((item) => (
                  <TitleAndText
                    key={item.id}
                    as="h2"
                    heading={HeadingXXl}
                    {...item.value}
                  />
                ))}
              </When>
              <When condition={!!resources.length}>
                <div>
                  <HeadingXXl as="h2">
                    {t('resources', { defaultValue: 'Resources' })}
                  </HeadingXXl>
                  {resources.map((section) => {
                    switch (section.type) {
                      case 'resources': {
                        const TileList = (
                          <ContentTileList links={section.value.resources} />
                        )
                        return (
                          <TileContentSection
                            key={section.id}
                            title={section.value.title}
                            tileList={TileList}
                          />
                        )
                      }
                      // TODO: downloadable files
                      /* istanbul ignore next */
                      default:
                        return <></>
                    }
                  })}
                </div>
              </When>
            </div>
          </div>
        </Grid>
      </Container>
    </PageWrapper>
  )
}

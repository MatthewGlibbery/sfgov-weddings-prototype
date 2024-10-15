import { Container, DisplayLg, Grid, PageTitleSection } from '@/design-system'
import { DataStoryPageData } from '@/types'
import { useTranslation } from 'next-i18next'
import { ComponentType } from 'react'
import { ContentSection, PageWrapper, RelatedContentList } from '..'

export const DataStoryPage: ComponentType<{ page: DataStoryPageData }> = ({
  page
}) => {
  const { title, description, content, partner_agencies: agencies } = page

  const { t } = useTranslation()

  return (
    <PageWrapper title={title}>
      <Grid>
        <Container className="mb-20 pb-40 col-span-8">
          <PageTitleSection
            label={t('data-story', { defaultValue: 'Data Story' })}
            title={title}
          >
            {description ? (
              <DisplayLg className="mb-20" as="p">
                {description}
              </DisplayLg>
            ) : null}
          </PageTitleSection>
          {content.length ? (
            <div className="mt-28 mb-20 flex flex-col gap-28">
              {content.map((section) => (
                <ContentSection
                  key={section.id}
                  title={section.value.title}
                  section_content={section.value.section_content}
                />
              ))}
            </div>
          ) : null}
          <RelatedContentList
            title={t('partner-agencies', { defaultValue: 'Partner Agencies' })}
            content={agencies}
          />
        </Container>
      </Grid>
    </PageWrapper>
  )
}

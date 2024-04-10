import { Container, Grid, DisplayLg, PageTitleSection } from '@/design-system'
import { DataStoryPageData } from '@/types'
import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'
import { When } from 'react-if'
import { ContentSection, PageWrapper, PageLinksList, TableOfContents } from '..'

export const DataStoryPage: ComponentType<{ page: DataStoryPageData }> = ({
  page
}) => {
  const { title, description, content, partner_agencies: agencies } = page

  const { t } = useTranslation()

  return (
    <PageWrapper title={title}>
      <Grid>
        <Container className="mb-20 pb-40 col-span-8">
          <PageTitleSection label={t('Data Story')} title={title}>
            <When condition={description}>
              <DisplayLg className="mb-20" as="p">
                {description}
              </DisplayLg>
            </When>
            <PageLinksList pageLinks={agencies} />
          </PageTitleSection>
          <When condition={!!content.length}>
            <div className="mt-28">
              {content.map((section) => (
                <ContentSection
                  key={section.id}
                  title={section.value.title}
                  section_content={section.value.section_content}
                />
              ))}
            </div>
          </When>
        </Container>
        <div className="mt-40 mr-28 mb-20 pb-40 col-span-4 h-fit sticky top-40">
          <TableOfContents />
        </div>
      </Grid>
    </PageWrapper>
  )
}

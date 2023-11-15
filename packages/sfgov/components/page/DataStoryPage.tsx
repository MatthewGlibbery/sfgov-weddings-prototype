import { Container, Grid, DisplayLg, DisplayXXXl } from '@/design-system'
import { DataStoryPageData } from '@/types'
import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'
import { When } from 'react-if'
import {
  ContentSection,
  PageLabel,
  PageWrapper,
  RelatedAgenciesList,
  TableOfContents
} from '..'

export const DataStoryPage: ComponentType<{ page: DataStoryPageData }> = ({
  page
}) => {
  const {
    title,
    description,
    content,
    related_content_agencies: agencies
  } = page

  const { t } = useTranslation()

  return (
    <PageWrapper title={title}>
      <Grid className="grid grid-cols-12">
        <Container className="mb-20 pb-40 col-span-8">
          <PageLabel label={t('Data Story')} />
          <DisplayXXXl as="h1" className="my-12 md:my-20">
            {title}
          </DisplayXXXl>
          <When condition={description}>
            <DisplayLg className="mb-20" as="p">
              {description}
            </DisplayLg>
          </When>
          <RelatedAgenciesList agencies={agencies} />
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

import { Container, DisplayLg, Grid, PageTitleSection } from '@/design-system'
import type { StepByStepData } from '@/types'
import { useTranslation } from 'next-i18next'
import type { ComponentType } from 'react'
import { RelatedContentList } from '../RelatedContentList'
import { RichText } from '../RichText'
import { StepList } from '../Step'
import { PageWrapper } from './PageWrapper'

export const StepByStepPage: ComponentType<{ page: StepByStepData }> = ({
  page
}) => {
  const {
    title,
    description,
    intro,
    steps = [],
    partner_agencies: agencies
  } = page

  const { t } = useTranslation()

  return (
    <PageWrapper title={title} meta={{ ...page.meta, description }}>
      <Container className="mb-20 pb-40">
        <PageTitleSection
          title={title}
          label={t('step-by-step', { defaultValue: 'Step-by-step' })}
          isHidden={true}
        >
          {description ? (
            <DisplayLg
              as="p"
              className="mb-16 text-neutral700"
              data-testid="step-by-step-description"
            >
              {description}
            </DisplayLg>
          ) : null}
          <div className="my-60 lg:w-1/2" data-testid="step-by-step-intro">
            <RichText html={intro} />
          </div>
        </PageTitleSection>
      </Container>
      <Grid>
        <div className="col-span-full">
          <StepList steps={steps} />
          {agencies.length ? (
            <Container>
              <RelatedContentList
                title={t('partner-agencies', {
                  defaultValue: 'Partner agencies'
                })}
                content={agencies}
              />
            </Container>
          ) : null}
        </div>
      </Grid>
    </PageWrapper>
  )
}

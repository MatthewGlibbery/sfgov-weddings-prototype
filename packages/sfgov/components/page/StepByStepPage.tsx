import type { StepByStepData } from '@/types'
import type { ComponentType } from 'react'

import { Container, DisplayLg, Grid, PageTitleSection } from '@/design-system'
import { useTranslation } from 'next-i18next'

import {
  ITERATIVE_RICH_TEXT_COMPONENTS,
  PageLink,
  PageWrapper,
  RelatedContentList,
  RichText,
  StepList
} from '..'

export const StepByStepPage: ComponentType<{ page: StepByStepData }> = ({
  page
}) => {
  const {
    description,
    intro,
    partner_agencies: agencies,
    primary_agency: primaryAgency,
    steps = [],
    title
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
          {primaryAgency ? <PageLink page={primaryAgency} /> : null}
          <div className="my-60 lg:w-1/2" data-testid="step-by-step-intro">
            <RichText
              html={intro}
              components={ITERATIVE_RICH_TEXT_COMPONENTS}
            />
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

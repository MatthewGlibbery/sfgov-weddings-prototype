import { Container, DisplayLg, DisplayXXXl } from '@/design-system'
import { PageWrapper } from './PageWrapper'
import { StepList } from '../Step'
import { RelatedContentList } from '../RelatedContentList'
import type { StepByStepData } from '@/types'
import type { ComponentType } from 'react'
import { RichText } from '../RichText'
import { PageLabel } from '../PageLabel'
import { useTranslation } from 'react-i18next'
import { When } from 'react-if'

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
    <PageWrapper title={title}>
      <Container className="mb-20 pb-40">
        <PageLabel label={t('Step-by-step')} />
        <DisplayXXXl
          as="h1"
          className="my-12 md:my-20 xl:mr-28"
          data-testid="step-by-step-title"
        >
          {title}
        </DisplayXXXl>
        <When condition={description}>
          <DisplayLg
            as="p"
            className="my-20 text-neutral700"
            data-testid="step-by-step-description"
          >
            {description}
          </DisplayLg>
        </When>
        <div className="my-60 lg:w-1/2" data-testid="step-by-step-intro">
          <RichText html={intro} />
        </div>
        <StepList steps={steps} />
      </Container>
      <Container>
        <RelatedContentList title={t('Partner agencies')} content={agencies} />
      </Container>
    </PageWrapper>
  )
}

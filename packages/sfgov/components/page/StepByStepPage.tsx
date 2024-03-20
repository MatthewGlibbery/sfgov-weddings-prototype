import {
  Container,
  DisplayLg,
  MainContent,
  PageTitleSection
} from '@/design-system'
import { PageWrapper } from './PageWrapper'
import { StepList } from '../Step'
import { RelatedContentList } from '../RelatedContentList'
import type { StepByStepData } from '@/types'
import type { ComponentType } from 'react'
import { RichText } from '../RichText'
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
        <PageTitleSection title={title} label={t('Step-by-step')}>
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
        </PageTitleSection>
      </Container>
      <MainContent>
        <StepList steps={steps} />
        <Container>
          <RelatedContentList
            title={t('Partner agencies')}
            content={agencies}
          />
        </Container>
      </MainContent>
    </PageWrapper>
  )
}

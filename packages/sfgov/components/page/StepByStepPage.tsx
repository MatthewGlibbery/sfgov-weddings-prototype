import { BigDesc, BodyText, Container, DisplayLg } from '@/design-system'
import { PageWrapper } from './PageWrapper'
import { StepList } from '../Step'
import { RelatedContentList } from '../RelatedContentList'
import type { StepByStepData } from '@/types'
import type { ComponentType } from 'react'
import { RichText } from '../RichText'

export const StepByStepPage: ComponentType<{ page: StepByStepData }> = ({
  page
}) => {
  const {
    title,
    description,
    intro,
    steps = [],
    partner_agencies: agencies,
    topics
  } = page

  return (
    <PageWrapper title={title}>
      <Container>
        <div>
          <DisplayLg as="h1" data-testid="step-by-step-title">
            {title}
          </DisplayLg>
          {description ? (
            <BigDesc
              as="p"
              className="my-20"
              data-testid="step-by-step-description"
            >
              {description}
            </BigDesc>
          ) : null}
          <BodyText
            as="p"
            className="my-60 w-1/2"
            data-testid="step-by-step-intro"
          >
            {/**
             * FIXME: do we need to forbid block-level elements here since
             * this is wrapped in a <p>?
             */}
            <RichText html={intro} />
          </BodyText>
        </div>
        <StepList steps={steps} />
      </Container>
      <RelatedContentList title="Departments" content={agencies} />
      <RelatedContentList title="Topics" content={topics} />
    </PageWrapper>
  )
}

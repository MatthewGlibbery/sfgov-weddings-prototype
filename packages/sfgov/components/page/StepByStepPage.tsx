import { BigDesc, BodyText, Box, Container, DisplayLg } from '@/design-system'
import type { StepByStepData, PageComponent } from '@/types'
import { PageWrapper } from './PageWrapper'
import { StepList } from '../Step'
import { RelatedContentList } from '../RelatedContentList'
import { RichText } from '../RichText'

export const StepByStepPage: PageComponent<StepByStepData> = props => {
  const { page } = props
  const {
    title,
    description,
    intro,
    steps = [],
    related_content_agencies: agencies,
    related_content_topics: topics
  } = page

  return (
    <PageWrapper title={title}>
      <Container>
        <Box>
          <DisplayLg as='h1' data-testid='step-by-step-title'>{title}</DisplayLg>
          {description
            ? <BigDesc as='p' css={{ my: 20 }} data-testid='step-by-step-description'>
                {description}
              </BigDesc>
            : null}
          <BodyText as='p' css={{ my: 60, width: '50%' }} data-testid='step-by-step-intro'>
            {/* FIXME: do we need to forbid block-level elements here since this is wrapped in a <p>? */}
            <RichText html={intro} />
          </BodyText>
        </Box>
        <StepList steps={steps} />
      </Container>
      <RelatedContentList
        title='Departments'
        content={agencies} />
      <RelatedContentList
        title='Topics'
        content={topics} />
    </PageWrapper>
  )
}

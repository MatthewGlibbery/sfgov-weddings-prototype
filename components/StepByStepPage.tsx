import { BigDesc, BodyText, Box, Container, DisplayLg, StepList } from '@/design-system'
import { StepByStepData, PageProps, PageComponent } from '@/types'
import PageWrapper from './page/PageWrapper'
import { RelatedContentList } from './RelatedContentList'

type StepByStepPageProps = PageProps<StepByStepData>

export const StepByStepPage: PageComponent<StepByStepPageProps> = props => {
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
            {/*
              TODO: find an elegant way to render markup without causing hydration errors/forcing a
              switch to client side rendering (this happens if we use `dangerouslySetInnerHtml`)
            */}
            {intro}
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

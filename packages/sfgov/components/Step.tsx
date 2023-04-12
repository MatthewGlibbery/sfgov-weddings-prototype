import React from 'react'
import { When } from 'react-if'
import { styled, Box, Flex, BodyText, Label, TitleMd, FlexProps } from '@/design-system'
import { CostBlock, PageData, StepBlock } from '@/types'
import { PageLink } from './PageLink'
import { CostBlockDisplay } from './CostBlockDisplay'

type StepType = {
  step: StepBlock
  index: number
  last: boolean
}

const StepBadge = styled(Flex, {
  width: 50,
  height: 50,
  bg: '$slateL4',
  fg: '$white',
  br: 74,
  ml: -26,
  alignItems: 'center',
  justifyContent: 'center',
  variants: {
    alpha: {
      true: {
        bg: '$white',
        fg: '$slateL4'
      }
    }
  }
})

const OptionalLabelBox = styled(Flex, {
  py: 4,
  px: 12,
  bg: '$greyL2'
})

function OptionalLabel (props: FlexProps) {
  return <OptionalLabelBox inline {...props}>OPTIONAL STEP</OptionalLabelBox>
}

export function StepList ({ steps }: { steps: StepBlock[] }) {
  return <>
  {steps.map((step: StepBlock, i: number) =>
      <Step key={step.id} step={step} index={i + 1} last={i === steps.length - 1} />
  )}
  </>
}

export function Step ({ step: { id, value: step }, index, last }: StepType) {
  const css = {
    pb: 80,
    ml: 24,
    justifyContent: 'space-between',
    borderLeft: '3px solid'
  }

  if (last) css.borderLeft = '0px'

  const isAndOr = step.step_type !== 'number'

  return (
    <Flex css={css} data-testid={`step-${id}`}>
      <Box css={{ flexBasis: '5%' }}>
        <StepBadge alpha={isAndOr} data-testid='step-badge'><TitleMd>{isAndOr ? step.step_type : index}</TitleMd></StepBadge>
      </Box>
      <Flex css={{
        justifyContent: 'space-between',
        flexDirection: 'column',
        flexBasis: '90%',
        gapY: 16,
        '@md': {
          flexDirection: 'row'
        }
      }}>
        <Box css={{ flexBasis: '33%' }}>
          <TitleMd css={{ mb: 12 }}>{step.title}</TitleMd>
          <When condition={step.optional}><OptionalLabel css={{ mb: 12 }} data-testid='step-optional' /></When>
          <When condition={step.cost?.length}><CostBlockDisplay {...step?.cost?.[0] as CostBlock} /></When>
          <When condition={step.time}><Flex data-testid='step-time'><Label css={{ pr: 8 }}>Time:</Label><span>{step.time}</span></Flex></When>
        </Box>
        <Box css={{ flexBasis: '60%' }}>
          <When condition={step.step_description}><BodyText css={{ mb: 12 }} data-testid='step-description'>{step.step_description}</BodyText></When>
          <When condition={!!step.related_content_transactions?.[0]?.value}>
            <PageLink data-testid='step-transaction-link' page={step.related_content_transactions?.[0]?.value as PageData} />
          </When>
        </Box>
      </Flex>
    </Flex>
  )
}

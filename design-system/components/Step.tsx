import React from 'react'
import { Flex } from './Flex'
import { styled } from '../stitches.config'
import { StepBlock } from '@/types'
import { BodyText, Label, TitleMd } from './Text'
import { Box } from './Box'

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

const OptionalLabel = ({ css }) => <OptionalLabelBox css={css} inline>OPTIONAL STEP</OptionalLabelBox>

export const StepList = ({ steps }: StepBlock[]) =>
  steps.map((step: StepBlock, i: number) =>
      <Step key={step.id} step={step} index={i + 1} last={i === steps.length - 1} />
  )

export const Step = ({ step: { id, value: step }, index, last }: StepType) => {
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
        <Box css={{ flexBasis: '20%' }}>
          <TitleMd css={{ mb: 12 }}>{step.title}</TitleMd>
          {step.optional ? <OptionalLabel css={{ mb: 12 }} data-testid='step-optional' /> : null}
          {step.cost && step.cost.length ? <Flex data-testid='step-cost'><Label css={{ pr: 7 }}>Cost:</Label> {step.cost}</Flex> : null}
          {step.time ? <Flex data-testid='step-time'><Label css={{ pr: 7 }}>Time:</Label> {step.time}</Flex> : null}
        </Box>
        <Box css={{ flexBasis: '60%' }}>
          {step.step_description ? <BodyText css={{ mb: 12 }} data-testid='step-description'>{step.step_description}</BodyText> : null}
          {step.transaction_link ? <a href={step.transaction_link} data-testid='step-transaction-link'>{ step.transaction_link }</a> : null}
        </Box>
      </Flex>
    </Flex>
  )
}

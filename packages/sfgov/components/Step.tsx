import { When } from 'react-if'
import {
  BodyText,
  classed,
  classes,
  HeadingXl,
  HeadingLg,
  IconClock,
  IconPencil
} from '@/design-system'
import { PageLink } from './PageLink'
import { CostBlock } from './CostBlock'
import type { PageData, TypeStepBlock, TypeCostBlockValues } from '@/types'
import { useTranslation } from 'next-i18next'
import { RichText } from './RichText'
import React from 'react'

type StepType = {
  step: TypeStepBlock
  index: number
  last: boolean
}

export const StepList = ({ steps }: { steps: TypeStepBlock[] }) => {
  let index = 0
  return (
    <>
      {steps.map((step: TypeStepBlock, i: number) => {
        if (step.value.step_type === 'number') {
          index++
        }
        return (
          <Step
            key={step.id}
            step={step}
            index={index}
            last={i === steps.length - 1}
          />
        )
      })}
    </>
  )
}

const StepContainer = classed('div', {
  base: classes(
    'flex pb-40 md:ml-28 md:border-dashed',
    'md:border-l-2 md:border-neutral200'
  ),
  variants: {
    last: {
      true: 'md:border-l-0'
    }
  }
})

const StepBadge = classed('div', {
  base: classes(
    'flex items-center justify-center',
    'w-[50px] h-[50px] mr-20',
    'rounded-full md:ml-[-26px]'
  ),
  variants: {
    isAndOr: {
      true: 'bg-neutral10 border-solid border-2 border-secondary300',
      false: 'bg-secondary100'
    }
  },
  defaultVariants: {
    isAndOr: false
  }
})

export const Step = ({ step: { id, value: step }, index, last }: StepType) => {
  const { t } = useTranslation()
  const isAndOr = step.step_type !== 'number'

  const BadgeComponent = () => (
    <StepBadge isAndOr={isAndOr} data-testid="step-badge">
      {isAndOr ? (
        <BodyText className="text-secondary500 font-bold">
          {step.step_type}
        </BodyText>
      ) : (
        <HeadingXl className="text-secondary600">{index}</HeadingXl>
      )}
    </StepBadge>
  )

  return (
    <StepContainer last={last} data-testid={`step-${id}`}>
      <div className="hidden md:block">
        <BadgeComponent />
      </div>
      <div className="w-full lg:basis-3/4">
        <div className="flex flex-col justify-between gap-y-16">
          <div className="flex items-center">
            <div className="md:hidden">
              <BadgeComponent />
            </div>
            <div className="flex flex-col-reverse gap-4 md:gap-8 md:flex-row md:items-baseline">
              <HeadingLg>{step.title}</HeadingLg>
              <When condition={step.optional}>
                <div
                  className="bg-accent100 w-fit border-solid border-1 rounded-[14px] border-accent100 text-accent600 py-4 px-12 bg-grey200 mb-12"
                  data-testid="step-optional"
                >
                  {t('Optional')}
                </div>
              </When>
            </div>
          </div>
          <When condition={step.cost?.length || step.time}>
            <div className="flex flex-col p-12 gap-8 rounded-4 border-solid border-1 border-neutral400">
              <When condition={step.cost?.length}>
                {() => (
                  <CostBlock
                    variant="step"
                    {...(step?.cost?.[0].value as TypeCostBlockValues)}
                  />
                )}
              </When>
              <When condition={step.time}>
                <div className="flex gap-4 items-start" data-testid="step-time">
                  <IconClock
                    className="text-neutral400 min-w-[20px]"
                    width={20}
                  />
                  <BodyText className="font-bold">Time:</BodyText>
                  <span>{step.time}</span>
                </div>
              </When>
            </div>
          </When>
          <When condition={step.step_description}>
            <div className="mb-12" data-testid="step-description">
              <RichText html={step.step_description || ''} />
            </div>
          </When>
          <When condition={!!step.related_content_transactions?.[0]?.value}>
            <div className="flex items-center gap-4">
              <IconPencil className="text-primary500" width={20} />
              <PageLink
                page={step.related_content_transactions?.[0]?.value as PageData}
                data-testid="step-transaction-link"
              />
            </div>
          </When>
        </div>
      </div>
    </StepContainer>
  )
}

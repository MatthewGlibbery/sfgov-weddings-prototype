import { When } from 'react-if'
import { BodyText, classed, classes, Label, HeadingMd } from '@/design-system'
import { PageLink } from './PageLink'
import { CostBlock } from './CostBlock'
import type { PageData, TypeStepBlock, TypeCostBlockValues } from '@/types'
import { useTranslation } from 'next-i18next'

type StepType = {
  step: TypeStepBlock
  index: number
  last: boolean
}

export const StepList = ({ steps }: { steps: TypeStepBlock[] }) => {
  return (
    <>
      {steps.map((step: TypeStepBlock, i: number) => (
        <Step
          key={step.id}
          step={step}
          index={i + 1}
          last={i === steps.length - 1}
        />
      ))}
    </>
  )
}

const StepContainer = classed('div', {
  base: 'flex justify-between pb-80 ml-24 border-solid border-l-[3px]',
  variants: {
    last: {
      true: 'border-l-0'
    }
  }
})

const StepBadge = classed('div', {
  base: classes(
    'flex items-center justify-center',
    'w-[50px] h-[50px]',
    'br-[74px] ml-[-26px]'
  ),
  variants: {
    isAndOr: {
      true: 'bg-white text-slate400',
      false: 'bg-slate400 text-white'
    }
  },
  defaultVariants: {
    isAndOr: false
  }
})

export const Step = ({ step: { id, value: step }, index, last }: StepType) => {
  const { t } = useTranslation()
  const isAndOr = step.step_type !== 'number'

  return (
    <StepContainer last={last} data-testid={`step-${id}`}>
      <div className="basis-[5%]">
        <StepBadge isAndOr={isAndOr} data-testid="step-badge">
          <HeadingMd>{isAndOr ? step.step_type : index}</HeadingMd>
        </StepBadge>
      </div>
      <div className="flex justify-between basis-[90%] gap-y-16 md:flex-row">
        <div className="basis-1/3">
          <HeadingMd className="mb-12">{step.title}</HeadingMd>
          <When condition={step.optional}>
            <div
              className="inline-flex p-4 px-12 bg-grey200 mb-12"
              data-testid="step-optional"
            >
              {t('OPTIONAL STEP')}
            </div>
          </When>
          <When condition={step.cost?.length}>
            {() => (
              <CostBlock
                variant="step"
                {...(step?.cost?.[0].value as TypeCostBlockValues)}
              />
            )}
          </When>
          <When condition={step.time}>
            <div className="flex" data-testid="step-time">
              <Label className="pr-8">Time:</Label>
              <span>{step.time}</span>
            </div>
          </When>
        </div>
        <div className="basis-2/3">
          <When condition={step.step_description}>
            <BodyText className="mb-12" data-testid="step-description">
              {step.step_description}
            </BodyText>
          </When>
          <When condition={!!step.related_content_transactions?.[0]?.value}>
            <PageLink
              page={step.related_content_transactions?.[0]?.value as PageData}
              data-testid="step-transaction-link"
            />
          </When>
        </div>
      </div>
    </StepContainer>
  )
}

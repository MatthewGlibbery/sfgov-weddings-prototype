import React from 'react'
import clsx from 'clsx'
import { When } from 'react-if'
import { BodyText, Label, TitleMd } from '@/design-system'
import { PageLink } from './PageLink'
import { CostBlockDisplay } from './CostBlockDisplay'
import type { CostBlock, PageData, StepBlock } from '@/types'

type StepType = {
  step: StepBlock
  index: number
  last: boolean
}

const OptionalLabel = ({ className, ...rest }: Omit<JSX.IntrinsicElements['div'], 'children'>) => {
  return <div className={clsx('inline-flex p-4 px-12 bg-grey200', className)} {...rest}>
    OPTIONAL STEP
  </div>
}

export const StepList = ({ steps }: { steps: StepBlock[] }) => {
  return <>
  {steps.map((step: StepBlock, i: number) =>
    <Step key={step.id} step={step} index={i + 1}
      last={i === steps.length - 1} />
  )}
  </>
}

export const Step = ({ step: { id, value: step }, index, last }: StepType) => {
  const isAndOr = step.step_type !== 'number'

  return (
    <div className={clsx('flex justify-between pb-80 ml-24 border-solid border-l-[3px]', last && 'border-l-0')} data-testid={`step-${id}`}>
      <div className='basis-[5%]'>
        <div className={clsx(`
          flex items-center justify-center
          w-[50px] h-[50px]
          br-[74px] ml-[-26px]
        `, isAndOr
          ? 'bg-white text-slate400'
          : 'bg-slate400 text-white')
        } data-testid='step-badge'>
          <TitleMd>{isAndOr ? step.step_type : index}</TitleMd>
        </div>
      </div>
      <div className='flex justify-between basis-[90%] gap-y-16 md:flex-row'>
        <div className='basis-1/3'>
          <TitleMd className='mb-12'>{step.title}</TitleMd>
          <When condition={step.optional}>
            <OptionalLabel className='mb-12' data-testid='step-optional' />
          </When>
          <When condition={step.cost?.length}>
            <CostBlockDisplay variant='step' {...step?.cost?.[0] as CostBlock} />
          </When>
          <When condition={step.time}>
            <div className='flex' data-testid='step-time'>
              <Label className='pr-8'>Time:</Label>
              <span>{step.time}</span>
            </div>
          </When>
        </div>
        <div className='basis-2/3'>
          <When condition={step.step_description}>
            <BodyText className='mb-12' data-testid='step-description'>
              {step.step_description}
            </BodyText>
          </When>
          <When condition={!!step.related_content_transactions?.[0]?.value}>
            <PageLink
              page={step.related_content_transactions?.[0]?.value as PageData}
              data-testid='step-transaction-link'
            />
          </When>
        </div>
      </div>
    </div>
  )
}

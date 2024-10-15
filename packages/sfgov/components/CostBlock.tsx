import {
  BodyText,
  classed,
  HeadingXs,
  IconCash,
  HeadingLg
} from '@/design-system'
import { useTranslation } from 'next-i18next'
import type { TypeCostBlockValues } from '@/types'
import { RichText } from './RichText'

type CostBlockProps = TypeCostBlockValues & {
  variant?: string
  id?: string
}

export const CostBlock = ({
  cost: costType,
  flat_fee: flatFee,
  range,
  description,
  variant,
  id = 'costBlock'
}: CostBlockProps) => {
  const { t } = useTranslation()

  let cost = ''

  if (costType === 'free') {
    cost = 'Free'
  } else if (costType === 'flat_fee') {
    cost = `$${flatFee}`
  } else if (costType === 'range') {
    cost = `$${range?.minimum} to $${range?.maximum}`
  } else if (costType === 'minimum') {
    cost = `$${range?.minimum} and up`
  }

  const CostText = classed(BodyText, {
    variants: {
      step: {
        true: 'font-bold',
        false: 'inline-block mb-0'
      },
      transaction: {
        true: 'font-bold',
        false: ''
      }
    }
  })

  if (variant === 'step') {
    return (
      <div className="flex gap-4 items-start" data-testid="step-cost">
        <IconCash className="text-neutral400 min-w-[20px]" height={20} alt="" />
        <CostText id="costBlock" step={!!variant}>
          {t('cost', { defaultValue: 'Cost' })}:
        </CostText>
        <span>{cost}.</span>
        {description ? <RichText html={description} /> : null}
      </div>
    )
  } else if (variant === 'transaction') {
    return (
      <div data-testid="transaction-cost">
        <HeadingLg as="h3" id={id} transaction={!!variant} className="mb-12">
          {t('cost', { defaultValue: 'Cost' })}
        </HeadingLg>
        <span className="block font-bold mb-12">{cost}</span>
        {description ? <RichText html={description} /> : null}
      </div>
    )
  }

  return (
    <div>
      <CostText as="h3" step={!!variant}>
        {t('cost', { defaultValue: 'Cost' })}
      </CostText>
      <HeadingXs className="mb-12">{cost}</HeadingXs>
      {description ? (
        <div>
          <RichText html={description} />
        </div>
      ) : null}
    </div>
  )
}

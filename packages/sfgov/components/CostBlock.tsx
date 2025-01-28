import {
  BodyText,
  classed,
  HeadingXs,
  IconCash,
  HeadingLg
} from '@/design-system'
import { Trans, useTranslation } from 'next-i18next'
import type { TypeCostBlockValues } from '@/types'
import { RichText } from './RichText'

export type CostBlockProps = TypeCostBlockValues & {
  variant?: string
  id?: string
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

export function CostBlock({
  cost: costType,
  flat_fee: flatFee,
  range,
  description,
  variant,
  id = 'costBlock'
}: CostBlockProps) {
  const { t } = useTranslation()

  let cost = ''
  if (costType === 'free') {
    cost = t('cost-free', { defaultValue: 'Free' })
  } else if (costType === 'flat_fee' && flatFee != null) {
    cost = t('cost-flat-fee', {
      // eslint-disable-next-line no-template-curly-in-string
      defaultValue: '${{dollars}}',
      dollars: flatFee
    })
  } else if (
    costType === 'range' &&
    range?.minimum != null &&
    range?.maximum != null
  ) {
    const { minimum, maximum } = range
    cost = t('cost-range', {
      // eslint-disable-next-line no-template-curly-in-string
      defaultValue: '${{minimum}} to ${{maximum}}',
      minimum,
      maximum
    })
  } else if (costType === 'minimum' && range?.minimum != null) {
    cost = t('cost-min-and-up', {
      // eslint-disable-next-line no-template-curly-in-string
      defaultValue: '${{minimum}} and up',
      minimum: range.minimum
    })
  }

  const COST_WORD = t('cost', { defaultValue: 'Cost' })
  if (variant === 'step') {
    return (
      <div className="flex gap-4 items-start" data-testid="step-cost">
        <IconCash className="text-neutral400 min-w-[20px]" height={20} alt="" />
        {cost ? (
          <Trans i18nKey="step-cost">
            <CostText id="costBlock" step={!!variant}>
              Cost:
            </CostText>
            <span> {{ cost }}.</span>
          </Trans>
        ) : (
          <CostText id="costBlock" step={!!variant}>
            {t('cost-empty-prefix', { defaultValue: 'Cost:' })}
          </CostText>
        )}
        {description ? (
          <>
            {' '}
            <RichText html={description} />
          </>
        ) : null}
      </div>
    )
  } else if (variant === 'transaction') {
    return (
      <div data-testid="transaction-cost">
        <HeadingLg as="h3" id={id} transaction={!!variant} className="mb-12">
          {COST_WORD}
        </HeadingLg>
        <span className="block font-bold mb-12">{cost}</span>
        {description ? <RichText html={description} /> : null}
      </div>
    )
  }

  return (
    <div>
      <CostText as="h3" step={!!variant}>
        {COST_WORD}
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

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
const formatter = new Intl.NumberFormat('default', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
})

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

  let zzyyxx = ''
  if (costType === 'free') {
    zzyyxx = t('cost-free', { defaultValue: 'Free' })
  } else if (costType === 'flat_fee' && flatFee != null) {
    zzyyxx = t('cost-flat-fee', {
      // eslint-disable-next-line no-template-curly-in-string
      defaultValue: '{{zyx}}',
      zyx: formatter.format(flatFee)
    })
  } else if (
    costType === 'range' &&
    range?.minimum != null &&
    range?.maximum != null
  ) {
    const { minimum, maximum } = range
    zzyyxx = t('cost-range', {
      // eslint-disable-next-line no-template-curly-in-string
      // The weird tokens here are because google keeps trying to translate
      // them. For some reason these work
      defaultValue: '{{zyx}} to {{bcd}}',
      zyx: formatter.format(minimum),
      bcd: formatter.format(maximum)
    })
  } else if (costType === 'minimum' && range?.minimum != null) {
    zzyyxx = t('cost-min-and-up', {
      // eslint-disable-next-line no-template-curly-in-string
      // weird tokens because google translate
      defaultValue: '{{zyx}} and up',
      zyx: formatter.format(range.minimum)
    })
  }

  const COST_WORD = t('cost', { defaultValue: 'Cost' })
  if (variant === 'step') {
    return (
      <div className="flex gap-4 items-start" data-testid="step-cost">
        <IconCash className="text-neutral400 min-w-[20px]" height={20} alt="" />
        {zzyyxx ? (
          <Trans i18nKey="step-cost">
            <CostText id="costBlock" step={!!variant}>
              Cost:
            </CostText>
            <span> {{ zzyyxx }}.</span>
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
        <span className="block font-bold mb-12">{zzyyxx}</span>
        {description ? <RichText html={description} /> : null}
      </div>
    )
  }

  return (
    <div>
      <CostText as="h3" step={!!variant}>
        {COST_WORD}
      </CostText>
      <HeadingXs className="mb-12">{zzyyxx}</HeadingXs>
      {description ? (
        <div>
          <RichText html={description} />
        </div>
      ) : null}
    </div>
  )
}

import {
  BodyText,
  classed,
  HeadingXs,
  IconCash,
  HeadingLg
} from '@/design-system'
import { If, Then, Else, When, Switch, Case, Default } from 'react-if'
import { useTranslation } from 'next-i18next'
import type { TypeCostBlockValues } from '@/types'
import { RichText } from './RichText'

type CostBlockProps = TypeCostBlockValues & {
  variant?: string
}

export const CostBlock = ({
  cost: costType,
  flat_fee: flatFee,
  range,
  description,
  variant
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

  return (
    <Switch>
      <Case condition={variant === 'step'}>
        <div className="flex gap-4 items-start" data-testid="step-cost">
          <IconCash className="text-neutral400 min-w-[20px]" height={20} />
          <CostText as="h3" id="costBlock" step={!!variant}>
            {t('Cost')}:
          </CostText>
          <span>{cost}.</span>
          <When condition={description}>
            <RichText html={description} />
          </When>
        </div>
      </Case>
      <Case condition={variant === 'transaction'}>
        <div data-testid="transaction-cost">
          <HeadingLg
            as="h3"
            id="costBlock"
            transaction={!!variant}
            className="mb-12"
          >
            {t('Cost')}
          </HeadingLg>
          <span className="block font-bold mb-12">{cost}</span>
          <When condition={description}>
            <RichText html={description} />
          </When>
        </div>
      </Case>
      <Default>
        <div>
          <CostText as="h3" step={!!variant}>
            {t('Cost')}
          </CostText>
          <HeadingXs className="mb-12">{cost}</HeadingXs>
          <When condition={description}>
            <div>
              <RichText html={description} />
            </div>
          </When>
        </div>
      </Default>
    </Switch>
  )
}

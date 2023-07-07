import { HeadingMd, HeadingXs } from '@/design-system'
import { If, Then, Else, When } from 'react-if'
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

  const classes =
    variant === 'step' ? 'block pr-8 mb-20' : 'inline-block pr-8 mb-0'

  return (
    <div data-testid="step-cost">
      <If condition={variant === 'step'}>
        <Then>
          <HeadingMd as="h3" className={classes}>
            {t('Cost')}:
          </HeadingMd>
          <span>{cost}</span>.
          <When condition={description}>
            <RichText html={description} />
          </When>
        </Then>
        <Else>
          <HeadingMd as="h3" className={classes}>
            {t('Cost')}
          </HeadingMd>
          <HeadingXs className="mb-12">{cost}</HeadingXs>
          <When condition={description}>
            <div>
              <RichText html={description} />
            </div>
          </When>
        </Else>
      </If>
    </div>
  )
}

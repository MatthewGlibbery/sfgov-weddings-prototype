import { TitleMd, TitleXs } from '@/design-system'
import { If, Then, Else, When } from 'react-if'
import { useTranslation } from 'next-i18next'
import type { CostBlock } from '@/types'
import { RichText } from './RichText'

type CostBlockProps = CostBlock & {
  variant?: string
}

export const CostBlockDisplay = ({ value, variant }: CostBlockProps) => {
  const { cost: costType, flat_fee: flatFee, range, description } = value
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

  const classes = variant === 'step'
    ? 'block pr-8 mb-20'
    : 'inline-block pr-8 mb-0'

  return (
    <div data-testid='step-cost'>
      <If condition={variant === 'step'}>
        <Then>
          <TitleMd as='h3' className={classes}>{t('Cost')}:</TitleMd>
          <span>{cost}</span>.
          <When condition={description}>
            <RichText html={description} />
          </When>
        </Then>
        <Else>
          <TitleMd as='h3' className={classes}>{t('Cost')}</TitleMd>
          <TitleXs className='mb-12'>{cost}</TitleXs>
          <When condition={description}>
            <div><RichText html={description} /></div>
          </When>
        </Else>
      </If>

    </div>
  )
}

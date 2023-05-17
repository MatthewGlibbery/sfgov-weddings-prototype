import type { CostBlock } from '@/types'
import { TitleMd, TitleXs } from '@/design-system'
import { If, Then, Else, When } from 'react-if'
import { useTranslation } from 'next-i18next'

type CostBlockProps = CostBlock & {
  variant?: string
}

export function CostBlockDisplay ({ value: { cost: costType, flat_fee: flatFee, range, description }, variant }: CostBlockProps) {
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

  const css = {
    pr: 8,
    mb: 20,
    display: 'block'
  }

  if (variant === 'step') {
    css.mb = 0
    css.display = 'inline-block'
  }

  return (
    <div data-testid='step-cost'>
      <If condition={variant === 'step'}>
        <Then>
          <TitleMd as='h3' css={css}>{t('Cost')}:</TitleMd>
          <span>{cost}</span>.
          <When condition={description}> <span dangerouslySetInnerHTML={{ __html: description }} /></When>
        </Then>
        <Else>
          <TitleMd as='h3' css={css}>{t('Cost')}</TitleMd>
          <TitleXs css={{ mb: 12 }}>{cost}</TitleXs>
          <When condition={description}><div dangerouslySetInnerHTML={{ __html: description }} /></When>
        </Else>
      </If>

    </div>
  )
}

import type { CostBlock } from '@/types'
import { Label } from './Text'
import { When } from 'react-if'

export const Cost = ({ value: { cost: costType, flat_fee: flatFee, range, description } }: CostBlock) => {
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

  return (
    <div data-testid='step-cost'>
      <Label css={{ pr: 8, display: 'inline-block' }}>Cost:</Label>
      <span>{cost}</span>.
      <When condition={description}> {description}</When>
    </div>
  )
}

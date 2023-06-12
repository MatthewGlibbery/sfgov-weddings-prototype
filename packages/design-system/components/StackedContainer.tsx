import { classed } from './utils'
import type { AnyComponent, ComponentProps } from '../types'

export const StackedContainer = classed('div' as AnyComponent, {
  base: 'flex w-full gap-16',
  variants: {
    direction: {
      row: 'flex-row',
      col: 'flex-col'
    }
  },
  defaultVariants: {
    direction: 'row'
  }
})

StackedContainer.defaultProps = {
  'data-testid': 'stacked-content-container'
}

export type StackedContainerProps = ComponentProps<typeof StackedContainer>

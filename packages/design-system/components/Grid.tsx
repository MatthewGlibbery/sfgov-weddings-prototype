import { classed } from './utils'
import type { AnyComponent, ComponentProps } from '../types'

export const Grid = classed('div' as AnyComponent, {
  variants: {
    inline: {
      false: 'grid',
      true: 'inline-grid'
    }
  },
  defaultVariants: {
    inline: false
  }
})

export type GridProps = ComponentProps<typeof Grid>

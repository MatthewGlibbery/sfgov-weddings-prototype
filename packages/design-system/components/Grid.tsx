import { Box } from './Box'
import { styled } from '../stitches.config'
import { ComponentProps } from 'react'

export const Grid = styled(Box, {
  display: 'grid',
  gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
  gap: 20,
  '@md': {
    gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
    gap: 28
  }
})

export type GridProps = ComponentProps<typeof Grid>

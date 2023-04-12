import { Box } from './Box'
import { styled } from '../stitches.config'
import { ComponentProps } from 'react'

export const Container = styled(Box, {
  mx: 20,
  maxWidth: '$lg',
  '@md': {
    mx: 28
  },
  '@lg': {
    mx: 96
  },
  '@xl': {
    mx: 'auto'
  }
})

export type ContainerProps = ComponentProps<typeof Container>

import { styled } from '../stitches.config'
import { Box } from './Box'
import { ComponentProps } from 'react'

export const Flex = styled(Box, {
  display: 'flex',
  variants: {
    inline: {
      true: {
        display: 'inline-flex'
      }
    }
  }
})

export type FlexVariant = ComponentProps<typeof Flex>

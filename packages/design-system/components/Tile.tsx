import React from 'react'
import { Flex } from './Flex'
import { Grid } from './Grid'
import { TitleXs } from './Text'
import { styled } from '../stitches.config'

export const TileSection = styled(Grid, {
  mb: 60,
  gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
  '@md': {
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))'
  }
})

const TileContainer = styled(Flex, {
  justifyContent: 'space-between',
  overflow: 'hidden',
  flexDirection: 'column',
  color: '$slateL3',
  textDecorationLine: 'none',
  '@md': {
    flexDirection: 'row'
  }
})

const ContentWrapper = styled('div', {
  p: 20
})

export const TileTitle = styled(TitleXs, {
  mb: 20
})

type BaseTileProps = {
  href: string
  children: JSX.Element | JSX.Element[]
}

export const BaseTile = ({ href, children }: BaseTileProps) => (
  <TileContainer as='a' href={href} css={{ display: 'block' }}>
    <ContentWrapper>{children}</ContentWrapper>
  </TileContainer>
)

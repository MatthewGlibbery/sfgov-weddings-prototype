import React, { ComponentType } from 'react'
import { Flex } from './Flex'
import { Grid } from './Grid'
import { SmallText, TitleMd, TitleXs } from './Text'
import { styled } from '../stitches.config'
import { IconArrowRight, IconCalendar, IconDocument } from './icons'
import { TileBlock } from '@/types'

export type TileSectionProps = {
  links?: TileBlock[]
  css?: any
};

export type TileProps = {
  link: TileBlock
} & JSX.IntrinsicAttributes

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

const TileTitle = styled(TitleXs, {
  mb: 20
})

const BaseTile = ({ href, children }) => (
  <TileContainer as='a' href={href} css={{ display: 'block' }}>
    <ContentWrapper>{children}</ContentWrapper>
  </TileContainer>
)

export const NewsTile = ({ link }: TileProps) => (
  <BaseTile href={link.external_url}>
    <TileTitle>{link.title}</TileTitle>
    <div>{link.description}</div>
  </BaseTile>
)

export const ContentTile = ({ link }: TileProps) => (
  <BaseTile href={link.external_url}>
    <TileTitle>{link.title}</TileTitle>
    <div>{link.description}</div>
    <IconArrowRight />
  </BaseTile>
)

export const QuickLink = ({ link }: TileProps) => (
  <BaseTile href={link.external_url}>
    <IconDocument width={40} />
    <TitleMd css={{ my: 12 }}>{link.title}</TitleMd>
    <div>{link.description}</div>
    <IconArrowRight width={40} />
  </BaseTile>
)

export const EventTile = ({ link }: TileProps) => (
  <BaseTile href={link.external_url}>
    {/* <img src={imgSrc ? imgSrc : placeholder} /> */}
    <div>an image will go here</div>
    <Flex>
      <IconCalendar />
      <SmallText>{link.eventType}</SmallText>
    </Flex>
    <TitleMd css={{ my: 12 }}>{link.title}</TitleMd>
    <div>{link.description}</div>
  </BaseTile>
)

function renderTileList (props: TileSectionProps, TileComponent: ComponentType<TileProps>) {
  const { links, css, ...rest } = props
  if (!links?.length) return null

  return (
    <TileSection role='list' css={css} {...rest}>
      {links.map(link => (
        <TileComponent key={link.id} role='listitem' link={link.value}/>
      ))}
    </TileSection>
  )
}

export const NewsTileList = (props) => renderTileList(props, NewsTile)
export const ContentTileList = (props) => renderTileList(props, ContentTile)
export const QuickLinkList = (props) => renderTileList(props, QuickLink)
export const EventTileList = (props) => renderTileList(props, EventTile)

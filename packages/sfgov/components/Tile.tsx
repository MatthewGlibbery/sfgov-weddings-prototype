import {
  Flex,
  Grid,
  SmallText,
  TitleMd,
  TitleXs,
  styled,
  IconArrowRight,
  IconCalendar,
  IconDocument,
  type FIXMECSSProps
} from '@/design-system'
import type { ComponentType, ReactNode } from 'react'
import type { TileBlock } from '@/types'

export type TileSectionProps = {
  links?: TileBlock[]
} & FIXMECSSProps

export type TileProps = {
  link: TileBlock['value']
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

type BaseTileProps = {
  href: string
  children: ReactNode
}

const BaseTile = ({ href, children }: BaseTileProps) => (
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
      <SmallText>{link.event_type}</SmallText>
    </Flex>
    <TitleMd css={{ my: 12 }}>{link.title}</TitleMd>
    <div>{link.description}</div>
  </BaseTile>
)

function createTileList (TileComponent: ComponentType<TileProps>) {
  // eslint-disable-next-line react/function-component-definition
  return function TileList (props: TileSectionProps) {
    const { links, ...rest } = props
    if (!links?.length) return null
    return (
      // @ts-expect-error role should be allowed here
      <TileSection role='list' {...rest}>
        {links.map(link => (
          // @ts-expect-error role should be allowed here, too
          <TileComponent key={link.id} role='listitem' link={link.value}/>
        ))}
      </TileSection>
    )
  }
}

export const NewsTileList = createTileList(NewsTile)
export const ContentTileList = createTileList(ContentTile)
export const QuickLinkList = createTileList(QuickLink)
export const EventTileList = createTileList(EventTile)

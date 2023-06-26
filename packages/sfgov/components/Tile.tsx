import {
  classes,
  SmallText,
  TitleMd,
  IconArrowRight,
  IconCalendar,
  IconDocument
} from '@/design-system'
import type { ComponentType, ReactNode } from 'react'
import type { TileBlock } from '@/types'

export type TileSectionProps = {
  links?: TileBlock[]
}

export type TileProps = {
  link: TileBlock['value']
  role?: 'listitem'
} & JSX.IntrinsicAttributes

export const TileSection = ({
  className,
  ...rest
}: JSX.IntrinsicElements['div']) => (
  <div
    className={classes('grid grid-cols-1 md:grid-cols-3', className)}
    {...rest}
  />
)

const TileContainer = ({ className, ...rest }: JSX.IntrinsicElements['a']) => (
  <a
    className={classes('block overflow-hidden text-black', className)}
    {...rest}
  />
)

const TileTitle = (props: JSX.IntrinsicElements['div']) => (
  <div className="mb-20" {...props} />
)

type BaseTileProps = {
  href?: string
  children: ReactNode
}

const BaseTile = ({ href, children }: BaseTileProps) => (
  <TileContainer href={href}>
    <div className="flex flex-col p-20">{children}</div>
  </TileContainer>
)

export const NewsTile = ({ link }: TileProps) => (
  <BaseTile href={link.page.meta.html_url}>
    <TileTitle>{link.title}</TileTitle>
    <div>{link.description}</div>
  </BaseTile>
)

export const ContentTile = ({ link }: TileProps) => (
  <BaseTile href={link.page.meta.html_url}>
    <TileTitle>{link.title}</TileTitle>
    <div>{link.description}</div>
    <IconArrowRight />
  </BaseTile>
)

export const ServiceTile = ({ link }: TileProps) => (
  <BaseTile href={link.meta.html_url}>
    <TitleMd className="m-0 mb-8">{link.title}</TitleMd>
    <div>{link.meta.search_description}</div>
  </BaseTile>
)

export const ResourceTile = ({ link }: TileProps) => {
  return (
    <BaseTile href={link.url}>
      <TitleMd className="m-0 mb-8">{link.title}</TitleMd>
      <div>{link.description}</div>
    </BaseTile>
  )
}

export const QuickLink = ({ link }: TileProps) => (
  <BaseTile href={link.page.meta.html_url}>
    <IconDocument className="w-20 md:w-40" />
    <TitleMd className="my-12">{link.title}</TitleMd>
    <div>{link.description}</div>
    <IconArrowRight className="self-end" width={20} />
  </BaseTile>
)

export const EventTile = ({ link }: TileProps) => (
  <BaseTile href={link.page.meta.html_url}>
    {/* <img src={imgSrc ? imgSrc : placeholder} /> */}
    <div>an image will go here</div>
    <div className="flex">
      <IconCalendar />
      <SmallText>{link.event_type}</SmallText>
    </div>
    <TitleMd className="my-12">{link.title}</TitleMd>
    <div>{link.description}</div>
  </BaseTile>
)

function createTileList(TileComponent: ComponentType<TileProps>) {
  // eslint-disable-next-line react/function-component-definition
  return function TileList(props: TileSectionProps) {
    const { links, ...rest } = props
    if (!links?.length) return null
    return (
      <TileSection role="list" {...rest}>
        {links.map((link) => (
          <TileComponent
            key={link.id}
            role="listitem"
            link={link?.value || link}
          />
        ))}
      </TileSection>
    )
  }
}

export const NewsTileList = createTileList(NewsTile)
export const ContentTileList = createTileList(ContentTile)
export const QuickLinkList = createTileList(QuickLink)
export const EventTileList = createTileList(EventTile)
export const ServiceTileList = createTileList(ServiceTile)
export const ResourceTileList = createTileList(ResourceTile)

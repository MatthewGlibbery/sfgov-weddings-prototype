import { classed, classes } from '../utils'
import { BodyText } from '../Text'
import { IconArrowRight } from '../icons'
import type { ComponentProps, ComponentType, ReactNode } from 'react'

/**
 * Tile links use a flex layout with 12px spacing between icons and text
 */
export const TileLink = classed('a', {
  base: 'flex gap-12 text-black no-underline group',
  variants: {
    // divider styles between adjacent tiles
    divider: {
      true: [
        // 20px padding and margin on the bottom on mobile, 24px on lg+
        'pb-20 mb-20 lg:pb-[24px] lg:mb-[24px]',
        // horizontal border between this tile and the next one
        'border-b-1 border-neutral200',
        // the last tile should have no margin, padding, or border
        'last:pb-0 last:mb-0 last:border-0'
      ].join(' ')
    }
  },
  defaultVariants: {
    // show the divider by default; pass divider={false} to disable it
    divider: true
  }
})

type TileLinkProps = ComponentProps<typeof TileLink>

type IconComponent = ComponentType<JSX.IntrinsicElements['svg']>

export type TileProps = Omit<TileLinkProps, 'href' | 'children'> & {
  // href is required
  href: string
  /**
   * The tile title. This can either be a string or mixed content (JSX fragment,
   * etc.). NOTE: the "title" prop is reserved for accessibility purposes, and
   * can be used separately to assign an accessible title to the link.
   */
  heading: ReactNode
  /**
   * The SVG icon component to render before the heading. This component needs
   * to accept a className prop so that we can set responsive sizing classes on
   * it.
   */
  icon?: IconComponent
  // The tile description
  description?: ReactNode
}

// classes that style the link title and icons as links that darken on
// group-hover
export const TILE_LINK_CLASSES = classes(
  'text-primary600 group-hover:text-primary800'
)

/**
 * This is the "base" tile component used to render all tile types except quick
 * links. Tiles are links, so they require an href and a heading.
 */
export function Tile({ heading, description, icon: Icon, ...rest }: TileProps) {
  return (
    <TileLink data-testid="tile-link" {...rest}>
      {Icon ? (
        <div className={classes('self-start', TILE_LINK_CLASSES)}>
          <Icon className="size-20 lg:!size-[24px]" data-testid="tile-icon" />
        </div>
      ) : null}
      <TileContent>
        <div
          className={classes(
            'font-bold underline line-clamp-2',
            TILE_LINK_CLASSES
          )}
          data-testid="tile-heading"
        >
          {heading}
        </div>
        {description ? (
          <BodyText
            as="div"
            data-testid="tile-description"
            className="line-clamp-3"
          >
            {description}
          </BodyText>
        ) : null}
      </TileContent>
      <div
        className={classes(
          /**
           * 6px left padding makes the spacing between the text and the arrow
           * 18px (because <TileLink> uses `gap-12`)
           */
          'pl-[6px] self-start',
          TILE_LINK_CLASSES
        )}
      >
        <IconArrowRight
          width={20}
          height={24}
          data-testid="tile-arrow"
          aria-hidden="true"
        />
      </div>
    </TileLink>
  )
}

/**
 * Tile content stretches to fill the flexbox and has consistent vertical
 * spacing between children.
 */
export const TileContent = classed('div', 'space-y-8 basis-full')

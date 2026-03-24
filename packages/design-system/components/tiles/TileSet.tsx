import type { ComponentProps, ReactNode } from 'react'
import { TEXT_CLASSES } from '../Text'
import { classed } from '../utils'

// TODO: add cols-A/B width tokens and use lg:max-w-cols-10/12 here
const TileSetContainer = classed('div')

export type TileSetProps = Omit<
  ComponentProps<typeof TileSetContainer>,
  'children'
> & {
  heading?: ReactNode
  // children are required
  children: ReactNode
}

const TileSetHeading = classed('h3', TEXT_CLASSES.headingXl, '!mb-28')

/**
 * A tile set is a collection of tile links with an optional heading (rendered
 * as an <h3>):
 *
 * ```tsx
 * <TileSet heading="Some tiles">
 *   <Tile {...} />
 *   <Tile {...} />
 *   <Tile {...} />
 * </TileSet>
 * ```
 */
export function TileSet({ heading, children, ...rest }: TileSetProps) {
  return (
    <TileSetContainer data-testid="tile-set" {...rest}>
      {/* TODO: nix these wrappers when we have cols-A/B width tokens */}
      <div className="lg:grid lg:grid-cols-12 lg:gap-28">
        <div className="grid lg:col-span-10">
          {heading ? (
            <TileSetHeading data-testid="tile-set-heading">
              {heading}
            </TileSetHeading>
          ) : null}
          {children}
        </div>
      </div>
    </TileSetContainer>
  )
}

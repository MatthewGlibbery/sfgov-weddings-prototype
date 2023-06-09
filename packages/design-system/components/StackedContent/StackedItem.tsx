// Turn off require React for eslint since we're using 18.x?
import React, { type FunctionComponent, type ReactNode } from 'react'
import clsx from 'clsx'
import { SVGIcon, TitleSm } from '../'
import { StackedContentDirection } from './common'

const stackedItemStyles = 'w-full border-1 border-solid border-[#D6D3D3]'

type StackedItemProps = {
  children: ReactNode
  direction?: StackedContentDirection
  icon?: null | string | typeof SVGIcon | FunctionComponent<unknown>
  title?: string
}

/**
 * Renders a StackedItem that will adjust its display according to the desired
 * orientation "row/column". This is intended to be used with a StackedContent
 * container.
 */
export const StackedItem = ({
  children,
  direction = StackedContentDirection.ROW,
  icon: Icon = null,
  title = ''
}: StackedItemProps) => {
  const StyledItem = ({ className, ...rest }: JSX.IntrinsicElements['div']) => {
    return (
      <div
        className={clsx(
          stackedItemStyles,
          className,
          direction === StackedContentDirection.ROW ? 'px-16' : 'pb-12'
        )}
        {...rest}
      />
    )
  }

  // TODO: handle icons as paths instead of assuming an Icon element

  return (
    <StyledItem data-testid="stacked-content-item">
      <TitleSm className="flex">
        {Icon ? (
          <div className="flex mr-10" data-testid="stacked-content-item-icon">
            <Icon width={28} />
          </div>
        ) : null}
        {title}
      </TitleSm>
      {children}
    </StyledItem>
  )
}

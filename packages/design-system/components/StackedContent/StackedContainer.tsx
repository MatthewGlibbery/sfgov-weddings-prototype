import React, { Children, cloneElement, isValidElement } from 'react'
import clsx from 'clsx'
import { StackedContentDirection } from './common'

const stackedContentStyles = 'flex w-full'

// Arbitrarily chose HorizontalStackedContainer to type, as both the instances
// should have the props we need though for proper typing.
type StackedContainerProps = JSX.IntrinsicElements['div'] & {
  direction?: StackedContentDirection
}

/**
 * StackedContent is a container that is intended to be used
 * with StackedItems as it will handle the automatic rendering
 * adjustments needed for a change of content direction that
 * is triggered by screen size changes (or if forced manually).
 */
export const StackedContainer = ({
  children,
  className,
  direction = StackedContentDirection.ROW,
  ...rest
}: StackedContainerProps) => {
  // add the direction prop for the children - this is important for stacked
  // items so that it can render appropriately
  // TODO: auto-detection logic on when to switch direction?
  const modChildren = Children.map(children, (child) => {
    if (!isValidElement(child)) {
      return child
    }
    return cloneElement(child, { direction } as StackedContainerProps)
  })

  return (
    <div
      className={clsx(
        stackedContentStyles,
        direction === StackedContentDirection.ROW ? 'flex-row' : 'flex-col',
        className
      )}
      data-testid="stacked-content-container"
      {...rest}
    >
      {modChildren}
    </div>
  )
}

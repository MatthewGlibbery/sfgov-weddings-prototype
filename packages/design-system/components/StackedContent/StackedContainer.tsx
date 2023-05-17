import React, { ComponentProps, Children, cloneElement, isValidElement, ReactNode } from 'react'

import { styled } from '../../stitches.config'
import { StackedContentDirection } from './common'

const stackedContentStyles = {
  alignItems: 'top',
  display: 'flex',
  height: '100%',
  width: '100%'
}
// Inheriting from Box breaks things (SSR vs Client style mismatch)
// Spread operator doesn't seem to get evaluated for styiling, so Object.assign it is.
const HorizontalStackedContainer = styled('div', Object.assign({}, stackedContentStyles, {
  flexDirection: StackedContentDirection.ROW
}))
const VerticalStackedContainer = styled('div', Object.assign({}, stackedContentStyles, {
  flexDirection: StackedContentDirection.COLUMN
}))

// Arbitrarily chose HorizontalStackedContainer to type, as both the instances
// should have the props we need though for proper typing.
type StackedContainerProps = ComponentProps<typeof HorizontalStackedContainer> & {
  children: ReactNode
  direction?: StackedContentDirection
}

/**
 * StackedContent is a container that is intended to be used with StackedItems as
 * it will handle the automatic rendering adjustments needed for a change of content
 * direction that is triggered by screen size changes (or if forced manually).
 */
export const StackedContainer = ({
  children,
  direction = StackedContentDirection.ROW,
  ...rest
}: StackedContainerProps) => {
  const StyledContent = direction === StackedContentDirection.ROW
    ? HorizontalStackedContainer
    : VerticalStackedContainer

  // add the direction prop for the children - this is important for stacked
  // items so that it can render appropriately
  // TODO: auto-detection logic on when to switch direction?
  const modChildren = Children.map(children, (child) => {
    if (!isValidElement(child)) {
      return child
    }

    return cloneElement(child, { direction } as StackedContainerProps)
  })

  return <StyledContent data-testid='stacked-content-container' {...rest}>{ modChildren }</StyledContent>
}

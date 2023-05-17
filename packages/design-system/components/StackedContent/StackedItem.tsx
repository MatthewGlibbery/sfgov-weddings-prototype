// Turn off require React for eslint since we're using 18.x?
import React, { FunctionComponent, ReactNode } from 'react'

import { styled } from '../../stitches.config'
import { Flex, SVGIcon, TitleMd } from '../'
import { StackedContentDirection } from './common'

const stackedItemStyles = {
  flexGrow: 1
}
const HorizontalStackedItem = styled('div', Object.assign({}, stackedItemStyles, {
  borderLeft: '1px solid #D6D3D3',
  padding: '0 15px 0 15px'
}))
const VerticalStackedItem = styled('div', Object.assign({}, stackedItemStyles, {
  borderBottom: '1px solid #D6D3D3',
  padding: '0 0 12px 0'
}))

type StackedItemProps = {
  children: ReactNode
  direction?: StackedContentDirection
  icon?: null | string | typeof SVGIcon | FunctionComponent<unknown>
  title?: string
}

/**
 * Renders a StackedItem that will adjust its display according to the desired
 * orientation "row/column". This is intended to be used with a StackedContent container.
 */
export const StackedItem = ({
  children,
  direction = StackedContentDirection.ROW,
  icon: Icon = null,
  title = ''
}: StackedItemProps) => {
  const StyledItem = direction === StackedContentDirection.ROW
    ? HorizontalStackedItem
    : VerticalStackedItem

  // TODO: handle icons as paths instead of assuming an Icon element

  return (
    <StyledItem data-testid='stacked-content-item'>
      <TitleMd as='h4' css={{ display: 'flex' }}>
        { Icon ? <Flex data-testid='stacked-content-item-icon' css={{ mr: 10 }}><Icon width={28} /></Flex> : null }{ title }
      </TitleMd>
      { children }
    </StyledItem>
  )
}

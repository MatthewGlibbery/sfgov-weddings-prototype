import React, { type ComponentType, type ElementType } from 'react'
import { withClasses, withFixedProps } from '../utils'
import type { FIXMEChildrenProps, FIXMEAsableProps } from '../types'

type TextProps = FIXMEChildrenProps & FIXMEAsableProps

export const Text = ({ as: Component = 'div', ...rest }: TextProps) => (
  <Component {...rest} />
)

Text.as = (el: ComponentType | ElementType) => withFixedProps(Text, { as: el })

export const Heading1 = Text.as('h1')
export const Heading2 = Text.as('h2')
export const Heading3 = Text.as('h3')
export const Heading4 = Text.as('h4')
export const Heading5 = Text.as('h5')

export const BodyText = withClasses(Text, 'font-body text-body')
export const SmallText = withClasses(Text, 'font-body text-small')
export const BigDesc = withClasses(
  Text,
  'font-body font-bold text-h4 lg:text-h3'
)
export const TitleXs = withClasses(Heading5, 'font-body text-heading-xs')
export const TitleSm = withClasses(Heading4, 'font-body text-heading-sm')
export const TitleMd = withClasses(Heading3, 'font-body text-heading-md')
export const TitleLg = withClasses(Heading2, 'font-slab text-heading-xl')
export const TitleXl = withClasses(Text, 'font-slab text-heading-xxl')
export const DisplaySm = withClasses(Text, 'font-body text-display-lg')
export const DisplayLg = withClasses(Heading1, 'font-slab text-display-xxxl')
export const Monospace = withClasses(Text, 'mono')
export const Label = withClasses(Text, 'label')

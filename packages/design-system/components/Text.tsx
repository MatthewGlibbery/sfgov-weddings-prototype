import { classed } from './utils'
import type { AnyComponent, ComponentProps } from '../types'

export const Text = classed('span' as AnyComponent, {
  variants: {
    variant: {
      body: 'font-body text-body',
      small: 'font-body text-small',
      headingXs: 'font-body text-heading-xs text-neutral900 mb-space-label',
      headingSm:
        'font-body text-heading-sm text-neutral900 mb-space-body lg:mb-8',
      headingMd:
        'font-body text-heading-md md:text-tablet-heading-md lg:text-desktop-heading-md text-neutral900 mb-space-body',
      headingLg:
        'font-slab text-heading-lg md:text-tablet-heading-md lg:text-desktop-heading-lg text-neutral900 mb-space-body',
      headingLgListItem:
        'font-body text-heading-lg-li md:text-tablet-heading-lg-li lg:text-desktop-heading-lg-li text-neutral900 mb-space-body',
      headingXl:
        'font-slab text-heading-xl md:text-tablet-heading-xl lg:text-desktop-heading-xl text-neutral900 mb-space-body',
      headingXlSans:
        'font-body text-heading-xl md:text-tablet-heading-xl lg:text-desktop-heading-xl text-neutral900 mb-space-body',
      headingXXl:
        'font-slab text-heading-xxl md:text-tablet-heading-xxl lg:text-desktop-heading-xxl text-neutral900 mb-space-body',
      displayLg:
        'font-body text-display-lg md:text-tablet-display-lg lg:text-desktop-display-lg',
      displayXXXl:
        'font-slab text-display-xxxl md:text-tablet-display-xxxl lg:text-desktop-display-xxxl text-neutral900 mb-space-body lg:mb-16',
      mono: 'font-monospace text-body',
      label: 'font-body text-label',
      labelXs: 'font-body text-label-xs mb-space-body',
      labelSm: 'font-body text-label-sm mb-space-body',
      labelMd: 'font-body text-label-md mb-space-body'
    },
    romanType: {
      serif: 'font-slab',
      sans: 'font-body'
    }
  }
})

export type TextProps = ComponentProps<typeof Text>

export type TextVariant = TextProps['variant']

function createVariant(variant: TextVariant) {
  // eslint-disable-next-line react/function-component-definition
  return function TextVariant(props: Omit<TextProps, 'variant'>) {
    return <Text variant={variant} {...props} />
  }
}

export const BodyText = createVariant('body')
export const SmallText = createVariant('small')
export const HeadingXs = createVariant('headingXs')
export const HeadingSm = createVariant('headingSm')
export const HeadingMd = createVariant('headingMd')
export const HeadingLg = createVariant('headingLg')
export const HeadingLgListItem = createVariant('headingLgListItem')
export const HeadingXl = createVariant('headingXl')
export const HeadingXlSans = createVariant('headingXlSans')
export const HeadingXXl = createVariant('headingXXl')
export const DisplayLg = createVariant('displayLg')
export const DisplayXXXl = createVariant('displayXXXl')
export const Monospace = createVariant('mono')
export const Label = createVariant('label')
export const LabelXs = createVariant('labelXs')
export const LabelSm = createVariant('labelSm')
export const LabelMd = createVariant('labelMd')

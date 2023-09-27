import { classed } from './utils'
import type { AnyComponent, ComponentProps } from '../types'

export const Text = classed('span' as AnyComponent, {
  variants: {
    variant: {
      body: 'font-body text-body',
      small: 'font-body text-small',
      bigDesc: 'font-body font-bold text-h4 lg:text-h3',
      headingXs: 'font-body text-heading-xs',
      headingSm: 'font-body text-heading-sm',
      headingMd: 'font-body text-heading-md lg:text-desktop-heading-md',
      headingLg: 'font-slab text-heading-lg lg:text-desktop-heading-lg',
      headingXl: 'font-slab text-heading-xl',
      headingXXl: 'font-slab text-heading-xxl lg:text-desktop-heading-xxl',
      displayLg: 'font-body text-display-lg lg:text-desktop-display-lg',
      displayXXXl: 'font-slab text-display-xxxl lg:text-desktop-display-xxxl',
      mono: 'font-monospace text-body',
      label: 'font-body text-label'
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
export const BigDesc = createVariant('bigDesc')
export const HeadingXs = createVariant('headingXs')
export const HeadingSm = createVariant('headingSm')
export const HeadingMd = createVariant('headingMd')
export const HeadingLg = createVariant('headingLg')
export const HeadingXl = createVariant('headingXl')
export const HeadingXXl = createVariant('headingXXl')
export const DisplayLg = createVariant('displayLg')
export const DisplayXXXl = createVariant('displayXXXl')
export const Monospace = createVariant('mono')
export const Label = createVariant('label')

import { classed } from './utils'
import type { AnyComponent, ComponentProps } from '../types'

export const Text = classed('span' as AnyComponent, {
  variants: {
    variant: {
      body: 'font-body text-body',
      small: 'font-body text-small',
      bigDesc: 'font-body font-bold text-h4 lg:text-h3',
      titleXs: 'font-body text-heading-xs',
      titleSm: 'font-body text-heading-sm',
      titleMd: 'font-body text-heading-md',
      titleLg: 'font-slab text-heading-xl',
      titleXl: 'font-slab text-heading-xxl',
      displaySm: 'font-body text-display-lg',
      displayLg: 'font-slab text-display-xxxl',
      mono: 'font-monospace text-body',
      label: 'font-body text-label'
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
export const TitleXs = createVariant('titleXs')
export const TitleSm = createVariant('titleSm')
export const TitleMd = createVariant('titleMd')
export const TitleLg = createVariant('titleLg')
export const TitleXl = createVariant('titleXl')
export const DisplaySm = createVariant('displaySm')
export const DisplayLg = createVariant('displayLg')
export const Monospace = createVariant('mono')
export const Label = createVariant('label')

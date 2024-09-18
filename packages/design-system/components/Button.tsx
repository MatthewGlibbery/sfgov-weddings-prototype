import { classed, classes } from './utils'
import type { ComponentProps } from 'react'

const focusDropShadow = 'focus:shadow-[0_0_0_4px_#C9CACA]'
const inverseButtonClasses = classes(`
  text-primary900
  bg-primary100
  hover:text-white hover:bg-primary500
  focus:text-white focus:bg-primary500 ${focusDropShadow}
`)

export const BUTTON_VARIANTS = {
  base: classes(
    'items-center',
    'justify-center',
    'rounded-[8px]', // FIXME: need 8px in theme.radii
    'gap-8',
    'px-20',
    'py-8',
    'border-[transparent]', // FIXME: need transparent in theme.colors
    'border-solid',
    'border-3',
    'cursor-pointer',
    'font-body',
    'text-body',
    'text-center',
    'no-underline',
    'whitespace-nowrap'
  ),
  variants: {
    variant: {
      primary: classes(
        'border-current border-1',
        'text-white',
        'bg-primary600',
        'hover:bg-primary100',
        'hover:border-primary100',
        'hover:text-primary700',
        'focus:bg-primary100',
        'focus:border-primary100',
        'focus:text-primary700',
        focusDropShadow
      ),
      secondary: classes(
        inverseButtonClasses,
        'border-1',
        'border-primary100',
        'rounded-[4px]'
      ),
      tertiary: classes(
        'border-1',
        'border-primary600',
        'text-primary600',
        'bg-white',
        'rounded-4'
      ),
      link: classes(
        inverseButtonClasses,
        'bg-[transparent]', // FIXME: need transparent in theme.colors
        'underline'
      )
    },
    block: {
      true: classes('flex w-full'),
      false: classes('inline-flex')
    }
  },
  defaultVariants: {
    variant: 'primary',
    block: false
  }
} as const

export const Button = classed('button', BUTTON_VARIANTS)

export type ButtonProps = ComponentProps<typeof Button>

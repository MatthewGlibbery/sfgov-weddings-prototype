import { classed, classes } from './utils'
import type { ComponentProps } from 'react'

const focusDropShadow = 'focus:shadow-[0_0_0_4px_#C9CACA]'
const inverseButtonClasses = classes(`
  text-primary700
  bg-primary100
  hover:text-primary900 hover:bg-primary200 
  hover:border-primary200
  focus:text-primary900 focus:bg-primary200
  focus:border-primary200 ${focusDropShadow}
`)

export const BUTTON_VARIANTS = {
  base: classes(
    'items-center',
    'justify-center',
    'shrink-0',
    'rounded-4', // FIXME: need 8px in theme.radii
    'gap-8',
    'px-16',
    'py-[15px]',
    'border-[transparent]', // FIXME: need transparent in theme.colors
    'border-solid',
    'border-1',
    'cursor-pointer',
    'font-body',
    'text-body',
    'text-center',
    'no-underline',
    'whitespace-nowrap',
    'w-fit'
  ),
  variants: {
    variant: {
      primary: classes(
        'border-current border-1',
        'text-white',
        'bg-primary600',
        'hover:bg-primary800',
        'hover:border-primary800',
        'hover:text-white',
        'focus:bg-primary800',
        'focus:border-primary800',
        'focus:text-white',
        focusDropShadow
      ),
      secondary: classes(inverseButtonClasses),
      tertiary: classes(
        'border-primary600',
        'text-primary600',
        'bg-white',
        'hover:bg-primary100',
        'hover:border-primary700',
        'hover:text-primary700',
        'focus:bg-primary100',
        'focus:border-primary700',
        'focus:text-primary700',
        focusDropShadow
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

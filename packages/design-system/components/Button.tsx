import { classed, classes } from './utils'
import type { AnyComponent, ComponentProps } from '../types'

const focusDropShadow = 'focus:shadow-[0_0_0_4px_#C9CACA]'
const inverseButtonClasses = classes(`
  text-primary900
  bg-primary100
  hover:text-white hover:bg-primary500
  focus:text-white focus:bg-primary500 ${focusDropShadow}
`)

export const Button = classed('button' as AnyComponent, {
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
        'border-current',
        'text-white',
        'bg-primary500',
        'hover:bg-primary100',
        'hover:text-primary700',
        'focus:bg-primary100',
        'focus:text-primary700',
        focusDropShadow
      ),
      secondary: classes(
        inverseButtonClasses,
        'border-1',
        'border-primary100',
        'rounded-[4px]'
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
})

export type ButtonProps = ComponentProps<typeof Button>

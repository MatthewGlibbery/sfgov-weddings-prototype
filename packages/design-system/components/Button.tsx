import { classed, classes } from './utils'
import type { AnyComponent, ComponentProps } from '../types'

const inverseButtonClasses = classes(`
  text-action
  bg-white
  hover:text-blue400 hover:bg-white
  focus:text-blue400 focus:bg-white
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
        'hover:bg-grey400',
        'hover:text-white',
        'focus:bg-grey400',
        'focus:text-white'
      ),
      secondary: classes(inverseButtonClasses, 'border-current'),
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

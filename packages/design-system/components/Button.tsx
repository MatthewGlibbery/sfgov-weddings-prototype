import clsx from 'clsx'
import React, { type ComponentProps, type ElementType } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'link'

const baseButtonClasses = [
  'items-center',
  'justify-center',
  'rounded-[8px]',
  'gap-8',
  'px-20',
  'py-8',
  'border-[transparent]',
  'border-solid',
  'border-[3px]',
  'cursor-pointer',
  'font-body',
  'text-body',
  'text-center',
  'no-underline',
  'whitespace-nowrap'
]

const inverseButtonClasses = [
  'text-action',
  'bg-white',
  'hover:text-blue400 hover:bg-white',
  'focus:text-blue400 focus:bg-white'
]

const variants = {
  primary: ['text-white', 'bg-action', 'hover:bg-blue400', 'focus:bg-blue400'],
  secondary: [...inverseButtonClasses, 'border-current'],
  link: [...inverseButtonClasses, 'bg-[transparent]', 'underline']
}

export type ButtonProps<C extends ElementType> = {
  as?: C
  variant?: ButtonVariant
  block?: boolean
} & ComponentProps<C>

export const Button = <C extends ElementType = 'button'>({
  as,
  className,
  variant,
  block,
  ...rest
}: ButtonProps<C>) => {
  const Component = as || 'button'
  return (
    <Component
      className={clsx(
        block ? 'flex w-full' : 'inline-flex',
        baseButtonClasses,
        // @ts-expect-error whatever
        variants[variant || 'primary'],
        className
      )}
      {...rest}
    />
  )
}

import React, {
  ComponentProps,
  FC,
  type ComponentType,
  type ElementType
} from 'react'
import clsx, { type ClassValue } from 'clsx'
import type { ClassProps } from './types'

export function identity(v: unknown) {
  return v
}

export function withFixedProps(
  Component: ComponentType | ElementType,
  fixed: Partial<ComponentProps<typeof Component>>
) {
  return function FixedProps(props) {
    return <Component {...props} {...fixed} />
  } as FC<Omit<ComponentProps<typeof Component>, keyof typeof fixed>>
}

export function withClasses(
  Component: ComponentType<ClassProps> | ElementType,
  ...classes: ClassValue[]
) {
  return function WithClasses({ className, ...rest }) {
    return <Component className={clsx(classes, className)} {...rest} />
  } as ComponentType<ComponentProps<typeof Component> & ClassProps>
}

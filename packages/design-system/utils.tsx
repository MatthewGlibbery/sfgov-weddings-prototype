import React, { ComponentProps, ComponentType } from 'react'

export function identity (v: unknown) {
  return v
}

export function pxMap (values: number[]): Record<number, string> {
  return values.reduce((o, n) => Object.assign(o, { [n]: px(n) }), {})
}

export function px (n: number | string) {
  return (typeof n === 'string') ? n : n === 0 ? '0' : `${n}px`
}

export function withFixedProps (
  Component: ComponentType,
  fixed: Partial<ComponentProps<typeof Component>>
) {
  type Unfixed = Omit<ComponentProps<typeof Component>, keyof typeof fixed>
  // eslint-disable-next-line react/function-component-definition
  return function FixedProps (props: Unfixed) {
    return <Component {...fixed} {...props} />
  }
}

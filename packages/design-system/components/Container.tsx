import React from 'react'
import clsx from 'clsx'

export type ContainerProps = JSX.IntrinsicElements['div']

export const Container = ({ className, ...rest }: ContainerProps) => (
  <div
    className={clsx(
      'mx-20 max-w-lg',
      'md:mx-28',
      'lg:mx-96',
      'xl:mx-auto',
      className
    )}
    {...rest}
  />
)

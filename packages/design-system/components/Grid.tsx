import React from 'react'
import clsx from 'clsx'

export type GridProps = JSX.IntrinsicElements['div']

export const Grid = ({ className, ...rest }: GridProps) => (
  <div className={clsx('grid', className)} {...rest} />
)

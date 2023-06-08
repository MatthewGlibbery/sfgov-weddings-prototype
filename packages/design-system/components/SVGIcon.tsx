import React from 'react'
import clsx from 'clsx'

export type SVGIconProps = JSX.IntrinsicElements['svg'] & {
  width?: number
  height?: number
}

/**
 * SVGIcon is the vehicle for SVG icon styles without the content.
 * To render a specific SVG icon, pass it to the `as` prop as a component.
 */
export const SVGIcon = ({ className, ...rest }: SVGIconProps) => (
  <svg className={clsx('fill-current stroke-current', className)} {...rest} />
)

import { classed } from './utils'
import type { ComponentProps } from '../types'

export const Link = classed('a', 'text-primary600 cursor-pointer')

export type LinkProps = ComponentProps<typeof Link>

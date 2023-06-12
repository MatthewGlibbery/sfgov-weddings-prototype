// eslint-disable-next-line import/no-internal-modules
import { createClassed } from '@tw-classed/react'
import { twMerge } from 'tailwind-merge'

export const { classed } = createClassed({
  merger: twMerge
})

export const classes = twMerge

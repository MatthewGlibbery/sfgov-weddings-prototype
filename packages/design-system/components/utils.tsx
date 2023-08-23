// eslint-disable-next-line import/no-internal-modules
import { createClassed } from '@tw-classed/react'
import { extendTailwindMerge } from 'tailwind-merge'

const twMerge = extendTailwindMerge({
  classGroups: {
    'font-size': [{ text: ['heading-sm', 'heading-md', 'heading-xl'] }]
  }
})

export const { classed } = createClassed({
  merger: twMerge
})

export const classes = twMerge

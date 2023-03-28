import React from 'react'
import { EmailBlock } from '@/types'

export const EmailBlockLink = ({ value }: EmailBlock) =>
  value?.email ? <a href={`mailto:${value.email}`}>{value.title || value.email}</a> : null

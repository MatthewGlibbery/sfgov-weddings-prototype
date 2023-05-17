import React from 'react'
import { EmailValues } from '@/types'

export const EmailBlockLink = ({ email, title }: EmailValues) =>
  email ? <a href={`mailto:${email}`}>{title || email}</a> : null

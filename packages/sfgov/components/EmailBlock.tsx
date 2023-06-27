import { TypeEmailValues } from '@/types'

export const EmailBlock = ({ email, title }: TypeEmailValues) =>
  email ? <a href={`mailto:${email}`}>{title || email}</a> : null

import { TypeEmailValues } from '@/types'

export const EmailBlock = ({ email, title }: TypeEmailValues) => {
  if (!email) return null
  return (
    <div>
      <p className="font-bold">{title}</p>
      <a className="text-primary500" href={`mailto:${email}`}>
        {email}
      </a>
    </div>
  )
}

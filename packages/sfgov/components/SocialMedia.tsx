import { IconInfo } from '@/design-system'
import { SocialMediaBlockValues } from '@/types'

export const SocialMedia = ({ type, value }: SocialMediaBlockValues) => {
  const Icon = IconInfo
  switch (type) {
    case 'facebook':
      // Icon = IconFacebook
      break
    case 'instagram':
      // Icon = IconInstagram
      break
    case 'twitter':
      // Icon = IconTwitter
      break
    /* istanbul ignore next */
    default:
      console.error('unrecognized social media type')
  }
  return (
    <a className="text-black" href={value}>
      <Icon width={40} />
    </a>
  )
}

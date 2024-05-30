import { IconFacebook, IconInstagram, IconX } from '@/design-system'
import { TypeSocialMediaBlockValues } from '@/types'

export const SocialMedia = ({ type, items }: TypeSocialMediaBlockValues) => {
  const blocks = []
  const icons = {
    facebook: <IconFacebook width={20} />,
    x: <IconX width={20} />,
    instagram: <IconInstagram width={20} />
  }

  for (const [key, value] of Object.entries(items)) {
    blocks.push(
      <div className="flex gap-x-4 mb-space-md">
        {icons[key]}
        <a href="{value}">{value}</a>
      </div>
    )
  }

  return <div key={items.id}>{blocks}</div>
}

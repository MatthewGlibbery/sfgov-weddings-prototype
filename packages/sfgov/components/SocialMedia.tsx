import { IconFacebook, IconInstagram, IconX } from '@/design-system'
import { TypeSocialMediaBlockValues } from '@/types'

type SocialMediaProps = {
  items: TypeSocialMediaBlockValues
}

export const SocialMedia = ({ items }: SocialMediaProps) => {
  const blocks = []
  const icons = {
    facebook: <IconFacebook width={20} />,
    x: <IconX width={20} />,
    instagram: <IconInstagram width={20} />
  }

  for (const [key, value] of Object.entries(items)) {
    if (value) {
      blocks.push(
        <div key={`data-${key}`} className="flex gap-x-4">
          {icons[key]}
          <a href={value} className="capitalize text-primary500">
            {key}
          </a>
        </div>
      )
    }
  }

  return <div className="flex flex-col gap-y-28">{blocks}</div>
}

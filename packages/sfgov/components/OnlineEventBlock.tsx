import { TypeOnlineEventBlockValues } from '@/types'
import { Button } from '@/design-system'
import { PhoneNumberBlock } from './PhoneNumberBlock'

export const OnlineEventBlock = (props: TypeOnlineEventBlockValues) => {
  const { description, link, phone: phoneNumbers } = props
  return (
    <div className="space-y-12">
      <div>{description}</div>
      <Button as="a" href={link.url} aria-label={`${link.link_text}`}>
        {link.link_text}
      </Button>
      {phoneNumbers.map((phone) => (
        <div key={phone.id} className="mb-20">
          <PhoneNumberBlock {...phone.value} />
        </div>
      ))}
    </div>
  )
}

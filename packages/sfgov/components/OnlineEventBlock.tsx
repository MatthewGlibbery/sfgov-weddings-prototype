import { TypeOnlineEventBlockValues } from '@/types'
import { BodyText, Button } from '@/design-system'
import { PhoneNumberBlock } from './PhoneNumberBlock'

export const OnlineEventBlock = (props: TypeOnlineEventBlockValues) => {
  const { description, link, phone: phoneNumbers } = props
  return (
    <div>
      <BodyText className="block my-8">{description}</BodyText>
      <Button
        as="a"
        href={link.url}
        aria-label={`${link.link_text}`}
        className="bg-blue200 mb-20"
      >
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

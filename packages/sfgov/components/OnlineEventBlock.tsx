import { TypeOnlineEventBlockValues } from '@/types'
import { Button } from '@/design-system'
import { PhoneNumberBlock } from './PhoneNumberBlock'

export const OnlineEventBlock = (props: TypeOnlineEventBlockValues) => {
  const { description, link, phone: phoneNumbers } = props
  let url: string | undefined = ''
  if (link?.link_to === 'page') url = link?.page?.meta?.html_url
  if (link?.link_to === 'url') url = link?.url
  return (
    <div className="space-y-12">
      <div>{description}</div>
      {url && link?.link_text ? (
        <Button as="a" href={url} aria-label={`${link.link_text}`}>
          {link.link_text}
        </Button>
      ) : null}

      {phoneNumbers.map((phone) => (
        <div key={phone.id} className="mb-20">
          <PhoneNumberBlock {...phone.value} />
        </div>
      ))}
    </div>
  )
}

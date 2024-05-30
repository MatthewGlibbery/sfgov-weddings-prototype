import { When } from 'react-if'
import { TypeCallToActionValues } from '@/types'
import { BodyText, Button, HeadingLg } from '@/design-system'

/* FYI: In current sf.gov there are CTA variants that aren't accounted for
 * here nor in the Wagtail block type. Should we need them for the
 * redesigned CTA, adding them should be a simple additional prop (I think)
 */

export const CallToAction = ({
  title,
  description,
  link
}: TypeCallToActionValues) => {
  const ariaLabel = link.aria_label ?? `${title} ${link.link_text}`
  const url = link.page ? link.page.meta.html_url : link.url
  return (
    <div className="flex flex-col gap-y-8">
      <When condition={title}>
        <HeadingLg as="h3" className="mb-4">
          {title}
        </HeadingLg>
      </When>
      <When condition={description}>
        <BodyText>{description}</BodyText>
      </When>
      <When condition={!!(url && link.link_text)}>
        <Button className="w-fit" as="a" href={url} aria-label={ariaLabel}>
          {link.link_text}
        </Button>
      </When>
    </div>
  )
}

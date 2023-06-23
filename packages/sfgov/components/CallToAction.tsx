import { When } from 'react-if'
import { CallToActionValues } from '@/types'
import { Button, TitleMd } from '@/design-system'

/* FYI: In current sf.gov there are CTA variants that aren't accounted for
 * here nor in the Wagtail block type. Should we need them for the
 * redesigned CTA, adding them should be a simple additional prop (I think)
 */

export const CallToAction = ({ title, link }: CallToActionValues) => (
  <div className="flex flex-col gap-y-20">
    <When condition={title}>
      <TitleMd>{title}</TitleMd>
    </When>
    <When condition={!!(link.url && link.link_text)}>
      <Button as="a" href={link.url} aria-label={`${title} ${link.link_text}`}>
        {link.link_text}
      </Button>
    </When>
  </div>
)

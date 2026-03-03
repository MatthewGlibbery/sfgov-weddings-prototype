import type { TypeCallToActionValues } from '@/types'
import { BodyText, HeadingLg } from '@/design-system'
import { ButtonLink } from './ButtonLink'

/* FYI: In current sf.gov there are CTA variants that aren't accounted for
 * here nor in the Wagtail block type. Should we need them for the
 * redesigned CTA, adding them should be a simple additional prop (I think)
 */

export const CallToAction = ({
  title,
  description,
  button_link: buttonLink
}: TypeCallToActionValues) => {
  const ariaLabel =
    buttonLink.screenreader_label || `${title} ${buttonLink.button.link_text}`
  buttonLink.screenreader_label = ariaLabel

  return (
    <div className="flex flex-col gap-y-8">
      {title ? (
        <HeadingLg as="h3" className="!mb-4">
          {title}
        </HeadingLg>
      ) : null}
      {description ? (
        <BodyText data-testid="cta-description">{description}</BodyText>
      ) : null}
      <ButtonLink link={buttonLink} />
    </div>
  )
}

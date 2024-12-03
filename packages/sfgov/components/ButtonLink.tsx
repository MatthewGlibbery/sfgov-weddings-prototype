import { Button, ButtonProps } from '@/design-system'
import { getPageURL } from '@/lib/utils'
import { TypeButtonLinkValues } from '@/types'

export type ButtonLinkProps = ButtonProps & {
  link: TypeButtonLinkValues
}

export const ButtonLink = ({
  link: { button, screenreader_label: label },
  ...rest
}: ButtonLinkProps) => {
  const ariaLabel = label || button.link_text
  const url = button.link_to === 'page' ? getPageURL(button.page) : button.url
  return url ? (
    <Button as="a" href={url} aria-label={ariaLabel} {...rest}>
      {button.link_text}
    </Button>
  ) : null
}

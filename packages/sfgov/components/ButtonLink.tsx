import { Button, ButtonProps, IconArrowRight } from '@/design-system'
import { getPageURL } from '@/lib/utils'
import { TypeButtonLinkValues } from '@/types'

export type ButtonLinkProps = ButtonProps & {
  link: TypeButtonLinkValues
  iconOnly?: boolean
}

export const ButtonLink = ({
  link: { button, screenreader_label: label },
  iconOnly = false,
  children,
  ...rest
}: ButtonLinkProps) => {
  const ariaLabel = label || button.link_text
  const url = button.link_to === 'page' ? getPageURL(button.page) : button.url
  return url ? (
    iconOnly ? (
      <Button as="a" href={url} aria-label={ariaLabel} {...rest}>
        <IconArrowRight width={20} />
      </Button>
    ) : (
      <Button as="a" href={url} aria-label={ariaLabel} {...rest}>
        {button.link_text}
        {children}
      </Button>
    )
  ) : null
}

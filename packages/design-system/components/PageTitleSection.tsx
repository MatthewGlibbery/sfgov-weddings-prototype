import type { AnyComponent, ComponentProps } from '../types'
import { PageLabel } from './PageLabel'
import { DisplayXXXl } from './Text'

type PageTitleSectionProps = AnyComponent & {
  label: string
  title: string
  isHidden?: boolean
}

export const PageTitleSection = ({
  label,
  title,
  isHidden = false,
  children
}: ComponentProps<PageTitleSectionProps>) => (
  <>
    {label ? (
      <PageLabel label={label.replace(/_/g, ' ')} isHidden={isHidden} />
    ) : null}

    {title ? (
      <>
        <DisplayXXXl as="h1" className="mb-12 md:mb-20">
          {title}
        </DisplayXXXl>
        {children}
      </>
    ) : null}
  </>
)

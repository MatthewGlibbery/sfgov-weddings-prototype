import { When } from 'react-if'
import type { AnyComponent, ComponentProps } from '../types'
import { PageLabel } from './PageLabel'
import { DisplayXXXl } from './Text'

type PageTitleSectionProps = AnyComponent & {
  label: string
  title: string
}

export const PageTitleSection = ({
  label,
  title,
  children
}: ComponentProps<PageTitleSectionProps>) => (
  <>
    <PageLabel label={label.replace(/_/g, ' ')} />
    <When condition={!!title}>
      <DisplayXXXl as="h1" className="my-12 md:my-20">
        {title}
      </DisplayXXXl>
      {children}
    </When>
  </>
)

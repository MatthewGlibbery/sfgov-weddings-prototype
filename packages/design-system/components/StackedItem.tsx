import { HeadingSm } from './Text'
import { classed } from './utils'
import type { ComponentProps, ComponentType } from '../types'

const StyledItem = classed(
  'div',
  'w-full pb-12 md:pl-12 md:pb-0 border-b-1 border-b-[#D6D3D3] md:border-b-0 md:border-b-current md:border-l-1 md:border-l-[#D6D3D3]'
)

export type StackedItemProps = ComponentProps<typeof StyledItem> & {
  icon?: ComponentType<{ width?: string | number }> | null
  title?: string
}

export const StackedItem = ({
  icon: Icon = null,
  title = '',
  children,
  ...rest
}: StackedItemProps) => {
  // TODO: handle icons as paths instead of assuming an Icon element
  return (
    <StyledItem data-testid="stacked-content-item" {...rest}>
      {Icon ? (
        <Icon
          // @ts-expect-error erg
          className="mb-12"
          width={24}
          data-testid="stacked-content-item-icon"
        />
      ) : null}
      {title ? (
        <HeadingSm className="flex items-center mb-20">{title}</HeadingSm>
      ) : null}
      {children}
    </StyledItem>
  )
}

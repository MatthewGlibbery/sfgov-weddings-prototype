import { HeadingSm } from './Text'
import { classed } from './utils'
import type { ComponentProps, ComponentType } from '../types'

const StyledItem = classed('div', 'w-full pl-12 border-l-1 border-l-[#D6D3D3]')

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
      <HeadingSm className="flex items-center mb-20">
        {Icon ? (
          <div className="flex pr-8" data-testid="stacked-content-item-icon">
            <Icon width={24} />
          </div>
        ) : null}
        {title}
      </HeadingSm>
      {children}
    </StyledItem>
  )
}

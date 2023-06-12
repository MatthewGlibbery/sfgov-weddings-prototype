import { TitleSm } from './Text'
import { classed } from './utils'
import type { ComponentProps, ComponentType } from '../types'

const StyledItem = classed(
  'div',
  'w-full border-1 border-solid border-[#D6D3D3]'
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
      <TitleSm className="flex">
        {Icon ? (
          <div className="flex mr-10" data-testid="stacked-content-item-icon">
            <Icon width={28} />
          </div>
        ) : null}
        {title}
      </TitleSm>
      {children}
    </StyledItem>
  )
}

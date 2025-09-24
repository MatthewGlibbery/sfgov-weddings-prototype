import { classed } from '@/design-system'

type FloatingPanelProps = {
  text?: string
  onFloatingPanelClick?: () => void
  isOpen?: boolean
  className?: string
}

const FloatingPanelButton = classed(
  'button',
  'fixed bottom-0 right-20 md:right-28 lg:right-[86px] z-50 py-12 px-16 bg-primary200 text-primary800 font-bold rounded-t-4 shadow-[0_-1px_4px_rgba(0,0,0,0.12)] hover:bg-primary300 focus:bg-primary300'
)

export const FloatingPanel = ({
  text,
  onFloatingPanelClick,
  isOpen = true,
  ...rest
}: FloatingPanelProps) => {
  return isOpen ? (
    <FloatingPanelButton onClick={onFloatingPanelClick} {...rest}>
      {text}
    </FloatingPanelButton>
  ) : null
}

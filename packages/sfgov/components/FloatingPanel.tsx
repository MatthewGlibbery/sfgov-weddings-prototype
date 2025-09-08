type FloatingPanelProps = {
  text?: string
  onFloatingPanelClick?: () => void
  isOpen?: boolean
}

export const FloatingPanel = ({
  text,
  onFloatingPanelClick,
  isOpen = true,
  ...rest
}: FloatingPanelProps) => {
  return isOpen ? (
    <button
      type="button"
      className="fixed bottom-0 right-20 md:right-28 lg:right-[86px] z-50 py-12 px-16 bg-primary200 text-primary800 font-bold rounded-t-4 shadow-[0_-1px_4px_rgba(0,0,0,0.12)]"
      onClick={onFloatingPanelClick}
      {...rest}
    >
      {text}
    </button>
  ) : null
}

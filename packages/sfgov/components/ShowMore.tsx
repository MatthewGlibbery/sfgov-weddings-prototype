import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { IconChevronDown, IconChevronUp } from '@/design-system'

type ShowMoreProps = {
  maxHeight?: number | null
  children?: ReactNode
}

export const ShowMore = ({ maxHeight, children }: ShowMoreProps) => {
  const [showMoreValues, setShowMoreValues] = useState({
    height: 0,
    linkText: 'Show more',
    containerClass: maxHeight ? 'block' : 'hidden',
    overlayClass: 'block',
    overflowClass: 'overflow-hidden',
    styleHeight: maxHeight ? `${maxHeight}px` : '100%',
    open: false
  })
  const elementRef = useRef(null)

  useEffect(() => {
    setShowMoreValues({
      ...showMoreValues,
      height: elementRef.current?.clientHeight
    })
  }, [])

  const icon = showMoreValues.open ? (
    <IconChevronUp width={20} />
  ) : (
    <IconChevronDown width={20} />
  )

  return (
    <div className="flex flex-col gap-20">
      <div
        data-testid="show-more"
        ref={elementRef}
        data-height={showMoreValues.height}
        className={showMoreValues.overflowClass}
        // no dynamic class names for tailwind
        // so we'll need to use a style attribute for variable height
        style={{
          height:
            showMoreValues.height <= maxHeight
              ? 'auto'
              : showMoreValues.styleHeight
        }}
      >
        {children}
      </div>
      <div
        className={`border-b-1 border-b-neutral300 pb-20 relative ${showMoreValues.containerClass}`}
      >
        <div
          className={`absolute -top-[70px] w-full h-60 bg-gradient-to-t from-white ${showMoreValues.overlayClass}`}
        ></div>
        <a
          className="flex gap-4 text-primary500 w-full items-center justify-center no-underline"
          href="#"
          onClick={(e) => {
            e.preventDefault()
            showToggle(!showMoreValues.open)
          }}
        >
          <span>{showMoreValues.linkText}</span>
          {icon}
        </a>
      </div>
    </div>
  )

  function showToggle(open: boolean) {
    setShowMoreValues({
      ...showMoreValues,
      open,
      linkText: open ? 'Show less' : 'Show more',
      overlayClass: open ? 'hidden' : 'block',
      styleHeight: open ? '100%' : `${maxHeight}px`,
      overflowClass: open ? 'overflow-auto' : 'overflow-hidden'
    })
  }
}

import { HeadingLg, IconX } from '@/design-system'
import React, { useRef } from 'react'
import ReactModal from 'react-modal'

// Modal wraps react-modal to provide consistent layout, focus handling,
// and accessibility features across the app.

type ModalProps = {
  title?: string
  isOpen?: boolean
  onClose?: () => void
  onAfterOpen?: () => void
  children?: React.ReactNode
}

export const Modal = ({
  title,
  isOpen = false,
  onClose,
  onAfterOpen,
  children
}: ModalProps) => {
  // setAppElement required for ReactModal to hide content for screen readers
  try {
    ReactModal.setAppElement('#__next')
  } catch (e) {
    /* istanbul ignore next */
    ReactModal.setAppElement(document.body)
  }

  // grab some refs to set initial focus
  const headingRef = useRef<HTMLHeadingElement>(null)
  const childrenContainerRef = useRef<HTMLDivElement>(null)

  function handleAfterOpen() {
    if (title && headingRef.current) {
      headingRef.current.focus()
    } else if (children && childrenContainerRef.current) {
      childrenContainerRef.current.focus()
    }
    if (onAfterOpen) onAfterOpen()
  }

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      onAfterOpen={handleAfterOpen}
      htmlOpenClassName="overflow-hidden"
      shouldFocusAfterRender={false} // we'll control the initial focus
      overlayClassName="grid grid-cols-12 w-full fixed inset-0 bg-[#000]/60 z-50 flex items-center justify-center px-20 md:px-0"
      className="p-20 col-span-full md:p-28 md:col-span-6 md:col-start-4 lg:p-32 bg-white rounded-4 shadow-md"
      aria={{
        labelledby: 'modalTitle'
      }}
    >
      <div className="flex flex-col gap-y-[32px] relative">
        {/* TODO: we might want to consider using forwardRef
        on the Heading components if we find ourselves needing
        to set focus on headings in different contexts */}
        {title ? (
          <h1 id="modalTitle" ref={headingRef} tabIndex={-1}>
            <HeadingLg className="!m-0 pr-28">{title}</HeadingLg>
          </h1>
        ) : null}
        <div
          tabIndex={-1}
          ref={childrenContainerRef}
          data-testid="children-container"
        >
          {children}
        </div>
        <button
          aria-label="Close modal"
          className="absolute top-0 right-0"
          onClick={onClose}
        >
          <IconX width="24" height="24" className="text-black" />
        </button>
      </div>
    </ReactModal>
  )
}

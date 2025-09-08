import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { useState } from 'react'
import { Modal } from './Modal'

describe('Modal', () => {
  // react-modal needs to know the stuff it should hide
  beforeAll(() => {
    const nextRoot = document.createElement('div')
    nextRoot.setAttribute('id', '__next')
    document.body.appendChild(nextRoot)
  })

  it('renders a modal and its children', () => {
    const modalContent = 'modal content'
    render(
      <Modal title="A modal title" isOpen>
        <div>{modalContent}</div>
      </Modal>
    )
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText(modalContent)).toBeInTheDocument()
  })

  it('renders a modal with a title and sets focus to it', async () => {
    const modalTitleText = 'A modal title'
    render(
      <Modal title={modalTitleText} isOpen>
        <div>modal content</div>
      </Modal>
    )
    const heading = screen.getByRole('heading', { name: modalTitleText })
    expect(heading).toBeInTheDocument()
    await waitFor(() => {
      expect(heading).toHaveFocus()
    })
  })

  it('renders a modal with no title and sets focus to the children container', async () => {
    render(
      <Modal isOpen>
        <div>modal content</div>
      </Modal>
    )
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
    await waitFor(() => {
      expect(screen.getByTestId('children-container')).toHaveFocus()
    })
  })

  it('does not render the modal by default', () => {
    render(
      <Modal>
        <div>modal content</div>
      </Modal>
    )
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders based on parent controlled state', async () => {
    const ModalParent = () => {
      const [modalOpen, setModalOpen] = useState(false)
      return (
        <>
          <button
            onClick={() => {
              setModalOpen(true)
            }}
          >
            open modal
          </button>
          <Modal
            title="A modal title"
            onClose={() => {
              setModalOpen(false)
            }}
            isOpen={modalOpen}
          >
            <div>modal content</div>
          </Modal>
        </>
      )
    }
    render(<ModalParent />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument() // not triggered for open yet
    const openButton = screen.getByRole('button', { name: 'open modal' })
    await fireEvent.click(openButton)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    const modalCloseButton = screen.getByRole('button', { name: 'Close modal' })
    await fireEvent.click(modalCloseButton)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})

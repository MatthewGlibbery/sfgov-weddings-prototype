import { FormPageFactory } from '@/lib/factories'
import { render, screen } from '@testing-library/react'
import { FormPage } from './FormPage'
import { MockDynamicComponent } from '@/__mocks__/next/dynamic'
import { useSearchParams } from '@/__mocks__/next/navigation'

describe('FormPage', () => {
  // FIXME: we should be looking for the translations here,
  // not their uppercase variations
  const formLabel = 'FORM'
  const submittedLabel = 'FORM SUBMITTED'
  const mockFormContent = 'Mock form content'
  MockDynamicComponent.mockImplementation(() => <div>{mockFormContent}</div>)

  afterEach(() => {
    MockDynamicComponent.mockReset()
  })

  describe('form content', () => {
    it('renders a form.io form', async () => {
      const page = FormPageFactory.make()

      render(<FormPage page={page} />)

      const title = screen.getByRole('heading', { level: 1 })
      expect(title).toBeInTheDocument()
      expect(title).toHaveTextContent(page.title)
      expect(screen.getByText(mockFormContent)).toBeInTheDocument()
      expect(screen.getByText(formLabel)).toBeInTheDocument()
      expect(screen.queryByText(submittedLabel)).not.toBeInTheDocument()
    })
  })

  describe('confirmation content', () => {
    it('renders the form page confirmation', async () => {
      const page = FormPageFactory.make({
        confirmation_title: 'Woohoo!'
      })

      render(<FormPage page={page} submitted />)

      expect(await screen.findByText('Contact us')).toBeInTheDocument()
      expect(screen.queryByText(mockFormContent)).not.toBeInTheDocument()
      expect(screen.getByText(page.confirmation_title)).toBeInTheDocument()
      expect(screen.getByText(submittedLabel)).toBeInTheDocument()
      expect(screen.queryByText(formLabel)).not.toBeInTheDocument()
    })
  })

  describe('Submitted query string param', () => {
    it('renders the form page confirmation when submitted=true', async () => {
      const page = FormPageFactory.make({
        confirmation_title: 'Woohoo!'
      })

      useSearchParams.mockImplementationOnce(
        () =>
          new URLSearchParams({
            submitted: 'true'
          })
      )

      render(<FormPage page={page} />)

      expect(screen.getByText(page.confirmation_title)).toBeInTheDocument()
      expect(MockDynamicComponent).not.toHaveBeenCalled()
    })
  })
})

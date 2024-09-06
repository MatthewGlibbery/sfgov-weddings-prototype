import { FormPageFactory } from '@/lib/factories'
import { render, screen } from '@testing-library/react'
import { FormPage } from './FormPage'
import { MockDynamicComponent } from '@/__mocks__/next/dynamic'

describe('FormPage', () => {
  describe('form content', () => {
    it('renders a form.io form', async () => {
      const page = FormPageFactory.make()

      MockDynamicComponent.mockImplementationOnce(() => <div>Form content</div>)

      render(<FormPage page={page} />)

      const title = screen.getByRole('heading', {
        level: 1
      })
      expect(title).toBeInTheDocument()
      expect(title).toHaveTextContent(page.title)
      expect(await screen.findByText('Form content')).toBeInTheDocument()
    })
  })

  describe('confirmation content', () => {
    it('renders the form page confirmation', async () => {
      const page = FormPageFactory.make()

      // @ts-expect-error bad props
      MockDynamicComponent.mockImplementationOnce((props) => {
        props.onSubmitDone?.()
        return <div>Hidden form content</div>
      })

      render(<FormPage page={page} />)

      expect(await screen.findByText('Contact us')).toBeInTheDocument()
    })
  })
})

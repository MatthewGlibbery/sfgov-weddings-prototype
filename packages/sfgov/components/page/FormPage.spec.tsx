import { FormProps } from '@/design-system/formio'
import { FormFactory } from '@/design-system/formio/factories'
import { FormPageFactory } from '@/lib/factories'
import { MockDynamicComponent as FormioForm } from '@/__mocks__/next/dynamic'
import { render, screen } from '@testing-library/react'
import { useSearchParams } from '@/__mocks__/next/navigation'
import { FormPage } from './FormPage'

describe('FormPage', () => {
  // FIXME: we should be looking for the translations here,
  // not their uppercase variations
  const formLabel = /^FORM$/i
  const submittedLabel = /^FORM SUBMITTED$/i
  const submittedContent = 'Contact us'

  beforeEach(() => {
    FormioForm.mockReset()
  })

  describe('form content', () => {
    it('renders the dynamic FormioForm component', async () => {
      const page = FormPageFactory.make()
      FormioForm.mockReturnValueOnce(<div data-testid="dynamic-form" />)
      render(<FormPage page={page} />)
      const title = screen.getByRole('heading', {
        level: 1
      })
      expect(title).toBeInTheDocument()
      expect(title).toHaveTextContent(page.title)
      expect(screen.getByText(formLabel)).toBeInTheDocument()
      expect(screen.queryByText(submittedLabel)).not.toBeInTheDocument()

      expect(FormioForm).toHaveBeenCalledTimes(1)
      expect(screen.getByTestId('dynamic-form')).toBeInTheDocument()
    })
  })

  describe('confirmation content', () => {
    it('renders the form page confirmation when the form is submitted', async () => {
      const page = FormPageFactory.make()
      const expectedMissingText = 'MISSING'
      // mock the FormioForm component to simulate submission of the form by
      // calling the onSubmitDone() callback asynchronously
      FormioForm.mockImplementationOnce((props: FormProps) => {
        setTimeout(() => {
          props.onSubmitDone?.call(undefined, { data: {} })
        }, 10)
        return <div>{expectedMissingText}</div>
      })

      render(<FormPage page={page} />)

      expect(await screen.findByText(submittedContent)).toBeInTheDocument()
      expect(screen.queryByText(expectedMissingText)).not.toBeInTheDocument()
    })
  })

  describe('Submitted query string param', () => {
    it('renders the form page confirmation with submitted=true in the query string', async () => {
      const page = FormPageFactory.make({
        confirmation_title: 'Woohoo!'
      })

      useSearchParams.mockReturnValueOnce(
        new URLSearchParams({
          submitted: 'true'
        })
      )

      render(<FormPage page={page} />)
      expect(await screen.findByText(submittedContent)).toBeInTheDocument()
    })

    it('renders the form page confirmation with submitted={true}', async () => {
      const page = FormPageFactory.make()
      render(<FormPage page={page} submitted />)
      expect(await screen.findByText(submittedContent)).toBeInTheDocument()
    })
  })

  describe('form schema', () => {
    it('renders <FormioForm> with schema URL if provided', () => {
      const schemaUrl = 'https://formio.sfgov.org/some/form'
      const page = FormPageFactory.make({
        schema_url: schemaUrl
      })
      render(<FormPage page={page} />)
      expect(FormioForm).toHaveBeenLastCalledWith(
        expect.objectContaining({
          src: schemaUrl,
          form: undefined
        }),
        {}
      )
    })

    it('renders <FormioForm> with the schema if provided', () => {
      const schema = FormFactory.make()
      const page = FormPageFactory.make({
        schema_url: 'https://form.io/dont/render/this',
        schema
      })
      render(<FormPage page={page} />)
      expect(FormioForm).toHaveBeenLastCalledWith(
        expect.objectContaining({
          src: undefined,
          form: schema
        }),
        {}
      )
    })
  })
})

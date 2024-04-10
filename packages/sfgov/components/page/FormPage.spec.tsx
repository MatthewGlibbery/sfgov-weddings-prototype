import '../../__mocks__/Formio'
import { FormPageFactory } from '@/lib/factories'
import { render, screen } from '@testing-library/react'
import { FormPage } from './FormPage'

describe('Form', () => {
  it('renders a form.io form', async () => {
    const page = FormPageFactory.make()
    await render(<FormPage page={page} />)

    const title = screen.getByRole('heading', {
      level: 1
    })
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent(page.title)
  })
})

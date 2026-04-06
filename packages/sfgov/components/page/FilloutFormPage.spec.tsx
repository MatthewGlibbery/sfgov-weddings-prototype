import { fireEvent, render, screen } from '@testing-library/react'
import { FilloutFormPageFactory } from '@/lib/factories'
import { MockDynamicComponent } from '@/__mocks__/next/dynamic'
import { useSearchParams } from '@/__mocks__/next/navigation'
import { FilloutFormPage } from './FilloutFormPage'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn()
    }
  }
}))

describe('FilloutFormPage', () => {
  const introLabel = /^INTRODUCTION$/i
  const submittedLabel = /^FORM SUBMITTED$/i
  const getStartedText = /^Get started$/i
  const formTitle = 'A tedious but good form'

  beforeEach(() => {
    MockDynamicComponent.mockReset()
    jest.useFakeTimers()
    ;(window as any).scrollTo = jest.fn()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  describe('intro page', () => {
    const page = FilloutFormPageFactory.make()

    it('renders the intro page by default', () => {
      useSearchParams.mockReturnValueOnce(new URLSearchParams(''))

      render(<FilloutFormPage page={page} />)

      expect(screen.getByText(introLabel)).toBeInTheDocument()
    })
    it('renders the intro page when the show parameter is not form or submitted', () => {
      useSearchParams.mockReturnValueOnce(new URLSearchParams('show=invalid'))

      render(<FilloutFormPage page={page} />)

      expect(screen.getByText(introLabel)).toBeInTheDocument()
    })

    it('renders the form page when Get started button is clicked', async () => {
      const page = FilloutFormPageFactory.make({ title: formTitle })
      render(<FilloutFormPage page={page} />)

      const getStartedButton = screen.getByText(getStartedText)
      fireEvent.click(getStartedButton)
      expect(
        await screen.findByText(formTitle.toUpperCase())
      ).toBeInTheDocument()
    })

    it('returns null if intro text is empty', () => {
      const page = FilloutFormPageFactory.make({ intro_text: [] })
      useSearchParams.mockReturnValueOnce(new URLSearchParams(''))

      render(<FilloutFormPage page={page} />)

      expect(screen.queryByText(introLabel)).not.toBeInTheDocument()
    })
  })

  describe('form page', () => {
    it('renders the Fillout form page with show=form in the query string', async () => {
      const page = FilloutFormPageFactory.make({ title: formTitle })

      useSearchParams.mockReturnValueOnce(
        new URLSearchParams({
          show: 'form'
        })
      )

      MockDynamicComponent.mockReturnValueOnce(
        <div data-testid="dynamic-form" />
      )

      render(<FilloutFormPage page={page} />)

      expect(screen.queryByText(introLabel)).not.toBeInTheDocument()
      expect(screen.queryByText(submittedLabel)).not.toBeInTheDocument()

      expect(MockDynamicComponent).toHaveBeenCalledTimes(1)
      expect(screen.getByTestId('dynamic-form')).toBeInTheDocument()
    })
    it('renders the confirmation page after the form is submitted', async () => {
      const page = FilloutFormPageFactory.make({ title: formTitle })

      useSearchParams.mockReturnValueOnce(
        new URLSearchParams({
          show: 'form'
        })
      )

      MockDynamicComponent.mockImplementation((props: any) => {
        return (
          <div data-testid="fillout-embed">
            <button onClick={() => props.onSubmit?.()}>Submit</button>
          </div>
        )
      })

      render(<FilloutFormPage page={page} />)

      expect(MockDynamicComponent).toHaveBeenCalledTimes(1)
      fireEvent.click(screen.getByText('Submit'))
      expect(await screen.findByText(submittedLabel)).toBeInTheDocument()
    })
  })
  describe('confirmation page', () => {
    it('renders the confirmation page with show=submitted in the query string', async () => {
      const page = FilloutFormPageFactory.make()

      useSearchParams.mockReturnValueOnce(
        new URLSearchParams({
          show: 'submitted'
        })
      )

      render(<FilloutFormPage page={page} />)
      expect(await screen.findByText(submittedLabel)).toBeInTheDocument()
      expect(screen.queryByText(introLabel)).not.toBeInTheDocument()
    })

    it('renders the embedded Fillout form survey', async () => {
      const page = FilloutFormPageFactory.make()

      useSearchParams.mockReturnValueOnce(
        new URLSearchParams({
          show: 'submitted'
        })
      )

      MockDynamicComponent.mockImplementation((props: any) => {
        return <div>Form Survey</div>
      })

      render(<FilloutFormPage page={page} />)
      expect(await screen.findByText('Form Survey')).toBeInTheDocument()
    })
    it('renders form survey and scrolls to the confirmation on submit', async () => {
      const page = FilloutFormPageFactory.make()

      const scrollIntoViewMock = jest.fn()
      Element.prototype.scrollIntoView = scrollIntoViewMock

      useSearchParams.mockReturnValueOnce(
        new URLSearchParams({
          show: 'submitted'
        })
      )

      MockDynamicComponent.mockImplementation((props: any) => {
        return (
          <div>
            Form Survey
            <button onClick={() => props.onSubmit?.()}>Submit</button>
          </div>
        )
      })

      render(<FilloutFormPage page={page} />)
      expect(await screen.findByText('Form Survey')).toBeInTheDocument()

      fireEvent.click(screen.getByText('Submit'))
      expect(
        await screen.findByText('Your feedback has been received.')
      ).toBeInTheDocument()
      jest.advanceTimersByTime(100)
      expect(scrollIntoViewMock).toHaveBeenCalled()
    })
  })
})

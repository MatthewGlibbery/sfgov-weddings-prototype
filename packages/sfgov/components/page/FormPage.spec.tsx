import FormioForm from '@/design-system/components/FormioForm'
import type { FormProps } from '@/design-system/formio'
import { FormFactory } from '@/design-system/formio/factories'
import { FormPageFactory } from '@/lib/factories'
import { MockDynamicComponent } from '@/__mocks__/next/dynamic'
import { useSearchParams } from '@/__mocks__/next/navigation'
import { render, screen } from '@testing-library/react'
import { useRouter } from 'next/router'
import { FormPage } from './FormPage'

type EventHandler = (...args: unknown[]) => void

const eventHandlers = new Map<string, Set<EventHandler>>()

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn((event: string, handler: EventHandler) => {
          if (!eventHandlers.has(event)) {
            eventHandlers.set(event, new Set())
          }
          eventHandlers.get(event)?.add(handler)
        }),
        off: jest.fn((event: string, handler: EventHandler) => {
          if (eventHandlers.has(event)) {
            const handlers = eventHandlers.get(event)
            handlers?.delete(handler)
          }
        }),
        emit: jest.fn((event: string, ...args: unknown[]) => {
          if (eventHandlers.has(event)) {
            eventHandlers.get(event)?.forEach((handler) => handler(...args))
          }
        })
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null)
    }
  }
}))

describe('FormPage', () => {
  // FIXME: we should be looking for the translations here,
  // not their uppercase variations
  const submittedLabel = /^FORM SUBMITTED$/i

  beforeEach(() => {
    MockDynamicComponent.mockReset()
  })

  describe('form content', () => {
    it('renders the dynamic FormioForm component', async () => {
      const page = FormPageFactory.make()
      MockDynamicComponent.mockReturnValueOnce(
        <div data-testid="dynamic-form" />
      )
      render(<FormPage page={page} />)
      expect(screen.queryByText(submittedLabel)).not.toBeInTheDocument()

      expect(MockDynamicComponent).toHaveBeenCalledTimes(1)
      expect(screen.getByTestId('dynamic-form')).toBeInTheDocument()
    })
  })

  /**
   * These tests use the actual <FormioForm> component, which can take some time
   * to render. Only run tests in here if you need to simulate rendering and
   * interaction with a real form.
   */
  describe('render FormioForm', () => {
    beforeEach(() => {
      MockDynamicComponent.mockImplementation(FormioForm)
    })

    it('renders an actual FormioForm', async () => {
      const page = FormPageFactory.make({
        schema: {
          type: 'form',
          display: 'wizard',
          components: [
            {
              type: 'panel',
              components: [
                {
                  type: 'textfield',
                  label: 'Your name',
                  key: 'name'
                }
              ]
            }
          ]
        }
      })
      render(<FormPage page={page} />)

      const input = await screen.findByLabelText('Your name')
      expect(input).toBeInTheDocument()
    })
  })

  describe('confirmation content', () => {
    it.skip('renders the form page confirmation when the form is submitted', async () => {
      const schemaUrl = 'https://formio.sfgov.org/some/form'
      const page = FormPageFactory.make({
        schema_url: schemaUrl
      })
      const expectedMissingText = 'MISSING'
      // mock the FormioForm component to simulate submission of the form by
      // calling the onSubmitDone() callback asynchronously
      MockDynamicComponent.mockImplementation((props: FormProps) => {
        setTimeout(() => {
          props.onSubmitDone?.call(undefined, { state: 'submitted', data: {} })
        }, 10)
        return <div>{expectedMissingText}</div>
      })

      render(<FormPage page={page} />)

      expect(await screen.findByText(submittedLabel)).toBeInTheDocument()
      expect(screen.queryByText(expectedMissingText)).not.toBeInTheDocument()
    })

    it('does not render the form page confirmation or default alert when the form is submitted as a draft', async () => {
      const page = FormPageFactory.make()
      const expectedMissingText = 'Submission Confirmed'
      const expectedExistingText = 'EXISTING'
      MockDynamicComponent.mockImplementation((props: FormProps) => {
        setTimeout(() => {
          props.onSubmitDone?.call(undefined, { state: 'draft', data: {} })
        }, 10)
        return <div>{expectedExistingText}</div>
      })

      render(<FormPage page={page} />)

      expect(await screen.findByText(expectedExistingText)).toBeInTheDocument()
      expect(screen.queryByText(expectedMissingText)).not.toBeInTheDocument()
      expect(screen.queryByText(submittedLabel)).not.toBeInTheDocument()
    })
  })

  describe('Submitted query string param', () => {
    it('renders the form page confirmation with submitted=true in the query string', async () => {
      const schemaUrl = 'https://formio.sfgov.org/some/form'
      const page = FormPageFactory.make({
        confirmation_title: 'Woohoo!',
        schema_url: schemaUrl
      })

      useSearchParams.mockReturnValueOnce(
        new URLSearchParams({
          submitted: 'true'
        })
      )

      render(<FormPage page={page} />)
      expect(await screen.findByText(submittedLabel)).toBeInTheDocument()
    })

    it('renders the form page confirmation with submitted={true}', async () => {
      const schemaUrl = 'https://formio.sfgov.org/some/form'
      const page = FormPageFactory.make({
        schema_url: schemaUrl
      })
      render(<FormPage page={page} submitted />)
      expect(await screen.findByText(submittedLabel)).toBeInTheDocument()
    })
  })

  describe('form survey', () => {
    it('renders FormSurvey when submitted=true is in the query string', async () => {
      const page = FormPageFactory.make({
        schema_url: 'https://formio.sfgov.org/some/form'
      })

      useSearchParams.mockReturnValueOnce(
        new URLSearchParams({ submitted: 'true' })
      )

      jest.mocked(MockDynamicComponent).mockImplementation(() => {
        return <div>Form Survey</div>
      })

      render(<FormPage page={page} />)

      expect(await screen.findByText('Form Survey')).toBeInTheDocument()
    })

    it('renders FormSurvey confirmation after form is submitted', async () => {
      const page = FormPageFactory.make({
        schema_url: 'https://formio.sfgov.org/some/form'
      })

      MockDynamicComponent.mockImplementation((props: FormProps) => {
        setTimeout(() => {
          props.onSubmitDone?.call(undefined, { data: {}, state: 'submitted' })
        }, 10)
        return <div>Form Survey</div>
      })

      render(<FormPage page={page} submitted />)

      expect(
        await screen.findByText('Your feedback has been received.')
      ).toBeInTheDocument()
    })
  })

  describe('form schema', () => {
    it('renders <FormioForm> with schema URL if provided', () => {
      const schemaUrl = 'https://formio.sfgov.org/some/form'
      const page = FormPageFactory.make({
        schema_url: schemaUrl
      })
      render(<FormPage page={page} />)
      expect(MockDynamicComponent).toHaveBeenLastCalledWith(
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
      expect(MockDynamicComponent).toHaveBeenLastCalledWith(
        expect.objectContaining({
          src: undefined,
          form: schema
        }),
        {}
      )
    })

    describe('query string parameters', () => {
      it('passes query string parameters as submission data', () => {
        useSearchParams.mockReturnValueOnce(
          new URLSearchParams({
            x: '1',
            foo: 'bar'
          })
        )
        const page = FormPageFactory.make()
        render(<FormPage page={page} />)
        expect(MockDynamicComponent).toHaveBeenLastCalledWith(
          expect.objectContaining({
            src: undefined,
            submission: {
              data: {
                x: '1',
                foo: 'bar'
              }
            }
          }),
          {}
        )
      })

      it('does not pass the submitted parameter as submission data', () => {
        useSearchParams.mockReturnValueOnce(
          new URLSearchParams({
            submitted: 'wut',
            x: '1',
            foo: 'bar'
          })
        )
        const page = FormPageFactory.make()
        render(<FormPage page={page} />)
        expect(MockDynamicComponent).toHaveBeenLastCalledWith(
          expect.objectContaining({
            src: undefined,
            submission: {
              data: {
                x: '1',
                foo: 'bar'
              }
            }
          }),
          {}
        )
      })

      it('can handle no search params', () => {
        useSearchParams.mockReturnValueOnce(null)
        const page = FormPageFactory.make()
        render(<FormPage page={page} />)
        expect(MockDynamicComponent).toHaveBeenLastCalledWith(
          expect.objectContaining({
            src: undefined,
            submission: {
              data: {}
            }
          }),
          {}
        )
      })
    })
  })

  describe('warn before leaving', () => {
    const router = useRouter()
    const page = FormPageFactory.make()

    const originalConfirm = window.confirm
    let preventDefault: jest.Mock
    let event: Event

    beforeEach(() => {
      window.confirm = jest.fn().mockReturnValue(true)
      preventDefault = jest.fn()
      event = new Event('beforeunload', { cancelable: true })
      Object.defineProperty(event, 'preventDefault', {
        value: preventDefault
      })
    })

    afterEach(() => {
      window.confirm = originalConfirm
    })

    it('shows window confirmation when warnBeforeLeaving is true', async () => {
      render(<FormPage page={page} warnBeforeLeaving={true} />)

      router.events.emit('beforeHistoryChange')
      expect(window.confirm).toBeCalled()

      window.dispatchEvent(event)
      expect(preventDefault).toHaveBeenCalled()
    })

    it('does not show window confirmation when warnBeforeLeaving is false', async () => {
      render(<FormPage page={page} warnBeforeLeaving={false} />)

      router.events.emit('beforeHistoryChange')
      expect(window.confirm).not.toBeCalled()

      window.dispatchEvent(event)
      expect(preventDefault).not.toHaveBeenCalled()
    })

    it('throws error if user cancels navigation', async () => {
      window.confirm = jest.fn().mockReturnValue(false)
      render(<FormPage page={page} warnBeforeLeaving={true} />)

      expect(() => router.events.emit('beforeHistoryChange')).toThrow(
        "Abort route change by user's confirmation."
      )
    })
  })
})

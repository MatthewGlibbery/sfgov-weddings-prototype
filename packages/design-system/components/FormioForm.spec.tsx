/* eslint-disable testing-library/no-node-access */
import { Components, Formio } from '@formio/react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import mockConsole from 'jest-mock-console'
import type { Form, InputComponentSchema } from '../formio'
import {
  ColumnsFactory,
  ComponentFactory,
  FormFactory,
  PageFactory,
  WizardFactory
} from '../formio/factories'
import basicForm from '../__fixtures__/forms/basic.json'
import FormioForm from './FormioForm'

let restoreConsole: ReturnType<typeof mockConsole>

/**
 * Mock the console calls so that we can avoid spewing template debugging
 * info into the test runner output.
 */
beforeAll(() => {
  window.scrollTo = jest.fn()
  Formio.getUser = jest.fn(() => undefined)

  Components.components.file.prototype.init = function () {
    // @ts-expect-error not typed
    this.support = {
      filereader: false,
      formdata: false,
      hasWarning: false,
      progress: true
    }
  }
  // global.XMLHttpRequest = window.XMLHttpRequest = XMLHttpRequest

  const noop = () => null
  restoreConsole = mockConsole({
    debug: noop,
    log: noop,
    info: noop
    // warn: noop
  })
})

afterEach(() => {
  // @ts-expect-error not typed
  const forms: Form[] = Object.values(Formio.forms)
  for (const form of forms) {
    form.destroy()
  }
})

afterAll(() => {
  restoreConsole()
})

describe('FormioForm', () => {
  it('renders a formio form', () => {
    const label = 'Your name'
    render(
      <FormioForm
        form={FormFactory.make({
          components: [
            ComponentFactory.make({
              key: 'name',
              label
            })
          ]
        })}
      />
    )

    const input = screen.getByLabelText(label)
    expect(input).toBeInTheDocument()
  })

  it('renders a wizard form', async () => {
    const field1 = basicForm.components[0].components[0]
    const field2 = basicForm.components[1].components[0]

    // @ts-expect-error derp
    render(<FormioForm form={basicForm} />)

    const input1 = screen.getByLabelText(field1.label)
    expect(input1).toBeInTheDocument()

    await click('Next')

    const input2 = screen.getByLabelText(field2.label)
    expect(input2).toBeInTheDocument()
  })

  describe('templates', () => {
    describe('component', () => {
      it('does not render a conditionally hidden field', async () => {
        const label = 'Hidden'
        render(
          <FormioForm
            form={FormFactory.make({
              components: [
                // @ts-expect-error derp
                ComponentFactory.make({
                  label,
                  conditional: {
                    show: true,
                    when: 'x',
                    eq: true
                  }
                })
              ]
            })}
          />
        )

        const input = screen.queryByText(label)
        expect(input).not.toBeInTheDocument()
      })
    })

    describe('label', () => {
      it('renders the label', async () => {
        const label = 'Field label'
        render(
          <FormioForm
            form={FormFactory.make({
              components: [
                ComponentFactory.make({
                  label,
                  validate: {
                    required: true
                  }
                })
              ]
            })}
          />
        )

        const input = screen.getByLabelText(label)
        expect(input).toBeInTheDocument()
      })
    })

    describe('alert', () => {
      it('renders the alert template when invalid', async () => {
        const label = 'Field label'
        const error = 'This is an error'
        render(
          <FormioForm
            form={WizardFactory.make({
              components: [
                PageFactory.make({
                  title: 'Page 1',
                  components: [
                    ComponentFactory.make({
                      label,
                      validate: {
                        required: true,
                        customMessage: error
                      }
                    })
                  ]
                }),
                PageFactory.make({
                  title: 'Page 2',
                  components: [
                    ComponentFactory.make({
                      label: `${label} two`,
                      validate: {
                        required: true,
                        customMessage: error
                      }
                    })
                  ]
                })
              ]
            })}
          />
        )

        await click('Next')

        const message = screen.getByText(`${label}: ${error}`, { exact: false })
        expect(message).toBeInTheDocument()

        const alert = screen.getByRole('alert')
        expect(alert).toBeInTheDocument()
        expect(alert).toContainElement(message)
      })
    })

    describe('input', () => {
      function renderForm(props: Partial<InputComponentSchema>) {
        render(
          <FormioForm
            form={FormFactory.make({
              components: [ComponentFactory.make(props)]
            })}
          />
        )
      }

      it('renders aria-live region for datetime components', () => {
        renderForm({ type: 'datetime' })
        const region = screen.getByTestId('datetime-live-region')
        expect(region).toBeInTheDocument()
        expect(region.getAttribute('aria-live')).toBe('assertive')
      })

      it('renders a description', () => {
        const label = 'Field label'
        const description = 'This is the description'
        renderForm({ label, description })
        const el = screen.getByText(description)
        expect(el).toBeInTheDocument()
        expect(el).toBeVisible()

        const input = screen.getByLabelText(label)
        expect(input.getAttribute('aria-labelledby')).toContain(el.id)
      })

      it('renders prefix', () => {
        const prefix = 'Before'
        renderForm({ prefix })
        const pre = screen.getByText(prefix)
        expect(pre).toBeInTheDocument()
        expect(pre).toHaveAttribute('ref', 'prefix')
      })

      it('renders suffix', () => {
        const suffix = 'After'
        renderForm({ suffix })
        const suff = screen.getByText(suffix)
        expect(suff).toBeInTheDocument()
        expect(suff).toHaveAttribute('ref', 'suffix')
      })

      it('renders character counter', () => {
        renderForm({ showCharCount: true })
        const charCount = screen.getByTestId('charcount')
        expect(charCount).toBeInTheDocument()
        expect(charCount.getAttribute('aria-live')).toBe('polite')
      })

      it('renders word counter', () => {
        renderForm({ showWordCount: true })
        const wordCount = screen.getByTestId('wordcount')
        expect(wordCount).toBeInTheDocument()
        expect(wordCount.getAttribute('aria-live')).toBe('polite')
      })
    })

    describe('columns', () => {
      it('renders our template', async () => {
        const labelA = 'A component'
        const labelB = 'B component'
        const labelC = 'C component'
        render(
          <FormioForm
            form={FormFactory.make({
              display: 'form',
              components: [
                ColumnsFactory.make({
                  columns: [
                    {
                      width: 6,
                      components: [ComponentFactory.make({ label: labelA })]
                    },
                    {
                      width: 3,
                      components: [ComponentFactory.make({ label: labelB })]
                    },
                    {
                      width: 4,
                      offset: 6,
                      components: [ComponentFactory.make({ label: labelC })]
                    }
                  ]
                })
              ]
            })}
          />
        )

        const a = screen.getByLabelText(labelA, { exact: false })
        expect(a).toBeInTheDocument()
        expect(a.closest('[ref*=column]')).toHaveStyle({ width: '50%' })

        const b = screen.getByLabelText(labelB, { exact: false })
        expect(b).toBeInTheDocument()
        expect(b.closest('[ref*=column]')).toHaveStyle({ width: '25%' })

        const c = screen.getByLabelText(labelC, { exact: false })
        expect(c).toBeInTheDocument()
        expect(c.closest('[ref*=column]')).toHaveStyle({
          width: '33.3333333%',
          'margin-left': '-50%'
        })
      })
    })
  })
})

function sleep(ms: number) {
  return act(() => new Promise((resolve) => setTimeout(resolve, ms)))
}

type InputElement = HTMLInputElement | HTMLButtonElement

async function click<T extends InputElement = HTMLButtonElement>(
  text = 'Submit'
) {
  const el: T = screen.getByText(text, { trim: true })
  expect(el).toBeInTheDocument()
  expect(el).toBeVisible()
  expect(el.disabled).toBe(false)
  fireEvent.click(el)
  await sleep(10)
  return el
}

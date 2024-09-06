import mockConsole from 'jest-mock-console'
import { render, screen } from '@testing-library/react'
import FormioForm from './FormioForm'

let restoreConsole: ReturnType<typeof mockConsole>

/**
 * Mock the console calls so that we can avoid spewing template debugging
 * info into the test runner output.
 */
beforeAll(() => {
  const noop = () => null
  restoreConsole = mockConsole({
    debug: noop,
    log: noop,
    info: noop,
    warn: noop
  })
})

afterAll(() => restoreConsole())

describe('FormioForm', () => {
  it('renders a formio form', () => {
    render(
      <FormioForm
        form={{
          type: 'form',
          display: 'form',
          components: [
            {
              key: 'name',
              type: 'textfield',
              label: 'Your name'
            }
          ]
        }}
      />
    )

    const input = screen.getByLabelText('Your name')
    expect(input).toBeInTheDocument()
  })
})

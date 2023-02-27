import { render, screen } from '@testing-library/react'
import { renderWithErrorBoundary } from './ErrorBoundary'
import mockConsole from 'jest-mock-console'

describe('ErrorBoundary', () => {
  const ChildWithError = () => {
    throw new Error()
  }

  it('should render an error boundary when a descendant throws an error', () => {
    const restoreConsole = mockConsole()
    render(renderWithErrorBoundary(ChildWithError, {}))

    const error = screen.getByText('Error')
    expect(error).toBeDefined()

    restoreConsole()
  })
})

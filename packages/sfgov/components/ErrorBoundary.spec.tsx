import { render, screen } from '@testing-library/react'
import { ErrorBoundary, ErrorFallbackReport } from './ErrorBoundary'
import mockConsole from 'jest-mock-console'

describe('ErrorBoundary', () => {
  const ChildWithError = () => {
    throw new Error('There was an error')
  }

  it('should render an error boundary when a descendant throws an error', () => {
    const restoreConsole = mockConsole()
    render(
      <ErrorBoundary FallbackComponent={ErrorFallbackReport}>
        <ChildWithError />
      </ErrorBoundary>
    )

    const error = screen.getByText('There was an error')
    expect(error).toBeInTheDocument()

    restoreConsole()
  })
})

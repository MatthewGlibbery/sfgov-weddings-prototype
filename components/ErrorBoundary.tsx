import { Component, ComponentType, ErrorInfo } from 'react'
import { Container, Monospace, TitleMd } from '@sfgov/design-system/dist/react'

export type ErrorBoundaryProps = {
  children: JSX.Element | JSX.Element[] | (() => JSX.Element | JSX.Element[])
}

export type ErrorState = {
  error?: any
}

class ErrorBoundary extends Component {
  state: ErrorState
  props: ErrorBoundaryProps

  constructor (props: ErrorBoundaryProps) {
    super(props)
    this.state = { }
  }

  static getDerivedStateFromError (error: any) {
    return { error }
  }

  componentDidCatch (error: any, errorInfo: ErrorInfo) {
    // You can use your own error logging service here
    console.error('componentDidCatch()', { error, errorInfo })
  }

  render () {
    const { error } = this.state
    // Check if the error is thrown
    if (error) {
      // You can render any custom fallback UI
      return (
        <Container>
          <TitleMd as='h1'>Error</TitleMd>
          <Monospace as='pre'>
            {JSON.stringify(error, null, 2)}
          </Monospace>
        </Container>
      )
    }
    const { children } = this.props
    return (typeof children === 'function') ? children() : children
  }
}

export default ErrorBoundary

export function renderWithErrorBoundary<P extends {} = {}> (Component: ComponentType<P>, props: P) {
  return (
    <ErrorBoundary>
      {() => <Component {...props} />}
    </ErrorBoundary>
  )
}

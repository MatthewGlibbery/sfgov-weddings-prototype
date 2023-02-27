/* istanbul ignore file */

import { ComponentProps, ComponentType, ErrorInfo } from 'react'
import { Container, Monospace, TitleMd } from '@/design-system'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'

export function renderWithErrorBoundary (
  Component: ComponentType,
  componentProps: ComponentProps<typeof Component>
) {
  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback} onError={onError}>
        <Component {...componentProps} />
      </ErrorBoundary>
    </>
  )

  function onError (error: Error, info: ErrorInfo) {
    console.error('ERROR:', error, info)
  }

  function ErrorFallback (props: FallbackProps) {
    const { error } = props
    return (
      <Container>
        <TitleMd as='h1'>Error</TitleMd>
        <Monospace as='p'>{error.message}</Monospace>
        {error.stack
          ? <details>
              <summary>Stack trace</summary>
              <Monospace as='pre'>{error.stack}</Monospace>
            </details>
          : null}
      </Container>
    )
  }
}

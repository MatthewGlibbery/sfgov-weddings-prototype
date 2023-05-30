import { Container, Monospace, TitleMd } from '@/design-system'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'

export { ErrorBoundary }

export const ErrorFallbackReport = (props: FallbackProps) => {
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

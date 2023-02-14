import { Box, BoxProps, Container, Monospace, TitleSm } from '@sfgov/design-system/dist/react'
import safeJsonStringify from 'safe-json-stringify'

export type PagePropsDebugProps = BoxProps & {
  data: any
}

export default function PropsDebug ({ data, ...rest }: PagePropsDebugProps) {
  const id = 'props-debug'
  return (
    <Box css={{ color: '$white', bg: '$greyDark', py: 40 }} id={id} {...rest}>
      <Container css={{ overflowX: 'auto' }}>
        <details open>
          <TitleSm as='summary' css={{ mb: 20 }}>Page props</TitleSm>
          <Monospace as='pre' data-testid='debug-pre'>
            {safeJsonStringify(data, null, 2)}
          </Monospace>
        </details>
      </Container>
    </Box>
  )
}

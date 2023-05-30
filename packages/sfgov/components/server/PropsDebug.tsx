import { Box, BoxProps, Container, Monospace, TitleXs } from '@/design-system'
import safeJsonStringify from 'safe-json-stringify'

export type PagePropsDebugProps = BoxProps & {
  data: object
}

export const PropsDebug = ({ data, ...rest }: PagePropsDebugProps) => {
  const id = 'props-debug'
  return (
    <Box css={{ color: '$white', bg: '$greyDark', py: 20 }} id={id} {...rest}>
      <Container css={{ overflowX: 'auto' }}>
        <details>
          <TitleXs as='summary' css={{ m: 0 }}>Page props</TitleXs>
          <Monospace as='pre' css={{ mt: 20 }} data-testid='debug-pre'>
            {safeJsonStringify(data, null, 2)}
          </Monospace>
        </details>
      </Container>
    </Box>
  )
}

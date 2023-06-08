import { Container, Monospace, TitleXs } from '@/design-system'
import safeJsonStringify from 'safe-json-stringify'

export type PagePropsDebugProps = JSX.IntrinsicElements['div'] & {
  data: object
}

export const PropsDebug = ({ data, ...rest }: PagePropsDebugProps) => {
  const id = 'props-debug'
  return (
    <div className='text-white bg-grey700 py-20' id={id} {...rest}>
      <Container className='overflow-x-auto'>
        <details>
          <TitleXs as='summary' className='m-0'>
            Page props
          </TitleXs>
          <Monospace as='pre' className='mt-20' data-testid='debug-pre'>
            {safeJsonStringify(data, null, 2)}
          </Monospace>
        </details>
      </Container>
    </div>
  )
}

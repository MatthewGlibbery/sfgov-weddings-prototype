import { useServerInsertedHTML } from 'next/navigation'
import { SSRStyle, SSRStyleProps } from '@/design-system'

export const ServerStylesheet = (props: SSRStyleProps) => {
  useServerInsertedHTML(() => {
    if (typeof window === 'undefined') {
      return <SSRStyle {...props} />
    }
  })
  return <SSRStyle {...props} />
}

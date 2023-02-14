import React from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { SSRStyle, SSRStyleProps } from '@sfgov/design-system/react'

export default function ServerStylesheet (props: SSRStyleProps) {
  useServerInsertedHTML(() => {
    if (typeof window === 'undefined') {
      return <SSRStyle {...props} />
    }
  })
  return <SSRStyle {...props} />
}

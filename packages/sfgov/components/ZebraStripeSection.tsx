import { classed } from '@/design-system'
import { ReactNode } from 'react'

const Wrapper = classed('div', {
  base: 'even:bg-neutral10 py-40',
  variants: {
    noPadding: {
      true: 'p-0'
    }
  }
})

type ZebraStripedSectionProps = {
  children: ReactNode[]
  className?: string
  noPadding?: boolean
}

export const ZebraStripedSection = ({
  children,
  className = '',
  noPadding = false
}: ZebraStripedSectionProps) => (
  <div className={className}>
    {children.map((child: ReactNode, i: number) => {
      if (i % 2 !== 0) {
        return (
          <Wrapper key={i} noPadding={noPadding}>
            {child}
          </Wrapper>
        )
      } else {
        return <span key={i}>{child}</span>
      }
    })}
  </div>
)

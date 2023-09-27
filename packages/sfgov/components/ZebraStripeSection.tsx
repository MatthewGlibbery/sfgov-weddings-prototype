import { classed } from '@/design-system'
import { ReactNode } from 'react'

const Wrapper = classed('div', 'even:bg-grey100 py-40')

type ZebraStripedSectionProps = {
  children: ReactNode[]
  className?: string
}

export const ZebraStripedSection = ({
  children,
  className = ''
}: ZebraStripedSectionProps) => (
  <div className={className}>
    {children.map((child: ReactNode, i: number) => {
      if (i % 2 !== 0) {
        return <Wrapper key={i}>{child}</Wrapper>
      } else {
        return <span key={i}>{child}</span>
      }
    })}
  </div>
)

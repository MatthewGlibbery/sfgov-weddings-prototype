import { classed } from '@/design-system'
import { ReactNode } from 'react'

const Wrapper = classed('div', {
  base: 'even:bg-neutral10 py-20 md:py-28 lg:py-40',
  variants: {
    noPadding: {
      true: 'p-0'
    },
    backgroundColor: {
      neutral: '!bg-neutral10',
      primary: '!bg-primary50',
      secondary: '!bg-secondary10',
      white: '!bg-white'
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
    {children.flat().map((child: ReactNode, i: number) => (
      <>
        {child?.props?.condition === false ? null : (
          <Wrapper
            key={i}
            noPadding={noPadding}
            backgroundColor={
              child?.props?.children?.props?.backgroundColor || ''
            }
          >
            {child}
          </Wrapper>
        )}
      </>
    ))}
  </div>
)

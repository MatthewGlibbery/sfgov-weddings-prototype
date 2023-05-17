
import { ReactNode, useEffect, useState } from 'react'
import { If, Then, Else, When } from 'react-if'

import { styled, Box, TitleXs, IconMinus, IconPlus } from '@/design-system'

const AccordionHeader = styled(Box, {
  borderBottom: '1px solid #707070', // need real color
  cursor: 'pointer',
  pb: 10,
  position: 'relative',
  minHeight: 34
})
const AccordionContent = styled(Box, {
  bg: '#F2F4F7', // use theme colors when ready
  p: 32
})

export type AccordionProps = {
  title?: string
  children?: ReactNode
  tabIndex?: number
}
export const Accordion = ({ title, children, tabIndex = 0 }: AccordionProps) => {
  // Click handler for the title "button"
  const [isCollapsed, setIsCollapsed] = useState(false)
  const handleTitleInteraction = () => {
    setIsCollapsed(!isCollapsed)
  }

  // A unique id to be used in the event we have multiple accordions on the same page.
  // But why the complicated useEffect shenanigans? Well.. that's because Next.js gets out of sync
  // when it renders on the server and the client - and then we get a mismatch in instanceId and
  // whatnot. Fun!
  const [instanceId, setInstanceId] = useState('')
  useEffect(() => {
    setInstanceId(Math.random().toString(16).slice(2))
  }, [])
  const ariaControlId = `accordion-content-${instanceId}`
  const ariaLabelId = `accordion-header-${instanceId}`

  return (
    <Box>
      <AccordionHeader
        aria-label={ariaLabelId}
        aria-controls={ariaControlId}
        aria-expanded={!isCollapsed}
        tabIndex={tabIndex}
        onKeyUp={(e) => e.key === 'Enter' ? handleTitleInteraction() : null}
        onClick={handleTitleInteraction}
        onTouchEnd={handleTitleInteraction}
        role='button'
      >
        <When condition={!!title}><TitleXs as='h4'>{ title }</TitleXs></When>
        <Box css={{ position: 'absolute', top: 10, right: 10 }}>
          <If condition={isCollapsed}>
            <Then>
              <IconPlus width={14} />
            </Then>
            <Else>
              <IconMinus width={14} />
            </Else>
          </If>
        </Box>
      </AccordionHeader>
      <When condition={!isCollapsed}>
        <AccordionContent
          aria-labelledby={ariaLabelId}
          id={ariaControlId}
          role='dialog'
        >
          { children }
        </AccordionContent>
      </When>
    </Box>
  )
}

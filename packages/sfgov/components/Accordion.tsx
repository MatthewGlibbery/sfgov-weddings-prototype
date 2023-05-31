import { ComponentProps, useState } from 'react'
import { styled, Box, TitleXs, IconMinus, IconPlus } from '@/design-system'

const AccordionBox = styled('details', {
  display: 'block',
  listStyle: 'none'
})

// this _should_ include JSX.IntrinsicElements['details']
type AccordionBoxProps = ComponentProps<typeof AccordionBox>

const AccordionSummary = styled('summary', {
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: '1px solid #707070', // FIXME: need real color
  pb: 10
})

const AccordionContent = styled(Box, {
  bg: '#F2F4F7', // FIXME: use theme colors when ready
  p: 32
})

export type AccordionProps = {
  title: string
  open?: boolean
} & AccordionBoxProps

export const Accordion = (props: AccordionProps) => {
  const { title, children, open, ...boxProps } = props

  const [isOpen, setOpen] = useState(!!open)
  const Icon = isOpen ? IconMinus : IconPlus

  /* istanbul ignore next */
  const toggleOpen = () => setOpen(!isOpen)

  return (
    <AccordionBox open={isOpen} onToggle={toggleOpen}
      {...boxProps}
    >
      <AccordionSummary data-testid='accordion-summary'>
        <TitleXs data-testid='accordion-title'>{title}</TitleXs>
        <Icon data-testid={Icon.name} width={14} />
      </AccordionSummary>
      <AccordionContent data-testid='accordion-content'>
        {children}
      </AccordionContent>
    </AccordionBox>
  )
}

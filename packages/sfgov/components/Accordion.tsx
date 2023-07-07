import { type ComponentProps, useState } from 'react'
import {
  classed,
  HeadingXs,
  IconMinus,
  IconPlus,
  classes
} from '@/design-system'

const StyledDetails = classed('details', 'block list-none')

const StyledSummary = classed('summary', {
  base: classes(
    'cursor-pointer',
    'flex items-center content-between',
    'pb-12',
    'border-solid border-b-1 border-[#707070]'
  ),
  variants: {
    open: {
      true: 'bg-blue200'
    }
  }
})

const StyledContent = classed('div', 'bg-[#F2F4F7] p-[32px]')

export type AccordionProps = ComponentProps<typeof StyledDetails> & {
  title: string
}

export const Accordion = (props: AccordionProps) => {
  const { title, open, children, ...rest } = props

  const [isOpen, setOpen] = useState(!!open)
  const Icon = isOpen ? IconMinus : IconPlus

  /* istanbul ignore next */
  const toggleOpen = () => setOpen(!isOpen)

  return (
    <StyledDetails open={isOpen} onToggle={toggleOpen} {...rest}>
      <StyledSummary data-testid="accordion-summary" open={isOpen}>
        <HeadingXs data-testid="accordion-title">{title}</HeadingXs>
        <Icon data-testid={Icon.name} width={14} />
      </StyledSummary>
      <StyledContent data-testid="accordion-content">{children}</StyledContent>
    </StyledDetails>
  )
}

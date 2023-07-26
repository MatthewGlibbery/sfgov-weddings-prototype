import { type ComponentProps, useState } from 'react'
import {
  classed,
  IconMinus,
  IconPlus,
  classes,
  HeadingXl
} from '@/design-system'

const StyledDetails = classed('details', 'block list-none')

const StyledSummary = classed('summary', {
  base: classes(
    'cursor-pointer',
    'flex justify-between',
    'pb-12',
    'border-solid border-b-1 border-[#707070]'
  )
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
      <StyledSummary data-testid="accordion-summary">
        <HeadingXl romanType="sans" data-testid="accordion-title">
          {title}
        </HeadingXl>
        <Icon data-testid={Icon.name} width={14} />
      </StyledSummary>
      <StyledContent data-testid="accordion-content">{children}</StyledContent>
    </StyledDetails>
  )
}

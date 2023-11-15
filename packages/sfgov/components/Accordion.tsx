import { type ComponentProps, useState } from 'react'
import {
  classed,
  IconMinus,
  IconPlus,
  classes,
  HeadingXl,
  IconChevronUp,
  IconChevronDown,
  HeadingXs
} from '@/design-system'
import { When } from 'react-if'

const StyledDetails = classed('details', 'block list-none')

const StyledSummary = classed('summary', {
  base: classes(
    'cursor-pointer',
    'flex justify-between',
    'pb-12',
    'border-solid border-b-1 border-[#707070]'
  ),
  variants: {
    dataStory: {
      true: 'justify-center space-x-4 py-12 border-solid border-b-1 border-grey300'
    }
  }
})

const StyledContent = classed('div', {
  base: 'bg-[#F2F4F7] p-[32px]',
  variants: {
    dataStory: {
      true: 'bg-white text-grey500'
    }
  }
})

export type AccordionProps = ComponentProps<typeof StyledDetails> & {
  title: string
  dataStory?: boolean
}

export const Accordion = (props: AccordionProps) => {
  const { title, open, children, dataStory, ...rest } = props

  let OpenedIcon = IconMinus
  let ClosedIcon = IconPlus

  if (dataStory) {
    OpenedIcon = IconChevronUp
    ClosedIcon = IconChevronDown
  }

  const [isOpen, setOpen] = useState(!!open)
  const Icon = isOpen ? OpenedIcon : ClosedIcon

  /* istanbul ignore next */
  const toggleOpen = () => setOpen(!isOpen)

  return (
    <StyledDetails open={isOpen} onToggle={toggleOpen} {...rest}>
      <StyledSummary data-testid="accordion-summary" dataStory={dataStory}>
        <When condition={!dataStory}>
          <HeadingXl romanType="sans" data-testid="accordion-title">
            {title}
          </HeadingXl>
        </When>
        <When condition={dataStory}>
          <HeadingXs className="text-grey500" data-testid="accordion-title">
            {title}
          </HeadingXs>
        </When>
        <Icon
          className={dataStory ? 'text-grey500' : ''}
          data-testid={Icon.name}
          width={14}
        />
      </StyledSummary>
      <StyledContent data-testid="accordion-content" dataStory={dataStory}>
        {children}
      </StyledContent>
    </StyledDetails>
  )
}

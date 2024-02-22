import { type ComponentProps, useState } from 'react'
import {
  classed,
  IconMinus,
  IconPlus,
  classes,
  IconChevronUp,
  IconChevronDown,
  HeadingXs,
  HeadingMd
} from '@/design-system'
import { When } from 'react-if'

const StyledDetails = classed('details', 'block list-none')

const StyledSummary = classed('summary', {
  base: classes(
    'cursor-pointer',
    'flex justify-between',
    'pb-12',
    'border-solid border-b-1 border-neutral300'
  ),
  variants: {
    datastory: {
      true: 'justify-center space-x-4 py-12 border-solid border-b-1 border-grey300'
    }
  }
})

const StyledContent = classed('div', {
  base: 'bg-neutral50 p-20 border-b-1 border-l-1 border-r-1 border-neutral300',
  variants: {
    datastory: {
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
      <StyledSummary data-testid="accordion-summary" datastory={dataStory}>
        <When condition={!dataStory}>
          <HeadingMd
            romanType="sans"
            className="text-primary500"
            data-testid="accordion-title"
          >
            {title}
          </HeadingMd>
        </When>
        <When condition={dataStory}>
          <HeadingXs className="text-grey500" data-testid="accordion-title">
            {title}
          </HeadingXs>
        </When>
        <Icon
          className={dataStory ? 'text-grey500' : 'text-primary500'}
          data-testid={Icon.name}
          width={24}
        />
      </StyledSummary>
      <StyledContent data-testid="accordion-content" datastory={dataStory}>
        {children}
      </StyledContent>
    </StyledDetails>
  )
}

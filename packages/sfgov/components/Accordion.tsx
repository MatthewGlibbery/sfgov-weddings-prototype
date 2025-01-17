import { type ComponentProps, useState } from 'react'
import {
  classed,
  IconMinus,
  IconPlus,
  classes,
  IconChevronUp,
  IconChevronDown,
  HeadingXs,
  Label
} from '@/design-system'

export const StyledDetails = classed('details', 'block list-none')

const StyledSummary = classed('summary', {
  base: classes(
    'cursor-pointer',
    'flex justify-between',
    'py-12',
    'border-solid border-b-1 border-[#707070]'
  ),
  variants: {
    datastory: {
      true: 'justify-center space-x-4 py-12 border-solid border-b-1 border-neutral300'
    }
  }
})

const StyledContent = classed('div', {
  base: 'bg-neutral50 border-neutral200 p-20',
  variants: {
    datastory: {
      true: 'bg-white text-grey500'
    }
  }
})

export type AccordionProps = ComponentProps<typeof StyledDetails> & {
  title: string
  dataStory?: boolean
  as?: string
  classes?: string
}

export const Accordion = (props: AccordionProps) => {
  const {
    title,
    open,
    children,
    dataStory,
    as = 'h3',
    classes,
    ...rest
  } = props

  let OpenedIcon = IconMinus
  let ClosedIcon = IconPlus

  if (dataStory) {
    OpenedIcon = IconChevronUp
    ClosedIcon = IconChevronDown
  }

  const [isOpen, setOpen] = useState(!!open)
  const Icon = isOpen ? OpenedIcon : ClosedIcon

  return (
    <StyledDetails
      open={isOpen}
      onToggle={(e) => setOpen(e.currentTarget.open)}
      {...rest}
    >
      <StyledSummary data-testid="accordion-summary" datastory={dataStory}>
        {dataStory ? (
          <Label
            className="text-primary500 font-medium"
            data-testid="accordion-title"
          >
            {title}
          </Label>
        ) : (
          <Label
            as={as}
            romanType="sans"
            data-testid="accordion-title"
            className="text-primary500 font-bold text-heading-md"
          >
            {title}
          </Label>
        )}
        <Icon
          className={
            dataStory ? 'text-primary500' : 'text-primary500 min-w-[24px]'
          }
          data-testid={Icon.name}
          width={24}
        />
      </StyledSummary>
      <StyledContent
        className={classes}
        data-testid="accordion-content"
        datastory={dataStory}
      >
        {children}
      </StyledContent>
    </StyledDetails>
  )
}

import { type ComponentProps, useState } from 'react'
import {
  classed,
  IconMinus,
  IconPlus,
  classes,
  IconChevronUp,
  IconChevronDown,
  Label,
  HeadingLg
} from '@/design-system'

export const StyledDetails = classed('details', 'block list-none group')

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
    },
    filter: {
      true: 'border-b-1 border-solid border-neutral300 py-12 group-open:border-b-0'
    }
  }
})

const StyledContent = classed('div', {
  base: 'bg-neutral50 border-neutral200 p-20',
  variants: {
    datastory: {
      true: 'bg-white text-grey500'
    },
    filter: {
      true: 'p-0 pb-20 bg-white text-black border-b-1 border-solid border-neutral300'
    }
  }
})

export type AccordionProps = ComponentProps<typeof StyledDetails> & {
  title: string
  dataStory?: boolean
  filter?: boolean
  as?: string
  classes?: string
}

export const Accordion = (props: AccordionProps) => {
  const {
    title,
    open,
    children,
    dataStory,
    filter,
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
      <StyledSummary
        data-testid="accordion-summary"
        datastory={dataStory}
        filter={filter}
      >
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
        filter={filter}
      >
        {children}
      </StyledContent>
    </StyledDetails>
  )
}

export const HeaderNavAccordion = /* istanbul ignore next */ (
  props: AccordionProps
) => {
  const { title, open, children, ...rest } = props

  const OpenedIcon = IconMinus
  const ClosedIcon = IconPlus

  const [isOpen, setOpen] = useState(!!open)
  const Icon = isOpen ? OpenedIcon : ClosedIcon

  return (
    <StyledDetails
      open={isOpen}
      className={classes(isOpen ? 'border-b-1 border-neutral200' : '')}
      onToggle={(e) => setOpen(e.currentTarget.open)}
      name="nav-menu"
      data-testid={`header-nav-${title}`}
      {...rest}
    >
      <StyledSummary
        className={classes(
          'py-16 px-20',
          isOpen ? 'border-b-0' : 'border-neutral200'
        )}
      >
        <HeadingLg className="!mb-0">{title}</HeadingLg>
        <Icon className="text-black" data-testid={Icon.name} width={24} />
      </StyledSummary>
      <StyledContent className="pt-0">{children}</StyledContent>
    </StyledDetails>
  )
}

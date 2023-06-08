import clsx from 'clsx'
import { useState } from 'react'
import { TitleXs, IconMinus, IconPlus } from '@/design-system'

export type AccordionProps = JSX.IntrinsicElements['details'] & {
  title: string
}

export const Accordion = (props: AccordionProps) => {
  const { title, open, className, children, ...rest } = props

  const [isOpen, setOpen] = useState(!!open)
  const Icon = isOpen ? IconMinus : IconPlus

  /* istanbul ignore next */
  const toggleOpen = () => setOpen(!isOpen)

  return (
    <details
      className={clsx('block list-none', className)}
      open={isOpen} onToggle={toggleOpen}
      {...rest}
    >
      <summary className={`
        cursor-pointer
        flex items-center content-between
        pb-12
        border-solid border-b-1 border-[#707070]
      `} data-testid='accordion-summary'>
        <TitleXs data-testid='accordion-title'>{title}</TitleXs>
        <Icon data-testid={Icon.name} width={14} />
      </summary>
      <div className='bg-[#F2F4F7] p-[32px]' data-testid='accordion-content'>
        {children}
      </div>
    </details>
  )
}

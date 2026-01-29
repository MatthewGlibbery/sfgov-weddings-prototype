import {
  classed,
  classes,
  IconChevronDown,
  IconChevronUp,
  type ComponentProps
} from '@/design-system'
import type { ReactNode } from 'react'
import { useRef, useState } from 'react'
import { useTranslation } from 'next-i18next'

const StyledDiv = classed(
  'div',
  'w-[360px] p-28 absolute top-full left-0 bg-neutral50 z-10 shadow-[rgba(0,0,0,0.12)_0px_2px_4px_-2px] lg:rounded-4 lg:border-1 lg:border-neutral200 lg:bg-white lg:mt-8 lg:shadow'
)

export type DropdownProps = ComponentProps<'details'> & {
  title: string
  children: ReactNode | ReactNode[]
}

export const Dropdown = ({ title, children }: DropdownProps) => {
  const { t } = useTranslation()
  const [isOpen, setOpen] = useState(false)

  const detailsRef = useRef<HTMLDetailsElement>(null)

  return children ? (
    <details
      name="menu"
      onToggle={(e) => {
        setOpen(e.currentTarget.open)
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape' && e.currentTarget.open) {
          e.currentTarget.open = false
        }
      }}
      className="group relative [&::-webkit-details-marker]:hidden"
      ref={detailsRef}
      aria-label={title}
    >
      <summary
        className={classes(
          'flex px-8 py-[15px] gap-4 items-center justify-center group-open:bg-neutral50',
          'list-none [&::-webkit-details-marker]:hidden xl:whitespace-nowrap',
          'group-open:md:bg-primary100 hover:md:bg-primary100 md:h-auto md:rounded-4'
        )}
        aria-label={
          isOpen
            ? t(`${title}-aria-label-open`, {
                defaultValue: 'Hide {{title}} menu',
                title
              })
            : t(`${title}-menu-button`, {
                defaultValue: 'Show {{title}} menu',
                title
              })
        }
      >
        <p
          className="text-center text-label-xs text-primary500 font-bold md:text-black"
          aria-hidden="true"
        >
          {title}
        </p>
        <IconChevronUp
          width="20"
          height="20"
          className="hidden shrink-0 group-open:block text-primary600 md:text-black"
          aria-hidden="true"
        />
        <IconChevronDown
          width="20"
          height="20"
          className="shrink-0 group-open:hidden text-primary600 md:text-black"
          aria-hidden="true"
        />
      </summary>
      <StyledDiv>{children}</StyledDiv>
    </details>
  ) : null
}

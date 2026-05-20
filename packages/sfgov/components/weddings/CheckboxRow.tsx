import type { ReactNode } from 'react'
import { classed, classes, IconCheckmark } from '@/design-system'

const Row = classed(
  'label',
  classes(
    'flex items-center gap-16 h-44 cursor-pointer',
    'text-body text-black'
  )
)

const NativeCheckbox = classed(
  'input',
  'peer absolute opacity-0 w-0 h-0 pointer-events-none'
)

const Box = classed(
  'span',
  classes(
    'relative inline-flex items-center justify-center',
    'w-40 h-40 rounded-4',
    'border-1 border-solid border-black bg-white',
    'transition-colors',
    // Checked
    'peer-checked:bg-primary500 peer-checked:border-primary500',
    // Disabled (greyed)
    'peer-disabled:bg-neutral100 peer-disabled:border-neutral300',
    // Focus ring — visible on click and keyboard focus, 3px outline 2px outside
    'peer-focus:[outline-style:solid] peer-focus:[outline-width:3px] peer-focus:[outline-offset:2px]',
    'peer-focus:[outline-color:theme(colors.primary600)]',
    'peer-checked:peer-focus:[outline-color:theme(colors.primary500)]'
  )
)

export type CheckboxRowProps = {
  checked: boolean
  onChange: (checked: boolean) => void
  name: string
  value: string
  children: ReactNode
}

export function CheckboxRow({
  checked,
  onChange,
  name,
  value,
  children
}: CheckboxRowProps) {
  return (
    <Row>
      <span className="relative inline-flex">
        <NativeCheckbox
          type="checkbox"
          name={name}
          value={value}
          checked={checked}
          onChange={(e) => onChange(e.currentTarget.checked)}
        />
        <Box>
          <IconCheckmark
            width={24}
            height={24}
            className={classes(
              'text-white transition-opacity',
              checked ? 'opacity-100' : 'opacity-0'
            )}
            aria-hidden="true"
          />
        </Box>
      </span>
      <span>{children}</span>
    </Row>
  )
}

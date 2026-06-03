import { IconCaution } from '@/design-system'

export type RadioOption = {
  value: string
  label: string
}

export type RadioGroupProps = {
  /** Field label */
  label: string
  /** Whether the field is required (shows red asterisk) */
  required?: boolean
  /** HTML name attribute for the radio group */
  name: string
  /** Available options */
  options: RadioOption[]
  /** Currently selected value */
  value: string
  /** Change handler */
  onChange: (value: string) => void
  /** Error message */
  error?: string | null
}

/**
 * Radio button group matching the SF.gov design system.
 * 40px circular radio selectors with 16px gap to label text.
 * Selected: filled primary500 inner circle (22px).
 * Focus: 3px primary500 outline around the radio circle.
 */
export function RadioGroup({
  label,
  required = false,
  name,
  options,
  value,
  onChange,
  error
}: RadioGroupProps) {
  const hasError = Boolean(error)

  return (
    <fieldset className="flex flex-col gap-16 w-full border-0 p-0 m-0">
      {/* Legend / Label */}
      <div className="flex gap-4 items-start">
        <legend className="font-body text-[20px] leading-28 text-black p-0">
          {label}
        </legend>
        {required ? (
          <span
            className="text-danger600 text-[24px] leading-[32px]"
            aria-hidden
          >
            *
          </span>
        ) : null}
      </div>

      {/* Error message */}
      {hasError ? (
        <div className="flex gap-8 items-start">
          <IconCaution
            width={20}
            height={20}
            className="shrink-0 text-danger600"
            aria-hidden
          />
          <span className="text-danger600 text-[14px] leading-20">{error}</span>
        </div>
      ) : null}

      {/* Options */}
      <div className="flex flex-col gap-16">
        {options.map((opt) => {
          const isSelected = value === opt.value
          const id = `${name}-${opt.value}`
          return (
            <label
              key={opt.value}
              htmlFor={id}
              className="flex gap-16 h-40 items-center cursor-pointer group"
            >
              {/* Custom radio circle — focus ring applied via peer-focus */}
              <span
                className={[
                  'shrink-0 size-40 rounded-full border-1 border-black bg-white',
                  'flex items-center justify-center',
                  'group-focus-within:[outline-style:solid]',
                  'group-focus-within:[outline-width:3px]',
                  'group-focus-within:[outline-offset:2px]',
                  'group-focus-within:[outline-color:theme(colors.primary500)]'
                ].join(' ')}
              >
                {isSelected ? (
                  <span className="size-[22px] rounded-full bg-primary500" />
                ) : null}
              </span>
              <span className="text-body text-black leading-24">
                {opt.label}
              </span>
              {/* Hidden native input for accessibility */}
              <input
                type="radio"
                id={id}
                name={name}
                value={opt.value}
                checked={isSelected}
                onChange={() => onChange(opt.value)}
                className="sr-only"
              />
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

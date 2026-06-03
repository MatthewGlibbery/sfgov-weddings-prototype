import { IconCaution, IconChevronDown } from '@/design-system'
import type { SelectHTMLAttributes } from 'react'

export type SelectFieldProps = {
  /** Field label */
  label: string
  /** Whether the field is required (shows red asterisk) */
  required?: boolean
  /** HTML name attribute */
  name: string
  /** Options to display */
  options: { value: string; label: string }[]
  /** Placeholder shown when no value selected */
  placeholder?: string
  /** Error message to display (field enters error state when set) */
  error?: string | null
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, 'name' | 'children'>

/**
 * A form select/dropdown field matching the SF.gov design system field pattern.
 * Same dimensions as TextField (56px height, border, 4px radius).
 * Renders a native <select> with a custom chevron icon overlay.
 */
export function SelectField({
  label,
  required = false,
  name,
  options,
  placeholder,
  error,
  className,
  ...selectProps
}: SelectFieldProps) {
  const hasError = Boolean(error)

  return (
    <div className={`flex flex-col gap-12 w-full ${className ?? ''}`}>
      {/* Label */}
      <div className="flex gap-4 items-start">
        <label
          htmlFor={name}
          className="font-body text-[20px] leading-28 text-black"
        >
          {label}
        </label>
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

      {/* Select wrapper */}
      <div className="relative w-full">
        <select
          id={name}
          name={name}
          required={required}
          aria-invalid={hasError || undefined}
          className={`appearance-none h-[56px] w-full rounded-4 border-1 px-16 pr-40 text-body leading-24 focus:[outline-style:solid] focus:[outline-width:3px] focus:[outline-offset:-3px] focus:[outline-color:theme(colors.primary500)] ${
            hasError
              ? 'border-danger600 bg-danger10 text-danger600'
              : 'border-black bg-white text-black'
          }`}
          {...selectProps}
        >
          {placeholder ? <option value="">{placeholder}</option> : null}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <IconChevronDown
          width={20}
          height={20}
          className="absolute right-16 top-1/2 -translate-y-1/2 pointer-events-none text-black"
          aria-hidden
        />
      </div>
    </div>
  )
}

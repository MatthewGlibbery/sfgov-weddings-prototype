import { IconCaution } from '@/design-system'
import type { InputHTMLAttributes } from 'react'

export type TextFieldProps = {
  /** Field label */
  label: string
  /** Whether the field is required (shows red asterisk) */
  required?: boolean
  /** HTML name attribute */
  name: string
  /** Placeholder text (rendered as grey hint inside the input) */
  placeholder?: string
  /** Error message to display (field enters error state when set) */
  error?: string | null
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'name'>

/**
 * A form text field matching the SF.gov design system field pattern.
 *
 * States:
 * - Default: 1px black border, white bg
 * - Focus: 3px primary500 border (via focus ring)
 * - Error: 1px danger600 border, danger10 bg, error message with caution icon
 */
export function TextField({
  label,
  required = false,
  name,
  placeholder,
  error,
  className,
  ...inputProps
}: TextFieldProps) {
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

      {/* Input */}
      <input
        id={name}
        name={name}
        type="text"
        placeholder={placeholder}
        required={required}
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? `${name}-error` : undefined}
        className={`h-[56px] w-full rounded-4 border-1 px-16 text-body leading-24 placeholder:text-neutral500 focus:[outline-style:solid] focus:[outline-width:3px] focus:[outline-offset:-3px] focus:[outline-color:theme(colors.primary500)] ${
          hasError
            ? 'border-danger600 bg-danger10 text-danger600'
            : 'border-black bg-white text-black'
        }`}
        {...inputProps}
      />
    </div>
  )
}

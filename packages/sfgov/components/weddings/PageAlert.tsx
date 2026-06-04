import type { ReactNode } from 'react'

export type PageAlertVariant = 'danger' | 'info'

export type PageAlertProps = {
  variant?: PageAlertVariant
  children: ReactNode
}

const VARIANT_STYLES: Record<
  PageAlertVariant,
  { bg: string; border: string; iconColor: string }
> = {
  danger: {
    bg: 'bg-danger50',
    border: 'bg-danger600',
    iconColor: 'text-danger600'
  },
  info: {
    bg: 'bg-[#e5f1ff]',
    border: 'bg-[#0046c2]',
    iconColor: 'text-[#0046c2]'
  }
}

/**
 * Filled caution icon (solid circle with exclamation mark).
 * Matches Figma "icon.20.ui.caution.flat" / "icon.24.ui.caution.solid".
 */
function IconCautionFilled(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden {...props}>
      <circle cx="10" cy="10" r="8" />
      <rect x="9" y="5" width="2" height="7" rx="1" fill="white" />
      <circle cx="10" cy="14.5" r="1.2" fill="white" />
    </svg>
  )
}

/**
 * Page-level alert banner matching Figma's "Page-level Alert" component.
 *
 * Desktop/tablet: inset from the site width by 20px on both sides.
 * Mobile: full-width.
 *
 * Structure: 8px colored left border bar + tinted background body with icon + content.
 */
export function PageAlert({ variant = 'danger', children }: PageAlertProps) {
  const styles = VARIANT_STYLES[variant]

  return (
    <div className="flex w-full" role="alert">
      {/* Left border bar */}
      <div className={`${styles.border} w-8 shrink-0 self-stretch`} />
      {/* Body */}
      <div
        className={[
          'flex-1 flex gap-12 items-start',
          'p-20 lg:pl-20 lg:pr-28 lg:py-28',
          styles.bg
        ].join(' ')}
      >
        <IconCautionFilled
          width={20}
          height={20}
          className={`shrink-0 mt-2 lg:mt-0 ${styles.iconColor} lg:!w-[24px] lg:!h-[24px]`}
        />
        <div className="flex-1 min-w-0 text-body text-black leading-24">
          {children}
        </div>
      </div>
    </div>
  )
}

import { IconCaution, IconInfo, IconWarning } from '@/design-system'
import type { ReactNode } from 'react'

export type CalloutVariant = 'info' | 'warning' | 'danger'

export type CalloutProps = {
  variant: CalloutVariant
  title: string
  children: ReactNode
}

const VARIANT_STYLES: Record<
  CalloutVariant,
  { bg: string; border: string; titleColor: string; icon: typeof IconInfo }
> = {
  info: {
    bg: 'bg-[#e5f1ff]',
    border: 'border-[#0046c2]',
    titleColor: 'text-[#0046c2]',
    icon: IconInfo
  },
  warning: {
    bg: 'bg-[#faefe1]',
    border: 'border-[#843f00]',
    titleColor: 'text-[#843f00]',
    icon: IconWarning
  },
  danger: {
    bg: 'bg-[#ffeae5]',
    border: 'border-[#ac0000]',
    titleColor: 'text-danger600',
    icon: IconCaution
  }
}

/**
 * Callout alert matching the SF.gov design system.
 *
 * Desktop: horizontal layout (icon + content side by side), title 20px bold
 * Mobile: vertical layout (icon stacked above content), title 16px bold
 */
export function Callout({ variant, title, children }: CalloutProps) {
  const styles = VARIANT_STYLES[variant]
  const Icon = styles.icon

  return (
    <div
      className={[
        'w-full lg:w-[623px] px-28 py-20 border-1',
        // Mobile: vertical stack
        'flex flex-col gap-12',
        // Desktop: horizontal row
        'md:flex-row md:items-start md:gap-12',
        styles.bg,
        styles.border
      ].join(' ')}
      role="alert"
    >
      <Icon
        width={24}
        height={24}
        className={`shrink-0 ${styles.titleColor}`}
        aria-hidden
      />
      <div className="flex flex-col gap-8 flex-1 min-w-0">
        <p
          className={[
            'font-body font-bold m-0',
            // Mobile: 16px, Desktop: 20px
            'text-body leading-24 md:text-[20px] md:leading-28',
            styles.titleColor
          ].join(' ')}
        >
          {title}
        </p>
        <div className="text-body text-black leading-24">{children}</div>
      </div>
    </div>
  )
}

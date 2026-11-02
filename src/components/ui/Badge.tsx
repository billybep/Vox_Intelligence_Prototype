import { cn } from '../../lib/cn'
import type { HTMLAttributes, ReactNode } from 'react'

type BadgeColor = 'blue' | 'green' | 'amber' | 'red' | 'gray' | 'magenta' | 'cyan'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  color?: BadgeColor
  children: ReactNode
}

const colorStyles: Record<BadgeColor, string> = {
  blue:    'bg-blue-100 text-blue-700',
  green:   'bg-[var(--color-status-good-bg)] text-[var(--color-status-good)]',
  amber:   'bg-[var(--color-status-watch-bg)] text-[var(--color-status-watch)]',
  red:     'bg-[var(--color-status-critical-bg)] text-[var(--color-status-critical)]',
  gray:    'bg-[var(--color-neutral-100)] text-[var(--color-neutral-600)]',
  magenta: 'bg-pink-100 text-[var(--color-brand-magenta)]',
  cyan:    'bg-cyan-100 text-cyan-700',
}

export function Badge({ color = 'gray', className, children, ...props }: BadgeProps) {
  return (
    <span
      {...props}
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold',
        colorStyles[color],
        className,
      )}
    >
      {children}
    </span>
  )
}


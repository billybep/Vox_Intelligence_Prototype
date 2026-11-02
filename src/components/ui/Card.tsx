import { cn } from '../../lib/cn'
import type { ReactNode, HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const paddingStyles = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
}

export function Card({ children, padding = 'md', className, ...props }: CardProps) {
  return (
    <div
      {...props}
      className={cn(
        'bg-[var(--color-canvas-card)] border border-[var(--color-canvas-border)] rounded-xl',
        paddingStyles[padding],
        className,
      )}
    >
      {children}
    </div>
  )
}


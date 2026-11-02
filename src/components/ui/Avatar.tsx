import { cn } from '../../lib/cn'
import type { HTMLAttributes } from 'react'

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  name: string
  src?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeStyles = { sm: 'w-7 h-7 text-xs', md: 'w-9 h-9 text-sm', lg: 'w-11 h-11 text-base' }

function initials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

export function Avatar({ name, src, size = 'md', className, ...props }: AvatarProps) {
  return (
    <div
      {...props}
      className={cn(
        'rounded-full flex items-center justify-center font-semibold select-none shrink-0',
        'bg-[var(--color-brand-blue)] text-white',
        sizeStyles[size],
        className,
      )}
    >
      {src ? (
        <img src={src} alt={name} className="w-full h-full rounded-full object-cover" />
      ) : (
        initials(name)
      )}
    </div>
  )
}


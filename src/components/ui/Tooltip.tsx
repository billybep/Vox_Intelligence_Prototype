import { useState, useRef, type ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface TooltipProps {
  content: ReactNode
  children: ReactNode
  className?: string
}

export function Tooltip({ content, children, className }: TooltipProps) {
  const [visible, setVisible] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  const show = () => {
    clearTimeout(timeoutRef.current)
    setVisible(true)
  }
  const hide = () => {
    timeoutRef.current = setTimeout(() => setVisible(false), 100)
  }

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {visible && (
        <span
          role="tooltip"
          className={cn(
            'absolute bottom-full mb-2 start-1/2 -translate-x-1/2 z-50',
            'bg-[var(--color-neutral-900)] text-white text-xs rounded-lg px-3 py-2',
            'shadow-lg max-w-xs whitespace-normal text-start',
            '[direction:ltr]', // tooltip always LTR for readability
            className,
          )}
        >
          {content}
        </span>
      )}
    </span>
  )
}

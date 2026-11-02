import { useTranslation } from 'react-i18next'
import { Plug, Minus, Sparkles, Ruler } from 'lucide-react'
import { Tooltip } from '../ui/Tooltip'
import { cn } from '../../lib/cn'
import type { SourceBadgeProps } from '../../types'

const config = {
  measured: {
    labelKey: 'evidence.measured',
    icon: Ruler,
    className: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  connected: {
    labelKey: 'evidence.connected',
    icon: Plug,
    className: 'bg-[var(--color-status-good-bg)] text-[var(--color-status-good)] border-green-200',
  },
  estimated: {
    labelKey: 'evidence.estimated',
    icon: null,
    className: 'bg-[var(--color-neutral-100)] text-[var(--color-neutral-600)] border-[var(--color-neutral-200)] fill-estimated',
  },
  ai: {
    labelKey: 'evidence.ai',
    icon: Sparkles,
    className: 'bg-pink-50 text-[var(--color-brand-magenta)] border-pink-200',
  },
  unavailable: {
    labelKey: 'evidence.unavailable',
    icon: Minus,
    className: 'bg-[var(--color-neutral-100)] text-[var(--color-neutral-400)] border-[var(--color-neutral-200)]',
  },
}

export function SourceBadge({ type, source, date, reason }: SourceBadgeProps) {
  const { t } = useTranslation()
  const cfg = config[type]
  const Icon = cfg.icon

  const tooltipContent = (
    <span className="flex flex-col gap-1">
      <span className="font-semibold">{t(cfg.labelKey)}</span>
      {source && <span>{t('common.source')}: {source}</span>}
      {date   && <span>{t('common.date')}: {date}</span>}
      {reason && <span>{t('common.reason')}: {reason}</span>}
    </span>
  )

  return (
    <Tooltip content={tooltipContent}>
      <span
        className={cn(
          'inline-flex items-center gap-1 px-1.5 py-0.5 rounded border text-[10px] font-semibold cursor-default',
          cfg.className,
        )}
      >
        {Icon && <Icon size={10} />}
        {type === 'estimated' && <span className="italic">Est.</span>}
        <span>{t(cfg.labelKey)}</span>
      </span>
    </Tooltip>
  )
}


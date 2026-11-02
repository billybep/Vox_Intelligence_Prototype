import { useTranslation } from 'react-i18next'
import { TrendingUp, TrendingDown, Info } from 'lucide-react'
import { Card } from '../ui/Card'
import { Tooltip } from '../ui/Tooltip'
import { SourceBadge } from '../evidence/SourceBadge'
import { cn } from '../../lib/cn'
import { scoreBand } from '../../types'
import type { KpiCard as KpiCardType } from '../../types'

const bandColor: Record<string, string> = {
  critical: 'var(--color-status-critical)',
  watch:    'var(--color-status-watch)',
  solid:    'var(--color-brand-blue)',
  strong:   'var(--color-status-good)',
}

interface KpiCardProps {
  data: KpiCardType
}

export function KpiCard({ data }: KpiCardProps) {
  const { t } = useTranslation()
  const isScore = typeof data.value === 'number' && data.value <= 100
  const band = isScore ? scoreBand(data.value as number) : null

  return (
    <Card className="flex flex-col gap-3 min-w-0">
      {/* Title + info */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold text-[var(--color-neutral-500)] uppercase tracking-wide truncate">
          {t(data.titleKey)}
        </span>
        <Tooltip content={<span>{t(data.definitionKey)}</span>}>
          <Info size={14} className="text-[var(--color-neutral-300)] shrink-0 cursor-default" />
        </Tooltip>
      </div>

      {/* Value */}
      <div className="flex items-end gap-2">
        {data.value === null ? (
          <span className="text-2xl font-bold text-[var(--color-neutral-300)] metric">—</span>
        ) : (
          <span
            className="text-3xl font-bold metric"
            style={{ color: band ? bandColor[band] : 'var(--color-neutral-900)' }}
          >
            {data.value}
            {isScore && <span className="text-lg font-semibold text-[var(--color-neutral-400)]">/100</span>}
          </span>
        )}

        {/* Delta */}
        {data.change !== undefined && data.value !== null && (
          <span
            className={cn(
              'flex items-center gap-0.5 text-xs font-semibold mb-1',
              data.change >= 0 ? 'text-[var(--color-status-good)]' : 'text-[var(--color-status-critical)]',
            )}
          >
            {data.change >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {Math.abs(data.change)}
          </span>
        )}
      </div>

      {/* Period + source */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[10px] text-[var(--color-neutral-400)]">{t(data.period)}</span>
        <SourceBadge {...data.source} />
      </div>
    </Card>
  )
}


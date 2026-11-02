import { Bell, Search } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useLocale } from '../../hooks/useLocale'
import { useAuth } from '../../hooks/useAuth'
import { Avatar } from '../ui/Avatar'
import { cn } from '../../lib/cn'

interface TopBarProps {
  title?: string
}

export function TopBar({ title }: TopBarProps) {
  const { t } = useTranslation()
  const { locale, toggle } = useLocale()
  const { user } = useAuth()

  return (
    <header className="h-14 shrink-0 flex items-center gap-4 px-6 bg-[var(--color-canvas-card)] border-b border-[var(--color-canvas-border)]">
      {title && (
        <h1 className="text-sm font-semibold text-[var(--color-neutral-800)] flex-1">{title}</h1>
      )}

      {!title && <span className="flex-1" />}

      {/* Global search (placeholder) */}
      <button
        aria-label={t('common.loading')}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--color-canvas-border)] text-sm text-[var(--color-neutral-400)] hover:border-[var(--color-brand-blue)] transition-colors w-56"
      >
        <Search size={14} />
        <span className="text-xs">Search…</span>
        <kbd className="ms-auto text-[10px] text-[var(--color-neutral-300)] font-mono">⌘K</kbd>
      </button>

      {/* EN ↔ AR toggle */}
      <button
        onClick={toggle}
        className={cn(
          'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors',
          'border-[var(--color-canvas-border)] text-[var(--color-neutral-600)] hover:border-[var(--color-brand-blue)] hover:text-[var(--color-brand-blue)]',
        )}
        aria-label={t('common.language')}
      >
        {locale === 'en' ? (
          <>🌐 <span>العربية</span></>
        ) : (
          <>🌐 <span>English</span></>
        )}
      </button>

      {/* Notifications */}
      <button
        aria-label={t('nav.items.notifications')}
        className="relative p-2 rounded-lg text-[var(--color-neutral-500)] hover:bg-[var(--color-neutral-100)] transition-colors"
      >
        <Bell size={18} />
        <span className="absolute top-1.5 end-1.5 w-2 h-2 rounded-full bg-[var(--color-brand-magenta)]" />
      </button>

      {/* Avatar */}
      {user && <Avatar name={user.name} src={user.avatarUrl} size="sm" />}
    </header>
  )
}


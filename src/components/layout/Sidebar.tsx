import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  LayoutDashboard, Building2, ScanSearch, Activity,
  BarChart3, Share2, Search, Bot, Trophy, Route,
  Lightbulb, Map, FileText, Users, Palette, Share,
  UsersRound, CreditCard, Plug, Bell, ChevronLeft,
  ChevronRight, Plus,
} from 'lucide-react'
import { cn } from '../../lib/cn'
import { useAuth } from '../../hooks/useAuth'
import { Avatar } from '../ui/Avatar'
import { NAV_ITEMS, NAV_GROUPS, visibleNavItems } from '../../data/nav'
import type { NavItem } from '../../types'

// Map icon string names to components
const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  LayoutDashboard, Building2, ScanSearch, Activity,
  BarChart3, Share2, Search, Bot, Trophy, Route,
  Lightbulb, Map, FileText, Users, Palette, Share,
  UsersRound, CreditCard, Plug, Bell,
}

function NavItemRow({ item, collapsed }: { item: NavItem; collapsed: boolean }) {
  const { t } = useTranslation()
  const Icon = ICONS[item.icon]

  return (
    <NavLink
      to={item.path}
      title={collapsed ? t(item.label) : undefined}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150',
          'text-[#c8cde8] hover:bg-white/10 hover:text-white',
          isActive && 'bg-white/15 text-white',
          collapsed && 'justify-center px-2',
        )
      }
    >
      {Icon && <Icon size={18} className="shrink-0" />}
      {!collapsed && <span className="truncate">{t(item.label)}</span>}
    </NavLink>
  )
}

export function Sidebar() {
  const { user } = useAuth()
  const { t } = useTranslation()
  const [collapsed, setCollapsed] = useState(false)

  const items = user ? visibleNavItems(user.role) : NAV_ITEMS

  return (
    <aside
      style={{ width: collapsed ? 'var(--sidebar-collapsed)' : 'var(--sidebar-expanded)' }}
      className={cn(
        'flex flex-col h-screen shrink-0 overflow-hidden',
        'bg-[var(--color-brand-shell)] border-e border-[var(--color-brand-border)]',
        'transition-[width] duration-200',
      )}
    >
      {/* Logo + brand */}
      <div className={cn('flex items-center gap-3 px-4 py-5 border-b border-[var(--color-brand-border)]', collapsed && 'justify-center px-2')}>
        {/* Gradient V logo placeholder */}
        <span className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-white"
          style={{ background: 'linear-gradient(135deg, var(--color-brand-cyan), var(--color-brand-magenta))' }}>
          V
        </span>
        {!collapsed && (
          <span className="text-white font-semibold text-sm leading-tight">
            VoxAudit<br />
            <span className="text-[var(--color-brand-cyan)] text-xs font-normal">Intelligence</span>
          </span>
        )}
      </div>

      {/* Create Audit CTA */}
      {!collapsed ? (
        <div className="px-3 pt-4 pb-2">
          <NavLink
            to="/create-audit"
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm font-semibold text-white justify-center"
            style={{ background: 'linear-gradient(90deg, var(--color-brand-blue), var(--color-brand-magenta))' }}
          >
            <Plus size={16} />
            {t('common.createAudit')}
          </NavLink>
        </div>
      ) : (
        <div className="px-2 pt-4 pb-2">
          <NavLink
            to="/create-audit"
            title={t('common.createAudit')}
            className="flex items-center justify-center w-full p-2 rounded-lg text-white"
            style={{ background: 'linear-gradient(90deg, var(--color-brand-blue), var(--color-brand-magenta))' }}
          >
            <Plus size={18} />
          </NavLink>
        </div>
      )}

      {/* Nav groups */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-2 space-y-4">
        {NAV_GROUPS.map((group) => {
          const groupItems = items.filter((i) => i.group === group.id)
          if (!groupItems.length) return null
          return (
            <div key={group.id}>
              {!collapsed && (
                <p className="px-3 mb-1 text-[10px] font-bold uppercase tracking-widest text-[#5b6490]">
                  {t(group.labelKey)}
                </p>
              )}
              <div className="space-y-0.5">
                {groupItems.map((item) => (
                  <NavItemRow key={item.id} item={item} collapsed={collapsed} />
                ))}
              </div>
            </div>
          )
        })}
      </nav>

      {/* User + collapse toggle */}
      <div className="border-t border-[var(--color-brand-border)] p-3 space-y-2">
        {user && (
          <div className={cn('flex items-center gap-3', collapsed && 'justify-center')}>
            <Avatar name={user.name} src={user.avatarUrl} size="sm" />
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-medium truncate">{user.name}</p>
                <p className="text-[#5b6490] text-[10px] truncate">{user.email}</p>
              </div>
            )}
          </div>
        )}

        <button
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? t('nav.expand') : t('nav.collapse')}
          className="w-full flex items-center justify-center gap-2 px-2 py-1.5 rounded-lg text-[#5b6490] hover:text-white hover:bg-white/10 transition-colors text-xs"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          {!collapsed && <span>{t('nav.collapse')}</span>}
        </button>
      </div>
    </aside>
  )
}


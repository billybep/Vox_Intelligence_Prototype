// ─── Role + Workspace types ────────────────────────────────────────
export type WorkspaceType = 'platform' | 'agency' | 'consultant' | 'business' | 'client'

export type UserRole =
  | 'platform_admin'
  | 'agency_owner'
  | 'agency_member'
  | 'consultant'
  | 'business_owner'
  | 'client_user'

export interface User {
  id: string
  name: string
  email: string
  avatarUrl?: string
  role: UserRole
  workspaceType: WorkspaceType
  locale: 'en' | 'ar'
}

// ─── Sidebar navigation ────────────────────────────────────────────
export type NavGroup = 'workspace' | 'intelligence' | 'growth' | 'agency' | 'administration'

export interface NavItem {
  id: string
  label: string          // translation key
  icon: string           // lucide icon name
  path: string
  group: NavGroup
  /** Roles that can see this item — empty = all */
  allowedRoles?: UserRole[]
}

// ─── Evidence source ───────────────────────────────────────────────
export type EvidenceType = 'measured' | 'connected' | 'estimated' | 'ai' | 'unavailable'

export interface SourceBadgeProps {
  type: EvidenceType
  source?: string
  date?: string
  reason?: string  // for unavailable
}

// ─── Score bands ───────────────────────────────────────────────────
export type ScoreBand = 'critical' | 'watch' | 'solid' | 'strong'

export function scoreBand(score: number): ScoreBand {
  if (score < 40) return 'critical'
  if (score < 60) return 'watch'
  if (score < 80) return 'solid'
  return 'strong'
}

export const bandLabels: Record<ScoreBand, { en: string; ar: string }> = {
  critical: { en: 'Critical', ar: 'حرج' },
  watch:    { en: 'Needs Work', ar: 'يحتاج عمل' },
  solid:    { en: 'Solid', ar: 'جيد' },
  strong:   { en: 'Strong', ar: 'ممتاز' },
}

// ─── KPI card ──────────────────────────────────────────────────────
export interface KpiCard {
  id: string
  titleKey: string
  value: string | number | null
  change?: number        // positive = up, negative = down
  period: string
  source: SourceBadgeProps
  definitionKey: string  // tooltip i18n key
}


import type { NavItem, UserRole } from '../types'

export const NAV_ITEMS: NavItem[] = [
  // ── Workspace ────────────────────────────────────────────────────
  { id: 'dashboard',       label: 'nav.items.dashboard',       icon: 'LayoutDashboard', path: '/dashboard',        group: 'workspace' },
  { id: 'businessProfile', label: 'nav.items.businessProfile', icon: 'Building2',       path: '/business-profile', group: 'workspace' },
  { id: 'createAudit',     label: 'nav.items.createAudit',     icon: 'ScanSearch',      path: '/create-audit',     group: 'workspace',
    allowedRoles: ['platform_admin','agency_owner','agency_member','consultant','business_owner'] },
  { id: 'auditProgress',   label: 'nav.items.auditProgress',   icon: 'Activity',        path: '/audit-progress',   group: 'workspace' },

  // ── Intelligence ─────────────────────────────────────────────────
  { id: 'overview',     label: 'nav.items.overview',     icon: 'BarChart3',  path: '/intelligence/overview',     group: 'intelligence' },
  { id: 'voxSocial',    label: 'nav.items.voxSocial',    icon: 'Share2',     path: '/intelligence/social',       group: 'intelligence' },
  { id: 'voxSEO',       label: 'nav.items.voxSEO',       icon: 'Search',     path: '/intelligence/seo',          group: 'intelligence' },
  { id: 'voxAI',        label: 'nav.items.voxAI',        icon: 'Bot',        path: '/intelligence/ai-visibility',group: 'intelligence' },
  { id: 'competitive',  label: 'nav.items.competitive',  icon: 'Trophy',     path: '/intelligence/competitive',  group: 'intelligence' },
  { id: 'journeyCRO',   label: 'nav.items.journeyCRO',   icon: 'Route',      path: '/intelligence/journey',      group: 'intelligence' },

  // ── Growth ───────────────────────────────────────────────────────
  { id: 'strategyBuilder', label: 'nav.items.strategyBuilder', icon: 'Lightbulb', path: '/growth/strategy',  group: 'growth',
    allowedRoles: ['platform_admin','agency_owner','agency_member','consultant','business_owner'] },
  { id: 'roadmap',         label: 'nav.items.roadmap',         icon: 'Map',        path: '/growth/roadmap',   group: 'growth',
    allowedRoles: ['platform_admin','agency_owner','agency_member','consultant','business_owner'] },
  { id: 'proposals',       label: 'nav.items.proposals',       icon: 'FileText',   path: '/growth/proposals', group: 'growth',
    allowedRoles: ['platform_admin','agency_owner','consultant'] },

  // ── Agency ───────────────────────────────────────────────────────
  { id: 'agencyWorkspace', label: 'nav.items.agencyWorkspace', icon: 'Users',      path: '/agency/workspace', group: 'agency',
    allowedRoles: ['platform_admin','agency_owner','agency_member'] },
  { id: 'branding',        label: 'nav.items.branding',        icon: 'Palette',    path: '/agency/branding',  group: 'agency',
    allowedRoles: ['platform_admin','agency_owner','consultant'] },
  { id: 'sharing',         label: 'nav.items.sharing',         icon: 'Share',      path: '/agency/sharing',   group: 'agency',
    allowedRoles: ['platform_admin','agency_owner','agency_member'] },
  { id: 'team',            label: 'nav.items.team',            icon: 'UsersRound', path: '/agency/team',      group: 'agency',
    allowedRoles: ['platform_admin','agency_owner'] },

  // ── Administration ───────────────────────────────────────────────
  { id: 'billing',       label: 'nav.items.billing',       icon: 'CreditCard',  path: '/admin/billing',       group: 'administration',
    allowedRoles: ['platform_admin','agency_owner','consultant'] },
  { id: 'integrations',  label: 'nav.items.integrations',  icon: 'Plug',        path: '/admin/integrations',  group: 'administration',
    allowedRoles: ['platform_admin','agency_owner','agency_member','consultant','business_owner'] },
  { id: 'notifications', label: 'nav.items.notifications', icon: 'Bell',        path: '/admin/notifications', group: 'administration' },
]

export function visibleNavItems(role: UserRole): NavItem[] {
  return NAV_ITEMS.filter(
    (item) => !item.allowedRoles || item.allowedRoles.includes(role),
  )
}

export const NAV_GROUPS: Array<{ id: NavItem['group']; labelKey: string }> = [
  { id: 'workspace',      labelKey: 'nav.groups.workspace' },
  { id: 'intelligence',   labelKey: 'nav.groups.intelligence' },
  { id: 'growth',         labelKey: 'nav.groups.growth' },
  { id: 'agency',         labelKey: 'nav.groups.agency' },
  { id: 'administration', labelKey: 'nav.groups.administration' },
]


import type { KpiCard } from '../types'

/** Cedar & Co. Dental — sample populated dashboard data */
export const SAMPLE_KPIS: KpiCard[] = [
  {
    id: 'overall',
    titleKey: 'dashboard.kpi.overallScore',
    definitionKey: 'dashboard.kpi.overallScoreDef',
    value: 61,
    change: +4,
    period: 'dashboard.period.asOfLastAudit',
    source: { type: 'measured', source: 'VoxAudit Engine', date: 'Oct 18, 2026' },
  },
  {
    id: 'seo',
    titleKey: 'dashboard.kpi.seoScore',
    definitionKey: 'dashboard.kpi.seoScoreDef',
    value: 58,
    change: -2,
    period: 'dashboard.period.asOfLastAudit',
    source: { type: 'measured', source: 'VoxSEO Crawler', date: 'Oct 18, 2026' },
  },
  {
    id: 'social',
    titleKey: 'dashboard.kpi.socialScore',
    definitionKey: 'dashboard.kpi.socialScoreDef',
    value: 72,
    change: +6,
    period: 'dashboard.period.asOfLastAudit',
    source: { type: 'estimated', source: 'Public data · Meta/IG API' },
  },
  {
    id: 'ai-visibility',
    titleKey: 'dashboard.kpi.aiVisibility',
    definitionKey: 'dashboard.kpi.aiVisibilityDef',
    value: null,  // unavailable — no test run yet
    period: 'dashboard.period.asOfLastAudit',
    source: { type: 'unavailable', reason: 'No AI visibility test run yet' },
  },
  {
    id: 'findings',
    titleKey: 'dashboard.kpi.openFindings',
    definitionKey: 'dashboard.kpi.openFindingsDef',
    value: 14,
    period: 'dashboard.period.asOfLastAudit',
    source: { type: 'measured', source: 'VoxAudit Engine', date: 'Oct 18, 2026' },
  },
  {
    id: 'proposals',
    titleKey: 'dashboard.kpi.proposalsSent',
    definitionKey: 'dashboard.kpi.proposalsSentDef',
    value: 3,
    period: 'dashboard.period.thisMonth',
    source: { type: 'connected', source: 'GoHighLevel CRM' },
  },
]


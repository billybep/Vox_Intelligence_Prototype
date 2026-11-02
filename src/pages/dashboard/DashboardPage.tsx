import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { ScanSearch, Rocket } from 'lucide-react'
import { AppShell } from '../../components/layout/AppShell'
import { KpiCard } from '../../components/ui/KpiCard'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { useAuth } from '../../hooks/useAuth'
import { SAMPLE_KPIS } from '../../data/sampleDashboard'

/** Empty state — shown when no audits have been run */
function EmptyDashboard() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-md space-y-4">
        {/* Simple mascot stand-in for prototype */}
        <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center text-4xl"
          style={{ background: 'linear-gradient(135deg, var(--color-brand-cyan)20, var(--color-brand-magenta)20)' }}>
          🤖
        </div>
        <h2 className="text-xl font-bold text-[var(--color-neutral-900)]">
          {t('dashboard.emptyHeadline')}
        </h2>
        <p className="text-sm text-[var(--color-neutral-500)] leading-relaxed">
          {t('dashboard.emptyBody')}
        </p>
        <Button size="lg" onClick={() => navigate('/create-audit')}>
          <ScanSearch size={18} />
          {t('dashboard.runFirstAudit')}
        </Button>
      </div>
    </div>
  )
}

/** Populated state — sample data */
function PopulatedDashboard() {
  const { t } = useTranslation()
  const { user } = useAuth()

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Welcome header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[var(--color-neutral-900)]">
            {t('dashboard.welcome', { name: user?.name?.split(' ')[0] ?? '' })}
          </h2>
          <p className="text-sm text-[var(--color-neutral-500)] mt-0.5">
            {t('dashboard.lastAudit')}: <strong>Oct 18, 2026</strong>
          </p>
        </div>
        <Button size="md">
          <ScanSearch size={16} />
          {t('common.createAudit')}
        </Button>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {SAMPLE_KPIS.map((kpi) => (
          <KpiCard key={kpi.id} data={kpi} />
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: 'var(--color-brand-blue)20', color: 'var(--color-brand-blue)' }}>
            <ScanSearch size={20} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-sm text-[var(--color-neutral-900)]">14 Open Findings</h3>
            <p className="text-xs text-[var(--color-neutral-500)] mt-0.5">Review and approve findings before generating strategy recommendations.</p>
            <button className="mt-2 text-xs font-semibold text-[var(--color-brand-blue)] hover:underline">
              {t('common.viewAll')} →
            </button>
          </div>
        </Card>

        <Card className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: 'var(--color-status-good-bg)', color: 'var(--color-status-good)' }}>
            <Rocket size={20} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-sm text-[var(--color-neutral-900)]">3 Proposals Sent</h3>
            <p className="text-xs text-[var(--color-neutral-500)] mt-0.5">2 proposals are awaiting client review. Track activity in your portal.</p>
            <button className="mt-2 text-xs font-semibold text-[var(--color-brand-blue)] hover:underline">
              {t('common.viewAll')} →
            </button>
          </div>
        </Card>
      </div>
    </div>
  )
}

interface DashboardPageProps {
  empty?: boolean
}

export function DashboardPage({ empty = false }: DashboardPageProps) {
  const { t } = useTranslation()
  return (
    <AppShell pageTitle={t('dashboard.title')}>
      {empty ? <EmptyDashboard /> : <PopulatedDashboard />}
    </AppShell>
  )
}


import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'

interface AppShellProps {
  children: ReactNode
  pageTitle?: string
  showSampleBanner?: boolean
}

export function AppShell({ children, pageTitle, showSampleBanner = true }: AppShellProps) {
  const { t } = useTranslation()

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {showSampleBanner && (
          <div className="sample-banner" role="status">
            ⚠ {t('app.sampleBanner')}
          </div>
        )}
        <TopBar title={pageTitle} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}


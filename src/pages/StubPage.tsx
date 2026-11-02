import { AppShell } from '../components/layout/AppShell'

interface StubPageProps {
  title: string
  sprint?: number
}

/** Placeholder for screens not yet built in this sprint */
export function StubPage({ title, sprint = 2 }: StubPageProps) {
  return (
    <AppShell pageTitle={title}>
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-2">
          <div className="text-4xl">🚧</div>
          <h2 className="text-lg font-bold text-[var(--color-neutral-700)]">{title}</h2>
          <p className="text-sm text-[var(--color-neutral-400)]">Coming in Sprint {sprint}</p>
        </div>
      </div>
    </AppShell>
  )
}

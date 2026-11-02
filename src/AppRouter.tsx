import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { SignInPage } from './pages/auth/SignInPage'
import { DashboardPage } from './pages/dashboard/DashboardPage'
import { StubPage } from './pages/StubPage'
import { useAuth } from './hooks/useAuth'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/sign-in" replace />
  return <>{children}</>
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up"  element={<SignInPage />} />

        {/* Workspace */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/dashboard/empty" element={<ProtectedRoute><DashboardPage empty /></ProtectedRoute>} />
        <Route path="/business-profile" element={<ProtectedRoute><StubPage title="Business Profile" sprint={2} /></ProtectedRoute>} />
        <Route path="/create-audit"     element={<ProtectedRoute><StubPage title="Create Audit" sprint={2} /></ProtectedRoute>} />
        <Route path="/audit-progress"   element={<ProtectedRoute><StubPage title="Audit Progress Center" sprint={2} /></ProtectedRoute>} />

        {/* Intelligence */}
        <Route path="/intelligence/overview"      element={<ProtectedRoute><StubPage title="Intelligence Overview" sprint={3} /></ProtectedRoute>} />
        <Route path="/intelligence/social"        element={<ProtectedRoute><StubPage title="VoxSocial" sprint={3} /></ProtectedRoute>} />
        <Route path="/intelligence/seo"           element={<ProtectedRoute><StubPage title="VoxSEO" sprint={3} /></ProtectedRoute>} />
        <Route path="/intelligence/ai-visibility" element={<ProtectedRoute><StubPage title="VoxAI Visibility" sprint={3} /></ProtectedRoute>} />
        <Route path="/intelligence/competitive"   element={<ProtectedRoute><StubPage title="Competitive Intelligence" sprint={3} /></ProtectedRoute>} />
        <Route path="/intelligence/journey"       element={<ProtectedRoute><StubPage title="Journey & CRO" sprint={3} /></ProtectedRoute>} />

        {/* Growth */}
        <Route path="/growth/strategy"  element={<ProtectedRoute><StubPage title="Strategy Builder" sprint={4} /></ProtectedRoute>} />
        <Route path="/growth/roadmap"   element={<ProtectedRoute><StubPage title="90-Day Roadmap" sprint={4} /></ProtectedRoute>} />
        <Route path="/growth/proposals" element={<ProtectedRoute><StubPage title="Proposals" sprint={4} /></ProtectedRoute>} />

        {/* Agency */}
        <Route path="/agency/workspace" element={<ProtectedRoute><StubPage title="Agency Workspace" sprint={4} /></ProtectedRoute>} />
        <Route path="/agency/branding"  element={<ProtectedRoute><StubPage title="Brand & White Label" sprint={4} /></ProtectedRoute>} />
        <Route path="/agency/sharing"   element={<ProtectedRoute><StubPage title="Sharing & Client Portal" sprint={4} /></ProtectedRoute>} />
        <Route path="/agency/team"      element={<ProtectedRoute><StubPage title="Team & Roles" sprint={4} /></ProtectedRoute>} />

        {/* Administration */}
        <Route path="/admin/billing"       element={<ProtectedRoute><StubPage title="Usage & Billing" sprint={4} /></ProtectedRoute>} />
        <Route path="/admin/integrations"  element={<ProtectedRoute><StubPage title="Integrations" sprint={2} /></ProtectedRoute>} />
        <Route path="/admin/notifications" element={<ProtectedRoute><StubPage title="Notifications" sprint={2} /></ProtectedRoute>} />

        {/* Default */}
        <Route path="/" element={<Navigate to="/sign-in" replace />} />
        <Route path="*" element={<Navigate to="/sign-in" replace />} />
      </Routes>
    </BrowserRouter>
  )
}


import { AuthProvider } from './hooks/useAuth'
import { AppRouter } from './AppRouter'
import './i18n'

export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}

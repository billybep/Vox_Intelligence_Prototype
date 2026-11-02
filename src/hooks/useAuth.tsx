import { createContext, useContext, useState, type ReactNode } from 'react'
import type { User, UserRole } from '../types'

interface AuthCtx {
  user: User | null
  signIn: (role: UserRole) => void
  signOut: () => void
}

const AuthContext = createContext<AuthCtx | null>(null)

/** Sample users for prototype role-switching */
const SAMPLE_USERS: Record<UserRole, User> = {
  platform_admin: {
    id: 'u-pa',
    name: 'Platform Admin',
    email: 'admin@voxlumedia.com',
    role: 'platform_admin',
    workspaceType: 'platform',
    locale: 'en',
  },
  agency_owner: {
    id: 'u-ao',
    name: 'Sarah Al-Najjar',
    email: 'sarah@growagency.com',
    role: 'agency_owner',
    workspaceType: 'agency',
    locale: 'en',
  },
  agency_member: {
    id: 'u-am',
    name: 'Ali Hassan',
    email: 'ali@growagency.com',
    role: 'agency_member',
    workspaceType: 'agency',
    locale: 'ar',
  },
  consultant: {
    id: 'u-co',
    name: 'James Okafor',
    email: 'james@joconsult.com',
    role: 'consultant',
    workspaceType: 'consultant',
    locale: 'en',
  },
  business_owner: {
    id: 'u-bo',
    name: 'Layla Khalil',
    email: 'layla@cedarcodental.com',
    role: 'business_owner',
    workspaceType: 'business',
    locale: 'ar',
  },
  client_user: {
    id: 'u-cl',
    name: 'Client Viewer',
    email: 'client@example.com',
    role: 'client_user',
    workspaceType: 'client',
    locale: 'en',
  },
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const signIn = (role: UserRole) => setUser(SAMPLE_USERS[role])
  const signOut = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}


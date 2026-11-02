import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AlertCircle } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { useLocale } from '../../hooks/useLocale'
import { Button } from '../../components/ui/Button'
import type { UserRole } from '../../types'

type AuthError = 'invalidCredentials' | 'inviteExpired' | 'ssoFailed' | 'generic' | null

/** Prototype: simulate different sign-in outcomes via role selection */
const ROLE_OPTIONS: { role: UserRole; label: string }[] = [
  { role: 'agency_owner',  label: 'Agency Owner' },
  { role: 'agency_member', label: 'Agency Analyst' },
  { role: 'consultant',    label: 'Consultant' },
  { role: 'business_owner',label: 'Business Owner' },
  { role: 'platform_admin',label: 'Platform Admin' },
]

export function SignInPage() {
  const { t } = useTranslation()
  const { signIn } = useAuth()
  const { toggle, locale } = useLocale()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<AuthError>(null)
  const [selectedRole, setSelectedRole] = useState<UserRole>('agency_owner')

  function handleGoogleSignIn() {
    setLoading(true)
    setError(null)
    // Prototype: simulate async then sign in
    setTimeout(() => {
      signIn(selectedRole)
      setLoading(false)
      navigate('/dashboard')
    }, 800)
  }

  function handleErrorDemo(e: AuthError) {
    setError(e)
  }

  return (
    <div className="min-h-screen flex" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Left panel — brand shell */}
      <div
        className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden"
        style={{ background: 'var(--color-brand-shell)' }}
      >
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(var(--color-brand-cyan) 1px, transparent 1px), linear-gradient(90deg, var(--color-brand-cyan) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <span
            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-black text-white"
            style={{ background: 'linear-gradient(135deg, var(--color-brand-cyan), var(--color-brand-magenta))' }}
          >
            V
          </span>
          <span className="text-white font-semibold">
            VoxAudit <span className="text-[var(--color-brand-cyan)]">Intelligence</span>
          </span>
        </div>

        {/* Headline */}
        <div className="relative">
          <h1 className="font-display text-5xl font-bold text-white leading-tight mb-4">
            {t('auth.headline1')}<br />
            {t('auth.headline2')}<br />
            <span style={{ background: 'linear-gradient(90deg, var(--color-brand-cyan), var(--color-brand-magenta))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {t('auth.headline3')}
            </span>
          </h1>
          <p className="text-[#8892b4] text-lg leading-relaxed max-w-sm">
            {t('auth.pitch')}
          </p>
        </div>

        {/* Terms */}
        <p className="relative text-[#5b6490] text-xs">
          {t('auth.termsNote')}{' '}
          <a href="#" className="underline hover:text-white">{t('auth.terms')}</a>{' '}
          {t('auth.and')}{' '}
          <a href="#" className="underline hover:text-white">{t('auth.privacy')}</a>.
        </p>
      </div>

      {/* Right panel — sign-in form */}
      <div className="flex flex-col justify-center items-center flex-1 px-8 py-12 bg-[var(--color-canvas-bg)]">
        {/* Language toggle */}
        <div className="absolute top-4 end-4">
          <button
            onClick={toggle}
            className="px-3 py-1.5 rounded-lg border border-[var(--color-canvas-border)] text-xs font-semibold text-[var(--color-neutral-600)] hover:border-[var(--color-brand-blue)] hover:text-[var(--color-brand-blue)] transition-colors"
          >
            {locale === 'en' ? 'العربية' : 'English'}
          </button>
        </div>

        <div className="w-full max-w-sm space-y-6">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-2">
            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-white"
              style={{ background: 'linear-gradient(135deg, var(--color-brand-cyan), var(--color-brand-magenta))' }}
            >
              V
            </span>
            <span className="font-semibold text-sm">VoxAudit Intelligence</span>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[var(--color-neutral-900)]">{t('auth.signIn')}</h2>
            <p className="text-sm text-[var(--color-neutral-500)] mt-1">{t('auth.pitch')}</p>
          </div>

          {/* Error banner */}
          {error && (
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--color-status-critical-bg)] border border-red-200 text-[var(--color-status-critical)] text-sm">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{t(`auth.error.${error}`)}</span>
            </div>
          )}

          {/* Prototype role picker */}
          <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-800 space-y-2">
            <p className="font-semibold">🧪 Prototype — pick a role to sign in as:</p>
            <div className="flex flex-wrap gap-1.5">
              {ROLE_OPTIONS.map((opt) => (
                <button
                  key={opt.role}
                  onClick={() => setSelectedRole(opt.role)}
                  className={`px-2 py-1 rounded border text-xs font-medium transition-colors ${
                    selectedRole === opt.role
                      ? 'bg-[var(--color-brand-blue)] text-white border-[var(--color-brand-blue)]'
                      : 'bg-white text-[var(--color-neutral-600)] border-[var(--color-canvas-border)]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Google sign-in */}
          <Button
            variant="secondary"
            size="lg"
            className="w-full"
            onClick={handleGoogleSignIn}
            loading={loading}
          >
            <svg className="w-4 h-4" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.35-8.16 2.35-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            {t('auth.signInGoogle')}
          </Button>

          <div className="relative flex items-center gap-3">
            <hr className="flex-1 border-[var(--color-canvas-border)]" />
            <span className="text-xs text-[var(--color-neutral-400)]">or</span>
            <hr className="flex-1 border-[var(--color-canvas-border)]" />
          </div>

          {/* Email form (prototype — no backend) */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleGoogleSignIn() }}
            className="space-y-3"
          >
            <div>
              <label className="block text-sm font-medium text-[var(--color-neutral-700)] mb-1">
                {t('auth.email')}
              </label>
              <input
                type="email"
                placeholder="you@company.com"
                className="w-full px-3 py-2 rounded-lg border border-[var(--color-canvas-border)] text-sm bg-white text-[var(--color-neutral-900)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] focus:border-transparent placeholder:text-[var(--color-neutral-300)]"
              />
            </div>
            <Button variant="primary" size="lg" className="w-full" type="submit" loading={loading}>
              {t('auth.signInEmail')}
            </Button>
          </form>

          {/* Error demo buttons (prototype only) */}
          <details className="text-xs text-[var(--color-neutral-400)]">
            <summary className="cursor-pointer hover:text-[var(--color-neutral-600)]">Demo error states</summary>
            <div className="mt-2 flex flex-wrap gap-2">
              {(['invalidCredentials','inviteExpired','ssoFailed','generic'] as AuthError[]).map((e) => (
                <button key={String(e)} onClick={() => handleErrorDemo(e)}
                  className="px-2 py-1 rounded border border-[var(--color-canvas-border)] text-xs text-[var(--color-neutral-600)] hover:border-red-300">
                  {e}
                </button>
              ))}
              <button onClick={() => setError(null)}
                className="px-2 py-1 rounded border border-[var(--color-canvas-border)] text-xs text-[var(--color-neutral-600)]">
                clear
              </button>
            </div>
          </details>

          <p className="text-center text-sm text-[var(--color-neutral-500)]">
            {t('auth.noAccount')}{' '}
            <a href="#" className="text-[var(--color-brand-blue)] font-medium hover:underline">{t('auth.signUp')}</a>
          </p>
        </div>
      </div>
    </div>
  )
}


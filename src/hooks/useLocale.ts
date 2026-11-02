import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

type Locale = 'en' | 'ar'

/**
 * Returns current locale and a toggle function.
 * Switching locale also updates <html lang> and <html dir>
 * so all logical CSS properties (margin-inline-start, etc.) flip automatically.
 */
export function useLocale() {
  const { i18n } = useTranslation()
  const locale = (i18n.language === 'ar' ? 'ar' : 'en') as Locale

  const setLocale = useCallback(
    (next: Locale) => {
      i18n.changeLanguage(next)
      document.documentElement.lang = next
      document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr'
    },
    [i18n],
  )

  const toggle = useCallback(() => {
    setLocale(locale === 'en' ? 'ar' : 'en')
  }, [locale, setLocale])

  return { locale, setLocale, toggle, isRTL: locale === 'ar' }
}


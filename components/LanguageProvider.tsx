'use client'

import { createContext, useContext, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { LOCALE_COOKIE, translate, type Locale } from '@/lib/i18n'

const LanguageContext = createContext<Locale>('fr')

export default function LanguageProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LanguageContext.Provider value={locale}>{children}</LanguageContext.Provider>
}

export function useTranslation() {
  const locale = useContext(LanguageContext)
  return (text: string) => translate(text, locale)
}

/** Translate only rendered strings; IDs, URLs, data keys and React elements stay intact. */
export function Text({ children }: { children: ReactNode }) {
  const t = useTranslation()
  return <>{typeof children === 'string' ? t(children) : children}</>
}

export function LanguageSwitch() {
  const locale = useContext(LanguageContext)
  const router = useRouter()
  return (
    <div role="group" aria-label={locale === 'fr' ? 'Langue du site' : 'Site language'} className="ml-auto shrink-0 flex gap-1 text-xs font-mono">
      {(['fr', 'en'] as const).map(language => (
        <button key={language} type="button" lang={language} aria-label={language === 'fr' ? 'Français' : 'English'} aria-pressed={locale === language}
          className={`rounded px-2 py-1 transition-colors ${locale === language ? 'bg-white/10 text-white' : 'text-muted hover:text-white'}`}
          onClick={() => {
            document.cookie = `${LOCALE_COOKIE}=${language}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`
            router.refresh()
          }}>
          {language.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

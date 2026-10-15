import french from '@/data/fr.json'

export type Locale = 'fr' | 'en'
export const LOCALE_COOKIE = 'site_locale'

export function translate(text: string, locale: Locale): string {
  if (locale === 'en') return text
  const dictionary = french as Record<string, string>
  const trimmed = text.trim()
  const translated = Object.prototype.hasOwnProperty.call(dictionary, trimmed) ? dictionary[trimmed] : undefined
  if (translated !== undefined) return text.replace(trimmed, translated)
  // Navigation labels in the footer are assembled from page names.
  for (const [prefix, replacement] of [['Start with ', 'Commencer par '], ['Continue to ', 'Continuer vers '], ['Back to ', 'Retour vers ']]) {
    if (trimmed.startsWith(prefix)) return replacement + translate(trimmed.slice(prefix.length), locale)
  }
  return text
}

import 'server-only'
import { cookies } from 'next/headers'
import { LOCALE_COOKIE, translate, type Locale } from './i18n'

export function getLocale(): Locale {
  return cookies().get(LOCALE_COOKIE)?.value === 'en' ? 'en' : 'fr'
}

export function translateForRequest(text: string): string {
  return translate(text, getLocale())
}

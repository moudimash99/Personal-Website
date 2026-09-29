import { promises as fs } from 'fs'
import path from 'path'
import crypto from 'crypto'

// Personalised CV links: each code maps to who it was sent to; every open / page view is appended to a JSONL log.

export type TrackedLink = {
  code: string
  recipient: string
  company?: string
  note?: string
  target: string
  createdAt: string
}

export type TrackEvent = {
  t: string
  code: string
  type: 'open' | 'view'
  path?: string
  visitor: string
  bot: boolean
  ua: string
  referer?: string
  lang?: string
  /** Browser window size, "390x844", sent by the page-view beacon */
  viewport?: string
}

export type Device = 'mobile' | 'tablet' | 'desktop'

// Window width wins when the beacon reported it (iPads send a desktop user agent); otherwise guess from the UA.
export function deviceOf(e: Pick<TrackEvent, 'ua' | 'viewport'>): Device {
  const w = Number(e.viewport?.split('x')[0])
  if (w) return w < 640 ? 'mobile' : w < 1024 ? 'tablet' : 'desktop'
  if (/ipad|tablet|android(?!.*mobile)/i.test(e.ua)) return 'tablet'
  if (/mobi|iphone|ipod|android/i.test(e.ua)) return 'mobile'
  return 'desktop'
}

export const REF_COOKIE = 'cv_ref'

const DIR = process.env.TRACKING_DIR || path.join(process.cwd(), 'tracking-data')
const LINKS_FILE = path.join(DIR, 'links.json')
const EVENTS_FILE = path.join(DIR, 'events.jsonl')

// Link unfurlers, mail scanners and scripts that "open" links without a human behind them
const BOT_UA =
  /bot|crawl|spider|slurp|preview|facebookexternalhit|whatsapp|telegram|skype|microsoft office|outlook|googleimageproxy|safelinks|proofpoint|mimecast|barracuda|scan|headless|curl|wget|python|go-http|java\/|okhttp|axios|node-fetch|^$/i

export function isBot(ua: string, method = 'GET') {
  return method !== 'GET' || BOT_UA.test(ua)
}

export function isValidCode(code: string) {
  return /^[a-z0-9-]{3,40}$/i.test(code)
}

async function ensureDir() {
  await fs.mkdir(DIR, { recursive: true })
}

export async function getLinks(): Promise<TrackedLink[]> {
  try {
    return JSON.parse(await fs.readFile(LINKS_FILE, 'utf8'))
  } catch {
    return []
  }
}

export async function getLink(code: string) {
  return (await getLinks()).find((l) => l.code.toLowerCase() === code.toLowerCase())
}

const ALPHABET = 'abcdefghjkmnpqrstuvwxyz23456789'

function newCode(existing: Set<string>) {
  for (;;) {
    const bytes = crypto.randomBytes(6)
    const code = Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join('')
    if (!existing.has(code)) return code
  }
}

export async function createLink(input: Omit<TrackedLink, 'code' | 'createdAt'> & { code?: string }) {
  await ensureDir()
  const links = await getLinks()
  const existing = new Set(links.map((l) => l.code.toLowerCase()))
  const code = input.code?.trim().toLowerCase() || newCode(existing)
  if (!isValidCode(code)) throw new Error('Code must be 3-40 letters, digits or dashes')
  if (existing.has(code)) throw new Error(`Code "${code}" already exists`)
  const link: TrackedLink = { ...input, code, createdAt: new Date().toISOString() }
  links.push(link)
  await fs.writeFile(LINKS_FILE, JSON.stringify(links, null, 2))
  return link
}

export async function updateLink(code: string, patch: Partial<Omit<TrackedLink, 'code' | 'createdAt'>>) {
  const links = await getLinks()
  const link = links.find((l) => l.code === code.toLowerCase())
  if (!link) throw new Error(`Code "${code}" is not registered`)
  Object.assign(link, Object.fromEntries(Object.entries(patch).filter(([, v]) => v !== undefined)))
  await fs.writeFile(LINKS_FILE, JSON.stringify(links, null, 2))
  return link
}

export async function deleteLink(code: string) {
  const links = await getLinks()
  await fs.writeFile(LINKS_FILE, JSON.stringify(links.filter((l) => l.code !== code), null, 2))
}

export async function logEvent(e: TrackEvent) {
  await ensureDir()
  await fs.appendFile(EVENTS_FILE, JSON.stringify(e) + '\n')
}

export async function readEvents(): Promise<TrackEvent[]> {
  try {
    const raw = await fs.readFile(EVENTS_FILE, 'utf8')
    return raw
      .split('\n')
      .filter(Boolean)
      .flatMap((line) => {
        try {
          return [JSON.parse(line) as TrackEvent]
        } catch {
          return []
        }
      })
  } catch {
    return []
  }
}

export type LinkStats = ReturnType<typeof summarize>

export function summarize(events: TrackEvent[]) {
  const opens = events.filter((e) => e.type === 'open')
  const human = opens.filter((e) => !e.bot)
  const views = events.filter((e) => e.type === 'view')
  const pages = new Map<string, number>()
  views.forEach((v) => pages.set(v.path || '/', (pages.get(v.path || '/') || 0) + 1))
  // One device per visitor, taken from their latest human event
  const deviceByVisitor = new Map<string, Device>()
  ;[...human, ...views].sort((a, b) => a.t.localeCompare(b.t)).forEach((e) => deviceByVisitor.set(e.visitor, deviceOf(e)))
  const devices = new Map<Device, number>()
  deviceByVisitor.forEach((d) => devices.set(d, (devices.get(d) || 0) + 1))
  return {
    opens: human.length,
    botOpens: opens.length - human.length,
    visitors: new Set([...human, ...views].map((e) => e.visitor)).size,
    pageViews: views.length,
    firstOpen: human[0]?.t,
    lastSeen: [...human, ...views].map((e) => e.t).sort().pop(),
    pages: [...pages.entries()].sort((a, b) => b[1] - a[1]),
    devices: [...devices.entries()].sort((a, b) => b[1] - a[1]),
  }
}

// Every code that is registered or has been hit, registered or not. Unregistered codes are tracked too,
// so a code handed out before being entered here keeps its full history once it's registered.
export async function getOverview() {
  const [links, events] = await Promise.all([getLinks(), readEvents()])
  const byCode = new Map<string, TrackEvent[]>()
  events.forEach((e) => byCode.set(e.code, [...(byCode.get(e.code) || []), e]))
  const registered = new Set(links.map((l) => l.code))
  const entries = [
    ...links.map((link) => ({ code: link.code, link: link as TrackedLink | undefined })),
    ...[...byCode.keys()].filter((c) => !registered.has(c)).map((code) => ({ code, link: undefined })),
  ].map(({ code, link }) => {
    const ev = byCode.get(code) || []
    return { code, link, events: ev, stats: summarize(ev) }
  })
  return entries.sort((a, b) =>
    (b.stats.lastSeen || b.link?.createdAt || '').localeCompare(a.stats.lastSeen || a.link?.createdAt || ''),
  )
}

// Pseudonymous visitor id: lets us tell "same person twice" from "two people" without storing IPs
export function visitorId(headers: Headers) {
  const ip = headers.get('x-forwarded-for')?.split(',')[0].trim() || headers.get('x-real-ip') || ''
  const ua = headers.get('user-agent') || ''
  const salt = process.env.TRACKING_SALT || process.env.ADMIN_KEY || 'cv-links'
  return crypto.createHash('sha256').update(`${salt}|${ip}|${ua}`).digest('hex').slice(0, 10)
}

export function requestMeta(headers: Headers, method = 'GET') {
  const ua = headers.get('user-agent') || ''
  return {
    visitor: visitorId(headers),
    bot: isBot(ua, method),
    ua: ua.slice(0, 300),
    referer: headers.get('referer') || undefined,
    lang: headers.get('accept-language')?.split(',')[0] || undefined,
  }
}

export function checkAdminKey(key: string | undefined | null) {
  const expected = process.env.ADMIN_KEY
  if (!expected || !key) return false
  const a = Buffer.from(key)
  const b = Buffer.from(expected)
  return a.length === b.length && crypto.timingSafeEqual(a, b)
}

// API auth: `Authorization: Bearer <ADMIN_KEY>` (or `x-admin-key: <ADMIN_KEY>`)
export function isApiAuthorized(headers: Headers) {
  const bearer = headers.get('authorization')?.replace(/^Bearer\s+/i, '')
  return checkAdminKey(bearer || headers.get('x-admin-key'))
}

export function linkUrl(code: string, headers: Headers) {
  const base = process.env.SITE_URL || `${headers.get('x-forwarded-proto') || 'https'}://${headers.get('host')}`
  return `${base}/r/${code}`
}

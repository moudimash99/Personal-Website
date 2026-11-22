import type { getOverview, TrackEvent } from './tracking'

// Turns the raw CV-link overview into dashboard material: who opened what, what's new, who hasn't opened yet.

export type OverviewEntry = Awaited<ReturnType<typeof getOverview>>[number]

const DAY = 864e5
const TZ = 'Europe/Paris'
// An open counts 3x a page view, and any event loses half its weight every 3 days
const HALF_LIFE_DAYS = 3
const OPEN_WEIGHT = 3
// Events from the same person on the same link less than 30 minutes apart are one visit
const VISIT_GAP = 30 * 60e3

export type Signal = 'live' | 'new' | 'returning' | 'shared' | 'deep'

/** Same definition as summarize(): page views always count, opens only when not from a bot or scanner. */
export const isHuman = (e: TrackEvent) => e.type === 'view' || !e.bot

const dayFmt = new Intl.DateTimeFormat('en-CA', { timeZone: TZ })
export const dayKey = (t: string | number) => dayFmt.format(new Date(t))

export function ago(iso: string | undefined, now: number) {
  if (!iso) return '—'
  const m = Math.round((now - Date.parse(iso)) / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.round(m / 60)
  if (h < 24) return `${h}h ago`
  const d = Math.round(h / 24)
  if (d < 45) return `${d}d ago`
  return `${Math.round(d / 30)}mo ago`
}

function insightOf(entry: OverviewEntry, now: number) {
  const human = entry.events.filter(isHuman)
  const score = human.reduce(
    (s, e) => s + (e.type === 'open' ? OPEN_WEIGHT : 1) * 0.5 ** ((now - Date.parse(e.t)) / DAY / HALF_LIFE_DAYS),
    0,
  )
  const activeDays = new Set(human.map((e) => dayKey(e.t))).size
  // Visitors numbered in order of first appearance, so the feed can say "person 2"
  const visitorNo = new Map<string, number>()
  human.forEach((e) => visitorNo.has(e.visitor) || visitorNo.set(e.visitor, visitorNo.size + 1))
  const { stats } = entry
  const firstHuman = human[0]?.t

  const signals: Signal[] = []
  if (stats.lastSeen && now - Date.parse(stats.lastSeen) < 3600e3) signals.push('live')
  if (firstHuman && now - Date.parse(firstHuman) < 2 * DAY) signals.push('new')
  if (activeDays >= 2) signals.push('returning')
  if (visitorNo.size >= 2) signals.push('shared')
  if (stats.pageViews >= 5 || stats.pages.length >= 3) signals.push('deep')

  return {
    score,
    signals,
    activeDays,
    visitorNo,
    thisWeek: human.filter((e) => now - Date.parse(e.t) < 7 * DAY).length,
    status: (stats.opens || stats.pageViews ? 'opened' : stats.botOpens ? 'scanned' : 'waiting') as
      | 'opened'
      | 'scanned'
      | 'waiting',
  }
}

export type Row = OverviewEntry & { insight: ReturnType<typeof insightOf> }

/** The lists of "All links". An unregistered code that was opened is in both Opened and Unregistered. */
export type Kind = 'opened' | 'scanned' | 'waiting' | 'unregistered'
export const inKind = (r: Row, kind: Kind | 'all') =>
  kind === 'all' || (kind === 'unregistered' ? !r.link : kind === 'opened' ? r.insight.status === 'opened' : !!r.link && r.insight.status === kind)
/** The list to show a row in when it is asked for by itself. */
export const kindOf = (r: Row): Kind => (r.insight.status === 'opened' ? 'opened' : !r.link ? 'unregistered' : r.insight.status)

/** Opened links of one company: several roles opened at the same company read as one line. */
export type Group = { key: string; company: string; rows: Row[]; opens: number; pageViews: number; lastSeen?: string; signals: Signal[] }

function groupByCompany(rows: Row[]): Group[] {
  const groups = new Map<string, Group>()
  for (const r of rows) {
    const company = r.link?.company?.trim() || ''
    const key = company ? company.toLowerCase() : r.code
    const g = groups.get(key) || { key, company, rows: [], opens: 0, pageViews: 0, lastSeen: undefined, signals: [] }
    g.rows.push(r)
    g.opens += r.stats.opens
    g.pageViews += r.stats.pageViews
    if ((r.stats.lastSeen || '') > (g.lastSeen || '')) g.lastSeen = r.stats.lastSeen
    r.insight.signals.forEach((s) => g.signals.includes(s) || g.signals.push(s))
    groups.set(key, g)
  }
  // Rows arrive ranked, so each group sits where its hottest row would
  return [...groups.values()]
}

export function buildDashboard(overview: OverviewEntry[], now = Date.now()) {
  const rows: Row[] = overview.map((o) => ({ ...o, insight: insightOf(o, now) }))
  const registered = rows.filter((r) => r.link)
  const human = rows.flatMap((row) => row.events.filter(isHuman).map((e) => ({ e, row })))
  const within = (e: TrackEvent, fromDays: number, toDays = 0) => {
    const age = now - Date.parse(e.t)
    return age < fromDays * DAY && age >= toDays * DAY
  }

  const opens = human.filter(({ e }) => e.type === 'open')
  const views = human.filter(({ e }) => e.type === 'view')
  const visitors = new Set(human.map(({ e }) => e.visitor))
  const openedRegistered = registered.filter((r) => r.insight.status === 'opened').length

  const kpis = {
    opens: opens.length,
    opensWeek: opens.filter(({ e }) => within(e, 7)).length,
    opensPrevWeek: opens.filter(({ e }) => within(e, 14, 7)).length,
    visitors: visitors.size,
    visitorsWeek: new Set(human.filter(({ e }) => within(e, 7)).map(({ e }) => e.visitor)).size,
    pageViews: views.length,
    pagesPerVisitor: visitors.size ? views.length / visitors.size : 0,
    openRate: registered.length ? openedRegistered / registered.length : 0,
    openedRegistered,
    registered: registered.length,
    activeLinks: rows.filter((r) => r.insight.thisWeek > 0).length,
    lastEvent: human.map(({ e }) => e.t).sort().pop(),
  }

  // Last 30 calendar days in Paris time, stepped from UTC noon so DST never skips or repeats a day
  const [y, m, d] = dayKey(now).split('-').map(Number)
  const daily = Array.from({ length: 30 }, (_, i) => {
    const key = new Date(Date.UTC(y, m - 1, d - 29 + i, 12)).toISOString().slice(0, 10)
    return { key, opens: 0, views: 0, who: new Set<string>() }
  })
  const byDay = new Map(daily.map((b) => [b.key, b]))
  human.forEach(({ e, row }) => {
    const bucket = byDay.get(dayKey(e.t))
    if (!bucket) return
    bucket[e.type === 'open' ? 'opens' : 'views']++
    bucket.who.add(row.link?.recipient || row.code)
  })

  const pages = new Map<string, { views: number; visitors: Set<string>; who: Set<string> }>()
  views.forEach(({ e, row }) => {
    const p = e.path || '/'
    const entry = pages.get(p) || { views: 0, visitors: new Set(), who: new Set() }
    entry.views++
    entry.visitors.add(e.visitor)
    entry.who.add(row.link?.recipient || row.code)
    pages.set(p, entry)
  })

  // Group the event stream into visits for the feed
  const visits: { row: Row; visitor: string; start: string; end: string; opened: boolean; pages: string[]; device: TrackEvent }[] = []
  const openVisit = new Map<string, (typeof visits)[number]>()
  ;[...human].sort((a, b) => a.e.t.localeCompare(b.e.t)).forEach(({ e, row }) => {
    const id = `${row.code}|${e.visitor}`
    let v = openVisit.get(id)
    if (!v || Date.parse(e.t) - Date.parse(v.end) > VISIT_GAP) {
      v = { row, visitor: e.visitor, start: e.t, end: e.t, opened: false, pages: [], device: e }
      visits.push(v)
      openVisit.set(id, v)
    }
    v.end = e.t
    if (e.type === 'open') v.opened = true
    else if (!v.pages.includes(e.path || '/')) v.pages.push(e.path || '/')
    if (e.viewport) v.device = e
  })

  const recency = (r: Row) => r.stats.lastSeen || r.link?.createdAt || ''
  const ranked = [...rows].sort((a, b) => b.insight.score - a.insight.score || recency(b).localeCompare(recency(a)))
  // Oldest first: those are the ones worth a follow-up
  const waiting = registered
    .filter((r) => r.insight.status !== 'opened')
    .sort((a, b) => a.link!.createdAt.localeCompare(b.link!.createdAt))
  const sentAgo = (r: Row) => (now - Date.parse(r.link!.createdAt)) / DAY
  return {
    kpis,
    daily,
    // Every link a person opened, ranked by activity (then most recent), one line per company
    opened: groupByCompany(ranked.filter((r) => r.insight.status === 'opened')),
    feed: visits.reverse(),
    topPages: [...pages.entries()].sort((a, b) => b[1].views - a[1].views),
    waiting,
    scanned: waiting.filter((r) => r.insight.status === 'scanned'),
    // Sent 7 to 14 days ago and still not opened: the follow-ups due now
    followUp: waiting.filter((r) => r.insight.status === 'waiting' && sentAgo(r) >= 7 && sentAgo(r) < 14),
    all: ranked,
  }
}

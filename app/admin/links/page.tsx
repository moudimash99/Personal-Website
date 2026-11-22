import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { checkAdminKey, createLink, deleteLink, deviceOf, getOverview } from '@/lib/tracking'
import { ago, buildDashboard, inKind, kindOf, type Group, type Kind, type Row, type Signal } from '@/lib/linkInsights'
import { deepLinks } from '@/lib/deepLinks'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'CV links', robots: { index: false, follow: false } }

const fmt = (iso?: string) =>
  iso
    ? new Date(iso).toLocaleString('en-GB', { timeZone: 'Europe/Paris', dateStyle: 'short', timeStyle: 'short' })
    : '—'

const dayLabel = (key: string) =>
  new Date(`${key}T12:00:00Z`).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })

const plural = (n: number, word: string, many = `${word}s`) => `${n.toLocaleString('en-GB')} ${n === 1 ? word : many}`

// Every list shows 15 at a time, with Previous / Next
const PER_PAGE = 15
const pageOf = <T,>(items: T[], raw: string | number | undefined) => {
  const pages = Math.max(1, Math.ceil(items.length / PER_PAGE))
  const no = Math.min(pages, Math.max(1, Number(raw) || 1))
  const offset = (no - 1) * PER_PAGE
  return { items: items.slice(offset, offset + PER_PAGE), no, pages, total: items.length, offset }
}
type Paged = Omit<ReturnType<typeof pageOf>, 'items'>
const KINDS: { kind: Kind | 'all'; label: string }[] = [
  { kind: 'opened', label: 'Opened' },
  { kind: 'scanned', label: 'Scanned only' },
  { kind: 'waiting', label: 'Not opened' },
  { kind: 'unregistered', label: 'Unregistered' },
  { kind: 'all', label: 'All' },
]

async function create(formData: FormData) {
  'use server'
  const key = String(formData.get('key') || '')
  if (!checkAdminKey(key)) redirect('/')
  let code: string
  try {
    const link = await createLink({
      recipient: String(formData.get('recipient') || '').trim(),
      company: String(formData.get('company') || '').trim() || undefined,
      note: String(formData.get('note') || '').trim() || undefined,
      target: String(formData.get('target') || '/').trim() || '/',
      code: String(formData.get('code') || '').trim() || undefined,
    })
    code = link.code
  } catch (err) {
    redirect(`/admin/links?key=${encodeURIComponent(key)}&error=${encodeURIComponent((err as Error).message)}`)
  }
  revalidatePath('/admin/links')
  redirect(`/admin/links?key=${encodeURIComponent(key)}&new=${code}`)
}

async function remove(formData: FormData) {
  'use server'
  const key = String(formData.get('key') || '')
  if (!checkAdminKey(key)) redirect('/')
  await deleteLink(String(formData.get('code')))
  revalidatePath('/admin/links')
  redirect(`/admin/links?key=${encodeURIComponent(key)}`)
}

const SIGNALS: Record<Signal, { label: string; title: string; className: string }> = {
  live: { label: 'Live', title: 'Active in the last hour', className: 'border-emerald-400/40 bg-emerald-400/10 text-emerald-200' },
  new: { label: 'New', title: 'First opened in the last 48 hours', className: 'border-accent-300/40 bg-accent-300/10 text-accent-100' },
  returning: { label: 'Returning', title: 'Came back on more than one day', className: 'border-sky-400/40 bg-sky-400/10 text-sky-200' },
  shared: { label: 'Shared', title: 'More than one person (device) opened this link', className: 'border-violet-400/40 bg-violet-400/10 text-violet-200' },
  deep: { label: 'Deep read', title: '5+ page views or 3+ different pages', className: 'border-amber-400/40 bg-amber-400/10 text-amber-200' },
}

function SignalPills({ signals, people }: { signals: Signal[]; people?: number }) {
  if (!signals.length) return null
  return (
    <span className="flex flex-wrap gap-1.5">
      {signals.map((s) => (
        <span key={s} title={SIGNALS[s].title} className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium ${SIGNALS[s].className}`}>
          {s === 'live' && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />}
          {s === 'shared' && people ? `${SIGNALS[s].label} · ${people}` : SIGNALS[s].label}
        </span>
      ))}
    </span>
  )
}

function Signals({ row }: { row: Row }) {
  return <SignalPills signals={row.insight.signals} people={row.insight.visitorNo.size} />
}

// The registry's recipient is "Company — Role": inside a company's group, the role alone
const roleOf = (row: Row) => {
  const { recipient = '', company = '' } = row.link || {}
  return company && recipient.startsWith(company) ? recipient.slice(company.length).replace(/^\s*[—-]\s*/, '') || recipient : recipient
}

function Who({ row, inGroup = false }: { row: Row; inGroup?: boolean }) {
  return row.link ? (
    <>
      <span className="font-medium text-foreground">{inGroup ? roleOf(row) : row.link.recipient}</span>
      {!inGroup && row.link.company && !row.link.recipient.startsWith(row.link.company) && <span className="text-muted"> · {row.link.company}</span>}
    </>
  ) : (
    <span className="font-mono text-foreground">
      /r/{row.code} <span className="ml-1 rounded bg-amber-400/15 px-1.5 py-0.5 font-sans text-[11px] text-amber-200">unregistered</span>
    </span>
  )
}

function Panel({ title, hint, children, className = '' }: { title: string; hint?: string; children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-xl border border-white/10 bg-white/[0.03] p-5 ${className}`}>
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-muted">{title}</h2>
        {hint && <span className="text-xs text-muted/70">{hint}</span>}
      </div>
      {children}
    </section>
  )
}

function Numbers({ opens, pageViews, days }: { opens: number; pageViews: number; days?: number }) {
  return (
    <span className="shrink-0 tabular-nums">
      <b>{opens}</b> <span className="text-muted">{opens === 1 ? 'open' : 'opens'} ·</span> <b>{pageViews}</b>{' '}
      <span className="text-muted">{pageViews === 1 ? 'page view' : 'page views'}</span>
      {days !== undefined && (
        <>
          {' '}<span className="text-muted">·</span> <b>{days}</b> <span className="text-muted">{days === 1 ? 'day' : 'days'}</span>
        </>
      )}
    </span>
  )
}

const LINE = 'flex flex-wrap items-baseline gap-x-4 gap-y-1 rounded-md px-2 py-2 text-sm hover:bg-white/5'

/** One opened link in the Opened panel: who, what it read, its signals and numbers. */
function OpenedLine({ row, rank, inGroup, href, now, pageLabel }: { row: Row; rank?: number; inGroup?: boolean; href: string; now: number; pageLabel: (p: string) => string }) {
  const read = row.stats.pages.map(([p]) => pageLabel(p))
  return (
    <a href={href} className={LINE}>
      {rank !== undefined && <span className="w-7 shrink-0 font-mono text-xs text-muted/70">#{rank}</span>}
      <span className="min-w-[14rem] flex-1">
        <span className="block truncate"><Who row={row} inGroup={inGroup} /></span>
        {read.length > 0 && (
          <span className="block truncate text-xs text-muted" title={row.stats.pages.map(([p, n]) => `${pageLabel(p)} ×${n}`).join('\n')}>
            Read: {read.slice(0, 4).join(' · ')}{read.length > 4 && ` +${read.length - 4}`}
          </span>
        )}
      </span>
      <Signals row={row} />
      <Numbers opens={row.stats.opens} pageViews={row.stats.pageViews} days={row.insight.activeDays} />
      <span className="w-16 shrink-0 text-right text-xs text-muted" title={fmt(row.stats.lastSeen)}>{ago(row.stats.lastSeen, now)}</span>
    </a>
  )
}

/** A company with several opened roles: one line, its roles inside. */
function OpenedGroup({ group, rank, rowHref, now, pageLabel }: { group: Group; rank: number; rowHref: (code: string) => string; now: number; pageLabel: (p: string) => string }) {
  return (
    <details className="rounded-md open:bg-white/[0.02]">
      <summary className={`${LINE} cursor-pointer list-none [&::-webkit-details-marker]:hidden`}>
        <span className="w-7 shrink-0 font-mono text-xs text-muted/70">#{rank}</span>
        <span className="min-w-[14rem] flex-1 truncate">
          <span className="font-medium text-foreground">{group.company}</span>
          <span className="ml-2 rounded-full border border-white/15 px-2 py-0.5 text-[11px] text-muted">{group.rows.length} roles ▾</span>
        </span>
        <SignalPills signals={group.signals} />
        <Numbers opens={group.opens} pageViews={group.pageViews} />
        <span className="w-16 shrink-0 text-right text-xs text-muted" title={fmt(group.lastSeen)}>{ago(group.lastSeen, now)}</span>
      </summary>
      <div className="mb-2 ml-4 border-l border-white/10 pl-2 sm:ml-9">
        {group.rows.map((row) => (
          <OpenedLine key={row.code} row={row} inGroup href={rowHref(row.code)} now={now} pageLabel={pageLabel} />
        ))}
      </div>
    </details>
  )
}

function Pager({ p, href, noun, nouns, label }: { p: Paged; href: (page: number) => string; noun: string; nouns?: string; label: string }) {
  if (p.pages <= 1) return null
  return (
    <nav className="mt-4 flex items-center justify-between gap-3 text-sm" aria-label={`${label} pages`}>
      {p.no > 1 ? <a href={href(p.no - 1)} className="hover:underline">← Previous</a> : <span />}
      <span className="text-xs text-muted">
        Page {p.no} of {p.pages} · {plural(p.total, noun, nouns)}
      </span>
      {p.no < p.pages ? <a href={href(p.no + 1)} className="hover:underline">Next →</a> : <span />}
    </nav>
  )
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <p className="text-[11px] font-medium uppercase tracking-widest text-muted">{label}</p>
      <p className="mt-2 font-display text-3xl font-semibold tabular-nums text-foreground">{value}</p>
      <p className="mt-1 text-xs text-muted">{sub}</p>
    </div>
  )
}

type Day = ReturnType<typeof buildDashboard>['daily'][number]

function ActivityChart({ days }: { days: Day[] }) {
  const total = (d: Day) => d.opens + d.views
  const peak = Math.max(1, ...days.map(total))
  const summary = (d: Day) =>
    `${dayLabel(d.key)}: ${plural(d.opens, 'open')}, ${plural(d.views, 'page view')}${d.who.size ? ` (${[...d.who].join(', ')})` : ''}`
  return (
    <div>
      <div className="relative h-36 border-b border-white/15" role="img" aria-label="Human opens and page views per day over the last 30 days">
        <div className="absolute inset-x-0 top-0 border-t border-dashed border-white/10" />
        <span className="absolute -top-1.5 right-0 text-[10px] tabular-nums text-muted/70">{peak}</span>
        <div className="flex h-full items-end gap-[2px] pr-6">
          {days.map((d) => (
            <div key={d.key} title={summary(d)} className="group flex h-full flex-1 items-end">
              <div
                className={`w-full rounded-t-[4px] ${total(d) ? 'bg-accent-400 group-hover:bg-accent-300' : 'h-[2px] bg-white/10 group-hover:bg-white/25'}`}
                style={total(d) ? { height: `${(total(d) / peak) * 100}%` } : undefined}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-1.5 flex justify-between pr-6 text-[10px] text-muted/70">
        <span>{dayLabel(days[0].key)}</span>
        <span>{dayLabel(days[15].key)}</span>
        <span>Today</span>
      </div>
      <table className="sr-only">
        <tbody>
          {days.filter(total).map((d) => <tr key={d.key}><td>{summary(d)}</td></tr>)}
        </tbody>
      </table>
    </div>
  )
}

// page: All links; op, vp, mp, sp, fp: the Opened, Recent visits, Most read pages, Scanned only and Follow-up lists
type Search = { key?: string; new?: string; error?: string; code?: string; open?: string; show?: string; q?: string; page?: string; op?: string; vp?: string; mp?: string; sp?: string; fp?: string }

export default async function LinksAdmin({ searchParams }: { searchParams: Search }) {
  if (!checkAdminKey(searchParams.key)) {
    return <main className="p-10 text-muted">Not found.</main>
  }
  const key = searchParams.key!
  const h = headers()
  const base = process.env.SITE_URL || `${h.get('x-forwarded-proto') || 'https'}://${h.get('host')}`
  const now = Date.now()
  const { kpis, daily, opened, feed, topPages, waiting, scanned, followUp, all } = buildDashboard(await getOverview(), now)

  const pageLabels = new Map(deepLinks().map((l) => [l.href, l.label]))
  const pageLabel = (p: string) => pageLabels.get(p) || p
  const rowHref = (code: string) => `/admin/links?key=${encodeURIComponent(key)}&open=${code}#${code}`
  const weekDelta = kpis.opensWeek - kpis.opensPrevWeek
  const input = 'w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm outline-none focus:border-white/30'

  // Links that page one list keep every other list on its page
  const hrefWith = (changes: Record<string, string | number | undefined>, anchor: string) => {
    const { show: s, q: qq, page, op, vp, mp, sp, fp } = searchParams
    const params = { key, show: s, q: qq, page, op, vp, mp, sp, fp, ...changes }
    return `/admin/links?${new URLSearchParams(
      Object.entries(params).flatMap(([k, v]) => (v === undefined || v === '' ? [] : [[k, String(v)]])),
    )}#${anchor}`
  }
  const openedPage = pageOf(opened, searchParams.op)
  const feedPage = pageOf(feed, searchParams.vp)
  const topPagesPage = pageOf(topPages, searchParams.mp)
  const scannedPage = pageOf(scanned, searchParams.sp)
  const followUpPage = pageOf(followUp, searchParams.fp)

  // "All links": one list at a time (Opened by default, or the list of the row asked for), searchable, 15 per page
  const openRow = searchParams.open ? all.find((r) => r.code === searchParams.open) : undefined
  const show = KINDS.some((k) => k.kind === searchParams.show) ? (searchParams.show as Kind | 'all') : openRow ? kindOf(openRow) : 'opened'
  const q = (searchParams.q || '').trim().toLowerCase()
  const found = all.filter((r) => !q || [r.code, r.link?.recipient, r.link?.company, r.link?.note].some((s) => s?.toLowerCase().includes(q)))
  const count = (kind: Kind | 'all') => found.filter((r) => inKind(r, kind)).length
  const list = found.filter((r) => inKind(r, show))
  const pages = Math.max(1, Math.ceil(list.length / PER_PAGE))
  const openAt = openRow ? list.indexOf(openRow) : -1
  const pageNo = Math.min(pages, Math.max(1, Number(searchParams.page) || (openAt >= 0 ? Math.floor(openAt / PER_PAGE) + 1 : 1)))
  const shown = list.slice((pageNo - 1) * PER_PAGE, pageNo * PER_PAGE)
  const listHref = (p: { show?: string; q?: string; page?: number }) => hrefWith({ show, ...p }, 'all')

  return (
    <main className="relative z-30 mx-auto max-w-7xl px-4 py-12 font-sans">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold">CV links</h1>
          <p className="mt-1 text-sm text-muted">
            Last human activity {ago(kpis.lastEvent, now)} · updated {fmt(new Date(now).toISOString())} (Paris)
          </p>
        </div>
      </header>

      {searchParams.new && (
        <div className="mt-6 rounded-lg border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm">
          Created: <code className="select-all font-mono text-emerald-200">{`${base}/r/${searchParams.new}`}</code>
        </div>
      )}
      {searchParams.error && (
        <div className="mt-6 rounded-lg border border-red-400/30 bg-red-400/10 p-4 text-sm">{searchParams.error}</div>
      )}

      {/* Key metrics */}
      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-5">
        <Stat
          label="Human opens"
          value={String(kpis.opens)}
          sub={`${kpis.opensWeek} this week${weekDelta ? ` · ${weekDelta > 0 ? '▲' : '▼'} ${Math.abs(weekDelta)} vs last` : ''}`}
        />
        <Stat label="People" value={String(kpis.visitors)} sub={`${kpis.visitorsWeek} seen this week`} />
        <Stat label="Open rate" value={`${Math.round(kpis.openRate * 100)}%`} sub={`${kpis.openedRegistered} of ${plural(kpis.registered, 'link')} opened`} />
        <Stat label="Page views" value={String(kpis.pageViews)} sub={`${kpis.pagesPerVisitor.toFixed(1)} per person`} />
        <Stat label="Active this week" value={String(kpis.activeLinks)} sub={`${plural(waiting.length, 'link')} not opened yet`} />
      </div>

      {/* Every opened link, most active first */}
      <Panel title="Opened" hint={`${plural(opened.reduce((n, g) => n + g.rows.length, 0), 'link')} opened by a person · most active first, recent activity weighs more`} className="mt-6">
        <div id="opened" className="scroll-mt-6" />
        {opened.length ? (
          <div className="divide-y divide-white/5">
            {openedPage.items.map((g, i) =>
              g.rows.length > 1 ? (
                <OpenedGroup key={g.key} group={g} rank={openedPage.offset + i + 1} rowHref={rowHref} now={now} pageLabel={pageLabel} />
              ) : (
                <OpenedLine key={g.key} row={g.rows[0]} rank={openedPage.offset + i + 1} href={rowHref(g.rows[0].code)} now={now} pageLabel={pageLabel} />
              ),
            )}
          </div>
        ) : (
          <p className="text-sm text-muted">No link opened by a person yet.</p>
        )}
        <Pager p={openedPage} href={(n) => hrefWith({ op: n }, 'opened')} noun="company" nouns="companies" label="Opened" />
      </Panel>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="min-w-0 space-y-6 lg:col-span-2">
          <Panel title="Activity" hint="Human opens + page views per day, last 30 days">
            <ActivityChart days={daily} />
          </Panel>

          <Panel title="Recent visits" hint="Newest first">
            <div id="visits" className="scroll-mt-6" />
            {feed.length ? (
              <ul className="divide-y divide-white/5">
                {feedPage.items.map((v, i) => {
                  const person = v.row.insight.visitorNo.size > 1 ? ` (person ${v.row.insight.visitorNo.get(v.visitor)})` : ''
                  const action = v.opened ? (v.pages.length ? 'opened the link, read' : 'opened the link') : 'came back, read'
                  return (
                    <li key={feedPage.offset + i} className="flex items-baseline gap-3 py-2.5 text-sm">
                      <span className={`mt-1.5 h-2 w-2 shrink-0 self-start rounded-full ${v.opened ? 'bg-accent-400' : 'bg-white/30'}`} title={v.opened ? 'Opened the link' : 'Returned via saved cookie'} />
                      <a href={rowHref(v.row.code)} className="min-w-0 flex-1 hover:underline">
                        <Who row={v.row} />
                        <span className="text-muted">{person} {action} </span>
                        {v.pages.map((p, j) => (
                          <span key={p} className="text-foreground">{j > 0 && <span className="text-muted">, </span>}{pageLabel(p)}</span>
                        ))}
                      </a>
                      <span className="hidden shrink-0 text-xs text-muted/70 sm:inline">{deviceOf(v.device)}</span>
                      <span className="w-16 shrink-0 text-right text-xs text-muted" title={`${fmt(v.start)} → ${fmt(v.end)}`}>{ago(v.end, now)}</span>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <p className="text-sm text-muted">No human activity yet.</p>
            )}
            <Pager p={feedPage} href={(n) => hrefWith({ vp: n }, 'visits')} noun="visit" label="Recent visits" />
          </Panel>
        </div>

        <div className="min-w-0 space-y-6">
          <Panel title="Most read pages">
            <div id="pages" className="scroll-mt-6" />
            {topPages.length ? (
              <ul className="space-y-2">
                {topPagesPage.items.map(([p, s]) => (
                  <li key={p} className="relative overflow-hidden rounded-md px-3 py-2 text-sm" title={`Read by: ${[...s.who].join(', ')}`}>
                    <div className="absolute inset-y-0 left-0 rounded-md bg-accent-400/15" style={{ width: `${(s.views / topPages[0][1].views) * 100}%` }} />
                    <div className="relative flex justify-between gap-3">
                      <span className="truncate">{pageLabel(p)}</span>
                      <span className="shrink-0 tabular-nums text-muted">{s.views} · {s.visitors.size} {s.visitors.size === 1 ? 'person' : 'people'}</span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted">No page views yet.</p>
            )}
            <Pager p={topPagesPage} href={(n) => hrefWith({ mp: n }, 'pages')} noun="page" label="Most read pages" />
          </Panel>

          <Panel title="Not opened yet">
            {waiting.length ? (
              <>
                <p className="text-sm">
                  <b className="font-display text-2xl tabular-nums">{waiting.length.toLocaleString('en-GB')}</b>{' '}
                  <span className="text-muted">{waiting.length === 1 ? 'link' : 'links'} not opened</span>
                  {scanned.length > 0 && <span className="block text-xs text-muted">{scanned.length} of them reached by a mail scanner only</span>}
                </p>
                {[
                  { id: 'scanned', param: 'sp', title: 'Scanned only', hint: 'A mail scanner or link preview opened it, no human yet', page: scannedPage },
                  { id: 'followup', param: 'fp', title: 'Follow-up due', hint: 'Sent 7 to 14 days ago', page: followUpPage },
                ].map(({ id, param, title, hint, page }) =>
                  page.total ? (
                    <div key={title} id={id} className="mt-4 scroll-mt-6">
                      <h3 className="text-[11px] font-medium uppercase tracking-widest text-muted" title={hint}>
                        {title} · {page.total}
                      </h3>
                      <ul className="mt-1 space-y-1">
                        {page.items.map((row) => (
                          <li key={row.code}>
                            <a href={rowHref(row.code)} className="flex items-baseline justify-between gap-3 rounded-md px-1 py-1 text-sm hover:bg-white/5">
                              <span className="min-w-0 truncate"><Who row={row} /></span>
                              <span className="shrink-0 text-xs text-muted">sent {ago(row.link!.createdAt, now)}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                      <Pager p={page} href={(n) => hrefWith({ [param]: n }, id)} noun="link" label={title} />
                    </div>
                  ) : null,
                )}
                <a href={listHref({ show: 'waiting', q: '', page: 1 })} className="mt-4 inline-block text-xs text-accent-300 hover:underline">
                  See them all →
                </a>
              </>
            ) : (
              <p className="text-sm text-muted">Everyone you sent a link to has opened it.</p>
            )}
          </Panel>
        </div>
      </div>

      {/* New link */}
      <details open={!!(searchParams.code || searchParams.error)} className="mt-10 rounded-xl border border-white/10 bg-white/[0.03]">
        <summary className="cursor-pointer p-4 font-display text-sm font-semibold uppercase tracking-widest text-muted">+ New tracked link</summary>
        <form action={create} className="grid gap-3 border-t border-white/10 p-5 md:grid-cols-6">
          <input type="hidden" name="key" value={key} />
          <input name="recipient" required placeholder="Sent to (e.g. Jane Doe, recruiter)" className={`${input} md:col-span-2`} />
          <input name="company" placeholder="Company / role" className={`${input} md:col-span-2`} />
          <input name="code" defaultValue={searchParams.code} placeholder="Code (optional — reuse one already sent)" className={`${input} md:col-span-2`} />
          <input name="note" placeholder="Note (job ad, channel…)" className={`${input} md:col-span-4`} />
          <input name="target" defaultValue="/" list="deep-links" placeholder="Landing page" title="Any page or card, e.g. /experience#murex" className={`${input} md:col-span-1`} />
          <datalist id="deep-links">
            {deepLinks().map((l) => <option key={l.href} value={l.href}>{l.label}</option>)}
          </datalist>
          <button className="rounded-md bg-white/90 px-4 py-2 text-sm font-medium text-black hover:bg-white md:col-span-1">
            Create link
          </button>
        </form>
      </details>

      {/* Every link, most interesting first */}
      <div id="all" className="mt-10 flex scroll-mt-6 flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-muted">All links</h2>
        <span className="text-xs text-muted/70">{plural(kpis.registered, 'registered link')} · {plural(all.length - kpis.registered, 'unregistered code')} seen</span>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <nav className="flex flex-wrap gap-2" aria-label="Which links">
          {KINDS.map(({ kind, label }) => (
            <a
              key={kind}
              href={listHref({ show: kind, page: undefined })}
              aria-current={show === kind ? 'page' : undefined}
              className={`rounded-full border px-3 py-1 text-xs ${show === kind ? 'border-white/40 bg-white/10 text-foreground' : 'border-white/10 text-muted hover:border-white/25 hover:text-foreground'}`}
            >
              {label} <span className="tabular-nums text-muted">{count(kind).toLocaleString('en-GB')}</span>
            </a>
          ))}
        </nav>
        <form method="get" action="/admin/links#all" className="flex w-full gap-2 sm:w-auto">
          <input type="hidden" name="key" value={key} />
          <input type="hidden" name="show" value={show} />
          <input name="q" defaultValue={searchParams.q} placeholder="Search company, role or code" className={`${input} sm:w-72`} />
          {q && <a href={listHref({ q: '', page: undefined })} className="self-center text-xs text-muted hover:underline">Clear</a>}
        </form>
      </div>
      <div className="mt-3 space-y-3">
        {shown.map((row) => {
          const { code, link, events, stats: s } = row
          return (
            <details key={code} id={code} open={searchParams.open === code} className="scroll-mt-24 rounded-xl border border-white/10 bg-white/[0.03] open:border-white/20">
              <summary className="flex cursor-pointer flex-wrap items-center gap-x-6 gap-y-2 p-4">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${s.opens ? 'bg-emerald-400' : s.botOpens ? 'bg-amber-400' : 'bg-white/20'}`}
                  title={s.opens ? 'Opened' : s.botOpens ? 'Only scanned by a bot/previewer' : 'Not opened'}
                />
                <span className="min-w-[12rem]"><Who row={row} /></span>
                <Signals row={row} />
                <span className="text-sm tabular-nums">
                  <b>{s.opens}</b> {s.opens === 1 ? 'open' : 'opens'} · <b>{s.visitors}</b> {s.visitors === 1 ? 'visitor' : 'visitors'} · <b>{s.pageViews}</b> {s.pageViews === 1 ? 'page view' : 'page views'}
                  {s.botOpens > 0 && <span className="text-muted"> · {s.botOpens} bot</span>}
                </span>
                <span className="ml-auto text-xs text-muted" title={fmt(s.lastSeen)}>
                  {s.lastSeen ? `last ${ago(s.lastSeen, now)}` : link ? `sent ${ago(link.createdAt, now)}` : '—'}
                </span>
              </summary>
              <div className="border-t border-white/10 p-4 text-sm">
                <p className="text-muted">
                  Link: <code className="select-all font-mono text-foreground">{`${base}/r/${code}`}</code> → {link?.target || '/'}
                  <br />
                  {link && <>Registered {fmt(link.createdAt)} · </>}first opened {fmt(s.firstOpen)}
                  {s.devices.length > 0 && <> · {s.devices.map(([d, n]) => `${n} ${d}`).join(' · ')}</>}
                  {link?.note && <><br />Note: {link.note}</>}
                </p>
                {!link && (
                  <a
                    href={`/admin/links?key=${encodeURIComponent(key)}&code=${code}`}
                    className="mt-3 inline-block rounded-md bg-white/90 px-3 py-1.5 text-xs font-medium text-black hover:bg-white"
                  >
                    Register who this was sent to
                  </a>
                )}
                {s.pages.length > 0 && (
                  <p className="mt-3">
                    Pages read: {s.pages.map(([p, n]) => `${pageLabel(p)} ×${n}`).join(', ')}
                  </p>
                )}
                {events.length > 0 && (
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="text-muted">
                        <tr><th className="py-1 pr-4">When</th><th className="pr-4">Event</th><th className="pr-4">Visitor</th><th className="pr-4">Device</th><th>Client</th></tr>
                      </thead>
                      <tbody>
                        {[...events].reverse().map((e, i) => (
                          <tr key={i} className={`border-t border-white/5 ${e.bot ? 'opacity-50' : ''}`}>
                            <td className="py-1 pr-4 whitespace-nowrap">{fmt(e.t)}</td>
                            <td className="pr-4">{e.type === 'open' ? `${e.bot ? 'open (bot/preview)' : 'open'}${e.path ? ` → ${e.path}` : ''}` : `view ${e.path}`}</td>
                            <td className="pr-4 font-mono">{e.visitor}</td>
                            <td className="pr-4 whitespace-nowrap">{deviceOf(e)}{e.viewport ? ` · ${e.viewport}` : ''}</td>
                            <td className="truncate max-w-[28rem]" title={e.ua}>{e.ua || '—'}{e.lang ? ` · ${e.lang}` : ''}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {link && (
                  <form action={remove} className="mt-4">
                    <input type="hidden" name="key" value={key} />
                    <input type="hidden" name="code" value={code} />
                    <button className="text-xs text-red-300 hover:underline">Unregister (history is kept)</button>
                  </form>
                )}
              </div>
            </details>
          )
        })}
        {all.length === 0 ? (
          <p className="text-muted">No links yet — open “New tracked link” above.</p>
        ) : (
          shown.length === 0 && <p className="text-sm text-muted">{q ? 'Nothing here matches that search.' : 'No links in this list.'}</p>
        )}
      </div>
      <Pager p={{ no: pageNo, pages, total: list.length, offset: (pageNo - 1) * PER_PAGE }} href={(n) => listHref({ page: n })} noun="link" label="All links" />
    </main>
  )
}

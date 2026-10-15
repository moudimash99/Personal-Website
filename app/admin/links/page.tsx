import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { checkAdminKey, createLink, deleteLink, deviceOf, getOverview } from '@/lib/tracking'
import { ago, buildDashboard, type Row, type Signal } from '@/lib/linkInsights'
import { deepLinks } from '@/lib/deepLinks'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'CV links', robots: { index: false, follow: false } }

const fmt = (iso?: string) =>
  iso
    ? new Date(iso).toLocaleString('en-GB', { timeZone: 'Europe/Paris', dateStyle: 'short', timeStyle: 'short' })
    : '—'

const dayLabel = (key: string) =>
  new Date(`${key}T12:00:00Z`).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`

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

function Signals({ row }: { row: Row }) {
  if (!row.insight.signals.length) return null
  return (
    <span className="flex flex-wrap gap-1.5">
      {row.insight.signals.map((s) => (
        <span key={s} title={SIGNALS[s].title} className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium ${SIGNALS[s].className}`}>
          {s === 'live' && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />}
          {s === 'shared' ? `${SIGNALS[s].label} · ${row.insight.visitorNo.size}` : SIGNALS[s].label}
        </span>
      ))}
    </span>
  )
}

function Who({ row }: { row: Row }) {
  return row.link ? (
    <>
      <span className="font-medium text-foreground">{row.link.recipient}</span>
      {row.link.company && <span className="text-muted"> · {row.link.company}</span>}
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

export default async function LinksAdmin({ searchParams }: { searchParams: { key?: string; new?: string; error?: string; code?: string; open?: string } }) {
  if (!checkAdminKey(searchParams.key)) {
    return <main className="p-10 text-muted">Not found.</main>
  }
  const key = searchParams.key!
  const h = headers()
  const base = process.env.SITE_URL || `${h.get('x-forwarded-proto') || 'https'}://${h.get('host')}`
  const now = Date.now()
  const { kpis, daily, hot, feed, topPages, waiting, all } = buildDashboard(await getOverview(), now)

  const pageLabels = new Map(deepLinks().map((l) => [l.href, l.label]))
  const pageLabel = (p: string) => pageLabels.get(p) || p
  const rowHref = (code: string) => `/admin/links?key=${encodeURIComponent(key)}&open=${code}#${code}`
  const weekDelta = kpis.opensWeek - kpis.opensPrevWeek
  const input = 'w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm outline-none focus:border-white/30'

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

      {/* Hot right now */}
      <Panel title="Hot right now" hint="Ranked by activity, recent activity weighs more" className="mt-6">
        {hot.length ? (
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {hot.map((row, i) => (
              <a key={row.code} href={rowHref(row.code)} className="group block min-w-0 rounded-lg border border-white/10 bg-white/[0.03] p-4 transition hover:border-accent-400/50 hover:bg-white/[0.05]">
                <div className="flex items-start justify-between gap-3">
                  <p className="min-w-0 truncate text-sm">
                    <span className="mr-2 font-mono text-xs text-muted/70">#{i + 1}</span>
                    <Who row={row} />
                  </p>
                  <span className="shrink-0 text-xs text-muted">{ago(row.stats.lastSeen, now)}</span>
                </div>
                <div className="mt-2"><Signals row={row} /></div>
                <p className="mt-3 text-sm tabular-nums">
                  <b>{row.stats.opens}</b> <span className="text-muted">{row.stats.opens === 1 ? 'open' : 'opens'} ·</span> <b>{row.stats.pageViews}</b>{' '}
                  <span className="text-muted">{row.stats.pageViews === 1 ? 'page view' : 'page views'} ·</span> <b>{row.insight.activeDays}</b> <span className="text-muted">{row.insight.activeDays === 1 ? 'day' : 'days'}</span>
                </p>
                {row.stats.pages.length > 0 && (
                  <p className="mt-2 truncate text-xs text-muted" title={row.stats.pages.map(([p, n]) => `${pageLabel(p)} ×${n}`).join('\n')}>
                    Read: {row.stats.pages.slice(0, 3).map(([p]) => pageLabel(p)).join(' · ')}
                    {row.stats.pages.length > 3 && ` +${row.stats.pages.length - 3}`}
                  </p>
                )}
              </a>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted">Nothing in the last couple of weeks.</p>
        )}
      </Panel>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="min-w-0 space-y-6 lg:col-span-2">
          <Panel title="Activity" hint="Human opens + page views per day, last 30 days">
            <ActivityChart days={daily} />
          </Panel>

          <Panel title="Recent visits" hint="Latest 15, newest first">
            {feed.length ? (
              <ul className="divide-y divide-white/5">
                {feed.map((v, i) => {
                  const person = v.row.insight.visitorNo.size > 1 ? ` (person ${v.row.insight.visitorNo.get(v.visitor)})` : ''
                  const action = v.opened ? (v.pages.length ? 'opened the link, read' : 'opened the link') : 'came back, read'
                  return (
                    <li key={i} className="flex items-baseline gap-3 py-2.5 text-sm">
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
          </Panel>
        </div>

        <div className="min-w-0 space-y-6">
          <Panel title="Most read pages">
            {topPages.length ? (
              <ul className="space-y-2">
                {topPages.map(([p, s]) => (
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
          </Panel>

          <Panel title="Not opened yet" hint="Oldest first">
            {waiting.length ? (
              <ul className="space-y-2">
                {waiting.map((row) => (
                  <li key={row.code}>
                    <a href={rowHref(row.code)} className="flex items-baseline justify-between gap-3 rounded-md px-1 py-1 text-sm hover:bg-white/5">
                      <span className="min-w-0 truncate"><Who row={row} /></span>
                      <span className="shrink-0 text-xs text-muted">
                        {row.insight.status === 'scanned' && (
                          <span title="Only a mail scanner or link preview opened it, no human yet" className="mr-2 rounded bg-amber-400/15 px-1.5 py-0.5 text-amber-200">scanned</span>
                        )}
                        sent {ago(row.link!.createdAt, now)}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
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
      <div className="mt-10 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-muted">All links</h2>
        <span className="text-xs text-muted/70">{plural(kpis.registered, 'registered link')} · {all.length - kpis.registered} unregistered codes seen</span>
      </div>
      <div className="mt-3 space-y-3">
        {all.map((row) => {
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
        {all.length === 0 && <p className="text-muted">No links yet — open “New tracked link” above.</p>}
      </div>
    </main>
  )
}

import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { checkAdminKey, createLink, deleteLink, deviceOf, getOverview } from '@/lib/tracking'
import { deepLinks } from '@/lib/deepLinks'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'CV links', robots: { index: false, follow: false } }

const fmt = (iso?: string) =>
  iso
    ? new Date(iso).toLocaleString('en-GB', { timeZone: 'Europe/Paris', dateStyle: 'short', timeStyle: 'short' })
    : '—'

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

export default async function LinksAdmin({ searchParams }: { searchParams: { key?: string; new?: string; error?: string; code?: string } }) {
  if (!checkAdminKey(searchParams.key)) {
    return <main className="p-10 text-muted">Not found.</main>
  }
  const key = searchParams.key!
  const h = headers()
  const base = process.env.SITE_URL || `${h.get('x-forwarded-proto') || 'https'}://${h.get('host')}`

  const overview = await getOverview()
  const registered = overview.filter((o) => o.link)
  const unregistered = overview.filter((o) => !o.link)
  const totalOpens = overview.reduce((n, o) => n + o.stats.opens, 0)

  const input = 'w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm outline-none focus:border-white/30'

  return (
    <main className="relative z-30 mx-auto max-w-6xl px-4 py-12 font-sans">
      <h1 className="font-display text-3xl font-semibold">CV links</h1>
      <p className="mt-1 text-sm text-muted">
        {registered.length} registered · {unregistered.length} unregistered codes seen · {totalOpens} human opens total
      </p>

      {searchParams.new && (
        <div className="mt-6 rounded-lg border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm">
          Created: <code className="select-all font-mono text-emerald-200">{`${base}/r/${searchParams.new}`}</code>
        </div>
      )}
      {searchParams.error && (
        <div className="mt-6 rounded-lg border border-red-400/30 bg-red-400/10 p-4 text-sm">{searchParams.error}</div>
      )}

      <form action={create} className="mt-8 grid gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-5 md:grid-cols-6">
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

      <div className="mt-8 space-y-3">
        {[...registered, ...unregistered].map(({ code, link, events, stats: s }) => (
          <details key={code} className="rounded-xl border border-white/10 bg-white/[0.03]">
            <summary className="flex cursor-pointer flex-wrap items-center gap-x-6 gap-y-2 p-4">
              <span
                className={`h-2.5 w-2.5 rounded-full ${s.opens ? 'bg-emerald-400' : s.botOpens ? 'bg-amber-400' : 'bg-white/20'}`}
                title={s.opens ? 'Opened' : s.botOpens ? 'Only scanned by a bot/previewer' : 'Not opened'}
              />
              <span className="min-w-[12rem]">
                {link ? (
                  <>
                    <span className="font-medium">{link.recipient}</span>
                    {link.company && <span className="text-muted"> · {link.company}</span>}
                  </>
                ) : (
                  <span className="rounded bg-amber-400/15 px-2 py-0.5 text-xs text-amber-200">unregistered</span>
                )}
              </span>
              <code className="font-mono text-xs text-muted">/r/{code}</code>
              <span className="text-sm">
                <b>{s.opens}</b> opens · <b>{s.visitors}</b> visitors · <b>{s.pageViews}</b> page views
                {s.botOpens > 0 && <span className="text-muted"> · {s.botOpens} bot</span>}
              </span>
              {s.devices.length > 0 && (
                <span className="text-xs text-muted">{s.devices.map(([d, n]) => `${n} ${d}`).join(' · ')}</span>
              )}
              <span className="ml-auto text-xs text-muted">last {fmt(s.lastSeen)}</span>
            </summary>
            <div className="border-t border-white/10 p-4 text-sm">
              <p className="text-muted">
                Link: <code className="select-all font-mono text-foreground">{`${base}/r/${code}`}</code> → {link?.target || '/'}
                <br />
                {link && <>Registered {fmt(link.createdAt)} · </>}first opened {fmt(s.firstOpen)}
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
                  Pages read: {s.pages.map(([p, n]) => `${p} ×${n}`).join(', ')}
                </p>
              )}
              {events.length > 0 && (
                <table className="mt-4 w-full text-left text-xs">
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
        ))}
        {overview.length === 0 && <p className="text-muted">No links yet — create one above.</p>}
      </div>

    </main>
  )
}

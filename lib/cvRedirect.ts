import { NextRequest, NextResponse } from 'next/server'
import { getLink, isValidCode, logEvent, requestMeta, REF_COOKIE } from '@/lib/tracking'
import cvSections from '@/data/cv-sections.json'

// CV section slugs (/r/<code>/<section>) → site paths, e.g. green-praxis → /experience#green
const SECTION_TARGETS: Record<string, string> = Object.fromEntries([
  ...Object.entries(cvSections.website_links).map(([key, target]) => [key.replace(/_/g, '-'), target]),
  ['book', cvSections.booking_link],
])

// Any well-formed code is tracked, registered or not: codes can be handed out first and described later.
// Relative Location: behind the nginx proxy req.url is http://localhost:3000, so an absolute URL built from it
// would send visitors to their own machine.
const redirectTo = (target: string) => new NextResponse(null, { status: 302, headers: { Location: target } })

export async function trackedRedirect(req: NextRequest, rawCode: string, section?: string) {
  if (!isValidCode(rawCode)) return redirectTo('/')
  const code = rawCode.toLowerCase()
  const sectionTarget = section ? SECTION_TARGETS[section.toLowerCase()] : undefined
  const link = sectionTarget ? undefined : await getLink(code)

  await logEvent({
    t: new Date().toISOString(),
    code,
    type: 'open',
    path: sectionTarget,
    ...requestMeta(req.headers, req.method),
  }).catch((err) => console.error('tracking: failed to log open', err))

  // Only same-site paths (including #anchors like /experience#murex); anything else lands on the home page.
  const wanted = sectionTarget ?? link?.target
  const target = wanted?.startsWith('/') && !wanted.startsWith('//') ? wanted : '/'
  const res = redirectTo(target)
  res.headers.set('Cache-Control', 'no-store')
  res.headers.set('X-Robots-Tag', 'noindex')
  res.cookies.set(REF_COOKIE, code, { maxAge: 60 * 60 * 24 * 60, sameSite: 'lax', path: '/' })
  return res
}

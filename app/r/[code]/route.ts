import { NextRequest, NextResponse } from 'next/server'
import { getLink, isValidCode, logEvent, requestMeta, REF_COOKIE } from '@/lib/tracking'

export const dynamic = 'force-dynamic'

// Any well-formed code is tracked, registered or not: codes can be handed out first and described later.
async function handle(req: NextRequest, rawCode: string) {
  if (!isValidCode(rawCode)) return NextResponse.redirect(new URL('/', req.url), 302)
  const code = rawCode.toLowerCase()
  const link = await getLink(code)

  await logEvent({
    t: new Date().toISOString(),
    code,
    type: 'open',
    ...requestMeta(req.headers, req.method),
  }).catch((err) => console.error('tracking: failed to log open', err))

  // Only same-site paths (including #anchors like /experience#murex); anything else lands on the home page.
  const target = link?.target?.startsWith('/') && !link.target.startsWith('//') ? link.target : '/'
  const res = NextResponse.redirect(new URL(target, req.url), 302)
  res.headers.set('Cache-Control', 'no-store')
  res.headers.set('X-Robots-Tag', 'noindex')
  res.cookies.set(REF_COOKIE, code, { maxAge: 60 * 60 * 24 * 60, sameSite: 'lax', path: '/' })
  return res
}

export function GET(req: NextRequest, { params }: { params: { code: string } }) {
  return handle(req, params.code)
}

export function HEAD(req: NextRequest, { params }: { params: { code: string } }) {
  return handle(req, params.code)
}

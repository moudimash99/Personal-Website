import { NextRequest, NextResponse } from 'next/server'
import { isValidCode, logEvent, requestMeta, REF_COOKIE } from '@/lib/tracking'

export const dynamic = 'force-dynamic'

// Page-view beacon, only recorded for visitors who arrived through a /r/<code> link
export async function POST(req: NextRequest) {
  const code = req.cookies.get(REF_COOKIE)?.value
  if (!code || !isValidCode(code)) return new NextResponse(null, { status: 204 })

  let pagePath = '/'
  let viewport: string | undefined
  try {
    const body = JSON.parse(await req.text())
    if (typeof body.path === 'string') pagePath = body.path.slice(0, 200)
    if (typeof body.viewport === 'string' && /^\d{2,5}x\d{2,5}$/.test(body.viewport)) viewport = body.viewport
  } catch {}

  await logEvent({
    t: new Date().toISOString(),
    code,
    type: 'view',
    path: pagePath,
    viewport,
    ...requestMeta(req.headers),
  }).catch((err) => console.error('tracking: failed to log view', err))

  return new NextResponse(null, { status: 204 })
}

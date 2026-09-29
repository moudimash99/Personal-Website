import { NextRequest, NextResponse } from 'next/server'
import { createLink, getOverview, isApiAuthorized, linkUrl } from '@/lib/tracking'

export const dynamic = 'force-dynamic'

const unauthorized = () => NextResponse.json({ error: 'unauthorized' }, { status: 401 })

// GET /api/links → every registered or already-used code with its stats (?unregistered=1 to only list unknown codes)
export async function GET(req: NextRequest) {
  if (!isApiAuthorized(req.headers)) return unauthorized()
  const onlyUnregistered = req.nextUrl.searchParams.has('unregistered')
  const overview = await getOverview()
  return NextResponse.json(
    overview
      .filter((o) => !onlyUnregistered || !o.link)
      .map(({ code, link, stats }) => ({ code, url: linkUrl(code, req.headers), registered: !!link, ...link, stats })),
  )
}

// POST /api/links {recipient, company?, note?, target?, code?} → registers a link.
// Pass `code` to register one you already handed out; its earlier opens are kept.
export async function POST(req: NextRequest) {
  if (!isApiAuthorized(req.headers)) return unauthorized()
  const body = await req.json().catch(() => ({}))
  if (!body.recipient) return NextResponse.json({ error: 'recipient is required' }, { status: 400 })
  try {
    const link = await createLink({
      recipient: String(body.recipient),
      company: body.company ? String(body.company) : undefined,
      note: body.note ? String(body.note) : undefined,
      target: body.target ? String(body.target) : '/',
      code: body.code ? String(body.code) : undefined,
    })
    return NextResponse.json({ ...link, url: linkUrl(link.code, req.headers) }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 409 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { deleteLink, getOverview, isApiAuthorized, linkUrl, updateLink } from '@/lib/tracking'

export const dynamic = 'force-dynamic'

type Ctx = { params: { code: string } }
const unauthorized = () => NextResponse.json({ error: 'unauthorized' }, { status: 401 })

// GET /api/links/<code> → registration info, stats and the full event log (works for unregistered codes too)
export async function GET(req: NextRequest, { params }: Ctx) {
  if (!isApiAuthorized(req.headers)) return unauthorized()
  const code = params.code.toLowerCase()
  const entry = (await getOverview()).find((o) => o.code === code)
  if (!entry) return NextResponse.json({ error: 'no registration and no activity for this code' }, { status: 404 })
  return NextResponse.json({
    code,
    url: linkUrl(code, req.headers),
    registered: !!entry.link,
    ...entry.link,
    stats: entry.stats,
    events: entry.events,
  })
}

// PATCH /api/links/<code> {recipient?, company?, note?, target?} → edit a registered link
export async function PATCH(req: NextRequest, { params }: Ctx) {
  if (!isApiAuthorized(req.headers)) return unauthorized()
  const body = await req.json().catch(() => ({}))
  try {
    const link = await updateLink(params.code, {
      recipient: body.recipient,
      company: body.company,
      note: body.note,
      target: body.target,
    })
    return NextResponse.json(link)
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 404 })
  }
}

// DELETE /api/links/<code> → unregister (history stays in the log; the code shows up as unregistered)
export async function DELETE(req: NextRequest, { params }: Ctx) {
  if (!isApiAuthorized(req.headers)) return unauthorized()
  await deleteLink(params.code.toLowerCase())
  return new NextResponse(null, { status: 204 })
}

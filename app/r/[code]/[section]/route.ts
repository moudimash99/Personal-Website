import { NextRequest } from 'next/server'
import { trackedRedirect } from '@/lib/cvRedirect'

export const dynamic = 'force-dynamic'

// /r/<code>/<section>: same tracking as /r/<code>, landing on one CV section (see data/cv-sections.json)
type Params = { params: { code: string; section: string } }

export function GET(req: NextRequest, { params }: Params) {
  return trackedRedirect(req, params.code, params.section)
}

export function HEAD(req: NextRequest, { params }: Params) {
  return trackedRedirect(req, params.code, params.section)
}

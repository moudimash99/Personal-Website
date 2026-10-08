import { NextRequest } from 'next/server'
import { trackedRedirect } from '@/lib/cvRedirect'

export const dynamic = 'force-dynamic'

export function GET(req: NextRequest, { params }: { params: { code: string } }) {
  return trackedRedirect(req, params.code)
}

export function HEAD(req: NextRequest, { params }: { params: { code: string } }) {
  return trackedRedirect(req, params.code)
}

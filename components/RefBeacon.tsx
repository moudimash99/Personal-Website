'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Reports page views for visitors carrying a cv_ref cookie (set by /r/<code>). No-op for everyone else.
export default function RefBeacon() {
  const pathname = usePathname()

  useEffect(() => {
    if (!document.cookie.split('; ').some((c) => c.startsWith('cv_ref='))) return
    if (pathname.startsWith('/admin')) return
    const body = JSON.stringify({ path: pathname + window.location.hash, viewport: `${window.innerWidth}x${window.innerHeight}` })
    if (!navigator.sendBeacon?.('/api/t', body)) {
      fetch('/api/t', { method: 'POST', body, keepalive: true }).catch(() => {})
    }
  }, [pathname])

  return null
}

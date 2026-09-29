'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Scrolls to #anchor once the page has hydrated (animated cards can shift layout after the browser's own jump),
// and flags the target so it can be highlighted with the `data-linked` attribute.
export default function HashScroll() {
  const pathname = usePathname()

  useEffect(() => {
    const go = () => {
      const id = decodeURIComponent(window.location.hash.slice(1))
      const el = id && document.getElementById(id)
      if (!el) return
      document.querySelectorAll('[data-linked]').forEach(n => n.removeAttribute('data-linked'))
      el.setAttribute('data-linked', '')
      requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }))
    }
    const t = setTimeout(go, 150)
    window.addEventListener('hashchange', go)
    return () => {
      clearTimeout(t)
      window.removeEventListener('hashchange', go)
    }
  }, [pathname])

  return null
}

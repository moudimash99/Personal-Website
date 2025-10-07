'use client'
import { useEffect, useRef } from 'react'

export default function Spotlight() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const x = e.clientX + 'px'
      const y = e.clientY + 'px'
      el.style.setProperty('--mx', x)
      el.style.setProperty('--my', y)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])
  return <div ref={ref} className="pointer-events-none fixed inset-0 z-20 spotlight" />

}
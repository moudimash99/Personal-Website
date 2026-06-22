'use client'
import Link from 'next/link'
import Container from './Container'
import { useEffect, useState } from 'react'
import { profile } from '@/data/profile'

function openIntro() {
  // no reload; just ask the overlay to open
  window.dispatchEvent(new CustomEvent('mc-intro', { detail: 'open' }))
}



export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={`fixed top-0 inset-x-0 z-40 transition-colors ${scrolled ? 'backdrop-blur border-b border-border/60 supports-[backdrop-filter]:bg-background/75' : ''}`}>
      <Container>
        <div className="h-11 flex items-center justify-between">
          <Link href="/" className="font-semibold tracking-tight">{profile.name}</Link>
          <nav className="flex items-center gap-5 text-sm font-mono tracking-wide">
            <Link href="/" className="text-muted hover:text-accent-300 transition-colors">MAIN PAGE</Link>
            <Link href="/projects" className="text-muted hover:text-accent-300 transition-colors">PROJECTS</Link>
            <Link href="/contact" className="text-muted hover:text-accent-300 transition-colors">CONTACT</Link>
          </nav>
        </div>
      </Container>
    </div>
  )
}
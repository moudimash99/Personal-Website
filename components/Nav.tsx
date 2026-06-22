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
    <div className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${scrolled ? 'bg-[#020617]/50 backdrop-blur-md border-b border-white/5' : ''}`}>
      <Container>
        <div className="min-h-[2.75rem] py-3 md:py-0 md:h-11 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0">
          <Link href="/" className="text-white hover:text-teal-400 transition-colors font-semibold tracking-tight text-sm md:text-base">{profile.name}</Link>
          <nav className="flex items-center gap-4 md:gap-5 text-[10px] sm:text-xs md:text-sm font-mono tracking-wide">
            <Link href="/" className="text-muted hover:text-accent-300 transition-colors">MAIN PAGE</Link>
            <Link href="/projects" className="text-muted hover:text-accent-300 transition-colors">PROJECTS</Link>
            <Link href="/contact" className="text-muted hover:text-accent-300 transition-colors">CONTACT</Link>
          </nav>
        </div>
      </Container>
    </div>
  )
}
'use client'
import Link from 'next/link'
import Container from './Container'
import { useEffect, useState } from 'react'

function openIntro() {
  localStorage.removeItem('mc_intro_hide')
  window.location.reload()
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
        <div className="h-14 flex items-center justify-between">
          <Link href="#debrief" className="font-semibold tracking-tight">Machaka Ground Station</Link>
          <nav className="flex items-center gap-5 text-sm">
            <button onClick={openIntro} className="hover:text-accent-300" title="Intro">Intro</button>

            <a href="#projects" className="hover:text-accent-300">Projects</a>
            <a href="#contact" className="hover:text-accent-300">Contact</a>
          </nav>
        </div>
      </Container>
    </div>
  )
}
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Container from './Container'
import { useEffect, useState } from 'react'
import { profile } from '@/data/profile'

const links = [
  { href: '/about-me', label: 'About Me' },
  { href: '/skunkworks', label: 'Skunkworks' },
  { href: '/experience', label: 'Experience' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const pathname = usePathname()
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
        <div className="h-12 flex items-center gap-3 sm:gap-4">
          <Link href="/" aria-label={profile.name} className="font-display font-bold text-lg tracking-tight text-foreground hover:text-accent-300 transition-colors">MM</Link>
          <nav className="flex items-center h-full overflow-x-auto no-scrollbar text-xs sm:text-sm font-medium">
            {links.map(({ href, label }) => {
              const active = pathname?.startsWith(href)
              return (
                <div key={href} className="flex items-center h-full">
                  <span aria-hidden className="h-4 w-px bg-border mr-3 sm:mr-4" />
                  <Link
                    href={href}
                    aria-current={active ? 'page' : undefined}
                    className={`relative h-full flex items-center whitespace-nowrap mr-3 sm:mr-4 transition-colors ${active ? 'text-foreground' : 'text-muted hover:text-accent-300'}`}
                  >
                    {label}
                    {active && <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-accent-400" />}
                  </Link>
                </div>
              )
            })}
          </nav>
        </div>
      </Container>
    </div>
  )
}

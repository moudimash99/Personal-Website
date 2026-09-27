'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Container from './Container'
import Button from './Button'
import { profile } from '@/data/profile'

export default function Footer() {
  const pathname = usePathname()

  // Decide footer CTAs based on current route
  const isHome = pathname === '/' || pathname === ''
  const isCareer = pathname?.startsWith('/experience') || pathname?.startsWith('/projects')
  const isAbout = pathname?.startsWith('/about-me')
  const isSkunkworks = pathname?.startsWith('/skunkworks')
  const isContact = pathname?.startsWith('/contact')

  return (
    <footer className="border-t border-border/60 mt-16">
      <Container>
        {/* Dynamic CTA row */}
        <div className="py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} {profile.name} • {profile.location}
          </p>

          <div className="flex flex-wrap gap-2">
            {isHome && (
              <>
                <Button variant="outline" href="/experience">Experience</Button>
                <Button href="/contact">Contact</Button>
              </>
            )}

            {isAbout && (
              <>
                <Button variant="outline" href="/experience">Experience</Button>
                <Button href="/skunkworks">Continue to Skunkworks</Button>
              </>
            )}

            {isSkunkworks && (
              <>
                <Button variant="outline" href="/about-me">About Me</Button>
                <Button href="/contact">Contact</Button>
              </>
            )}

            {isCareer && (
              <>
                <Button variant="outline" href="/">Back to Debrief</Button>
                <Button href="/contact">Continue to Contact</Button>
              </>
            )}

            {isContact && (
              <>
                <Button variant="outline" href="/experience">Experience</Button>
                <Button href="/">Back to Debrief</Button>
              </>
            )}
          </div>
        </div>
      </Container>
    </footer>
  )
}

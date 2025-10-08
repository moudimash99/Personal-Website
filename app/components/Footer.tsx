'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Container from './Container'
import Button from './Button'

export default function Footer() {
  const pathname = usePathname()

  // Decide footer CTAs based on current route
  const isHome = pathname === '/' || pathname === ''
  const isProjects = pathname?.startsWith('/projects')
  const isContact = pathname?.startsWith('/contact')

  return (
    <footer className="border-t border-border/60 mt-16">
      <Container>
        {/* Dynamic CTA row */}
        <div className="py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} Mohammad Machaka • Toulouse, France
          </p>

          <div className="flex flex-wrap gap-2">
            {isHome && (
              <>
                <Button variant="outline" href="/projects">View Projects</Button>
                <Button href="/contact">Contact</Button>
              </>
            )}

            {isProjects && (
              <>
                <Button variant="outline" href="/">Back to Debrief</Button>
                <Button href="/contact">Continue to Contact</Button>
              </>
            )}

            {isContact && (
              <>
                <Button variant="outline" href="/projects">View Projects</Button>
                <Button href="/">Back to Debrief</Button>
              </>
            )}
          </div>
        </div>
      </Container>
    </footer>
  )
}

'use client'
import { Text } from '@/components/LanguageProvider'
import { usePathname } from 'next/navigation'
import Container from './Container'
import Button from './Button'
import { profile } from '@/data/profile'
import { sitePages } from '@/data/site'

export default function Footer() {
  const pathname = usePathname()

  // Walk the pages in nav order: back to the previous page, on to the next one.
  const path = pathname?.startsWith('/projects') ? '/experience' : pathname
  const index = sitePages.findIndex(({ href }) => path?.startsWith(href))
  const prev = index > 0 ? sitePages[index - 1] : { href: '/', label: 'Home' }
  const next = sitePages[index + 1] ?? { href: '/', label: 'Home' }

  return (
    <footer className="border-t border-border/60 mt-16">
      <Container>
        {/* Dynamic CTA row */}
        <div className="py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} <Text>{profile.name}</Text> • <Text>{profile.location}</Text>
          </p>

          <div className="flex flex-wrap gap-2">
            {index >= 0 && <Button variant="outline" href={prev.href}><Text>{`Back to ${prev.label}`}</Text></Button>}
            <Button href={next.href}><Text>{index === -1 ? `Start with ${next.label}` : next.href === '/' ? 'Back to Home' : `Continue to ${next.label}`}</Text></Button>
          </div>
        </div>
      </Container>
    </footer>
  )
}

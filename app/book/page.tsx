import type { Metadata } from 'next'
import { ArrowRight, ExternalLink } from 'lucide-react'
import Container from '@/components/Container'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Button from '@/components/Button'
import { profile } from '@/data/profile'

export const metadata: Metadata = {
  title: 'Book a call | MACHAKA Mohammad',
  description: 'Book a 30-minute call with Mohammad Machaka.',
}

export default function BookMeetingPage() {
  const bookingUrl = profile.calUrl

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="pt-24 relative">
        <Container>
          <div className="mx-auto max-w-3xl py-12">
            <header className="mb-10 text-center sm:text-left">
              <h1 className="font-display font-bold uppercase tracking-tight leading-[0.95] text-4xl sm:text-5xl text-foreground">
                Book a call.
              </h1>
              <p className="mt-4 text-base sm:text-lg text-muted max-w-2xl leading-relaxed">
                Pick a 30-minute slot that works for you. It can be about a role, a project, or just to say hello. You&apos;ll get a video link by email once it&apos;s booked.
              </p>
            </header>

            <div className="overflow-hidden rounded-3xl border border-border bg-surface p-4 sm:p-6 shadow-card">
              <iframe
                src={`${bookingUrl}?embed_type=Inline&hide_gdpr_banner=1&hide_landing_page_details=1`}
                title="Book a 30-minute call"
                className="w-full h-[720px] rounded-2xl border-0 bg-transparent"
                loading="lazy"
              />

              <div className="mt-6 flex justify-center">
                <Button href={bookingUrl} newTab variant="outline">
                  Open in a new tab <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="mt-6 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
                <span>Would you rather email?</span>
                <a
                  href={`mailto:${profile.email}?subject=Intro%20Call%20Request`}
                  className="text-accent-300 hover:text-white hover:underline transition-colors flex items-center gap-1.5 font-medium"
                >
                  {profile.email} <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </Container>
        <Footer />
      </main>
    </div>
  )
}

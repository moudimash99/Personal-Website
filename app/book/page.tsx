import type { Metadata } from 'next'
import { Calendar, Clock, Video, ArrowRight, ExternalLink } from 'lucide-react'
import Container from '@/components/Container'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Panel from '@/components/Panel'
import Button from '@/components/Button'
import { profile } from '@/data/profile'

export const metadata: Metadata = {
  title: 'Book 30 Mins | MACHAKA Mohammad',
  description: 'Book a 30-minute intro call or mission debrief with Mohammad Machaka.',
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
              <div className="inline-flex items-center gap-2 rounded-full border border-accent-400/30 bg-accent-500/10 px-3 py-1 font-mono text-xs uppercase text-accent-300 mb-4">
                <Calendar className="h-3.5 w-3.5" /> Direct Scheduling
              </div>
              <h1 className="font-display font-bold uppercase tracking-tight leading-[0.95] text-4xl sm:text-5xl text-foreground">
                Book 30 Mins.
              </h1>
              <p className="mt-4 text-base sm:text-lg text-muted max-w-2xl leading-relaxed">
                Whether you want to discuss a systems engineering challenge, talk data & cloud pipelines, explore potential collaborations, or just connect—grab a slot directly on my calendar.
              </p>
            </header>

            <div className="grid gap-6 sm:grid-cols-3 mb-10">
              <Panel>
                <div className="p-5 flex flex-col items-start gap-2">
                  <Clock className="h-5 w-5 text-accent-400" />
                  <span className="font-display font-semibold text-foreground text-sm">30 Minutes</span>
                  <p className="text-xs text-muted leading-relaxed">Fast-paced, focused introduction or mission debrief.</p>
                </div>
              </Panel>

              <Panel>
                <div className="p-5 flex flex-col items-start gap-2">
                  <Video className="h-5 w-5 text-accent-400" />
                  <span className="font-display font-semibold text-foreground text-sm">Google Meet / Video</span>
                  <p className="text-xs text-muted leading-relaxed">A video link is generated automatically upon booking.</p>
                </div>
              </Panel>

              <Panel>
                <div className="p-5 flex flex-col items-start gap-2">
                  <Calendar className="h-5 w-5 text-accent-400" />
                  <span className="font-display font-semibold text-foreground text-sm">Instant Confirmation</span>
                  <p className="text-xs text-muted leading-relaxed">Pushes straight to calendar with automated timezone sync.</p>
                </div>
              </Panel>
            </div>

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
                <span>Prefer email instead?</span>
                <a
                  href={`mailto:${profile.email}?subject=Intro%20Call%20Request`}
                  className="text-accent-300 hover:text-white hover:underline transition-colors flex items-center gap-1.5 font-medium"
                >
                  Send an email to {profile.email} <ArrowRight className="h-3.5 w-3.5" />
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

'use client'

import Container from '@/components/Container'
import Starfield from '@/components/Starfield'
import CommandCenterBackdrop from '@/components/CommandCenterBackdrop'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import CredentialsDashboard from '@/components/CredentialsDashboard'

export default function ProjectsPage() {
  return (
    <>
      <CommandCenterBackdrop />
      <Starfield />
      <Nav />
      <main className="pt-24 relative z-30" style={{ isolation: 'isolate' }}>
        <Container>
          <section id="credentials-overview" className="mt-16">
            <CredentialsDashboard />
          </section>
        </Container>
        <Footer />
      </main>
    </>
  )
}
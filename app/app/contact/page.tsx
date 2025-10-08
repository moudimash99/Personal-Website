'use client'
import { Mail } from 'lucide-react'
import Container from '@/components/Container'
import SectionHeader from '@/components/SectionHeader'
import Panel from '@/components/Panel'
import Button from '@/components/Button'
import Starfield from '@/components/Starfield'
import CommandCenterBackdrop from '@/components/CommandCenterBackdrop'
import Nav from '@/components/Nav'                          // ✅ add
import Footer from '@/components/Footer'
export default function ContactPage() {
  return (
    <>
      <CommandCenterBackdrop />
      <Starfield />
      <Nav />                                                {/* ✅ add */}
      <main className="pt-24 relative z-30" style={{ isolation: 'isolate' }}>  {/* ✅ shell */}
        <Container>
          <section id="contact" className="scroll-mt-28 mt-16">
            <SectionHeader icon={<Mail className="h-5 w-5 text-accent-400" />} title="Ground Center Communication" subtitle="If you’d like a quick debrief or want to talk through a mission in detail, I’m easy to reach." />
            <div className="mt-4 grid md:grid-cols-3 gap-5">
              <Panel><div className="p-5"><h3 className="text-lg font-semibold pb-2 font-display">Direct</h3><div className="text-sm space-y-2">
                <p><span className="text-muted">Email:</span> <a className="text-accent-100 hover:underline" href="mailto:machaka.mohammad@gmail.com">machaka.mohammad@gmail.com</a></p>
                <p><span className="text-muted">Phone:</span> <a className="text-accent-100 hover:underline" href="tel:+33753377823">+33 7 53 37 78 23</a></p>
                <p className="text-muted">Location: Toulouse, France • Europe/Paris</p>
              </div></div></Panel>
              <Panel><div className="p-5"><h3 className="text-lg font-semibold pb-2 font-display">Links</h3><div className="text-sm space-y-2">
                <p><a className="text-accent-100 hover:underline" href="https://linkedin.com/in/mohammad-machaka-a63685172" target="_blank">LinkedIn</a></p>
                <p><a className="text-accent-100 hover:underline" href="/cv.pdf" target="_blank">Download CV (PDF)</a></p>
              </div></div></Panel>
              <Panel><div className="p-5"><h3 className="text-lg font-semibold pb-2 font-display">Quick Contact</h3>
                <a href="mailto:machaka.mohammad@gmail.com?subject=Hello%20Mohammad%20—%20Mission%20Debrief"><Button className="w-full">Email Me <Mail className="ml-2 h-4 w-4" /></Button></a>
              </div></Panel>
            </div>
          </section>
        </Container>
        <Footer />

      </main>
    </>
  )
}

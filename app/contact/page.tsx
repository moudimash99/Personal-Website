'use client'
import { Mail, Linkedin, Github, FileText, Calendar } from 'lucide-react'
import Container from '@/components/Container'
import SectionHeader from '@/components/SectionHeader'
import Panel from '@/components/Panel'
import Button from '@/components/Button'
import Starfield from '@/components/Starfield'
import CommandCenterBackdrop from '@/components/CommandCenterBackdrop'
import Nav from '@/components/Nav'                          
import Footer from '@/components/Footer'

export default function ContactPage() {
  return (
    <>
      <CommandCenterBackdrop />
      <Starfield />
      <Nav />                                                
      <main className="pt-24 relative z-30" style={{ isolation: 'isolate' }}>  
        <Container>
          <section id="contact" className="scroll-mt-28 mt-16 pb-32">
            <SectionHeader icon={<Mail className="h-5 w-5 text-accent-400" />} title="Get in touch" subtitle="Email, call, or book a time. Whichever is easiest for you." />
            <div className="mt-4 grid md:grid-cols-3 gap-5">
              <Panel><div className="p-5"><h3 className="text-lg font-semibold pb-2 font-display">Direct</h3><div className="text-sm space-y-2">
                <p><span className="text-muted">Email:</span> <a className="text-accent-100 hover:underline" href="mailto:machaka.mohammad@gmail.com">machaka.mohammad@gmail.com</a></p>
                <p><span className="text-muted">Phone:</span> <a className="text-accent-100 hover:underline" href="tel:+33753377823">+33 7 53 37 78 23</a></p>
                <p className="text-muted">Location: Toulouse, France • Europe/Paris</p>
              </div></div></Panel>
              <Panel>
                <div className="p-5">
                  <h3 className="text-lg font-semibold pb-4 font-display">Links</h3>
                  <div className="text-sm space-y-4">
                    <p>
                      <a className="text-accent-100 hover:text-white hover:underline flex items-center gap-2.5 transition-colors" href="https://linkedin.com/in/mohammad-machaka-a63685172" target="_blank">
                        <Linkedin className="h-4 w-4" /> LinkedIn
                      </a>
                    </p>
                    <p>
                      <a className="text-accent-100 hover:text-white hover:underline flex items-center gap-2.5 transition-colors" href="https://github.com/moudimash99/" target="_blank">
                        <Github className="h-4 w-4" /> GitHub
                      </a>
                    </p>
                    <p>
                      <a className="text-accent-100 hover:text-white hover:underline flex items-center gap-2.5 transition-colors" href="/cv.pdf" target="_blank">
                        <FileText className="h-4 w-4" /> Download CV (PDF)
                      </a>
                    </p>
                  </div>
                </div>
              </Panel>
              <Panel>
                <div className="p-5 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-lg font-semibold pb-2 font-display">Schedule a call</h3>
                    <p className="text-sm text-muted mb-4">Have a role or a project in mind? Book 30 minutes and tell me about it. I&apos;m always glad to hear what people are building.</p>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <Button href="/book" className="w-full"><Calendar className="mr-2 h-4 w-4" /> Book a call</Button>
                    <Button href="mailto:machaka.mohammad@gmail.com?subject=Hello%20Mohammad" variant="outline" className="w-full"><Mail className="mr-2 h-4 w-4" /> Send an email</Button>
                  </div>
                </div>
              </Panel>
            </div>
          </section>
        </Container>
        <Footer />
      </main>
    </>
  )
}
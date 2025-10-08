'use client'
import { ArrowRight, Mail, MapPinned, Rocket, Satellite, Activity, ChevronRight, Download } from 'lucide-react'
import CommandCenterBackdrop from '@/components/CommandCenterBackdrop'
import Container from '@/components/Container'
import Nav from '@/components/Nav'
import IntroOverlay from '@/components/IntroOverlay'   // new
import Button from '@/components/Button'
import Footer from '@/components/Footer'
import Metrics from '@/components/Metrics'
import Starfield from '@/components/Starfield'



export default function Page() {
  return (
    <>
    
      <CommandCenterBackdrop />
      <Starfield />      
      <Nav />
      <IntroOverlay />      {/* new */}

      <main className="pt-24 relative z-30" style={{ isolation: 'isolate' }}>
        <Container>
          {/* Debrief */}
          <section id="debrief" className="scroll-mt-28">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              <div className="flex-1 space-y-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-accent-700/50 bg-accent-500/10 px-3 py-1 text-xs text-accent-100">
                  <MapPinned className="h-3.5 w-3.5" /> <span>Mission Debrief</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-semibold leading-tight font-display">
                  Flight Director for data-intensive systems.
                </h1>
                <p className="text-xl text-foreground/80 mt-6 max-w-3xl">
                  Cloud/Data engineer with an aerospace mindset — pipelines that launch and keep flying.
                </p>
                <Metrics />
                <div className="flex gap-3 pt-2">
                  <Button href="/projects">Proceed to Projects <ArrowRight className="ml-2 h-4 w-4" /></Button>
                  <Button href="/cv.pdf" variant="outline" newTab>
                    <Download className="mr-2 h-4 w-4" /> Download CV
                  </Button>
                </div>
              </div>
            </div>
          </section>

          

          
        </Container>
        <Footer />
      </main>
    </>
  )
}
'use client'

import { ArrowRight, Download, MapPinned, Terminal, Shield } from 'lucide-react'
import { motion } from 'framer-motion'
import CommandCenterBackdrop from '@/components/CommandCenterBackdrop'
import Container from '@/components/Container'
import Nav from '@/components/Nav'
import IntroOverlay from '@/components/IntroOverlay'
import Button from '@/components/Button'
import Footer from '@/components/Footer'
import Metrics from '@/components/Metrics'
import Starfield from '@/components/Starfield'
import CredentialsDashboard from '@/components/CredentialsDashboard'
import { profile } from '@/data/profile'

// Animation variants for staggered reveal
const heroContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
}

const heroItemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 90,
      damping: 14
    }
  }
}

export default function Page() {
  return (
    <>
      <CommandCenterBackdrop />
      <Starfield />      
      <Nav />
      <IntroOverlay />

      <main className="pt-24 relative z-30" style={{ isolation: 'isolate' }}>
        <Container>
          
          {/* Debrief / Hero Section */}
          <motion.section 
            id="debrief" 
            className="scroll-mt-28 py-10 md:py-16"
            variants={heroContainerVariants}
            initial="hidden"
            animate="show"
          >
            <div className="flex flex-col lg:flex-row items-start gap-8">
              <div className="flex-1 space-y-6">
                
                {/* Status Indicator Badge */}
                <motion.div 
                  variants={heroItemVariants}
                  className="inline-flex items-center gap-2.5 rounded-full border border-teal-500/30 bg-teal-950/40 px-3.5 py-1.5 text-xs text-accent-300 backdrop-blur-md"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                  </span>
                  <span className="font-mono text-[10px] tracking-widest uppercase">SYS_NOMINAL • MISSION_DEBRIEF</span>
                </motion.div>
                
                {/* Headline with metallic / glow gradient styling */}
                <motion.h1 
                  variants={heroItemVariants}
                  className="text-4xl md:text-6xl font-semibold leading-tight font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-teal-200"
                >
                  {profile.headline} for <span className="text-teal-400 font-bold hover:text-teal-300 transition-colors duration-300">data-intensive</span> systems.
                </motion.h1>

                {/* Subheadlines with bordered callout styling */}
                <motion.div 
                  variants={heroItemVariants}
                  className="space-y-4 text-lg md:text-xl text-foreground/90 max-w-3xl leading-relaxed border-l-2 border-accent-600/30 pl-5"
                >
                  <p className="font-medium text-white/95">
                    {profile.introLines[0]}
                  </p>
                  <p className="text-muted text-base md:text-lg">
                    {profile.introLines[1]}
                  </p>
                  <p className="text-muted/80 text-sm md:text-base italic">
                    {profile.introLines[2]}
                  </p>
                </motion.div>

                {/* Micro metrics highlight */}
                <motion.div variants={heroItemVariants} className="pt-2">
                  <Metrics />
                </motion.div>

                {/* Action buttons */}
                <motion.div variants={heroItemVariants} className="flex flex-wrap gap-4 pt-2">
                  <Button href="/projects" className="bg-teal-600 hover:bg-teal-500 text-white shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.5)] transition-all duration-300">
                    Proceed to Projects <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button href={profile.cvUrl} variant="outline" newTab className="border-accent-700/50 hover:bg-white/5">
                    <Download className="mr-2 h-4 w-4" /> Download CV
                  </Button>
                </motion.div>

              </div>
            </div>
          </motion.section>

          {/* Credentials and Certifications Dashboard (Worked for Airbus, GP, Murex, AWS SAA, INCOSE ASEP, ISAE SUPAERO) */}
          <section id="credentials-sector" className="pt-8">
            <CredentialsDashboard />
          </section>

        </Container>
        <Footer />
      </main>
    </>
  )
}
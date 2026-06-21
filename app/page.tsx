'use client'

import { ArrowRight, Download, MapPinned, Plane, Satellite, Activity, Cloud, Shield, GraduationCap } from 'lucide-react'
import { motion } from 'framer-motion'
import CommandCenterBackdrop from '@/components/CommandCenterBackdrop'
import Container from '@/components/Container'
import Nav from '@/components/Nav'
import IntroOverlay from '@/components/IntroOverlay'
import Button from '@/components/Button'
import Footer from '@/components/Footer'
import Metrics from '@/components/Metrics'
import Starfield from '@/components/Starfield'
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
                  className="inline-flex items-center gap-2 rounded-full border border-accent-700/50 bg-accent-500/10 px-3 py-1 text-xs text-accent-100"
                >
                  <MapPinned className="h-3.5 w-3.5" /> <span>Mission Debrief</span>
                </motion.div>
                
                {/* Headline */}
                <motion.h1 
                  variants={heroItemVariants}
                  className="text-4xl md:text-6xl font-semibold leading-tight font-display"
                >
                  {profile.headline} for data-intensive systems.
                </motion.h1>

                {/* Subheadlines */}
                <motion.p variants={heroItemVariants} className="text-xl text-foreground/80 mt-6 max-w-3xl">
                  {profile.introLines[0]}
                </motion.p>
                <motion.p variants={heroItemVariants} className="text-lg text-foreground/75 max-w-3xl">
                  {profile.introLines[1]}
                </motion.p>
                <motion.p variants={heroItemVariants} className="text-base text-muted max-w-3xl">
                  {profile.introLines[2]}
                </motion.p>

                {/* Micro metrics highlight */}
                <motion.div variants={heroItemVariants} className="pt-2">
                  <Metrics />
                </motion.div>

                {/* Action buttons */}
                <motion.div variants={heroItemVariants} className="flex gap-3 pt-2">
                  <Button href="/projects">Proceed to Projects <ArrowRight className="ml-2 h-4 w-4" /></Button>
                  <Button href={profile.cvUrl} variant="outline" newTab>
                    <Download className="mr-2 h-4 w-4" /> Download CV
                  </Button>
                </motion.div>
                {/* Simple Credentials Row */}
                <motion.div variants={heroItemVariants} className="pt-8 mt-4 border-t border-accent-900/30">
                  <p className="text-[11px] font-mono text-muted uppercase tracking-wider mb-4">Credentials & Affiliations</p>
                  <div className="flex flex-wrap gap-5 items-center opacity-80 text-accent-100">
                    <div className="flex items-center gap-2 text-sm font-medium"><Plane className="h-4 w-4"/> Airbus</div>
                    <div className="flex items-center gap-2 text-sm font-medium"><Satellite className="h-4 w-4"/> Green Praxis</div>
                    <div className="flex items-center gap-2 text-sm font-medium"><Activity className="h-4 w-4"/> Murex</div>
                    <div className="flex items-center gap-2 text-sm font-medium"><Cloud className="h-4 w-4"/> AWS Certified</div>
                    <div className="flex items-center gap-2 text-sm font-medium"><Shield className="h-4 w-4"/> INCOSE ASEP</div>
                    <div className="flex items-center gap-2 text-sm font-medium"><GraduationCap className="h-4 w-4"/> ISAE-SUPAERO</div>
                  </div>
                </motion.div>

              </div>
            </div>
          </motion.section>

        </Container>
        <Footer />
      </main>
    </>
  )
}
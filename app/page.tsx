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
                  className="inline-flex items-center gap-2.5 rounded-full border border-teal-500/30 bg-teal-950/40 px-3.5 py-1.5 text-xs text-accent-300 backdrop-blur-md"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                  </span>
                  <span className="font-mono text-[10px] tracking-widest uppercase">SYS_NOMINAL • MISSION_DEBRIEF</span>
                </motion.div>
                
                {/* Headline */}
                <motion.h1 
                  variants={heroItemVariants}
                  className="text-4xl md:text-6xl font-semibold leading-tight font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-teal-200"
                >
                  {profile.headline} for <span className="text-teal-400 font-bold hover:text-teal-300 transition-colors duration-300">data-intensive</span> systems.
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
                {/* Big Catchy Credentials Row */}
                <motion.div variants={heroItemVariants} className="pt-10 mt-6 border-t border-accent-900/40">
                  <p className="text-xs font-mono text-accent-300/80 uppercase tracking-[0.2em] mb-5">Trusted & Certified By</p>
                  <div className="flex flex-wrap gap-4 items-center text-accent-100">
                    <div className="glass px-5 py-3 rounded-2xl flex items-center gap-3 hover:scale-105 hover:bg-teal-900/30 hover:border-teal-500/50 transition-all duration-300 cursor-default shadow-[0_0_15px_rgba(20,184,166,0.1)] hover:shadow-[0_0_25px_rgba(20,184,166,0.3)]">
                      <Plane className="h-6 w-6 text-blue-400"/>
                      <span className="font-display font-bold tracking-wide text-lg text-white">Airbus</span>
                    </div>
                    <div className="glass px-5 py-3 rounded-2xl flex items-center gap-3 hover:scale-105 hover:bg-emerald-900/30 hover:border-emerald-500/50 transition-all duration-300 cursor-default shadow-[0_0_15px_rgba(52,211,153,0.1)] hover:shadow-[0_0_25px_rgba(52,211,153,0.3)]">
                      <Satellite className="h-6 w-6 text-emerald-400"/>
                      <span className="font-display font-bold tracking-wide text-lg text-white">Green Praxis</span>
                    </div>
                    <div className="glass px-5 py-3 rounded-2xl flex items-center gap-3 hover:scale-105 hover:bg-cyan-900/30 hover:border-cyan-500/50 transition-all duration-300 cursor-default shadow-[0_0_15px_rgba(34,211,238,0.1)] hover:shadow-[0_0_25px_rgba(34,211,238,0.3)]">
                      <Activity className="h-6 w-6 text-cyan-400"/>
                      <span className="font-display font-bold tracking-wide text-lg text-white">Murex</span>
                    </div>
                    <div className="glass px-5 py-3 rounded-2xl flex items-center gap-3 hover:scale-105 hover:bg-amber-900/30 hover:border-amber-500/50 transition-all duration-300 cursor-default shadow-[0_0_15px_rgba(251,191,36,0.1)] hover:shadow-[0_0_25px_rgba(251,191,36,0.3)]">
                      <Cloud className="h-6 w-6 text-amber-400"/>
                      <span className="font-display font-bold tracking-wide text-lg text-white">AWS SAA-C03</span>
                    </div>
                    <div className="glass px-5 py-3 rounded-2xl flex items-center gap-3 hover:scale-105 hover:bg-purple-900/30 hover:border-purple-500/50 transition-all duration-300 cursor-default shadow-[0_0_15px_rgba(168,85,247,0.1)] hover:shadow-[0_0_25px_rgba(168,85,247,0.3)]">
                      <Shield className="h-6 w-6 text-purple-400"/>
                      <span className="font-display font-bold tracking-wide text-lg text-white">INCOSE ASEP</span>
                    </div>
                    <div className="glass px-5 py-3 rounded-2xl flex items-center gap-3 hover:scale-105 hover:bg-violet-900/30 hover:border-violet-500/50 transition-all duration-300 cursor-default shadow-[0_0_15px_rgba(139,92,246,0.1)] hover:shadow-[0_0_25px_rgba(139,92,246,0.3)]">
                      <GraduationCap className="h-6 w-6 text-violet-400"/>
                      <span className="font-display font-bold tracking-wide text-lg text-white">ISAE-SUPAERO</span>
                    </div>
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
'use client'

import { ArrowRight, Download } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import CommandCenterBackdrop from '@/components/CommandCenterBackdrop'
import Container from '@/components/Container'
import Nav from '@/components/Nav'
import IntroOverlay from '@/components/IntroOverlay'
import Button from '@/components/Button'
import Footer from '@/components/Footer'
import Metrics from '@/components/Metrics'
import Starfield from '@/components/Starfield'
import { profile } from '@/data/profile'

// Animation variants
const heroContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 14 } }
}

const credentialCardVariant = {
  hidden: { opacity: 0, scale: 0.85, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 12,
      delay: 0.6 + i * 0.1
    }
  })
}

const credentials = [
  {
    name: 'Airbus',
    subtitle: 'Systems & Data Engineering',
    logo: '/images/logo-airbus.jpg',
    glow: 'rgba(59,130,246,0.4)',
    ring: 'ring-blue-500/40 hover:ring-blue-400/70',
    shadow: 'hover:shadow-[0_0_40px_rgba(59,130,246,0.35)]',
    float: 0,
  },
  {
    name: 'Green Praxis',
    subtitle: 'Cloud & Geo Pipelines',
    logo: '/images/logo-greenpraxis.jpg',
    glow: 'rgba(52,211,153,0.4)',
    ring: 'ring-emerald-500/40 hover:ring-emerald-400/70',
    shadow: 'hover:shadow-[0_0_40px_rgba(52,211,153,0.35)]',
    float: 1.2,
  },
  {
    name: 'Murex',
    subtitle: 'HFT Log Analysis & Delivery',
    logo: '/images/logo-murex.jpg',
    glow: 'rgba(34,211,238,0.4)',
    ring: 'ring-cyan-500/40 hover:ring-cyan-400/70',
    shadow: 'hover:shadow-[0_0_40px_rgba(34,211,238,0.35)]',
    float: 0.6,
  },
  {
    name: 'AWS SAA-C03',
    subtitle: 'Solutions Architect Certified',
    logo: '/images/logo-aws.jpg',
    glow: 'rgba(251,191,36,0.4)',
    ring: 'ring-amber-500/40 hover:ring-amber-400/70',
    shadow: 'hover:shadow-[0_0_40px_rgba(251,191,36,0.35)]',
    float: 1.8,
  },
  {
    name: 'INCOSE ASEP',
    subtitle: 'Systems Engineering Professional',
    logo: '/images/logo-incose.jpg',
    glow: 'rgba(168,85,247,0.4)',
    ring: 'ring-purple-500/40 hover:ring-purple-400/70',
    shadow: 'hover:shadow-[0_0_40px_rgba(168,85,247,0.35)]',
    float: 0.3,
  },
  {
    name: 'ISAE-SUPAERO',
    subtitle: 'MS Systems Engineering',
    logo: '/images/logo-isae.jpg',
    glow: 'rgba(139,92,246,0.4)',
    ring: 'ring-violet-500/40 hover:ring-violet-400/70',
    shadow: 'hover:shadow-[0_0_40px_rgba(139,92,246,0.35)]',
    float: 1.5,
  },
  {
    name: 'Azure Fundamentals',
    subtitle: 'AZ-900 Certified',
    logo: '/images/logo-murex.jpg', // Reusing placeholder logo
    glow: 'rgba(14,165,233,0.4)',
    ring: 'ring-sky-500/40 hover:ring-sky-400/70',
    shadow: 'hover:shadow-[0_0_40px_rgba(14,165,233,0.35)]',
    float: 0.8,
  },
  {
    name: 'HashiCorp TF',
    subtitle: 'Terraform Associate',
    logo: '/images/logo-greenpraxis.jpg', // Reusing placeholder logo
    glow: 'rgba(236,72,153,0.4)',
    ring: 'ring-pink-500/40 hover:ring-pink-400/70',
    shadow: 'hover:shadow-[0_0_40px_rgba(236,72,153,0.35)]',
    float: 2.1,
  },
]

export default function Page() {
  return (
    <>
      <CommandCenterBackdrop />
      <Starfield />
      <Nav />
      <IntroOverlay />

      <main className="pt-16 relative z-30" style={{ isolation: 'isolate' }}>
        <Container>

          {/* Hero Section */}
          <motion.section
            id="debrief"
            className="scroll-mt-20 py-4 md:py-6"
            variants={heroContainer}
            initial="hidden"
            animate="show"
          >
            <div className="flex flex-col lg:flex-row items-start gap-8">
              <div className="flex-1 space-y-3">

                {/* Headline */}
                <motion.h1
                  variants={fadeUp}
                  className="text-4xl md:text-6xl font-semibold leading-tight font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-teal-200"
                >
                  {profile.headline} for{' '}
                  <span className="text-teal-400 font-bold">data-intensive</span> systems.
                </motion.h1>

                {/* Intro */}
                <motion.p variants={fadeUp} className="text-lg text-foreground/75 max-w-3xl">
                  {profile.introLines[0]}
                </motion.p>
                <motion.p variants={fadeUp} className="text-base text-foreground/65 max-w-3xl">
                  {profile.introLines[1]}
                </motion.p>

                {/* Metrics */}
                <motion.div variants={fadeUp}>
                  <Metrics />
                </motion.div>

                {/* Buttons */}
                <motion.div variants={fadeUp} className="flex gap-3">
                  <Button href="/projects">
                    Proceed to Projects <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button href={profile.cvUrl} variant="outline" newTab>
                    <Download className="mr-2 h-4 w-4" /> Download CV
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* ═══════════════════════════════════════════════════════════════
              CREDENTIALS — Big, Logo-first, Alive
              ═══════════════════════════════════════════════════════════════ */}
          <section className="pt-8 pb-16 w-full max-w-5xl mx-auto">
            <div className="space-y-16">
              
              {/* Tier 1 - The Experience Band */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-6 flex justify-center md:justify-start"
                >
                  <h3 className="text-xs font-mono font-medium text-accent-500/70 uppercase tracking-[0.2em]">
                    Trusted By
                  </h3>
                </motion.div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-6 justify-center">
                  {credentials.slice(0, 3).map((cred, i) => (
                    <motion.div
                      key={cred.name}
                      custom={i}
                      variants={credentialCardVariant}
                      initial="hidden"
                      animate="show"
                      whileHover={{ scale: 1.05, y: -4 }}
                      className={`
                        glass rounded-2xl p-5 flex flex-col items-center justify-center text-center
                        cursor-default transition-all duration-500 h-full min-h-[180px]
                        ring-1 ${cred.ring} ${cred.shadow}
                        group relative overflow-hidden
                      `}
                    >
                      <motion.div
                        className="absolute -top-6 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none"
                        style={{ background: cred.glow }}
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      />
                      <motion.div
                        className="relative z-10 w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden ring-1 ring-white/10 mb-4 shadow-lg shrink-0"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: cred.float }}
                      >
                        <Image src={cred.logo} alt={`${cred.name} logo`} fill sizes="80px" className="object-cover" />
                      </motion.div>
                      <h3 className="relative z-10 font-display font-bold text-sm md:text-base text-white group-hover:text-accent-300 transition-colors duration-300 leading-tight">
                        {cred.name}
                      </h3>
                      <p className="relative z-10 text-[10px] md:text-[11px] text-muted mt-1 leading-snug">
                        {cred.subtitle}
                      </p>
                      <motion.div
                        className="absolute top-3 right-3 h-1.5 w-1.5 rounded-full"
                        style={{ background: cred.glow }}
                        animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: cred.float }}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Tier 2 - The Credentials Band */}
              <div className="w-full overflow-hidden">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mb-6 flex justify-center md:justify-start"
                >
                  <h3 className="text-xs font-mono font-medium text-accent-500/70 uppercase tracking-[0.2em]">
                    Certified By
                  </h3>
                </motion.div>

                <div className="flex items-stretch overflow-x-auto gap-4 lg:gap-6 pb-6 pt-2 snap-x snap-mandatory no-scrollbar">
                  {credentials.slice(3).map((cred, i) => (
                    <motion.div
                      key={cred.name}
                      custom={i + 3}
                      variants={credentialCardVariant}
                      initial="hidden"
                      animate="show"
                      whileHover={{ scale: 1.05, y: -4 }}
                      className={`
                        min-w-[160px] md:min-w-[180px] snap-center shrink-0
                        glass rounded-2xl p-5 flex flex-col items-center justify-center text-center
                        cursor-default transition-all duration-500 h-full min-h-[180px]
                        ring-1 ${cred.ring} ${cred.shadow}
                        group relative overflow-hidden
                      `}
                    >
                      <motion.div
                        className="absolute -top-6 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none"
                        style={{ background: cred.glow }}
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      />
                      <motion.div
                        className="relative z-10 w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden ring-1 ring-white/10 mb-4 shadow-lg shrink-0"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: cred.float }}
                      >
                        <Image src={cred.logo} alt={`${cred.name} logo`} fill sizes="80px" className="object-cover" />
                      </motion.div>
                      <h3 className="relative z-10 font-display font-bold text-sm md:text-base text-white group-hover:text-accent-300 transition-colors duration-300 leading-tight">
                        {cred.name}
                      </h3>
                      <p className="relative z-10 text-[10px] md:text-[11px] text-muted mt-1 leading-snug">
                        {cred.subtitle}
                      </p>
                      <motion.div
                        className="absolute top-3 right-3 h-1.5 w-1.5 rounded-full"
                        style={{ background: cred.glow }}
                        animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: cred.float }}
                      />
                    </motion.div>
                  ))}
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
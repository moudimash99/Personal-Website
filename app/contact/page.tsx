'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Download, MapPinned, Activity, Database, Server, Cpu, Terminal, Radio, CheckCircle2 } from 'lucide-react'
import CommandCenterBackdrop from '@/components/CommandCenterBackdrop'
import Container from '@/components/Container'
import Nav from '@/components/Nav'
import IntroOverlay from '@/components/IntroOverlay'
import Button from '@/components/Button'
import Footer from '@/components/Footer'
import Metrics from '@/components/Metrics'
import Starfield from '@/components/Starfield'
import { profile } from '@/data/profile'
import { missions } from '@/data/missions'

// Animation Variants
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
}

export default function Page() {
  const [systemTime, setSystemTime] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemTime(new Date().toISOString().split('T')[1].slice(0, -1) + 'Z')
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <CommandCenterBackdrop />
      <Starfield />      
      <Nav />
      <IntroOverlay />

      <main className="pt-28 pb-20 relative z-30" style={{ isolation: 'isolate' }}>
        <Container>
          
          {/* Section I: Debrief & Hero */}
          <motion.section 
            id="debrief" 
            className="scroll-mt-32"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            <div className="flex flex-col lg:flex-row items-start gap-12">
              <div className="flex-1 space-y-6">
                <motion.div variants={fadeUp} className="inline-flex items-center gap-3 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5 text-xs text-teal-300 backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                  </span>
                  SYS_NOMINAL • TOULOUSE SECTOR
                </motion.div>
                
                <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-bold leading-tight tracking-tight font-display text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/50">
                  {profile.headline} <br/> for mission-critical systems.
                </motion.h1>
                
                <motion.div variants={fadeUp} className="space-y-4 text-lg md:text-xl text-foreground/80 max-w-3xl leading-relaxed border-l-2 border-teal-500/30 pl-6">
                  <p>{profile.introLines[0]}</p>
                  <p>{profile.introLines[1]}</p>
                </motion.div>

                <motion.div variants={fadeUp} className="pt-6 pb-4">
                  <Metrics />
                </motion.div>

                <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-4">
                  <Button href="#missions" className="bg-teal-600 hover:bg-teal-500 text-white shadow-[0_0_20px_rgba(13,148,136,0.4)]">
                    Access Mission Logs <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button href={profile.cvUrl} variant="outline" newTab className="border-white/20 hover:bg-white/5">
                    <Download className="mr-2 h-4 w-4" /> Download Manifest (CV)
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Section II: Active Telemetry Grid (The WOW Factor) */}
          <motion.section 
            className="mt-32"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Activity className="h-6 w-6 text-teal-400" />
              <h2 className="text-2xl font-semibold font-display tracking-wide uppercase text-white/90">Live Telemetry & Subsystems</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'AWS Architecture', value: 'SAA-C03 Verified', icon: Server, color: 'text-amber-400', status: 'Online' },
                { label: 'Skywise Data Node', value: 'Integrating', icon: Database, color: 'text-blue-400', status: 'Syncing' },
                { label: 'BoardXplorer API', value: 'Python/Django', icon: Terminal, color: 'text-green-400', status: '200 OK' },
                { label: 'Bambu Lab A1', value: 'Extruder Temp: 220°C', icon: Cpu, color: 'text-purple-400', status: 'Printing' }
              ].map((stat, i) => (
                <div key={i} className="glass p-5 flex flex-col justify-between group hover:border-teal-500/50 transition-colors duration-500">
                  <div className="flex justify-between items-start mb-4">
                    <stat.icon className={`h-5 w-5 ${stat.color} opacity-80`} />
                    <span className="text-[10px] uppercase tracking-wider bg-white/5 px-2 py-1 rounded text-muted flex items-center gap-1.5">
                      {stat.status === 'Online' || stat.status === '200 OK' || stat.status === 'Printing' ? (
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                      ) : (
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                      )}
                      {stat.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-muted mb-1 font-mono">{stat.label}</p>
                    <p className="text-lg font-medium text-white/90 tracking-tight">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Section III: Mission Dossiers */}
          <motion.section 
            id="missions" 
            className="mt-32 scroll-mt-28"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-10">
              <div className="flex items-center gap-3">
                <Radio className="h-6 w-6 text-teal-400" />
                <h2 className="text-3xl font-semibold font-display tracking-wide text-white/90">Mission Archives</h2>
              </div>
              <div className="hidden md:block text-sm font-mono text-muted bg-black/40 px-3 py-1.5 rounded-md border border-white/5">
                SYS_TIME: {systemTime}
              </div>
            </div>

            <div className="space-y-12">
              {missions.map((mission, idx) => (
                <motion.div 
                  key={mission.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="glass p-8 md:p-10 relative overflow-hidden group hover:shadow-[0_0_30px_rgba(20,184,166,0.1)] transition-all duration-500"
                >
                  {/* Subtle Background Glow on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 via-transparent to-teal-500/0 group-hover:from-teal-500/5 transition-all duration-700 pointer-events-none" />
                  
                  <div className="relative z-10">
                    <header className="mb-8 border-b border-white/5 pb-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-teal-400">
                            <mission.icon className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold font-display text-white">{mission.title}</h3>
                            <p className="text-sm font-mono text-teal-400/80 mt-1">{mission.meta}</p>
                          </div>
                        </div>
                      </div>
                      <p className="mt-6 text-foreground/80 leading-relaxed max-w-4xl">{mission.profile}</p>
                    </header>

                    <div className="grid md:grid-cols-2 gap-8">
                      {mission.operations.map((op, opIdx) => (
                        <div key={opIdx} className="bg-black/30 rounded-xl p-6 border border-white/5 hover:border-white/10 transition-colors">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs font-mono font-bold bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded">OP: {op.code}</span>
                            <h4 className="text-lg font-medium text-white/90">{op.name}</h4>
                          </div>
                          <p className="text-sm text-muted mb-5 h-10">{op.objective}</p>
                          
                          <ul className="space-y-3 mb-6">
                            {op.did.map((item, i) => (
                              <li key={i} className="text-sm text-foreground/75 flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-teal-500/70 mt-0.5 shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>

                          <div className="mt-auto pt-4 border-t border-white/10">
                            <div className="flex flex-wrap gap-2">
                              {op.telemetry.map((t, tIdx) => (
                                <div key={tIdx} className="text-[11px] font-mono bg-white/5 px-2 py-1 rounded-md text-muted border border-white/5 flex items-center gap-1.5">
                                  <span className="text-teal-500/50">{t.label}:</span> <span className="text-white/80">{t.value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

        </Container>
      </main>
      <Footer />
    </>
  )
}
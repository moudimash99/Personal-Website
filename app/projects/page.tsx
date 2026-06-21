'use client'

import Container from '@/components/Container'
import Starfield from '@/components/Starfield'
import CommandCenterBackdrop from '@/components/CommandCenterBackdrop'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { missions } from '@/data/missions'
import { motion } from 'framer-motion'
import { CheckCircle2, Radio } from 'lucide-react'
import { ReactNode } from 'react'

/* ── SVG animations mapped by mission id ── */
const missionGraphics: Record<string, ReactNode> = {
  'airbus-electric-center': (
    <svg className="w-full h-full text-blue-400/30" viewBox="0 0 200 160" fill="none">
      <circle cx="100" cy="80" r="60" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
      <circle cx="100" cy="80" r="38" stroke="currentColor" strokeWidth="0.5" />
      <motion.line x1="100" y1="80" x2="145" y2="40" stroke="currentColor" strokeWidth="1.5"
        animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        style={{ originX: "100px", originY: "80px" }} />
      <motion.circle cx="135" cy="50" r="2.5" fill="#60a5fa"
        animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.5, repeat: Infinity }} />
      <motion.circle cx="70" cy="105" r="3" fill="#2dd4bf"
        animate={{ opacity: [0.1, 0.8, 0.1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
      <path d="M60,80 L90,80 L105,65 L120,80 L140,80" stroke="currentColor" strokeWidth="1" />
      <path d="M93,80 L100,50 L107,50 L100,80" stroke="currentColor" strokeWidth="0.8" />
      <path d="M93,80 L100,110 L107,110 L100,80" stroke="currentColor" strokeWidth="0.8" />
    </svg>
  ),
  'green': (
    <svg className="w-full h-full text-emerald-400/30" viewBox="0 0 200 160" fill="none">
      <circle cx="100" cy="120" r="70" stroke="currentColor" strokeWidth="0.75" />
      <ellipse cx="100" cy="80" rx="80" ry="30" stroke="currentColor" strokeWidth="0.75" transform="rotate(-12 100 80)" />
      <motion.g animate={{ x: [-55, 55, -55], y: [-15, 15, -15], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}>
        <rect x="95" y="72" width="12" height="12" rx="1.5" fill="currentColor" />
        <line x1="82" y1="78" x2="95" y2="78" stroke="currentColor" strokeWidth="2.5" />
        <line x1="107" y1="78" x2="120" y2="78" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="101" cy="66" r="2" fill="#34d399" />
      </motion.g>
      <path d="M100,88 C100,96 88,108 100,115" stroke="#34d399" strokeWidth="1" strokeDasharray="2 2" className="animate-pulse" />
    </svg>
  ),
  'airbus': (
    <svg className="w-full h-full text-blue-400/25" viewBox="0 0 200 160" fill="none">
      <rect x="30" y="30" width="140" height="100" rx="6" stroke="currentColor" strokeWidth="0.75" strokeDasharray="4 4" />
      <motion.rect x="45" y="50" width="50" height="30" rx="3" stroke="#60a5fa" strokeWidth="1" fill="none"
        animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 3, repeat: Infinity }} />
      <motion.rect x="105" y="50" width="50" height="30" rx="3" stroke="#2dd4bf" strokeWidth="1" fill="none"
        animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }} />
      <motion.rect x="75" y="95" width="50" height="25" rx="3" stroke="#60a5fa" strokeWidth="1" fill="none"
        animate={{ opacity: [0.4, 0.9, 0.4] }} transition={{ duration: 3.5, repeat: Infinity, delay: 0.4 }} />
      <line x1="70" y1="80" x2="70" y2="95" stroke="currentColor" strokeWidth="0.75" />
      <line x1="130" y1="80" x2="130" y2="95" stroke="currentColor" strokeWidth="0.75" />
      <line x1="70" y1="95" x2="130" y2="95" stroke="currentColor" strokeWidth="0.75" />
      <line x1="100" y1="95" x2="100" y2="95" stroke="currentColor" strokeWidth="0.75" />
    </svg>
  ),
  'murex': (
    <svg className="w-full h-full text-cyan-400/30" viewBox="0 0 200 160" fill="none">
      <path d="M10,80 L50,80 L62,30 L74,130 L86,60 L94,90 L104,80 L190,80" stroke="currentColor" strokeWidth="1" />
      <motion.path d="M10,80 L50,80 L62,30 L74,130 L86,60 L94,90 L104,80 L190,80"
        stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="40 160"
        animate={{ strokeDashoffset: [-200, 200] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} />
      <line x1="10" y1="25" x2="190" y2="25" stroke="currentColor" strokeWidth="0.25" strokeDasharray="4 4" />
      <line x1="10" y1="135" x2="190" y2="135" stroke="currentColor" strokeWidth="0.25" strokeDasharray="4 4" />
      <text x="130" y="42" fill="currentColor" className="text-[8px] font-mono">THR: 98.4%</text>
      <text x="130" y="56" fill="currentColor" className="text-[8px] font-mono">LAT: &lt;1.2ms</text>
    </svg>
  ),
  'zaka': (
    <svg className="w-full h-full text-teal-400/30" viewBox="0 0 200 160" fill="none">
      <rect x="40" y="40" width="120" height="80" rx="4" stroke="currentColor" strokeWidth="0.75" />
      <motion.circle cx="80" cy="80" r="20" stroke="#2dd4bf" strokeWidth="1" fill="none"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity }} />
      <motion.circle cx="130" cy="70" r="14" stroke="#5eead4" strokeWidth="0.8" fill="none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }} />
      <motion.rect x="115" y="95" width="30" height="15" rx="2" stroke="currentColor" strokeWidth="0.75"
        animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} />
      <text x="55" y="130" fill="currentColor" className="text-[7px] font-mono">GPU_STREAMS: 400+</text>
    </svg>
  ),
  'aimtools': (
    <svg className="w-full h-full text-teal-400/25" viewBox="0 0 200 160" fill="none">
      <rect x="30" y="50" width="60" height="60" rx="5" stroke="currentColor" strokeWidth="0.75" />
      <rect x="110" y="50" width="60" height="60" rx="5" stroke="currentColor" strokeWidth="0.75" />
      <motion.path d="M90,80 L110,80" stroke="#5eead4" strokeWidth="1.5" strokeDasharray="4 4"
        animate={{ strokeDashoffset: [0, -16] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
      <text x="42" y="78" fill="currentColor" className="text-[7px] font-mono">API</text>
      <text x="42" y="90" fill="currentColor" className="text-[7px] font-mono">C# / .NET</text>
      <text x="120" y="78" fill="currentColor" className="text-[7px] font-mono">UI</text>
      <text x="120" y="90" fill="currentColor" className="text-[7px] font-mono">Angular</text>
      <motion.circle cx="100" cy="130" r="3" fill="#5eead4"
        animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }} />
      <text x="70" y="145" fill="currentColor" className="text-[7px] font-mono">Azure Cloud</text>
    </svg>
  ),
}

export default function ProjectsPage() {
  return (
    <>
      <CommandCenterBackdrop />
      <Starfield />
      <Nav />
      <main className="pt-24 relative z-30" style={{ isolation: 'isolate' }}>
        <Container>

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between border-b border-white/10 pb-6 mb-10 mt-16"
          >
            <div className="flex items-center gap-3">
              <Radio className="h-6 w-6 text-teal-400" />
              <h2 className="text-3xl font-semibold font-display tracking-wide text-white/90">Mission Archives</h2>
            </div>
          </motion.div>

          {/* Mission Cards */}
          <div className="space-y-12">
            {missions.map((mission, idx) => (
              <motion.div
                key={mission.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className="glass p-8 md:p-10 relative overflow-hidden group hover:shadow-[0_0_30px_rgba(20,184,166,0.1)] transition-all duration-500"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 via-transparent to-teal-500/0 group-hover:from-teal-500/5 transition-all duration-700 pointer-events-none" />

                <div className="relative z-10">
                  {/* Full-width animated SVG banner */}
                  {missionGraphics[mission.id] && (
                    <div className="w-full h-44 md:h-56 bg-black/40 rounded-xl border border-white/5 group-hover:border-teal-500/20 transition-all duration-500 overflow-hidden flex items-center justify-center p-4 mb-8 relative">
                      {/* Subtle scanning line */}
                      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-teal-400/40 to-transparent animate-[shimmer_3s_infinite]" />
                      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-teal-400/20 to-transparent" />
                      {missionGraphics[mission.id]}
                    </div>
                  )}

                  {/* Mission identity header */}
                  <header className="mb-8 border-b border-white/5 pb-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-teal-400">
                        <mission.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold font-display text-white">{mission.title}</h3>
                        <p className="text-sm font-mono text-teal-400/80 mt-1">{mission.meta}</p>
                      </div>
                    </div>
                    <p className="mt-6 text-foreground/80 leading-relaxed max-w-4xl">{mission.profile}</p>
                  </header>

                  {/* Operations grid */}
                  <div className="grid md:grid-cols-2 gap-8">
                    {mission.operations.map((op, opIdx) => (
                      <div key={opIdx} className="bg-black/30 rounded-xl p-6 border border-white/5 hover:border-white/10 transition-colors">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs font-mono font-bold bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded">OP: {op.code}</span>
                          <h4 className="text-lg font-medium text-white/90">{op.name}</h4>
                        </div>
                        <p className="text-sm text-muted mb-5">{op.objective}</p>

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

        </Container>
        <Footer />
      </main>
    </>
  )
}
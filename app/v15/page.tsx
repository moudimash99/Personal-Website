'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import CommandCenterBackdrop from '@/components/CommandCenterBackdrop'
import Starfield from '@/components/Starfield'
import { credentials } from '../data/profile'

export default function CinematicLayers() {
  return (
    <div className="relative min-h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans flex flex-col justify-between">
      <div className="fixed inset-0 pointer-events-none z-0">
        <CommandCenterBackdrop />
        <Starfield />
      </div>

      <Link href="/" className="absolute top-8 left-8 text-xs font-mono tracking-widest text-white/40 hover:text-white z-50 uppercase transition-colors">
        [ Return to Hub ]
      </Link>

      {/* BACKGROUND LAYER: Massive "RESILIENCE" */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 0.05, scale: 1 }}
        transition={{ duration: 4, ease: "easeOut" }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-0 select-none"
      >
        <h1 className="text-[15rem] md:text-[25rem] font-black tracking-tighter text-white leading-none mix-blend-overlay">
          RESILIENCE
        </h1>
      </motion.div>

      {/* FOREGROUND LAYER: Main Text */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center pt-32 px-6">
        <div className="text-center w-full max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 2 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
              Architecting resilience
            </h2>
            <h3 className="text-2xl md:text-4xl font-light text-slate-400">
              for data-intensive systems.
            </h3>
          </motion.div>
        </div>
      </main>

      {/* BOTTOM LAYER: Fluid Floating Credentials */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 2 }}
        className="relative z-10 w-full pb-16 px-6 h-[400px]"
      >
        <div className="absolute w-full max-w-6xl left-1/2 -translate-x-1/2 h-full">
          {credentials.map((cred, i) => {
            const positions = [
              { bottom: '60%', left: '10%' },
              { bottom: '20%', left: '25%' },
              { bottom: '80%', left: '45%' },
              { bottom: '10%', left: '60%' },
              { bottom: '50%', left: '80%' },
              { bottom: '30%', left: '5%' },
            ]
            const pos = positions[i % positions.length]

            return (
              <motion.div
                key={cred.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3 + i * 0.15, duration: 1.5, ease: "easeOut" }}
                whileHover={{ scale: 1.1, zIndex: 50 }}
                className="absolute p-4 flex items-center gap-4 bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl w-56 shadow-2xl cursor-crosshair transition-colors hover:bg-white/[0.05]"
                style={{ bottom: pos.bottom, left: pos.left, boxShadow: `0 10px 30px ${cred.glow}` }}
              >
                <div className="w-10 h-10 relative bg-black/40 rounded-xl p-2 border border-white/5">
                  <Image src={cred.logo} alt={cred.name} fill className="object-contain p-1" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{cred.name}</h4>
                  <p className="text-[8px] text-slate-400 uppercase tracking-widest mt-1">{cred.subtitle}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.footer>
    </div>
  )
}

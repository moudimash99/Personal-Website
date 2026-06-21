'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import CommandCenterBackdrop from '@/components/CommandCenterBackdrop'
import Starfield from '@/components/Starfield'
import { profile, credentials } from '../data/profile'

export default function RadarMonolith() {
  return (
    <div className="relative min-h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans">
      <CommandCenterBackdrop />
      <Starfield />

      <Link href="/" className="absolute top-8 left-8 text-xs font-mono tracking-widest text-teal-500/50 hover:text-teal-400 z-50 uppercase">
        [ Return to Hub ]
      </Link>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        {/* The Monolith */}
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-white/[0.02] backdrop-blur-[24px] border border-white/10 rounded-3xl p-12 md:p-20 shadow-2xl overflow-hidden"
        >
          {/* Subtle Monolith Top-Lit Edge */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1.5 }}>
            <h2 className="text-sm md:text-base font-mono text-teal-400/80 tracking-[0.4em] uppercase mb-6 text-center">
              {profile.title}
            </h2>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 pb-4">
              {profile.name}
            </h1>
            <div className="mt-8 text-lg md:text-xl text-center font-light text-slate-300 max-w-2xl mx-auto leading-relaxed">
              <p>{profile.introLines[0]}</p>
            </div>
            <div className="mt-12 flex justify-center">
              <Link href="/projects" className="group relative inline-flex items-center gap-4 px-8 py-4 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all overflow-hidden">
                <span className="relative z-10 text-xs font-mono uppercase tracking-[0.2em]">Engage</span>
                <div className="absolute inset-0 bg-teal-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Orbiting Credentials */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 2 }}
          className="mt-16 w-full max-w-6xl relative h-32 flex justify-center items-center"
        >
          {credentials.map((cred, i) => {
            const offset = (i - 2.5) * 120 // Spread them horizontally
            const verticalOffset = Math.abs(i - 2.5) * 20 // Arch them slightly
            return (
              <motion.div
                key={cred.name}
                animate={{ 
                  y: [verticalOffset, verticalOffset - 10, verticalOffset],
                }}
                transition={{ 
                  duration: 4 + (i % 3), 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                style={{ x: offset, position: 'absolute' }}
                className="group relative"
              >
                <div className="w-16 h-16 rounded-full bg-white/[0.03] backdrop-blur-md border border-white/10 flex items-center justify-center overflow-hidden hover:scale-110 hover:bg-white/10 transition-all duration-500 cursor-pointer shadow-lg" style={{ boxShadow: `0 0 20px ${cred.glow}` }}>
                  <Image src={cred.logo} alt={cred.name} width={32} height={32} className="object-contain opacity-70 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0" />
                </div>
                {/* Tooltip */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none text-center">
                  <p className="text-xs font-bold text-white">{cred.name}</p>
                  <p className="text-[9px] font-mono text-teal-400 uppercase tracking-widest">{cred.subtitle}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}

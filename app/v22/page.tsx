'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import CommandCenterBackdrop from '@/components/CommandCenterBackdrop'
import Starfield from '@/components/Starfield'
import { profile, credentials } from '../data/profile'

export default function HolographicProjection() {
  return (
    <div className="relative h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans flex flex-col items-center justify-center">
      <div className="fixed inset-0 pointer-events-none z-0">
        <CommandCenterBackdrop />
        <Starfield />
        <div className="absolute inset-0 bg-blue-900/10 mix-blend-color-dodge" />
      </div>

      <Link href="/" className="absolute top-8 left-8 text-xs font-mono tracking-widest text-cyan-500/50 hover:text-cyan-400 z-50 uppercase transition-colors">
        [ Return to Hub ]
      </Link>

      <main className="relative z-10 flex flex-col items-center justify-center w-full max-w-5xl px-6">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="relative bg-white/[0.01] border border-cyan-500/10 backdrop-blur-sm p-12 md:p-20 rounded-[3rem] text-center shadow-[0_0_100px_rgba(6,182,212,0.1)] before:absolute before:inset-0 before:rounded-[3rem] before:bg-gradient-to-b before:from-cyan-500/5 before:to-transparent before:pointer-events-none"
        >
          {/* Main Holographic Header */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-emerald-400 leading-[1.1] drop-shadow-[0_0_20px_rgba(6,182,212,0.5)]">
            Architecting resilience
          </h1>
          
          <h2 className="mt-4 text-xl md:text-3xl font-light text-cyan-200/80">
            for data-intensive systems.
          </h2>

          {/* Intro Text */}
          <div className="mt-10 max-w-2xl mx-auto space-y-3 text-sm md:text-base text-cyan-100/60 font-light">
            <p>{profile.introLines[0]}</p>
            <p className="italic">{profile.introLines[1]}</p>
          </div>

          {/* Holographic Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent my-10" />

          {/* Credentials */}
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            {credentials.map((cred, i) => (
              <motion.div 
                key={cred.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 + i * 0.1, duration: 1 }}
                className="group relative"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 relative opacity-50 group-hover:opacity-100 group-hover:drop-shadow-[0_0_15px_rgba(6,182,212,0.8)] transition-all duration-300">
                  <Image src={cred.logo} alt={cred.name} fill className="object-contain" />
                </div>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </main>
    </div>
  )
}

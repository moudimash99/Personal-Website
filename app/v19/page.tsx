'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import CommandCenterBackdrop from '@/components/CommandCenterBackdrop'
import Starfield from '@/components/Starfield'
import { profile, credentials } from '../data/profile'

export default function TheWarmContrast() {
  return (
    <div className="relative h-screen bg-[#020617] text-amber-50 overflow-hidden font-sans flex flex-col justify-between items-center">
      <div className="fixed inset-0 pointer-events-none z-0">
        <CommandCenterBackdrop />
        <Starfield />
        <div className="absolute inset-0 bg-blue-950/40 mix-blend-multiply" />
      </div>

      <Link href="/" className="absolute top-8 left-8 text-xs font-mono tracking-widest text-amber-500/50 hover:text-amber-400 z-50 uppercase transition-colors">
        [ Return to Hub ]
      </Link>

      <main className="relative z-10 flex flex-col items-center justify-center w-full max-w-7xl px-6 h-full pt-16 pb-12">
        {/* TOP: Cinematic Typography in Warm Gold/Amber */}
        <div className="text-center w-full flex-shrink-0">
          <motion.div
            initial={{ opacity: 0, y: -20, filter: 'blur(20px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-amber-700 leading-[0.9]">
              Architecting resilience
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 2 }}
            className="mt-6"
          >
            <h2 className="text-2xl md:text-4xl font-light tracking-tight text-amber-200/70">
              for <span className="font-bold text-amber-400 drop-shadow-[0_0_20px_rgba(251,191,36,0.4)]">data-intensive</span> systems.
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 2 }}
            className="mt-8 max-w-3xl mx-auto space-y-4 text-sm md:text-base text-amber-50/60 font-light"
          >
            <p>{profile.introLines[0]}</p>
            <p className="italic text-amber-600 font-medium tracking-wide">{profile.introLines[1]}</p>
          </motion.div>
        </div>

        {/* BOTTOM: Compact Credentials Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 2 }}
          className="w-full mt-auto"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-px bg-amber-500/20" />
            <p className="text-[10px] font-mono text-amber-500/50 uppercase tracking-[0.4em]">Operations Validated By</p>
            <div className="w-12 h-px bg-amber-500/20" />
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
            {credentials.map((cred, i) => (
              <motion.div 
                key={cred.name} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.5 + i * 0.1, duration: 0.8 }}
                className="group relative flex flex-col items-center justify-center p-4"
              >
                <div className="w-12 h-12 relative opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 grayscale sepia group-hover:grayscale-0 group-hover:sepia-0">
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

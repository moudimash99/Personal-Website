'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import CommandCenterBackdrop from '@/components/CommandCenterBackdrop'
import Starfield from '@/components/Starfield'
import { profile, credentials } from '../data/profile'

export default function MonochromaticAqua() {
  return (
    <div className="relative h-screen bg-[#020617] text-teal-100 overflow-hidden font-sans flex flex-col justify-center items-center">
      <div className="fixed inset-0 pointer-events-none z-0">
        <CommandCenterBackdrop />
        <Starfield />
        <div className="absolute inset-0 bg-teal-900/10 mix-blend-color-burn" />
      </div>

      <Link href="/" className="absolute top-8 left-8 text-xs font-mono tracking-widest text-teal-500/50 hover:text-teal-400 z-50 uppercase transition-colors">
        [ Return to Hub ]
      </Link>

      <main className="relative z-10 flex flex-col items-center justify-center w-full max-w-6xl px-6 h-full pt-12 pb-12">
        {/* TOP: Cinematic Typgraphy in Aqua */}
        <div className="text-center w-full flex-shrink-0">
          <motion.div
            initial={{ opacity: 0, scale: 1.1, filter: 'blur(30px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-teal-50 via-teal-200 to-teal-800 leading-[0.9]">
              Architecting resilience
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 2 }}
            className="mt-4"
          >
            <h2 className="text-2xl md:text-4xl font-light tracking-tight text-teal-400/80">
              for <span className="font-medium text-teal-300 drop-shadow-[0_0_15px_rgba(45,212,191,0.6)]">data-intensive</span> systems.
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 2 }}
            className="mt-8 max-w-2xl mx-auto space-y-4 text-sm text-teal-200/60 font-light"
          >
            <p>{profile.introLines[0]}</p>
            <p className="italic text-teal-500/80">{profile.introLines[1]}</p>
          </motion.div>
        </div>

        {/* BOTTOM: Compact Credentials */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 1.5 }}
          className="w-full mt-auto"
        >
          <p className="text-[10px] font-mono text-teal-500/40 uppercase tracking-[0.4em] mb-6 text-center">
            Operations Validated By
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 lg:gap-8">
            {credentials.map((cred) => (
              <div 
                key={cred.name} 
                className="group relative flex items-center justify-center bg-teal-900/20 border border-teal-500/10 p-4 rounded-2xl hover:bg-teal-800/40 hover:border-teal-400/30 transition-all cursor-crosshair w-40 h-16"
              >
                <div className="w-10 h-10 relative opacity-40 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0">
                  <Image src={cred.logo} alt={cred.name} fill className="object-contain drop-shadow-[0_0_8px_rgba(45,212,191,0.4)]" />
                </div>
                <div className="absolute top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center pointer-events-none">
                  <h4 className="text-[9px] font-bold text-teal-100 uppercase tracking-widest">{cred.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
}

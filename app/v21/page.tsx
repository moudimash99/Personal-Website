'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import CommandCenterBackdrop from '@/components/CommandCenterBackdrop'
import Starfield from '@/components/Starfield'
import { profile, credentials } from '../data/profile'

export default function TheFocusedBeam() {
  return (
    <div className="relative h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans flex flex-col items-center justify-center">
      <div className="fixed inset-0 pointer-events-none z-0">
        <CommandCenterBackdrop />
        <Starfield />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <Link href="/" className="absolute top-8 left-8 text-xs font-mono tracking-widest text-cyan-800 hover:text-cyan-600 z-50 uppercase transition-colors">
        [ Return to Hub ]
      </Link>

      <main className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl px-6 text-center">
        
        {/* Core Typography Stack */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="mb-2"
        >
          <h2 className="text-xl md:text-3xl font-light text-cyan-800/80">Architecting</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ delay: 0.5, duration: 2, ease: "easeOut" }}
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.8)] leading-none">
            resilience
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1.5 }}
          className="mt-6"
        >
          <h2 className="text-xl md:text-3xl font-light text-cyan-800/80">
            for data-intensive systems.
          </h2>
        </motion.div>

        {/* Intro Text */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1.5 }}
          className="mt-12 max-w-2xl space-y-2 text-sm text-cyan-700/70 font-light"
        >
          <p>{profile.introLines[0]}</p>
          <p className="italic text-cyan-600">{profile.introLines[1]}</p>
        </motion.div>

        {/* Credentials immediately underneath */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 2 }}
          className="mt-16 w-full"
        >
          <div className="flex justify-center items-center gap-6 md:gap-10">
            {credentials.map((cred) => (
              <div key={cred.name} className="group relative cursor-crosshair">
                <div className="w-8 h-8 md:w-10 md:h-10 relative opacity-20 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-300">
                  <Image src={cred.logo} alt={cred.name} fill className="object-contain drop-shadow-[0_0_10px_rgba(255,255,255,1)]" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </main>
    </div>
  )
}

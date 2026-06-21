'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import CommandCenterBackdrop from '@/components/CommandCenterBackdrop'
import Starfield from '@/components/Starfield'
import { profile, credentials } from '../data/profile'

export default function TheGlassSlate() {
  return (
    <div className="relative h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans flex flex-col items-center">
      <div className="fixed inset-0 pointer-events-none z-0">
        <CommandCenterBackdrop />
        <Starfield />
      </div>

      <Link href="/" className="absolute top-8 left-8 text-xs font-mono tracking-widest text-slate-500 hover:text-slate-300 z-50 uppercase transition-colors">
        [ Return to Hub ]
      </Link>

      <main className="relative z-10 flex flex-col w-full h-full max-w-7xl px-6 pt-20 pb-8">
        
        {/* TOP: Cinematic Typography */}
        <div className="flex-1 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-slate-100 leading-[0.9]">
              Architecting<br/>resilience
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 2 }}
            className="mt-6"
          >
            <h2 className="text-2xl md:text-4xl font-light tracking-tight text-slate-400">
              for <span className="font-medium text-cyan-200">data-intensive</span> systems.
            </h2>
          </motion.div>
        </div>

        {/* BOTTOM: Frosted Glass Dashboard */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1.5 }}
          className="w-full bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center"
        >
          {/* Intro Text */}
          <div className="flex-1 space-y-4 text-sm md:text-base text-slate-400 font-light pr-0 md:pr-12 md:border-r border-slate-700/50">
            <p>{profile.introLines[0]}</p>
            <p className="text-cyan-200/70 italic">{profile.introLines[1]}</p>
          </div>

          {/* Credentials */}
          <div className="w-full md:w-auto">
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-6">Operations Validated By</p>
            <div className="grid grid-cols-3 gap-6">
              {credentials.map((cred) => (
                <div key={cred.name} className="flex justify-center items-center group cursor-crosshair">
                  <div className="w-10 h-10 relative opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                    <Image src={cred.logo} alt={cred.name} fill className="object-contain" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import CommandCenterBackdrop from '@/components/CommandCenterBackdrop'
import Starfield from '@/components/Starfield'
import { profile, credentials } from '../data/profile'

export default function RadarEruption() {
  return (
    <div className="relative min-h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans flex flex-col">
      <div className="fixed inset-0 pointer-events-none z-0">
        <CommandCenterBackdrop />
        <Starfield />
        
        {/* Flash/Eruption Effect */}
        <motion.div 
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 bg-white mix-blend-overlay z-10"
        />
      </div>

      <Link href="/" className="absolute top-8 left-8 text-xs font-mono tracking-widest text-white/40 hover:text-white z-50 uppercase transition-colors">
        [ Return to Hub ]
      </Link>

      {/* TOP: Eruptive Cinematic Typography */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center pt-20 px-6">
        <div className="text-center w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, scale: 3, filter: 'blur(50px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, type: 'spring', bounce: 0.2 }}
          >
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 leading-[0.9]">
              Architecting resilience
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
            className="mt-6 md:mt-10"
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-slate-300">
              for <span className="font-bold text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">data-intensive</span> systems.
            </h2>
          </motion.div>
        </div>
      </main>

      {/* BOTTOM: Pulsing 2-Row Grid */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 2 }}
        className="relative z-10 w-full pb-16 px-6 max-w-5xl mx-auto"
      >
        <p className="text-[10px] font-mono text-white/40 uppercase tracking-[0.4em] mb-8 text-center">
          Operations Validated By
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {credentials.map((cred, i) => (
            <motion.div
              key={cred.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 3 + i * 0.1, duration: 0.8 }}
              className="group relative bg-white/[0.03] backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center overflow-hidden hover:bg-white/[0.08] transition-all cursor-crosshair"
            >
              {/* Eruptive Hover Glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at center, ${cred.glow} 0%, transparent 60%)` }}
              />

              <div className="w-14 h-14 relative opacity-50 group-hover:opacity-100 transition-opacity duration-500 z-10">
                <Image src={cred.logo} alt={cred.name} fill className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
              </div>
              
              <div className="mt-4 z-10">
                <h4 className="text-sm font-bold text-white">{cred.name}</h4>
                <p className="text-[10px] text-white/60 uppercase tracking-widest mt-1">{cred.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.footer>
    </div>
  )
}

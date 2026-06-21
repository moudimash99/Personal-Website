'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import CommandCenterBackdrop from '@/components/CommandCenterBackdrop'
import Starfield from '@/components/Starfield'
import { credentials } from '../data/profile'

export default function VerticalDrop() {
  return (
    <div className="relative min-h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans flex flex-col justify-between">
      <div className="fixed inset-0 pointer-events-none z-0">
        <CommandCenterBackdrop />
        <Starfield />
      </div>

      <Link href="/" className="absolute top-8 left-8 text-xs font-mono tracking-widest text-white/40 hover:text-white z-50 uppercase transition-colors">
        [ Return to Hub ]
      </Link>

      {/* TOP/CENTER: Massive Cinematic Typography */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center pt-20 px-6">
        <div className="text-center w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: -50, filter: 'blur(30px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-6xl md:text-[7rem] lg:text-[9rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/40 leading-[0.85]">
              Architecting<br/>
              resilience
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, filter: 'blur(20px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ delay: 1, duration: 3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 md:mt-12"
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white/80">
              for <span className="text-teal-400 drop-shadow-[0_0_30px_rgba(45,212,191,0.5)]">data-intensive</span> systems.
            </h2>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 2.5, duration: 2 }}
            className="mt-16 flex justify-center"
          >
            <Link href="/projects" className="text-xs font-mono uppercase tracking-[0.3em] text-white/50 hover:text-teal-400 transition-colors border-b border-transparent hover:border-teal-400 pb-2">
              Access Engineering Log
            </Link>
          </motion.div>
        </div>
      </main>

      {/* BOTTOM: Horizontal Credentials Row */}
      <motion.footer 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.5, duration: 2 }}
        className="relative z-10 w-full pb-12 px-6 flex flex-col items-center"
      >
        <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em] mb-8 text-center">
          Trusted & Certified By
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {credentials.map((cred) => (
            <div key={cred.name} className="group relative flex flex-col items-center cursor-pointer">
              <div className="w-12 h-12 md:w-16 md:h-16 relative opacity-40 group-hover:opacity-100 transition-all duration-700 grayscale group-hover:grayscale-0">
                <Image src={cred.logo} alt={cred.name} fill className="object-contain" />
              </div>
              <div className="absolute top-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-center pointer-events-none">
                <h4 className="text-[10px] font-bold text-white uppercase tracking-wider">{cred.name}</h4>
                <p className="text-[9px] text-white/50 whitespace-nowrap">{cred.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.footer>
    </div>
  )
}

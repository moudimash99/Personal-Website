'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import CommandCenterBackdrop from '@/components/CommandCenterBackdrop'
import Starfield from '@/components/Starfield'
import { credentials } from '../data/profile'

export default function SlowBurn() {
  return (
    <div className="relative min-h-screen bg-black text-slate-200 overflow-hidden font-sans flex flex-col justify-between">
      
      {/* Background delayed fade in */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 4 }}
        className="fixed inset-0 pointer-events-none z-0"
      >
        <CommandCenterBackdrop />
        <Starfield />
      </motion.div>

      <Link href="/" className="absolute top-8 left-8 text-xs font-mono tracking-widest text-white/20 hover:text-white z-50 uppercase transition-colors">
        [ Return to Hub ]
      </Link>

      {/* TOP/CENTER: Slow Burn Typography */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center pt-20 px-6">
        <div className="text-center w-full max-w-6xl">
          <motion.h1 
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 4, ease: "easeInOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-white leading-tight"
          >
            Architecting resilience
          </motion.h1>
          
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 4, ease: "easeInOut" }}
            className="mt-6 text-2xl md:text-4xl text-slate-500 font-light"
          >
            for <span className="text-white font-medium">data-intensive</span> systems.
          </motion.h2>
        </div>
      </main>

      {/* BOTTOM: Emerging Data Nodes */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 6, duration: 3 }}
        className="relative z-10 w-full pb-12 px-6 flex flex-col items-center"
      >
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 max-w-5xl">
          {credentials.map((cred, i) => (
            <motion.div 
              key={cred.name} 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 6.5 + i * 0.5, duration: 2 }}
              className="group relative flex flex-col items-center cursor-pointer p-4 rounded-xl hover:bg-white/[0.02] transition-colors"
            >
              <div className="w-10 h-10 relative opacity-30 group-hover:opacity-100 transition-opacity duration-1000 grayscale group-hover:grayscale-0">
                <Image src={cred.logo} alt={cred.name} fill className="object-contain" />
              </div>
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 text-center">
                <h4 className="text-[10px] font-mono text-white/70 uppercase tracking-widest">{cred.name}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.footer>
    </div>
  )
}

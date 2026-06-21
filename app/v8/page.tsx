'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import CommandCenterBackdrop from '@/components/CommandCenterBackdrop'
import Starfield from '@/components/Starfield'
import { profile, credentials } from '../data/profile'

export default function GlassHorizon() {
  return (
    <div className="relative min-h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans flex flex-col justify-between">
      <CommandCenterBackdrop />
      <Starfield />

      {/* TOP: Header */}
      <header className="relative z-10 p-8 flex justify-between items-center">
        <Link href="/" className="text-xs font-mono tracking-widest text-blue-500/50 hover:text-blue-400 uppercase">
          [ Return to Hub ]
        </Link>
        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
      </header>

      {/* CENTER: Massive Cinematic Text */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <motion.p 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1.5 }}
            className="text-sm font-mono text-blue-400 tracking-[0.5em] uppercase mb-8"
          >
            {profile.title}
          </motion.p>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            {profile.name}
          </h1>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 2 }}
            className="mt-10 max-w-2xl mx-auto"
          >
            <p className="text-xl font-light text-slate-400 leading-relaxed">
              {profile.headline}.
            </p>
          </motion.div>
        </motion.div>
      </main>

      {/* BOTTOM: Horizontal Glass Ticker */}
      <motion.footer 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full bg-black/40 backdrop-blur-2xl border-t border-white/5 py-6 px-8"
      >
        <div className="flex items-center justify-between gap-12 overflow-x-auto no-scrollbar max-w-7xl mx-auto">
          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest shrink-0 border-r border-white/10 pr-8">
            Node_Status<br/>
            <span className="text-blue-400">Verified</span>
          </div>
          
          <div className="flex items-center gap-12 shrink-0">
            {credentials.map((cred, i) => (
              <motion.div 
                key={cred.name}
                whileHover={{ scale: 1.1, y: -5 }}
                className="flex items-center gap-4 group cursor-pointer"
              >
                <div className="w-10 h-10 relative opacity-50 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0">
                  <Image src={cred.logo} alt={cred.name} fill className="object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]" />
                </div>
                <div className="hidden md:block">
                  <h4 className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors">{cred.name}</h4>
                  <p className="text-[9px] text-slate-500 uppercase tracking-wider">{cred.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.footer>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  )
}

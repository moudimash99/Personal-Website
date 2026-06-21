'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import CommandCenterBackdrop from '@/components/CommandCenterBackdrop'
import Starfield from '@/components/Starfield'
import { profile, credentials } from '../data/profile'

export default function StealthDashboard() {
  return (
    <div className="relative min-h-screen bg-black text-slate-400 overflow-hidden font-sans">
      <CommandCenterBackdrop />
      <Starfield />

      <Link href="/" className="absolute top-8 left-8 text-xs font-mono tracking-widest text-white/20 hover:text-white z-50 uppercase transition-colors">
        [ Return to Hub ]
      </Link>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        
        {/* Stealth Header */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3 }}
          className="text-center mb-24"
        >
          <h2 className="text-[10px] font-mono text-white/30 tracking-[0.6em] uppercase mb-4">
            {profile.title}
          </h2>
          <h1 className="text-4xl md:text-5xl font-light tracking-[0.2em] text-white/80 uppercase">
            {profile.name}
          </h1>
          <div className="w-px h-16 bg-gradient-to-b from-white/20 to-transparent mx-auto mt-8" />
        </motion.div>

        {/* Stealth Grid */}
        <div className="w-full max-w-5xl">
          <p className="text-[9px] font-mono text-white/20 uppercase tracking-[0.4em] mb-8 text-center">
            System_Nodes // Invisible_Until_Active
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-px bg-white/[0.02]">
            {credentials.map((cred, i) => (
              <motion.div
                key={cred.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 + i * 0.2, duration: 2 }}
                className="group relative bg-black/80 backdrop-blur-sm p-8 flex flex-col items-center text-center cursor-crosshair overflow-hidden transition-all duration-700 hover:bg-white/[0.02]"
              >
                {/* Active Hover Glow */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{ background: `radial-gradient(circle at center, ${cred.glow} 0%, transparent 70%)` }}
                />

                <div className="w-12 h-12 relative opacity-10 group-hover:opacity-100 transition-all duration-700 grayscale group-hover:grayscale-0 z-10">
                  <Image src={cred.logo} alt={cred.name} fill className="object-contain" />
                </div>
                
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform translate-y-4 group-hover:translate-y-0 z-10">
                  <h3 className="text-xs font-bold text-white tracking-widest">{cred.name}</h3>
                  <p className="text-[9px] font-mono text-white/50 uppercase mt-2">{cred.subtitle}</p>
                </div>

                {/* Subtle corner markers */}
                <div className="absolute top-2 left-2 w-1 h-1 border-l border-t border-white/10 group-hover:border-white/50 transition-colors" />
                <div className="absolute bottom-2 right-2 w-1 h-1 border-r border-b border-white/10 group-hover:border-white/50 transition-colors" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stealth Button */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3, duration: 2 }} className="mt-24">
          <Link href="/projects" className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em] hover:text-white transition-colors border-b border-transparent hover:border-white/50 pb-1">
            Access_Database
          </Link>
        </motion.div>

      </div>
    </div>
  )
}

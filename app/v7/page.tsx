'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import CommandCenterBackdrop from '@/components/CommandCenterBackdrop'
import Starfield from '@/components/Starfield'
import { profile, credentials } from '../data/profile'

export default function AsymmetricCommand() {
  return (
    <div className="relative min-h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans">
      <CommandCenterBackdrop />
      <Starfield />

      <Link href="/" className="absolute top-8 left-8 text-xs font-mono tracking-widest text-emerald-500/50 hover:text-emerald-400 z-50 uppercase">
        [ Return to Hub ]
      </Link>

      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
        
        {/* LEFT: Cinematic Typography */}
        <div className="w-full lg:w-1/2 flex items-center p-12 lg:p-24 border-r border-white/[0.05]">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl"
          >
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 2 }}>
              <p className="text-xs font-mono text-emerald-400/80 tracking-[0.5em] uppercase mb-8">
                {profile.title}
              </p>
            </motion.div>
            
            <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-white">
              {profile.name.split(' ').map((word, i) => (
                <span key={i} className="block mb-2">{word}</span>
              ))}
            </h1>
            
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1.5 }}
              className="mt-12 text-lg text-slate-400 font-light leading-relaxed border-l-2 border-emerald-500/30 pl-6"
            >
              {profile.introLines[0]}
            </motion.p>
          </motion.div>
        </div>

        {/* RIGHT: Fluid Glass Credentials */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-12 lg:p-24">
          <div className="relative w-full max-w-md h-[600px]">
            {credentials.map((cred, i) => {
              // Create an asymmetrical layout map
              const positions = [
                { top: '0%', left: '10%' },
                { top: '20%', left: '50%' },
                { top: '40%', left: '0%' },
                { top: '60%', left: '60%' },
                { top: '80%', left: '10%' },
                { top: '100%', left: '40%' },
              ]
              const pos = positions[i % positions.length]

              return (
                <motion.div
                  key={cred.name}
                  initial={{ opacity: 0, x: 50, rotate: -5 }}
                  animate={{ opacity: 1, x: 0, rotate: 0 }}
                  transition={{ delay: 1.2 + i * 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ scale: 1.05, rotate: 2, zIndex: 50 }}
                  className="absolute p-4 flex items-center gap-4 bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl w-64 shadow-2xl cursor-crosshair transition-colors hover:bg-white/[0.05]"
                  style={{ top: pos.top, left: pos.left, boxShadow: `0 10px 30px ${cred.glow}` }}
                >
                  <div className="w-12 h-12 relative bg-black/20 rounded-xl p-2 border border-white/5">
                    <Image src={cred.logo} alt={cred.name} fill className="object-contain p-1" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{cred.name}</h3>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">{cred.subtitle}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import CommandCenterBackdrop from '@/components/CommandCenterBackdrop'
import Starfield from '@/components/Starfield'
import { profile, credentials } from '../data/profile'

export default function V11Hybrid() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  
  // Parallax transforms for the left text block
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans">
      <div className="fixed inset-0 pointer-events-none z-0">
        <CommandCenterBackdrop />
        <Starfield />
      </div>

      <Link href="/" className="fixed top-8 left-8 text-xs font-mono tracking-widest text-emerald-500/50 hover:text-emerald-400 z-50 uppercase transition-colors">
        [ Return to Hub ]
      </Link>

      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
        
        {/* LEFT: v9 Cinematic Typography */}
        <div className="w-full lg:w-1/2 flex items-center p-12 lg:p-24 border-r border-white/[0.02]">
          <motion.div style={{ y: yText }} className="max-w-xl z-10">
            <motion.h2 
              initial={{ opacity: 0, letterSpacing: '1em' }}
              animate={{ opacity: 1, letterSpacing: '0.4em' }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="text-xs font-mono text-emerald-400 uppercase mb-8"
            >
              {profile.title}
            </motion.h2>
            
            <motion.h1 
              initial={{ opacity: 0, filter: 'blur(20px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ delay: 0.5, duration: 2 }}
              className="text-7xl lg:text-[8rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-transparent leading-[0.85] mb-12"
            >
              {profile.name.split(' ')[0]}<br/>
              {profile.name.split(' ')[1]}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 2 }}
              className="text-lg text-slate-400 font-light leading-relaxed border-l-2 border-emerald-500/30 pl-6"
            >
              {profile.introLines[0]}
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 2 }} className="mt-12">
               <Link href="/projects" className="group relative inline-flex items-center gap-4 px-8 py-4 bg-white/[0.02] border border-white/10 rounded-full hover:bg-white/5 transition-all overflow-hidden cursor-pointer">
                <span className="relative z-10 text-xs font-mono uppercase tracking-[0.2em] text-emerald-400">Initialize Systems</span>
                <div className="absolute inset-0 bg-emerald-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* RIGHT: v7 Fluid Glass Credentials */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-12 lg:p-24 relative overflow-hidden">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-900/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />

          <div className="relative w-full max-w-md h-[700px]">
            {credentials.map((cred, i) => {
              const positions = [
                { top: '0%', left: '10%' },
                { top: '18%', left: '55%' },
                { top: '36%', left: '-5%' },
                { top: '54%', left: '45%' },
                { top: '72%', left: '5%' },
                { top: '90%', left: '60%' },
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

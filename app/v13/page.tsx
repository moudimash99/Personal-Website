'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import CommandCenterBackdrop from '@/components/CommandCenterBackdrop'
import Starfield from '@/components/Starfield'
import { profile, credentials } from '../data/profile'

export default function DeepParallaxColumn() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  
  // Aggressive parallax upward movement for text
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"])
  const letterSpacing = useTransform(scrollYProgress, [0, 1], ["0em", "0.5em"])

  return (
    <div ref={containerRef} className="relative min-h-[200vh] bg-[#020617] text-slate-200 overflow-hidden font-sans">
      <div className="fixed inset-0 pointer-events-none z-0">
        <CommandCenterBackdrop />
        <Starfield />
      </div>

      <Link href="/" className="fixed top-8 left-8 text-xs font-mono tracking-widest text-emerald-500/50 hover:text-emerald-400 z-50 uppercase transition-colors">
        [ Return to Hub ]
      </Link>

      {/* TOP: Cinematic Parallax Header */}
      <motion.div style={{ y: yText }} className="relative z-10 w-full flex flex-col items-center justify-center min-h-screen px-6 pointer-events-none text-center">
        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 3 }}
          className="text-xs font-mono text-emerald-400/80 tracking-[0.5em] uppercase mb-8"
        >
          {profile.name} // {profile.title}
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, scale: 1.2, filter: 'blur(20px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white leading-[0.9]"
        >
          Architecting
          <br/>
          <motion.span style={{ letterSpacing }} className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30 inline-block">
            resilience
          </motion.span>
        </motion.h1>
        
        <motion.h2 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 2 }}
          className="mt-8 text-3xl md:text-5xl font-light text-slate-400"
        >
          for data-intensive systems.
        </motion.h2>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3, duration: 2 }} className="mt-20">
          <div className="w-px h-24 bg-gradient-to-b from-emerald-500/50 to-transparent mx-auto" />
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-500 mt-4">Scroll to Initialize</p>
        </motion.div>
      </motion.div>

      {/* BOTTOM: Vertical Credentials Column */}
      <div className="relative z-10 w-full max-w-2xl mx-auto pb-40 px-6 flex flex-col items-center gap-12">
        <h3 className="text-sm font-mono text-white/40 uppercase tracking-[0.4em] mb-12 text-center border-b border-white/10 pb-4 w-full">
          Trusted & Certified Nodes
        </h3>
        
        {credentials.map((cred, i) => (
          <motion.div
            key={cred.name}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex items-center gap-8 hover:bg-white/[0.05] hover:scale-105 transition-all duration-500 cursor-pointer group"
          >
            <div className="w-16 h-16 relative bg-black/40 rounded-2xl p-3 border border-white/5 shadow-inner">
              <Image src={cred.logo} alt={cred.name} fill className="object-contain p-2 opacity-60 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-bold text-white tracking-wide">{cred.name}</h4>
              <p className="text-xs font-mono text-emerald-400/80 uppercase tracking-widest mt-1">{cred.subtitle}</p>
            </div>
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/30 group-hover:text-white group-hover:border-emerald-500 transition-colors">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

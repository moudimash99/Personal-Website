'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Download } from 'lucide-react'
import Button from '@/components/Button'
import { useRef } from 'react'
import CommandCenterBackdrop from '@/components/CommandCenterBackdrop'
import Starfield from '@/components/Starfield'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { profile, credentials } from './data/profile'

export default function Page() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  
  // Aggressive parallax upward movement for text (from v13)
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"])
  const letterSpacing = useTransform(scrollYProgress, [0, 1], ["0em", "0.5em"])

  return (
    <div ref={containerRef} className="relative bg-[#020617] text-slate-200 overflow-hidden font-sans pb-16 min-h-screen">
      <div className="fixed inset-0 pointer-events-none z-0">
        <CommandCenterBackdrop />
        <Starfield />
      </div>

      <Nav />

      {/* TOP: Cinematic Parallax Header (from v13) + Missing Intro Lines */}
      <motion.div style={{ y: yText }} className="relative z-10 w-full flex flex-col items-center justify-center min-h-screen px-6 pointer-events-none text-center pt-24">
        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 3 }}
          className="text-[10px] sm:text-xs font-mono text-emerald-400/80 tracking-widest md:tracking-[0.5em] uppercase mb-8"
        >
          {profile.name} // {profile.title}
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, scale: 1.2, filter: 'blur(20px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white leading-[0.9]"
        >
          Architecting
          <br/>
          <motion.span style={{ letterSpacing }} className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30 inline-block">
            resilience
          </motion.span>
        </motion.h1>
        
        <motion.h2 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 2 }}
          className="mt-6 md:mt-8 text-xl sm:text-3xl md:text-5xl font-light text-slate-400"
        >
          for data-intensive systems.
        </motion.h2>

        {/* The Missing Intro Paragraphs - Fixed Contrast */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 2.5, duration: 2 }}
          className="mt-12 max-w-3xl mx-auto space-y-6 text-base md:text-lg lg:text-xl text-slate-100 font-medium leading-relaxed px-4 drop-shadow-md"
        >
          <p>{profile.introLines[0]}</p>
          <p className="text-emerald-300 italic">{profile.introLines[1]}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5, duration: 2 }} className="mt-16 pointer-events-auto">
          <div className="w-px h-16 bg-gradient-to-b from-emerald-500/50 to-transparent mx-auto" />
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-500 mt-4 animate-pulse">Scroll to Continue</p>
        </motion.div>
      </motion.div>

      {/* BOTTOM: Pulsing 2-Row Grid (from v14) */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 mt-8 pb-32">
        <h3 className="text-[10px] font-mono text-white/40 uppercase tracking-[0.4em] mb-12 text-center border-b border-white/10 pb-4">
          Trusted By
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {credentials.map((cred, i) => (
            <motion.div
              key={cred.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="group relative bg-white/[0.03] backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-2xl flex flex-col items-center text-center overflow-hidden hover:bg-white/[0.08] transition-all cursor-crosshair"
            >
              {/* Eruptive Hover Glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at center, ${cred.glow} 0%, transparent 60%)` }}
              />

              <div className="w-14 h-14 relative opacity-50 group-hover:opacity-100 transition-opacity duration-500 z-10">
                <Image src={cred.logo} alt={cred.name} fill className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
              </div>
              
              <div className="mt-6 z-10">
                <h4 className="text-sm font-bold text-white tracking-wide">{cred.name}</h4>
                <p className="text-[9px] text-emerald-400/80 uppercase tracking-widest mt-1">{cred.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Buttons (Moved to bottom) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.3, duration: 1 }}
          className="flex flex-wrap justify-center gap-4 mt-16 pointer-events-auto"
        >
          <Button href="/projects">
            Proceed to Projects <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button href={profile.cvUrl} variant="outline" newTab>
            <Download className="mr-2 h-4 w-4" /> Download CV
          </Button>
        </motion.div>
      </div>
      <Footer />
    </div>
  )
}
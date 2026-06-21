'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import CommandCenterBackdrop from '@/components/CommandCenterBackdrop'
import Starfield from '@/components/Starfield'
import { profile, credentials } from '../data/profile'

export default function FloatingNexus() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  
  // Parallax transforms
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const yCards1 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"])
  const yCards2 = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"])

  return (
    <div ref={containerRef} className="relative min-h-[150vh] bg-[#020617] text-slate-200 overflow-hidden font-sans">
      <div className="fixed inset-0 pointer-events-none z-0">
        <CommandCenterBackdrop />
        <Starfield />
      </div>

      <Link href="/" className="fixed top-8 left-8 text-xs font-mono tracking-widest text-purple-500/50 hover:text-purple-400 z-50 uppercase">
        [ Return to Hub ]
      </Link>

      <div className="relative z-10 flex flex-col items-center pt-40 px-6">
        {/* Parallax Cinematic Typography */}
        <motion.div style={{ y: yText }} className="text-center z-10 pointer-events-none">
          <motion.h2 
            initial={{ opacity: 0, letterSpacing: '1em' }}
            animate={{ opacity: 1, letterSpacing: '0.4em' }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="text-sm font-mono text-purple-400 uppercase mb-6"
          >
            {profile.title}
          </motion.h2>
          
          <motion.h1 
            initial={{ opacity: 0, filter: 'blur(20px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ delay: 0.5, duration: 2 }}
            className="text-7xl md:text-[10rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-transparent leading-[0.8]"
          >
            {profile.name.split(' ')[0]}<br/>
            {profile.name.split(' ')[1]}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 2 }}
            className="mt-12 text-xl font-light text-slate-400 max-w-2xl mx-auto"
          >
            {profile.headline}
          </motion.p>
        </motion.div>

        {/* Floating Credentials scattered below */}
        <div className="mt-40 w-full max-w-6xl relative h-[600px]">
          {credentials.map((cred, i) => {
            const isEven = i % 2 === 0
            const xPos = isEven ? `${10 + i * 10}%` : `${80 - i * 10}%`
            const topPos = `${i * 15}%`

            return (
              <motion.div
                key={cred.name}
                style={{ y: isEven ? yCards1 : yCards2, top: topPos, left: xPos }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, type: "spring", bounce: 0.4 }}
                whileHover={{ scale: 1.1, rotate: isEven ? 5 : -5, zIndex: 50 }}
                className="absolute flex flex-col items-center gap-4 group cursor-pointer"
              >
                <div 
                  className="w-20 h-20 rounded-3xl bg-white/[0.02] backdrop-blur-2xl border border-white/10 flex items-center justify-center shadow-2xl transition-all duration-500"
                  style={{ boxShadow: `0 20px 40px -10px ${cred.glow}` }}
                >
                  <Image src={cred.logo} alt={cred.name} width={40} height={40} className="object-contain opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center bg-black/40 backdrop-blur-md px-4 py-2 rounded-lg border border-white/5">
                  <h4 className="text-xs font-bold text-white whitespace-nowrap">{cred.name}</h4>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

'use client'
import { motion } from 'framer-motion'
import { profile, credentials } from '../data/profile'
import Image from 'next/image'
import Link from 'next/link'

export default function CinematicVariant() {
  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col items-center justify-center p-6 text-center relative overflow-hidden selection:bg-white selection:text-black">
      <Link href="/" className="absolute top-8 left-8 text-xs font-medium tracking-widest opacity-40 hover:opacity-100 transition-opacity uppercase">
        Back to Hub
      </Link>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[150px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl space-y-6 z-10"
      >
        <h2 className="text-sm md:text-base tracking-[0.4em] opacity-60 uppercase font-light">
          {profile.title}
        </h2>
        <h1 className="text-6xl md:text-9xl font-extrabold tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 pb-4">
          {profile.name}
        </h1>
        <p className="text-lg md:text-2xl font-light text-white/50 max-w-2xl mx-auto leading-relaxed pt-8">
          {profile.introLines[0]}
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-5xl mt-32 z-10"
      >
        <p className="text-xs uppercase tracking-[0.3em] opacity-30 mb-12">Trusted & Certified By</p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-70">
          {credentials.map((cred, i) => (
            <div key={cred.name} className="flex flex-col items-center gap-4 grayscale hover:grayscale-0 transition-all duration-700">
              <div className="w-16 h-16 md:w-20 md:h-20 relative">
                <Image src={cred.logo} alt={cred.name} fill className="object-contain" />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="mt-32 z-10 pb-16">
        <Link href="/projects" className="text-sm uppercase tracking-[0.2em] border-b border-white/20 pb-2 hover:border-white transition-colors">
          View Engineering Projects
        </Link>
      </motion.div>
    </div>
  )
}

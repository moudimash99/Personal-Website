'use client'
import { motion } from 'framer-motion'
import { profile, credentials } from '../data/profile'
import Image from 'next/image'
import Link from 'next/link'

export default function TerminalVariant() {
  return (
    <div className="min-h-screen bg-black text-[#0f0] font-mono p-8 md:p-16 selection:bg-[#0f0] selection:text-black">
      <Link href="/" className="fixed top-8 right-8 text-xs opacity-50 hover:opacity-100 uppercase tracking-widest border border-[#0f0]/30 px-3 py-1">
        [ RETURN TO HUB ]
      </Link>

      <div className="max-w-4xl mx-auto space-y-16">
        {/* Header Block */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="space-y-4 border-l-2 border-[#0f0]/30 pl-6">
          <p className="text-xs opacity-50 uppercase tracking-[0.3em]">&gt; SYSTEM.IDENTITY_LOADED</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">{profile.name}</h1>
          <h2 className="text-xl md:text-2xl uppercase tracking-widest opacity-80">{profile.title}</h2>
        </motion.div>

        {/* Intro Block */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }} className="space-y-4 max-w-2xl text-sm leading-relaxed opacity-80">
          <p>&gt; {profile.introLines[0]}</p>
          <p>&gt; {profile.introLines[1]}</p>
        </motion.div>

        <div className="w-full h-px bg-[#0f0]/20" />

        {/* Credentials Grid */}
        <div className="space-y-8">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-xs uppercase tracking-[0.2em] opacity-50">
            [ TRUSTED_AND_CERTIFIED_BY ]
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {credentials.map((cred, i) => (
              <motion.div
                key={cred.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + i * 0.1 }}
                className="group relative border border-[#0f0]/20 p-4 hover:border-[#0f0] hover:bg-[#0f0]/5 transition-colors cursor-crosshair"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 relative opacity-60 group-hover:opacity-100 grayscale transition-all">
                    <Image src={cred.logo} alt={cred.name} fill className="object-contain" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm tracking-wide">{cred.name}</h3>
                    <p className="text-[10px] opacity-60 uppercase mt-1 tracking-wider">{cred.subtitle}</p>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-[#0f0] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-[#0f0] opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
          <Link href="/projects" className="inline-block mt-8 border border-[#0f0] text-[#0f0] px-6 py-3 text-sm uppercase tracking-widest hover:bg-[#0f0] hover:text-black transition-colors">
            EXECUTE: /projects.sh
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

'use client'
import { motion } from 'framer-motion'
import { profile, credentials } from '../data/profile'
import Image from 'next/image'
import Link from 'next/link'

export default function HUDVariant() {
  return (
    <div className="min-h-screen bg-[#020813] text-cyan-50 font-mono p-4 md:p-8 overflow-hidden relative">
      {/* Background HUD Graphics */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-cyan-900/50" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-cyan-900/50 -translate-y-1/2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-cyan-900/30 rounded-full" />
      </div>

      <Link href="/" className="relative z-10 block text-[10px] text-cyan-500 uppercase tracking-[0.2em] hover:text-cyan-300">
        [ SYS.RETURN_HUB ]
      </Link>

      <div className="relative z-10 max-w-5xl mx-auto mt-16 space-y-24">
        {/* Core Identity */}
        <div className="relative border-l border-cyan-500/30 pl-8">
          <div className="absolute top-0 -left-[3px] w-[5px] h-[5px] bg-cyan-400" />
          <div className="absolute bottom-0 -left-[3px] w-[5px] h-[5px] bg-cyan-400" />
          
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, type: 'spring' }}>
            <p className="text-cyan-500 text-xs mb-2 tracking-[0.3em]">ID // 0x489F</p>
            <h1 className="text-5xl md:text-7xl font-light tracking-tight text-white drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">
              {profile.name}
            </h1>
            <h2 className="text-lg md:text-xl text-cyan-300 tracking-widest uppercase mt-4">
              [ {profile.title} ]
            </h2>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-8 max-w-xl text-sm leading-relaxed text-cyan-100/70 border-t border-cyan-900/50 pt-4">
            <p>{profile.introLines[0]} {profile.introLines[1]}</p>
          </motion.div>
        </div>

        {/* HUD Data Cards */}
        <div className="relative">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px bg-cyan-500/50 flex-1" />
            <h3 className="text-[10px] text-cyan-400 uppercase tracking-[0.4em]">Auth_Nodes</h3>
            <div className="h-px bg-cyan-500/50 w-16" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {credentials.map((cred, i) => (
              <motion.div
                key={cred.name}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.1, type: 'spring' }}
                className="relative bg-cyan-950/20 backdrop-blur-md p-6 border border-cyan-800/40 hover:border-cyan-400/80 transition-all group overflow-hidden"
              >
                {/* Crosshairs */}
                <div className="absolute top-2 left-2 w-2 h-2 border-l border-t border-cyan-500/50 group-hover:border-cyan-400" />
                <div className="absolute top-2 right-2 w-2 h-2 border-r border-t border-cyan-500/50 group-hover:border-cyan-400" />
                <div className="absolute bottom-2 left-2 w-2 h-2 border-l border-b border-cyan-500/50 group-hover:border-cyan-400" />
                <div className="absolute bottom-2 right-2 w-2 h-2 border-r border-b border-cyan-500/50 group-hover:border-cyan-400" />

                <div className="flex flex-col items-center text-center gap-4 relative z-10">
                  <div className="w-12 h-12 relative opacity-80 group-hover:opacity-100 transition-opacity">
                    <Image src={cred.logo} alt={cred.name} fill className="object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-cyan-50 tracking-wider">{cred.name}</h4>
                    <p className="text-[9px] text-cyan-400 mt-1 uppercase tracking-widest">{cred.subtitle}</p>
                  </div>
                </div>

                {/* Scanline effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent -translate-y-full group-hover:animate-[scan_2s_ease-in-out_infinite]" />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }} className="flex justify-center">
          <Link href="/projects" className="group relative px-8 py-3 bg-cyan-950/40 border border-cyan-500 text-cyan-400 text-xs uppercase tracking-[0.3em] overflow-hidden">
            <span className="relative z-10 group-hover:text-cyan-950 transition-colors duration-300">Engage Subsystems</span>
            <div className="absolute inset-0 bg-cyan-400 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
          </Link>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </div>
  )
}

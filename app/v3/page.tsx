'use client'
import { motion } from 'framer-motion'
import { profile, credentials } from '../data/profile'
import Image from 'next/image'
import Link from 'next/link'

export default function NeumorphicVariant() {
  return (
    <div className="min-h-screen bg-[#1a1d24] text-[#8a919e] font-sans p-6 md:p-12">
      <Link href="/" className="absolute top-8 right-8 text-xs font-bold tracking-widest hover:text-white transition-colors">
        RETURN HOME
      </Link>

      <div className="max-w-5xl mx-auto space-y-20 pt-10">
        {/* Intro Surface */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="p-10 md:p-16 rounded-[2rem] bg-[#1a1d24] shadow-[-10px_-10px_20px_#232730,10px_10px_20px_#111318]"
        >
          <p className="text-xs font-bold tracking-[0.2em] mb-4 text-[#ef4444]">PRIMARY OPERATIONS</p>
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#e2e8f0] tracking-tight mb-2">
            {profile.name}
          </h1>
          <h2 className="text-xl text-[#94a3b8] font-medium tracking-wide mb-8">
            {profile.title}
          </h2>
          <div className="space-y-4 max-w-3xl text-sm leading-relaxed text-[#64748b]">
            <p>{profile.introLines[0]}</p>
            <p>{profile.introLines[1]}</p>
          </div>
        </motion.div>

        {/* Credentials Grid */}
        <div className="space-y-8">
          <h3 className="text-sm font-bold tracking-[0.2em] ml-4">CREDENTIALS_</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {credentials.map((cred, i) => (
              <motion.div
                key={cred.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="p-6 rounded-2xl bg-[#1a1d24] shadow-[-8px_-8px_16px_#232730,8px_8px_16px_#111318] active:shadow-[inset_-4px_-4px_8px_#232730,inset_4px_4px_8px_#111318] flex flex-col items-center text-center cursor-pointer transition-shadow"
              >
                <div className="w-14 h-14 relative mb-4 opacity-80">
                  <Image src={cred.logo} alt={cred.name} fill className="object-contain" />
                </div>
                <h4 className="text-[#e2e8f0] font-bold text-sm mb-1">{cred.name}</h4>
                <p className="text-[10px] text-[#64748b] font-medium uppercase tracking-wider">{cred.subtitle}</p>
                <div className="mt-4 w-2 h-2 rounded-full shadow-[inset_1px_1px_2px_rgba(0,0,0,0.5)] bg-slate-800" />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="flex justify-center">
          <Link href="/projects" className="px-10 py-4 rounded-full bg-[#1a1d24] text-[#e2e8f0] font-bold text-sm tracking-widest shadow-[-8px_-8px_16px_#232730,8px_8px_16px_#111318] hover:shadow-[-4px_-4px_8px_#232730,4px_4px_8px_#111318] active:shadow-[inset_-4px_-4px_8px_#232730,inset_4px_4px_8px_#111318] transition-all">
            ACCESS PROJECTS
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

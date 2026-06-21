'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { profile, credentials } from '../data/profile'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'

export default function DataFlowVariant() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] })
  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  return (
    <div ref={containerRef} className="min-h-[200vh] bg-[#090b0f] text-white font-sans overflow-hidden">
      {/* Kinetic Background */}
      <motion.div style={{ y: yBackground }} className="fixed inset-0 pointer-events-none opacity-30">
        <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute top-80 right-20 w-[400px] h-[400px] bg-emerald-600/20 blur-[100px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-40 left-1/3 w-[600px] h-[600px] bg-purple-600/20 blur-[130px] rounded-full mix-blend-screen" />
      </motion.div>

      <div className="relative z-10 p-6 md:p-12 max-w-7xl mx-auto flex flex-col gap-32">
        <header className="flex justify-between items-center">
          <div className="text-xs font-mono tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
            SYS.DATA_FLOW // ACTIVE
          </div>
          <Link href="/" className="text-xs font-mono tracking-widest hover:text-blue-400 transition-colors">
            RETURN_TO_HUB
          </Link>
        </header>

        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9]">
              {profile.name.split(' ').map((word, i) => (
                <span key={i} className="block">{word}</span>
              ))}
            </h1>
            <div className="h-px w-32 bg-gradient-to-r from-blue-500 to-transparent" />
            <h2 className="text-xl md:text-2xl text-blue-400 font-light tracking-wide">{profile.title}</h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 1 }}
            className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-3xl" />
            <p className="text-lg text-white/70 font-light leading-relaxed relative z-10">
              {profile.introLines[0]}
            </p>
            <p className="text-sm text-white/50 mt-6 relative z-10">
              {profile.introLines[1]}
            </p>
          </motion.div>
        </section>

        {/* Credentials Grid (Asymmetrical) */}
        <section className="pt-20">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-12 flex items-center gap-4">
            <h3 className="text-sm uppercase tracking-[0.3em] text-white/50">Nodes & Certifications</h3>
            <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {credentials.map((cred, i) => (
              <motion.div
                key={cred.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-lg flex flex-col gap-6 relative overflow-hidden group ${i % 2 === 0 ? 'md:translate-y-12' : ''}`}
              >
                <div className="absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" style={{ background: cred.glow }} />
                
                <div className="relative z-10 flex justify-between items-start">
                  <div className="w-16 h-16 relative bg-white/5 p-3 rounded-2xl border border-white/10">
                    <Image src={cred.logo} alt={cred.name} fill className="object-contain p-2" />
                  </div>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center border border-white/10 text-[10px] text-white/30 group-hover:text-white transition-colors">
                    0{i+1}
                  </div>
                </div>

                <div className="relative z-10">
                  <h4 className="text-lg font-semibold">{cred.name}</h4>
                  <p className="text-xs text-white/50 mt-1">{cred.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="pt-32 pb-20 flex justify-center">
          <Link href="/projects">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-12 py-5 rounded-full overflow-hidden group bg-white/5 border border-white/20"
            >
              <div className="absolute inset-0 bg-blue-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10 text-sm tracking-widest uppercase font-medium">Initialize Projects</span>
            </motion.div>
          </Link>
        </section>
      </div>
    </div>
  )
}

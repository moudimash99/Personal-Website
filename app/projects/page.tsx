'use client'

import Container from '@/components/Container'
import SectionHeader from '@/components/SectionHeader'
import Panel from '@/components/Panel'
import Button from '@/components/Button'
import Starfield from '@/components/Starfield'
import CommandCenterBackdrop from '@/components/CommandCenterBackdrop'
import Nav from '@/components/Nav'                          // ✅ add
import { ArrowRight, Mail, MapPinned, Rocket, Satellite, Activity, ChevronRight, Download, Import } from 'lucide-react'
import { missions } from '@/data/missions'
import { motion } from 'framer-motion'
import Footer from '@/components/Footer'
function OperationCard({ op }: any) {
  return (
    <Panel className="transition-all hover:shadow-glow hover:border-accent-500/50">
      <div className="p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-base md:text-lg flex items-center gap-2 font-display">
            <span className="text-accent-300/90 tracking-wider font-mono">{op.code}</span>
            <ChevronRight className="h-4 w-4 text-accent-500/70" />
            <span>{op.name}</span>
          </h3>
          <div className="hidden md:flex flex-wrap justify-end gap-1">
            {op.telemetry.map((m:any, i:number) => (
              <span key={i} className="inline-flex items-center gap-1 rounded-full border border-accent-400/30 bg-accent-500/10 px-2 py-1 text-[11px] text-accent-100">
                <span className="font-medium">{m.label}:</span> {m.value}
              </span>
            ))}
          </div>
        </div>
        <p className="text-sm text-muted mt-2">{op.objective}</p>
        <ul className="list-disc list-inside text-sm space-y-1 mt-2">
          {op.did.map((line:string, i:number) => (<li key={i}>{line}</li>))}
        </ul>
        <div className="flex flex-wrap md:hidden mt-3 gap-1">
          {op.telemetry.map((m:any, i:number) => (
            <span key={i} className="inline-flex items-center gap-1 rounded-full border border-accent-400/30 bg-accent-500/10 px-2 py-1 text-[11px] text-accent-100">
              <span className="font-medium">{m.label}:</span> {m.value}
            </span>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 gap-3 text-xs text-muted mt-3">
          <div>
            <span className="uppercase tracking-wide text-[10px] text-accent-300">Before</span>
            <p>{op.before}</p>
          </div>
          <div>
            <span className="uppercase tracking-wide text-[10px] text-accent-300">After</span>
            <p>{op.after}</p>
          </div>
        </div>
      </div>
    </Panel>
  )
}

function Mission({ mission }: any) {
  const Icon = mission.icon
  return (
    <section id={mission.id} className="scroll-mt-28 space-y-5">
      <SectionHeader icon={<Icon className="h-5 w-5 text-accent-400" />} title={mission.title} subtitle={mission.meta} />
      <p className="text-sm text-muted max-w-3xl">{mission.profile}</p>
      <div className="grid gap-5 md:grid-cols-2">
        {mission.operations.map((op:any, idx:number) => (
          <motion.div key={op.code} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.35, delay: idx * 0.06 }}>
            <OperationCard op={op} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default function ProjectsPage() {
  return (
    <>
      <CommandCenterBackdrop />
      <Starfield />
      <Nav />                                                {/* ✅ add the nav so spacing/z works */}
      <main className="pt-24 relative z-30" style={{ isolation: 'isolate' }}>  {/* ✅ shell */}
        <Container>
          <section id="projects" className="scroll-mt-28 space-y-10 mt-16">
            <SectionHeader icon={<Rocket className="h-5 w-5 text-accent-400" />} title="Projects" subtitle="Three missions; each includes focused Operations with telemetry." />
            <div className="space-y-12">
              {missions.map((m) => (<Mission key={m.id} mission={m} />))}
            </div>
            
          </section>
        </Container>
        <Footer />  
      </main>
    </>
  )
}
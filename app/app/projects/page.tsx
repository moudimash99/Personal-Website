'use client'

import { useMemo, useRef, useEffect, useState } from 'react'
import { Rocket, ArrowRight, Cpu, Activity, Link as LinkIcon, Server } from 'lucide-react'
import { motion } from 'framer-motion'

import Container from '@/components/Container'
import SectionHeader from '@/components/SectionHeader'
import Panel from '@/components/Panel'
import Button from '@/components/Button'
import Badge from '@/components/Badge'
import Starfield from '@/components/Starfield'
import CommandCenterBackdrop from '@/components/CommandCenterBackdrop'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

/* ----------------------------- Data & Types ----------------------------- */

type Operation = {
  code: string
  title: string
  objective: string
  builtBullets: string[]     // bullets look better in compact cards
  telemetry: string[]        // rendered as chips
  before?: string
  after?: string
}

type Mission = {
  id: string
  company: string
  roleLine: string
  profile: string
  operations: Operation[]
}

const missions: Mission[] = [
  {
    id: 'green-praxis',
    company: 'Green Praxis',
    roleLine: 'Cloud & Data Engineer · Jan 2025 – Present',
    profile: 'Geospatial pipelines and dynamic tile-serving on AWS/EKS with strong observability.',
    operations: [
      {
        code: 'gp-geo',
        title: 'Geo Pipelines & Dynamic Tiles',
        objective: 'Automate multi-band ingest and serve tiles on demand (Earth Engine + FastAPI).',
        builtBullets: [
          '15+ Airflow DAGs (STAC → S3 → Rasterio/GDAL) for ingest/transform',
          'On-demand rendering with palette/resolution controls; Redis cache',
        ],
        telemetry: ['Ingest ×6 (8→48/hr)', 'Storage −80%', 'Refresh <30 min'],
        before: 'Pre-rendered tiles, heavy storage, slow updates',
        after: 'On-demand tiles, fast refresh, far lower cost',
      },
      {
        code: 'gp-obs',
        title: 'Observability Rollout',
        objective: 'Provide end-to-end visibility across DAGs, APIs, and the cluster.',
        builtBullets: [
          'Prometheus/Grafana/Alertmanager via Helm',
          'Standardized labels/owners; 24 dashboards, 35 alert rules',
        ],
        telemetry: ['≈95% coverage', 'Faster MTTR', 'Fewer blind spots'],
      },
      {
        code: 'gp-api',
        title: 'API Platform Hardening',
        objective: 'Make the internal API faster and safer.',
        builtBullets: [
          'Node 18 upgrade, Jest integration tests',
          'JWT → PASETO; rate-limit middleware',
        ],
        telemetry: ['P95 600 ms → 220 ms'],
      },
    ],
  },
  {
    id: 'airbus',
    company: 'Airbus',
    roleLine: 'Data Engineer · Jan 2023 – Jun 2024',
    profile: 'High-throughput C++ streams and faster analytics delivery across regions.',
    operations: [
      {
        code: 'ab-streams',
        title: 'OPTIMATE Streams',
        objective: 'Feed autonomous taxiing with reliable, low-latency data streams.',
        builtBullets: [
          'C++ components with predictable backpressure & bounded queues',
          'Deterministic replay paths for investigation',
        ],
        telemetry: ['~2 GB/s sustained', 'Clean failure modes', 'Reproducible replays'],
        before: 'Ad-hoc ingestion under load',
        after: 'Single documented path with known limits & replayability',
      },
      {
        code: 'ab-dash',
        title: 'Dashboards Delivery',
        objective: 'Cut dashboard rollout lead-time.',
        builtBullets: ['Python ETL automation & data contracts', 'Scripted releases'],
        telemetry: ['Deploy time −80%', 'Fewer manual steps'],
      },
      {
        code: 'ab-hr',
        title: 'HR Data Unification',
        objective: 'Improve accuracy and consistency across 5 regions.',
        builtBullets: [
          'Integrations & schema reconciliation',
          'Idempotent transforms; surfaced diffs',
        ],
        telemetry: ['Fewer reconciliation issues', 'More trusted dashboards'],
      },
    ],
  },
  {
    id: 'murex',
    company: 'Murex Systems',
    roleLine: 'Software Architect · May 2021 – Jan 2022',
    profile: 'Log-analysis demonstrator for HFT, shipped with a small team.',
    operations: [
      {
        code: 'mx-patterns',
        title: 'Pattern Discovery',
        objective: 'Surface previously unseen error types for faster root-cause analysis.',
        builtBullets: ['Python pipeline to parse/cluster anomalies', 'User-driven iterations'],
        telemetry: ['50+ new error patterns detected'],
      },
      {
        code: 'mx-mvp',
        title: 'MVP on Kubernetes',
        objective: 'Package and deploy a reproducible MVP.',
        builtBullets: ['Docker + K8s + Jenkins', 'Pragmatic runbook'],
        telemetry: ['One-command spins', 'Fewer env issues', 'On-time delivery'],
      },
    ],
  },
]

/* ----------------------------- Sticky Mini-Nav ----------------------------- */

function useScrollSpy(ids: string[], offset = 140) {
  const [active, setActive] = useState(ids[0])
  const obs = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const nodes = ids.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    if (!nodes.length) return
    obs.current?.disconnect()
    obs.current = new IntersectionObserver(
      entries => {
        const vis = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (vis[0]?.target?.id) setActive(vis[0].target.id)
      },
      { rootMargin: `-${offset}px 0px -60% 0px`, threshold: [0.1, 0.3, 0.6] }
    )
    nodes.forEach(n => obs.current?.observe(n))
    return () => obs.current?.disconnect()
  }, [ids, offset])

  return active
}

function MiniMissionNav() {
  const items = useMemo(() => ([
    { id: 'green-praxis', label: 'Green Praxis' },
    { id: 'airbus', label: 'Airbus' },
    { id: 'murex', label: 'Murex' },
  ]), [])
  const active = useScrollSpy(items.map(i => i.id))
  return (
    <nav className="sticky top-16 z-30 -mt-2 mb-6 py-2 bg-[rgba(11,18,20,0.6)] backdrop-blur border-b border-border/60">
      <Container>
        <ul className="flex flex-wrap gap-2 sm:gap-3 text-xs">
          {items.map(s => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={[
                  'px-2 py-1 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-accent-400/50',
                  active === s.id ? 'bg-accent-500/10 text-accent-100' : 'hover:text-accent-100 text-muted'
                ].join(' ')}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  )
}

/* ----------------------------- Compact Card ----------------------------- */

function OperationCard({ op }: { op: Operation }) {
  return (
    <motion.div
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.3 }}
    >
      <Panel className="transition-all hover:shadow-[0_0_0_1px_rgba(94,234,212,0.25)] hover:border-accent-500/40">
        <div className="p-5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h4 className="text-base md:text-lg flex items-center gap-2 font-display">
              <Cpu className="h-4 w-4 text-accent-400" />
              {op.title}
            </h4>
          </div>

          {/* Telemetry chips */}
          {op.telemetry?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {op.telemetry.map(t => (
                <Badge key={t} variant="glass">{t}</Badge>
              ))}
            </div>
          )}

          {/* Body */}
          <p className="text-sm text-foreground/80 mt-4">{op.objective}</p>
          {op.builtBullets?.length > 0 && (
            <ul className="mt-3 space-y-2 text-sm">
              {op.builtBullets.map((b, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent-400/80 shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Before → After (mini) */}
          {(op.before || op.after) && (
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              {op.before && (
                <div className="rounded-lg border border-border/60 p-2">
                  <p className="tracking-widest uppercase text-muted mb-1">Before</p>
                  <p className="text-foreground/85">{op.before}</p>
                </div>
              )}
              {op.after && (
                <div className="rounded-lg border border-border/60 p-2">
                  <p className="tracking-widest uppercase text-muted mb-1">After</p>
                  <p className="text-foreground/85">{op.after}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </Panel>
    </motion.div>
  )
}

/* ----------------------------- Mission Block ----------------------------- */

function MissionBlock({ m }: { m: Mission }) {
  function copyLink() {
    try {
      const url = `${window.location.origin}/projects#${m.id}`
      navigator.clipboard?.writeText(url)
    } catch {}
  }

  return (
    <section id={m.id} className="scroll-mt-28" aria-labelledby={`${m.id}-title`}>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <Server className="h-5 w-5 text-accent-400" />
          <h3 id={`${m.id}-title`} className="text-xl font-semibold font-display">
            {m.company} <span className="text-muted font-normal">· {m.roleLine}</span>
          </h3>
        </div>
        <button
          onClick={copyLink}
          className="inline-flex items-center gap-1 text-xs text-muted hover:text-accent-100 focus:outline-none focus:ring-2 focus:ring-accent-400/50 px-1.5 py-0.5 rounded"
          aria-label={`Copy link to ${m.company}`}
          title="Copy link"
        >
          <LinkIcon className="h-3.5 w-3.5" />
          Copy
        </button>
      </div>

      <p className="text-sm text-foreground/80 mt-1 mb-5">{m.profile}</p>

      {/* Card grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {m.operations.map(op => (
          <OperationCard key={op.code} op={op} />
        ))}
      </div>
    </section>
  )
}

/* ----------------------------- Page ----------------------------- */

export default function ProjectsPage() {
  return (
    <>
      <CommandCenterBackdrop />
      <Starfield />
      <Nav />

      <main className="pt-24 relative z-30" style={{ isolation: 'isolate' }}>
        <Container>
          <SectionHeader
            icon={<Rocket className="h-5 w-5 text-accent-400" />}
            title="Projects"
            subtitle="Three missions; each includes focused Operations with measured telemetry."
          />
        </Container>

        <MiniMissionNav />

        <Container>
          <div className="mt-6 space-y-12">
            {missions.map(m => (
              <MissionBlock key={m.id} m={m} />
            ))}
          </div>

          <div className="pt-10 flex flex-wrap gap-3 justify-center">
            <Button variant="outline" href="/">Back to Debrief</Button>
            <Button href="/contact">
              Continue to Contact
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <Footer />
        </Container>
      </main>
    </>
  )
}

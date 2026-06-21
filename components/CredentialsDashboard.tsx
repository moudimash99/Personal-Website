'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plane, 
  Satellite, 
  Activity, 
  Cloud, 
  Cpu, 
  GraduationCap, 
  ChevronRight, 
  Terminal, 
  Radio, 
  CheckCircle2, 
  Sparkles, 
  TrendingUp, 
  ExternalLink 
} from 'lucide-react'

// System boot simulation lines
const BOOT_LOGS = [
  'SYSTEM: INITIATING DECRYPT SEQUENCE FOR USER_CREDENTIALS...',
  'LINK: ESTABLISHING CONNECTIVITY TO SECURE NODES...',
  'NODE: AIRBUS_DS_SECURE_LINK ............................. [ONLINE]',
  'NODE: GREEN_PRAXIS_OBSERVABILITY_NODE ................... [ONLINE]',
  'NODE: MUREX_HFT_ANOMALY_ENGINE .......................... [ONLINE]',
  'CREDENTIAL: AWS_SAA_C03_VERIFIER ........................ [VALID]',
  'CREDENTIAL: INCOSE_ASEP_SYSTEM_INTEGRITY ................ [VERIFIED]',
  'ACADEMIC: ISAE_SUPAERO_MS_SEN_ALUMNI .................... [SYNCED]',
  'DIAGNOSTIC: ALL SYSTEMS REPORTING NOMINAL (UTC+2) ....... [READY]',
]

interface CredentialNode {
  id: string
  title: string
  role: string
  sector: string
  status: 'Nominal' | 'Active' | 'Verified' | 'Synced'
  icon: any
  color: string
  telemetry: { label: string; value: string }[]
  details: string[]
  svgGraphic: React.ReactNode
}

export default function CredentialsDashboard() {
  const [terminalLines, setTerminalLines] = useState<string[]>([])
  const [activeCard, setActiveCard] = useState<string | null>(null)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  // Typing effect for the simulated terminal
  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index < BOOT_LOGS.length) {
        setTerminalLines((prev) => [...prev, BOOT_LOGS[index]])
        index++
      } else {
        clearInterval(interval)
      }
    }, 450)
    return () => clearInterval(interval)
  }, [])

  const credentials: CredentialNode[] = [
    {
      id: 'airbus',
      title: 'Airbus',
      role: 'Systems Engineering & Quality / Data Engineer',
      sector: 'Toulouse • Jan 2023 – Present',
      status: 'Nominal',
      icon: Plane,
      color: 'from-blue-500/20 to-teal-500/10 border-blue-500/40 text-blue-300',
      telemetry: [
        { label: 'Platform', value: 'Skywise' },
        { label: 'Deploy time', value: '−80%' },
        { label: 'Entry errors', value: '−90%' }
      ],
      details: [
        'Driving Non-Conformance reduction and Cost of Non-Quality tracking by converting legacy quality workflows into a Skywise data model.',
        'Consolidated heterogeneous HR sources and automated validation, packaging, and release steps for dashboard deployments across 5 regions.',
        'Designed the end-to-end data-flow architecture for the OPTIMATE exchange project with clear interfaces and SLAs.'
      ],
      svgGraphic: (
        <svg className="w-full h-24 text-blue-400/30" viewBox="0 0 200 100" fill="none">
          <circle cx="100" cy="50" r="40" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="100" cy="50" r="25" stroke="currentColor" strokeWidth="0.5" />
          {/* Radar scanning line */}
          <motion.line 
            x1="100" y1="50" x2="135" y2="20" 
            stroke="currentColor" strokeWidth="1.5"
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            style={{ originX: "100px", originY: "50px" }}
          />
          {/* Pulsing radar hits */}
          <motion.circle 
            cx="125" cy="30" r="2" fill="#60a5fa"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.circle 
            cx="80" cy="65" r="2.5" fill="#2dd4bf"
            animate={{ opacity: [0.1, 0.8, 0.1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
          {/* Jet schematic line path */}
          <path d="M70,50 L95,50 L105,40 L115,50 L130,50" stroke="currentColor" strokeWidth="1" />
          <path d="M98,50 L102,30 L106,30 L102,50" stroke="currentColor" strokeWidth="0.8" />
          <path d="M98,50 L102,70 L106,70 L102,50" stroke="currentColor" strokeWidth="0.8" />
        </svg>
      )
    },
    {
      id: 'green-praxis',
      title: 'Green Praxis',
      role: 'Cloud & Data Engineer',
      sector: 'Aix-en-Provence • Jan 2025 – Present',
      status: 'Active',
      icon: Satellite,
      color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/40 text-emerald-300',
      telemetry: [
        { label: 'DAGs', value: '15+' },
        { label: 'Storage', value: '−80%' },
        { label: 'Coverage', value: '95%' }
      ],
      details: [
        'Built and maintained Airflow DAGs for STAC ingest, download, reprojection, mosaicking, and raster product generation.',
        'Deployed Prometheus and Grafana via Helm; 24 dashboards, 35 alerts, 95% coverage.',
        'Built reusable Terraform modules for VPC, EKS, versioned S3 buckets, and least-privilege IAM.'
      ],
      svgGraphic: (
        <svg className="w-full h-24 text-emerald-400/30" viewBox="0 0 200 100" fill="none">
          <circle cx="100" cy="80" r="60" stroke="currentColor" strokeWidth="0.75" />
          {/* Orbit paths */}
          <ellipse cx="100" cy="50" rx="70" ry="25" stroke="currentColor" strokeWidth="0.75" transform="rotate(-15 100 50)" />
          {/* Satellite */}
          <motion.g 
            animate={{ 
              x: [-50, 50, -50], 
              y: [-12, 12, -12],
              scale: [0.8, 1.2, 0.8]
            }} 
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          >
            <rect x="95" y="45" width="10" height="10" rx="1" fill="currentColor" />
            <line x1="85" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="2" />
            <line x1="105" y1="50" x2="115" y2="50" stroke="currentColor" strokeWidth="2" />
            <circle cx="100" cy="40" r="1.5" fill="#34d399" />
          </motion.g>
          {/* Signal wave */}
          <path d="M100,55 C100,62 90,70 100,75" stroke="#34d399" strokeWidth="1" strokeDasharray="2 2" className="animate-pulse" />
        </svg>
      )
    },
    {
      id: 'murex',
      title: 'Murex Systems',
      role: 'Project Manager',
      sector: 'Beirut • May 2021 – Jan 2022',
      status: 'Nominal',
      icon: Activity,
      color: 'from-cyan-500/20 to-teal-500/10 border-cyan-500/40 text-cyan-300',
      telemetry: [
        { label: 'Discovery', value: '>50 patterns' },
        { label: 'Repro.', value: 'one-command' },
        { label: 'Delivery', value: 'on time' }
      ],
      details: [
        'Led a 3-person Scrum team delivering a log-analysis demonstrator for a high-frequency trading platform, shipping the MVP on time.',
        'Shaped the Python pipeline for parsing and clustering anomalies, discovering >50 error patterns.',
        'Containerized services with Docker and Kubernetes with Jenkins CI for one-command reproducible deployments.'
      ],
      svgGraphic: (
        <svg className="w-full h-24 text-cyan-400/30" viewBox="0 0 200 100" fill="none">
          {/* Wave pulse */}
          <path d="M10,50 L40,50 L50,20 L58,80 L66,40 L72,55 L80,50 L190,50" stroke="currentColor" strokeWidth="1" />
          <motion.path 
            d="M10,50 L40,50 L50,20 L58,80 L66,40 L72,55 L80,50 L190,50" 
            stroke="#22d3ee" 
            strokeWidth="1.5" 
            strokeDasharray="40 160"
            animate={{ strokeDashoffset: [-200, 200] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          {/* Coordinates grid lines */}
          <line x1="10" y1="15" x2="190" y2="15" stroke="currentColor" strokeWidth="0.25" strokeDasharray="4 4" />
          <line x1="10" y1="85" x2="190" y2="85" stroke="currentColor" strokeWidth="0.25" strokeDasharray="4 4" />
          {/* Numbers simulating trading telemetry */}
          <text x="140" y="28" fill="currentColor" className="text-[7px] font-mono">THR: 98.4%</text>
          <text x="140" y="40" fill="currentColor" className="text-[7px] font-mono">LAT: &lt;1.2ms</text>
        </svg>
      )
    },
    {
      id: 'aws',
      title: 'AWS Certified',
      role: 'Solutions Architect - Associate',
      sector: 'Global Cloud Sector',
      status: 'Verified',
      icon: Cloud,
      color: 'from-amber-500/20 to-teal-500/10 border-amber-500/40 text-amber-300',
      telemetry: [
        { label: 'Token', value: 'SAA-C03' },
        { label: 'Infra', value: 'AWS, K8s, TF' },
        { label: 'Security', value: 'IAM Least-Priv' }
      ],
      details: [
        'AWS Certified Solutions Architect – Associate (SAA-C03).',
        'Designs secure multi-AZ VPC layouts, autoscaling EKS clusters, and API gateways.',
        'Implements least-privilege IAM policies, versioned S3 bucket lifecycles, and CloudWatch observability.'
      ],
      svgGraphic: (
        <svg className="w-full h-24 text-amber-400/30" viewBox="0 0 200 100" fill="none">
          {/* Cloud visual schematic */}
          <path d="M70,60 C60,60 55,50 65,42 C60,30 78,20 90,30 C100,18 122,22 120,38 C132,38 135,52 122,60 Z" stroke="currentColor" strokeWidth="1.25" fill="none" />
          {/* Server boxes representing architecture nodes */}
          <rect x="55" y="72" width="22" height="12" rx="1" stroke="currentColor" strokeWidth="1" />
          <rect x="89" y="72" width="22" height="12" rx="1" stroke="currentColor" strokeWidth="1" />
          <rect x="123" y="72" width="22" height="12" rx="1" stroke="currentColor" strokeWidth="1" />
          {/* Connection paths */}
          <path d="M66,72 L66,66 L90,66 L90,56" stroke="currentColor" strokeWidth="0.75" />
          <path d="M100,72 L100,56" stroke="currentColor" strokeWidth="0.75" />
          <path d="M134,72 L134,66 L110,66 L110,56" stroke="currentColor" strokeWidth="0.75" />
          <circle cx="90" cy="56" r="1.5" fill="#fbbf24" />
          <circle cx="100" cy="56" r="1.5" fill="#fbbf24" />
          <circle cx="110" cy="56" r="1.5" fill="#fbbf24" />
        </svg>
      )
    },
    {
      id: 'incose',
      title: 'INCOSE Certified',
      role: 'Systems Engineering Professional (ASEP)',
      sector: 'Systems Integrity Sector',
      status: 'Verified',
      icon: Cpu,
      color: 'from-purple-500/20 to-teal-500/10 border-purple-500/40 text-purple-300',
      telemetry: [
        { label: 'Standard', value: 'ISO 15288' },
        { label: 'Focus', value: 'V&V Lifecycle' },
        { label: 'Creds', value: 'ASEP' }
      ],
      details: [
        'INCOSE Associate Systems Engineering Professional (ASEP) certified.',
        'Proficient in architectural decomposition, requirements elicitation, and interface control documents.',
        'Trained in System V&V, configuration management, MBSE, and life-cycle costing.'
      ],
      svgGraphic: (
        <svg className="w-full h-24 text-purple-400/30" viewBox="0 0 200 100" fill="none">
          {/* V-Model lifecycle representation */}
          <path d="M25,20 L80,80 L100,80 L120,80 L175,20" stroke="currentColor" strokeWidth="1.25" />
          <path d="M50,45 L150,45" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" />
          <path d="M75,70 L125,70" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" />
          {/* V-model node markers */}
          <circle cx="25" cy="20" r="2.5" fill="currentColor" />
          <circle cx="50" cy="45" r="2.5" fill="currentColor" />
          <circle cx="75" cy="70" r="2.5" fill="currentColor" />
          <circle cx="100" cy="80" r="3" fill="#a78bfa" />
          <circle cx="125" cy="70" r="2.5" fill="currentColor" />
          <circle cx="150" cy="45" r="2.5" fill="currentColor" />
          <circle cx="175" cy="20" r="2.5" fill="currentColor" />
          {/* Text annotations */}
          <text x="18" y="14" fill="currentColor" className="text-[6px] font-mono">REQ_ELICIT</text>
          <text x="145" y="14" fill="currentColor" className="text-[6px] font-mono">SYS_VALIDATION</text>
          <text x="90" y="92" fill="#a78bfa" className="text-[6.5px] font-mono font-bold">INTEGRATION</text>
        </svg>
      )
    },
    {
      id: 'isae-supaero',
      title: 'ISAE-SUPAERO Alumni',
      role: 'MS Systems Engineering (SEN)',
      sector: 'Aerospace Academic Sector',
      status: 'Synced',
      icon: GraduationCap,
      color: 'from-violet-500/20 to-teal-500/10 border-violet-500/40 text-violet-300',
      telemetry: [
        { label: 'Degree', value: 'Mastère Spécialisé' },
        { label: 'Focus', value: 'SEN / MBSE' },
        { label: 'Cohort', value: '2025-2026' }
      ],
      details: [
        'Postgraduate systems engineering specialization (Mastère Spécialisé SEN) at ISAE-SUPAERO, Toulouse.',
        'Trained in safety-critical architectures, MBSE with Capella, and spacecraft/aircraft system dynamics.',
        'Bridging agile software delivery with classical systems engineering lifecycle processes.'
      ],
      svgGraphic: (
        <svg className="w-full h-24 text-violet-400/30" viewBox="0 0 200 100" fill="none">
          {/* Rocket trajectory/Academic crest themed */}
          <path d="M100,85 A45,45 0 0,1 100,15 A45,45 0 0,1 100,85 Z" stroke="currentColor" strokeWidth="0.75" />
          {/* Trajectory */}
          <path d="M70,80 Q100,50 135,15" stroke="currentColor" strokeWidth="1.25" />
          <path d="M130,15 L135,15 L135,20" stroke="currentColor" strokeWidth="1" />
          {/* Star nodes */}
          <polygon points="100,32 102,36 106,36 103,39 104,43 100,41 96,43 97,39 94,36 98,36" fill="#a78bfa" className="animate-pulse" />
          <polygon points="80,50 81,52 83,52 81,54 82,56 80,55 78,56 79,54 77,52 79,52" fill="currentColor" />
          <polygon points="120,48 121,50 123,50 121,52 122,54 120,53 118,54 119,52 117,50 119,50" fill="currentColor" />
          <circle cx="100" cy="50" r="12" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
        </svg>
      )
    }
  ]

  return (
    <div className="space-y-12 mt-16 scroll-mt-28" id="credentials">
      
      {/* Visual Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border/40 pb-6">
        <div className="flex items-center gap-3">
          <div className="relative flex h-6 w-6 items-center justify-center rounded-lg bg-accent-500/10 ring-1 ring-accent-500/30">
            <Radio className="h-4 w-4 text-accent-300 animate-pulse" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold font-display tracking-tight text-white flex items-center gap-2">
              SYS_CREDENTIALS <span className="text-xs font-mono font-normal text-accent-300 px-2 py-0.5 bg-accent-500/10 rounded-full">SECURE_DECRYPT</span>
            </h2>
            <p className="text-sm text-muted mt-0.5">Verified engineering nodes, professional certifications, and academic registry.</p>
          </div>
        </div>
        
        {/* Visual Pulse Indicator */}
        <div className="flex items-center gap-2 px-3 py-1 bg-accent-500/5 rounded-lg border border-accent-500/20 font-mono text-[11px] text-accent-300">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
          </span>
          SECURE CONNECTION ESTABLISHED
        </div>
      </div>

      {/* 1. Simulated Booting Console Terminal */}
      <div className="glass overflow-hidden border-teal-500/20 shadow-lg">
        {/* Terminal Header */}
        <div className="bg-background/90 px-4 py-2 border-b border-border/30 flex items-center justify-between text-xs text-muted font-mono select-none">
          <div className="flex items-center gap-2">
            <Terminal className="h-3.5 w-3.5 text-accent-400" />
            <span>SYS_DIAGNOSTIC_CONSOLE.SH</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-no/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-warn/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-ok/40" />
          </div>
        </div>
        
        {/* Terminal logs container */}
        <div className="bg-black/60 p-4 font-mono text-xs text-accent-300/90 space-y-1.5 h-44 overflow-y-auto scrollbar-thin scrollbar-thumb-teal-900 scrollbar-track-transparent">
          <AnimatePresence>
            {terminalLines.map((line, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                <span className="text-accent-500/50 select-none">&gt;</span>
                <span>{line}</span>
              </motion.div>
            ))}
          </AnimatePresence>
          {terminalLines.length < BOOT_LOGS.length ? (
            <div className="flex items-center gap-2 text-accent-400">
              <span className="text-accent-500/50 select-none animate-pulse">&gt;</span>
              <span className="animate-pulse">Loading system sectors...</span>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-2 h-3.5 bg-accent-400 ml-1.5 align-middle"
            />
          )}
        </div>
      </div>

      {/* 2. Interactive System Node Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {credentials.map((node, i) => {
          const NodeIcon = node.icon
          const isHovered = hoveredCard === node.id
          const isActive = activeCard === node.id

          return (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.5, type: 'spring', stiffness: 100 }}
              onMouseEnter={() => setHoveredCard(node.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => setActiveCard(isActive ? null : node.id)}
              className={`glass flex flex-col justify-between overflow-hidden group cursor-pointer border-t-2 bg-gradient-to-b ${node.color} transition-all duration-300 hover:shadow-glow hover:scale-[1.01]`}
            >
              {/* Card Header overlay details */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2.5 bg-background/80 border border-border/40 rounded-xl text-accent-300">
                    <NodeIcon className="h-5 w-5" />
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] tracking-wider uppercase bg-accent-500/10 px-2 py-0.5 rounded border border-accent-400/20 text-accent-100 font-mono">
                    <span className="h-1.5 w-1.5 rounded-full bg-ok animate-pulse" />
                    {node.status}
                  </div>
                </div>

                {/* Node Identity */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold font-display text-white group-hover:text-accent-300 transition-colors flex items-center gap-2">
                    {node.title} 
                    <ChevronRight className="h-4 w-4 text-accent-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p className="text-xs font-mono text-accent-300/80 mt-0.5">{node.role}</p>
                  <p className="text-[10px] font-mono text-muted mt-1 uppercase tracking-wide">{node.sector}</p>
                </div>

                {/* Micro-illustration SVG display area */}
                <div className="bg-black/40 rounded-xl p-3 border border-border/30 mb-5 relative flex items-center justify-center overflow-hidden h-28 group-hover:border-accent-500/30 transition-all duration-500">
                  {/* Subtle scanning horizontal bar */}
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-400/40 to-transparent animate-[shimmer_3s_infinite]" />
                  {node.svgGraphic}
                </div>

                {/* Active telemetry readouts */}
                <div className="grid grid-cols-3 gap-2 border-t border-border/20 pt-4 mt-auto">
                  {node.telemetry.map((t, idx) => (
                    <div key={idx} className="bg-black/30 p-1.5 rounded border border-border/20 text-center flex flex-col justify-center">
                      <span className="text-[8px] text-muted font-mono uppercase block">{t.label}</span>
                      <span className="text-[10px] text-accent-100 font-mono font-medium truncate mt-0.5">{t.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expander Footer */}
              <div className="px-5 py-3 border-t border-border/20 bg-background/50 flex justify-between items-center text-xs font-mono text-accent-300/80 group-hover:bg-accent-500/5 transition-colors">
                <span>{isActive ? 'SHRINK NODE DETAILS' : 'EXPAND NODE DETAILS'}</span>
                <ChevronRight className={`h-4 w-4 transform transition-transform duration-300 ${isActive ? 'rotate-90 text-accent-400' : 'text-muted'}`} />
              </div>

              {/* Collapsed slide-out details */}
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-border/30 bg-black/70 overflow-hidden font-sans"
                  >
                    <div className="p-5 space-y-3.5">
                      <h4 className="text-xs font-mono text-accent-300 tracking-wider uppercase border-b border-border/20 pb-1">Verified Operations</h4>
                      <ul className="space-y-2.5">
                        {node.details.map((detail, idx) => (
                          <li key={idx} className="text-xs text-foreground/80 flex items-start gap-2.5 leading-relaxed">
                            <CheckCircle2 className="h-4 w-4 text-accent-400 mt-0.5 shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

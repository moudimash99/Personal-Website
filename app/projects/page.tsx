'use client'
import Link from 'next/link'

import Container from '@/components/Container'
import Starfield from '@/components/Starfield'
import CommandCenterBackdrop from '@/components/CommandCenterBackdrop'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { missions } from '@/data/missions'
import { motion } from 'framer-motion'
import { CheckCircle2, Radio } from 'lucide-react'
import { ReactNode } from 'react'

/* ── SVG animations mapped by mission id ── */
const missionGraphics: Record<string, ReactNode> = {
  'airbus-electric-center': (
    <svg className="w-full h-full text-blue-400/30" viewBox="-40 -40 880 280" fill="none" preserveAspectRatio="xMidYMid slice">
      <pattern id="dots-m1-1" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="currentColor" opacity="0.2" />
      </pattern>
      <rect x="-40" y="-40" width="880" height="280" fill="url(#dots-m1-1)" />

      {[50, 100, 150].map((y, i) => (
        <g key={i}>
          <rect x="50" y={y-15} width="80" height="30" rx="4" stroke="currentColor" strokeWidth="1" />
          <text x="55" y={y+2} fill="currentColor" className="text-[8px] font-mono">LEGACY_QMS_{i+1}</text>
          <path d={`M 130 ${y} L 300 100`} stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.5" />
          <motion.circle cx="130" cy={y} r="2" fill="#60a5fa" animate={{ cx: [130, 300], cy: [y, 100] }} transition={{ duration: 1.5, repeat: Infinity, delay: i*0.4 }} />
        </g>
      ))}

      <g transform="translate(300, 40)">
        <rect x="0" y="0" width="160" height="120" rx="8" stroke="#60a5fa" strokeWidth="2" fill="currentColor" fillOpacity="0.05" />
        <rect x="20" y="20" width="120" height="20" rx="2" stroke="currentColor" strokeWidth="1" />
        <text x="25" y="32" fill="currentColor" className="text-[8px] font-mono">NC_MAPPING</text>
        <rect x="20" y="50" width="120" height="20" rx="2" stroke="currentColor" strokeWidth="1" />
        <text x="25" y="62" fill="currentColor" className="text-[8px] font-mono">DATA_CLEANSING</text>
        <rect x="20" y="80" width="120" height="20" rx="2" stroke="currentColor" strokeWidth="1" />
        <text x="25" y="92" fill="currentColor" className="text-[8px] font-mono">CONQ_CALCULATION</text>
        <text x="0" y="-10" fill="#60a5fa" className="text-[10px] font-mono font-bold">ETL_WORKFLOW</text>
      </g>

      <path d="M 460 100 L 600 100" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />
      <motion.rect x="460" y="98" width="10" height="4" fill="#2dd4bf" animate={{ x: [460, 600] }} transition={{ duration: 1.5, repeat: Infinity }} />
      <motion.rect x="460" y="98" width="10" height="4" fill="#60a5fa" animate={{ x: [460, 600] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }} />

      <g transform="translate(600, 60)">
        <rect x="0" y="0" width="100" height="80" rx="4" stroke="currentColor" strokeWidth="1" />
        <path d="M 0 20 L 100 20 M 0 40 L 100 40 M 0 60 L 100 60" stroke="currentColor" strokeWidth="0.5" />
        <text x="0" y="-10" fill="currentColor" className="text-[10px] font-mono font-bold">SKYWISE_CORE</text>
      </g>
    </svg>
  ),
  'green': (
    <svg className="w-full h-full text-emerald-400/30" viewBox="-40 -40 880 280" fill="none" preserveAspectRatio="xMidYMid slice">
      <pattern id="dots-m2-a" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="currentColor" opacity="0.2" />
      </pattern>
      <rect x="-40" y="-40" width="880" height="280" fill="url(#dots-m2-a)" />

      {/* Satellite Source */}
      <g transform="translate(40, 60)">
        <rect x="0" y="0" width="100" height="80" rx="4" stroke="#34d399" strokeWidth="1.5" fill="#020617" />
        <circle cx="50" cy="30" r="15" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
        <motion.circle cx="50" cy="30" r="10" fill="#34d399" fillOpacity="0.4" animate={{ r: [8, 12, 8] }} transition={{ duration: 2, repeat: Infinity }} />
        <text x="15" y="70" fill="#34d399" className="text-[10px] font-mono font-bold">STAC_CATALOG</text>
      </g>

      {/* Data Ingestion Pipeline */}
      <path d="M 140 100 L 250 100" stroke="#34d399" strokeWidth="1.5" strokeDasharray="3 3" />
      <motion.circle cx="140" cy="100" r="3" fill="#34d399" animate={{ cx: [140, 250] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} />

      {/* Kubernetes Cluster (Karpenter) */}
      <g transform="translate(250, 40)">
        {/* Cluster bounds */}
        <rect x="0" y="0" width="300" height="120" rx="8" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" fill="currentColor" fillOpacity="0.05" />
        <text x="10" y="20" fill="currentColor" className="text-[10px] font-mono font-bold">K8S_EKS_CLUSTER</text>

        {/* Karpenter Auto-scaler Box */}
        <rect x="10" y="40" width="80" height="60" rx="4" stroke="#34d399" strokeWidth="1.5" fill="rgba(52,211,153,0.1)" />
        <text x="15" y="55" fill="#34d399" className="text-[8px] font-mono font-bold">KARPENTER</text>
        <text x="15" y="65" fill="#34d399" className="text-[8px] font-mono">AUTOSCALER</text>
        <motion.path d="M 15 80 L 35 70 L 55 90 L 75 60" stroke="#34d399" strokeWidth="1.5" fill="none" animate={{ strokeDashoffset: [20, 0] }} strokeDasharray="20" transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />

        {/* Dynamically scaling pods */}
        <g transform="translate(120, 30)">
          <text x="0" y="0" fill="currentColor" className="text-[8px] font-mono">EARTH_ENGINE_WORKERS</text>
          {[0, 1, 2].map((i) => (
            <motion.rect 
              key={i}
              x={i * 50} 
              y="10" 
              width="40" 
              height="30" 
              rx="2" 
              stroke="#34d399" 
              strokeWidth="1" 
              fill="#020617"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, delay: i * 0.6, repeat: Infinity }}
            />
          ))}
          {[0, 1, 2].map((i) => (
            <motion.rect 
              key={`inner-${i}`}
              x={i * 50 + 5} 
              y="15" 
              width="30" 
              height="4" 
              rx="1" 
              fill="currentColor"
              fillOpacity="0.3"
            />
          ))}
          {[0, 1, 2].map((i) => (
            <motion.rect 
              key={`inner2-${i}`}
              x={i * 50 + 5} 
              y="25" 
              width="20" 
              height="4" 
              rx="1" 
              fill="currentColor"
              fillOpacity="0.3"
            />
          ))}
        </g>
        
        {/* Lines from Karpenter to Pods */}
        <path d="M 90 70 L 110 70 L 110 55 L 120 55" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      </g>

      {/* Output Pipeline */}
      <path d="M 550 100 L 660 100" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
      <motion.rect x="550" y="98" width="15" height="4" fill="#34d399" animate={{ x: [550, 660] }} transition={{ duration: 1.5, repeat: Infinity }} />

      {/* Output API */}
      <g transform="translate(660, 60)">
        <rect x="0" y="0" width="120" height="80" rx="4" stroke="#34d399" strokeWidth="1.5" fill="#020617" />
        <rect x="15" y="25" width="90" height="10" rx="2" fill="currentColor" fillOpacity="0.2" />
        <rect x="15" y="45" width="70" height="10" rx="2" fill="currentColor" fillOpacity="0.2" />
        <text x="15" y="70" fill="#34d399" className="text-[10px] font-mono font-bold">TILE_SERVER_API</text>
      </g>
    </svg>
  ),
  'airbus': (
    <svg className="w-full h-full text-blue-400/30" viewBox="-40 -40 880 280" fill="none" preserveAspectRatio="xMidYMid slice">
      <pattern id="dots-airbus" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="currentColor" opacity="0.2" />
      </pattern>
      <rect x="-40" y="-40" width="880" height="280" fill="url(#dots-airbus)" />

      {/* Data Sources (Regions) */}
      {[50, 80, 110, 140, 170].map((y, i) => (
        <g key={i}>
          <rect x="50" y={y-10} width="60" height="20" rx="2" stroke="currentColor" strokeWidth="1" />
          <text x="55" y={y+2} fill="currentColor" className="text-[8px] font-mono">REGION_{i+1}</text>
          <path d={`M 110 ${y} L 250 110`} stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.5" />
          <motion.circle cx="110" cy={y} r="2" fill="#60a5fa" animate={{ cx: [110, 250], cy: [y, 110] }} transition={{ duration: 1.5 + i*0.2, repeat: Infinity, delay: i*0.3 }} />
        </g>
      ))}

      {/* Central Processing Hub (OPTIMATE / HR DB) */}
      <g transform="translate(250, 60)">
        <rect x="0" y="0" width="120" height="100" rx="8" stroke="#60a5fa" strokeWidth="2" fill="currentColor" fillOpacity="0.05" />
        <path d="M 20 30 L 100 30" stroke="currentColor" strokeWidth="1" />
        <path d="M 20 50 L 100 50" stroke="currentColor" strokeWidth="1" />
        <path d="M 20 70 L 100 70" stroke="currentColor" strokeWidth="1" />
        <motion.rect x="20" y="25" width="20" height="10" fill="#2dd4bf" animate={{ x: [20, 80, 20] }} transition={{ duration: 3, repeat: Infinity }} />
        <motion.rect x="40" y="45" width="40" height="10" fill="#60a5fa" animate={{ x: [40, 60, 40] }} transition={{ duration: 2.5, repeat: Infinity }} />
        <text x="10" y="-10" fill="#60a5fa" className="text-[10px] font-mono font-bold">DATA_CONSOLIDATION</text>
      </g>

      {/* Output Pipelines */}
      <path d="M 370 90 L 500 60" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />
      <path d="M 370 110 L 500 110" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />
      <path d="M 370 130 L 500 160" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />

      {/* Moving data packets on pipelines */}
      <motion.rect x="370" y="88" width="10" height="4" fill="#2dd4bf" animate={{ x: [370, 500], y: [88, 58] }} transition={{ duration: 2, repeat: Infinity }} />
      <motion.rect x="370" y="108" width="15" height="4" fill="#60a5fa" animate={{ x: [370, 500] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }} />
      <motion.rect x="370" y="128" width="12" height="4" fill="#2dd4bf" animate={{ x: [370, 500], y: [128, 158] }} transition={{ duration: 2.2, repeat: Infinity, delay: 0.2 }} />

      {/* Dashboard Endpoints */}
      <rect x="500" y="40" width="100" height="40" rx="4" stroke="currentColor" strokeWidth="1" />
      <text x="510" y="65" fill="currentColor" className="text-[8px] font-mono">EXEC_DASH</text>
      <rect x="500" y="90" width="100" height="40" rx="4" stroke="currentColor" strokeWidth="1" />
      <text x="510" y="115" fill="currentColor" className="text-[8px] font-mono">HR_METRICS</text>
      <rect x="500" y="140" width="100" height="40" rx="4" stroke="currentColor" strokeWidth="1" />
      <text x="510" y="165" fill="currentColor" className="text-[8px] font-mono">PREDICTIVE_MODEL</text>

      {/* KPI readouts */}
      <text x="650" y="80" fill="#2dd4bf" className="text-xl font-mono">90% <tspan fontSize="10" fill="currentColor">ACCURACY</tspan></text>
      <text x="650" y="130" fill="#60a5fa" className="text-xl font-mono">80% <tspan fontSize="10" fill="currentColor">FASTER</tspan></text>
    </svg>
  ),
  'murex': (
    <svg className="w-full h-full text-cyan-400/30" viewBox="-40 -40 880 280" fill="none" preserveAspectRatio="xMidYMid slice">
      <pattern id="dots-m4-b" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="currentColor" opacity="0.2" />
      </pattern>
      <rect x="-40" y="-40" width="880" height="280" fill="url(#dots-m4-b)" />

      <g transform="translate(100, 30)">
        <text x="0" y="-10" fill="currentColor" className="text-[10px] font-mono">LOG_VECTOR_SPACE</text>
        
        <g opacity="0.3">
          {[...Array(6)].map((_, y) => <path key={`h-${y}`} d={`M 0 ${y*24} L 400 ${y*24}`} stroke="currentColor" strokeWidth="1" />)}
          {[...Array(11)].map((_, x) => <path key={`v-${x}`} d={`M ${x*40} 0 L ${x*40} 120`} stroke="currentColor" strokeWidth="1" />)}
        </g>

        <motion.rect x="0" y="0" width="40" height="120" fill="#22d3ee" fillOpacity="0.1" 
          animate={{ x: [0, 360, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }} />
        
        <g transform="translate(160, 48)">
          <rect x="0" y="0" width="80" height="48" stroke="#ef4444" strokeWidth="2" fill="none" strokeDasharray="4 4" />
          <motion.circle cx="20" cy="12" r="4" fill="#ef4444" animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1, repeat: Infinity }} />
          <motion.circle cx="60" cy="12" r="4" fill="#ef4444" animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
          <motion.circle cx="40" cy="36" r="4" fill="#ef4444" animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
          <path d="M 20 12 L 60 12 L 40 36 Z" stroke="#ef4444" strokeWidth="1" fill="none" opacity="0.5" />
        </g>
      </g>

      <path d="M 340 78 L 600 78" stroke="#ef4444" strokeWidth="1.5" />
      <motion.circle cx="340" cy="78" r="4" fill="#ef4444" animate={{ cx: [340, 600] }} transition={{ duration: 1.5, repeat: Infinity }} />

      <g transform="translate(600, 58)">
        <rect x="0" y="0" width="120" height="40" rx="4" stroke="#ef4444" strokeWidth="1.5" fill="#020617" />
        <text x="15" y="23" fill="#ef4444" className="text-[10px] font-mono font-bold">PATTERN_ISOLATED</text>
      </g>
    </svg>
  ),
  'zaka': (
    <svg className="w-full h-full text-teal-400/30" viewBox="-80 -80 960 360" fill="none" preserveAspectRatio="xMidYMid slice">
      <pattern id="dots-m5-1" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="currentColor" opacity="0.2" />
      </pattern>
      <rect x="-80" y="-80" width="960" height="360" fill="url(#dots-m5-1)" />

      {[40, 80, 120, 160].map((y, i) => (
        <g key={`cam-${i}`}>
          <rect x="50" y={y-10} width="40" height="20" rx="2" stroke="currentColor" strokeWidth="1" />
          <circle cx="60" cy={y} r="3" fill="#2dd4bf" />
          <text x="70" y={y+3} fill="currentColor" className="text-[8px] font-mono">CAM</text>
          <path d={`M 90 ${y} C 150 ${y}, 200 ${y < 100 ? 80 : 120}, 250 ${y < 100 ? 80 : 120}`} stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" fill="none" />
          <motion.circle cx="90" cy={y} r="2" fill="#2dd4bf" animate={{ cx: [90, 250], cy: [y, y < 100 ? 80 : 120] }} transition={{ duration: 2, repeat: Infinity, delay: i*0.4 }} />
        </g>
      ))}

      <g transform="translate(250, 40)">
        <rect x="0" y="0" width="160" height="120" rx="8" stroke="#5eead4" strokeWidth="2" fill="currentColor" fillOpacity="0.05" />
        <text x="0" y="-10" fill="#5eead4" className="text-[10px] font-mono font-bold">DEEPSTREAM_GPU_NODE</text>
        
        <path d="M 20 20 L 140 20 M 20 40 L 140 40 M 20 60 L 140 60 M 20 80 L 140 80 M 20 100 L 140 100" stroke="currentColor" strokeWidth="0.5" />
        <path d="M 20 20 L 20 100 M 50 20 L 50 100 M 80 20 L 80 100 M 110 20 L 110 100 M 140 20 L 140 100" stroke="currentColor" strokeWidth="0.5" />
        
        <motion.rect x="20" y="20" width="30" height="20" fill="#2dd4bf" animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 1.2, repeat: Infinity }} />
        <motion.rect x="80" y="40" width="30" height="20" fill="#2dd4bf" animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }} />
        <motion.rect x="50" y="60" width="30" height="20" fill="#2dd4bf" animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 1.1, repeat: Infinity, delay: 0.7 }} />
        <motion.rect x="110" y="80" width="30" height="20" fill="#2dd4bf" animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 1.4, repeat: Infinity, delay: 0.1 }} />
      </g>

      <path d="M 410 100 L 550 100" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />
      <motion.rect x="410" y="98" width="20" height="4" fill="#2dd4bf" animate={{ x: [410, 550] }} transition={{ duration: 1.5, repeat: Infinity }} />

      <g transform="translate(550, 80)">
        <rect x="0" y="0" width="100" height="40" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <text x="10" y="23" fill="currentColor" className="text-[10px] font-mono">INFERENCE_OUT</text>
      </g>
    </svg>
  ),
  'aimtools': (
    <svg className="w-full h-full text-teal-400/30" viewBox="0 0 800 200" fill="none" preserveAspectRatio="xMidYMid slice">
      {/* Client Layer (Left) */}
      <g transform="translate(50, 50)">
        <rect x="0" y="0" width="80" height="100" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <rect x="10" y="10" width="60" height="40" rx="2" stroke="currentColor" strokeWidth="1" />
        <path d="M 10 60 L 70 60 M 10 70 L 50 70 M 10 80 L 60 80" stroke="currentColor" strokeWidth="1" />
        <text x="0" y="-10" fill="currentColor" className="text-[10px] font-mono font-bold">ANGULAR_SPA</text>
      </g>

      {/* Network */}
      <path d="M 130 100 L 250 100" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" />
      <motion.circle cx="150" cy="100" r="4" fill="#5eead4" animate={{ cx: [130, 250] }} transition={{ duration: 1.5, repeat: Infinity }} />
      <motion.circle cx="180" cy="100" r="4" fill="#5eead4" animate={{ cx: [130, 250] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }} />
      <text x="170" y="90" fill="currentColor" className="text-[8px] font-mono">HTTPS</text>

      {/* API Gateway / .NET Core (Center) */}
      <g transform="translate(250, 40)">
        <rect x="0" y="0" width="120" height="120" rx="8" stroke="#5eead4" strokeWidth="2" fill="currentColor" fillOpacity="0.05" />
        <rect x="20" y="20" width="80" height="20" rx="2" stroke="currentColor" strokeWidth="1" />
        <text x="25" y="32" fill="currentColor" className="text-[8px] font-mono">AUTH / ROUTING</text>
        
        <rect x="20" y="50" width="80" height="20" rx="2" stroke="currentColor" strokeWidth="1" />
        <text x="25" y="62" fill="currentColor" className="text-[8px] font-mono">ORDER_SERVICE</text>

        <rect x="20" y="80" width="80" height="20" rx="2" stroke="currentColor" strokeWidth="1" />
        <text x="25" y="92" fill="currentColor" className="text-[8px] font-mono">INVENTORY_SYNC</text>

        <text x="0" y="-10" fill="#5eead4" className="text-[10px] font-mono font-bold">.NET_CORE_API</text>
      </g>

      {/* Backend network */}
      <path d="M 370 70 L 500 70" stroke="currentColor" strokeWidth="1.5" />
      <path d="M 370 130 L 500 130" stroke="currentColor" strokeWidth="1.5" />
      <motion.circle cx="400" cy="70" r="3" fill="#5eead4" animate={{ cx: [370, 500] }} transition={{ duration: 1, repeat: Infinity }} />
      <motion.circle cx="400" cy="130" r="3" fill="#5eead4" animate={{ cx: [370, 500] }} transition={{ duration: 1, repeat: Infinity, delay: 0.3 }} />

      {/* Database / Azure Services (Right) */}
      <g transform="translate(500, 40)">
        {/* DB Cylinder */}
        <path d="M 0 20 C 0 10 60 10 60 20 L 60 60 C 60 70 0 70 0 60 Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
        <path d="M 0 20 C 0 30 60 30 60 20" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M 0 40 C 0 50 60 50 60 40" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <text x="0" y="-5" fill="currentColor" className="text-[8px] font-mono">AZURE_SQL</text>

        {/* Storage / queues */}
        <rect x="0" y="90" width="60" height="30" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="15" cy="105" r="5" fill="currentColor" />
        <line x1="30" y1="100" x2="50" y2="100" stroke="currentColor" strokeWidth="1" />
        <line x1="30" y1="105" x2="45" y2="105" stroke="currentColor" strokeWidth="1" />
        <line x1="30" y1="110" x2="50" y2="110" stroke="currentColor" strokeWidth="1" />
        <text x="0" y="135" fill="currentColor" className="text-[8px] font-mono">BLOB_STORAGE</text>
      </g>
      
      {/* Azure Logo / Cloud icon abstraction */}
      <path d="M 680 100 C 680 80 720 80 720 100 C 740 100 740 130 720 130 L 670 130 C 650 130 650 100 680 100 Z" stroke="#5eead4" strokeWidth="2" fill="none" />
      <text x="680" y="150" fill="#5eead4" className="text-[12px] font-mono font-bold">AZURE_CLOUD</text>
    </svg>
  ),
}

const missionHeights: Record<string, string> = {
  'airbus-electric-center': 'h-56 md:h-72',
  'green': 'h-56 md:h-72',
  'murex': 'h-56 md:h-72',
  'zaka': 'h-60 md:h-80', // Zaka is especially tall due to the GPU block
  // Default to standard base sizes for the others
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-hidden relative">


      <Starfield />
      <CommandCenterBackdrop />
      <Nav />
      <main className="pt-24 relative z-30" style={{ isolation: 'isolate' }}>
        <Container>

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between border-b border-white/10 pb-6 mb-10 mt-16"
          >
            <div className="flex items-center gap-3">
              <Radio className="h-6 w-6 text-teal-400" />
              <h2 className="text-3xl font-semibold font-display tracking-wide text-white/90">Industrial Experience</h2>
            </div>
          </motion.div>

          {/* Mission Cards */}
          <div className="space-y-12">
            {missions.map((mission, idx) => (
              <motion.div
                key={mission.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className="glass p-8 md:p-10 relative overflow-hidden group hover:shadow-[0_0_30px_rgba(20,184,166,0.1)] transition-all duration-500"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 via-transparent to-teal-500/0 group-hover:from-teal-500/5 transition-all duration-700 pointer-events-none" />

                <div className="relative z-10">
                  {/* Full-width animated SVG banner */}
                  {missionGraphics[mission.id] && (
                    <div className={`w-full ${missionHeights[mission.id] || 'h-44 md:h-56'} bg-black/40 rounded-xl border border-white/5 group-hover:border-teal-500/20 transition-all duration-500 overflow-hidden flex items-center justify-center p-4 mb-8 relative`}>
                      {/* Subtle scanning line */}
                      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-teal-400/40 to-transparent animate-[shimmer_3s_infinite]" />
                      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-teal-400/20 to-transparent" />
                      {missionGraphics[mission.id]}
                    </div>
                  )}

                  {/* Mission identity header */}
                  <header className="mb-8 border-b border-white/5 pb-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-teal-400">
                        <mission.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold font-display text-white">{mission.title}</h3>
                        <p className="text-sm font-mono text-teal-400/80 mt-1">{mission.meta}</p>
                      </div>
                    </div>
                    <p className="mt-6 text-foreground/80 leading-relaxed max-w-4xl">{mission.profile}</p>
                  </header>

                  {/* Operations grid */}
                  <div className="grid md:grid-cols-2 gap-8">
                    {mission.operations.map((op, opIdx) => (
                      <div key={opIdx} className="bg-black/30 rounded-xl p-6 border border-white/5 hover:border-white/10 transition-colors">
                        <div className="mb-4">
                          <div className="text-[10px] font-mono font-bold text-teal-400 mb-1.5 tracking-wider uppercase">{op.code}</div>
                          <h4 className="text-lg font-medium text-white/90 leading-tight">{op.name}</h4>
                        </div>
                        <p className="text-sm text-muted mb-5">{op.objective}</p>

                        <ul className="space-y-3 mb-6">
                          {op.did.map((item, i) => (
                            <li key={i} className="text-sm text-foreground/75 flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-teal-500/70 mt-0.5 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-auto pt-5 border-t border-white/10">
                          <div className="flex flex-wrap gap-2.5">
                            {op.telemetry.map((t, tIdx) => (
                              <div key={tIdx} className="text-[11px] font-mono bg-white/[0.03] px-2.5 py-1.5 rounded-md border border-teal-400/20 flex items-center gap-1.5">
                                <span className="text-teal-400/70">{t.label}:</span> <span className="text-slate-200 font-medium">{t.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </Container>
        <Footer />
      </main>
    </div>
  )
}
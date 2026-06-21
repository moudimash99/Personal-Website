'use client'

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
    <svg className="w-full h-full text-blue-400/30" viewBox="0 0 800 200" fill="none" preserveAspectRatio="xMidYMid slice">
      {/* Background grid */}
      <pattern id="grid-aec" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.2" />
      </pattern>
      <rect width="800" height="200" fill="url(#grid-aec)" />
      
      {/* Central Radar */}
      <g transform="translate(400, 100)">
        <circle cx="0" cy="0" r="80" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="0" cy="0" r="50" stroke="currentColor" strokeWidth="0.5" />
        <motion.path d="M 0 0 L 0 -80 A 80 80 0 0 1 56 -56 Z" fill="currentColor" fillOpacity="0.1" 
          animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} />
        <motion.line x1="0" y1="0" x2="0" y2="-80" stroke="#60a5fa" strokeWidth="2"
          animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} />
        
        {/* Radar blips */}
        <motion.circle cx="30" cy="-40" r="4" fill="#2dd4bf" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 0.5 }} />
        <motion.circle cx="-50" cy="20" r="3" fill="#60a5fa" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 1.8 }} />
        <motion.circle cx="10" cy="60" r="5" fill="#2dd4bf" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 2.5 }} />
      </g>

      {/* Left data feeds */}
      <path d="M 100 100 L 250 100 L 320 100" stroke="currentColor" strokeWidth="1" strokeDasharray="5 5" />
      <motion.circle cx="100" cy="100" r="3" fill="#60a5fa" animate={{ cx: [100, 320] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
      <motion.circle cx="150" cy="100" r="3" fill="#60a5fa" animate={{ cx: [150, 320] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />

      <path d="M 100 150 L 200 150 L 250 120 L 320 120" stroke="currentColor" strokeWidth="1" />
      <motion.circle cx="100" cy="150" r="3" fill="#2dd4bf" animate={{ cx: [100, 200, 250, 320], cy: [150, 150, 120, 120] }} transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }} />

      {/* Right analysis output */}
      <path d="M 480 100 L 550 100 L 600 60 L 700 60" stroke="currentColor" strokeWidth="1.5" />
      <path d="M 480 120 L 550 120 L 600 140 L 700 140" stroke="currentColor" strokeWidth="1.5" />
      
      {/* Bar charts on right */}
      <motion.rect x="620" y="30" width="10" height="30" fill="#60a5fa" fillOpacity="0.5" animate={{ height: [30, 10, 30], y: [30, 50, 30] }} transition={{ duration: 2, repeat: Infinity }} />
      <motion.rect x="640" y="20" width="10" height="40" fill="#2dd4bf" fillOpacity="0.5" animate={{ height: [40, 20, 40], y: [20, 40, 20] }} transition={{ duration: 2.5, repeat: Infinity }} />
      <motion.rect x="660" y="40" width="10" height="20" fill="#60a5fa" fillOpacity="0.5" animate={{ height: [20, 40, 20], y: [40, 20, 40] }} transition={{ duration: 1.5, repeat: Infinity }} />
      
      <text x="100" y="80" fill="currentColor" className="text-[10px] font-mono tracking-widest">LEGACY_QMS</text>
      <text x="620" y="160" fill="currentColor" className="text-[10px] font-mono tracking-widest">SKYWISE_ANALYTICS</text>
    </svg>
  ),
  'green': (
    <svg className="w-full h-full text-emerald-400/30" viewBox="0 0 800 200" fill="none" preserveAspectRatio="xMidYMid slice">
      {/* Earth Horizon */}
      <path d="M -100 250 Q 400 150 900 250" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.05" />
      <path d="M -100 270 Q 400 170 900 270" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
      
      {/* Orbit paths */}
      <path d="M -50 100 Q 400 -50 850 100" stroke="currentColor" strokeWidth="1" strokeDasharray="8 8" />
      <path d="M 100 150 Q 400 0 700 150" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />

      {/* Satellites */}
      <motion.g animate={{ x: [-100, 900], y: [120, -70, 120] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
        <rect x="-10" y="-5" width="20" height="10" fill="currentColor" />
        <rect x="-25" y="-3" width="12" height="6" fill="#34d399" />
        <rect x="13" y="-3" width="12" height="6" fill="#34d399" />
        <circle cx="0" cy="0" r="3" fill="#fff" />
        {/* Downlink beam */}
        <motion.path d="M 0 5 L -20 150 L 20 150 Z" fill="#34d399" fillOpacity="0.1" animate={{ opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 2, repeat: Infinity }} />
      </motion.g>

      <motion.g animate={{ x: [900, -100], y: [170, 20, 170] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}>
        <rect x="-8" y="-4" width="16" height="8" fill="currentColor" />
        <rect x="-20" y="-2" width="10" height="4" fill="#34d399" />
        <rect x="10" y="-2" width="10" height="4" fill="#34d399" />
      </motion.g>

      {/* Ground Station processing nodes */}
      <g transform="translate(200, 170)">
        <rect x="0" y="0" width="40" height="30" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="20" cy="15" r="5" fill="#34d399" className="animate-pulse" />
        <text x="0" y="-10" fill="currentColor" className="text-[8px] font-mono">STAC_INGEST</text>
      </g>

      <g transform="translate(400, 160)">
        <rect x="0" y="0" width="60" height="40" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <motion.line x1="10" y1="20" x2="50" y2="20" stroke="#34d399" strokeWidth="2" strokeDasharray="4 4" animate={{ strokeDashoffset: [0, -16] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
        <text x="0" y="-10" fill="currentColor" className="text-[8px] font-mono">REDIS_TILE_CACHE</text>
      </g>

      <g transform="translate(600, 170)">
        <rect x="0" y="0" width="40" height="30" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <rect x="10" y="10" width="8" height="8" fill="#34d399" />
        <rect x="22" y="10" width="8" height="8" fill="currentColor" />
        <text x="-10" y="-10" fill="currentColor" className="text-[8px] font-mono">PROMETHEUS</text>
      </g>

      {/* Ground connections */}
      <path d="M 240 185 L 400 180" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
      <path d="M 460 180 L 600 185" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
    </svg>
  ),
  'airbus': (
    <svg className="w-full h-full text-blue-400/30" viewBox="0 0 800 200" fill="none" preserveAspectRatio="xMidYMid slice">
      <pattern id="dots-airbus" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="currentColor" opacity="0.2" />
      </pattern>
      <rect width="800" height="200" fill="url(#dots-airbus)" />

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
      <text x="510" y="165" fill="currentColor" className="text-[8px] font-mono">OPTIMATE_API</text>

      {/* KPI readouts */}
      <text x="650" y="80" fill="#2dd4bf" className="text-xl font-mono">90% <tspan fontSize="10" fill="currentColor">ACCURACY</tspan></text>
      <text x="650" y="130" fill="#60a5fa" className="text-xl font-mono">80% <tspan fontSize="10" fill="currentColor">FASTER</tspan></text>
    </svg>
  ),
  'murex': (
    <svg className="w-full h-full text-cyan-400/30" viewBox="0 0 800 200" fill="none" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="grad-murex" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.5" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>

      {/* Grid */}
      <path d="M 0 50 L 800 50 M 0 100 L 800 100 M 0 150 L 800 150" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.3" />
      <path d="M 100 0 L 100 200 M 200 0 L 200 200 M 300 0 L 300 200 M 400 0 L 400 200 M 500 0 L 500 200 M 600 0 L 600 200 M 700 0 L 700 200" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.3" />

      {/* Complex HFT Waveform */}
      <path d="M 0 100 L 50 100 L 60 70 L 70 120 L 80 90 L 100 100 L 150 100 L 160 40 L 180 180 L 200 60 L 220 100 L 300 100 L 310 80 L 330 140 L 350 100 L 450 100 L 470 20 L 500 160 L 530 50 L 550 100 L 650 100 L 660 70 L 680 130 L 700 100 L 800 100" stroke="currentColor" strokeWidth="1" />
      
      {/* Animated glowing wave trace */}
      <motion.path d="M 0 100 L 50 100 L 60 70 L 70 120 L 80 90 L 100 100 L 150 100 L 160 40 L 180 180 L 200 60 L 220 100 L 300 100 L 310 80 L 330 140 L 350 100 L 450 100 L 470 20 L 500 160 L 530 50 L 550 100 L 650 100 L 660 70 L 680 130 L 700 100 L 800 100" 
        stroke="#22d3ee" strokeWidth="2" strokeDasharray="100 800"
        animate={{ strokeDashoffset: [-800, 800] }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }} />

      {/* Scanning vertical beam */}
      <motion.rect x="0" y="0" width="20" height="200" fill="url(#grad-murex)" 
        animate={{ x: [-20, 800] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} />

      {/* Anomaly markers */}
      <circle cx="180" cy="180" r="6" stroke="#ef4444" strokeWidth="2" fill="none" className="animate-ping" />
      <circle cx="470" cy="20" r="6" stroke="#ef4444" strokeWidth="2" fill="none" className="animate-ping" />
      <text x="190" y="185" fill="#ef4444" className="text-[10px] font-mono">LATENCY_SPIKE</text>
      <text x="480" y="25" fill="#ef4444" className="text-[10px] font-mono">ERR_OOM</text>

      {/* Telemetry Readouts */}
      <rect x="20" y="20" width="120" height="40" rx="4" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1" />
      <text x="30" y="35" fill="currentColor" className="text-[8px] font-mono">THROUGHPUT</text>
      <text x="30" y="50" fill="#22d3ee" className="text-[12px] font-mono">14.2k <tspan fontSize="8" fill="currentColor">msg/s</tspan></text>

      <rect x="650" y="140" width="120" height="40" rx="4" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1" />
      <text x="660" y="155" fill="currentColor" className="text-[8px] font-mono">SYSTEM_STATE</text>
      <text x="660" y="170" fill="#22d3ee" className="text-[12px] font-mono">NOMINAL</text>
    </svg>
  ),
  'zaka': (
    <svg className="w-full h-full text-teal-400/30" viewBox="0 0 800 200" fill="none" preserveAspectRatio="xMidYMid slice">
      {/* Background network lines */}
      <path d="M 100 40 L 400 100 L 700 40 M 100 100 L 400 100 L 700 100 M 100 160 L 400 100 L 700 160" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" />

      {/* Camera inputs (left) */}
      {[40, 100, 160].map((y, i) => (
        <g key={`cam-${i}`} transform={`translate(80, ${y})`}>
          <rect x="0" y="-15" width="20" height="30" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="20" cy="0" r="8" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="20" cy="0" r="3" fill="#2dd4bf" />
          <motion.path d="M 28 0 L 100 0" stroke="#2dd4bf" strokeWidth="1" strokeDasharray="4 4" 
            animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }} />
          <text x="-40" y="3" fill="currentColor" className="text-[8px] font-mono">CAM_0{i+1}</text>
        </g>
      ))}

      {/* GPU Inference Core (center) */}
      <g transform="translate(350, 60)">
        <rect x="0" y="0" width="100" height="80" rx="8" stroke="#5eead4" strokeWidth="2" fill="currentColor" fillOpacity="0.1" />
        {/* Core grid */}
        <path d="M 20 0 L 20 80 M 40 0 L 40 80 M 60 0 L 60 80 M 80 0 L 80 80" stroke="currentColor" strokeWidth="0.5" />
        <path d="M 0 20 L 100 20 M 0 40 L 100 40 M 0 60 L 100 60" stroke="currentColor" strokeWidth="0.5" />
        {/* Active cores */}
        <motion.rect x="20" y="20" width="20" height="20" fill="#2dd4bf" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity }} />
        <motion.rect x="60" y="40" width="20" height="20" fill="#2dd4bf" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} />
        <motion.rect x="40" y="60" width="20" height="20" fill="#2dd4bf" animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.5 }} />
        
        <text x="10" y="-10" fill="#5eead4" className="text-[10px] font-mono font-bold">DEEPSTREAM_GPU_NODE</text>
      </g>

      {/* Output streams (right) */}
      {[40, 100, 160].map((y, i) => (
        <g key={`out-${i}`} transform={`translate(650, ${y})`}>
          <rect x="0" y="-15" width="60" height="30" rx="2" stroke="currentColor" strokeWidth="1" />
          <motion.rect x="5" y="-10" width="50" height="5" fill="#2dd4bf" fillOpacity="0.5" animate={{ width: [10, 50, 10] }} transition={{ duration: 2+i, repeat: Infinity }} />
          <motion.rect x="5" y="0" width="30" height="5" fill="currentColor" fillOpacity="0.5" animate={{ width: [10, 30, 10] }} transition={{ duration: 1.5+i, repeat: Infinity, delay: 0.5 }} />
          <motion.path d="M -200 0 L -10 0" stroke="#2dd4bf" strokeWidth="1" strokeDasharray="4 4" 
            animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }} />
          <text x="70" y="3" fill="currentColor" className="text-[8px] font-mono">INFERENCE_OUT</text>
        </g>
      ))}
      
      {/* Metrics */}
      <text x="350" y="170" fill="#2dd4bf" className="text-[10px] font-mono font-bold">FPS: 450+ | LATENCY: 12ms</text>
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

export default function ProjectsPage() {
  return (
    <>
      <CommandCenterBackdrop />
      <Starfield />
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
              <h2 className="text-3xl font-semibold font-display tracking-wide text-white/90">Mission Archives</h2>
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
                    <div className="w-full h-44 md:h-56 bg-black/40 rounded-xl border border-white/5 group-hover:border-teal-500/20 transition-all duration-500 overflow-hidden flex items-center justify-center p-4 mb-8 relative">
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
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs font-mono font-bold bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded">OP: {op.code}</span>
                          <h4 className="text-lg font-medium text-white/90">{op.name}</h4>
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

                        <div className="mt-auto pt-4 border-t border-white/10">
                          <div className="flex flex-wrap gap-2">
                            {op.telemetry.map((t, tIdx) => (
                              <div key={tIdx} className="text-[11px] font-mono bg-white/5 px-2 py-1 rounded-md text-muted border border-white/5 flex items-center gap-1.5">
                                <span className="text-teal-500/50">{t.label}:</span> <span className="text-white/80">{t.value}</span>
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
    </>
  )
}
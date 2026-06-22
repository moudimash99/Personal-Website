'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Showcase() {
  return (
    <div className="min-h-screen bg-[#020617] text-white p-8 md:p-16 space-y-32 font-sans overflow-x-hidden">
      <div className="flex justify-between items-baseline border-b border-white/10 pb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Architectural SVGs (Final Polish)</h1>
          <p className="text-slate-400 font-mono text-sm">M1, M4, and M5 are locked. M2 integrates satellite/tiles into the flat 2D schematic style.</p>
        </div>
        <Link href="/projects" className="text-teal-400 font-mono text-sm hover:underline">[ Return to Projects ]</Link>
      </div>
      
      {/* ========================================= M1: AIRBUS ELECTRIC CENTER ========================================= */}
      <div>
        <h2 className="text-3xl font-bold mb-12 font-display text-blue-400 border-l-4 border-blue-400 pl-4">M1: Airbus Electric Center (Approved)</h2>
        <div className="space-y-16">
          <div className="space-y-4">
            <h3 className="text-teal-400 font-mono text-sm tracking-wider uppercase">Option A: The ETL Pipeline</h3>
            <div className="w-full bg-black/40 border border-white/5 rounded-xl overflow-hidden shadow-2xl relative">
              <svg viewBox="0 0 800 200" className="w-full h-full text-blue-400/30" preserveAspectRatio="xMidYMid slice">
                <pattern id="dots-m1-1" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="currentColor" opacity="0.2" />
                </pattern>
                <rect width="800" height="200" fill="url(#dots-m1-1)" />

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
                  <text x="0" y="-10" fill="currentColor" className="text-[10px] font-mono font-bold">SKYWISE_ONTOLOGY</text>
                </g>
              </svg>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-teal-400 font-mono text-sm tracking-wider uppercase">Option B: Root Cause Tracing</h3>
            <div className="w-full bg-black/40 border border-white/5 rounded-xl overflow-hidden shadow-2xl relative">
              <svg viewBox="0 0 800 200" className="w-full h-full text-blue-400/30" preserveAspectRatio="xMidYMid slice">
                <pattern id="dots-m1-2" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="currentColor" opacity="0.2" />
                </pattern>
                <rect width="800" height="200" fill="url(#dots-m1-2)" />

                <g transform="translate(600, 80)">
                  <rect x="0" y="0" width="120" height="40" rx="4" stroke="#60a5fa" strokeWidth="2" fill="currentColor" fillOpacity="0.05" />
                  <text x="10" y="23" fill="#60a5fa" className="text-[10px] font-mono font-bold">NON_CONFORMANCE</text>
                </g>

                <path d="M 600 100 L 400 100 M 400 100 L 300 50 M 400 100 L 300 150 M 300 50 L 150 50 M 300 150 L 150 150 M 150 50 L 50 30 M 150 50 L 50 70 M 150 150 L 50 130 M 150 150 L 50 170" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                
                <motion.circle cx="600" cy="100" r="3" fill="#60a5fa" animate={{ cx: [600, 400, 300, 150, 50], cy: [100, 100, 50, 50, 30] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} />
                <motion.circle cx="600" cy="100" r="3" fill="#2dd4bf" animate={{ cx: [600, 400, 300, 150, 50], cy: [100, 100, 150, 150, 170] }} transition={{ duration: 3.5, repeat: Infinity, ease: "linear", delay: 1 }} />

                <rect x="250" y="35" width="50" height="30" rx="4" stroke="currentColor" strokeWidth="1" fill="#020617" />
                <text x="255" y="53" fill="currentColor" className="text-[8px] font-mono">SUPPLIER</text>
                
                <rect x="250" y="135" width="50" height="30" rx="4" stroke="currentColor" strokeWidth="1" fill="#020617" />
                <text x="255" y="153" fill="currentColor" className="text-[8px] font-mono">ASSEMBLY</text>

                {[30, 70, 130, 170].map((y, i) => (
                  <g key={i}>
                    <rect x="20" y={y-10} width="40" height="20" rx="2" stroke="currentColor" strokeWidth="1" fill="#020617" />
                    <text x="25" y={y+2} fill="currentColor" className="text-[8px] font-mono">RCA_{i+1}</text>
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================= M2: GREEN PRAXIS ========================================= */}
      <div>
        <h2 className="text-3xl font-bold mb-12 font-display text-emerald-400 border-l-4 border-emerald-400 pl-4">M2: Green Praxis (Flat + Satellite/Tiles)</h2>
        <div className="space-y-16">
          
          {/* M2 - Option A: The Schematic Tile Stack */}
          <div className="space-y-4">
            <h3 className="text-teal-400 font-mono text-sm tracking-wider uppercase">Option A: The Schematic Tile Stack</h3>
            <div className="w-full bg-black/40 border border-white/5 rounded-xl overflow-hidden shadow-2xl relative">
              <svg viewBox="0 0 800 200" className="w-full h-full text-emerald-400/30" preserveAspectRatio="xMidYMid slice">
                <pattern id="dots-m2-a" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="currentColor" opacity="0.2" />
                </pattern>
                <rect width="800" height="200" fill="url(#dots-m2-a)" />

                {/* Flat, Command-Center Satellite Icon */}
                <g transform="translate(60, 40)">
                  <rect x="0" y="0" width="40" height="20" rx="2" stroke="#34d399" strokeWidth="1.5" fill="#020617" />
                  <rect x="-15" y="5" width="10" height="10" fill="#34d399" fillOpacity="0.4" />
                  <rect x="45" y="5" width="10" height="10" fill="#34d399" fillOpacity="0.4" />
                  <text x="-5" y="-10" fill="#34d399" className="text-[8px] font-mono font-bold">STAC_CATALOG</text>
                  
                  {/* Data Beam dropping down and right */}
                  <path d="M 20 20 L 20 80 L 150 80" stroke="#34d399" strokeWidth="1.5" strokeDasharray="3 3" />
                  <motion.circle cx="20" cy="20" r="3" fill="#34d399" animate={{ cy: [20, 80, 80], cx: [20, 20, 150] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
                </g>

                {/* Staggered Flat Tiles (Isometric architecture but drawn in 2D vector style) */}
                <g transform="translate(180, 40)">
                  <text x="30" y="-10" fill="currentColor" className="text-[10px] font-mono">GEE_TILE_MATRIX</text>
                  
                  {/* Base framework */}
                  <rect x="0" y="0" width="180" height="120" rx="4" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.05" />
                  
                  {/* Tile 1 (Bottom) */}
                  <polygon points="60,40 140,40 120,70 40,70" stroke="currentColor" strokeWidth="1" fill="#020617" />
                  {/* Tile 2 (Middle - Highlighted) */}
                  <polygon points="80,60 160,60 140,90 60,90" stroke="#34d399" strokeWidth="1.5" fill="rgba(52,211,153,0.1)" />
                  {/* Tile 3 (Top) */}
                  <polygon points="100,80 180,80 160,110 80,110" stroke="currentColor" strokeWidth="1" fill="#020617" />
                  
                  {/* Animated pulse on the highlighted tile */}
                  <motion.polygon points="80,60 160,60 140,90 60,90" fill="#34d399" animate={{ opacity: [0.1, 0.4, 0.1] }} transition={{ duration: 2, repeat: Infinity }} />
                </g>

                {/* Output Pipeline */}
                <path d="M 360 100 L 550 100" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
                <motion.rect x="360" y="98" width="15" height="4" fill="#34d399" animate={{ x: [360, 550] }} transition={{ duration: 1.5, repeat: Infinity }} />

                {/* API Output */}
                <g transform="translate(550, 70)">
                  <rect x="0" y="0" width="120" height="60" rx="4" stroke="#34d399" strokeWidth="1.5" fill="#020617" />
                  <rect x="15" y="20" width="90" height="10" rx="2" fill="currentColor" fillOpacity="0.2" />
                  <rect x="15" y="35" width="70" height="10" rx="2" fill="currentColor" fillOpacity="0.2" />
                  <text x="15" y="-5" fill="#34d399" className="text-[10px] font-mono font-bold">DYNAMIC_MAP_API</text>
                </g>
              </svg>
            </div>
          </div>

          {/* M2 - Option B: The Flat Top-Down Grid Scanner */}
          <div className="space-y-4">
            <h3 className="text-teal-400 font-mono text-sm tracking-wider uppercase">Option B: The Top-Down Grid Scanner</h3>
            <div className="w-full bg-black/40 border border-white/5 rounded-xl overflow-hidden shadow-2xl relative">
              <svg viewBox="0 0 800 200" className="w-full h-full text-emerald-400/30" preserveAspectRatio="xMidYMid slice">
                <pattern id="dots-m2-b" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="currentColor" opacity="0.2" />
                </pattern>
                <rect width="800" height="200" fill="url(#dots-m2-b)" />

                <g transform="translate(100, 20)">
                  {/* The Flat Top-Down Earth Grid */}
                  <g transform="translate(0, 60)">
                    <rect x="0" y="0" width="240" height="80" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.05" />
                    {/* Grid lines */}
                    {[20, 40, 60].map(y => <line key={`h-${y}`} x1="0" y1={y} x2="240" y2={y} stroke="currentColor" strokeWidth="0.5" />)}
                    {[20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220].map(x => <line key={`v-${x}`} x1={x} y1="0" x2={x} y2="80" stroke="currentColor" strokeWidth="0.5" />)}
                    
                    <text x="0" y="-15" fill="currentColor" className="text-[10px] font-mono">GLOBAL_SURFACE_GRID</text>

                    {/* Illuminated Tile trailing the satellite */}
                    <motion.rect x="0" y="20" width="20" height="20" fill="#34d399" fillOpacity="0.8"
                      animate={{ x: [0, 220, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} />
                  </g>

                  {/* Satellite orbiting directly above the grid */}
                  <motion.g animate={{ x: [0, 220, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
                    <rect x="-10" y="0" width="40" height="15" rx="2" stroke="#34d399" strokeWidth="1.5" fill="#020617" />
                    <text x="-15" y="-10" fill="#34d399" className="text-[8px] font-mono font-bold">ORBIT</text>
                    {/* Scanner laser pointing straight down to the grid */}
                    <line x1="10" y1="15" x2="10" y2="80" stroke="#34d399" strokeWidth="1" strokeDasharray="2 4" />
                  </motion.g>
                </g>
                
                {/* Extracted Data flowing out from the grid */}
                <path d="M 340 120 L 500 120" stroke="currentColor" strokeWidth="1.5" />
                <motion.rect x="340" y="115" width="10" height="10" rx="1" fill="#34d399" animate={{ x: [340, 500] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
                <motion.rect x="340" y="115" width="10" height="10" rx="1" fill="#10b981" animate={{ x: [340, 500] }} transition={{ duration: 2, repeat: Infinity, delay: 1, ease: "linear" }} />

                <g transform="translate(500, 90)">
                  <rect x="0" y="0" width="120" height="60" rx="4" stroke="currentColor" strokeWidth="1.5" fill="#020617" />
                  <text x="15" y="25" fill="currentColor" className="text-[10px] font-mono">AIRFLOW_CACHE</text>
                  <rect x="15" y="40" width="90" height="4" fill="#34d399" fillOpacity="0.5" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================= M4: MUREX SYSTEMS ========================================= */}
      <div>
        <h2 className="text-3xl font-bold mb-12 font-display text-cyan-400 border-l-4 border-cyan-400 pl-4">M4: Murex Systems (Approved)</h2>
        <div className="space-y-16">
          
          <div className="space-y-4">
            <h3 className="text-teal-400 font-mono text-sm tracking-wider uppercase">Option A: The Logic Sieve</h3>
            <div className="w-full bg-black/40 border border-white/5 rounded-xl overflow-hidden shadow-2xl relative">
              <svg viewBox="0 0 800 200" className="w-full h-full text-cyan-400/30" preserveAspectRatio="xMidYMid slice">
                <pattern id="dots-m4-a" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="currentColor" opacity="0.2" />
                </pattern>
                <rect width="800" height="200" fill="url(#dots-m4-a)" />

                <g transform="translate(50, 40)">
                  <text x="0" y="-15" fill="currentColor" className="text-[10px] font-mono">UNSTRUCTURED_LOGS</text>
                  {[...Array(20)].map((_, i) => (
                    <motion.rect key={i} x="0" y={Math.random() * 120} width={Math.random() * 20 + 10} height="4" rx="2" fill="currentColor" fillOpacity="0.6" 
                      animate={{ x: [0, 200] }} transition={{ duration: 1.5 + Math.random(), repeat: Infinity, ease: "linear" }} />
                  ))}
                </g>

                <g transform="translate(280, 40)">
                  <rect x="0" y="0" width="60" height="120" rx="4" stroke="#22d3ee" strokeWidth="2" fill="#020617" />
                  <text x="10" y="-15" fill="#22d3ee" className="text-[10px] font-mono font-bold">PYTHON_PARSER</text>
                  <rect x="20" y="20" width="20" height="10" rx="2" fill="#22d3ee" fillOpacity="0.2" />
                  <rect x="20" y="55" width="20" height="10" rx="2" fill="#ef4444" fillOpacity="0.2" />
                  <rect x="20" y="90" width="20" height="10" rx="2" fill="#22d3ee" fillOpacity="0.2" />
                </g>

                <path d="M 340 60 L 500 60" stroke="#22d3ee" strokeWidth="1" strokeDasharray="4 4" />
                <path d="M 340 95 L 500 95" stroke="#ef4444" strokeWidth="1.5" />
                <path d="M 340 130 L 500 130" stroke="#22d3ee" strokeWidth="1" strokeDasharray="4 4" />

                <motion.rect x="340" y="93" width="20" height="4" fill="#ef4444" animate={{ x: [340, 500] }} transition={{ duration: 1.2, repeat: Infinity }} />

                <g transform="translate(500, 45)">
                  <rect x="0" y="0" width="100" height="30" rx="4" stroke="currentColor" fill="#020617" />
                  <text x="10" y="18" fill="currentColor" className="text-[8px] font-mono">NOMINAL_TRAFFIC</text>
                </g>
                <g transform="translate(500, 80)">
                  <rect x="0" y="0" width="100" height="30" rx="4" stroke="#ef4444" fill="rgba(239,68,68,0.1)" />
                  <text x="10" y="18" fill="#ef4444" className="text-[8px] font-mono font-bold">ANOMALY_PATTERN_A</text>
                </g>
                <g transform="translate(500, 115)">
                  <rect x="0" y="0" width="100" height="30" rx="4" stroke="currentColor" fill="#020617" />
                  <text x="10" y="18" fill="currentColor" className="text-[8px] font-mono">NOISE_DISCARDED</text>
                </g>
              </svg>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-teal-400 font-mono text-sm tracking-wider uppercase">Option B: The Machine Learning Vector Matrix</h3>
            <div className="w-full bg-black/40 border border-white/5 rounded-xl overflow-hidden shadow-2xl relative">
              <svg viewBox="0 0 800 200" className="w-full h-full text-cyan-400/30" preserveAspectRatio="xMidYMid slice">
                <pattern id="dots-m4-b" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="currentColor" opacity="0.2" />
                </pattern>
                <rect width="800" height="200" fill="url(#dots-m4-b)" />

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
            </div>
          </div>
        </div>
      </div>

      {/* ========================================= M5: ZAKA ========================================= */}
      <div>
        <h2 className="text-3xl font-bold mb-12 font-display text-teal-400 border-l-4 border-teal-400 pl-4">M5: ZAKA (Approved)</h2>
        <div className="space-y-16">
          <div className="space-y-4">
            <h3 className="text-teal-400 font-mono text-sm tracking-wider uppercase">Option A: The Central GPU (Fixed + Cells)</h3>
            <div className="w-full bg-black/40 border border-white/5 rounded-xl overflow-hidden shadow-2xl relative">
              <svg viewBox="0 0 800 200" className="w-full h-full text-teal-400/30" preserveAspectRatio="xMidYMid slice">
                <pattern id="dots-m5-1" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="currentColor" opacity="0.2" />
                </pattern>
                <rect width="800" height="200" fill="url(#dots-m5-1)" />

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
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

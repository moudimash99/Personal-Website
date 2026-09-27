'use client'

import { ReactNode } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { AboutTile } from '@/data/about'

/* Each hobby opens into an object that belongs to it: a scrapbook for game
   night, a court for tennis, goggles for FPV, a labelled split board for keyboards,
   a slicer for 3D printing and an org chart for the cats. All read from data/about.ts. */

const fact = (tile: AboutTile, label: string) => tile.facts?.find(f => f.label === label)?.value
const note = (tile: AboutTile, label: string) => tile.notes?.find(n => n.label === label)?.text
const list = (tile: AboutTile, label: string) => tile.lists?.find(l => l.label === label)?.items ?? []

/* Staggered entrance shared by every theme. */
function Pop({ i, children, className = '' }: { i: number, children: ReactNode, className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.12 + i * 0.06, type: 'spring', stiffness: 260, damping: 22 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function Cta({ tile, className = '' }: { tile: AboutTile, className?: string }) {
  if (!tile.cta) return null
  return <p className={`mt-6 text-right font-hand text-3xl text-accent-300 -rotate-2 ${className}`}>{tile.cta} →</p>
}

/* ── Tabletop: scrapbook ─────────────────────────────────────────────── */

const TILTS = ['-rotate-3', 'rotate-2', '-rotate-1', 'rotate-3', '-rotate-2', 'rotate-1']
const STICKY = ['bg-[#ffe98f]', 'bg-[#b8f1e4]', 'bg-[#ffd0c2]', 'bg-[#dfe7ff]']
const paper = 'bg-[#f4ecdc] text-[#1b2326] shadow-[0_10px_20px_rgba(0,0,0,0.45)]'

function Scrapbook({ tile }: { tile: AboutTile }) {
  let s = 0
  const sticky = () => STICKY[s++ % STICKY.length]
  const scraps: [string, ReactNode][] = [
    ['polaroid', (
      <div className={`${paper} relative p-2.5 pb-10`}>
        <span aria-hidden className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 rotate-3 bg-[#f5b942]/60" />
        <div className="relative aspect-[4/3] overflow-hidden"><Image src={tile.image} alt={tile.title} fill unoptimized className="object-cover" /></div>
        <p className="absolute inset-x-0 bottom-1.5 text-center font-hand text-2xl">{tile.caption}</p>
      </div>
    )],
    ...(tile.facts ?? []).map(f => [`f-${f.label}`, (
      <div className={`${sticky()} p-4 font-hand text-[#1b2326] shadow-[0_10px_20px_rgba(0,0,0,0.4)]`}>
        <p className="text-lg leading-none opacity-70">{f.label}:</p>
        <p className="mt-1 text-2xl font-bold leading-tight">{f.value}</p>
      </div>
    )] as [string, ReactNode]),
    ...(tile.lists ?? []).map(l => [`l-${l.label}`, (
      <div className={`${paper} px-5 py-4 font-hand`}>
        <p className="text-2xl font-bold">{l.label}</p>
        <ol className="mt-1 list-decimal pl-6 text-xl leading-snug">{l.items.map(it => <li key={it}>{it}</li>)}</ol>
      </div>
    )] as [string, ReactNode]),
    ...(tile.notes ?? []).map(n => [`n-${n.label}`, (
      <div className={`${sticky()} p-4 font-hand text-[#1b2326] shadow-[0_10px_20px_rgba(0,0,0,0.4)]`}>
        <p className="text-lg leading-none opacity-70">{n.label}:</p>
        <p className="mt-1 text-[1.35rem] leading-tight">{n.text}</p>
      </div>
    )] as [string, ReactNode]),
  ]
  return (
    <>
      <div className="columns-1 gap-6 sm:columns-2">
        {scraps.map(([key, node], i) => (
          <Pop key={key} i={i} className="mb-7 break-inside-avoid">
            <div className={`${TILTS[i % TILTS.length]} transition-transform duration-300 hover:rotate-0 hover:scale-[1.03]`}>{node}</div>
          </Pop>
        ))}
      </div>
      <Cta tile={tile} />
    </>
  )
}

/* ── Tennis: the court and a scoreboard ──────────────────────────────── */

function Court({ tile }: { tile: AboutTile }) {
  const inspirations = list(tile, 'Player inspirations')
  return (
    <>
      <Pop i={0}>
        <div className="rounded-xl bg-[#2f6d9a] p-3 shadow-[0_12px_24px_rgba(0,0,0,0.45)]">
          <div className="relative grid grid-cols-2 border-[3px] border-white/90 bg-[#3b7fb0]">
            <span aria-hidden className="absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 bg-white/90" />
            <span aria-hidden className="absolute inset-y-0 left-1/2 w-2 -translate-x-1/2 border-x border-dashed border-white/40" />
            <span aria-hidden className="absolute inset-x-0 top-[18%] h-[2px] bg-white/80" />
            <span aria-hidden className="absolute inset-x-0 bottom-[18%] h-[2px] bg-white/80" />
            <div className="relative p-5 pt-14 pb-14 pr-8">
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/70">Home court</p>
              <p className="font-display text-xl font-bold text-white">{fact(tile, 'Home court')}</p>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-white/70">Racket</p>
              <p className="font-display text-lg font-bold text-white">{fact(tile, 'Racket')}</p>
            </div>
            <div className="relative p-5 pt-14 pb-14 pl-8">
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/70">In my corner</p>
              <ul className="mt-1 space-y-2">
                {inspirations.map(p => {
                  const [name, why] = p.split(' — ')
                  return <li key={p}><span className="block font-display font-bold text-white">{name}</span><span className="text-sm text-white/80">{why}</span></li>
                })}
              </ul>
            </div>
          </div>
        </div>
      </Pop>
      <Pop i={1} className="mt-5">
        <div className="rounded-xl border-4 border-[#1f2a30] bg-[#0b0f11] p-4 shadow-[0_12px_24px_rgba(0,0,0,0.5)]">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[#8fa3a8]">
            <span>Level · {fact(tile, 'Level')}</span><span>Current goal</span>
          </div>
          <p className="mt-2 font-mono text-lg uppercase leading-snug tracking-wider text-[#ffd84d] [text-shadow:0_0_8px_rgba(255,216,77,0.55)]">
            {note(tile, 'Current goal')}
          </p>
        </div>
      </Pop>
      <Cta tile={tile} />
    </>
  )
}

/* ── Micro FPV: through the goggles ──────────────────────────────────── */

function Goggles({ tile }: { tile: AboutTile }) {
  const osd = 'font-mono uppercase text-white [text-shadow:0_0_2px_#000,0_0_6px_#000]'
  return (
    <>
      <Pop i={0}>
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border-4 border-[#15191c] shadow-[0_14px_28px_rgba(0,0,0,0.55)]">
          <Image src={tile.image} alt="" fill unoptimized className="object-cover saturate-[.85]" />
          <div aria-hidden className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.18)_0px,rgba(0,0,0,0.18)_1px,transparent_2px,transparent_4px)]" />
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.7))]" />
          <div className={`absolute left-4 top-3 text-[11px] leading-relaxed ${osd}`}>
            <p className="text-[#ff5a4e]">● REC</p>
            <p className="text-white/70">The fleet</p>
            <p>{fact(tile, 'The fleet')}</p>
          </div>
          <p className={`absolute right-4 top-3 text-[11px] ${osd}`}>▮▮▮▯ ACRO</p>
          <p aria-hidden className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl ${osd}`}>—+—</p>
          <div className={`absolute bottom-3 left-4 text-[11px] ${osd}`}>
            <p className="text-white/70">Current challenge</p>
            <p className="text-[#ffd84d]">{note(tile, 'Current challenge')}</p>
          </div>
        </div>
      </Pop>
      <Pop i={1} className="mt-5">
        <div className="flex gap-3 rounded-xl border border-[#ff5a4e]/50 bg-[#ff5a4e]/10 px-4 py-3">
          <span className="font-mono text-[11px] font-bold uppercase text-[#ff8a80] animate-pulse">⚠ Warning</span>
          <p className="text-sm text-foreground/90">{note(tile, 'Favorite part')}</p>
        </div>
      </Pop>
    </>
  )
}

/* ── Keyboards: a split board with the facts on its keys ─────────────── */

type KeyTone = 'plain' | 'rotation' | 'firmware' | 'build'

const KEY_TONES: Record<KeyTone, string> = {
  plain: 'bg-[#eef1f3] text-[#1b2326] shadow-[0_4px_0_#9aa4ab]',
  rotation: 'bg-accent-500 text-[#062a26] font-semibold shadow-[0_4px_0_#0f766e]',
  firmware: 'bg-[#ef6f51] text-white font-semibold shadow-[0_4px_0_#b44a36]',
  build: 'bg-[#f5b942] text-[#1b2326] font-semibold shadow-[0_4px_0_#b7862a]',
}

type K = [string, KeyTone?]
const LEFT: K[][] = [
  [['ESC'], ['1'], ['2'], ['3'], ['4']],
  [['LILY 58', 'rotation'], ['Q'], ['W'], ['E'], ['R']],
  [['⇥'], ['A'], ['S'], ['D'], ['DIY', 'build']],
  [['⇧'], ['Z'], ['X'], ['C'], ['V']],
]
const LEFT_THUMBS: K[] = [['ZMK', 'firmware'], ['⌥'], ['␣']]
const RIGHT: K[][] = [
  [['5'], ['6'], ['7'], ['8'], ['⌫']],
  [['T'], ['Y'], ['U'], ['I'], ['SOFLE', 'rotation']],
  [['BT', 'build'], ['H'], ['J'], ['K'], ['L']],
  [['B'], ['N'], ['M'], [','], ['⏎']],
]
const RIGHT_THUMBS: K[] = [['↵'], ['⌘'], ['FN', 'firmware']]

function Key({ k }: { k: K }) {
  const [label, tone = 'plain'] = k
  return (
    <span className={`grid aspect-square place-items-center rounded-[7px] px-0.5 text-center font-mono text-[9px] leading-[1.05] ${KEY_TONES[tone]}`}>
      {label.split(' ').map(w => <span key={w} className="block">{w}</span>)}
    </span>
  )
}

function Half({ rows, thumbs, side }: { rows: K[][], thumbs: K[], side: 'l' | 'r' }) {
  return (
    <div className={`flex-1 rounded-xl bg-[#1b2326] p-2.5 shadow-[0_10px_22px_rgba(0,0,0,0.5)] ${side === 'l' ? 'rotate-[4deg]' : '-rotate-[4deg]'}`}>
      <div className="grid grid-cols-5 gap-[5px]">
        {rows.flat().map((k, i) => <Key key={i} k={k} />)}
      </div>
      <div className={`mt-1.5 flex gap-[5px] ${side === 'l' ? 'justify-end' : 'justify-start'}`}>
        {thumbs.map((k, i) => <span key={i} className="w-[19%]"><Key k={k} /></span>)}
      </div>
    </div>
  )
}

function SplitBoard({ tile }: { tile: AboutTile }) {
  const legend: [string, string, string | undefined][] = [
    ['bg-accent-500', 'The rotation', fact(tile, 'The rotation')],
    ['bg-[#ef6f51]', 'Firmware', fact(tile, 'Firmware')],
    ['bg-[#f5b942]', 'Build style', fact(tile, 'Build style')],
    ['bg-[#eef1f3]', 'Switches', list(tile, 'Switches').join(', ')],
  ]
  return (
    <>
      <Pop i={0}>
        <div className="flex justify-between gap-5 px-1 py-2">
          <Half rows={LEFT} thumbs={LEFT_THUMBS} side="l" />
          <Half rows={RIGHT} thumbs={RIGHT_THUMBS} side="r" />
        </div>
      </Pop>
      <Pop i={1} className="mt-6">
        <dl className="grid grid-cols-[auto_1fr] items-start gap-x-3 gap-y-2 text-sm text-muted">
          {legend.map(([swatch, label, value]) => (
            <div key={label} className="contents">
              <dt className={`mt-1 h-3.5 w-3.5 rounded ${swatch}`} aria-hidden />
              <dd><span className="font-semibold text-foreground">{label}:</span> {value}</dd>
            </div>
          ))}
        </dl>
      </Pop>
      <Pop i={2} className="mt-5">
        <p className="text-sm text-muted"><span className="text-foreground">Why split?</span> {note(tile, 'Why split keyboards')}</p>
      </Pop>
    </>
  )
}

/* ── 3D printing: the slicer ─────────────────────────────────────────── */

function Slicer({ tile }: { tile: AboutTile }) {
  const prints = list(tile, 'What I print')
  const tints = ['#14b8a6', '#f5b942', '#ef6f51', '#5eead4', '#e7f5f2']
  return (
    <>
      <Pop i={0}>
        <div className="overflow-hidden rounded-2xl border border-[#2a3338] bg-[#161b1f] shadow-[0_14px_28px_rgba(0,0,0,0.5)]">
          <div className="flex flex-wrap items-center gap-2 border-b border-[#2a3338] px-4 py-2.5 font-mono text-[11px]">
            <span className="text-[#8fa3a8]">Printer</span>
            <span className="rounded-md border border-accent-500/50 bg-accent-500/15 px-2 py-0.5 text-accent-100">{fact(tile, 'Current workhorse')} ▾</span>
            <span className="text-[#8fa3a8] line-through decoration-[#ef6f51]">{fact(tile, 'Former workhorse')}</span>
          </div>
          <div className="p-4">
            <div className="relative rounded-lg bg-[#2b2f33] p-3 [background-image:radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1.5px)] [background-size:12px_12px]">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[#8fa3a8]">Build plate · what I print</p>
              <div className="flex flex-wrap gap-2.5">
                {prints.map((p, i) => (
                  <span key={p} className="rounded-md px-3 py-2 text-[13px] font-medium text-[#0b1214] shadow-[0_4px_0_rgba(0,0,0,0.35)]" style={{ background: tints[i % tints.length] }}>{p}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Pop>
      <Pop i={1} className="mt-5">
        <div className="rounded-xl border border-border bg-surface2 px-4 py-3">
          <div className="flex items-center justify-between font-mono text-[11px]">
            <span className="text-accent-300">Next big build</span><span className="text-[#8fa3a8]">slicing…</span>
          </div>
          <p className="mt-1 text-foreground">{note(tile, 'Next big build')}</p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface"><div className="h-full w-1/4 animate-pulse rounded-full bg-accent-400" /></div>
        </div>
      </Pop>
      <Pop i={2} className="mt-4">
        <p className="font-hand text-2xl leading-snug text-muted">“{note(tile, 'Favorite part')}”</p>
      </Pop>
    </>
  )
}

/* ── Cats: the MM HQ org chart ───────────────────────────────────────── */

function Staff({ tile, name, title, detail, focus }: { tile: AboutTile, name: string, title: string, detail?: string, focus: string }) {
  return (
    <div className="flex-1 rounded-xl border border-border bg-surface2 px-3 py-3 text-center">
      <div
        role="img"
        aria-label={name}
        className="mx-auto h-16 w-16 rounded-full border-[3px] border-[#f5b942] bg-no-repeat"
        style={{ backgroundImage: `url(${tile.image})`, backgroundSize: '500% auto', backgroundPosition: focus }}
      />
      <p className="mt-2 font-display text-lg font-bold text-foreground">{name}</p>
      <p className="text-[13px] text-accent-300">{title}</p>
      <p className="mt-0.5 text-[12px] text-muted">{detail?.toLowerCase()} · {fact(tile, 'Breed')}</p>
    </div>
  )
}

const Line = ({ className = '' }: { className?: string }) => <span aria-hidden className={`block bg-border ${className}`} />

function OrgChart({ tile }: { tile: AboutTile }) {
  const [mascots, testing, distraction] = list(tile, 'Official job titles')
  return (
    <div className="flex flex-col items-center">
      <p className="font-mono text-[10px] uppercase tracking-widest text-accent-300">MM HQ · organisation chart</p>
      <Pop i={0} className="mt-4 w-full max-w-xs">
        <div className="rounded-xl border border-[#f5b942] bg-[#f5b942]/10 px-4 py-3 text-center">
          <p className="font-display text-lg font-bold text-foreground">{mascots}</p>
          <p className="text-[12px] text-muted">shared leadership</p>
        </div>
      </Pop>
      <Line className="h-5 w-[2px]" />
      <Line className="h-[2px] w-1/2" />
      <div className="flex w-full justify-between px-[25%]"><Line className="h-5 w-[2px]" /><Line className="h-5 w-[2px]" /></div>
      <Pop i={1} className="w-full">
        <div className="flex gap-4">
          <Staff tile={tile} name="Simba" title={testing.replace(/s$/, '')} detail={fact(tile, 'Simba')} focus="69% 51%" />
          <Staff tile={tile} name="Nala" title={distraction.replace(/s$/, '')} detail={fact(tile, 'Nala')} focus="34% 55%" />
        </div>
      </Pop>
      <Line className="h-6 w-[2px]" />
      <Pop i={2} className="w-full max-w-sm">
        <div className="rounded-xl border border-dashed border-border px-4 py-3 text-center">
          <p className="font-display font-bold text-foreground">Several hardware projects</p>
          <p className="text-[12px] text-muted">report directly to the cats</p>
        </div>
      </Pop>
      <p className="mt-3 font-mono text-[11px] text-muted">est. {fact(tile, 'Born')}</p>
    </div>
  )
}

/* ── Picker ──────────────────────────────────────────────────────────── */

const THEMES: Record<string, (p: { tile: AboutTile }) => JSX.Element> = {
  tabletop: Scrapbook,
  tennis: Court,
  fpv: Goggles,
  keyboards: SplitBoard,
  fabrication: Slicer,
  cats: OrgChart,
}

export default function ThemedBody({ tile }: { tile: AboutTile }) {
  const Theme = THEMES[tile.id] ?? Scrapbook
  return <Theme tile={tile} />
}

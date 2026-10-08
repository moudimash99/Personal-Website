import type { Metadata } from 'next'
import { ReactNode } from 'react'
import Image from 'next/image'
import { ArrowUpRight, Github, Globe, Lock } from 'lucide-react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { skunkworks, SkunkworksStatus } from '@/data/skunkworks'

export const metadata: Metadata = {
  title: 'Skunkworks | MACHAKA Mohammad',
  description: 'Things I build for myself outside of work: hardware, automation and small tools.',
}

const statusStyles: Record<SkunkworksStatus, string> = {
  active: 'bg-ok/15 text-ok border-ok/40',
  prototype: 'bg-warn/15 text-warn border-warn/40',
  archived: 'bg-white/5 text-muted border-border',
}

/* ── Cat feeder schematic ── */

function Node({ x, y, w, h, label, sub, strong = false }: { x: number, y: number, w: number, h: number, label: string, sub?: string, strong?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="6" className={strong ? 'fill-accent-500/15 stroke-accent-400' : 'fill-surface2 stroke-border'} strokeWidth="1.5" />
      <text x={x + w / 2} y={sub ? y + 19 : y + h / 2 + 4} textAnchor="middle" className={`font-mono text-[11px] ${strong ? 'fill-accent-100' : 'fill-muted'}`}>{label}</text>
      {sub && <text x={x + w / 2} y={y + 33} textAnchor="middle" className="font-mono text-[8.5px] fill-muted opacity-70">{sub}</text>}
    </g>
  )
}

const FeederSchematic = () => (
  <figure>
  <svg viewBox="0 0 320 215" fill="none" className="w-full h-auto" role="img" aria-label="Load cell and Tapo camera feed the ESP32, which actuates the feeder">
    <defs>
      <marker id="sk-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
        <path d="M0 0 L8 4 L0 8 Z" className="fill-accent-400" />
      </marker>
    </defs>
    <Node x={10} y={90} w={80} h={36} label="Load cell" />
    <Node x={120} y={82} w={80} h={52} label="ESP32" strong />
    <Node x={230} y={10} w={80} h={36} label="Tapo cam" />
    <Node x={230} y={90} w={80} h={36} label="CV model" />
    <Node x={120} y={170} w={80} h={36} label="Feeder gate" />
    <g className="stroke-accent-400 flow" strokeWidth="1.5" markerEnd="url(#sk-arrow)">
      <path d="M90 108 H118" />
      <path d="M270 46 V88" />
      <path d="M230 108 H202" />
      <path d="M160 134 V168" />
    </g>
    <text x="104" y="100" textAnchor="middle" className="fill-muted font-mono text-[9px]">grams</text>
    <text x="276" y="71" className="fill-muted font-mono text-[9px]">frames</text>
    <text x="216" y="100" textAnchor="middle" className="fill-muted font-mono text-[9px]">cat id</text>
    <text x="166" y="155" className="fill-muted font-mono text-[9px]">open</text>
  </svg>
  <figcaption className="mt-3 font-mono text-[10px] leading-relaxed text-muted">the gate opens only for the cat the camera recognises</figcaption>
  </figure>
)

/* ── Worked examples: one input becoming one output ── */

function Example({ tag, children, note }: { tag: string, children: ReactNode, note?: ReactNode }) {
  return (
    <figure className="text-sm">
      <p className="font-mono text-[10px] uppercase tracking-widest text-accent-300">{tag}</p>
      <div className="mt-2">{children}</div>
      {note && <figcaption className="mt-3 font-mono text-[10px] leading-relaxed text-muted">{note}</figcaption>}
    </figure>
  )
}

const Box = ({ children, className = '' }: { children: ReactNode, className?: string }) => (
  <div className={`rounded-xl border border-border bg-base px-3.5 py-3 ${className}`}>{children}</div>
)

const Step = ({ children }: { children: ReactNode }) => (
  <p className="my-1.5 text-center font-mono text-[10px] text-accent-400">↓ {children}</p>
)

const Pill = ({ tone, children }: { tone: 'ok' | 'warn' | 'no' | 'accent', children: ReactNode }) => {
  const tones = {
    ok: 'border-ok/40 bg-ok/15 text-ok',
    warn: 'border-warn/40 bg-warn/15 text-warn',
    no: 'border-no/40 bg-no/15 text-no',
    accent: 'border-accent-400/30 bg-accent-500/10 text-accent-100',
  }
  return <span className={`shrink-0 rounded-md border px-2 py-0.5 font-mono text-[10px] uppercase ${tones[tone]}`}>{children}</span>
}

/* Free Motion: one agent per job, the fallback model, and what each agent does. */
const NIGHT: ('agy' | 'sonnet')[] = ['agy', 'agy', 'agy', 'agy', 'agy', 'agy', 'agy', 'agy', 'sonnet', 'sonnet', 'sonnet', 'sonnet', 'agy', 'agy']

const FreeMotionExample = () => (
  <Example
    tag="one night of applications · illustrative"
    note="Each job gets its own fresh agent, so one broken posting can't spoil the rest of the night."
  >
    <Box>
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[11px] text-foreground">{NIGHT.length} jobs tonight</span>
        <span className="font-mono text-[10px] text-muted">one agent per job</span>
      </div>
      <div className="mt-3 flex gap-1" aria-label="Jobs of the night, colored by the agent that handled them">
        {NIGHT.map((d, i) => (
          <span key={i} className={`h-4 flex-1 rounded-[4px] ${d === 'agy' ? 'bg-accent-400' : 'bg-warn'}`} />
        ))}
      </div>
      <div className="mt-2 grid grid-cols-[1fr_auto] gap-x-3 gap-y-1 font-mono text-[10px]">
        <span className="text-muted"><span className="text-accent-300">■</span> agy agent</span><span className="text-muted">does most of the work</span>
        <span className="text-muted"><span className="text-warn">■</span> Claude Sonnet</span><span className="text-muted">steps in when agy runs out</span>
      </div>
      <p className="mt-2 text-[12px] text-muted">When agy hits its quota in the middle of a job, Sonnet redoes that job and carries on until agy is available again.</p>
    </Box>
    <Step>what each agent does</Step>
    <Box className="space-y-2">
      {[
        ['Claim', 'marks the job as taken, so it is never applied to twice'],
        ['Write', 'builds the CV and cover letter from my prepared profile sections'],
        ['Apply', 'opens the real form in a browser and fills it in'],
        ['Record', 'logs the result, but only if the application really went through'],
      ].map(([k, v]) => (
        <div key={k} className="grid grid-cols-[3.5rem_1fr] gap-2 text-[12px]">
          <span className="font-mono text-[10px] uppercase text-accent-300 pt-px">{k}</span>
          <span className="text-muted">{v}</span>
        </div>
      ))}
    </Box>
  </Example>
)

/* Okkazeo: a real deal from the scraper's output. */
const OkkazeoExample = () => (
  <Example
    tag="real deal · from the scraper's output"
    note="Bundles and special editions can't be priced this way: those go to an LLM for review instead."
  >
    <Box>
      <div className="flex items-baseline justify-between gap-2">
        <span className="font-display font-semibold text-foreground">Le Havre</span>
        <span className="font-display text-2xl font-bold text-foreground">€40</span>
      </div>
      <p className="mt-0.5 text-[12px] text-muted">just unboxed · original edition · ships</p>
    </Box>
    <Step>compare to what the game usually sells for</Step>
    <Box className="flex items-center justify-between">
      <span className="text-[12px] text-muted">usual price</span>
      <span className="font-display text-xl font-bold text-muted line-through decoration-2">€106</span>
    </Box>
    <Step>email alert</Step>
    <Box className="flex items-center justify-between gap-2">
      <span className="text-[13px] text-foreground">62% under market · €57 net margin</span>
      <Pill tone="warn">deal</Pill>
    </Box>
  </Example>
)

/* BoardXplorer: the real formula on real games from the app's database. */
const PICKS: [string, number, number][] = [['The Crew: Mission Deep Sea', 0.77, 43], ['Bomb Busters', 0.76, 99], ['SCOUT', 0.73, 106]]

const BoardXplorerExample = () => (
  <Example
    tag="real formula · games from the app's database"
    note="Scored with the app's default weights across the 595 games in its database that fit 4 players and ≤ 60 min."
  >
    <div className="flex flex-wrap gap-1.5">
      <Pill tone="accent">4 players</Pill><Pill tone="accent">≤ 60 min</Pill>
    </div>
    <Step>ranked for tonight</Step>
    <Box className="space-y-2">
      {PICKS.map(([name, score, rank], i) => (
        <div key={name} className="grid grid-cols-[1rem_1fr_4rem_2rem] items-center gap-2 font-mono text-[11px]">
          <span className="text-muted">{i + 1}</span>
          <span className="truncate text-foreground">{name}</span>
          <span className="h-1.5 rounded-full bg-surface2"><span className="block h-full rounded-full bg-accent-400" style={{ width: `${score * 100}%` }} /></span>
          <span className="text-right text-muted">{score.toFixed(2)}</span>
        </div>
      ))}
    </Box>
    <Step>and the one that drops</Step>
    <Box>
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[11px] text-foreground">Cascadia</span>
        <span className="font-mono text-[11px] text-muted">BGG #60 → <span className="text-no">224th tonight</span></span>
      </div>
      <p className="mt-1 text-[12px] text-muted">Great game, but only 23% of players call it best at 4.</p>
    </Box>
  </Example>
)

/* Matchmaker: a real fair pairing from the community win-rate data. */
const MatchmakerExample = () => (
  <Example
    tag="real matchup · community win-rate data"
    note="pair score = 0.6 × style fit + 0.4 × fairness (default). Only pairs inside the 40–60% band count as fair."
  >
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-center">
      <Box className="px-2">
        <p className="font-display font-semibold text-foreground">Dracula</p>
        <p className="mt-1 font-mono text-[10px] text-muted">melee · attrition</p>
      </Box>
      <span className="grid h-9 w-9 place-items-center rounded-full bg-accent-400 font-display text-sm font-bold text-surface">VS</span>
      <Box className="px-2">
        <p className="font-display font-semibold text-foreground">Robin Hood</p>
        <p className="mt-1 font-mono text-[10px] text-muted">ranged assist · evasion</p>
      </Box>
    </div>
    <Step>check the win rate</Step>
    <Box>
      <div className="relative h-2.5 rounded-full bg-surface2">
        <div className="absolute inset-y-0 left-[40%] w-[20%] rounded-full bg-accent-500/50" />
        <div className="absolute -top-1 bottom-[-4px] left-[51%] w-1 rounded bg-warn" />
      </div>
      <div className="mt-1.5 flex justify-between font-mono text-[10px] text-muted"><span>0%</span><span className="text-accent-300">fair 40–60%</span><span>100%</span></div>
    </Box>
    <Step>suggest it</Step>
    <Box className="flex items-center justify-between gap-2">
      <span className="text-[13px] text-foreground">Dracula wins 51% over 208 games</span>
      <Pill tone="ok">fair</Pill>
    </Box>
  </Example>
)

const artifacts: Record<string, ReactNode> = {
  'free-motion': <FreeMotionExample />,
  'cat-feeders': <FeederSchematic />,
  'okkazeo-scraper': <OkkazeoExample />,
  'boardxplorer': <BoardXplorerExample />,
  'unmatched-matchmaker': <MatchmakerExample />,
}

export default function SkunkworksPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="pt-24 relative">
        <div className="mx-auto max-w-4xl px-4">
          <header className="mb-10">
            <h1 className="font-display font-bold uppercase tracking-tight leading-[0.95] text-4xl sm:text-5xl text-foreground">Skunkworks.</h1>
            <dl className="mt-5 max-w-2xl border-l-2 border-accent-500/50 pl-4">
              <dt className="flex flex-wrap items-baseline gap-x-2">
                <span className="font-display text-lg font-semibold text-foreground">skunkworks</span>
                <span className="font-mono text-xs text-muted">/ˈskʌŋk.wɜːks/</span>
                <span className="text-sm italic text-muted">noun</span>
              </dt>
              <dd className="mt-1 text-sm leading-relaxed text-muted">
                A small team inside a company that is left alone to build something new, away from the usual rules.
              </dd>
            </dl>
            <p className="mt-5 max-w-2xl text-muted">
              Mine is a team of one. These are the things I build for myself outside of work: hardware, automation and small tools that fix my own problems.
              Each card says what started the project, what it is for, how it is built, and shows an example of it running.
            </p>
            <p className="mt-4 font-mono text-xs text-accent-300">
              {skunkworks.length} projects · {skunkworks.filter(p => p.status.tone === 'active').length} active
            </p>
          </header>

          <div className="space-y-6">
            {skunkworks.map(project => (
              <article key={project.id} id={project.id} className="deep-link overflow-hidden rounded-3xl border border-border bg-surface shadow-card">
                <div className="relative aspect-[16/8] sm:aspect-[16/5] border-b border-border">
                  <Image src={project.banner} alt="" fill unoptimized className="object-cover" />
                </div>
                <div className="p-6 md:p-8">
                {/* Header */}
                <header className="flex flex-wrap items-start justify-between gap-3">
                  <h2 className="font-display font-bold uppercase tracking-tight text-2xl md:text-3xl text-foreground">{project.title}</h2>
                  <span className={`shrink-0 rounded-md border px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider ${statusStyles[project.status.tone]}`}>
                    {project.status.label}
                  </span>
                </header>

                {/* Stack */}
                <ul className="mt-3 flex flex-wrap gap-2" aria-label="Tech stack">
                  {project.stack.map(tech => (
                    <li key={tech} className="rounded-full border border-accent-400/30 bg-accent-500/10 px-2.5 py-0.5 font-mono text-[11px] uppercase text-accent-100">{tech}</li>
                  ))}
                </ul>

                {(project.sites || project.repos) && (
                  <ul className="mt-4 flex flex-wrap gap-2" aria-label="Live sites and source code">
                    {project.sites?.map(s => (
                      <li key={s.url}>
                        <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border border-accent-400 bg-accent-500/20 px-2.5 py-1 font-mono text-[11px] text-accent-100 hover:bg-accent-500/30 transition-colors">
                          <Globe className="h-3.5 w-3.5" aria-hidden />{s.url.replace('https://', '')}<span className="text-accent-300/70">· {s.label}</span><ArrowUpRight className="h-3 w-3" aria-hidden />
                        </a>
                      </li>
                    ))}
                    {project.repos?.map(r => (
                      <li key={r.name}>
                        {r.private ? (
                          <span title="Private repository" className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1 font-mono text-[11px] text-muted/70">
                            <Lock className="h-3.5 w-3.5" aria-hidden />{r.name}<span className="text-muted/50">· {r.label} · private</span>
                          </span>
                        ) : (
                          <a href={`https://github.com/moudimash99/${r.name}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border border-accent-500/40 bg-accent-500/10 px-2.5 py-1 font-mono text-[11px] text-accent-100 hover:border-accent-400 hover:bg-accent-500/20 transition-colors">
                            <Github className="h-3.5 w-3.5" aria-hidden />{r.name}<span className="text-accent-300/70">· {r.label}</span>
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-5 border-b border-border" />

                {/* Body */}
                <div className="mt-6 grid gap-6 md:grid-cols-2 md:gap-8">
                  <div className="space-y-5 text-sm leading-relaxed">
                    <div>
                      <h3 className="font-display font-semibold text-foreground mb-1">The Catalyst</h3>
                      <p className="text-muted">{project.catalyst}</p>
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground mb-1">The Goal</h3>
                      <p className="text-muted">{project.goal}</p>
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground mb-1">Architecture</h3>
                      <p className="text-muted">{project.architecture}</p>
                    </div>
                  </div>
                  <div className="md:border-l md:border-border md:pl-8 flex items-center">
                    <div className="w-full">{artifacts[project.id]}</div>
                  </div>
                </div>
                </div>
              </article>
            ))}
          </div>
        </div>
        <Footer />
      </main>
    </div>
  )
}

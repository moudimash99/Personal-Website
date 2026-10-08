'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus, X, ArrowRight } from 'lucide-react'
import Container from '@/components/Container'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { aboutTiles, AboutTile, hero, commonThread } from '@/data/about'
import ThemedBody from '@/components/about/ThemedPanels'

/* Grid placement per tile (hero is rendered separately) */
const span: Record<string, string> = {
  fabrication: 'sm:col-span-2 lg:col-span-5 min-h-[18rem]',
  tennis: 'lg:col-span-4 lg:aspect-square',
  fpv: 'lg:col-span-4 lg:aspect-square',
  keyboards: 'lg:col-span-4 lg:aspect-square',
  tabletop: 'sm:col-span-2 lg:col-span-8 min-h-[16rem]',
  cats: 'sm:col-span-2 lg:col-span-4 lg:aspect-square',
}

const tileBase = 'relative overflow-hidden rounded-3xl border border-border bg-surface shadow-card'

function Tile({ tile, onOpen }: { tile: AboutTile, onOpen: () => void }) {
  const wide = tile.id === 'tabletop'
  return (
    <motion.button
      layoutId={`tile-${tile.id}`}
      onClick={onOpen}
      aria-haspopup="dialog"
      className={`${tileBase} ${span[tile.id]} group text-left flex flex-col hover:border-accent-500/50 hover:shadow-glow transition-[border-color,box-shadow] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400`}
    >
      <span className="absolute top-4 right-4 z-10 grid h-8 w-8 place-items-center rounded-full border border-border bg-surface2/90 backdrop-blur text-muted transition-all duration-300 group-hover:rotate-90 group-hover:border-accent-400 group-hover:text-accent-300">
        <Plus className="h-4 w-4" />
      </span>

      {wide ? (
        <>
          <Image src={tile.image} alt="" fill unoptimized className="object-cover object-right transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/70 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-surface via-surface/80 to-transparent" />
          <div className="relative mt-auto p-6 md:p-7 max-w-md">
            <h2 className="font-display font-bold uppercase tracking-tight leading-[1.05] text-2xl md:text-[1.7rem] text-foreground">{tile.title}</h2>
            <p className="mt-1.5 text-sm text-muted">{tile.tagline}</p>
          </div>
        </>
      ) : (
        <>
          <div className="relative flex-1 min-h-[10rem] overflow-hidden border-b border-border">
            <Image src={tile.image} alt="" fill unoptimized className="object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="p-5 md:p-6">
            <h2 className="font-display font-bold uppercase tracking-tight leading-[1.05] text-xl md:text-2xl text-foreground">{tile.title}</h2>
            <p className="mt-1 text-sm text-muted">{tile.tagline}</p>
          </div>
        </>
      )}
    </motion.button>
  )
}

function DetailPanel({ tile, onClose }: { tile: AboutTile, onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        className="absolute inset-0 bg-base/80 backdrop-blur-sm"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        layoutId={`tile-${tile.id}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`dlg-${tile.id}`}
        className={`${tileBase} relative w-full max-w-2xl max-h-[90vh] overflow-y-auto no-scrollbar bg-[#10191b]`}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-border bg-surface2 text-muted hover:text-accent-300 hover:border-accent-400 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ delay: 0.12 }}
          className="p-6 md:p-8"
        >
          <h2 id={`dlg-${tile.id}`} className="pr-12font-display font-bold uppercase tracking-tight text-3xl text-foreground">{tile.title}</h2>
          <p className="mt-1 font-hand text-2xl leading-tight text-accent-300">{tile.tagline}</p>

          <div className="mt-8">
            <ThemedBody tile={tile} />
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default function AboutMePage() {
  const [openId, setOpenId] = useState<string | null>(null)
  const open = aboutTiles.find(t => t.id === openId)
  // The open card lives in the URL (/about-me#tennis) so it can be shared; ?open=tennis still works for older links.
  const show = useCallback((id: string | null) => {
    setOpenId(id)
    history.replaceState(null, '', id ? `#${id}` : window.location.pathname)
  }, [])
  const close = useCallback(() => show(null), [show])

  useEffect(() => {
    const fromUrl = () => {
      const id = window.location.hash.slice(1) || new URLSearchParams(window.location.search).get('open')
      setOpenId(id && aboutTiles.some(t => t.id === id) ? id : null)
    }
    fromUrl()
    window.addEventListener('hashchange', fromUrl)
    return () => window.removeEventListener('hashchange', fromUrl)
  }, [])

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="pt-24 relative">
        <Container>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-5">
            {/* Hero */}
            <div className={`${tileBase} sm:col-span-2 lg:col-span-7 min-h-[18rem] p-6 md:p-8 flex flex-col justify-end`}>
              <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-accent-500/15 blur-3xl" />
              <h1 className="relative font-display font-bold uppercase tracking-tight leading-[0.95] text-4xl sm:text-5xl text-foreground">
                {hero.title}.
              </h1>
              <p className="relative mt-4 font-hand text-2xl leading-snug text-accent-300 max-w-xl">{hero.outsideWork}</p>
              <p className="relative mt-4 text-sm leading-relaxed text-muted max-w-xl">{hero.explainer}</p>
            </div>

            {aboutTiles.map(tile => (
              <Tile key={tile.id} tile={tile} onOpen={() => show(tile.id)} />
            ))}

            {/* The common thread */}
            <section className={`${tileBase} sm:col-span-2 lg:col-span-12 p-6 md:p-8`}>
              <div className="absolute -bottom-24 right-0 h-64 w-96 rounded-full bg-accent-500/10 blur-3xl" />
              <h2 className="relative font-display font-bold uppercase tracking-tight text-2xl md:text-[1.7rem] text-foreground">The Common Thread</h2>
              <p className="relative mt-2 max-w-2xl text-muted">
                {commonThread.intro} <span className="text-foreground/90">{commonThread.examples}</span>
              </p>
              <ol className="relative mt-6 flex flex-wrap items-center gap-2 font-mono text-xs sm:text-sm" aria-label="The pattern">
                {commonThread.pattern.map((step, i) => (
                  <li key={step} className="flex items-center gap-2">
                    <span className={`rounded-full border px-3.5 py-1.5 ${i === commonThread.pattern.length - 1 ? 'border-accent-400 bg-accent-500/20 text-accent-100' : 'border-border bg-surface2 text-foreground'}`}>{step}</span>
                    {i < commonThread.pattern.length - 1 && <ArrowRight className="h-4 w-4 text-accent-400" aria-hidden />}
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </Container>
        <Footer />
      </main>

      <AnimatePresence>
        {open && <DetailPanel key={open.id} tile={open} onClose={close} />}
      </AnimatePresence>
    </div>
  )
}

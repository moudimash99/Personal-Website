'use client'
import { useEffect, useState } from 'react'
import Button from './Button'
import Panel from './Panel'

export default function IntroOverlay() {
  const [show, setShow] = useState(true) // ✅ start true, decide in effect

  useEffect(() => {
    // force-open if URL has #intro
    const forced = typeof window !== 'undefined' && window.location.hash === '#intro'
    if (forced) { setShow(true); return }

    const flag = typeof window !== 'undefined' && localStorage.getItem('mc_intro_hide')
    if (flag) setShow(false) // user has seen it
  }, [])

  function close(save: boolean) {
    if (save) localStorage.setItem('mc_intro_hide', '1')
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => close(false)} />
      <div className="relative max-w-2xl mx-4">
        <Panel>
          <div className="p-6">
            <p className="text-xs uppercase tracking-widest text-accent-300/80 font-mono">Welcome</p>
            <h2 className="text-2xl md:text-3xl font-semibold mt-2 font-display">Machaka Ground Station</h2>
            <p className="text-sm text-muted mt-3">
              This is my portfolio, presented like a <strong>mission control room</strong>.
              <em> Mission Debrief</em> = overview; <em>Missions</em> & <em>Operations</em> = projects & sub-projects;
              metrics are the <em>telemetry</em> (measured impact).
            </p>
            <p className="text-sm text-muted mt-3">
              It’s a normal portfolio—just themed so you can skim outcomes fast and dive deeper if you want.
            </p>
            <div className="flex gap-3 mt-5">
              <Button onClick={() => close(true)}>Enter Control Room</Button>
              <Button variant="outline" onClick={() => close(false)}>View Once</Button>
            </div>
            <p className="text-[11px] text-muted mt-2">Tip: add <code>#intro</code> to the URL or use the “Intro” button to reopen.</p>
          </div>
        </Panel>
      </div>
    </div>
  )
}

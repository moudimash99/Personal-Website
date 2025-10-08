'use client'
import { useEffect, useState } from 'react'
import Button from './Button'
import Panel from './Panel'

export default function IntroOverlay() {
  // ready = we've mounted and decided; visible = actually show the overlay
  const [ready, setReady] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Only runs on client. Decide once, then mark ready.
    try {
      const forced = window.location.hash === '#intro'
      const seen = localStorage.getItem('mc_intro_hide') === '1'
      setVisible(forced || !seen)
    } finally {
      setReady(true)
    }

    // Listen for the top bar “open intro” event (no reload)
    const handler = (e: any) => {
      if (e?.detail === 'open') {
        localStorage.removeItem('mc_intro_hide') // so it can auto-open again if needed
        setVisible(true)
      }
    }
    window.addEventListener('mc-intro', handler as EventListener)
    return () => window.removeEventListener('mc-intro', handler as EventListener)
  }, [])

  function close(save: boolean) {
    if (save) localStorage.setItem('mc_intro_hide', '1')
    setVisible(false)
  }

  // ⛔ Before we've decided, render nothing (prevents flash)
  if (!ready || !visible) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => close(false)} />
      <div className="relative max-w-2xl mx-4">
        <Panel>
          <div className="p-6">
            <p className="text-xs uppercase tracking-widest text-accent-300/80 font-mono">Welcome</p>
            <h2 className="text-2xl md:text-3xl font-semibold mt-2 font-display">Machaka Ground Station</h2>
            <p className="text-sm text-muted mt-3">
              This is my portfolio, presented like a <strong>mission control room</strong>. <em>Mission Debrief</em> is the overview; <em>Missions</em> & <em>Operations</em> are projects & sub-projects; metrics are the <em>telemetry</em>.
            </p>
            <div className="flex gap-3 mt-5">
              <Button onClick={() => close(true)}>Enter Control Room</Button>
              <Button variant="outline" onClick={() => close(false)}>View Once</Button>
            </div>
            <p className="text-[11px] text-muted mt-2">
              Tip: use the “Intro” button in the top bar to reopen.
            </p>
          </div>
        </Panel>
      </div>
    </div>
  )
}

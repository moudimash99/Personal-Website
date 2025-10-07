'use client'
import { useEffect, useRef } from 'react'

export default function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let w = canvas.width = window.innerWidth
    let h = canvas.height = window.innerHeight
    let stopped = false
    const DPR = Math.min(2, window.devicePixelRatio || 1)
    canvas.width = w * DPR; canvas.height = h * DPR; canvas.style.width = w+'px'; canvas.style.height = h+'px'; ctx.scale(DPR,DPR)

    const count = Math.min(250, Math.floor((w*h)/12000))
    const stars = Array.from({length: count}).map(()=>({ x: Math.random()*w, y: Math.random()*h, r: Math.random()*1.1+0.2, s: Math.random()*0.5+0.2 }))

    function draw() {
      ctx.clearRect(0,0,w,h)
      for (const st of stars) {
        ctx.beginPath()
        ctx.arc(st.x, st.y, st.r, 0, Math.PI*2)
        ctx.fillStyle = `rgba(94,234,212,${0.15 + Math.random()*0.35})`
        ctx.fill()
        st.y += st.s * 0.2
        if (st.y > h) { st.y = -2; st.x = Math.random()*w }
      }
    }
    let raf: number
    const loop = () => { if (!stopped) { draw(); raf = requestAnimationFrame(loop) } }
    loop()

    const onResize = () => {
      w = window.innerWidth; h = window.innerHeight
      canvas.width = w * DPR; canvas.height = h * DPR; canvas.style.width = w+'px'; canvas.style.height = h+'px'; ctx.scale(DPR,DPR)
    }
    window.addEventListener('resize', onResize)
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const motionHandler = () => { stopped = mq.matches; if (!stopped) loop() }
    mq.addEventListener?.('change', motionHandler)
    motionHandler()
    return () => { stopped = true; cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); mq.removeEventListener?.('change', motionHandler) }
  }, [])
  return <canvas className="pointer-events-none fixed inset-0 z-10 !bg-transparent opacity-25" ref={ref} />

}
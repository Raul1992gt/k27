'use client'

import { useEffect, useRef } from 'react'

// Subtle canvas background for landing pages (particles/balls)
// - Fewer objects than home, very light
// - Respects reduced motion and visibility
export default function LandingBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const runningRef = useRef(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const _ctx = canvas.getContext('2d')
    if (!_ctx) return
    const context = _ctx as CanvasRenderingContext2D

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (prefersReduced.matches) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const onResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    const onVisibility = () => {
      runningRef.current = document.visibilityState === 'visible'
      if (runningRef.current && rafRef.current === null) rafRef.current = requestAnimationFrame(tick)
    }
    document.addEventListener('visibilitychange', onVisibility)

    type P = { x: number; y: number; r: number; vx: number; vy: number; a: number }
    const isMobile = () => window.innerWidth < 768
    const COUNT = isMobile() ? 5 : 8

    const balls: P[] = Array.from({ length: COUNT }, () => {
      const r = rand(8, 14)
      const speed = rand(6, 12) / 100
      const angle = Math.random() * Math.PI * 2
      return { x: Math.random() * width, y: Math.random() * height, r, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, a: rand(0.06, 0.14) }
    })

    function rand(min: number, max: number) { return Math.random() * (max - min) + min }

    function update(p: P) {
      p.x += p.vx
      p.y += p.vy
      if (p.x - p.r < 0 || p.x + p.r > width) p.vx *= -1
      if (p.y - p.r < 0 || p.y + p.r > height) p.vy *= -1
    }

    function draw(p: P) {
      context.save()
      context.globalAlpha = p.a
      // ball color (padel-ish)
      context.fillStyle = '#d8f255'
      context.beginPath()
      context.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      context.fill()
      context.restore()
    }

    let last = performance.now()
    const target = 1000 / 30
    function tick(now: number) {
      if (!runningRef.current) { rafRef.current = null; return }
      if (now - last >= target) {
        last = now
        context.clearRect(0, 0, width, height)
        balls.forEach(b => { update(b); draw(b) })
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <canvas ref={canvasRef} aria-hidden className="fixed inset-0 z-0 pointer-events-none opacity-60" />
  )
}

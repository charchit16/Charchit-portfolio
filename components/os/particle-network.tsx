"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  baseVx: number
  baseVy: number
  radius: number
  alpha: number
}

const PARTICLE_COUNT = 110
const CONNECTION_DIST = 140
const MOUSE_REPEL_DIST = 130
const MOUSE_REPEL_FORCE = 0.4
const SPEED = 0.5
const RETURN_EASE = 0.012
const NEON_COLOR = "0, 255, 180"
const ACCENT_COLOR = "120, 80, 255"

export function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -9999, y: -9999 })
  const particles = useRef<Particle[]>([])
  const rafId = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")!

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    // Each particle gets a persistent base velocity it always drifts back toward
    particles.current = Array.from({ length: PARTICLE_COUNT }, () => {
      const angle = Math.random() * Math.PI * 2
      const spd = (Math.random() * 0.5 + 0.75) * SPEED
      const bvx = Math.cos(angle) * spd
      const bvy = Math.sin(angle) * spd
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: bvx,
        vy: bvy,
        baseVx: bvx,
        baseVy: bvy,
        radius: Math.random() * 1.8 + 0.6,
        alpha: Math.random() * 0.5 + 0.4,
      }
    })

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }
    const onMouseLeave = () => {
      mouse.current = { x: -9999, y: -9999 }
    }
    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseleave", onMouseLeave)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const ps = particles.current
      const mx = mouse.current.x
      const my = mouse.current.y

      // Update positions
      for (const p of ps) {
        // Repel from cursor
        const dx = p.x - mx
        const dy = p.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MOUSE_REPEL_DIST && dist > 0) {
          const force = (MOUSE_REPEL_DIST - dist) / MOUSE_REPEL_DIST * MOUSE_REPEL_FORCE
          p.vx += (dx / dist) * force
          p.vy += (dy / dist) * force
        }

        // Hard cap after repulsion so particles don't fly off
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        const maxSpd = SPEED * 5
        if (spd > maxSpd) {
          p.vx = (p.vx / spd) * maxSpd
          p.vy = (p.vy / spd) * maxSpd
        }

        // Always ease back toward natural base velocity — no friction, always moving
        p.vx += (p.baseVx - p.vx) * RETURN_EASE
        p.vy += (p.baseVy - p.vy) * RETURN_EASE

        p.x += p.vx
        p.y += p.vy

        // Wrap edges
        if (p.x < -10) p.x = canvas.width + 10
        if (p.x > canvas.width + 10) p.x = -10
        if (p.y < -10) p.y = canvas.height + 10
        if (p.y > canvas.height + 10) p.y = -10
      }

      // Draw connections
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const dx = ps[i].x - ps[j].x
          const dy = ps[i].y - ps[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECTION_DIST) {
            const opacity = (1 - dist / CONNECTION_DIST) * 0.55
            // Alternate line color slightly for depth
            const color = (i + j) % 7 === 0 ? ACCENT_COLOR : NEON_COLOR
            ctx.beginPath()
            ctx.strokeStyle = `rgba(${color}, ${opacity})`
            ctx.lineWidth = 0.8
            ctx.moveTo(ps[i].x, ps[i].y)
            ctx.lineTo(ps[j].x, ps[j].y)
            ctx.stroke()
          }
        }

        // Draw connections from cursor to nearby particles
        const cdx = ps[i].x - mx
        const cdy = ps[i].y - my
        const cdist = Math.sqrt(cdx * cdx + cdy * cdy)
        if (cdist < CONNECTION_DIST * 1.4) {
          const opacity = (1 - cdist / (CONNECTION_DIST * 1.4)) * 0.8
          ctx.beginPath()
          ctx.strokeStyle = `rgba(${NEON_COLOR}, ${opacity})`
          ctx.lineWidth = 1.2
          ctx.moveTo(ps[i].x, ps[i].y)
          ctx.lineTo(mx, my)
          ctx.stroke()
        }
      }

      // Draw particles
      for (const p of ps) {
        // Glow effect
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4)
        grd.addColorStop(0, `rgba(${NEON_COLOR}, ${p.alpha})`)
        grd.addColorStop(1, `rgba(${NEON_COLOR}, 0)`)
        ctx.beginPath()
        ctx.fillStyle = grd
        ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2)
        ctx.fill()

        // Core dot
        ctx.beginPath()
        ctx.fillStyle = `rgba(${NEON_COLOR}, ${p.alpha + 0.3})`
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      // Cursor glow pulse
      if (mx > 0 && my > 0) {
        const pulse = ctx.createRadialGradient(mx, my, 0, mx, my, 60)
        pulse.addColorStop(0, `rgba(${NEON_COLOR}, 0.18)`)
        pulse.addColorStop(1, `rgba(${NEON_COLOR}, 0)`)
        ctx.beginPath()
        ctx.fillStyle = pulse
        ctx.arc(mx, my, 60, 0, Math.PI * 2)
        ctx.fill()
      }

      rafId.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(rafId.current)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseleave", onMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}

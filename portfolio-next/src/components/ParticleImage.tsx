'use client'

import { useEffect, useRef } from 'react'

interface ParticleImageProps {
  src: string
  alt: string
}

/** Radius of the cursor area that dissolves into particles, in CSS px. */
const RADIUS = 130

export default function ParticleImage({ src, alt }: ParticleImageProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const rafRef = useRef(0)
  const srcCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const ssRef = useRef(1)
  const containRef = useRef({ x: 0, y: 0, w: 0, h: 0 })

  // Packed particle data (parallel arrays for speed)
  const hxRef = useRef<Float32Array>(new Float32Array(0))
  const hyRef = useRef<Float32Array>(new Float32Array(0))
  const alRef = useRef<Float32Array>(new Float32Array(0))
  const phRef = useRef<Float32Array>(new Float32Array(0))
  const colRef = useRef<Uint8Array>(new Uint8Array(0))
  const countRef = useRef(0)

  const mouse = useRef({ x: -9999, y: -9999, tx: -9999, ty: -9999, amt: 0, target: 0 })

  useEffect(() => {
    const wrap = wrapRef.current
    const img = imgRef.current
    const canvas = canvasRef.current
    if (!wrap || !img || !canvas) return

    // Respect reduced motion — leave the plain image in place.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let alive = true
    let built = false

    /** Sample the image into a particle field sized to the current layout box. */
    const build = () => {
      if (!img.complete || !img.naturalWidth) return
      const rect = wrap.getBoundingClientRect()
      const W = Math.round(rect.width)
      const H = Math.round(rect.height)
      if (W < 10 || H < 10) return

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
      canvas.style.width = W + 'px'
      canvas.style.height = H + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Match CSS: object-fit: contain; object-position: center center
      const nW = img.naturalWidth
      const nH = img.naturalHeight
      const scale = Math.min(W / nW, H / nH)
      const cw = nW * scale
      const ch = nH * scale
      containRef.current = { x: (W - cw) / 2, y: (H - ch) / 2, w: cw, h: ch }

      const ss = dpr
      ssRef.current = ss

      const sc = srcCanvasRef.current ?? document.createElement('canvas')
      srcCanvasRef.current = sc
      sc.width = Math.max(1, Math.round(cw * ss))
      sc.height = Math.max(1, Math.round(ch * ss))
      const sctx = sc.getContext('2d', { willReadFrequently: true })
      if (!sctx) return
      sctx.clearRect(0, 0, sc.width, sc.height)
      sctx.drawImage(img, 0, 0, sc.width, sc.height)

      let data: Uint8ClampedArray
      try {
        data = sctx.getImageData(0, 0, sc.width, sc.height).data
      } catch {
        return // tainted canvas — bail and keep the plain image
      }

      const step = Math.max(1, Math.round(5 * ss))
      const max = Math.ceil(sc.width / step) * Math.ceil(sc.height / step)
      const hx = new Float32Array(max)
      const hy = new Float32Array(max)
      const al = new Float32Array(max)
      const ph = new Float32Array(max)
      const col = new Uint8Array(max * 3)
      const cx = containRef.current.x
      const cy = containRef.current.y
      let n = 0

      for (let y = 0; y < sc.height; y += step) {
        for (let x = 0; x < sc.width; x += step) {
          const i = (y * sc.width + x) * 4
          const a = data[i + 3]
          if (a < 45) continue // skip transparent background
          hx[n] = cx + x / ss
          hy[n] = cy + y / ss
          al[n] = a / 255
          ph[n] = Math.random() * Math.PI * 2
          col[n * 3] = data[i]
          col[n * 3 + 1] = data[i + 1]
          col[n * 3 + 2] = data[i + 2]
          n++
        }
      }

      hxRef.current = hx
      hyRef.current = hy
      alRef.current = al
      phRef.current = ph
      colRef.current = col
      countRef.current = n
      built = n > 0

      // The canvas now renders the image itself, so hide the DOM copy.
      if (built) img.style.opacity = '0'
    }

    const draw = (t: number) => {
      if (!alive) return
      rafRef.current = requestAnimationFrame(draw)
      if (!built) return

      const rect = wrap.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)

      const sc = srcCanvasRef.current
      if (!sc) return
      const c = containRef.current

      const m = mouse.current
      m.x += (m.tx - m.x) * 0.18
      m.y += (m.ty - m.y) * 0.18
      m.amt += (m.target - m.amt) * 0.1

      // 1. The image, drawn normally — looks untouched.
      ctx.drawImage(sc, c.x, c.y, c.w, c.h)

      if (m.amt <= 0.01) return

      const R = RADIUS
      const R2 = R * R

      // 2. Erase a soft-edged hole under the cursor.
      const hole = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, R)
      hole.addColorStop(0, `rgba(0,0,0,${m.amt})`)
      hole.addColorStop(0.55, `rgba(0,0,0,${m.amt * 0.82})`)
      hole.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.globalCompositeOperation = 'destination-out'
      ctx.fillStyle = hole
      ctx.beginPath()
      ctx.arc(m.x, m.y, R, 0, Math.PI * 2)
      ctx.fill()
      ctx.globalCompositeOperation = 'source-over'

      // 3. Refill that hole with scattered particles of the same pixels.
      const hx = hxRef.current
      const hy = hyRef.current
      const al = alRef.current
      const ph = phRef.current
      const col = colRef.current
      const n = countRef.current
      const time = t * 0.001

      for (let i = 0; i < n; i++) {
        const dx = hx[i] - m.x
        const dy = hy[i] - m.y
        const d2 = dx * dx + dy * dy
        if (d2 > R2) continue

        const d = Math.sqrt(d2) || 0.0001
        const f = 1 - d / R // 1 at the cursor, 0 at the edge

        // Scatter outward, strongest at the centre.
        const push = f * f * 24 * m.amt
        const jx = Math.sin(time * 2 + ph[i]) * 2.4 * f
        const jy = Math.cos(time * 1.7 + ph[i]) * 2.4 * f
        const px = hx[i] + (dx / d) * push + jx
        const py = hy[i] + (dy / d) * push + jy

        const a = al[i] * Math.min(1, f * 1.7) * m.amt
        if (a <= 0.02) continue

        const ci = i * 3
        ctx.fillStyle = `rgba(${col[ci]},${col[ci + 1]},${col[ci + 2]},${a})`
        ctx.fillRect(px, py, 2.4, 2.4)
      }
    }

    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top
      mouse.current.tx = mx
      mouse.current.ty = my
      // Avoid a long lerp from the off-screen start position on first entry.
      if (mouse.current.x < -1000) {
        mouse.current.x = mx
        mouse.current.y = my
      }
      mouse.current.target = 1
    }

    const onLeave = () => {
      mouse.current.target = 0
    }

    const ro = new ResizeObserver(() => build())
    ro.observe(wrap)

    if (img.complete) build()
    else img.addEventListener('load', build)

    wrap.addEventListener('pointermove', onMove)
    wrap.addEventListener('pointerleave', onLeave)
    rafRef.current = requestAnimationFrame(draw)

    return () => {
      alive = false
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
      wrap.removeEventListener('pointermove', onMove)
      wrap.removeEventListener('pointerleave', onLeave)
      img.removeEventListener('load', build)
    }
  }, [src])

  return (
    <div ref={wrapRef} className="hero-particle-wrap">
      <img ref={imgRef} src={src} alt={alt} className="hero-particle-img" />
      <canvas ref={canvasRef} className="hero-particle-canvas" aria-hidden="true" />
    </div>
  )
}

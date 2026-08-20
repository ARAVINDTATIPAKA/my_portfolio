'use client'

import { useEffect, useRef } from 'react'

interface ParticleImageProps {
  src: string
  alt: string
  accent: string
}

function hexToRgb(hex: string) {
  const h = hex.replace('#', '')
  const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h
  const n = parseInt(full, 16)
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

/** Radius of the cursor "flashlight" that reveals the real photo, in CSS px. */
const REVEAL_R = 135

export default function ParticleImage({ src, alt, accent }: ParticleImageProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const rafRef = useRef(0)
  const srcCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const tmpCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const ssRef = useRef(1)
  const containRef = useRef({ x: 0, y: 0, w: 0, h: 0 })

  // Packed particle data (parallel arrays for speed)
  const hxRef = useRef<Float32Array>(new Float32Array(0))
  const hyRef = useRef<Float32Array>(new Float32Array(0))
  const alRef = useRef<Float32Array>(new Float32Array(0))
  const phRef = useRef<Float32Array>(new Float32Array(0))
  const countRef = useRef(0)

  const mouse = useRef({ x: -9999, y: -9999, tx: -9999, ty: -9999, reveal: 0, target: 0 })
  const accentRef = useRef(hexToRgb(accent))

  useEffect(() => {
    accentRef.current = hexToRgb(accent)
  }, [accent])

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

      const stepCss = W < 400 ? 3.2 : 4
      const step = Math.max(1, Math.round(stepCss * ss))

      const max = Math.ceil(sc.width / step) * Math.ceil(sc.height / step)
      const hx = new Float32Array(max)
      const hy = new Float32Array(max)
      const al = new Float32Array(max)
      const ph = new Float32Array(max)
      const cx = containRef.current.x
      const cy = containRef.current.y
      let n = 0

      for (let y = 0; y < sc.height; y += step) {
        for (let x = 0; x < sc.width; x += step) {
          const i = (y * sc.width + x) * 4
          const a = data[i + 3]
          if (a < 45) continue // skip transparent background
          const lum = (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114) / 255
          hx[n] = cx + x / ss
          hy[n] = cy + y / ss
          // Floor keeps dark areas (hoodie) readable; luminance traces the detail.
          al[n] = (0.26 + lum * 0.74) * (a / 255)
          ph[n] = Math.random() * Math.PI * 2
          n++
        }
      }

      hxRef.current = hx
      hyRef.current = hy
      alRef.current = al
      phRef.current = ph
      countRef.current = n
      built = n > 0

      if (built) img.style.opacity = '0'
    }

    const draw = (t: number) => {
      if (!alive) return
      rafRef.current = requestAnimationFrame(draw)
      if (!built) return

      const rect = wrap.getBoundingClientRect()
      const W = rect.width
      const H = rect.height
      ctx.clearRect(0, 0, W, H)

      const m = mouse.current
      m.x += (m.tx - m.x) * 0.16
      m.y += (m.ty - m.y) * 0.16
      m.reveal += (m.target - m.reveal) * 0.09

      const hx = hxRef.current
      const hy = hyRef.current
      const al = alRef.current
      const ph = phRef.current
      const n = countRef.current
      const { r, g, b } = accentRef.current
      const time = t * 0.001
      const R = REVEAL_R
      const R2 = R * R
      const active = m.reveal > 0.01

      // ── Particle field ──
      // One fillStyle assignment + per-particle globalAlpha is much cheaper
      // than building an rgba() string for every particle each frame.
      ctx.fillStyle = `rgb(${r},${g},${b})`
      for (let i = 0; i < n; i++) {
        const px = hx[i] + Math.sin(time * 1.1 + ph[i]) * 0.9
        const py = hy[i] + Math.cos(time * 0.9 + ph[i]) * 0.9
        let a = al[i]

        if (active) {
          const dx = px - m.x
          const dy = py - m.y
          const d2 = dx * dx + dy * dy
          if (d2 < R2) {
            // Fade particles out toward the cursor so the photo reads cleanly.
            const f = Math.sqrt(d2) / R
            a *= 1 - (1 - f) * m.reveal
          }
        }
        if (a <= 0.012) continue
        ctx.globalAlpha = a
        ctx.fillRect(px, py, 1.7, 1.7)
      }
      ctx.globalAlpha = 1

      // ── Soft-edged photo reveal under the cursor ──
      if (active) {
        const sc = srcCanvasRef.current
        if (!sc) return
        const ss = ssRef.current
        const D = R * 2
        const tD = Math.round(D * ss)

        const tmp = tmpCanvasRef.current ?? document.createElement('canvas')
        tmpCanvasRef.current = tmp
        if (tmp.width !== tD) {
          tmp.width = tD
          tmp.height = tD
        }
        const tctx = tmp.getContext('2d')
        if (!tctx) return

        const c = containRef.current
        tctx.clearRect(0, 0, tD, tD)
        // Both canvases share the same `ss` scale, so this is a pure offset.
        tctx.drawImage(sc, -(m.x - R - c.x) * ss, -(m.y - R - c.y) * ss)

        const half = tD / 2
        const grad = tctx.createRadialGradient(half, half, 0, half, half, half)
        grad.addColorStop(0, `rgba(0,0,0,${m.reveal})`)
        grad.addColorStop(0.5, `rgba(0,0,0,${m.reveal * 0.85})`)
        grad.addColorStop(1, 'rgba(0,0,0,0)')
        tctx.globalCompositeOperation = 'destination-in'
        tctx.fillStyle = grad
        tctx.fillRect(0, 0, tD, tD)
        tctx.globalCompositeOperation = 'source-over'

        ctx.drawImage(tmp, m.x - R, m.y - R, D, D)
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

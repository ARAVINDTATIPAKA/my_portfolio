'use client'

import { useTheme } from '@/lib/ThemeContext'
import { Reveal } from '@/components/Reveal'
import { useEffect, useRef, useCallback } from 'react'

const RESUME_URL = 'https://docs.google.com/document/d/1xVu9uGzToSqJUluDJ5yW6uvI-GqAsGZE-rIxBlil5FI/export?format=pdf'

export default function Contact() {
  const { theme } = useTheme()
  const isFunky = theme === 'funky'
  const accent = isFunky ? '#E8FF6B' : '#0891B2'
  const accentDark = isFunky ? '#D4F000' : '#0E7490'
  const textHi = isFunky ? '#F5F5F4' : '#1C1917'
  const textMid = isFunky ? '#78716C' : '#57534E'
  const textLo = isFunky ? '#57534E' : '#A8A29E'
  const sectionBg = isFunky ? '#292524' : '#F5F5F4'
  const border = isFunky ? '#44403C' : '#E7E5E4'
  const ghostBorder = isFunky ? '#44403C' : '#D6D3D1'

  const footerRef = useRef<HTMLElement>(null)
  // Layer 2 — bright stroke, revealed only near cursor via CSS mask
  const glowLayerRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const isInsideRef = useRef(false)
  const opacityRef = useRef(0)

  const animate = useCallback(() => {
    rafRef.current = requestAnimationFrame(animate)

    // Lerp opacity for smooth enter/leave transition
    const targetOp = isInsideRef.current ? 1 : 0
    opacityRef.current += (targetOp - opacityRef.current) * 0.07

    const glow = glowLayerRef.current
    if (!glow) return

    const op = opacityRef.current
    if (op < 0.004) {
      glow.style.opacity = '0'
      return
    }

    // Cursor position relative to this element's bounding box
    const rect = glow.getBoundingClientRect()
    const mx = mouseRef.current.x - rect.left
    const my = mouseRef.current.y - rect.top

    // Update CSS variables — mask-image reads these to punch a spotlight
    glow.style.setProperty('--mx', `${mx}px`)
    glow.style.setProperty('--my', `${my}px`)
    glow.style.opacity = String(op)
  }, [])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (prefersReduced || !isDesktop) return

    const section = footerRef.current
    if (!section) return

    const onMove = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY } }
    const onEnter = () => { isInsideRef.current = true }
    const onLeave = () => { isInsideRef.current = false }

    section.addEventListener('mousemove', onMove, { passive: true })
    section.addEventListener('mouseenter', onEnter)
    section.addEventListener('mouseleave', onLeave)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      section.removeEventListener('mousemove', onMove)
      section.removeEventListener('mouseenter', onEnter)
      section.removeEventListener('mouseleave', onLeave)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [animate])

  // Ghost text styles — large, centered
  const ghostBase: React.CSSProperties = {
    display: 'block',
    fontFamily: 'var(--font-display)', fontWeight: 700,
    fontSize: 'clamp(48px,8vw,140px)', letterSpacing: '-0.05em',
    whiteSpace: 'nowrap', textAlign: 'center',
    pointerEvents: 'none', userSelect: 'none',
    color: 'transparent',
  }

  return (
    <>
      <div
        id="contact"
        className="contact-section"
        style={{
          position: 'relative',
          padding: '96px 48px',
          overflow: 'hidden',
          background: sectionBg,
          borderTop: `1px solid ${border}`,
          borderBottom: `1px solid ${border}`,
        }}
      >
        <div className="contact-grid" style={{ position: 'relative', zIndex: 3 }}>
          <div className="contact-content">
            <Reveal>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.15em', color: accent }}>
                <span style={{ display: 'block', width: 24, height: 1, background: accent, opacity: 0.5 }} />
                Contact
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.04em', fontSize: 'clamp(36px,5vw,64px)', color: textHi, marginBottom: 20 }}>
                Got a project?<br />
                Let&apos;s <span style={{ color: accent }}>make it.</span>
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.7, color: textMid, marginBottom: 40 }}>
                Open for freelance UI/UX design, design systems, and web design work. Currently available for new projects.
              </p>

              <div className="contact-buttons" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 40 }}>
                <a href="mailto:aravindtatipaka00@gmail.com" style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 999,
                  fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, letterSpacing: '-0.01em',
                  textDecoration: 'none', background: accent, color: isFunky ? '#1C1917' : '#fff', transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = accentDark; e.currentTarget.style.transform = 'scale(1.06)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = accent; e.currentTarget.style.transform = '' }}>
                  Send a message →
                </a>
                <a href={RESUME_URL} target="_blank" rel="noopener" download style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 999,
                  fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 14, letterSpacing: '-0.01em',
                  textDecoration: 'none', background: 'transparent', color: textMid,
                  border: `1px solid ${ghostBorder}`, transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.color = textHi; e.currentTarget.style.borderColor = isFunky ? '#78716C' : '#A8A29E'; e.currentTarget.style.transform = 'scale(1.04)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = textMid; e.currentTarget.style.borderColor = ghostBorder; e.currentTarget.style.transform = '' }}>
                  Download Resume
                </a>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, marginBottom: 0 }}>
                <a href="https://linkedin.com/in/aravindtatipaka" target="_blank" rel="noopener" style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em',
                  textDecoration: 'none', color: textLo, transition: 'color 0.15s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.color = accent }}
                  onMouseLeave={e => { e.currentTarget.style.color = textLo }}>
                  LinkedIn <span style={{ fontSize: 10 }}>↗</span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        ref={footerRef}
        style={{ borderTop: `1px solid ${isFunky ? '#44403C' : '#E7E5E4'}`, overflow: 'hidden' }}
      >
        {/* Ghost name — centered, cursor-glow stroke */}
        <div style={{ position: 'relative', padding: '48px 48px 0', textAlign: 'center', overflow: 'hidden' }}>
          {/* Layer 1 — static faint stroke */}
          <div style={{
            ...ghostBase,
            WebkitTextStroke: isFunky
              ? '1px rgba(232,255,107,0.07)'
              : '1px rgba(8,145,178,0.06)',
          }}>
            ARAVIND TATIPAKA
          </div>
          {/* Layer 2 — bright stroke, masked to cursor spotlight */}
          <div
            ref={glowLayerRef}
            style={{
              ...ghostBase,
              position: 'absolute', top: 48, left: 0, right: 0,
              WebkitTextStroke: `1.5px ${accent}`,
              maskImage: 'radial-gradient(circle 200px at var(--mx, -9999px) var(--my, -9999px), black 0%, transparent 65%)',
              WebkitMaskImage: 'radial-gradient(circle 200px at var(--mx, -9999px) var(--my, -9999px), black 0%, transparent 65%)',
              opacity: 0,
            }}
          >
            ARAVIND TATIPAKA
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 48px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', color: textHi }}>
            © 2026 · Built with Next.js + Tailwind · v2.0
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Work', 'About', 'Contact'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} style={{ fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.06em', textDecoration: 'none', color: textHi, transition: 'color 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.color = accent}
                onMouseLeave={e => e.currentTarget.style.color = textHi}>{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </>
  )
}

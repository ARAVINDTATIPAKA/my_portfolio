'use client'

import { useTheme } from '@/lib/ThemeContext'
import IDCard from './IDCard'
import { motion } from 'framer-motion'

export default function Hero() {
  const { theme } = useTheme()
  const isFunky = theme === 'funky'
  const accent    = isFunky ? '#E8FF6B' : '#0891B2'
  const accentDark = isFunky ? '#D4F000' : '#0E7490'
  const textHi    = isFunky ? '#F5F5F4' : '#1C1917'
  const textMid   = isFunky ? '#78716C' : '#57534E'
  const btnBorder = isFunky ? '#44403C' : '#D6D3D1'

  return (
    <section style={{
      position: 'relative', minHeight: '100vh', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
    }}>
      <IDCard />

      {/* Glow blob */}
      <div style={{
        position: 'absolute', top: '15%', left: '55%',
        width: 600, height: 600, borderRadius: '50%', pointerEvents: 'none',
        background: isFunky
          ? 'radial-gradient(circle,rgba(232,255,107,0.05) 0%,transparent 65%)'
          : 'radial-gradient(circle,rgba(8,145,178,0.06) 0%,transparent 65%)',
        animation: 'drift 8s ease-in-out infinite',
      }} />


      {/* 12-col grid */}
      <div style={{
        width: '100%', maxWidth: 1440, margin: '0 auto',
        padding: '0 48px 80px',
        display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', columnGap: 24,
      }}>
        {/* Content — cols 1–7 */}
        <motion.div
          style={{ gridColumn: '1 / 8' }}
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
        >
          {/* Eyebrow */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24,
            fontFamily: 'var(--font-mono)', fontSize: 11,
            letterSpacing: '0.14em', textTransform: 'uppercase', color: accent,
          }}>
            <span style={{ display: 'block', width: 32, height: 1, background: accent, opacity: 0.6 }} />
            Product Designer · Visakhapatnam
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: 'clamp(52px,8vw,112px)', lineHeight: 0.95,
            letterSpacing: '-0.04em', color: textHi, marginBottom: 40,
          }}>
            Design that<br />
            <span style={{ color: accent }}>hits</span>{' '}
            different<span style={{ fontWeight: 300, fontStyle: 'italic', color: isFunky ? '#57534E' : accent }}>.</span>
          </h1>

          {/* Bottom row */}
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.7,
            color: textMid, marginBottom: 32, maxWidth: 400,
          }}>
            I craft <strong style={{ color: textHi, fontWeight: 500 }}>interfaces that reduce friction</strong> and
            build trust — for SaaS products, design systems, and everything in between.
            Currently open for freelance work.
          </p>

          <div style={{ display: 'flex', gap: 12 }}>
            <a href="#work" style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '14px 28px', borderRadius: 999,
              fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14,
              letterSpacing: '-0.01em', textDecoration: 'none',
              background: accent, color: isFunky ? '#1C1917' : '#fff',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = accentDark; e.currentTarget.style.transform = 'scale(1.06)' }}
            onMouseLeave={e => { e.currentTarget.style.background = accent; e.currentTarget.style.transform = '' }}>
              See the work →
            </a>
            <a href="#contact" style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '14px 28px', borderRadius: 999,
              fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 14,
              letterSpacing: '-0.01em', textDecoration: 'none',
              background: 'transparent', color: textMid,
              border: `1px solid ${btnBorder}`, transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = textHi; e.currentTarget.style.borderColor = isFunky ? '#78716C' : '#A8A29E'; e.currentTarget.style.transform = 'scale(1.04)' }}
            onMouseLeave={e => { e.currentTarget.style.color = textMid; e.currentTarget.style.borderColor = btnBorder; e.currentTarget.style.transform = '' }}>
              Get in touch
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

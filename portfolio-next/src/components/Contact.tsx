'use client'

import { useTheme } from '@/lib/ThemeContext'
import { Reveal } from '@/components/Reveal'

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

  return (
    <>
      <div id="contact" className="contact-section" style={{ position: 'relative', padding: '96px 48px', overflow: 'hidden', background: sectionBg, borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}` }}>
        {/* Ghost text */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: 'clamp(80px,15vw,200px)', letterSpacing: '-0.06em',
          whiteSpace: 'nowrap', pointerEvents: 'none', userSelect: 'none',
          color: 'transparent',
          WebkitTextStroke: isFunky ? '1px rgba(232,255,107,0.05)' : '1px rgba(8,145,178,0.04)',
        }}>LET&apos;S TALK</div>

        <div style={{ width: '100%', maxWidth: 1440, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(12,1fr)', columnGap: 24 }}>
          <div style={{ position: 'relative', gridColumn: '1 / 8' }}>
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

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
                {[['LinkedIn', 'https://linkedin.com/in/aravindtatipaka'], ['Twitter/X', '#'], ['Behance', '#']].map(([name, href]) => (
                  <a key={name} href={href} target="_blank" rel="noopener" style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em',
                    textDecoration: 'none', color: textLo, transition: 'color 0.15s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.color = accent }}
                    onMouseLeave={e => { e.currentTarget.style.color = textLo }}>
                    {name} <span style={{ fontSize: 10 }}>↗</span>
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '32px 48px', borderTop: `1px solid ${isFunky ? '#292524' : '#F5F5F4'}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, letterSpacing: '-0.02em', color: textHi }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: accent }} />
          Aravind Tatipaka
        </div>
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
      </footer>
    </>
  )
}

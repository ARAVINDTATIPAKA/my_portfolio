'use client'

import { useState, useEffect } from 'react'
import { useTheme } from '@/lib/ThemeContext'

export default function Nav() {
  const { theme, setTheme } = useTheme()
  const isFunky = theme === 'funky'
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 48px', height: 64,
      backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
      background: isFunky ? 'rgba(28,25,23,0.88)' : 'rgba(251,250,254,0.92)',
      borderBottom: `1px solid ${scrolled
        ? isFunky ? 'rgba(68,64,60,0.6)' : '#E8E3F4'
        : 'transparent'}`,
    }}>
      {/* Logo */}
      <a href="#" style={{ display:'flex', alignItems:'center', gap:8, textDecoration:'none' }}>
        <span style={{
          width:8, height:8, borderRadius:'50%',
          background: isFunky ? '#E8FF6B' : '#5B5BD6',
          animation: 'pulseDot 2.5s ease-in-out infinite',
        }} />
        <span style={{
          fontFamily: 'var(--font-display)', fontWeight:700, fontSize:15,
          letterSpacing:'-0.03em',
          color: isFunky ? '#F5F5F4' : '#1A1830',
        }}>Aravind Tatipaka</span>
      </a>

      {/* Links */}
      <ul style={{ display:'flex', alignItems:'center', gap:32, listStyle:'none', margin:0, padding:0 }}
        className="hidden-mobile">
        {['Work','About','Writing','Contact'].map(l => (
          <li key={l}>
            <a href={`#${l.toLowerCase()}`} style={{
              fontFamily:'var(--font-body)', fontSize:13, textDecoration:'none',
              color: isFunky ? '#78716C' : '#565273',
              transition:'color 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = isFunky ? '#F5F5F4' : '#1A1830')}
            onMouseLeave={e => (e.currentTarget.style.color = isFunky ? '#78716C' : '#565273')}>
              {l}
            </a>
          </li>
        ))}
      </ul>

      {/* Right */}
      <div style={{ display:'flex', alignItems:'center', gap:12 }}>
        {/* Theme toggle */}
        <div
          role="group"
          aria-label="Colour theme"
          style={{
            position:'relative', display:'flex', alignItems:'center',
            padding:3, borderRadius:999,
            background: isFunky ? 'rgba(255,255,255,0.05)' : '#F5F2FC',
            border:`1px solid ${isFunky ? 'rgba(68,64,60,0.9)' : '#E8E3F4'}`,
          }}
        >
          {/* Sliding thumb */}
          <span
            aria-hidden="true"
            style={{
              position:'absolute', top:3, left: isFunky ? 31 : 3,
              width:28, height:28, borderRadius:'50%',
              background: isFunky ? '#E8FF6B' : '#5B5BD6',
              transition:'left 0.28s cubic-bezier(0.34,1.56,0.64,1)',
            }}
          />

          {/* Aurora (light) */}
          <button
            onClick={() => setTheme('serious')}
            aria-label="Aurora theme"
            aria-pressed={!isFunky}
            style={{
              position:'relative', zIndex:1,
              width:28, height:28, display:'flex',
              alignItems:'center', justifyContent:'center',
              border:'none', background:'transparent', cursor:'pointer', padding:0,
              color: isFunky ? '#78716C' : '#fff',
              transition:'color 0.2s',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="4.5" />
              <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4" />
            </svg>
          </button>

          {/* Dark */}
          <button
            onClick={() => setTheme('funky')}
            aria-label="Dark theme"
            aria-pressed={isFunky}
            style={{
              position:'relative', zIndex:1,
              width:28, height:28, display:'flex',
              alignItems:'center', justifyContent:'center',
              border:'none', background:'transparent', cursor:'pointer', padding:0,
              color: isFunky ? '#1C1917' : '#7B75A0',
              transition:'color 0.2s',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" />
            </svg>
          </button>
        </div>

        {/* CTA */}
        <a href="#contact" style={{
          display:'flex', alignItems:'center', gap:6,
          padding:'9px 20px', borderRadius:999,
          fontFamily:'var(--font-display)', fontWeight:700, fontSize:13,
          letterSpacing:'-0.01em', textDecoration:'none',
          background: isFunky ? '#E8FF6B' : '#5B5BD6',
          color: isFunky ? '#1C1917' : '#fff',
          transition:'all 0.2s',
        }}>Hire me →</a>
      </div>
    </nav>
  )
}

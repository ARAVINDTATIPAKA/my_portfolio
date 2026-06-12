'use client'

import { useState, useEffect } from 'react'
import { useTheme } from '@/lib/ThemeContext'

export default function Nav() {
  const { theme } = useTheme()
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
      background: isFunky ? 'rgba(28,25,23,0.88)' : 'rgba(250,250,249,0.92)',
      borderBottom: `1px solid ${scrolled
        ? isFunky ? 'rgba(68,64,60,0.6)' : '#E7E5E4'
        : 'transparent'}`,
    }}>
      {/* Logo */}
      <a href="#" style={{ display:'flex', alignItems:'center', gap:8, textDecoration:'none' }}>
        <span style={{
          width:8, height:8, borderRadius:'50%',
          background: isFunky ? '#E8FF6B' : '#0891B2',
          animation: 'pulseDot 2.5s ease-in-out infinite',
        }} />
        <span style={{
          fontFamily: 'var(--font-display)', fontWeight:700, fontSize:15,
          letterSpacing:'-0.03em',
          color: isFunky ? '#F5F5F4' : '#1C1917',
        }}>Aravind</span>
      </a>

      {/* Links */}
      <ul style={{ display:'flex', alignItems:'center', gap:32, listStyle:'none', margin:0, padding:0 }}
        className="hidden-mobile">
        {['Work','About','Process','Contact'].map(l => (
          <li key={l}>
            <a href={`#${l.toLowerCase()}`} style={{
              fontFamily:'var(--font-body)', fontSize:13, textDecoration:'none',
              color: isFunky ? '#78716C' : '#57534E',
              transition:'color 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = isFunky ? '#F5F5F4' : '#1C1917')}
            onMouseLeave={e => (e.currentTarget.style.color = isFunky ? '#78716C' : '#57534E')}>
              {l}
            </a>
          </li>
        ))}
      </ul>

      {/* Right */}
      <div style={{ display:'flex', alignItems:'center', gap:12 }}>
        {/* CTA */}
        <a href="#contact" style={{
          display:'flex', alignItems:'center', gap:6,
          padding:'9px 20px', borderRadius:999,
          fontFamily:'var(--font-display)', fontWeight:700, fontSize:13,
          letterSpacing:'-0.01em', textDecoration:'none',
          background: isFunky ? '#E8FF6B' : '#0891B2',
          color: isFunky ? '#1C1917' : '#fff',
          transition:'all 0.2s',
        }}>Hire me →</a>
      </div>
    </nav>
  )
}

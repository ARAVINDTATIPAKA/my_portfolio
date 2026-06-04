'use client'

import { useTheme } from '@/lib/ThemeContext'
import IDCard from './IDCard'

export default function Hero() {
  const { theme } = useTheme()
  const isFunky = theme === 'funky'
  const accent = isFunky ? '#E8FF6B' : '#0891B2'
  const accentDark = isFunky ? '#D4F000' : '#0E7490'
  const textHi = isFunky ? '#F5F5F4' : '#1C1917'
  const textMid = isFunky ? '#78716C' : '#57534E'
  const btnGhostBorder = isFunky ? '#44403C' : '#D6D3D1'

  return (
    <section style={{
      position:'relative', minHeight:'100vh',
      display:'flex', flexDirection:'column', justifyContent:'flex-end',
      padding:'0 48px 80px', overflow:'hidden',
    }}>
      <IDCard />

      {/* Glow blob */}
      <div style={{
        position:'absolute', top:'15%', left:'55%',
        width:600, height:600, borderRadius:'50%', pointerEvents:'none',
        background: isFunky
          ? 'radial-gradient(circle,rgba(232,255,107,0.05) 0%,transparent 65%)'
          : 'radial-gradient(circle,rgba(8,145,178,0.06) 0%,transparent 65%)',
        animation:'drift 8s ease-in-out infinite',
      }} />

      {/* Ghost bg number */}
      <div style={{
        position:'absolute', top:'50%', right:-20,
        transform:'translateY(-50%)',
        fontFamily:'var(--font-display)', fontWeight:700,
        fontSize:'clamp(200px,28vw,420px)', lineHeight:1,
        letterSpacing:'-0.06em', pointerEvents:'none', userSelect:'none',
        color:'transparent',
        WebkitTextStroke: `1px ${isFunky ? 'rgba(232,255,107,0.07)' : 'rgba(8,145,178,0.08)'}`,
      }}>07</div>

      {/* Eyebrow */}
      <div style={{
        display:'flex', alignItems:'center', gap:12, marginBottom:24,
        fontFamily:'var(--font-mono)', fontSize:11,
        letterSpacing:'0.14em', textTransform:'uppercase', color: accent,
      }}>
        <span style={{ display:'block', width:32, height:1, background:accent, opacity:0.6 }} />
        Product Designer · Visakhapatnam
      </div>

      {/* Headline */}
      <h1 style={{
        fontFamily:'var(--font-display)', fontWeight:700,
        fontSize:'clamp(52px,8vw,120px)', lineHeight:0.95,
        letterSpacing:'-0.04em', color: textHi,
        maxWidth:900, marginBottom:40,
      }}>
        Design that<br />
        <span style={{ color: accent }}>hits</span>{' '}
        different<span style={{ fontWeight:300, fontStyle:'italic', color: isFunky ? '#57534E' : accent }}>.</span>
      </h1>

      {/* Bottom row */}
      <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', gap:40, flexWrap:'wrap' }}>
        <p style={{
          maxWidth:380, fontFamily:'var(--font-body)', fontSize:15, lineHeight:1.7, color: textMid,
        }}>
          I craft <strong style={{ color:textHi, fontWeight:500 }}>interfaces that reduce friction</strong> and
          build trust — for SaaS products, design systems, and everything in between.
          Currently open for freelance work.
        </p>

        <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:16 }}>
          <a href="#work" style={{
            display:'flex', alignItems:'center', gap:8,
            padding:'14px 28px', borderRadius:999,
            fontFamily:'var(--font-display)', fontWeight:700, fontSize:14,
            letterSpacing:'-0.01em', textDecoration:'none',
            background: accent, color: isFunky ? '#1C1917' : '#fff',
            transition:'all 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = accentDark
            e.currentTarget.style.transform = 'scale(1.06) translateY(-2px)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = accent
            e.currentTarget.style.transform = ''
          }}>
            See the work →
          </a>
          <a href="#contact" style={{
            display:'flex', alignItems:'center', gap:8,
            padding:'14px 28px', borderRadius:999,
            fontFamily:'var(--font-display)', fontWeight:500, fontSize:14,
            letterSpacing:'-0.01em', textDecoration:'none',
            background:'transparent', color: textMid,
            border: `1px solid ${btnGhostBorder}`,
            transition:'all 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = textHi
            e.currentTarget.style.borderColor = isFunky ? '#78716C' : '#A8A29E'
            e.currentTarget.style.transform = 'scale(1.04)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = textMid
            e.currentTarget.style.borderColor = btnGhostBorder
            e.currentTarget.style.transform = ''
          }}>
            Get in touch
          </a>
        </div>
      </div>
    </section>
  )
}

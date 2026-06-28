'use client'

import { useTheme } from '@/lib/ThemeContext'
import { motion } from 'framer-motion'

const EASE_OUT   = [0.22, 1, 0.36, 1] as const
const EASE_SPRING= [0.34, 1.56, 0.64, 1] as const

export default function Hero() {
  const { theme } = useTheme()
  const isFunky = theme === 'funky'
  const accent     = isFunky ? '#E8FF6B' : '#0891B2'
  const accentDark = isFunky ? '#D4F000' : '#0E7490'
  const textHi     = isFunky ? '#F5F5F4' : '#1C1917'
  const textMid    = isFunky ? '#78716C' : '#57534E'
  const btnBorder  = isFunky ? '#44403C' : '#D6D3D1'

  const isProd = process.env.NODE_ENV === 'production'
  const basePath = isProd ? '/my_portfolio' : ''

  return (
    <section style={{
      position:'relative', minHeight:'85vh', overflow:'hidden',
      display:'flex', flexDirection:'column', justifyContent:'flex-end',
    }}>
      {/* Glow blob */}
      <div style={{
        position:'absolute', top:'15%', left:'55%',
        width:600, height:600, borderRadius:'50%', pointerEvents:'none',
        background: isFunky
          ? 'radial-gradient(circle,rgba(232,255,107,0.05) 0%,transparent 65%)'
          : 'radial-gradient(circle,rgba(8,145,178,0.06) 0%,transparent 65%)',
        animation:'drift 8s ease-in-out infinite',
      }} />

      <div className="hero-grid">
        {/* Left col — staggered children */}
        <motion.div
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
          }}
        >
          {/* Eyebrow — clips up */}
          <motion.div
            variants={{
              hidden: { opacity: 0, clipPath: 'inset(100% 0 0 0)' },
              visible: { opacity: 1, clipPath: 'inset(0% 0 0 0)',
                transition: { duration: 0.6, ease: [0.76,0,0.24,1] } },
            }}
            style={{
              display:'flex', alignItems:'center', gap:12, marginBottom:24,
              fontFamily:'var(--font-mono)', fontSize:11,
              letterSpacing:'0.14em', textTransform:'uppercase', color:accent,
            }}
          >
            <span style={{ display:'block', width:32, height:1, background:accent, opacity:0.6 }} />
            Product Designer · Visakhapatnam
          </motion.div>

          {/* Headline — blur in */}
          <motion.h1
            variants={{
              hidden: { opacity: 0, filter: 'blur(16px)', y: 24 },
              visible: { opacity: 1, filter: 'blur(0px)', y: 0,
                transition: { duration: 0.85, ease: EASE_OUT } },
            }}
            style={{
              fontFamily:'var(--font-display)', fontWeight:700,
              fontSize:'clamp(48px,6vw,96px)', lineHeight:0.95,
              letterSpacing:'-0.04em', color:textHi, marginBottom:40,
            }}
          >
            Design that<br />
            <span style={{ color:accent }}>hits</span>{' '}
            different<span style={{ fontWeight:300, fontStyle:'italic', color: isFunky ? '#57534E' : accent }}>.</span>
          </motion.h1>

          {/* Body — fade up */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 28 },
              visible: { opacity: 1, y: 0,
                transition: { duration: 0.7, ease: EASE_OUT } },
            }}
            style={{
              fontFamily:'var(--font-body)', fontSize:15, lineHeight:1.7,
              color:textMid, marginBottom:32, maxWidth:400,
            }}
          >
            I craft <strong style={{ color:textHi, fontWeight:500 }}>interfaces that reduce friction</strong> and
            build trust — for SaaS products, design systems, and everything in between.
            Currently open for work.
          </motion.p>

          {/* Buttons — rotate in */}
          <motion.div
            variants={{
              hidden: { opacity: 0, rotate: -4, y: 20 },
              visible: { opacity: 1, rotate: 0, y: 0,
                transition: { duration: 0.65, ease: EASE_SPRING } },
            }}
            style={{ display:'flex', gap:12 }}
          >
            <a href="#work" style={{
              display:'flex', alignItems:'center', gap:8,
              padding:'14px 28px', borderRadius:999,
              fontFamily:'var(--font-display)', fontWeight:700, fontSize:14,
              letterSpacing:'-0.01em', textDecoration:'none',
              background:accent, color: isFunky ? '#1C1917' : '#fff', transition:'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = accentDark; e.currentTarget.style.transform = 'scale(1.06)' }}
            onMouseLeave={e => { e.currentTarget.style.background = accent; e.currentTarget.style.transform = '' }}>
              See the work →
            </a>
            <a href="#contact" style={{
              display:'flex', alignItems:'center', gap:8,
              padding:'14px 28px', borderRadius:999,
              fontFamily:'var(--font-display)', fontWeight:500, fontSize:14,
              letterSpacing:'-0.01em', textDecoration:'none',
              background:'transparent', color:textMid,
              border:`1px solid ${btnBorder}`, transition:'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = textHi; e.currentTarget.style.borderColor = isFunky ? '#78716C' : '#A8A29E'; e.currentTarget.style.transform = 'scale(1.04)' }}
            onMouseLeave={e => { e.currentTarget.style.color = textMid; e.currentTarget.style.borderColor = btnBorder; e.currentTarget.style.transform = '' }}>
              Get in touch
            </a>
          </motion.div>
        </motion.div>

        {/* Hero image — scale + float */}
        <div className="hero-image-container">
          <motion.img
            src={`${basePath}/meditating_me2.png`}
            alt="Aravind Tatipaka"
            style={{ display:'block' }}
            initial={{ opacity: 0, scale: 0.88, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: [0, -16, 0] }}
            transition={{
              opacity: { duration: 0.9, delay: 0.2, ease: EASE_OUT },
              scale:   { duration: 0.9, delay: 0.2, ease: EASE_SPRING },
              y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 },
            }}
          />
        </div>
      </div>
    </section>
  )
}

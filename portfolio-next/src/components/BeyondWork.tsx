'use client'

import { motion, Variants } from 'framer-motion'
import { useTheme } from '@/lib/ThemeContext'
import { Reveal, skillsContainerVariants } from '@/components/Reveal'

const PHOTOS: { src: string | null; caption: string; rotate: number }[] = [
  { src: '/Hampta_Trek.webp', caption: 'Hampta Pass trek, Himachal Pradesh', rotate: -4 },
  { src: '/Hampta_pass.webp', caption: 'Wildflowers near Hampta Pass', rotate: 3 },
  { src: '/Sparrow-one-legged.webp', caption: 'House sparrow, somewhere in transit', rotate: -3 },
  { src: '/Squirrel.webp', caption: 'Indian palm squirrel, mid-snack', rotate: 4 },
]

const polaroidItemVariants: Variants = {
  hidden: { opacity: 0, y: -24, rotate: 0 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    rotate: custom,
    transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] as const },
  }),
}

export default function BeyondWork() {
  const { theme } = useTheme()
  const isFunky = theme === 'funky'
  const isProd = process.env.NODE_ENV === 'production'
  const basePath = isProd ? '/my_portfolio' : ''
  const accent = isFunky ? '#E8FF6B' : '#0891B2'
  const textHi = isFunky ? '#F5F5F4' : '#1C1917'
  const textMid = isFunky ? '#78716C' : '#57534E'
  const sectionBg = isFunky ? '#1C1917' : '#FAFAF9'
  const stringColor = isFunky ? '#57534E' : '#A8A29E'
  const clipColor = isFunky ? '#78716C' : '#92837A'
  const polaroidBg = '#F5F1E8'
  const polaroidCaption = '#4A453F'

  return (
    <section id="beyond-work" className="beyond-work-section" style={{ padding: '96px 0', background: sectionBg }}>
      <div className="beyond-work-inner">

        {/* Header — cols 1-12 */}
        <div className="beyond-work-header" style={{ gridColumn: '1 / 13', marginBottom: 64 }}>
          <Reveal variant="fade-left">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase' as const, letterSpacing: '0.15em', color: accent }}>
              <span style={{ display: 'block', width: 24, height: 1, background: accent, opacity: 0.5 }} />
              Beyond Work
            </div>
          </Reveal>
          <Reveal variant="clip-up" delay={0.08}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.04em', fontSize: 'clamp(32px,3.5vw,52px)', color: textHi, marginBottom: 16, maxWidth: 640 }}>
              Mostly out of office.
            </h2>
          </Reveal>
          <Reveal variant="blur-in" delay={0.16}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.8, color: textMid, maxWidth: 640, margin: 0 }}>
              Five years of travelling solo — mostly treks and routes that don't go to plan, which turns out to be decent training for product work. The last two years I've carried a camera along, mostly to slow down and actually look at what I'm walking through.
            </p>
          </Reveal>
        </div>

        {/* Clothesline — cols 1-12 */}
        <div className="beyond-work-line-wrap" style={{ gridColumn: '1 / 13', position: 'relative' }}>

          {/* The string itself */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: 28,
              left: 0,
              right: 0,
              height: 1,
              background: stringColor,
              opacity: 0.5,
            }}
          />
          {/* Subtle sag dips drawn as a wavy SVG line for realism */}
          <svg
            aria-hidden
            width="100%"
            height="40"
            viewBox="0 0 1000 40"
            preserveAspectRatio="none"
            style={{ position: 'absolute', top: 10, left: 0, right: 0, opacity: 0.5, pointerEvents: 'none' }}
          >
            <path
              d="M0,18 Q125,34 250,18 Q375,34 500,18 Q625,34 750,18 Q875,34 1000,18"
              fill="none"
              stroke={stringColor}
              strokeWidth="1"
            />
          </svg>

          <motion.div
            variants={skillsContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px 0px' }}
            className="beyond-work-grid"
            style={{ position: 'relative', paddingTop: 28 }}
          >
            {PHOTOS.map((p, i) => (
              <motion.div
                key={i}
                custom={p.rotate}
                variants={polaroidItemVariants}
                className="beyond-work-card"
                whileHover={{ rotate: 0, y: -6, scale: 1.03 }}
                style={{
                  position: 'relative',
                  transformOrigin: 'top center',
                  background: polaroidBg,
                  borderRadius: 4,
                  padding: '10px 10px 16px',
                  maxWidth: 160,
                  margin: '0 auto',
                  boxShadow: '0 10px 24px rgba(0,0,0,0.35), 0 2px 6px rgba(0,0,0,0.2)',
                  cursor: 'default',
                }}
              >
                {/* Clip pinning the photo to the line */}
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    top: -11,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 12,
                    height: 18,
                    borderRadius: 3,
                    background: clipColor,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                    zIndex: 2,
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                    width: 5,
                    height: 5,
                    borderRadius: '50%',
                    background: 'rgba(0,0,0,0.25)',
                  }} />
                </div>

                {/* Photo */}
                <div style={{
                  aspectRatio: '4 / 5',
                  overflow: 'hidden',
                  background: '#1C1917',
                }}>
                  {p.src ? (
                    <img
                      src={`${basePath}${p.src}`}
                      alt={p.caption}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  ) : (
                    <div style={{
                      width: '100%', height: '100%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'var(--font-mono)', fontSize: 9,
                      color: '#A8A29E', textAlign: 'center', padding: 6,
                    }}>
                      {p.caption}
                    </div>
                  )}
                </div>

                {/* Handwritten-feel caption */}
                <div style={{
                  marginTop: 8,
                  fontFamily: 'var(--font-mono)',
                  fontSize: 8.5,
                  lineHeight: 1.35,
                  color: polaroidCaption,
                  textAlign: 'center',
                  letterSpacing: '0.01em',
                }}>
                  {p.caption}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  )
}

'use client'

import { motion } from 'framer-motion'
import { useTheme } from '@/lib/ThemeContext'
import { Reveal, skillsContainerVariants, skillsItemVariants } from '@/components/Reveal'

const PHOTOS: { src: string | null; caption: string }[] = [
  { src: '/Hampta_Trek.webp', caption: 'Hampta Pass trek, Himachal Pradesh' },
  { src: '/Hampta_pass.webp', caption: 'Wildflowers near Hampta Pass' },
  { src: '/Sparrow-one-legged.webp', caption: 'House sparrow, somewhere in transit' },
  { src: '/Squirrel.webp', caption: 'Indian palm squirrel, mid-snack' },
]

export default function BeyondWork() {
  const { theme } = useTheme()
  const isFunky = theme === 'funky'
  const isProd = process.env.NODE_ENV === 'production'
  const basePath = isProd ? '/my_portfolio' : ''
  const accent = isFunky ? '#E8FF6B' : '#0891B2'
  const textHi = isFunky ? '#F5F5F4' : '#1C1917'
  const textMid = isFunky ? '#78716C' : '#57534E'
  const border = isFunky ? '#44403C' : '#E7E5E4'
  const sectionBg = isFunky ? '#1C1917' : '#FAFAF9'

  return (
    <section id="beyond-work" className="beyond-work-section" style={{ padding: '96px 0', background: sectionBg }}>
      <div className="beyond-work-inner">

        {/* Header — cols 1-12 */}
        <div className="beyond-work-header" style={{ gridColumn: '1 / 13', marginBottom: 40 }}>
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

        {/* Photo strip — cols 1-12 */}
        <motion.div
          variants={skillsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px 0px' }}
          className="beyond-work-grid"
          style={{ gridColumn: '1 / 13' }}
        >
          {PHOTOS.map((p, i) => (
            <motion.div
              key={i}
              variants={skillsItemVariants}
              className="beyond-work-card"
              style={{
                position: 'relative',
                aspectRatio: '4 / 5',
                borderRadius: 16,
                overflow: 'hidden',
                border: `1px solid ${border}`,
                background: isFunky ? '#292524' : '#E7E5E4',
              }}
            >
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
                  fontFamily: 'var(--font-mono)', fontSize: 11,
                  color: textMid, opacity: 0.5, textAlign: 'center', padding: 8,
                }}>
                  {p.caption}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

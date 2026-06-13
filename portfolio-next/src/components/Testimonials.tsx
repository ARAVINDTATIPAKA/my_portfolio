'use client'

import { useTheme } from '@/lib/ThemeContext'
import { Reveal } from '@/components/Reveal'

const TESTIMONIALS = [
  {
    name: 'Harsha Vardhan',
    title: 'Designing consistent & scalable experiences | Systems thinker',
    relationship: 'Managed Aravind directly',
    date: 'February 2023',
    initials: 'HV',
    quote:
      'Aravind has a unique and mature perspective on design that I find inspiring. He approaches challenges with a creative and innovative mindset that always impresses me. He\'s also a pleasure to work with — cool, calm, and collected under pressure, and always a team player.\n\nAravind\'s growth and development as a designer have been truly impressive, and I have no doubt that he will continue to excel in his career. He is a valuable asset to any team, and his unique perspective and innovative approach to design make him a standout talent. I wholeheartedly recommend Aravind to anyone looking for a talented and dedicated designer who is not only highly skilled but also a pleasure to work with.',
  },
]

export default function Testimonials() {
  const { theme } = useTheme()
  const isFunky = theme === 'funky'

  const accent        = isFunky ? '#E8FF6B' : '#0891B2'
  const accentMuted   = isFunky ? 'rgba(232,255,107,0.08)' : 'rgba(8,145,178,0.08)'
  const accentBorder  = isFunky ? 'rgba(232,255,107,0.18)' : 'rgba(8,145,178,0.18)'
  const accentHover   = isFunky ? 'rgba(232,255,107,0.14)' : 'rgba(8,145,178,0.14)'
  const textHi        = isFunky ? '#F5F5F4' : '#1C1917'
  const textMid       = isFunky ? '#A8A29E' : '#57534E'
  const textLo        = isFunky ? '#78716C' : '#A8A29E'
  const sectionBg     = isFunky ? '#1C1917' : '#FAFAF9'
  const cardBg        = isFunky ? '#292524' : '#FFFFFF'
  const cardBorder    = isFunky ? '#44403C' : '#E7E5E4'
  const divider       = isFunky ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)'

  return (
    <section
      id="testimonials"
      style={{
        padding: '96px 0',
        background: sectionBg,
        borderTop: `1px solid ${divider}`,
        borderBottom: `1px solid ${divider}`,
      }}
    >
      <div style={{ width: '100%', maxWidth: 1440, margin: '0 auto', padding: '0 48px' }}>

        {/* Header */}
        <Reveal>
          <div style={{ marginBottom: 56, maxWidth: 720 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16,
              fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase',
              letterSpacing: '0.15em', color: accent,
            }}>
              <span style={{ display: 'block', width: 24, height: 1, background: accent, opacity: 0.5 }} />
              Testimonials
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 700,
              lineHeight: 1.05, letterSpacing: '-0.04em',
              fontSize: 'clamp(32px,3.5vw,52px)', color: textHi, margin: 0,
            }}>
              What people<br />say about working with me.
            </h2>
          </div>
        </Reveal>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(540px, 100%), 1fr))', gap: 24 }}>
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={i} delay={0.15 * (i + 1)}>
              <div
                style={{
                  background: cardBg,
                  border: `1px solid ${cardBorder}`,
                  borderRadius: 20,
                  padding: '36px 40px',
                  display: 'flex', flexDirection: 'column', gap: 28,
                  transition: 'border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.borderColor = accentBorder
                  el.style.transform = 'translateY(-3px)'
                  el.style.boxShadow = isFunky
                    ? '0 20px 60px rgba(0,0,0,0.35)'
                    : '0 12px 40px rgba(0,0,0,0.08)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.borderColor = cardBorder
                  el.style.transform = ''
                  el.style.boxShadow = ''
                }}
              >
                {/* Quote text */}
                <div style={{ flex: 1 }}>
                  {t.quote.split('\n\n').map((para, j) => (
                    <p key={j} style={{
                      fontFamily: 'var(--font-body)', fontSize: 15,
                      lineHeight: 1.85, color: textMid,
                      margin: j > 0 ? '16px 0 0' : 0,
                    }}>
                      {para}
                    </p>
                  ))}
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: divider }} />

                {/* Author row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  {/* Avatar */}
                  <div style={{
                    width: 44, height: 44, borderRadius: '50%',
                    background: accentMuted,
                    border: `1px solid ${accentBorder}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-display)', fontWeight: 700,
                    fontSize: 13, color: accent, flexShrink: 0,
                  }}>
                    {t.initials}
                  </div>

                  {/* Name + details */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
                      marginBottom: 3,
                    }}>
                      <span style={{
                        fontFamily: 'var(--font-display)', fontWeight: 700,
                        fontSize: 14, letterSpacing: '-0.02em', color: textHi,
                      }}>
                        {t.name}
                      </span>
                      {/* 1st badge */}
                      <span style={{
                        padding: '2px 7px', borderRadius: 999,
                        background: accentMuted, border: `1px solid ${accentBorder}`,
                        fontFamily: 'var(--font-mono)', fontSize: 9,
                        letterSpacing: '0.06em', color: accent,
                        textTransform: 'uppercase',
                      }}>
                        1st
                      </span>
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-body)', fontSize: 12,
                      color: textLo, lineHeight: 1.4,
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>
                      {t.title}
                    </div>
                  </div>

                  {/* Date + relationship */}
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{
                      fontFamily: 'var(--font-mono)', fontSize: 10,
                      color: textLo, letterSpacing: '0.04em',
                    }}>
                      {t.date}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-mono)', fontSize: 9,
                      color: textLo, letterSpacing: '0.04em',
                      marginTop: 2, opacity: 0.7,
                    }}>
                      {t.relationship}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  )
}

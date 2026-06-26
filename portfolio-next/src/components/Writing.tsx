'use client'

import { motion } from 'framer-motion'
import { useTheme } from '@/lib/ThemeContext'
import { Reveal, containerVariants, itemVariants } from '@/components/Reveal'

const ARTICLES = [
  {
    title: 'Beyond Chatbots: Why We Built a Guided Conversational AI Instead of Another Chat Window',
    excerpt:
      'Our users didn\u2019t need answers. They needed guidance \u2014 and that one insight reshaped our entire AI product design.',
    tags: ['AI', 'Conversational AI', 'Product Design'],
    date: 'Jun 11, 2026',
    readTime: '4 min read',
    url: 'https://medium.com/@aravindtatipaka00/beyond-chatbots-why-we-built-a-guided-conversational-ai-instead-of-another-chat-window-9c27d1ffea7c',
  },
]

export default function Writing() {
  const { theme } = useTheme()
  const isFunky = theme === 'funky'

  const accent        = isFunky ? '#E8FF6B' : '#0891B2'
  const accentBorder  = isFunky ? 'rgba(232,255,107,0.18)' : 'rgba(8,145,178,0.18)'
  const textHi        = isFunky ? '#F5F5F4' : '#1C1917'
  const textMid       = isFunky ? '#A8A29E' : '#57534E'
  const textLo        = isFunky ? '#78716C' : '#A8A29E'
  const sectionBg     = isFunky ? '#1C1917' : '#FAFAF9'
  const cardBg        = isFunky ? '#292524' : '#FFFFFF'
  const cardBorder    = isFunky ? '#44403C' : '#E7E5E4'
  const tagBg         = isFunky ? '#1C1917' : '#F5F5F4'

  return (
    <section
      id="writing"
      className="writing-section"
      style={{ background: sectionBg }}
    >
      <div className="writing-inner">

        {/* Header */}
        <div className="writing-header" style={{ gridColumn: '1 / 13', marginBottom: 48 }}>
          <Reveal variant="fade-up">
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16,
              fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase',
              letterSpacing: '0.15em', color: accent,
            }}>
              <span style={{ display: 'block', width: 24, height: 1, background: accent, opacity: 0.5 }} />
              Writing
            </div>
          </Reveal>
          <Reveal variant="clip-up" delay={0.08}>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 700,
              lineHeight: 1.05, letterSpacing: '-0.04em',
              fontSize: 'clamp(32px,3.5vw,52px)', color: textHi, margin: 0,
            }}>
              Notes from the work.
            </h2>
          </Reveal>
        </div>

        {/* Articles */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px 0px' }}
          className="writing-grid"
          style={{ gridColumn: '1 / 13' }}
        >
          {ARTICLES.map((a, i) => (
            <motion.a
              key={i}
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              className="writing-card"
              style={{
                display: 'block', textDecoration: 'none',
                background: cardBg,
                border: `1px solid ${cardBorder}`,
                borderRadius: 20,
                transition: 'border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.borderColor = accentBorder
                el.style.transform = 'translateY(-3px)'
                el.style.boxShadow = isFunky
                  ? '0 20px 60px rgba(0,0,0,0.35)'
                  : '0 12px 40px rgba(0,0,0,0.08)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.borderColor = cardBorder
                el.style.transform = ''
                el.style.boxShadow = ''
              }}
            >
              <div style={{ padding: '28px 32px' }}>

                {/* Top row: source + meta */}
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  marginBottom: 16, flexWrap: 'wrap', gap: 8,
                }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    fontFamily: 'var(--font-mono)', fontSize: 10,
                    letterSpacing: '0.08em', textTransform: 'uppercase', color: textLo,
                  }}>
                    {/* Medium glyph */}
                    <svg width="16" height="16" viewBox="0 0 1043.63 592.71" style={{ flexShrink: 0 }}>
                      <path fill={textLo} d="M588.67,296.36c0,163.67-131.78,296.35-294.33,296.35S0,460,0,296.36,131.78,0,294.34,0,588.67,132.69,588.67,296.36Z"/>
                      <path fill={textLo} d="M911.56,296.36c0,154.06-65.89,279-147.17,279s-147.17-124.94-147.17-279,65.88-279,147.16-279S911.56,142.31,911.56,296.36Z"/>
                      <path fill={textLo} d="M1043.63,296.36c0,138.19-23.17,250.27-51.76,250.27s-51.75-112.08-51.75-250.27,23.17-250.26,51.75-250.26S1043.63,158.18,1043.63,296.36Z"/>
                    </svg>
                    Medium
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: 10,
                    color: textLo, letterSpacing: '0.04em',
                  }}>
                    {a.date} · {a.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily: 'var(--font-display)', fontWeight: 700,
                  fontSize: 22, lineHeight: 1.25, letterSpacing: '-0.02em',
                  color: textHi, marginBottom: 10, maxWidth: 760,
                }}>
                  {a.title}
                </h3>

                {/* Excerpt */}
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.7,
                  color: textMid, marginBottom: 20, maxWidth: 680,
                }}>
                  {a.excerpt}
                </p>

                {/* Bottom row: tags + read link */}
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  flexWrap: 'wrap', gap: 12,
                }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {a.tags.map(tag => (
                      <span key={tag} style={{
                        fontFamily: 'var(--font-mono)', fontSize: 10,
                        textTransform: 'uppercase', letterSpacing: '0.06em',
                        padding: '5px 11px', borderRadius: 999,
                        background: tagBg, border: `1px solid ${cardBorder}`,
                        color: textLo,
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 13,
                    color: accent, flexShrink: 0,
                  }}>
                    Read on Medium ↗
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

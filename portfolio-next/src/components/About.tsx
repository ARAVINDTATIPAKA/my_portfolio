'use client'

import { useTheme } from '@/lib/ThemeContext'
import { Reveal } from '@/components/Reveal'

const SKILLS = ['Figma', 'Design Systems', 'Framer', 'UX Research', 'Prototyping', 'HTML / CSS']
const PROCESS = [
  { num: '01', title: 'Start with people, not screens', desc: 'Every project begins with understanding the problem. Through user interviews, stakeholder discussions, data analysis, and competitive research, I uncover the insights that shape meaningful product decisions.' },
  { num: '02', title: 'Turn complexity into clarity', desc: 'I map user journeys, define information architecture, and simplify workflows. The goal is to make complex systems feel intuitive, predictable, and easy to navigate.' },
  { num: '03', title: 'Design with purpose', desc: 'From wireframes to polished interfaces, every element should serve a purpose. I focus on usability, accessibility, and consistency to create experiences that feel effortless.' },
  { num: '04', title: 'Collaborate, test, improve', desc: 'Great products are built through collaboration. I work closely with product teams and developers, leverage AI tools to prototype and iterate faster, and continuously refine solutions based on feedback and learning.' },
]

export default function About() {
  const { theme } = useTheme()
  const isFunky = theme === 'funky'
  const accent = isFunky ? '#E8FF6B' : '#0891B2'
  const textHi = isFunky ? '#F5F5F4' : '#1C1917'
  const textMid = isFunky ? '#78716C' : '#57534E'
  const border = isFunky ? '#44403C' : '#E7E5E4'
  const sectionBg = isFunky ? '#292524' : '#F5F5F4'
  const hoverBg = isFunky ? 'rgba(232,255,107,0.04)' : 'rgba(8,145,178,0.03)'

  const Label = ({ text }: { text: string }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase' as const, letterSpacing: '0.15em', color: accent }}>
      <span style={{ display: 'block', width: 24, height: 1, background: accent, opacity: 0.5 }} />
      {text}
    </div>
  )

  return (
    <section id="about" className="about-section" style={{ padding: '96px 0', background: sectionBg, borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}` }}>
      {/* 12-col grid */}
      <div className="about-grid">

        {/* Left — cols 1–6 */}
        <div className="about-left">
          <Reveal>
            <Label text="About" />
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.04em', fontSize: 'clamp(36px,4vw,56px)', color: textHi, marginBottom: 16 }}>
              Designer who<br />speaks <span style={{ color: accent }}>both</span> sides.
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.8, color: textMid, marginBottom: 20 }}>
              Based in Visakhapatnam, I help turn complex ideas into products people love to use. From <strong style={{ color: textHi, fontWeight: 500 }}>{' '}user research and UX strategy{' '}</strong> to scalable design systems and polished interfaces, I work across the product lifecycle to create experiences that deliver real impact.
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.8, color: textMid, marginBottom: 32 }}>
              I've built design systems from scratch, ran user research, and delivered polished flows for clients
              across India and internationally. I care about{' '}
              <strong style={{ color: textHi, fontWeight: 500 }}>craft, clarity, and the details that most people skip.</strong>
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {SKILLS.map(s => (
                <span key={s} style={{
                  padding: '8px 16px', borderRadius: 999,
                  border: `1px solid ${border}`,
                  fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 500,
                  color: textMid, cursor: 'default',
                  transition: 'all 0.2s cubic-bezier(0.34,1.56,0.64,1)',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.color = accent; e.currentTarget.style.background = isFunky ? 'rgba(232,255,107,0.08)' : 'rgba(8,145,178,0.06)'; e.currentTarget.style.transform = 'scale(1.06)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = border; e.currentTarget.style.color = textMid; e.currentTarget.style.background = ''; e.currentTarget.style.transform = '' }}>
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right — cols 7–12 */}
        <div id="process" className="about-process">
          <Reveal delay={0.15}>
            <Label text="Process" />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {PROCESS.map((step, i) => (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '48px 1fr', gap: 20,
                  padding: '28px 0',
                  borderTop: i === 0 ? `1px solid ${border}` : 'none',
                  borderBottom: `1px solid ${border}`,
                  transition: 'all 0.15s', borderRadius: 4,
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = hoverBg; e.currentTarget.style.padding = '28px 16px'; e.currentTarget.style.margin = '0 -16px' }}
                  onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.padding = '28px 0'; e.currentTarget.style.margin = '0' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: accent, paddingTop: 2 }}>{step.num}</span>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, letterSpacing: '-0.02em', color: textHi, marginBottom: 6 }}>{step.title}</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.65, color: textMid }}>{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  )
}

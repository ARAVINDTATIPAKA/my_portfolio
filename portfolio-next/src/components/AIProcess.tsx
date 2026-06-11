'use client'

import { useTheme } from '@/lib/ThemeContext'

interface AIStep {
  title: string
  desc: string
  tools: string[]
  isAbove: boolean
  isLast?: boolean
}

const STEPS: AIStep[] = [
  {
    title: 'Train AI on my design system',
    desc: 'Feed token specs, component docs, and brand rules so AI outputs stay on-system.',
    tools: ['Claude', 'Figma Make'],
    isAbove: true,
  },
  {
    title: 'Generate multiple iterations',
    desc: "Use AI to explore layout, copy, and interaction variants rapidly — 10 directions in the time it'd take to sketch 2.",
    tools: ['Claude', 'Figma', 'Stitch'],
    isAbove: false,
  },
  {
    title: 'Push and pull from Figma for iteration',
    desc: 'Design in Figma, push to AI for feedback, refine, repeat. Tighter loop between ideation and validation.',
    tools: ['Figma MCP', 'Claude'],
    isAbove: true,
  },
  {
    title: 'Build out with AI + developer',
    desc: 'Prototype in code with AI help — real interactions, real data, real states. Hand off cleaner specs with fewer gaps.',
    tools: ['Claude', 'Antigravity'],
    isAbove: false,
  },
  {
    title: 'Generate documentation',
    desc: 'AI drafts token specs, decision logs, and component docs from structured input — so I focus on decisions, not write-ups.',
    tools: ['Claude', 'ChatGPT'],
    isAbove: true,
  },
  {
    title: "What AI still can't replace",
    desc: "Taste. Empathy. Noticing what's unsaid in a user interview. Knowing which problem is worth solving. That's where I spend my energy.",
    tools: ['Still human'],
    isAbove: false,
    isLast: true,
  },
]

export default function AIProcess() {
  const { theme } = useTheme()
  const isFunky = theme === 'funky'

  const accent = isFunky ? '#E8FF6B' : '#0891B2'
  const textHi = isFunky ? '#F5F5F4' : '#1C1917'
  const textMid = isFunky ? '#78716C' : '#57534E'
  const textLo = isFunky ? '#57534E' : '#A8A29E'
  const border = isFunky ? '#44403C' : '#E7E5E4'
  const sectionBg = isFunky ? '#292524' : '#F5F5F4'

  return (
    <section
      id="ai-process"
      style={{
        background: sectionBg,
        borderTop: `1px solid ${border}`,
        borderBottom: `1px solid ${border}`,
        paddingBottom: 80,
        paddingTop: 96,
      }}
    >
      <div style={{ width: '100%', maxWidth: 1440, margin: '0 auto', padding: '0 48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.15em', color: accent }}>
          <span style={{ display: 'block', width: 24, height: 1, background: accent, opacity: 0.5 }} />
          AI × Design
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.04em', fontSize: 'clamp(36px,4vw,56px)', color: textHi, margin: '0 0 16px 0' }}>
          How I use AI in my process.
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: textMid, margin: '0 0 32px 0', maxWidth: 640, lineHeight: 1.7 }}>
          AI hasn't replaced my design thinking — it's removed the friction between thinking and doing. Here's exactly where it sits in my workflow.
        </p>
      </div>

      <div className="ai-process-track" style={{ width: '100%', maxWidth: 1440, margin: '24px auto 0', padding: '0 48px' }}>
        {/* Horizontal rule in the middle */}
        <div className="ai-process-line"></div>

        {STEPS.map((step, idx) => {
          const stepClass = step.isAbove ? 'ai-step ai-step-above' : 'ai-step ai-step-below'
          const dotClass = step.isLast ? 'ai-step-dot ai-step-dot-last' : 'ai-step-dot'

          return (
            <div key={idx} className={stepClass}>
              {step.isAbove ? (
                <>
                  <div className="ai-step-content">
                    <div className="ai-step-title">{step.title}</div>
                    <div className="ai-step-desc">{step.desc}</div>
                    <div className="ai-step-tools">
                      {step.tools.map((t, tIdx) => (
                        <span key={tIdx} style={{ display: 'inline-flex', alignItems: 'center' }}>
                          {tIdx > 0 && <span className="ai-tool-icon" style={{ marginLeft: 6, marginRight: 4 }}>✦</span>}
                          {tIdx === 0 && <span className="ai-tool-icon" style={{ marginRight: 4 }}>✦</span>}
                          <span className="ai-tool-name">{t}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className={dotClass}></div>
                </>
              ) : (
                <>
                  <div className={dotClass}></div>
                  <div className="ai-step-content">
                    <div className="ai-step-title">{step.title}</div>
                    <div className="ai-step-desc">{step.desc}</div>
                    <div className="ai-step-tools">
                      {step.tools.map((t, tIdx) => (
                        <span key={tIdx} style={{ display: 'inline-flex', alignItems: 'center' }}>
                          {tIdx > 0 && <span className="ai-tool-icon" style={{ marginLeft: 6, marginRight: 4 }}>✦</span>}
                          {tIdx === 0 && <span className="ai-tool-icon" style={{ marginRight: 4 }}>✦</span>}
                          <span className="ai-tool-name">{t}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

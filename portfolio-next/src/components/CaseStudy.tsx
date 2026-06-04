'use client'

import { useEffect } from 'react'
import { useTheme } from '@/lib/ThemeContext'

interface Props {
  caseKey: string | null
  onClose: () => void
}

const CASES: Record<string, {
  title: string
  subtitle: string
  eyebrow: string
  figmaUrl?: string
  meta: Record<string, string>
  tags: string[]
  sections: { label: string; heading: string; body: string; callout?: string }[]
}> = {
  sentinel: {
    title: 'SentinelOS',
    subtitle: 'AI-Assisted Surveillance Intelligence Platform for High-Security Facilities',
    eyebrow: 'Self-initiated · Enterprise UX · 2026',
    meta: { Role: 'Product Designer (Solo)', Timeline: '5 Weeks', Type: 'Concept / Self-initiated', Deliverable: 'High-fidelity product concept' },
    tags: ['Enterprise UX', 'AI-Assisted Workflows', 'Dashboard Design', 'Systems Thinking', 'Design System', 'UX Research'],
    sections: [
      { label: 'The Problem', heading: 'Sustained human attention is unreliable at scale.', body: 'Traditional surveillance systems are largely passive. Operators continuously scan dozens of feeds, incidents are manually traced, and alerts are reactive. The result: monitoring fatigue, missed incidents, and slow response times — not from lack of infrastructure, but from cognitive overload.', callout: '"How might we help surveillance teams in high-security environments improve situational awareness and reduce monitoring fatigue — without replacing human operators?"' },
      { label: 'The Strategic Shift', heading: 'Not automation. Augmentation.', body: 'Most AI surveillance conversations default to automation. But high-security environments rarely trust fully autonomous systems — human verification remains critical.', callout: 'Instead of designing "an AI that replaces surveillance personnel" — I designed "an assistive intelligence layer that helps operators make faster and more informed decisions."' },
      { label: 'Design Principles', heading: 'Four principles, every decision.', body: '01 · Assistive Intelligence — Support humans, never replace them.\n02 · Attention Prioritization — Surface only operationally important events.\n03 · Operational Clarity — Reduce monitoring complexity, not just visual density.\n04 · Transparent AI — Expose confidence levels and reasoning to improve trust.' },
      { label: 'Key Learnings', heading: 'What this reinforced.', body: 'AI works best when it augments human capability rather than replacing it. Enterprise systems should optimize attention, not just information density. Trust in AI increases significantly when uncertainty and reasoning are made visible. Good surveillance UX is less about monitoring everything — and more about helping users identify what actually matters.' },
    ],
  },
  keka: {
    title: 'Keka Sync Tool',
    subtitle: 'Enterprise Workforce Attendance Synchronization Platform — a Windows-based infrastructure layer between biometric hardware and attendance management systems.',
    eyebrow: 'Keka · Enterprise Product · 2026',
    figmaUrl: 'https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/cyvB5zpqHUe7MDlLDbzdcX/Keka?node-id=3-61175',
    meta: { Role: 'Product Designer', Timeline: '1 Week', Platform: 'Windows (Desktop App)', Constraint: 'Existing Keka component system' },
    tags: ['Enterprise UX', 'Operational Dashboard', 'Device Management', 'Sync Monitoring', 'Windows App', 'Workflow Design'],
    sections: [
      { label: 'The Context', heading: 'When scale breaks attendance infrastructure.', body: 'Large organizations operating across multiple offices rely on biometric devices to capture attendance. But at scale, the challenge shifts from capturing attendance to maintaining reliable synchronization. Logs arrive with delays. Records become inconsistent. Devices go offline.', callout: '"How might we help enterprise admins manage and synchronize biometric attendance systems reliably across multiple locations — while reducing operational complexity?"' },
      { label: 'Core Realization', heading: 'Not a hardware problem. An operational workflow problem.', body: 'Organizations had wildly different attendance setups based on office layout, employee volume, and hardware constraints. Single-device setups handle both clock-in and clock-out through timing logic. Dual-device setups reduce congestion but introduce mapping complexity, synchronization dependency, and device-role management challenges. The system needed to support both without increasing admin effort.' },
      { label: 'User Context', heading: 'Designing for operational and technical users.', body: 'The challenge was not: "How do we simplify everything?" It was: "How do we preserve operational depth while improving clarity, speed, and efficiency?" Technical users don\'t want oversimplified systems — they want systems that help them operate faster with better visibility and fewer interruptions.', callout: 'Good enterprise design is not always about introducing new UI patterns — sometimes it is about making smarter decisions within operational and technical constraints.' },
      { label: 'Critical UX Decision', heading: 'Reducing panic during delays.', body: 'Early concepts surfaced aggressive warnings during peak sync traffic — making temporary queue buildup look like system failure. The redesigned experience differentiated temporary delay vs. actual failure, showed queue progress visually, and communicated recovery status clearly. Unnecessary escalation was eliminated.' },
    ],
  },
  ib: {
    title: 'InterviewBuddy Design System',
    subtitle: 'Building a scalable design infrastructure for a multi-product interview preparation platform — one token architecture powering five portals.',
    eyebrow: 'InterviewBuddy · Design Infrastructure · 2024–Present',
    figmaUrl: 'https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/rVeu6gRcP4H0zgxAiSNRl5/Design-System?node-id=56-2182',
    meta: { Role: 'Lead Product Designer', Team: 'Product, Engineering, QA', Tools: 'Figma, Tokens Studio', Portals: '5 products' },
    tags: ['Design System', 'Design Tokens', 'Component Library', 'Multi-portal', 'Accessibility', 'Scalability', 'Figma'],
    sections: [
      { label: 'The Scale', heading: 'One system. Five portals.', body: 'InterviewBuddy has five distinct portals with different users, different workflows, and different expectations: B2C Candidate, B2B Candidate, B2C Expert, B2B Expert, and Admin. A single design system had to power all of them without collapsing into rigidity or fragmenting into chaos.' },
      { label: 'The Problem', heading: 'Consistency is an organizational problem, not a visual one.', body: 'InterviewBuddy had evolved across several years with multiple designers and developers contributing to the platform. The result: 14 button styles, 9 input variations, 18 font sizes in use, 40+ color shades, and zero shared token layer. This slowed down every new feature, every new screen, every new hire getting up to speed.' },
      { label: 'Foundations', heading: 'The layer everything else is built on.', body: 'Typography rationalized from 18 sizes down to a structured 8-step scale. Full semantic color layer — Success, Warning, Error, Info — all WCAG AA verified. 4px base spacing system. W3C DTCG design tokens: color.primary.500, spacing.md, radius.lg — allowing decisions to scale across products and making future theming trivial.', callout: 'Accessibility wasn\'t treated as a final QA step. It was embedded into component creation from day one — contrast ratios verified, focus states designed, keyboard navigation documented alongside every component spec.' },
      { label: 'Impact', heading: 'What changed after the system shipped.', body: '↓40% design time per new screen. ↓70% UI inconsistencies flagged in QA. 2× faster new screen creation. Developer clarifications dropped significantly. New designers onboarded faster. For the first time, a design decision made in one portal automatically applied to the others — because they were all reading from the same token layer.' },
    ],
  },
  ibai: {
    title: 'InterviewBuddy AI',
    subtitle: 'Designing a Conversational Commerce Experience for Career Growth — not a chatbot, but an AI-powered conversion engine that helps users discover the right career service and take action.',
    eyebrow: 'InterviewBuddy · AI Product · 2024–Present',
    figmaUrl: 'https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/2e2EaiNgDUcBwFFgqWjR6t/AI-Play?node-id=545-12530',
    meta: { Role: 'Product Designer', Platform: 'Mobile App (iOS + Android)', Type: '0→1 Product · MVP', Status: 'Under Development' },
    tags: ['Conversational AI', 'Mobile UX', '0→1 Product', 'RAG Architecture', 'Conversion Design', 'AI Flows'],
    sections: [
      { label: 'The Real Problem', heading: 'Users think in problems, not products.', body: 'InterviewBuddy offers AI Mock Interviews, Expert Mock Interviews, Resume Reviews, Skill Assessments, and Portfolio Reviews. But users arriving at the platform often couldn\'t answer one simple question: what should I do next? The result: decision paralysis, lower conversion, and users leaving without taking action — not because the services weren\'t right for them, but because they couldn\'t find the path.', callout: '"I have an interview next week." · "Can someone check my resume?" · "I don\'t know if I\'m ready." — Users think in problems. Traditional navigation assumes they know what they want.' },
      { label: 'Decision 01', heading: 'Why conversational AI instead of traditional navigation?', body: 'Traditional navigation assumes users know what they\'re looking for. Our users don\'t — they arrive with problems, not product names. The AI understands intent, asks follow-up questions, assesses readiness, and recommends the right service. Users no longer need to understand our product taxonomy — they just describe their situation.', callout: 'Outcome: Reduced cognitive load and simplified product discovery.' },
      { label: 'Decision 02', heading: 'We didn\'t go with a regular chat.', body: 'Open-ended chat creates uncertainty. Users don\'t know what to ask, ask incomplete questions, and get lost in long conversations. We designed a guided conversational framework — the AI asks one question at a time while presenting relevant options and always allowing custom responses.', callout: 'Design Principle: Freedom where it matters, structure where it helps.' },
      { label: 'Decision 03', heading: 'One question at a time — no chat history.', body: 'Users weren\'t coming for ongoing conversations. They came to accomplish a task. Persistent chat history introduces cognitive overload, irrelevant context, and longer recovery times. We designed the experience around current intent rather than persistent threads, while still leveraging previously collected profile information.', callout: 'Design Principle: Users care about progress, not conversation logs.' },
      { label: 'Decision 04', heading: 'Why add instant AI interviews inside the app?', body: 'A user is unlikely to install an app whose sole purpose is helping them decide what to purchase. We introduced Instant AI Interviews directly inside the app — giving users immediate value and creating a high-frequency utility. The app evolved from a sales channel to a career preparation companion.', callout: 'Strategic shift: Higher downloads, session frequency, retention, and upsell opportunities.' },
      { label: 'Reflection', heading: 'Beyond screen design.', body: 'This project challenged me to think beyond screen design and design an AI-driven decision-making system. Rather than creating another chatbot, I designed a conversational commerce experience that balances user goals, business objectives, and AI capabilities. The result was a scalable framework capable of guiding users from uncertainty to action — while creating meaningful opportunities for engagement, retention, and revenue growth.' },
    ],
  },
}

export default function CaseStudy({ caseKey, onClose }: Props) {
  const { theme } = useTheme()
  const isFunky = theme === 'funky'
  const data = caseKey ? CASES[caseKey] : null

  const accent     = isFunky ? '#E8FF6B' : '#0891B2'
  const textHi     = isFunky ? '#F5F5F4' : '#1C1917'
  const textMid    = isFunky ? '#78716C' : '#57534E'
  const textLo     = isFunky ? '#57534E' : '#A8A29E'
  const modalBg    = isFunky ? '#1C1917' : '#FFFFFF'
  const border     = isFunky ? '#292524' : '#F5F5F4'
  const sectionDiv = isFunky ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)'
  const calloutBg  = isFunky ? 'rgba(232,255,107,0.04)' : 'rgba(8,145,178,0.04)'
  const calloutBdr = isFunky ? 'rgba(232,255,107,0.2)'  : 'rgba(8,145,178,0.2)'
  const tagBg      = isFunky ? '#292524' : '#F5F5F4'
  const tagBorder  = isFunky ? '#44403C' : '#E7E5E4'
  const topbarBg   = isFunky ? 'rgba(28,25,23,0.96)' : 'rgba(255,255,255,0.96)'

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = caseKey ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [caseKey])

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, zIndex: 500,
        background: isFunky ? 'rgba(12,10,9,0.75)' : 'rgba(200,196,193,0.6)',
        backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
        opacity: caseKey ? 1 : 0,
        pointerEvents: caseKey ? 'all' : 'none',
        transition: 'opacity 0.35s ease',
      }} />

      {/* Modal — centred, 10 of 12 columns */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 501,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        pointerEvents: caseKey ? 'all' : 'none',
        padding: '24px',
      }}>
        {/* 12-col grid wrapper — modal takes col 2–11 (10 cols) */}
        <div style={{
          width: '100%',
          maxWidth: 1440,
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          columnGap: 24,
        }}>
          <div style={{
            gridColumn: '2 / 12', /* 10 of 12 columns */
            background: modalBg,
            borderRadius: 24,
            overflow: 'hidden',
            boxShadow: isFunky
              ? '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)'
              : '0 32px 80px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.06)',
            maxHeight: 'calc(100vh - 48px)',
            display: 'flex',
            flexDirection: 'column',
            transform: caseKey ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(20px)',
            opacity: caseKey ? 1 : 0,
            transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.35s ease',
          }}>
            {data && (
              <>
                {/* Sticky topbar */}
                <div style={{
                  flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '0 40px', height: 56,
                  background: topbarBg,
                  backdropFilter: 'blur(12px)',
                  borderBottom: `1px solid ${sectionDiv}`,
                  zIndex: 10,
                }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: textLo }}>
                    Case Study — {data.title}
                  </span>
                  <button onClick={onClose} style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '6px 16px', borderRadius: 999, border: `1px solid ${isFunky ? '#44403C' : '#E7E5E4'}`,
                    fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 600,
                    color: textMid, background: 'transparent', cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.color = accent }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = isFunky ? '#44403C' : '#E7E5E4'; e.currentTarget.style.color = textMid }}>
                    ✕ Close
                  </button>
                </div>

                {/* Scrollable body */}
                <div style={{ flex: 1, overflowY: 'auto' }}>
                  {/* Inner 12-col grid */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(12, 1fr)',
                    columnGap: 24,
                    padding: '0 40px',
                  }}>
                    {/* Hero — full 12 cols */}
                    <div style={{
                      gridColumn: '1 / 13',
                      padding: '48px 0 40px',
                      borderBottom: `1px solid ${sectionDiv}`,
                      position: 'relative', overflow: 'hidden',
                    }}>
                      {/* Ghost letters */}
                      <div style={{
                        position: 'absolute', top: -20, right: -10,
                        fontFamily: 'var(--font-display)', fontWeight: 700,
                        fontSize: 160, lineHeight: 1, letterSpacing: '-0.06em',
                        color: 'transparent', pointerEvents: 'none', userSelect: 'none',
                        WebkitTextStroke: `1px ${isFunky ? 'rgba(232,255,107,0.06)' : 'rgba(8,145,178,0.06)'}`,
                      }}>OS</div>

                      {/* Eyebrow + MVP badge */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.14em', color: accent }}>
                          <span style={{ display: 'block', width: 20, height: 1, background: accent, opacity: 0.6 }} />
                          {data.eyebrow}
                        </div>
                        {caseKey === 'ibai' && (
                          <span style={{
                            padding: '3px 10px', borderRadius: 999,
                            background: isFunky ? 'rgba(232,255,107,0.12)' : 'rgba(8,145,178,0.08)',
                            border: `1px solid ${isFunky ? 'rgba(232,255,107,0.35)' : 'rgba(8,145,178,0.25)'}`,
                            fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700,
                            textTransform: 'uppercase', letterSpacing: '0.1em', color: accent,
                          }}>MVP</span>
                        )}
                      </div>

                      {/* Title */}
                      <h2 style={{
                        fontFamily: 'var(--font-display)', fontWeight: 700,
                        fontSize: 40, lineHeight: 1.05, letterSpacing: '-0.04em',
                        color: textHi, marginBottom: 12,
                      }}>{data.title}</h2>

                      {/* Subtitle */}
                      <p style={{
                        fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.65,
                        color: textMid, maxWidth: 640, marginBottom: 28,
                      }}>{data.subtitle}</p>

                      {/* Meta row */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 28, marginBottom: 24 }}>
                        {Object.entries(data.meta).map(([k, v]) => (
                          <div key={k}>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', color: textLo, marginBottom: 3 }}>{k}</div>
                            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 13, letterSpacing: '-0.02em', color: textHi }}>{v}</div>
                          </div>
                        ))}
                      </div>

                      {/* Tags */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {data.tags.map(t => (
                          <span key={t} style={{
                            fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase',
                            letterSpacing: '0.07em', padding: '5px 12px', borderRadius: 999,
                            border: `1px solid ${tagBorder}`, background: tagBg, color: textLo,
                          }}>{t}</span>
                        ))}
                      </div>
                    </div>

                    {/* Figma embed — full 12 cols */}
                    {data.figmaUrl && (
                      <div style={{ gridColumn: '1 / 13', padding: '40px 0', borderBottom: `1px solid ${sectionDiv}` }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, fontFamily: 'var(--font-mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.14em', color: accent }}>
                          <span style={{ display: 'block', width: 16, height: 1, background: accent, opacity: 0.5 }} />
                          Live Design File
                        </div>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, letterSpacing: '-0.03em', color: textHi, marginBottom: 16 }}>Explore the designs.</h3>
                        <div style={{ borderRadius: 16, overflow: 'hidden', border: `1px solid ${sectionDiv}` }}>
                          <iframe src={data.figmaUrl} style={{ width: '100%', height: 500, border: 'none', display: 'block' }} allowFullScreen loading="lazy" />
                          <div style={{
                            padding: '12px 16px', borderTop: `1px solid ${sectionDiv}`,
                            background: isFunky ? '#292524' : '#FAFAF9',
                          }}>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: textLo }}>
                              ↖ Pan &amp; zoom inside the frame
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Content sections — using inner grid */}
                    {data.sections.map((s, i) => (
                      <div key={i} style={{
                        gridColumn: '1 / 13',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(12, 1fr)',
                        columnGap: 24,
                        padding: '40px 0',
                        borderBottom: `1px solid ${sectionDiv}`,
                      }}>
                        {/* Label — 2 cols */}
                        <div style={{ gridColumn: '1 / 3' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.14em', color: accent, paddingTop: 4 }}>
                            <span style={{ display: 'block', width: 12, height: 1, background: accent, opacity: 0.5 }} />
                            {s.label}
                          </div>
                        </div>

                        {/* Content — 10 cols */}
                        <div style={{ gridColumn: '3 / 13' }}>
                          <h3 style={{
                            fontFamily: 'var(--font-display)', fontWeight: 700,
                            fontSize: 22, letterSpacing: '-0.03em', lineHeight: 1.2,
                            color: textHi, marginBottom: 14,
                          }}>{s.heading}</h3>
                          <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.8, color: textMid, whiteSpace: 'pre-line' }}>
                            {s.body}
                          </p>
                          {s.callout && (
                            <div style={{
                              marginTop: 20, padding: '18px 20px',
                              background: calloutBg,
                              border: `1px solid ${calloutBdr}`,
                              borderLeft: `3px solid ${accent}`,
                              borderRadius: 8,
                              fontFamily: 'var(--font-body)', fontSize: 14,
                              fontStyle: 'italic', color: textHi, lineHeight: 1.7,
                            }}>{s.callout}</div>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* Bottom padding */}
                    <div style={{ gridColumn: '1 / 13', height: 60 }} />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

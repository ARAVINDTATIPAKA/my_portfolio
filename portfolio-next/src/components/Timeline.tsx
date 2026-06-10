'use client'

import { useRef, useState } from 'react'
import { useTheme } from '@/lib/ThemeContext'

interface TimelineEvent {
  date: string
  type?: 'work' | 'milestone' | 'now'
  company?: string
  role: string
  period?: string
  desc: string
  tag?: string
}

const EVENTS: TimelineEvent[] = [
  {
    date: 'Jan 2021',
    company: 'Keka HR',
    role: 'UX Intern',
    period: 'Jan – Aug 2021 · 8 mos',
    desc: "First exposure to enterprise product design. Learned Keka's design language, ran usability research, and contributed to different modules like Core HR & Keka OS.",
  },
  {
    date: 'Jun 2021',
    type: 'work',
    tag: 'Keka · Work',
    role: 'Leave Management UX',
    desc: 'Mapped and redesigned the leave application flow. Reduced form steps from 7 to 3 while maintaining compliance with policy configurations.',
  },
  {
    date: 'Aug 2021',
    type: 'milestone',
    tag: 'Milestone',
    role: 'Converted → Associate Product Designer',
    period: 'Full-time · Aug 2021 – Sep 2023',
    desc: 'Internship converted to a full-time APD role at Keka HR. Began owning modules end-to-end — from research to high-fidelity delivery.',
  },
  {
    date: 'Jan 2022',
    type: 'work',
    tag: 'Keka · Work',
    role: 'KekaOS GST & Invoices',
    desc: 'Redesigned invoice templates (Proforma and Tax) and introduced a real-time GST validation flow to ensure accurate client data entry.',
  },
  {
    date: 'Jul 2023',
    type: 'work',
    tag: 'Keka · Work',
    role: 'Sync Tool — Biometric Platform',
    desc: "Designed a Windows-based attendance synchronization platform for enterprise clients. Delivered in 1 week using Keka's existing component system.",
  },
  {
    date: 'Apr 2023',
    type: 'work',
    tag: 'Keka · Work',
    role: 'Attendance Capture & Penalization Policy',
    desc: 'Redesigned the onboarding flow based on observations from 100+ customer onboarding calls and live usability checks.',
  },
  {
    date: 'Oct 2023',
    type: 'milestone',
    tag: 'Milestone',
    role: 'Joined InterviewBuddy™',
    period: 'Product Designer · Full-time · Oct 2023 – Present',
    desc: 'Joined InterviewBuddy as a Product Designer. Working on the core interview platform, candidate experience. On-site, Visakhapatnam.',
  },
  {
    date: 'Dec 2023',
    type: 'work',
    tag: 'InterviewBuddy · Work',
    role: 'IB Design System',
    desc: 'Built the Foundation — One of my first initiatives at InterviewBuddy was designing the design system from scratch — establishing a cohesive token library, component set, and usage guidelines that gave the product team a shared visual language to build from.',
  },
  {
    date: 'Jun 2024',
    type: 'work',
    tag: 'InterviewBuddy · Work',
    role: 'Candidate Dashboard Redesign',
    desc: 'Revamped the candidate-facing dashboard — surfacing upcoming interviews, feedback, and preparation resources in a single, scannable view.',
  },
  {
    date: 'Jan 2025',
    type: 'work',
    tag: 'InterviewBuddy · Work',
    role: 'AI Interview Feedback UI',
    desc: 'Designed the AI-generated feedback experience — making automated interview analysis readable, trustworthy, and actionable for candidates and hiring teams.',
  },
  {
    date: 'Now',
    type: 'now',
    tag: 'Present',
    role: 'Product Designer @ InterviewBuddy™',
    desc: '2 yrs 8 mos and counting. Designing smarter hiring experiences at the intersection of AI and human judgment.',
  },
]

export default function Timeline() {
  const { theme } = useTheme()
  const isFunky = theme === 'funky'

  const accent = isFunky ? '#E8FF6B' : '#0891B2'
  const accentLightBg = isFunky ? 'rgba(232,255,107,0.15)' : 'rgba(8,145,178,0.15)'
  const accentLightBorder = isFunky ? 'rgba(232,255,107,0.4)' : 'rgba(8,145,178,0.4)'
  const textHi = isFunky ? '#F5F5F4' : '#1C1917'
  const textMid = isFunky ? '#aaaaaa' : '#57534E'
  const textLo = isFunky ? '#cccccc' : '#A8A29E'

  // Drag-to-scroll implementation
  const trackRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - trackRef.current.offsetLeft)
    setScrollLeft(trackRef.current.scrollLeft)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !trackRef.current) return
    e.preventDefault()
    const x = e.pageX - trackRef.current.offsetLeft
    const walk = (x - startX) * 1.5
    trackRef.current.scrollLeft = scrollLeft - walk
  }

  return (
    <section id="timeline" style={{ paddingLeft: 0, paddingRight: 0, overflow: 'hidden' }}>
      <div style={{ padding: '96px 48px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.15em', color: accent }}>
          <span style={{ display: 'block', width: 24, height: 1, background: accent, opacity: 0.5 }} />
          Career
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.04em', fontSize: 'clamp(36px,4vw,56px)', color: textHi, margin: '0 0 12px 0' }}>
          The journey so far.
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: textLo, margin: 0, fontStyle: 'italic' }}>
          A few of my favourite works throughout my career.
        </p>
      </div>

      {/* Horizontal scroll track */}
      <div
        className="tl-scroll-wrapper"
        id="tlWrapper"
        ref={trackRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{
          userSelect: isDragging ? 'none' : 'auto',
        }}
      >
        <div className="tl-track" id="tlTrack">
          {/* Continuous line through all nodes */}
          <div className="tl-line"></div>

          {EVENTS.map((event, idx) => {
            let nodeClass = 'tl-node'
            let dotClass = 'tl-dot'
            let cardClass = 'tl-card'

            if (event.type === 'work') {
              nodeClass = 'tl-node tl-work'
              dotClass = 'tl-dot tl-dot-work'
              cardClass = 'tl-card tl-card-work'
            } else if (event.type === 'milestone') {
              nodeClass = 'tl-node tl-milestone'
              dotClass = 'tl-dot tl-dot-milestone'
              cardClass = 'tl-card tl-card-milestone'
            } else if (event.type === 'now') {
              nodeClass = 'tl-node tl-now'
              dotClass = 'tl-dot tl-dot-now'
              cardClass = 'tl-card' // same as normal card in layout
            }

            const isMilestoneOrNow = event.type === 'milestone' || event.type === 'now'

            return (
              <div key={idx} className={nodeClass}>
                <div className={dotClass}></div>
                <div className="tl-date">{event.date}</div>
                <div className={cardClass}>
                  {event.tag && (
                    <div
                      className="tl-work-tag"
                      style={
                        isMilestoneOrNow
                          ? {
                              background: accentLightBg,
                              borderColor: accentLightBorder,
                              color: accent,
                            }
                          : undefined
                      }
                    >
                      {event.tag}
                    </div>
                  )}
                  {event.company && <div className="tl-card-company">{event.company}</div>}
                  <div className="tl-card-role">{event.role}</div>
                  {event.period && <div className="tl-card-period">{event.period}</div>}
                  <div className="tl-card-desc">{event.desc}</div>
                </div>
              </div>
            )
          })}

          {/* End spacer */}
          <div style={{ minWidth: 80, flexShrink: 0 }}></div>
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{ padding: '24px 48px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: textLo, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Drag to scroll
        </span>
        <span style={{ fontSize: 12, color: textLo }}>→</span>
      </div>
    </section>
  )
}

'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '@/lib/ThemeContext'
import { Reveal, timelineContainerVariants, timelineItemVariants } from '@/components/Reveal'

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
    desc: 'Mapped and redesigned the leave policy configuration flow. Reduced 7 steps to 3 improving efficiency and usability.',
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
    date: 'Aug 2024',
    type: 'work',
    tag: 'InterviewBuddy · Work',
    role: 'New Meeting UI',
    desc: 'Redesigned the entire interview surface — the live room for expert and AI conversations, and the one-way recording flow — into one calm, consistent design language across formats',
  },

  {
    date: 'May 2025',
    type: 'work',
    tag: 'InterviewBuddy · Work',
    role: 'MCSF — Modular Services Framework',
    desc: 'Designed a capability-based service architecture — turning five rigid offerings into composable building blocks that power custom programs for B2B orgs and bundles for candidates.',
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
  const textHi = isFunky ? '#F5F5F4' : '#1C1917'
  const textLo = isFunky ? '#aaaaaa' : '#57534E'

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
    <section id="timeline" className="timeline-section">
      <div className="timeline-inner">
        <div className="timeline-header">
          <Reveal variant="fade-up">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.15em', color: accent }}>
              <span style={{ display: 'block', width: 24, height: 1, background: accent, opacity: 0.5 }} />
              Career
            </div>
          </Reveal>
          <Reveal variant="clip-up" delay={0.08}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.04em', fontSize: 'clamp(36px,4vw,56px)', color: textHi, margin: '0 0 12px 0' }}>
              The journey so far.
            </h2>
          </Reveal>
          <Reveal variant="blur-in" delay={0.16}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: textLo, margin: 0, fontStyle: 'italic' }}>
              A few of my favourite works throughout my career.
            </p>
          </Reveal>
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
        <motion.div
          className="tl-track"
          id="tlTrack"
          variants={timelineContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px 0px' }}
        >
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

            return (
              <motion.div
                key={idx}
                className={nodeClass}
                variants={timelineItemVariants}
              >
                <div className={dotClass}></div>
                <div className="tl-date">{event.date}</div>
                <div className={cardClass}>
                  {event.company && <div className="tl-card-company">{event.company}</div>}
                  <div className="tl-card-role">{event.role}</div>
                  {event.period && <div className="tl-card-period">{event.period}</div>}
                  <div className="tl-card-desc">{event.desc}</div>
                </div>
              </motion.div>
            )
          })}

          {/* End spacer */}
          <div style={{ minWidth: 80, flexShrink: 0 }}></div>
        </motion.div>
      </div>
      </div>
    </section>
  )
}

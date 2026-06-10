'use client'

import { useState } from 'react'

const FILTERS = ['All', 'UI Design', 'Systems', 'UX']

const PROJECTS = [
  {
    id: 'keka',
    title: 'Keka Sync Tool — Attendance Synchronization Platform',
    desc: 'Windows-based enterprise tool for managing biometric devices and synchronizing attendance logs across distributed office environments.',
    tags: ['Enterprise UX', 'Windows App', 'Ops Dashboard', 'Keka'],
    year: '2026 · 1 week',
    bgStyle: 'linear-gradient(135deg,#0e1a14 0%,#162110 100%)',
    bgText: 'KS',
    caseKey: 'keka',
    mvp: false,
    nda: true,
  },
  {
    id: 'ib-ds',
    title: 'InterviewBuddy Design System',
    desc: 'A scalable design infrastructure for a multi-product interview platform. One component library powering 5 portals — B2C, B2B, Expert, and Admin.',
    tags: ['Design System', 'Multi-portal', 'Tokens', 'InterviewBuddy'],
    year: '2024 – Present',
    bgStyle: 'linear-gradient(135deg,#0a1520 0%,#0e1e30 100%)',
    bgText: 'IB',
    caseKey: 'ib',
    mvp: false,
    nda: true,
  },
  {
    id: 'ib-ai',
    title: 'InterviewBuddy AI — Mobile App',
    desc: 'A conversational AI career coach that understands user goals, reduces decision fatigue, and drives service discovery through natural dialogue.',
    tags: ['AI · Mobile', 'Conv. Commerce', '0→1', 'InterviewBuddy'],
    year: '2024 – Present',
    bgStyle: 'linear-gradient(135deg,#0a0e1a 0%,#0d1530 100%)',
    bgText: 'AI',
    caseKey: 'ibai',
    mvp: true,
    nda: true,
  },
  {
    id: 'sentinel',
    title: 'SentinelOS — Surveillance Intelligence Platform',
    desc: 'AI-assisted surveillance intelligence for high-security facilities. Reduces monitoring fatigue, surfaces priority events, keeps humans in the loop.',
    tags: ['Enterprise UX', 'AI-Assisted', 'Dashboard', 'Self-initiated'],
    year: '2026 · 5 weeks',
    bgStyle: 'linear-gradient(135deg,#1a2535 0%,#0f1a2e 100%)',
    bgText: 'SO',
    caseKey: 'sentinel',
    mvp: false,
    nda: false,
  },
]

interface WorkProps {
  onOpenCase: (key: string) => void
}

export default function Work({ onOpenCase }: WorkProps) {
  const [filter, setFilter] = useState('All')

  return (
    <section id="work" className="work-section">
      <div className="work-inner">

        {/* Header */}
        <div className="work-header">
          <div>
            <div className="work-label">
              <span className="work-label-line" />
              Selected work
            </div>
            <h2 className="work-title">The portfolio.</h2>
          </div>
          <div className="work-filters">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`work-filter-btn${filter === f ? ' work-filter-btn--active' : ''}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="work-grid">
          {PROJECTS.map(p => (
            <div
              key={p.id}
              onClick={() => onOpenCase(p.caseKey)}
              className="work-card"
            >
              {/* MVP badge */}
              {p.mvp && <span className="work-mvp-badge">MVP</span>}

              {/* NDA badge */}
              {p.nda && <span className="work-nda-badge">UNDER NDA 🔒</span>}

              {/* Image */}
              <div className="work-card-image" style={{ background: p.bgStyle }}>
                <div className="work-card-dots" />
                <div className="work-card-bg-text">{p.bgText}</div>
                <div className="work-card-overlay" />
              </div>

              {/* Body */}
              <div className="work-card-body">
                <div className="work-tags">
                  {p.tags.map(t => (
                    <span key={t} className="work-tag">{t}</span>
                  ))}
                </div>
                <h3 className="work-card-title">{p.title}</h3>
                <p className="work-card-desc">{p.desc}</p>
                <div className="work-card-footer">
                  <span className="work-card-year">{p.year}</span>
                  <span className="work-card-cta">Read case study ↗</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

'use client'

import { useState } from 'react'
import { useTheme } from '@/lib/ThemeContext'

interface Project {
  id: string
  title: string
  desc: string
  tags: string[]
  year: string
  mvp?: boolean
  bgStyle: string
  bgText: string
  onOpen: () => void
}

function ProjectCard({ title, desc, tags, year, mvp, bgStyle, bgText, onOpen }: Project) {
  const { theme } = useTheme()
  const isFunky = theme === 'funky'

  return (
    <div onClick={onOpen}
      className={`group relative rounded-[20px] overflow-hidden border cursor-pointer
        transition-all duration-[350ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]
        hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]
        ${isFunky
          ? 'bg-stone-800 border-stone-700 hover:border-lime-DEFAULT/20 hover:shadow-lime-DEFAULT/[0.08]'
          : 'bg-white border-stone-200 hover:border-cyan-600/25'
        }`}>

      {mvp && (
        <span className="absolute top-3.5 left-3.5 z-10 bg-lime-DEFAULT text-stone-900
          font-mono font-bold text-[9px] uppercase tracking-[0.12em] px-2.5 py-1 rounded-pill">
          MVP
        </span>
      )}

      {/* Mock image area */}
      <div className="aspect-video relative overflow-hidden" style={{ background: bgStyle }}>
        <div className="absolute inset-0"
          style={{ backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.04) 1px,transparent 1px)',
            backgroundSize: '24px 24px' }} />
        <div className="absolute bottom-[-10px] right-[-10px] font-display font-bold
          text-[120px] leading-none tracking-[-0.06em] text-white/7 select-none">
          {bgText}
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-stone-900/60
          group-hover:opacity-0 transition-opacity duration-150" />
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {tags.map(t => (
            <span key={t}
              className={`font-mono text-[10px] uppercase tracking-[0.07em] px-2.5 py-1 rounded-pill border
                ${isFunky
                  ? 'text-stone-500 border-stone-700 bg-stone-900'
                  : 'text-stone-400 border-stone-200 bg-stone-50'
                }`}>
              {t}
            </span>
          ))}
        </div>

        <h3 className={`font-display font-bold text-[18px] leading-[1.2] tracking-[-0.02em] mb-2
          ${isFunky ? 'text-stone-50' : 'text-stone-900'}`}>
          {title}
        </h3>
        <p className={`font-body text-[13px] leading-[1.6] mb-5
          ${isFunky ? 'text-stone-400' : 'text-stone-600'}`}>
          {desc}
        </p>

        <div className="flex items-center justify-between">
          <span className={`font-mono text-[11px] ${isFunky ? 'text-stone-600' : 'text-stone-400'}`}>
            {year}
          </span>
          <span className={`flex items-center gap-1.5 font-display font-semibold text-[13px]
            ${isFunky ? 'text-lime-DEFAULT' : 'text-cyan-600'}`}>
            Read case study ↗
          </span>
        </div>
      </div>
    </div>
  )
}

interface WorkProps {
  onOpenCase: (key: string) => void
}

const FILTERS = ['All', 'UI Design', 'Systems', 'UX']

const PROJECTS = [
  {
    id: 'sentinel',
    title: 'SentinelOS — Surveillance Intelligence Platform',
    desc: 'AI-assisted surveillance intelligence for high-security facilities. Reduces monitoring fatigue, surfaces priority events, keeps humans in the loop.',
    tags: ['Enterprise UX', 'AI-Assisted', 'Dashboard', 'Self-initiated'],
    year: '2026 · 5 weeks',
    bgStyle: 'linear-gradient(135deg,#1a2535 0%,#0f1a2e 100%)',
    bgText: 'SO',
    caseKey: 'sentinel',
  },
  {
    id: 'keka',
    title: 'Keka Sync Tool — Attendance Synchronization Platform',
    desc: 'Windows-based enterprise tool for managing biometric devices and synchronizing attendance logs across distributed office environments.',
    tags: ['Enterprise UX', 'Windows App', 'Ops Dashboard', 'Keka'],
    year: '2026 · 1 week',
    bgStyle: 'linear-gradient(135deg,#0e1a14 0%,#162110 100%)',
    bgText: 'KS',
    caseKey: 'keka',
  },
  {
    id: 'ib-ds',
    title: 'InterviewBuddy Design System',
    desc: 'A scalable design infrastructure for a multi-product interview platform. One component library powering 5 portals.',
    tags: ['Design System', 'Multi-portal', 'Tokens', 'InterviewBuddy'],
    year: '2024 – Present',
    bgStyle: 'linear-gradient(135deg,#0a1520 0%,#0e1e30 100%)',
    bgText: 'IB',
    caseKey: 'ib',
  },
  {
    id: 'ib-ai',
    title: 'InterviewBuddy AI — Mobile App',
    desc: 'A conversational AI career coach that understands user goals, reduces decision fatigue, and drives service discovery through natural dialogue.',
    tags: ['AI · Mobile', 'Conv. Commerce', '0→1', 'InterviewBuddy'],
    year: '2024 – Present',
    mvp: true,
    bgStyle: 'linear-gradient(135deg,#0a0e1a 0%,#0d1530 100%)',
    bgText: 'AI',
    caseKey: 'ibai',
  },
]

export default function Work({ onOpenCase }: WorkProps) {
  const { theme } = useTheme()
  const isFunky = theme === 'funky'
  const [filter, setFilter] = useState('All')

  return (
    <section id="work" className="py-24 px-12">
      {/* Header */}
      <div className="flex items-end justify-between mb-12">
        <div>
          <div className={`flex items-center gap-3 mb-3 font-mono text-[10px] uppercase tracking-[0.15em]
            ${isFunky ? 'text-lime-DEFAULT' : 'text-cyan-600'}`}>
            <span className={`block w-6 h-px opacity-50 ${isFunky ? 'bg-lime-DEFAULT' : 'bg-cyan-600'}`} />
            Selected work
          </div>
          <h2 className={`font-display font-bold tracking-[-0.04em] leading-[1.05]
            ${isFunky ? 'text-stone-50' : 'text-stone-900'}`}
            style={{ fontSize: 'clamp(36px,4vw,56px)' }}>
            The portfolio.
          </h2>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-pill border font-display text-[12px] font-medium
                tracking-tight transition-all duration-200 cursor-pointer
                ${filter === f
                  ? isFunky
                    ? 'bg-lime-DEFAULT/12 border-lime-DEFAULT/35 text-lime-DEFAULT'
                    : 'bg-cyan-600/8 border-cyan-600/3 text-cyan-600'
                  : isFunky
                    ? 'bg-transparent border-stone-700 text-stone-400 hover:border-stone-500 hover:text-stone-50'
                    : 'bg-transparent border-stone-200 text-stone-400 hover:border-stone-400 hover:text-stone-900'
                }`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {PROJECTS.map(p => (
          <ProjectCard key={p.id} {...p} id={p.id} onOpen={() => onOpenCase(p.caseKey)} />
        ))}
      </div>
    </section>
  )
}

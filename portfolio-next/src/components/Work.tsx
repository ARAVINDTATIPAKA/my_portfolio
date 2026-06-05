'use client'

import { useState } from 'react'
import { useTheme } from '@/lib/ThemeContext'

const FILTERS = ['All', 'UI Design', 'Systems', 'UX']

const PROJECTS = [
  { id:'sentinel', title:'SentinelOS — Surveillance Intelligence Platform', desc:'AI-assisted surveillance intelligence for high-security facilities. Reduces monitoring fatigue, surfaces priority events, keeps humans in the loop.', tags:['Enterprise UX','AI-Assisted','Dashboard','Self-initiated'], year:'2026 · 5 weeks', bgStyle:'linear-gradient(135deg,#1a2535 0%,#0f1a2e 100%)', bgText:'SO', caseKey:'sentinel', mvp:false },
  { id:'keka', title:'Keka Sync Tool — Attendance Synchronization Platform', desc:'Windows-based enterprise tool for managing biometric devices and synchronizing attendance logs across distributed office environments.', tags:['Enterprise UX','Windows App','Ops Dashboard','Keka'], year:'2026 · 1 week', bgStyle:'linear-gradient(135deg,#0e1a14 0%,#162110 100%)', bgText:'KS', caseKey:'keka', mvp:false },
  { id:'ib-ds', title:'InterviewBuddy Design System', desc:'A scalable design infrastructure for a multi-product interview platform. One component library powering 5 portals — B2C, B2B, Expert, and Admin.', tags:['Design System','Multi-portal','Tokens','InterviewBuddy'], year:'2024 – Present', bgStyle:'linear-gradient(135deg,#0a1520 0%,#0e1e30 100%)', bgText:'IB', caseKey:'ib', mvp:false },
  { id:'ib-ai', title:'InterviewBuddy AI — Mobile App', desc:'A conversational AI career coach that understands user goals, reduces decision fatigue, and drives service discovery through natural dialogue.', tags:['AI · Mobile','Conv. Commerce','0→1','InterviewBuddy'], year:'2024 – Present', bgStyle:'linear-gradient(135deg,#0a0e1a 0%,#0d1530 100%)', bgText:'AI', caseKey:'ibai', mvp:true },
]

interface WorkProps { onOpenCase: (key: string) => void }

export default function Work({ onOpenCase }: WorkProps) {
  const { theme } = useTheme()
  const isFunky = theme === 'funky'
  const [filter, setFilter] = useState('All')
  const accent = isFunky ? '#E8FF6B' : '#0891B2'
  const textHi = isFunky ? '#F5F5F4' : '#1C1917'
  const textMid = isFunky ? '#78716C' : '#57534E'
  const textLo = isFunky ? '#57534E' : '#A8A29E'
  const cardBg = isFunky ? '#292524' : '#FFFFFF'
  const cardBorder = isFunky ? '#44403C' : '#E7E5E4'
  const tagBg = isFunky ? '#1C1917' : '#F5F5F4'
  const tagBorder = isFunky ? '#44403C' : '#E7E5E4'

  return (
    <section id="work" style={{ padding:'96px 0' }}>
      <div style={{ width:'100%', maxWidth:1440, margin:'0 auto', padding:'0 48px', display:'grid', gridTemplateColumns:'repeat(12,1fr)', columnGap:24 }}>
      {/* Header — full 12 cols */}
      <div style={{ gridColumn:'1 / 13', display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:48 }}>
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:12, fontFamily:'var(--font-mono)', fontSize:10, textTransform:'uppercase', letterSpacing:'0.15em', color:accent }}>
            <span style={{ display:'block', width:24, height:1, background:accent, opacity:0.5 }} />
            Selected work
          </div>
          <h2 style={{ fontFamily:'var(--font-display)', fontWeight:700, letterSpacing:'-0.04em', lineHeight:1.05, fontSize:'clamp(36px,4vw,56px)', color:textHi, margin:0 }}>
            The portfolio.
          </h2>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding:'8px 16px', borderRadius:999, cursor:'pointer',
              fontFamily:'var(--font-display)', fontSize:12, fontWeight:500,
              letterSpacing:'-0.01em', border:`1px solid`,
              transition:'all 0.2s',
              background: filter===f ? isFunky ? 'rgba(232,255,107,0.12)' : 'rgba(8,145,178,0.08)' : 'transparent',
              borderColor: filter===f ? isFunky ? 'rgba(232,255,107,0.35)' : 'rgba(8,145,178,0.3)' : isFunky ? '#44403C' : '#E7E5E4',
              color: filter===f ? accent : isFunky ? '#78716C' : '#A8A29E',
            }}>{f}</button>
          ))}
        </div>
      </div>

      {/* Grid — full 12 cols, internally 3 equal cols */}
      <div style={{ gridColumn:'1 / 13', display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }}>
        {PROJECTS.map(p => (
          <div key={p.id} onClick={() => onOpenCase(p.caseKey)} style={{
            background:cardBg, borderRadius:20, border:`1px solid ${cardBorder}`,
            overflow:'hidden', cursor:'pointer', position:'relative',
            transition:'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget
            el.style.transform = 'translateY(-4px)'
            el.style.borderColor = isFunky ? 'rgba(232,255,107,0.2)' : 'rgba(8,145,178,0.25)'
            el.style.boxShadow = isFunky ? '0 20px 60px rgba(0,0,0,0.4)' : '0 12px 40px rgba(0,0,0,0.1)'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget
            el.style.transform = ''
            el.style.borderColor = cardBorder
            el.style.boxShadow = ''
          }}>
            {/* MVP badge */}
            {p.mvp && (
              <span style={{
                position:'absolute', top:14, left:14, zIndex:10,
                background:'#E8FF6B', color:'#1C1917',
                fontFamily:'var(--font-mono)', fontWeight:700, fontSize:9,
                textTransform:'uppercase', letterSpacing:'0.12em',
                padding:'4px 10px', borderRadius:999,
              }}>MVP</span>
            )}

            {/* Image area */}
            <div style={{ position:'relative', aspectRatio:'16/9', overflow:'hidden', background:p.bgStyle }}>
              <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle,rgba(255,255,255,0.04) 1px,transparent 1px)', backgroundSize:'24px 24px' }} />
              <div style={{ position:'absolute', bottom:-10, right:-10, fontFamily:'var(--font-display)', fontWeight:700, fontSize:120, lineHeight:1, letterSpacing:'-0.06em', color:'rgba(255,255,255,0.07)', userSelect:'none' }}>{p.bgText}</div>
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom,transparent 40%,rgba(28,25,23,0.6))', transition:'opacity 0.15s' }} />
            </div>

            {/* Body */}
            <div style={{ padding:24 }}>
              <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:12 }}>
                {p.tags.map(t => (
                  <span key={t} style={{ fontFamily:'var(--font-mono)', fontSize:10, textTransform:'uppercase', letterSpacing:'0.07em', padding:'4px 10px', borderRadius:999, border:`1px solid ${tagBorder}`, background:tagBg, color:textLo }}>{t}</span>
                ))}
              </div>
              <h3 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:18, lineHeight:1.2, letterSpacing:'-0.02em', color:textHi, marginBottom:8 }}>{p.title}</h3>
              <p style={{ fontFamily:'var(--font-body)', fontSize:13, lineHeight:1.6, color:textMid, marginBottom:20 }}>{p.desc}</p>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:textLo }}>{p.year}</span>
                <span style={{ display:'flex', alignItems:'center', gap:6, fontFamily:'var(--font-display)', fontWeight:600, fontSize:13, color:accent }}>Read case study ↗</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  )
}

'use client'

import { useTheme } from '@/lib/ThemeContext'

const SKILLS = ['UI Design','UX Research','Design Systems','Figma','Prototyping',
  'Web Design','Component Libraries','User Flows']

const STATS = [
  { num: '5+',  label: 'Years designing' },
  { num: '24+', label: 'Projects shipped' },
  { num: '12',  label: 'Happy clients' },
  { num: '3',   label: 'Design systems built' },
]

export function Marquee() {
  const { theme } = useTheme()
  const isFunky = theme === 'funky'

  return (
    <div style={{
      overflow:'hidden', padding:'16px 0',
      borderTop: `1px solid ${isFunky ? '#44403C' : '#E7E5E4'}`,
      borderBottom: `1px solid ${isFunky ? '#44403C' : '#E7E5E4'}`,
      background: isFunky ? '#292524' : '#F5F5F4',
    }}>
      <div style={{
        display:'flex', gap:48, whiteSpace:'nowrap',
        animation:'marquee 18s linear infinite',
      }}>
        {[...SKILLS, ...SKILLS].map((s, i) => (
          <span key={i} style={{
            display:'flex', alignItems:'center', gap:16, flexShrink:0,
            fontFamily:'var(--font-display)', fontSize:12, fontWeight:500,
            letterSpacing:'-0.01em',
            color: isFunky ? '#57534E' : '#A8A29E',
          }}>
            {s}
            <span style={{ color: isFunky ? '#E8FF6B' : '#0891B2', fontWeight:700 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export function Stats() {
  const { theme } = useTheme()
  const isFunky = theme === 'funky'

  return (
    <div style={{
      display:'grid', gridTemplateColumns:'repeat(4,1fr)',
      borderTop: `1px solid ${isFunky ? '#44403C' : '#E7E5E4'}`,
      borderBottom: `1px solid ${isFunky ? '#44403C' : '#E7E5E4'}`,
    }}>
      {STATS.map((s, i) => (
        <div key={i} style={{
          padding:'32px 48px',
          borderRight: i < 3 ? `1px solid ${isFunky ? '#44403C' : '#E7E5E4'}` : 'none',
          transition:'background 0.2s',
          cursor:'default',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = isFunky ? 'rgba(232,255,107,0.06)' : 'rgba(8,145,178,0.04)'
          const num = e.currentTarget.querySelector('.stat-num') as HTMLElement
          if (num) num.style.color = isFunky ? '#E8FF6B' : '#0891B2'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = ''
          const num = e.currentTarget.querySelector('.stat-num') as HTMLElement
          if (num) num.style.color = isFunky ? '#F5F5F4' : '#1C1917'
        }}>
          <div className="stat-num" style={{
            fontFamily:'var(--font-display)', fontWeight:700,
            fontSize:48, lineHeight:1, letterSpacing:'-0.04em',
            color: isFunky ? '#F5F5F4' : '#1C1917',
            marginBottom:6, transition:'color 0.2s',
          }}>{s.num}</div>
          <div style={{
            fontFamily:'var(--font-mono)', fontSize:11,
            textTransform:'uppercase', letterSpacing:'0.08em',
            color: isFunky ? '#57534E' : '#A8A29E',
          }}>{s.label}</div>
        </div>
      ))}
    </div>
  )
}

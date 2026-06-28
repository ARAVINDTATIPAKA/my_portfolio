'use client'

import { useReveal } from '@/hooks/useReveal'

import { useTheme } from '@/lib/ThemeContext'

const SKILLS = ['UI Design','UX Research','Design Systems','Figma','Prototyping',
  'Web Design','Component Libraries','User Flows']

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
        {Array(6).fill(SKILLS).flat().map((s, i) => (
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


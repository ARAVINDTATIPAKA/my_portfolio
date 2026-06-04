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
    <div className={`overflow-hidden py-4 border-y
      ${isFunky ? 'border-stone-800 bg-stone-800' : 'border-stone-200 bg-stone-100'}`}>
      <div className="flex gap-12 whitespace-nowrap animate-marquee">
        {[...SKILLS, ...SKILLS].map((s, i) => (
          <span key={i} className={`flex items-center gap-4 font-display text-[12px] font-medium
            tracking-tight flex-shrink-0
            ${isFunky ? 'text-stone-500' : 'text-stone-400'}`}>
            {s}
            <span className={isFunky ? 'text-lime-DEFAULT font-bold' : 'text-cyan-600 font-bold'}>✦</span>
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
    <div className={`grid grid-cols-2 md:grid-cols-4 border-y
      ${isFunky ? 'border-stone-700' : 'border-stone-200'}`}>
      {STATS.map((s, i) => (
        <div key={i}
          className={`group px-12 py-8 border-r transition-colors last:border-r-0
            ${isFunky
              ? 'border-stone-700 hover:bg-lime-DEFAULT/[0.06]'
              : 'border-stone-200 hover:bg-cyan-600/[0.04]'
            }
            ${i === 1 ? 'md:border-r' : ''}
            ${i === 2 ? 'border-t md:border-t-0 md:border-r' : ''}
            ${i === 3 ? 'border-t md:border-t-0 border-r-0' : ''}
          `}>
          <div className={`font-display font-bold text-[48px] leading-none tracking-[-0.04em] mb-1.5
            transition-colors
            ${isFunky
              ? 'text-stone-50 group-hover:text-lime-DEFAULT'
              : 'text-stone-900 group-hover:text-cyan-600'
            }`}>
            {s.num}
          </div>
          <div className={`font-mono text-[11px] uppercase tracking-[0.08em]
            ${isFunky ? 'text-stone-600' : 'text-stone-400'}`}>
            {s.label}
          </div>
        </div>
      ))}
    </div>
  )
}

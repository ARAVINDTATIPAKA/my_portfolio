'use client'

import { useRef, useEffect } from 'react'
import { useTheme } from '@/lib/ThemeContext'

const SKILLS = ['Figma','Design Systems','Framer','UX Research','Prototyping','HTML / CSS']

const PROCESS = [
  { num: '01', title: 'Understand first', desc: 'Every project starts with research — user interviews, heuristic audits, or competitive benchmarking. I don\'t open Figma until I know the problem.' },
  { num: '02', title: 'Structure the logic', desc: 'Information architecture, user flows, content hierarchy. The invisible work that makes the visible work feel obvious.' },
  { num: '03', title: 'Design with intent', desc: 'High-fidelity UI built on a proper token foundation. Every decision is defensible — nothing is decorative without reason.' },
  { num: '04', title: 'Ship and iterate', desc: 'I write handoff-ready specs and can prototype in code. I stay engaged through implementation — not just until delivery.' },
]

export default function About() {
  const { theme } = useTheme()
  const isFunky = theme === 'funky'
  const accent = isFunky ? 'text-lime-DEFAULT' : 'text-cyan-600'
  const accentBg = isFunky ? 'bg-lime-DEFAULT/[0.08] border-lime-DEFAULT/20 text-lime-DEFAULT' : 'bg-cyan-600/[0.06] border-cyan-600/15 text-cyan-600'

  return (
    <section id="about" className={`py-24 px-12 border-y
      ${isFunky ? 'bg-stone-800 border-stone-700' : 'bg-stone-100 border-stone-200'}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

        {/* Left */}
        <div>
          <div className={`flex items-center gap-3 mb-4 font-mono text-[10px] uppercase tracking-[0.15em] ${accent}`}>
            <span className={`block w-6 h-px opacity-50 ${isFunky ? 'bg-lime-DEFAULT' : 'bg-cyan-600'}`} />
            About
          </div>
          <h2 className={`font-display font-bold leading-[1.05] tracking-[-0.04em] mb-4
            ${isFunky ? 'text-stone-50' : 'text-stone-900'}`}
            style={{ fontSize: 'clamp(36px,4vw,56px)' }}>
            Designer who<br />
            speaks <span className={accent}>both</span> sides.
          </h2>
          <p className={`font-body text-[16px] leading-[1.8] mb-5
            ${isFunky ? 'text-stone-400' : 'text-stone-600'}`}>
            Based in Visakhapatnam, I work at the edge of{' '}
            <strong className={isFunky ? 'text-stone-50 font-medium' : 'text-stone-900 font-medium'}>
              design and code
            </strong>{' '}
            — fluent enough in both to move fast and ship things that actually work.
          </p>
          <p className={`font-body text-[16px] leading-[1.8] mb-8
            ${isFunky ? 'text-stone-400' : 'text-stone-600'}`}>
            I've built design systems from scratch, run user research, and delivered polished UI for
            clients across India and internationally. I care about{' '}
            <strong className={isFunky ? 'text-stone-50 font-medium' : 'text-stone-900 font-medium'}>
              craft, clarity, and the details that most people skip.
            </strong>
          </p>

          {/* Skills */}
          <div className="flex flex-wrap gap-2">
            {SKILLS.map(s => (
              <span key={s}
                className={`px-4 py-2 rounded-pill border font-display text-[12px] font-medium
                  tracking-tight cursor-default transition-all duration-200
                  ${isFunky
                    ? 'border-stone-700 text-stone-400 hover:border-lime-DEFAULT hover:text-lime-DEFAULT hover:bg-lime-DEFAULT/8 hover:scale-[1.06]'
                    : 'border-stone-300 text-stone-500 hover:border-cyan-600 hover:text-cyan-600 hover:bg-cyan-600/6 hover:scale-[1.06]'
                  }`}>
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Right — Process */}
        <div id="process">
          <div className={`flex items-center gap-3 mb-6 font-mono text-[10px] uppercase tracking-[0.15em] ${accent}`}>
            <span className={`block w-6 h-px opacity-50 ${isFunky ? 'bg-lime-DEFAULT' : 'bg-cyan-600'}`} />
            Process
          </div>
          <div className="flex flex-col">
            {PROCESS.map((step, i) => (
              <div key={i}
                className={`group grid grid-cols-[48px_1fr] gap-5 py-7 border-b
                  transition-all duration-150 rounded
                  ${i === 0 ? `border-t ${isFunky ? 'border-stone-700' : 'border-stone-200'}` : ''}
                  ${isFunky ? 'border-stone-700 hover:bg-lime-DEFAULT/[0.04]' : 'border-stone-200 hover:bg-cyan-600/[0.03]'}
                  hover:px-4 hover:-mx-4`}>
                <span className={`font-mono text-[11px] pt-0.5 ${accent}`}>{step.num}</span>
                <div>
                  <div className={`font-display font-bold text-[16px] tracking-[-0.02em] mb-1.5
                    ${isFunky ? 'text-stone-50' : 'text-stone-900'}`}>
                    {step.title}
                  </div>
                  <div className={`font-body text-[13px] leading-[1.65]
                    ${isFunky ? 'text-stone-400' : 'text-stone-600'}`}>
                    {step.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

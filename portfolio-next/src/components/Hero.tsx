'use client'

import { useTheme } from '@/lib/ThemeContext'
import IDCard from './IDCard'

export default function Hero() {
  const { theme } = useTheme()
  const isFunky = theme === 'funky'

  return (
    <section className="relative min-h-screen flex flex-col justify-end pb-20 px-12 overflow-hidden">

      <IDCard />

      {/* Glow blob */}
      <div className={`absolute top-[15%] left-[55%] w-[600px] h-[600px] pointer-events-none
        rounded-full animate-drift
        ${isFunky
          ? 'bg-[radial-gradient(circle,rgba(232,255,107,0.05)_0%,transparent_65%)]'
          : 'bg-[radial-gradient(circle,rgba(8,145,178,0.06)_0%,transparent_65%)]'
        }`} />

      {/* Ghost bg number */}
      <div className={`absolute top-1/2 right-[-20px] -translate-y-1/2 select-none pointer-events-none
        font-display font-bold leading-none
        ${isFunky ? 'text-lime-DEFAULT/[0.07]' : 'text-cyan-600/[0.08]'}`}
        style={{ fontSize: 'clamp(200px,28vw,420px)', WebkitTextStroke: '1px currentColor', color: 'transparent' }}>
        07
      </div>

      {/* Eyebrow */}
      <div className={`flex items-center gap-3 mb-6 font-mono text-[11px] uppercase tracking-[0.14em]
        ${isFunky ? 'text-lime-DEFAULT' : 'text-cyan-600'}`}>
        <span className={`block w-8 h-px opacity-60 ${isFunky ? 'bg-lime-DEFAULT' : 'bg-cyan-600'}`} />
        Product Designer · Visakhapatnam
      </div>

      {/* Headline */}
      <h1 className={`font-display font-bold leading-[0.95] tracking-[-0.04em] mb-10 max-w-[900px]
        ${isFunky ? 'text-stone-50' : 'text-stone-900'}`}
        style={{ fontSize: 'clamp(52px,8vw,120px)' }}>
        Design that<br />
        <span className={isFunky ? 'text-lime-DEFAULT' : 'text-cyan-600'}>hits</span>{' '}
        different<span className={`font-light italic ${isFunky ? 'text-stone-500' : 'text-cyan-600'}`}>.</span>
      </h1>

      {/* Bottom row */}
      <div className="flex items-end justify-between gap-10">
        <p className={`max-w-[380px] font-body text-[15px] leading-[1.7]
          ${isFunky ? 'text-stone-400' : 'text-stone-600'}`}>
          I craft <strong className={isFunky ? 'text-stone-50 font-medium' : 'text-stone-900 font-medium'}>
            interfaces that reduce friction
          </strong> and build trust — for SaaS products, design systems, and everything in between.
          Currently open for freelance work.
        </p>

        <div className="flex flex-col items-end gap-4">
          <a href="#work"
            className={`flex items-center gap-2 px-7 py-3.5 rounded-pill font-display font-bold
              text-[14px] tracking-tight no-underline transition-all duration-200
              ${isFunky
                ? 'bg-lime-DEFAULT text-stone-900 hover:bg-lime-dark hover:scale-[1.06] hover:-translate-y-0.5'
                : 'bg-cyan-600 text-white hover:bg-cyan-700 hover:scale-[1.06] hover:-translate-y-0.5'
              }`}>
            See the work →
          </a>
          <a href="#contact"
            className={`flex items-center gap-2 px-7 py-3.5 rounded-pill font-display font-medium
              text-[14px] tracking-tight no-underline border transition-all duration-200
              ${isFunky
                ? 'text-stone-400 border-stone-700 hover:border-stone-500 hover:text-stone-50 hover:scale-[1.04]'
                : 'text-stone-600 border-stone-300 hover:border-stone-400 hover:text-stone-900 hover:scale-[1.04]'
              }`}>
            Get in touch
          </a>
        </div>
      </div>
    </section>
  )
}

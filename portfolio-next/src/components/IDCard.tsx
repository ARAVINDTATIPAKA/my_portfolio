'use client'

import { useTheme } from '@/lib/ThemeContext'

export default function IDCard() {
  const { theme } = useTheme()
  const isFunky = theme === 'funky'

  return (
    <div className="absolute top-0 right-[520px] z-10 flex justify-center pointer-events-none
      hidden xl:flex">
      <div className="flex flex-col items-center animate-drop-bounce pointer-events-auto"
        style={{ transformOrigin: 'top center' }}>

        {/* Lanyard string */}
        <div className="relative w-0.5 flex-shrink-0"
          style={{ height: '400px',
            background: 'linear-gradient(to bottom, rgba(168,162,158,0.9), rgba(120,113,108,0.7))' }}>
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full
            bg-stone-600 border-2 border-stone-500" />
        </div>

        {/* Card */}
        <div className={`w-[240px] rounded-2xl overflow-hidden flex-shrink-0 animate-id-sway
          ${isFunky
            ? 'bg-stone-900 border border-lime-DEFAULT/12 shadow-[0_24px_64px_rgba(0,0,0,0.4)]'
            : 'bg-white border border-cyan-600/15 shadow-[0_24px_64px_rgba(0,0,0,0.1)]'
          }`}>

          {/* Top bar */}
          <div className={`flex items-center justify-between px-4 py-3
            ${isFunky ? 'bg-lime-DEFAULT' : 'bg-cyan-600'}`}>
            <span className={`font-display font-bold text-[10px] uppercase tracking-[0.1em]
              ${isFunky ? 'text-stone-900' : 'text-white'}`}>
              Product Designer
            </span>
            <span className={`font-mono text-[9px] tracking-wider
              ${isFunky ? 'text-stone-900/55' : 'text-white/60'}`}>
              #2021–NOW
            </span>
          </div>

          {/* Body */}
          <div className="px-4 py-4">
            {/* Avatar */}
            <div className={`w-12 h-12 rounded-full flex items-center justify-center
              font-display font-bold text-base mb-3
              ${isFunky
                ? 'bg-lime-DEFAULT/10 border border-lime-DEFAULT/25 text-lime-DEFAULT'
                : 'bg-cyan-600/8 border border-cyan-600/20 text-cyan-600'
              }`}>
              AT
            </div>
            <div className={`font-display font-bold text-[15px] tracking-tight mb-0.5
              ${isFunky ? 'text-stone-50' : 'text-stone-900'}`}>
              Aravind Tatipaka
            </div>
            <div className="font-body text-[10px] text-stone-500 mb-3.5">
              Product &amp; UI/UX Designer · 5+ yrs
            </div>

            <div className={`h-px mb-3 ${isFunky ? 'bg-white/5' : 'bg-black/6'}`} />

            {/* Details */}
            <div className="flex flex-col gap-1.5">
              {[
                ['Based',   'Visakhapatnam, India'],
                ['Current', 'InterviewBuddy™'],
                ['Prev',    'Keka HR'],
                ['Focus',   'SaaS · AI · Design Systems'],
              ].map(([key, val]) => (
                <div key={key} className="flex items-center gap-2">
                  <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-stone-600 w-[52px] flex-shrink-0">
                    {key}
                  </span>
                  <span className={`font-body text-[11px] ${isFunky ? 'text-stone-400' : 'text-stone-600'}`}>
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className={`flex items-center justify-between px-4 pb-3.5
            ${isFunky ? 'border-t border-white/4' : 'border-t border-black/5'}`}>
            {/* Barcode */}
            <div className="flex gap-0.5 items-end h-5">
              {[22,14,20,10,18,22,12,16,20,8,22,18,14,20,22].map((h, i) => (
                <span key={i} className={`block w-0.5 rounded-sm
                  ${isFunky ? 'bg-white/10' : 'bg-black/10'}`}
                  style={{ height: h }} />
              ))}
            </div>
            {/* Available */}
            <div className={`flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest
              ${isFunky ? 'text-lime-DEFAULT' : 'text-cyan-600'}`}>
              <span className={`w-1.5 h-1.5 rounded-full animate-dot-blink
                ${isFunky ? 'bg-lime-DEFAULT' : 'bg-cyan-600'}`} />
              Available
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

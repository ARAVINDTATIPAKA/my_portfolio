'use client'

import { useTheme } from '@/lib/ThemeContext'

const RESUME_URL = 'https://docs.google.com/document/d/1xVu9uGzToSqJUluDJ5yW6uvI-GqAsGZE-rIxBlil5FI/export?format=pdf'

export default function Contact() {
  const { theme } = useTheme()
  const isFunky = theme === 'funky'
  const accent = isFunky ? 'text-lime-DEFAULT' : 'text-cyan-600'

  return (
    <>
      {/* Contact */}
      <div id="contact"
        className={`relative py-24 px-12 overflow-hidden border-y
          ${isFunky ? 'bg-stone-800 border-stone-700' : 'bg-stone-100 border-stone-200'}`}>

        {/* Ghost text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          font-display font-bold whitespace-nowrap pointer-events-none select-none"
          style={{
            fontSize: 'clamp(80px,15vw,200px)',
            color: 'transparent',
            WebkitTextStroke: isFunky ? '1px rgba(232,255,107,0.05)' : '1px rgba(8,145,178,0.04)',
            letterSpacing: '-0.06em',
          }}>
          LET&apos;S TALK
        </div>

        <div className="relative max-w-[640px]">
          <div className={`flex items-center gap-3 mb-4 font-mono text-[10px] uppercase tracking-[0.15em] ${accent}`}>
            <span className={`block w-6 h-px opacity-50 ${isFunky ? 'bg-lime-DEFAULT' : 'bg-cyan-600'}`} />
            Contact
          </div>
          <h2 className={`font-display font-bold leading-[1.05] tracking-[-0.04em] mb-5
            ${isFunky ? 'text-stone-50' : 'text-stone-900'}`}
            style={{ fontSize: 'clamp(36px,5vw,64px)' }}>
            Got a project?<br />
            Let&apos;s <span className={accent}>make it.</span>
          </h2>
          <p className={`font-body text-[16px] leading-[1.7] mb-10
            ${isFunky ? 'text-stone-400' : 'text-stone-600'}`}>
            Open for freelance UI/UX design, design systems, and web design work.
            Currently available for new projects.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <a href="mailto:aravindtatipaka00@gmail.com"
              className={`flex items-center gap-2 px-7 py-3.5 rounded-pill font-display font-bold
                text-[14px] tracking-tight no-underline transition-all duration-200
                ${isFunky
                  ? 'bg-lime-DEFAULT text-stone-900 hover:bg-lime-dark hover:scale-[1.06]'
                  : 'bg-cyan-600 text-white hover:bg-cyan-700 hover:scale-[1.06]'
                }`}>
              Send a message →
            </a>
            <a href={RESUME_URL} target="_blank" rel="noopener" download
              className={`flex items-center gap-2 px-7 py-3.5 rounded-pill font-display font-medium
                text-[14px] tracking-tight no-underline border transition-all duration-200
                ${isFunky
                  ? 'text-stone-400 border-stone-700 hover:border-stone-500 hover:text-stone-50 hover:scale-[1.04]'
                  : 'text-stone-600 border-stone-300 hover:border-stone-400 hover:text-stone-900 hover:scale-[1.04]'
                }`}>
              Download Resume
            </a>
          </div>

          <div className="flex flex-wrap gap-6">
            {[['LinkedIn','https://linkedin.com/in/aravindtatipaka'],['Twitter/X','#'],['Behance','#']].map(([name, href]) => (
              <a key={name} href={href} target="_blank" rel="noopener"
                className={`flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.08em]
                  no-underline transition-colors duration-150
                  ${isFunky ? 'text-stone-600 hover:text-lime-DEFAULT' : 'text-stone-400 hover:text-cyan-600'}`}>
                {name} <span className="text-[10px]">↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={`flex items-center justify-between px-12 py-8 border-t
        ${isFunky ? 'border-stone-800' : 'border-stone-100'}`}>
        <div className={`flex items-center gap-2 font-display font-bold text-[13px] tracking-tight
          ${isFunky ? 'text-stone-50' : 'text-stone-900'}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${isFunky ? 'bg-lime-DEFAULT' : 'bg-cyan-600'}`} />
          Aravind
        </div>
        <div className={`font-mono text-[10px] tracking-[0.08em]
          ${isFunky ? 'text-stone-600' : 'text-stone-400'}`}>
          © 2026 · Built with Next.js + Tailwind · v2.0
        </div>
        <div className="hidden md:flex gap-6">
          {['Work','About','Contact'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              className={`font-mono text-[10px] uppercase tracking-[0.06em] no-underline
                transition-colors duration-150
                ${isFunky ? 'text-stone-600 hover:text-lime-DEFAULT' : 'text-stone-400 hover:text-cyan-600'}`}>
              {l}
            </a>
          ))}
        </div>
      </footer>
    </>
  )
}

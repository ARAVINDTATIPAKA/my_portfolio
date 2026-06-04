'use client'

import { useState, useEffect } from 'react'
import { useTheme } from '@/lib/ThemeContext'

export default function Nav() {
  const { theme, setTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isFunky = theme === 'funky'

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-12 h-16
      backdrop-blur-[16px] transition-all duration-300
      ${isFunky
        ? 'bg-stone-900/85 ' + (scrolled ? 'border-b border-stone-700/60' : 'border-b border-transparent')
        : 'bg-stone-50/92 ' + (scrolled ? 'border-b border-stone-200' : 'border-b border-transparent')
      }`}
    >
      {/* Logo */}
      <a href="#" className="flex items-center gap-2 no-underline">
        <span className="w-2 h-2 rounded-full bg-lime-DEFAULT animate-pulse-dot" />
        <span className={`font-display font-bold text-[15px] tracking-tight
          ${isFunky ? 'text-stone-50' : 'text-stone-900'}`}>
          Aravind
        </span>
      </a>

      {/* Nav links */}
      <ul className="hidden md:flex items-center gap-8 list-none">
        {['Work', 'About', 'Process', 'Contact'].map(link => (
          <li key={link}>
            <a href={`#${link.toLowerCase()}`}
              className={`font-body text-[13px] no-underline transition-colors duration-150
                ${isFunky ? 'text-stone-400 hover:text-stone-50' : 'text-stone-600 hover:text-stone-900'}`}>
              {link}
            </a>
          </li>
        ))}
      </ul>

      {/* Right: toggle + CTA */}
      <div className="flex items-center gap-3">
        {/* Theme toggle */}
        <div className={`hidden md:flex items-center rounded-pill p-1 border transition-colors
          ${isFunky ? 'bg-white/7 border-stone-700' : 'bg-black/4 border-stone-200'}`}>
          {(['funky', 'serious'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`px-3.5 py-1.5 rounded-pill border-none font-mono text-[10px] font-medium
                uppercase tracking-widest transition-all duration-300 cursor-pointer
                ${theme === t
                  ? isFunky
                    ? 'bg-lime-DEFAULT text-stone-900'
                    : 'bg-cyan-600 text-white'
                  : isFunky ? 'bg-transparent text-stone-500' : 'bg-transparent text-stone-400'
                }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* CTA */}
        <a href="#contact"
          className={`flex items-center gap-1.5 px-5 py-2.5 rounded-pill font-display font-bold
            text-[13px] tracking-tight no-underline transition-all duration-200
            ${isFunky
              ? 'bg-lime-DEFAULT text-stone-900 hover:bg-lime-dark hover:scale-105'
              : 'bg-cyan-600 text-white hover:bg-cyan-700 hover:scale-105'
            }`}
        >
          Hire me <span>→</span>
        </a>
      </div>
    </nav>
  )
}

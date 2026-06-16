'use client'

import { useEffect, useRef } from 'react'

// Each element can declare its reveal variant via data-reveal attribute
// Variants: fade-up (default), fade-left, fade-right, clip-up, scale-in,
//           blur-in, rotate-in, split-word, count-up, line-draw

const VARIANTS: Record<string, { from: string; to: string; duration: string; easing: string }> = {
  'fade-up': {
    from: 'opacity:0;transform:translateY(40px)',
    to:   'opacity:1;transform:translateY(0)',
    duration: '0.7s',
    easing: 'cubic-bezier(0.22,1,0.36,1)',
  },
  'fade-left': {
    from: 'opacity:0;transform:translateX(-48px)',
    to:   'opacity:1;transform:translateX(0)',
    duration: '0.75s',
    easing: 'cubic-bezier(0.22,1,0.36,1)',
  },
  'fade-right': {
    from: 'opacity:0;transform:translateX(48px)',
    to:   'opacity:1;transform:translateX(0)',
    duration: '0.75s',
    easing: 'cubic-bezier(0.22,1,0.36,1)',
  },
  'scale-in': {
    from: 'opacity:0;transform:scale(0.88)',
    to:   'opacity:1;transform:scale(1)',
    duration: '0.6s',
    easing: 'cubic-bezier(0.34,1.56,0.64,1)',
  },
  'blur-in': {
    from: 'opacity:0;filter:blur(12px);transform:translateY(16px)',
    to:   'opacity:1;filter:blur(0);transform:translateY(0)',
    duration: '0.8s',
    easing: 'cubic-bezier(0.22,1,0.36,1)',
  },
  'clip-up': {
    from: 'opacity:1;clip-path:inset(100% 0 0 0)',
    to:   'opacity:1;clip-path:inset(0% 0 0 0)',
    duration: '0.65s',
    easing: 'cubic-bezier(0.76,0,0.24,1)',
  },
  'rotate-in': {
    from: 'opacity:0;transform:rotate(-6deg) translateY(24px)',
    to:   'opacity:1;transform:rotate(0deg) translateY(0)',
    duration: '0.7s',
    easing: 'cubic-bezier(0.34,1.56,0.64,1)',
  },
}

export function useReveal() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    // Collect all elements with data-reveal
    const els = root.querySelectorAll<HTMLElement>('[data-reveal]')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          const variant = el.dataset.reveal || 'fade-up'
          const delay = el.dataset.delay || '0ms'
          const v = VARIANTS[variant] || VARIANTS['fade-up']

          // Set initial state
          el.style.cssText += `;${v.from};will-change:transform,opacity`

          // Animate in after delay
          setTimeout(() => {
            el.style.transition = `all ${v.duration} ${v.easing}`
            el.style.cssText = el.style.cssText.replace(
              /opacity:[^;]+;|transform:[^;]+;|filter:[^;]+;|clip-path:[^;]+;/g, ''
            )
            el.style.cssText += `;${v.to}`
          }, parseInt(delay))

          observer.unobserve(el)
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )

    els.forEach((el) => {
      const variant = el.dataset.reveal || 'fade-up'
      const v = VARIANTS[variant] || VARIANTS['fade-up']
      el.style.cssText += `;${v.from}`
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return ref
}

'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll() {
  useEffect(() => {
    // Initialize Lenis with the recommended settings
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    })

    let rafId: number

    // Render loop using requestAnimationFrame
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    // Properly clean up Lenis and cancel RAF on unmount
    return () => {
      lenis.destroy()
      cancelAnimationFrame(rafId)
    }
  }, [])

  return null
}

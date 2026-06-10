'use client'

import { useState } from 'react'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import { Marquee } from '@/components/MarqueeStats'
import Work from '@/components/Work'
import About from '@/components/About'
import Timeline from '@/components/Timeline'
import AIProcess from '@/components/AIProcess'
import Contact from '@/components/Contact'
import CaseStudy from '@/components/CaseStudy'

export default function Home() {
  const [openCase, setOpenCase] = useState<string | null>(null)

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Work onOpenCase={setOpenCase} />
        <About />
        <Timeline />
        <AIProcess />
        <Contact />
      </main>
      <CaseStudy caseKey={openCase} onClose={() => setOpenCase(null)} />
    </>
  )
}

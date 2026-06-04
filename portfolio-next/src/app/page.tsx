'use client'

import { useState } from 'react'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import { Marquee, Stats } from '@/components/MarqueeStats'
import Work from '@/components/Work'
import About from '@/components/About'
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
        <Stats />
        <Work onOpenCase={setOpenCase} />
        <About />
        <Contact />
      </main>
      <CaseStudy caseKey={openCase} onClose={() => setOpenCase(null)} />
    </>
  )
}

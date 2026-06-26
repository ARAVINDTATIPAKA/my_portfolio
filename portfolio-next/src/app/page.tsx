'use client'

import { useState } from 'react'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import { Marquee } from '@/components/MarqueeStats'
import Work from '@/components/Work'
import About from '@/components/About'
import Timeline from '@/components/Timeline'
// import AIProcess from '@/components/AIProcess'
import Contact from '@/components/Contact'
import CaseStudy from '@/components/CaseStudy'
import Testimonials from '@/components/Testimonials'
import Writing from '@/components/Writing'

export default function Home() {
  const [openCase, setOpenCase] = useState<string | null>(null)

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Work onOpenCase={setOpenCase} />
        <Timeline />
        {/* <AIProcess /> */}
        <Testimonials />
        <Writing />
        <Contact />
      </main>
      <CaseStudy caseKey={openCase} onClose={() => setOpenCase(null)} />
    </>
  )
}

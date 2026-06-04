'use client'

import { useEffect } from 'react'
import { useTheme } from '@/lib/ThemeContext'

interface Props {
  caseKey: string | null
  onClose: () => void
}

const CASES: Record<string, { title: string; subtitle: string; figmaUrl?: string; meta: Record<string,string>; tags: string[]; sections: { label: string; heading: string; body: string }[] }> = {
  sentinel: {
    title: 'SentinelOS',
    subtitle: 'AI-Assisted Surveillance Intelligence Platform for High-Security Facilities',
    figmaUrl: undefined,
    meta: { Role: 'Product Designer (Solo)', Timeline: '5 Weeks', Type: 'Concept / Self-initiated', Deliverable: 'High-fidelity product concept' },
    tags: ['Enterprise UX','AI-Assisted Workflows','Dashboard Design','Systems Thinking','Design System','UX Research'],
    sections: [
      { label: 'The Problem', heading: 'Sustained human attention is unreliable at scale.', body: 'Traditional surveillance systems are largely passive. Operators continuously scan dozens of feeds, incidents are manually traced, and alerts are reactive. The result: monitoring fatigue, missed incidents, and slow response times — not from lack of infrastructure, but from cognitive overload.' },
      { label: 'Strategic Shift', heading: 'Not automation. Augmentation.', body: 'Instead of designing "an AI that replaces surveillance personnel" — I designed "an assistive intelligence layer that helps operators make faster and more informed decisions." This distinction became foundational to every product decision.' },
      { label: 'Design Principles', heading: 'Four principles, every decision.', body: '01 Assistive Intelligence — Support humans, never replace them. 02 Attention Prioritization — Surface only operationally important events. 03 Operational Clarity — Reduce monitoring complexity. 04 Transparent AI — Expose confidence levels and reasoning to improve trust.' },
      { label: 'Key Learnings', heading: 'What this reinforced.', body: 'AI works best when it augments human capability rather than replacing it. Enterprise systems should optimize attention, not just information density. Trust in AI increases significantly when uncertainty and reasoning are made visible.' },
    ],
  },
  keka: {
    title: 'Keka Sync Tool',
    subtitle: 'Enterprise Workforce Attendance Synchronization Platform',
    figmaUrl: 'https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/cyvB5zpqHUe7MDlLDbzdcX/Keka?node-id=3-61175',
    meta: { Role: 'Product Designer', Timeline: '1 Week', Platform: 'Windows (Desktop App)', Constraint: 'Existing Keka component system' },
    tags: ['Enterprise UX','Operational Dashboard','Device Management','Sync Monitoring','Windows App','Workflow Design'],
    sections: [
      { label: 'The Context', heading: 'When scale breaks attendance infrastructure.', body: 'Large organizations operating across multiple offices rely on biometric devices to capture attendance. But at scale, the challenge shifts from capturing attendance to maintaining reliable synchronization. Logs arrive with delays. Records become inconsistent. Devices go offline.' },
      { label: 'Core Realization', heading: 'Not a hardware problem. An operational workflow problem.', body: 'Organizations had wildly different attendance setups based on office layout, employee volume, and hardware constraints. The system needed to support both single-device and dual-device setups without increasing admin effort.' },
      { label: 'Critical UX Decision', heading: 'Reducing panic during delays.', body: 'Early concepts surfaced aggressive warnings during peak sync traffic, making temporary queue buildup look like system failure. The redesigned experience differentiated temporary delay vs. actual failure, showed queue progress visually, and communicated recovery status clearly.' },
      { label: 'Constraints', heading: 'One week. Existing components. Smarter decisions.', body: 'Good enterprise design is not always about introducing new UI patterns — sometimes it is about making smarter decisions within operational and technical constraints.' },
    ],
  },
  ib: {
    title: 'InterviewBuddy Design System',
    subtitle: 'Building a scalable foundation for a multi-product interview preparation platform',
    figmaUrl: 'https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/rVeu6gRcP4H0zgxAiSNRl5/Design-System?node-id=56-2182',
    meta: { Role: 'Lead Product Designer', Team: 'Product, Engineering, QA', Tools: 'Figma, Tokens Studio', Portals: '5 products' },
    tags: ['Design System','Design Tokens','Component Library','Multi-portal','Accessibility','Scalability'],
    sections: [
      { label: 'The Scale', heading: 'One system. Five portals.', body: 'InterviewBuddy has five distinct portals: B2C Candidate, B2B Candidate, B2C Expert, B2B Expert, and Admin. A single design system had to power all of them without collapsing into rigidity or fragmenting into chaos.' },
      { label: 'The Problem', heading: 'Consistency is an organizational problem, not a visual one.', body: 'InterviewBuddy had evolved across several years with multiple designers and developers. 14 button styles, 9 input variations, 18 font sizes in use, 40+ color shades, and zero shared token layer.' },
      { label: 'Foundations', heading: 'The layer everything else is built on.', body: 'Typography rationalized from 18 sizes to 8. Full semantic color layer — Success, Warning, Error, Info. 4px spacing scale. W3C DTCG tokens: color.primary.500, spacing.md, radius.lg.' },
      { label: 'Impact', heading: 'What changed after the system shipped.', body: '↓40% design time per new screen. ↓70% UI inconsistencies flagged in QA. 2× faster new screen creation. Developer clarifications dropped significantly.' },
    ],
  },
  ibai: {
    title: 'InterviewBuddy AI',
    subtitle: 'Designing a Conversational Commerce Experience for Career Growth',
    figmaUrl: 'https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/2e2EaiNgDUcBwFFgqWjR6t/AI-Play?node-id=545-12530',
    meta: { Role: 'Product Designer', Platform: 'Mobile App (iOS + Android)', Type: '0→1 Product · MVP', Status: 'Under Development' },
    tags: ['Conversational AI','Mobile UX','0→1 Product','RAG Architecture','Conversion Design','AI Flows'],
    sections: [
      { label: 'The Real Problem', heading: 'Users think in problems, not products.', body: 'InterviewBuddy offers AI Mock Interviews, Expert Mock Interviews, Resume Reviews, Skill Assessments, and Portfolio Reviews. But users couldn\'t answer one simple question: what should I do next? The result: decision paralysis and lower conversion.' },
      { label: 'Decision 01', heading: 'Why conversational AI instead of traditional navigation?', body: 'Traditional navigation assumes users know what they want. Our users arrive with problems. A conversational AI approach translates user problems into relevant services by understanding intent, asking follow-up questions, and recommending the right service.' },
      { label: 'Decision 02', heading: 'We didn\'t go with a regular chat.', body: 'Open-ended chat creates uncertainty. We designed a guided conversational framework — the AI asks one question at a time while presenting relevant options. Freedom where it matters, structure where it helps.' },
      { label: 'Decision 03', heading: 'One question at a time — no chat history.', body: 'Users weren\'t coming for ongoing conversations. They came to accomplish a task. Persistent chat history introduces cognitive overload and irrelevant context. We designed around current intent, not conversation logs.' },
      { label: 'Decision 04', heading: 'Why add instant AI interviews inside the app?', body: 'A user is unlikely to install an app whose sole purpose is helping them decide what to purchase. We introduced Instant AI Interviews directly inside the app — giving users immediate value and building retention. The app evolved from a sales channel to a career preparation companion.' },
      { label: 'Reflection', heading: 'Beyond screen design.', body: 'This project challenged me to think beyond screen design and design an AI-driven decision-making system. Rather than creating another chatbot, I designed a conversational commerce experience that balances user goals, business objectives, and AI capabilities.' },
    ],
  },
}

export default function CaseStudy({ caseKey, onClose }: Props) {
  const { theme } = useTheme()
  const isFunky = theme === 'funky'
  const data = caseKey ? CASES[caseKey] : null

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = caseKey ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [caseKey])

  const accent = isFunky ? 'text-lime-DEFAULT' : 'text-cyan-600'
  const accentBg = isFunky ? 'bg-lime-DEFAULT/8 border-lime-DEFAULT/15' : 'bg-cyan-600/6 border-cyan-600/15'

  return (
    <>
      {/* Overlay */}
      <div onClick={onClose}
        className={`fixed inset-0 z-[500] backdrop-blur-[8px] transition-opacity duration-400
          ${caseKey ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
          ${isFunky ? 'bg-stone-900/70' : 'bg-stone-200/70'}`} />

      {/* Panel */}
      <div className={`fixed top-0 right-0 bottom-0 z-[501] overflow-y-auto
        transition-transform duration-500 ease-out
        w-[40vw] min-w-[360px] max-w-full
        ${caseKey ? 'translate-x-0' : 'translate-x-full'}
        ${isFunky ? 'bg-stone-900 border-l border-stone-700' : 'bg-white border-l border-stone-200'}`}>

        {data && (
          <>
            {/* Topbar */}
            <div className={`sticky top-0 z-10 flex items-center justify-between px-10 h-14
              backdrop-blur-[12px] border-b
              ${isFunky ? 'bg-stone-900/92 border-stone-800' : 'bg-white/92 border-stone-100'}`}>
              <span className={`font-mono text-[10px] uppercase tracking-[0.12em]
                ${isFunky ? 'text-stone-500' : 'text-stone-400'}`}>
                Case Study — {data.title}
              </span>
              <button onClick={onClose}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-pill border
                  font-display font-semibold text-[12px] cursor-pointer transition-all duration-150
                  ${isFunky
                    ? 'border-stone-700 text-stone-400 hover:border-lime-DEFAULT hover:text-lime-DEFAULT bg-transparent'
                    : 'border-stone-200 text-stone-500 hover:border-cyan-600 hover:text-cyan-600 bg-transparent'
                  }`}>
                ✕ Close
              </button>
            </div>

            {/* Hero */}
            <div className={`px-10 py-12 border-b relative overflow-hidden
              ${isFunky ? 'border-stone-800' : 'border-stone-100'}`}>
              <div className="absolute top-[-20px] right-[-10px] font-display font-bold text-[160px]
                leading-none tracking-[-0.06em] pointer-events-none select-none"
                style={{ color: 'transparent',
                  WebkitTextStroke: isFunky ? '1px rgba(232,255,107,0.06)' : '1px rgba(8,145,178,0.06)' }}>
                OS
              </div>

              <div className={`flex items-center gap-2.5 mb-4 font-mono text-[10px] uppercase tracking-[0.14em]
                ${accent}`}>
                <span className={`block w-5 h-px opacity-60 ${isFunky ? 'bg-lime-DEFAULT' : 'bg-cyan-600'}`} />
                {Object.values(data.meta)[3] ?? 'Case Study'}
                {caseKey === 'ibai' && (
                  <span className={`px-2.5 py-0.5 rounded-pill font-mono text-[9px] font-bold
                    uppercase tracking-[0.1em] border ${accentBg} ${accent}`}>
                    MVP
                  </span>
                )}
              </div>

              <h2 className={`font-display font-bold text-[40px] leading-[1.05] tracking-[-0.04em] mb-3
                ${isFunky ? 'text-stone-50' : 'text-stone-900'}`}>
                {data.title}
              </h2>
              <p className={`font-body text-[15px] leading-[1.65] max-w-[560px] mb-7
                ${isFunky ? 'text-stone-400' : 'text-stone-600'}`}>
                {data.subtitle}
              </p>

              {/* Meta */}
              <div className="flex flex-wrap gap-6 mb-6">
                {Object.entries(data.meta).map(([k, v]) => (
                  <div key={k}>
                    <div className={`font-mono text-[9px] uppercase tracking-[0.1em] mb-0.5
                      ${isFunky ? 'text-stone-600' : 'text-stone-400'}`}>{k}</div>
                    <div className={`font-display font-semibold text-[13px] tracking-[-0.02em]
                      ${isFunky ? 'text-stone-50' : 'text-stone-900'}`}>{v}</div>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {data.tags.map(t => (
                  <span key={t} className={`font-mono text-[10px] uppercase tracking-[0.07em]
                    px-3 py-1 rounded-pill border
                    ${isFunky ? 'text-stone-500 border-stone-700 bg-stone-800' : 'text-stone-400 border-stone-200 bg-stone-50'}`}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Body */}
            <div className="px-10 pb-20">

              {/* Figma embed */}
              {data.figmaUrl && (
                <div className="mt-10">
                  <div className={`flex items-center gap-2 mb-3 font-mono text-[9px] uppercase
                    tracking-[0.14em] ${accent}`}>
                    <span className={`block w-4 h-px opacity-50 ${isFunky ? 'bg-lime-DEFAULT' : 'bg-cyan-600'}`} />
                    Live Design File
                  </div>
                  <h3 className={`font-display font-bold text-[22px] tracking-[-0.03em] mb-4
                    ${isFunky ? 'text-stone-50' : 'text-stone-900'}`}>
                    Explore the designs.
                  </h3>
                  <div className={`rounded-2xl overflow-hidden border
                    ${isFunky ? 'border-stone-700 bg-stone-900' : 'border-stone-200 bg-stone-50'}`}>
                    <iframe src={data.figmaUrl} className="w-full h-[520px] border-none block"
                      allowFullScreen loading="lazy" />
                    <div className={`flex items-center px-4 py-3 border-t
                      ${isFunky ? 'border-stone-700 bg-stone-800' : 'border-stone-100 bg-white'}`}>
                      <span className={`font-mono text-[10px] uppercase tracking-[0.08em]
                        ${isFunky ? 'text-stone-500' : 'text-stone-400'}`}>
                        ↖ Pan &amp; zoom inside the frame
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Sections */}
              {data.sections.map((s, i) => (
                <div key={i} className={`pt-10 mt-10 border-t
                  ${isFunky ? 'border-stone-800' : 'border-stone-100'}`}>
                  <div className={`flex items-center gap-2 mb-3 font-mono text-[9px] uppercase
                    tracking-[0.14em] ${accent}`}>
                    <span className={`block w-4 h-px opacity-50 ${isFunky ? 'bg-lime-DEFAULT' : 'bg-cyan-600'}`} />
                    {s.label}
                  </div>
                  <h3 className={`font-display font-bold text-[22px] tracking-[-0.03em] leading-[1.2] mb-4
                    ${isFunky ? 'text-stone-50' : 'text-stone-900'}`}>
                    {s.heading}
                  </h3>
                  <p className={`font-body text-[14px] leading-[1.8]
                    ${isFunky ? 'text-stone-400' : 'text-stone-600'}`}>
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  )
}

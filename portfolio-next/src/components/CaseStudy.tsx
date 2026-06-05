'use client'
import { useEffect, CSSProperties } from 'react'
import { useTheme } from '@/lib/ThemeContext'

/* ── shared sub-components ── */

function SectionLabel({ text, accent }: { text: string; accent: string }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12,
      fontFamily:'var(--font-mono)', fontSize:9, textTransform:'uppercase' as const,
      letterSpacing:'0.14em', color:accent }}>
      <span style={{ display:'block', width:16, height:1, background:accent, opacity:0.5 }} />
      {text}
    </div>
  )
}

function SectionHeading({ text, textHi }: { text: string; textHi: string }) {
  return (
    <h3 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:22,
      letterSpacing:'-0.03em', lineHeight:1.2, color:textHi, marginBottom:14 }}>
      {text}
    </h3>
  )
}

function BodyText({ children, textMid }: { children: React.ReactNode; textMid: string }) {
  return (
    <p style={{ fontFamily:'var(--font-body)', fontSize:14, lineHeight:1.8, color:textMid }}>
      {children}
    </p>
  )
}

function Callout({ text, accent, isFunky }: { text: string; accent: string; isFunky: boolean }) {
  return (
    <div style={{
      margin:'20px 0', padding:'18px 20px',
      background: isFunky ? 'rgba(232,255,107,0.04)' : 'rgba(8,145,178,0.04)',
      border: `1px solid ${isFunky ? 'rgba(232,255,107,0.15)' : 'rgba(8,145,178,0.15)'}`,
      borderLeft: `3px solid ${accent}`,
      borderRadius:8, fontFamily:'var(--font-body)', fontSize:14,
      fontStyle:'italic', color:'#F5F5F4', lineHeight:1.7,
    }}>{text}</div>
  )
}

function CardGrid({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, margin:'20px 0' }}>
      {children}
    </div>
  )
}

function Card({ num, title, desc, isFunky, accent }: { num:string; title:string; desc:string; isFunky:boolean; accent:string }) {
  return (
    <div style={{
      background: isFunky ? '#292524' : '#F5F5F4',
      border: `1px solid ${isFunky ? '#44403C' : '#E7E5E4'}`,
      borderRadius:14, padding:20,
      transition:'border-color 0.2s',
    }}
    onMouseEnter={e => e.currentTarget.style.borderColor = isFunky ? 'rgba(232,255,107,0.2)' : 'rgba(8,145,178,0.2)'}
    onMouseLeave={e => e.currentTarget.style.borderColor = isFunky ? '#44403C' : '#E7E5E4'}>
      <div style={{ fontFamily:'var(--font-mono)', fontSize:10, color:accent, letterSpacing:'0.08em', marginBottom:8 }}>{num}</div>
      <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:14, letterSpacing:'-0.02em', color: isFunky ? '#F5F5F4' : '#1C1917', marginBottom:6 }}>{title}</div>
      <div style={{ fontFamily:'var(--font-body)', fontSize:12, color: isFunky ? '#78716C' : '#57534E', lineHeight:1.65 }}>{desc}</div>
    </div>
  )
}

function Feature({ num, title, desc, isFunky }: { num:string; title:string; desc:string; isFunky:boolean }) {
  return (
    <div style={{
      display:'flex', gap:16, alignItems:'flex-start',
      padding:'16px 0',
      borderBottom: `1px solid ${isFunky ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
    }}>
      <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color: isFunky ? '#E8FF6B' : '#0891B2', letterSpacing:'0.05em', flexShrink:0, paddingTop:2, width:28 }}>{num}</span>
      <div>
        <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:14, letterSpacing:'-0.02em', color: isFunky ? '#F5F5F4' : '#1C1917', marginBottom:5 }}>{title}</div>
        <div style={{ fontFamily:'var(--font-body)', fontSize:13, color: isFunky ? '#78716C' : '#57534E', lineHeight:1.65 }}>{desc}</div>
      </div>
    </div>
  )
}

function OutcomeGrid({ items, isFunky, accent }: { items:{val:string;label:string}[]; isFunky:boolean; accent:string }) {
  return (
    <div style={{ display:'grid', gridTemplateColumns:`repeat(${items.length},1fr)`, gap:12, margin:'20px 0' }}>
      {items.map((o,i) => (
        <div key={i} style={{
          background: isFunky ? '#292524' : '#F5F5F4',
          border: `1px solid ${isFunky ? '#44403C' : '#E7E5E4'}`,
          borderRadius:14, padding:'20px 16px', textAlign:'center',
          transition:'all 0.2s cubic-bezier(0.34,1.56,0.64,1)',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = isFunky ? 'rgba(232,255,107,0.25)' : 'rgba(8,145,178,0.25)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = isFunky ? '#44403C' : '#E7E5E4'; e.currentTarget.style.transform = '' }}>
          <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:28, letterSpacing:'-0.04em', color:accent, lineHeight:1, marginBottom:6 }}>{o.val}</div>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:10, color: isFunky ? '#57534E' : '#A8A29E', letterSpacing:'0.06em', textTransform:'uppercase' as const, lineHeight:1.4 }}>{o.label}</div>
        </div>
      ))}
    </div>
  )
}

function DataTable({ headers, rows, isFunky }: { headers:string[]; rows:string[][]; isFunky:boolean }) {
  return (
    <table style={{ width:'100%', borderCollapse:'collapse', margin:'20px 0', fontSize:13 }}>
      <thead>
        <tr>{headers.map(h => (
          <th key={h} style={{ textAlign:'left', padding:'10px 14px', fontFamily:'var(--font-mono)', fontSize:9, letterSpacing:'0.1em', textTransform:'uppercase' as const, color: isFunky ? '#57534E' : '#A8A29E', borderBottom: `1px solid ${isFunky ? '#44403C' : '#E7E5E4'}` }}>{h}</th>
        ))}</tr>
      </thead>
      <tbody>{rows.map((r,i) => (
        <tr key={i}>{r.map((cell,j) => (
          <td key={j} style={{ padding:'12px 14px', borderBottom: `1px solid ${isFunky ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}`, fontFamily: j===0 ? 'var(--font-display)' : 'var(--font-body)', fontWeight: j===0 ? 600 : 400, fontSize:13, color: j===0 ? (isFunky ? '#F5F5F4' : '#1C1917') : (isFunky ? '#78716C' : '#57534E'), lineHeight:1.5 }}>{cell}</td>
        ))}</tr>
      ))}</tbody>
    </table>
  )
}

function PhoneFrame({ src, alt, caption, isFunky }: { src:string; alt:string; caption:string; isFunky:boolean }) {
  return (
    <div style={{ display:'flex', justifyContent:'center', margin:'28px 0 8px' }}>
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:10, width:220 }}>
        <img src={src} alt={alt} loading="lazy" style={{ width:'100%', borderRadius:28, border:`1px solid ${isFunky ? '#44403C' : '#E7E5E4'}`, boxShadow: isFunky ? '0 20px 48px rgba(0,0,0,0.4)' : '0 12px 32px rgba(0,0,0,0.12)', display:'block' }} />
        <div style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.08em', textTransform:'uppercase' as const, color: isFunky ? '#57534E' : '#A8A29E', textAlign:'center' }}>{caption}</div>
      </div>
    </div>
  )
}

function FigmaEmbed({ url, isFunky }: { url:string; isFunky:boolean }) {
  return (
    <div style={{ borderRadius:16, overflow:'hidden', border:`1px solid ${isFunky ? '#44403C' : '#E7E5E4'}`, margin:'20px 0' }}>
      <iframe src={url} style={{ width:'100%', height:520, border:'none', display:'block' }} allowFullScreen loading="lazy" />
      <div style={{ padding:'12px 16px', borderTop:`1px solid ${isFunky ? '#44403C' : '#E7E5E4'}`, background: isFunky ? '#292524' : '#FAFAF9' }}>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:10, textTransform:'uppercase' as const, letterSpacing:'0.08em', color: isFunky ? '#57534E' : '#A8A29E' }}>↖ Pan &amp; zoom inside the frame</span>
      </div>
    </div>
  )
}

/* ── Main component ── */
export default function CaseStudy({ caseKey, onClose }: { caseKey:string|null; onClose:()=>void }) {
  const { theme } = useTheme()
  const isFunky   = theme === 'funky'
  const accent    = isFunky ? '#E8FF6B' : '#0891B2'
  const textHi    = isFunky ? '#F5F5F4' : '#1C1917'
  const textMid   = isFunky ? '#78716C' : '#57534E'
  const textLo    = isFunky ? '#57534E' : '#A8A29E'
  const modalBg   = isFunky ? '#1C1917' : '#FFFFFF'
  const divider   = isFunky ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)'
  const tagBg     = isFunky ? '#292524' : '#F5F5F4'
  const tagBorder = isFunky ? '#44403C' : '#E7E5E4'

  useEffect(() => {
    const fn = (e:KeyboardEvent) => e.key==='Escape' && onClose()
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])
  useEffect(() => { document.body.style.overflow = caseKey ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [caseKey])

  const p = { accent, textHi, textMid, textLo, isFunky, divider }

  const renderContent = () => {
    if (!caseKey) return null

    /* ──────────────── SENTINEL ──────────────── */
    if (caseKey === 'sentinel') return <>
      <Hero c={{ title:'SentinelOS', subtitle:'AI-Assisted Surveillance Intelligence Platform for High-Security Facilities', eyebrow:'Self-initiated · Enterprise UX · 2026', meta:{ Role:'Product Designer (Solo)', Timeline:'5 Weeks', Type:'Concept / Self-initiated', Deliverable:'High-fidelity product concept' }, tags:['Enterprise UX','AI-Assisted Workflows','Dashboard Design','Systems Thinking','Design System','UX Research'] }} {...p} />

      <Section divider={divider}>
        <SectionLabel text="The Problem" accent={accent} />
        <SectionHeading text="Sustained human attention is unreliable at scale." textHi={textHi} />
        <BodyText textMid={textMid}>Traditional surveillance systems are largely passive. Operators continuously scan dozens of feeds, incidents are manually traced, and alerts are reactive. The result: monitoring fatigue, missed incidents, and slow response times — not from lack of infrastructure, but from cognitive overload.</BodyText>
        <Callout text='"How might we help surveillance teams in high-security environments improve situational awareness and reduce monitoring fatigue — without replacing human operators?"' accent={accent} isFunky={isFunky} />
      </Section>

      <Section divider={divider}>
        <SectionLabel text="Research Insights" accent={accent} />
        <SectionHeading text="Four findings that shaped the product." textHi={textHi} />
        <CardGrid>
          <Card num="01" title="Fatigue is the real failure mode" desc="Operators monitoring multiple feeds continuously experience reduced attention, slower detection, and alert desensitization — not equipment failure." isFunky={isFunky} accent={accent} />
          <Card num="02" title="Systems prioritize recording, not intelligence" desc="Most platforms are designed for storing footage and reviewing incidents after the fact. Almost none actively help operators prioritize attention in real time." isFunky={isFunky} accent={accent} />
          <Card num="03" title="Alert volume destroys trust" desc="When every alert appears critical, operators learn to ignore them. Signal-to-noise ratio becomes the core UX problem — not information availability." isFunky={isFunky} accent={accent} />
          <Card num="04" title="AI works best as an assistant" desc="Operators in high-security environments trust systems more when they remain in control of final decisions. Human-in-the-loop is not a limitation — it's a design requirement." isFunky={isFunky} accent={accent} />
        </CardGrid>
      </Section>

      <Section divider={divider}>
        <SectionLabel text="The Strategic Shift" accent={accent} />
        <SectionHeading text="Not automation. Augmentation." textHi={textHi} />
        <BodyText textMid={textMid}>Most AI surveillance conversations default to automation. But high-security environments rarely trust fully autonomous systems — human verification remains critical.</BodyText>
        <Callout text='Instead of designing "an AI that replaces surveillance personnel" — I designed "an assistive intelligence layer that helps operators make faster and more informed decisions."' accent={accent} isFunky={isFunky} />
      </Section>

      <Section divider={divider}>
        <SectionLabel text="Design Principles" accent={accent} />
        <SectionHeading text="Four principles, every decision." textHi={textHi} />
        <DataTable headers={['Principle','Purpose']} rows={[['Assistive Intelligence','Support humans, never replace them'],['Attention Prioritization','Surface only operationally important events'],['Operational Clarity','Reduce monitoring complexity, not just visual density'],['Transparent AI','Expose confidence levels and reasoning to improve trust']]} isFunky={isFunky} />
      </Section>

      <Section divider={divider}>
        <SectionLabel text="Information Architecture" accent={accent} />
        <SectionHeading text="Five modules, separated by intent." textHi={textHi} />
        <DataTable headers={['Module','Purpose']} rows={[['Live Monitoring','Real-time surveillance overview with AI priority surfacing'],['Incident Intelligence','AI-assisted anomaly tracking and cross-camera investigation'],['Restricted Access','Zone-level access visibility and unauthorized movement detection'],['Operational Analytics','Occupancy trends, movement density, restricted-zone heatmaps'],['Security Administration','Permissions management and escalation workflows']]} isFunky={isFunky} />
      </Section>

      <Section divider={divider}>
        <SectionLabel text="Key Features" accent={accent} />
        <SectionHeading text="What the system actually does." textHi={textHi} />
        <Feature num="01" title="AI-Assisted Event Prioritization" desc="Instead of forcing operators to monitor every feed equally, the system identifies unusual movement patterns, unauthorized zone access, prolonged restricted-area presence, and suspicious activity clusters — helping operators focus where it matters most." isFunky={isFunky} />
        <Feature num="02" title="Smart Incident Timeline" desc="AI-generated movement timelines, cross-camera subject tracking, and chronological incident summaries replace the historically manual process of tracing events across multiple feeds." isFunky={isFunky} />
        <Feature num="03" title="Multi-Level Restricted Access Monitoring" desc="The platform monitors access attempts, unauthorized movement, and unusual zone transitions with clear contextual signals across restricted labs, server rooms, and authorization-based movement areas." isFunky={isFunky} />
        <Feature num="04" title="Transparent AI Reasoning" desc='Confidence indicators, alert reasoning, and detection sources are intentionally exposed. Example: "Unusual activity detected due to prolonged stationary presence in Restricted Zone B."' isFunky={isFunky} />
      </Section>

      <Section divider={divider}>
        <SectionLabel text="Outcomes" accent={accent} />
        <SectionHeading text="What this project proved." textHi={textHi} />
        <OutcomeGrid items={[{val:'5',label:'Core modules designed end-to-end'},{val:'4',label:'Design principles held across every screen'},{val:'1',label:'Modular enterprise design system created'}]} isFunky={isFunky} accent={accent} />
      </Section>

      <Section divider={divider} last>
        <SectionLabel text="Key Learnings" accent={accent} />
        <SectionHeading text="What this reinforced." textHi={textHi} />
        <Callout text="AI works best when it augments human capability rather than replacing it. Enterprise systems should optimize attention, not just information density. Trust in AI increases significantly when uncertainty and reasoning are made visible. Good surveillance UX is less about monitoring everything — and more about helping users identify what actually matters." accent={accent} isFunky={isFunky} />
      </Section>
    </>

    /* ──────────────── KEKA ──────────────── */
    if (caseKey === 'keka') return <>
      <Hero c={{ title:'Keka Sync Tool', subtitle:'Enterprise Workforce Attendance Synchronization Platform — a Windows-based infrastructure layer between biometric hardware and attendance management systems.', eyebrow:'Keka · Enterprise Product · 2026', meta:{ Role:'Product Designer', Timeline:'1 Week', Platform:'Windows (Desktop App)', Constraint:'Existing Keka component system' }, tags:['Enterprise UX','Operational Dashboard','Device Management','Sync Monitoring','Windows App','Workflow Design'] }} {...p} />

      <Section divider={divider}>
        <SectionLabel text="Live Design File" accent={accent} />
        <SectionHeading text="Explore the Figma file." textHi={textHi} />
        <FigmaEmbed url="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/cyvB5zpqHUe7MDlLDbzdcX/Keka?node-id=3-61175" isFunky={isFunky} />
      </Section>

      <Section divider={divider}>
        <SectionLabel text="The Context" accent={accent} />
        <SectionHeading text="When scale breaks attendance infrastructure." textHi={textHi} />
        <BodyText textMid={textMid}>Large organizations operating across multiple offices rely on biometric devices to capture attendance. But at scale, the challenge shifts from capturing attendance to maintaining reliable synchronization. Logs arrive with delays. Records become inconsistent. Devices go offline.</BodyText>
        <Callout text='"How might we help enterprise admins manage and synchronize biometric attendance systems reliably across multiple locations — while reducing operational complexity?"' accent={accent} isFunky={isFunky} />
      </Section>

      <Section divider={divider}>
        <SectionLabel text="Core Realization" accent={accent} />
        <SectionHeading text="Not a hardware problem. An operational workflow problem." textHi={textHi} />
        <CardGrid>
          <Card num="Setup A" title="Single Device" desc="One biometric device handles both clock-in and clock-out using punch sequence and timing logic. Simpler but creates congestion at scale." isFunky={isFunky} accent={accent} />
          <Card num="Setup B" title="Dual Device" desc="Dedicated devices for clock-in and clock-out. Reduces congestion but introduces mapping complexity, synchronization dependency, and device-role management challenges." isFunky={isFunky} accent={accent} />
        </CardGrid>
      </Section>

      <Section divider={divider}>
        <SectionLabel text="Research Insights" accent={accent} />
        <SectionHeading text="Three findings that shaped the UX direction." textHi={textHi} />
        <Feature num="01" title="Admins needed visibility, not more control" desc="Existing tools exposed raw logs and server-level information. But admins primarily wanted simple answers: Which device is offline? Is syncing working? Which location has delayed records?" isFunky={isFunky} />
        <Feature num="02" title="High traffic created synchronization anxiety" desc="During peak hours, thousands of records could arrive within minutes. Admins couldn't distinguish a processing queue from an actual failure. Communicating sync health vs. sync failure became a critical UX problem." isFunky={isFunky} />
        <Feature num="03" title="Device mapping was more complex than expected" desc="Different organizations had different office structures, device setups, and attendance workflows. Admins needed flexibility to map devices to locations and assign clock-in/out behavior." isFunky={isFunky} />
      </Section>

      <Section divider={divider}>
        <SectionLabel text="Critical UX Decision" accent={accent} />
        <SectionHeading text="Reducing panic during delays." textHi={textHi} />
        <CardGrid>
          <Card num="Before" title="Alert-heavy, error-first" desc="Every queue delay triggered visible warnings. Admins couldn't distinguish temporary sync latency from actual infrastructure failure. Panic was routine." isFunky={isFunky} accent={'#DA5B3A'} />
          <Card num="After" title="Progressive, contextual clarity" desc="Differentiated temporary delay vs. actual failure. Queue progress shown visually. System recovery status communicated clearly. Unnecessary escalation eliminated." isFunky={isFunky} accent={accent} />
        </CardGrid>
      </Section>

      <Section divider={divider}>
        <SectionLabel text="Constraints & Execution" accent={accent} />
        <SectionHeading text="One week. Existing components. Smarter decisions." textHi={textHi} />
        <Callout text="Good enterprise design is not always about introducing new UI patterns — sometimes it is about making smarter decisions within operational and technical constraints." accent={accent} isFunky={isFunky} />
      </Section>

      <Section divider={divider} last>
        <SectionLabel text="Outcomes" accent={accent} />
        <SectionHeading text="What the project delivered." textHi={textHi} />
        <OutcomeGrid items={[{val:'4',label:'Core experience areas designed'},{val:'1wk',label:'Full delivery timeline'},{val:'2×',label:'Device setups supported'}]} isFunky={isFunky} accent={accent} />
      </Section>
    </>

    /* ──────────────── IB DESIGN SYSTEM ──────────────── */
    if (caseKey === 'ib') return <>
      <Hero c={{ title:'InterviewBuddy Design System', subtitle:'Building a scalable foundation for a multi-product interview preparation platform — one token architecture powering five portals.', eyebrow:'InterviewBuddy · Design Infrastructure · 2024–Present', meta:{ Role:'Lead Product Designer', Team:'Product, Engineering, QA', Tools:'Figma, Tokens Studio', Portals:'5 products' }, tags:['Design System','Design Tokens','Component Library','Multi-portal','Accessibility','Scalability'] }} {...p} />

      <Section divider={divider}>
        <SectionLabel text="Live Design File" accent={accent} />
        <SectionHeading text="Explore the system." textHi={textHi} />
        <FigmaEmbed url="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/rVeu6gRcP4H0zgxAiSNRl5/Design-System?node-id=56-2182" isFunky={isFunky} />
      </Section>

      <Section divider={divider}>
        <SectionLabel text="The Scale" accent={accent} />
        <SectionHeading text="One system. Five portals." textHi={textHi} />
        <BodyText textMid={textMid}>InterviewBuddy has five distinct portals with different users, different workflows, and different expectations. A single design system had to power all of them without collapsing into rigidity or fragmenting into chaos.</BodyText>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:20, padding:'32px 0' }}>
          <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:14, color:accent, background: isFunky ? 'rgba(232,255,107,0.08)' : 'rgba(8,145,178,0.06)', border:`1px solid ${isFunky ? 'rgba(232,255,107,0.3)' : 'rgba(8,145,178,0.25)'}`, borderRadius:10, padding:'10px 24px' }}>Design System</div>
          <div style={{ display:'flex', gap:12, flexWrap:'wrap', justifyContent:'center' }}>
            {['B2C Candidate','B2B Candidate','B2C Expert','B2B Expert','Admin Portal'].map(p2 => (
              <div key={p2} style={{ fontFamily:'var(--font-display)', fontWeight:600, fontSize:12, color: isFunky ? '#F5F5F4' : '#1C1917', background: isFunky ? '#292524' : '#F5F5F4', border:`1px solid ${isFunky ? '#44403C' : '#E7E5E4'}`, borderRadius:10, padding:'10px 16px', textAlign:'center' }}>{p2}</div>
            ))}
          </div>
        </div>
      </Section>

      <Section divider={divider}>
        <SectionLabel text="The Problem" accent={accent} />
        <SectionHeading text="Consistency is an organizational problem, not a visual one." textHi={textHi} />
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, margin:'20px 0' }}>
          {[['14','Button styles'],['9','Input variations'],['18','Font sizes in use'],['40+','Color shades'],['5','Different portals'],['0','Shared token layer']].map(([val,label]) => (
            <div key={label} style={{ background: isFunky ? '#292524' : '#F5F5F4', border:`1px solid ${isFunky ? '#44403C' : '#E7E5E4'}`, borderRadius:12, padding:'20px 16px', textAlign:'center' }}>
              <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:32, letterSpacing:'-0.04em', color:accent, lineHeight:1, marginBottom:6 }}>{val}</div>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:10, color: isFunky ? '#57534E' : '#A8A29E', textTransform:'uppercase' as const, letterSpacing:'0.06em' }}>{label}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section divider={divider}>
        <SectionLabel text="Design Principles" accent={accent} />
        <SectionHeading text="Four rules the system never breaks." textHi={textHi} />
        <CardGrid>
          <Card num="01" title="Clarity First" desc="Interfaces should be easy to scan during interview preparation. Cognitive load during high-stakes moments must be minimized by design." isFunky={isFunky} accent={accent} />
          <Card num="02" title="Efficiency Over Decoration" desc="Users come to practice interviews, not admire interfaces. Every visual decision earns its place by helping users get to their goal faster." isFunky={isFunky} accent={accent} />
          <Card num="03" title="Consistency Across Portals" desc="Regardless of user role — candidate, expert, or admin — patterns should remain familiar. Switching portals shouldn't mean relearning the product." isFunky={isFunky} accent={accent} />
          <Card num="04" title="Accessibility by Default" desc="Accessibility wasn't a final QA step — it was embedded into component creation from day one. Contrast, focus states, and keyboard navigation baked in." isFunky={isFunky} accent={accent} />
        </CardGrid>
      </Section>

      <Section divider={divider}>
        <SectionLabel text="Components" accent={accent} />
        <SectionHeading text="Built for states, not just screenshots." textHi={textHi} />
        <DataTable headers={['Component','Why it matters for InterviewBuddy']} rows={[['Buttons','Primary, Secondary, Ghost, Danger — all states including loading for async interview booking'],['Inputs','Default, focus, error, success states — used across scheduling, profile, and payment forms'],['Tables','Interview history, candidate reports, admin operations — sortable, paginated, density-aware'],['Status Badges','Scheduled, Completed, Missed, Rescheduled, Cancelled — product-specific states baked in'],['Modals','Confirmation, destructive, information — consistent sizing and overlay behavior'],['Tabs','Horizontal and vertical, used across portal navigation and content filtering']]} isFunky={isFunky} />
      </Section>

      <Section divider={divider}>
        <SectionLabel text="Impact" accent={accent} />
        <SectionHeading text="What changed after the system shipped." textHi={textHi} />
        <OutcomeGrid items={[{val:'↓40%',label:'Design time per new screen'},{val:'↓70%',label:'UI inconsistencies flagged in QA'},{val:'2×',label:'Faster new screen creation'}]} isFunky={isFunky} accent={accent} />
        <Callout text="Building a design system taught me that consistency is not a visual problem — it is an organizational problem. The challenge was balancing flexibility for five different user roles while maintaining a unified product experience." accent={accent} isFunky={isFunky} />
      </Section>
    </>

    /* ──────────────── IB AI ──────────────── */
    if (caseKey === 'ibai') return <>
      <Hero c={{ title:'InterviewBuddy AI', subtitle:'Designing a Conversational Commerce Experience for Career Growth — not a chatbot, but an AI-powered conversion engine that helps users discover the right career service and take action.', eyebrow:'InterviewBuddy · AI Product · 2024–Present', meta:{ Role:'Product Designer', Platform:'Mobile App (iOS + Android)', Type:'0→1 Product · MVP', Status:'Under Development' }, tags:['Conversational AI','Mobile UX','0→1 Product','RAG Architecture','Conversion Design','AI Flows'], isMVP:true }} {...p} />

      <Section divider={divider}>
        <SectionLabel text="Live Design File" accent={accent} />
        <SectionHeading text="Explore the designs." textHi={textHi} />
        <FigmaEmbed url="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/2e2EaiNgDUcBwFFgqWjR6t/AI-Play?node-id=545-12530" isFunky={isFunky} />
      </Section>

      <Section divider={divider}>
        <SectionLabel text="The Real Problem" accent={accent} />
        <SectionHeading text="Users think in problems, not products." textHi={textHi} />
        <BodyText textMid={textMid}>InterviewBuddy offers AI Mock Interviews, Expert Mock Interviews, Resume Reviews, Skill Assessments, and Portfolio Reviews. But users arriving at the platform often couldn't answer one simple question: what should I do next? The result: decision paralysis, lower conversion, and users leaving without taking action.</BodyText>
        <Callout text={"\"I have an interview next week.\" · \"Can someone check my resume?\" · \"I don't know if I'm ready.\" — Users think in problems. Traditional navigation assumes they know what they want."} accent={accent} isFunky={isFunky} />
      </Section>

      <Section divider={divider}>
        <SectionLabel text="Decision 01" accent={accent} />
        <div style={{ display:'grid', gridTemplateColumns:'1fr 240px', gap:32, alignItems:'center' }}>
        <div>
        <SectionHeading text="Why conversational AI instead of traditional navigation?" textHi={textHi} />
        <BodyText textMid={textMid}>Traditional navigation assumes users know what they're looking for. Our users don't — they arrive with problems, not product names. A conversational AI approach translates user problems into relevant services by understanding intent, asking follow-up questions, and recommending the right service.</BodyText>
        <Callout text="Outcome: Reduced cognitive load and simplified product discovery. Users no longer need to understand our product taxonomy — they just describe their situation." accent={accent} isFunky={isFunky} />
        </div>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minWidth:200 }}>
          <PhoneFrame src="/ib-ai-screen-1.webp" alt="Home screen — Discovery" caption="Home · Discovery" isFunky={isFunky} />
        </div>
        </div>
      </Section>

      <Section divider={divider}>
        <SectionLabel text="Decision 02" accent={accent} />
        <div style={{ display:'grid', gridTemplateColumns:'1fr 240px', gap:32, alignItems:'center' }}>
        <div>
        <SectionHeading text="We didn't go with a regular chat." textHi={textHi} />
        <BodyText textMid={textMid}>Open-ended chat creates uncertainty. Users don't know what to ask, ask incomplete questions, and get lost in long conversations. We designed a guided conversational framework — the AI asks one question at a time while presenting relevant options and always allowing custom responses.</BodyText>
        <Callout text="Design Principle: Freedom where it matters, structure where it helps. The experience feels conversational without becoming an unstructured chatbot." accent={accent} isFunky={isFunky} />
        </div>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minWidth:200 }}>
          <PhoneFrame src="/ib-ai-screen-2.webp" alt="Intent capture" caption="Intent capture" isFunky={isFunky} />
        </div>
        </div>
      </Section>

      <Section divider={divider}>
        <SectionLabel text="Decision 03" accent={accent} />
        <div style={{ display:'grid', gridTemplateColumns:'1fr 240px', gap:32, alignItems:'center' }}>
        <div>
        <SectionHeading text="One question at a time — no chat history." textHi={textHi} />
        <BodyText textMid={textMid}>Users weren't coming for ongoing conversations. They came to accomplish a task. Persistent chat history introduces cognitive overload, irrelevant context, and longer recovery times. We designed the experience around current intent rather than persistent threads.</BodyText>
        <Callout text="Design Principle: Users care about progress, not conversation logs. Faster task completion, reduced interface complexity." accent={accent} isFunky={isFunky} />
        </div>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minWidth:200 }}>
          <PhoneFrame src="/ib-ai-screen-3.webp" alt="Context qualification" caption="Context qualification" isFunky={isFunky} />
        </div>
        </div>
      </Section>

      <Section divider={divider}>
        <SectionLabel text="Decision 04" accent={accent} />
        <div style={{ display:'grid', gridTemplateColumns:'1fr 240px', gap:32, alignItems:'center' }}>
        <div>
        <SectionHeading text="Why add instant AI interviews inside the app?" textHi={textHi} />
        <BodyText textMid={textMid}>A user is unlikely to install an app whose sole purpose is helping them decide what to purchase. We introduced Instant AI Interviews directly inside the app — giving users immediate value and creating a high-frequency utility.</BodyText>
        <Callout text="Strategic shift: The app evolved from a sales channel to a career preparation companion. Higher downloads, session frequency, retention, and upsell opportunities." accent={accent} isFunky={isFunky} />
        </div>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minWidth:200 }}>
          <PhoneFrame src="/ib-ai-screen-4.webp" alt="AI Interview in session" caption="AI Interview · In session" isFunky={isFunky} />
        </div>
        </div>
      </Section>

      <Section divider={divider} last>
        <SectionLabel text="Reflection" accent={accent} />
        <SectionHeading text="Beyond screen design." textHi={textHi} />
        <Callout text="This project challenged me to think beyond screen design and design an AI-driven decision-making system. Rather than creating another chatbot, I designed a conversational commerce experience that balances user goals, business objectives, and AI capabilities. The result was a scalable framework capable of guiding users from uncertainty to action — while creating meaningful opportunities for engagement, retention, and revenue growth." accent={accent} isFunky={isFunky} />
      </Section>
    </>

    return null
  }

  return <>
    {/* Backdrop */}
    <div onClick={onClose} style={{
      position:'fixed', inset:0, zIndex:500,
      background: isFunky ? 'rgba(12,10,9,0.8)' : 'rgba(200,196,193,0.65)',
      backdropFilter:'blur(10px)', WebkitBackdropFilter:'blur(10px)',
      opacity: caseKey ? 1 : 0, pointerEvents: caseKey ? 'all' : 'none',
      transition:'opacity 0.3s ease',
    }} />

    {/* Modal */}
    <div style={{
      position:'fixed', inset:0, zIndex:501,
      display:'flex', alignItems:'center', justifyContent:'center',
      padding:'24px', pointerEvents: caseKey ? 'all' : 'none',
    }}>
      <div style={{
        width:'100%', maxWidth:1440,
        display:'grid', gridTemplateColumns:'repeat(12,1fr)', columnGap:24,
      }}>
        <div style={{
          gridColumn:'1 / 13',
          background: modalBg, borderRadius:24, overflow:'hidden',
          boxShadow: isFunky ? '0 32px 80px rgba(0,0,0,0.6),0 0 0 1px rgba(255,255,255,0.05)' : '0 32px 80px rgba(0,0,0,0.15),0 0 0 1px rgba(0,0,0,0.06)',
          maxHeight:'calc(100vh - 48px)', display:'flex', flexDirection:'column',
          transform: caseKey ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(20px)',
          opacity: caseKey ? 1 : 0,
          transition:'transform 0.4s cubic-bezier(0.34,1.56,0.64,1),opacity 0.3s ease',
        }}>
          {caseKey && <>
            {/* Topbar */}
            <div style={{
              flexShrink:0, display:'flex', alignItems:'center', justifyContent:'space-between',
              padding:'0 48px', height:56,
              background: isFunky ? 'rgba(28,25,23,0.96)' : 'rgba(255,255,255,0.96)',
              backdropFilter:'blur(12px)',
              borderBottom:`1px solid ${divider}`,
            }}>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:10, textTransform:'uppercase' as const, letterSpacing:'0.12em', color:textLo }}>
                Case Study
              </span>
              <button onClick={onClose} style={{
                display:'flex', alignItems:'center', gap:6,
                padding:'6px 16px', borderRadius:999,
                border:`1px solid ${isFunky ? '#44403C' : '#E7E5E4'}`,
                fontFamily:'var(--font-display)', fontSize:12, fontWeight:600,
                color:textMid, background:'transparent', cursor:'pointer',
                transition:'all 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.color = accent }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = isFunky ? '#44403C' : '#E7E5E4'; e.currentTarget.style.color = textMid }}>
                ✕ Close
              </button>
            </div>

            {/* Scrollable content */}
            <div style={{ flex:1, overflowY:'auto', padding:'0 48px 80px' }}>
              {renderContent()}
            </div>
          </>}
        </div>
      </div>
    </div>
  </>
}

/* ── Layout helpers ── */
function Section({ children, divider, last }: { children:React.ReactNode; divider:string; last?:boolean }) {
  return (
    <div style={{ paddingTop:40, paddingBottom: last ? 0 : 40, borderBottom: last ? 'none' : `1px solid ${divider}`, marginBottom: last ? 0 : 0 }}>
      {children}
    </div>
  )
}

interface HeroData {
  title: string; subtitle: string; eyebrow: string;
  meta: Record<string,string>; tags: string[]; isMVP?: boolean
}
function Hero({ c, accent, textHi, textMid, textLo, isFunky, divider }: { c:HeroData; accent:string; textHi:string; textMid:string; textLo:string; isFunky:boolean; divider:string }) {
  const tagBg     = isFunky ? '#292524' : '#F5F5F4'
  const tagBorder = isFunky ? '#44403C' : '#E7E5E4'
  return (
    <div style={{ padding:'48px 0 40px', borderBottom:`1px solid ${divider}`, position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:-20, right:-10, fontFamily:'var(--font-display)', fontWeight:700, fontSize:160, lineHeight:1, letterSpacing:'-0.06em', color:'transparent', pointerEvents:'none', userSelect:'none' as const, WebkitTextStroke:`1px ${isFunky ? 'rgba(232,255,107,0.06)' : 'rgba(8,145,178,0.06)'}` }}>OS</div>

      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, fontFamily:'var(--font-mono)', fontSize:10, textTransform:'uppercase' as const, letterSpacing:'0.14em', color:accent }}>
          <span style={{ display:'block', width:20, height:1, background:accent, opacity:0.6 }} />
          {c.eyebrow}
        </div>
        {c.isMVP && <span style={{ padding:'3px 10px', borderRadius:999, background: isFunky ? 'rgba(232,255,107,0.12)' : 'rgba(8,145,178,0.08)', border:`1px solid ${isFunky ? 'rgba(232,255,107,0.35)' : 'rgba(8,145,178,0.25)'}`, fontFamily:'var(--font-mono)', fontSize:9, fontWeight:700, textTransform:'uppercase' as const, letterSpacing:'0.1em', color:accent }}>MVP</span>}
      </div>

      <h2 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:40, lineHeight:1.05, letterSpacing:'-0.04em', color:textHi, marginBottom:12 }}>{c.title}</h2>
      <p style={{ fontFamily:'var(--font-body)', fontSize:15, lineHeight:1.65, color:textMid, maxWidth:640, marginBottom:28 }}>{c.subtitle}</p>

      <div style={{ display:'flex', flexWrap:'wrap', gap:28, marginBottom:24 }}>
        {Object.entries(c.meta).map(([k,v]) => (
          <div key={k}>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:9, textTransform:'uppercase' as const, letterSpacing:'0.1em', color:textLo, marginBottom:3 }}>{k}</div>
            <div style={{ fontFamily:'var(--font-display)', fontWeight:600, fontSize:13, letterSpacing:'-0.02em', color:textHi }}>{v}</div>
          </div>
        ))}
      </div>

      <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
        {c.tags.map(t => (
          <span key={t} style={{ fontFamily:'var(--font-mono)', fontSize:10, textTransform:'uppercase' as const, letterSpacing:'0.07em', padding:'5px 12px', borderRadius:999, border:`1px solid ${tagBorder}`, background:tagBg, color:textLo }}>{t}</span>
        ))}
      </div>
    </div>
  )
}

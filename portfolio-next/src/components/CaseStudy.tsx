'use client'
import { useEffect, useState } from 'react'
import { useTheme } from '@/lib/ThemeContext'

/* ── shared sub-components ── */

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="cs-section-label">
      <span className="cs-section-label-line" />
      {text}
    </div>
  )
}

function SectionHeading({ text }: { text: string }) {
  return (
    <h3 className="cs-section-heading">
      {text}
    </h3>
  )
}

function BodyText({ children }: { children: React.ReactNode }) {
  return (
    <p className="cs-body-text">
      {children}
    </p>
  )
}

function Callout({ text }: { text: string }) {
  return (
    <div className="cs-callout">{text}</div>
  )
}

function CardGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="cs-card-grid">
      {children}
    </div>
  )
}

function Card({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="cs-card">
      <div className="cs-card-num">{num}</div>
      <div className="cs-card-title">{title}</div>
      <div className="cs-card-desc">{desc}</div>
    </div>
  )
}

function Feature({ num, title, desc }: { num: string; title: string; desc: React.ReactNode }) {
  return (
    <div className="cs-feature">
      <span className="cs-feature-num">{num}</span>
      <div>
        <div className="cs-feature-title">{title}</div>
        <div className="cs-feature-desc">{desc}</div>
      </div>
    </div>
  )
}

function OutcomeGrid({ items, className }: { items: { val: string; label: string }[]; className?: string }) {
  return (
    <div className={`cs-outcome-grid ${className || ''}`}>
      {items.map((o, i) => (
        <div key={i} className="cs-outcome-card">
          <div className="cs-outcome-val">{o.val}</div>
          <div className="cs-outcome-label">{o.label}</div>
        </div>
      ))}
    </div>
  )
}

function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="cs-table-wrap"><table className="cs-table">
      <thead>
        <tr>{headers.map(h => (
          <th key={h} className="cs-th">{h}</th>
        ))}</tr>
      </thead>
      <tbody>{rows.map((r, i) => (
        <tr key={i}>{r.map((cell, j) => (
          <td key={j} className={j === 0 ? 'cs-td-first' : 'cs-td'}>{cell}</td>
        ))}</tr>
      ))}</tbody>
    </table></div>
  )
}

function PhoneFrame({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  const isProd = process.env.NODE_ENV === 'production';
  const basePath = isProd ? '/my_portfolio' : '';
  const finalSrc = src.startsWith('http') || src.startsWith('data:') ? src : `${basePath}${src}`;
  return (
    <div className="cs-phone-frame-container">
      <div className="cs-phone-frame-wrap">
        <img src={finalSrc} alt={alt} loading="lazy" className="cs-phone-frame-img" />
        <div className="cs-phone-frame-caption">{caption}</div>
      </div>
    </div>
  )
}

function FigmaEmbed({ url }: { url: string }) {
  return (
    <div className="cs-figma-container">
      <iframe src={url} className="cs-figma-iframe" allowFullScreen loading="lazy" />
      <div className="cs-figma-footer">
        <span className="cs-figma-text">↖ Pan &amp; zoom inside the frame</span>
      </div>
    </div>
  )
}

/* ── Main component ── */
export default function CaseStudy({ caseKey, onClose }: { caseKey: string | null; onClose: () => void }) {
  const [localCaseKey, setLocalCaseKey] = useState<string | null>(caseKey)

  useEffect(() => {
    if (caseKey) {
      setLocalCaseKey(caseKey)
    }
  }, [caseKey])

  useEffect(() => {
    const fn = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])
  useEffect(() => { document.body.style.overflow = caseKey ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [caseKey])

  const renderContent = () => {
    if (!localCaseKey) return null

    /* ──────────────── SENTINEL ──────────────── */
    if (localCaseKey === 'sentinel') return <>
      <Hero c={{ title: 'SentinelOS', subtitle: 'AI-Assisted Surveillance Intelligence Platform for High-Security Facilities', eyebrow: 'Self-initiated · Enterprise UX · 2026', meta: { Role: 'Product Designer (Solo)', Timeline: '5 Weeks', Type: 'Concept / Self-initiated', Deliverable: 'High-fidelity product concept' }, tags: ['Enterprise UX', 'AI-Assisted Workflows', 'Dashboard Design', 'Systems Thinking', 'Design System', 'UX Research'] }} />

      <Section>
        <SectionLabel text="The Problem" />
        <SectionHeading text="Sustained human attention is unreliable at scale." />
        <BodyText>Traditional surveillance systems are largely passive. Operators continuously scan dozens of feeds, incidents are manually traced, and alerts are reactive. The result: monitoring fatigue, missed incidents, and slow response times — not from lack of infrastructure, but from cognitive overload.</BodyText>
        <Callout text='"How might we help surveillance teams in high-security environments improve situational awareness and reduce monitoring fatigue — without replacing human operators?"' />
      </Section>

      <Section>
        <SectionLabel text="Research Insights" />
        <SectionHeading text="Four findings that shaped the product." />
        <CardGrid>
          <Card num="01" title="Fatigue is the real failure mode" desc="Operators monitoring multiple feeds continuously experience reduced attention, slower detection, and alert desensitization — not equipment failure." />
          <Card num="02" title="Systems prioritize recording, not intelligence" desc="Most platforms are designed for storing footage and reviewing incidents after the fact. Almost none actively help operators prioritize attention in real time." />
          <Card num="03" title="Alert volume destroys trust" desc="When every alert appears critical, operators learn to ignore them. Signal-to-noise ratio becomes the core UX problem — not information availability." />
          <Card num="04" title="AI works best as an assistant" desc="Operators in high-security environments trust systems more when they remain in control of final decisions. Human-in-the-loop is not a limitation — it's a design requirement." />
        </CardGrid>
      </Section>

      <Section>
        <SectionLabel text="The Strategic Shift" />
        <SectionHeading text="Not automation. Augmentation." />
        <BodyText>Most AI surveillance conversations default to automation. But high-security environments rarely trust fully autonomous systems — human verification remains critical.</BodyText>
        <Callout text='Instead of designing "an AI that replaces surveillance personnel" — I designed "an assistive intelligence layer that helps operators make faster and more informed decisions."' />
      </Section>

      <Section>
        <SectionLabel text="Design Principles" />
        <SectionHeading text="Four principles, every decision." />
        <DataTable headers={['Principle', 'Purpose']} rows={[['Assistive Intelligence', 'Support humans, never replace them'], ['Attention Prioritization', 'Surface only operationally important events'], ['Operational Clarity', 'Reduce monitoring complexity, not just visual density'], ['Transparent AI', 'Expose confidence levels and reasoning to improve trust']]} />
      </Section>

      <Section>
        <SectionLabel text="Information Architecture" />
        <SectionHeading text="Five modules, separated by intent." />
        <DataTable headers={['Module', 'Purpose']} rows={[['Live Monitoring', 'Real-time surveillance overview with AI priority surfacing'], ['Incident Intelligence', 'AI-assisted anomaly tracking and cross-camera investigation'], ['Restricted Access', 'Zone-level access visibility and unauthorized movement detection'], ['Operational Analytics', 'Occupancy trends, movement density, restricted-zone heatmaps'], ['Security Administration', 'Permissions management and escalation workflows']]} />
      </Section>

      <Section>
        <SectionLabel text="Key Features" />
        <SectionHeading text="What the system actually does." />
        <Feature num="01" title="AI-Assisted Event Prioritization" desc="Instead of forcing operators to monitor every feed equally, the system identifies unusual movement patterns, unauthorized zone access, prolonged restricted-area presence, and suspicious activity clusters — helping operators focus where it matters most." />
        <Feature num="02" title="Smart Incident Timeline" desc="AI-generated movement timelines, cross-camera subject tracking, and chronological incident summaries replace the historically manual process of tracing events across multiple feeds." />
        <Feature num="03" title="Multi-Level Restricted Access Monitoring" desc="The platform monitors access attempts, unauthorized movement, and unusual zone transitions with clear contextual signals across restricted labs, server rooms, and authorization-based movement areas." />
        <Feature num="04" title="Transparent AI Reasoning" desc='Confidence indicators, alert reasoning, and detection sources are intentionally exposed. Example: "Unusual activity detected due to prolonged stationary presence in Restricted Zone B."' />
      </Section>

      <Section>
        <SectionLabel text="Outcomes" />
        <SectionHeading text="What this project proved." />
        <OutcomeGrid items={[{ val: '5', label: 'Core modules designed end-to-end' }, { val: '4', label: 'Design principles held across every screen' }, { val: '1', label: 'Modular enterprise design system created' }]} />
      </Section>

      <Section last>
        <SectionLabel text="Key Learnings" />
        <SectionHeading text="What this reinforced." />
        <Callout text="AI works best when it augments human capability rather than replacing it. Enterprise systems should optimize attention, not just information density. Trust in AI increases significantly when uncertainty and reasoning are made visible. Good surveillance UX is less about monitoring everything — and more about helping users identify what actually matters." />
      </Section>
    </>

    /* ──────────────── KEKA ──────────────── */
    if (localCaseKey === 'keka') return <>
      <Hero c={{ title: 'Keka Sync Tool', subtitle: 'Enterprise Workforce Attendance Synchronization Platform — a Windows-based infrastructure layer between biometric hardware and attendance management systems.', eyebrow: 'Keka · Enterprise Product · 2026', meta: { Role: 'Product Designer', Timeline: '1 Week', Platform: 'Windows (Desktop App)', Constraint: 'Existing Keka component system' }, tags: ['Enterprise UX', 'Operational Dashboard', 'Device Management', 'Sync Monitoring', 'Windows App', 'Workflow Design'] }} />



      <Section>
        <SectionLabel text="The Context" />
        <SectionHeading text="When scale breaks attendance infrastructure." />
        <BodyText>Large organizations operating across multiple offices, campuses, and floors rely on biometric devices to capture attendance. But at scale — thousands of employees, multiple locations, peak traffic — the challenge shifts from capturing attendance to maintaining reliable synchronization.</BodyText>
        <BodyText>Logs arrive with delays. Records become inconsistent. Devices go offline. Admins struggle to identify failures quickly. The Keka Sync Tool was designed as the infrastructure layer between biometric hardware and the attendance management ecosystem.</BodyText>
        <Callout text='"How might we help enterprise admins manage and synchronize biometric attendance systems reliably across multiple locations and high-traffic environments — while reducing operational complexity?"' />
      </Section>

      <Section>
        <SectionLabel text="Core Realization" />
        <SectionHeading text="Not a hardware problem. An operational workflow problem." />
        <BodyText>One of the most important early discoveries: organizations had wildly different attendance setups based on office layout, employee volume, and hardware constraints.</BodyText>
        <CardGrid>
          <Card num="Setup A" title="Single Device" desc="One biometric device handles both clock-in and clock-out using punch sequence and timing logic. Simpler but creates congestion at scale." />
          <Card num="Setup B" title="Dual Device" desc="Dedicated devices for clock-in and clock-out. Reduces congestion but introduces mapping complexity, synchronization dependency, and device-role management challenges." />
        </CardGrid>
      </Section>

      <Section>
        <SectionLabel text="Research Insights" />
        <SectionHeading text="Findings that shaped the UX direction." />
        <Feature num="01" title="High traffic created synchronization anxiety" desc="During peak hours, thousands of records could arrive within minutes. Admins couldn't distinguish a processing queue from an actual failure. Communicating sync health vs. sync failure became a critical UX problem." />
        <Feature num="02" title="Device mapping was more complex than expected" desc="Different organizations had different office structures, device setups, and attendance workflows. Admins needed flexibility to map devices to locations and assign clock-in/out behavior — without requiring deep technical expertise." />
      </Section>

      <Section>
        <SectionLabel text="User Context" />
        <SectionHeading text="Designing for operational and technical users." />
        <BodyText>Unlike consumer products, the Keka Sync Tool was designed specifically for internal operational teams responsible for configuring biometric devices, monitoring synchronization health, troubleshooting connectivity issues, and managing attendance infrastructure across multiple client locations.</BodyText>
        <Callout text='"The challenge was not: "How do we simplify everything?" — It was: "How do we preserve operational depth while improving clarity, speed, and efficiency?"' />
        <BodyText>Working closely with the internal sync operations team, I learned how real-world attendance infrastructure behaves beyond UI requirements. Technical users don't want oversimplified systems — they want systems that help them operate faster with better visibility and fewer interruptions.</BodyText>
      </Section>

      <Section>
        <SectionLabel text="Core Experience Areas" />
        <SectionHeading text="Four areas, one coherent system." />
        <DataTable headers={['Area', 'What it solved']} rows={[
          ['Centralized Device Management', 'Register devices, map to offices, configure clock-in/out behavior — single and dual device models supported'],
          ['Synchronization Monitoring', 'Structured status indicators, readable alerts, operational summaries — not raw technical logs'],
          ['Log Ordering & Record Integrity', 'Maintained proper attendance sequence during high traffic, simultaneous punches, and network instability'],
          ['Location & Office Mapping', 'Office-level device distribution, infrastructure health by location, scalable hierarchy management']
        ]} />
      </Section>


      <Section>
        <SectionLabel text="Constraints & Execution" />
        <SectionHeading text="One week. Existing components. Smarter decisions." />
        <BodyText>The project was designed and delivered within one week, using Keka's existing design components — maintaining consistency with the broader Keka ecosystem and accelerating implementation speed.</BodyText>
        <Callout text="Good enterprise design is not always about introducing new UI patterns — sometimes it is about making smarter decisions within operational and technical constraints." />
      </Section>

      <Section last>
        <SectionLabel text="Outcomes" />
        <SectionHeading text="What the project delivered." />
        <OutcomeGrid items={[{ val: '4', label: 'Core experience areas designed' }, { val: '1wk', label: 'Full delivery timeline' }, { val: '2×', label: 'Device setups supported' }]} />
      </Section>
    </>

    /* ──────────────── IB DESIGN SYSTEM ──────────────── */
    if (localCaseKey === 'ib') return <>
      <Hero c={{ title: 'InterviewBuddy Design System', subtitle: 'Building a scalable foundation for a multi-product interview preparation platform — one token architecture powering five portals.', eyebrow: 'InterviewBuddy · Design Infrastructure · 2024–Present', meta: { Role: 'Lead Product Designer', Team: 'Product, Engineering, QA', Tools: 'Figma, Tokens Studio', Portals: '5 products' }, tags: ['Design System', 'Design Tokens', 'Component Library', 'Multi-portal', 'Accessibility', 'Scalability'] }} />



      <Section>
        <SectionLabel text="The Scale" />
        <SectionHeading text="One system. Five portals." />
        <BodyText>InterviewBuddy has five distinct portals with different users, different workflows, and different expectations. A single design system had to power all of them without collapsing into rigidity or fragmenting into chaos.</BodyText>
        <div className="cs-ds-map-wrap">
          <div className="cs-ds-map-root">Design System</div>
          <div className="cs-ds-map-portals">
            {['B2C Candidate', 'B2B Candidate', 'B2C Expert', 'B2B Expert', 'Admin Portal'].map(p2 => (
              <div key={p2} className="cs-ds-map-portal">{p2}</div>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <SectionLabel text="The Problem" />
        <SectionHeading text="Consistency is an organizational problem, not a visual one." />
        <div className="cs-stats-grid">
          {[['14', 'Button styles'], ['9', 'Input variations'], ['18', 'Font sizes in use'], ['40+', 'Color shades'], ['5', 'Different portals'], ['0', 'Shared token layer']].map(([val, label]) => (
            <div key={label} className="cs-stats-card">
              <div className="cs-stats-val">{val}</div>
              <div className="cs-stats-label">{label}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionLabel text="Design Principles" />
        <SectionHeading text="Four rules the system never breaks." />
        <CardGrid>
          <Card num="01" title="Clarity First" desc="Interfaces should be easy to scan during interview preparation. Cognitive load during high-stakes moments must be minimized by design." />
          <Card num="02" title="Efficiency Over Decoration" desc="Users come to practice interviews, not admire interfaces. Every visual decision earns its place by helping users get to their goal faster." />
          <Card num="03" title="Consistency Across Portals" desc="Regardless of user role — candidate, expert, or admin — patterns should remain familiar. Switching portals shouldn't mean relearning the product." />
          <Card num="04" title="Accessibility by Default" desc="Accessibility wasn't a final QA step — it was embedded into component creation from day one. Contrast, focus states, and keyboard navigation baked in." />
        </CardGrid>
      </Section>

      <Section>
        <SectionLabel text="Foundations" />
        <SectionHeading text="The layer everything else is built on." />
        <Feature num="01" title="Typography Scale" desc="Rationalized from 18 sizes down to a structured 8-step scale. Each step has a defined role — display, heading, body, label, caption. No more arbitrary sizes." />
        <Feature num="02" title="Color System" desc="Primary, secondary, and full semantic layer — Success, Warning, Error, Info. All colors verified at WCAG AA. Semantic aliases mean the system can be themed without touching components." />
        <Feature num="03" title="Spacing Scale" desc="4px base system: 4, 8, 12, 16, 24, 32, 48, 64. Every component and layout uses tokens from this scale. Arbitrary spacing values are a system violation." />
        <Feature num="04" title="Design Tokens" desc={<>W3C DTCG format. Tokens like <code className="cs-code-token">color.primary.500</code>, <code className="cs-code-token">spacing.md</code>, <code className="cs-code-token">radius.lg</code> allow decisions to scale across products and make future theming trivial.</>} />
      </Section>

      <Section>
        <SectionLabel text="Components" />
        <SectionHeading text="Built for states, not just screenshots." />
        <BodyText>Components weren't designed in isolation — every one was built with its full state matrix: default, hover, focus, disabled, loading, error, and success where applicable.</BodyText>
        <DataTable headers={['Component', 'Why it matters for InterviewBuddy']} rows={[['Buttons', 'Primary, Secondary, Ghost, Danger — all states including loading for async interview booking'], ['Inputs', 'Default, focus, error, success states — used across scheduling, profile, and payment forms'], ['Tables', 'Interview history, candidate reports, admin operations — sortable, paginated, density-aware'], ['Status Badges', 'Scheduled, Completed, Missed, Rescheduled, Cancelled — product-specific states baked in'], ['Modals', 'Confirmation, destructive, information — consistent sizing and overlay behavior'], ['Tabs', 'Horizontal and vertical, used across portal navigation and content filtering']]} />
      </Section>

      <Section>
        <SectionLabel text="Complex Patterns" />
        <SectionHeading text="Where system thinking shows up most." />
        <BodyText>Components are the vocabulary. Patterns are the grammar. These three patterns appear across multiple portals and encode the most important flows in the product.</BodyText>
        <CardGrid>
          <Card num="Pattern 01" title="Scheduling Flow" desc="Used across Mock Interviews, Resume Reviews, and Portfolio Reviews. Same slot-selection, confirmation, and rescheduling pattern — different portal, same components." />
          <Card num="Pattern 02" title="Feedback Report" desc="Powers both AI Review and Expert Review outputs. Structured score display, category breakdowns, and recommendation sections — consistent regardless of feedback source." />
          <Card num="Pattern 03" title="Payment Flow" desc="Candidate and Admin portal share the same payment pattern. Plan selection, order summary, confirmation — one pattern, two contexts." />
        </CardGrid>
      </Section>

      <Section>
        <SectionLabel text="Designer-Developer Collaboration" />
        <SectionHeading text="The system only works if engineers can use it." />
        <BodyText>The Figma file is structured into four layers: Foundations → Components → Patterns → Templates. Naming conventions mirror what engineers see in code. Token names are identical between Figma and implementation — no translation layer, no misalignment.</BodyText>
        <Callout text="Accessibility wasn't treated as a final QA step. It was embedded into component creation from day one — contrast ratios verified, focus states designed, keyboard navigation documented alongside every component spec." />
      </Section>

      <Section last>
        <SectionLabel text="Impact" />
        <SectionHeading text="What changed after the system shipped." />
        <OutcomeGrid items={[{ val: '↓40%', label: 'Design time per new screen' }, { val: '↓70%', label: 'UI inconsistencies flagged in QA' }, { val: '2×', label: 'Faster new screen creation' }]} />
        <BodyText>Developer clarifications dropped significantly. New designers onboarded faster. And for the first time, a design decision made in one portal automatically applied to the others — because they were all reading from the same token layer.</BodyText>
      </Section>
    </>

    /* ──────────────── IB AI ──────────────── */
    if (localCaseKey === 'ibai') return <>
      <Hero c={{ title: 'InterviewBuddy AI', subtitle: 'Designing a Conversational Commerce Experience for Career Growth — not a chatbot, but an AI-powered conversion engine that helps users discover the right career service and take action.', eyebrow: 'InterviewBuddy · AI Product · 2024–Present', meta: { Role: 'Product Designer', Platform: 'Mobile App (iOS + Android)', Type: '0→1 Product · MVP', Status: 'Under Development' }, tags: ['Conversational AI', 'Mobile UX', '0→1 Product', 'RAG Architecture', 'Conversion Design', 'AI Flows'], isMVP: true }} />



      <Section>
        <SectionLabel text="The Real Problem" />
        <SectionHeading text="Users think in problems, not products." />
        <BodyText>InterviewBuddy offers AI Mock Interviews, Expert Mock Interviews, Resume Reviews, Skill Assessments, and Portfolio Reviews. But users arriving at the platform often couldn't answer one simple question: what should I do next? The result: decision paralysis, lower conversion, and users leaving without taking action.</BodyText>
        <Callout text={"\"I have an interview next week.\" · \"Can someone check my resume?\" · \"I don't know if I'm ready.\" — Users think in problems. Traditional navigation assumes they know what they want."} />
      </Section>

      <Section>
        <SectionLabel text="Key Decisions" />
        <SectionHeading text="Four critical design decisions that shaped the experience." />
        <div className="decisions-multi-grid">
          <div className="decision-card">
            <SectionLabel text="Decision 01" />
            <div className="decision-grid">
              <div>
                <SectionHeading text="Why conversational AI instead of traditional navigation?" />
                <BodyText>Traditional navigation assumes users know what they're looking for. Our users don't — they arrive with problems, not product names. A conversational AI approach translates user problems into relevant services by understanding intent, asking follow-up questions, and recommending the right service.</BodyText>
                <Callout text="Outcome: Reduced cognitive load and simplified product discovery. Users no longer need to understand our product taxonomy — they just describe their situation." />
              </div>
              <div className="decision-img">
                <PhoneFrame src="/ib-ai-screen-1.webp" alt="Home screen — Discovery" caption="Home · Discovery" />
              </div>
            </div>
          </div>

          <div className="decision-card">
            <SectionLabel text="Decision 02" />
            <div className="decision-grid">
              <div>
                <SectionHeading text="We didn't go with a regular chat." />
                <BodyText>Open-ended chat creates uncertainty. Users don't know what to ask, ask incomplete questions, and get lost in long conversations. We designed a guided conversational framework — the AI asks one question at a time while presenting relevant options and always allowing custom responses.</BodyText>
                <Callout text="Design Principle: Freedom where it matters, structure where it helps. The experience feels conversational without becoming an unstructured chatbot." />
              </div>
              <div className="decision-img">
                <PhoneFrame src="/ib-ai-screen-2.webp" alt="Intent capture" caption="Intent capture" />
              </div>
            </div>
          </div>

          <div className="decision-card">
            <SectionLabel text="Decision 03" />
            <div className="decision-grid">
              <div>
                <SectionHeading text="One question at a time — no chat history." />
                <BodyText>Users weren't coming for ongoing conversations. They came to accomplish a task. Persistent chat history introduces cognitive overload, irrelevant context, and longer recovery times. We designed the experience around current intent rather than persistent threads.</BodyText>
                <Callout text="Design Principle: Users care about progress, not conversation logs. Faster task completion, reduced interface complexity." />
              </div>
              <div className="decision-img">
                <PhoneFrame src="/ib-ai-screen-3.webp" alt="Context qualification" caption="Context qualification" />
              </div>
            </div>
          </div>

          <div className="decision-card">
            <SectionLabel text="Decision 04" />
            <div className="decision-grid">
              <div>
                <SectionHeading text="Why add instant AI interviews inside the app?" />
                <BodyText>A user is unlikely to install an app whose sole purpose is helping them decide what to purchase. We introduced Instant AI Interviews directly inside the app — giving users immediate value and creating a high-frequency utility.</BodyText>
                <Callout text="Strategic shift: The app evolved from a sales channel to a career preparation companion. Higher downloads, session frequency, retention, and upsell opportunities." />
              </div>
              <div className="decision-img">
                <PhoneFrame src="/ib-ai-screen-4.webp" alt="AI Interview in session" caption="AI Interview · In session" />
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <SectionLabel text="State Machine" />
        <SectionHeading text="Designed as a state machine, not random prompts." />
        <BodyText>The conversation was designed with deliberate states — each one with a defined purpose, transition condition, and business outcome. This is what separates a product-grade AI experience from a demo.</BodyText>
        <CardGrid>
          <Card num="State 01" title="Idle / Discovery" desc="Entry point. AI surfaces a warm prompt based on user profile or time of day. Goal: initiate intent capture without pressure." />
          <Card num="State 02" title="Intent Capture" desc="One-question-at-a-time qualification. AI identifies the user's core goal — interview prep, skill gap, resume review, or general readiness." />
          <Card num="State 03" title="Context Qualification" desc="Gathers timeline, role, experience level. Each answer refines the recommendation. RAG-based prompt orchestration ensures personalization." />
          <Card num="State 04" title="Value Framing" desc="AI presents the recommended service with a clear value proposition tied to the user's specific situation — not a generic product description." />
          <Card num="State 05" title="Payment Prompt" desc="Seamless handoff to purchase. Friction minimized. Context from the conversation carries into the booking flow." />
          <Card num="Support" title="Upsell / Recovery" desc="Supporting states for upsell opportunities, payment recovery, and re-engagement — each designed to feel helpful, not pushy." />
        </CardGrid>
      </Section>

      <Section>
        <SectionLabel text="Outcomes" />
        <SectionHeading text="What this unlocks for the business." />
        <div className="cs-outcome-clean">
          <div>
            <div className="cs-outcome-clean-val">0→1</div>
            <div className="cs-outcome-clean-label">Full product designed from scratch</div>
          </div>
          <div>
            <div className="cs-outcome-clean-val">5</div>
            <div className="cs-outcome-clean-label">Conversation states designed as a system</div>
          </div>
          <div>
            <div className="cs-outcome-clean-val">↑</div>
            <div className="cs-outcome-clean-label">Engagement, retention & upsell opportunities</div>
          </div>
        </div>
      </Section>

      <Section last>
        <SectionLabel text="Reflection" />
        <SectionHeading text="Beyond screen design." />
        <div className="cs-callout">
          <p className="cs-callout-bold">
            This project challenged me to think beyond screen design and design an AI-driven decision-making system.
          </p>
          <p className="cs-callout-text-mid">
            Rather than creating another chatbot, I designed a conversational commerce experience that balances user goals, business objectives, and AI capabilities. The result was a scalable framework capable of guiding users from uncertainty to action — while creating meaningful opportunities for engagement, retention, and revenue growth.
          </p>
        </div>
      </Section>
    </>


    /* ──────────────── IB TOPIC & PRICING SYSTEM ──────────────── */
    if (localCaseKey === 'ib-pricing') return <>
      <div className="cs-hero">
        <div className="cs-eyebrow">InterviewBuddy · B2C SaaS</div>
        <h2 className="cs-title">Designing a Scalable Topic and Pricing System</h2>
        <p className="cs-subtitle">From fragmented operations and rigid pricing to a scalable topic management system that improved operational efficiency and customer discovery.</p>
        <div className="cs-meta-row">
          <div className="cs-meta-item"><span className="cs-meta-key">Role</span><span className="cs-meta-val">Product Designer</span></div>
          <div className="cs-meta-item"><span className="cs-meta-key">Platform</span><span className="cs-meta-val">Web (Admin + Consumer)</span></div>
          <div className="cs-meta-item"><span className="cs-meta-key">Status</span><span className="cs-meta-val">Shipped</span></div>
        </div>
        <div className="cs-tags">
          <span className="cs-tag">B2C SaaS</span>
          <span className="cs-tag">Pricing System</span>
          <span className="cs-tag">Admin Portal</span>
          <span className="cs-tag">Topic Management</span>
          <span className="cs-tag">UX Design</span>
        </div>
        {/* NDA callout */}
        <div style={{ marginTop: '24px', padding: '16px 20px', background: 'rgba(234,179,8,0.06)', border: '1px solid rgba(234,179,8,0.2)', borderRadius: '12px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '14px', flexShrink: 0, marginTop: '1px' }}>⚠</span>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--cs-text-mid)', lineHeight: 1.65, margin: 0 }}>
            <strong style={{ color: 'rgba(234,179,8,0.9)' }}>This project is covered under NDA.</strong> What I've shared here reflects my thinking process across problem framing, research, and design decisions. Detailed designs, workflows, metrics, and implementation specifics are not included.
          </p>
        </div>
      </div>

      <div className="cs-body">
        {/* Overview */}
        <div className="cs-section" style={{ borderTop: 'none', paddingTop: '36px' }}>
          <div className="cs-section-label">Overview</div>
          <p className="cs-body-text">InterviewBuddy offers two primary offerings: <strong style={{ color: 'var(--cs-text-hi)' }}>Meet with Expert</strong> (live 1:1 sessions) and <strong style={{ color: 'var(--cs-text-hi)' }}>One Way</strong> (AI-evaluated or template-based asynchronous interviews). With 300+ topics spanning diverse domains, the platform had been operating without a coherent pricing or topic management infrastructure. Ops teams relied on Excel sheets and fragmented CRMs to manage everything manually.</p>
        </div>

        {/* Problem */}
        <div className="cs-section">
          <div className="cs-section-label" style={{ color: '#EF4444' }}>Problem</div>
          <h3 className="cs-section-title">A single price for everything was causing silent revenue loss.</h3>
          <p className="cs-body-text" style={{ marginBottom: '24px' }}>The platform used one flat price across all topics for each offering. This worked until high-value topics — particularly research-domain expert sessions — began generating orders at a price point far below what experts actually charged. The ops team had no mechanism to handle this. They were often forced to absorb higher expert costs or manually intervene in bookings, creating operational friction and unpredictable margins.</p>
          <div className="cs-card-grid">
            <div className="cs-card">
              <div className="cs-card-num" style={{ color: '#EF4444' }}>↘</div>
              <div className="cs-card-title">Revenue leakage</div>
              <div className="cs-card-desc">Fixed pricing could not account for expert cost variation across domains.</div>
            </div>
            <div className="cs-card">
              <div className="cs-card-num" style={{ color: '#EF4444' }}>⊞</div>
              <div className="cs-card-title">No admin tools</div>
              <div className="cs-card-desc">Ops managed topics, pricing, and bookings via Excel and fragmented CRMs.</div>
            </div>
            <div className="cs-card">
              <div className="cs-card-num" style={{ color: '#EF4444' }}>⊙</div>
              <div className="cs-card-title">Poor discoverability</div>
              <div className="cs-card-desc">Customers had to type full topic names to book, with no structured search experience.</div>
            </div>
            <div className="cs-card">
              <div className="cs-card-num" style={{ color: '#EF4444' }}>⏱</div>
              <div className="cs-card-title">Manual scheduling</div>
              <div className="cs-card-desc">One Way interviews required ops involvement despite needing no human expert.</div>
            </div>
          </div>
        </div>

        {/* Research */}
        <div className="cs-section">
          <div className="cs-section-label" style={{ color: 'var(--lime)' }}>Research</div>
          <p className="cs-body-text" style={{ marginBottom: '28px' }}>Working sessions were facilitated with stakeholders and the ops team to understand how they thought about topics and pricing. The goal was to surface existing mental models rather than impose new ones.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="ibp-insight-card">
              <div className="ibp-insight-num">01</div>
              <div>
                <div className="ibp-insight-title">Individual pricing per topic was rejected early</div>
                <div className="ibp-insight-desc">With 300+ topics and 3 offering types each, managing roughly 900 price entries was operationally infeasible. Any solution had to scale without constant manual updates.</div>
              </div>
            </div>
            <div className="ibp-insight-card">
              <div className="ibp-insight-num">02</div>
              <div>
                <div className="ibp-insight-title">Stakeholders naturally grouped topics into two pricing tiers</div>
                <div className="ibp-insight-desc">When asked how they would bucket topics, stakeholders consistently separated them into standard topics and higher-demand specialist domains. This existing mental model became the foundation for the Classic and Premium classification, grounding the system in how the business already thought about value.</div>
              </div>
            </div>
            <div className="ibp-insight-card">
              <div className="ibp-insight-num">03</div>
              <div>
                <div className="ibp-insight-title">A small set of truly exclusive topics existed</div>
                <div className="ibp-insight-desc">These were niche domains where experts commanded above-market rates. They did not fit even the Premium tier and needed a separate mechanism for flexibility.</div>
              </div>
            </div>
            <div className="ibp-insight-card">
              <div className="ibp-insight-num">04</div>
              <div>
                <div className="ibp-insight-title">A/B testing revealed a counter-intuitive insight</div>
                <div className="ibp-insight-desc">A minimal search-first hero outperformed visually richer versions with imagery and animation. Users who came with intent converted better when the search box was front and center.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Solution */}
        <div className="cs-section">
          <div className="cs-section-label" style={{ color: '#22C55E' }}>Solution</div>
          <h3 className="cs-section-title">Four interconnected design decisions.</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '8px' }}>
            <div className="ibp-solution-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className="ibp-solution-tag">Classic and Premium</span>
                <span className="ibp-solution-num">01</span>
              </div>
              <div className="ibp-solution-title">Topic Classification System</div>
              <div className="ibp-solution-desc">Each topic is assigned a classification at the time of creation. This maps to a default price for each offering type: Meet with Expert, One Way (AI), and One Way (Template). Ops manages 6 price points instead of 900+. When a topic's classification changes, prices update automatically across the board.</div>
            </div>
            <div className="ibp-solution-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className="ibp-solution-tag">Flexible pricing for specialist domains</span>
                <span className="ibp-solution-num">02</span>
              </div>
              <div className="ibp-solution-title">Premium Hike for Exclusive Topics</div>
              <div className="ibp-solution-desc">For top-tier specialist topics, a percentage-based hike can be applied on top of the Premium price. This gives ops flexibility for high-demand domains without creating an entirely new pricing tier. The hike is visible to customers before booking.</div>
            </div>
            <div className="ibp-solution-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className="ibp-solution-tag">Backed by new topic taxonomy</span>
                <span className="ibp-solution-num">03</span>
              </div>
              <div className="ibp-solution-title">Smart Topic Search as Homepage Hero</div>
              <div className="ibp-solution-desc">A structured topic search replaced the previous static homepage. Customers can now discover sessions by domain, role, or keyword instead of typing exact topic names. Placed as the hero based on A/B test results showing higher intent-driven conversions.</div>
            </div>
            <div className="ibp-solution-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className="ibp-solution-tag">Fully self-serve, zero ops steps</span>
                <span className="ibp-solution-num">04</span>
              </div>
              <div className="ibp-solution-title">Automated One Way Scheduling</div>
              <div className="ibp-solution-desc">One Way interviews no longer route through the ops team for scheduling. Since no human expert is involved, the flow was redesigned to be fully self-serve. Customers book, receive access, and complete their session without any manual ops involvement.</div>
            </div>
          </div>
        </div>

        {/* Impact */}
        <div className="cs-section">
          <div className="cs-section-label">Impact</div>
          <div className="cs-outcomes" style={{ marginBottom: '24px' }}>
            <div className="cs-outcome">
              <div className="cs-outcome-val">6</div>
              <div className="cs-outcome-label">Pricing rules</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--cs-text-lo)', marginTop: '2px' }}>Down from 900+</div>
            </div>
            <div className="cs-outcome">
              <div className="cs-outcome-val">0</div>
              <div className="cs-outcome-label">Manual ops steps</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--cs-text-lo)', marginTop: '2px' }}>One Way scheduling</div>
            </div>
            <div className="cs-outcome">
              <div className="cs-outcome-val">300+</div>
              <div className="cs-outcome-label">Structured topics</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--cs-text-lo)', marginTop: '2px' }}>Searchable and scalable</div>
            </div>
            <div className="cs-outcome">
              <div className="cs-outcome-val">↑</div>
              <div className="cs-outcome-label">Conversion rate</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--cs-text-lo)', marginTop: '2px' }}>Search-first hero</div>
            </div>
          </div>
          <div className="cs-callout">The ops team now manages topics, classifications, and pricing from a single admin portal instead of spreadsheets and CRMs. The classification model reduced pricing complexity, addressed recurring margin challenges for specialist topics, and improved topic discovery through a search-first booking experience.</div>
        </div>

        {/* Closing quote */}
        <div className="cs-section" style={{ borderBottom: 'none', paddingBottom: '60px' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--cs-text-lo)', lineHeight: 1.8, fontStyle: 'italic' }}>"This module demonstrates how I approached product design beyond interfaces by balancing business constraints, operational workflows, pricing strategy, and customer experience within a growing 0→1 B2C platform. It was one of several systems I designed as part of InterviewBuddy's broader product ecosystem."</p>
        </div>
      </div>
    </>


    /* ──────────────── MCSF ──────────────── */
    if (localCaseKey === 'mcsf') return <>
      <Hero c={{
        title: 'From Monoliths to Modules: MCSF',
        subtitle: 'A capability-based service framework that turned rigid interview-prep offerings into composable products — enabling same-day B2B configuration and collapsing 900 pricing entries to 6.',
        eyebrow: 'InterviewBuddy · Platform Architecture · B2B + B2C',
        meta: { Role: 'Senior Product Designer', Scope: 'Platform · B2B Admin · B2C Storefront', Team: 'Product, Engineering', Timeline: '3 Months' },
        tags: ['Platform Architecture', 'B2B Admin UX', 'Pricing System', 'B2C SaaS', 'Information Architecture', 'Service Design'],
      }} />

      <Section>
        <div className="cs-nda-callout">
          <span className="cs-nda-icon">🔒</span>
          <p><strong>This project is covered under NDA.</strong> What I've shared here reflects my thinking process across problem framing, research, and design decisions. Detailed designs, workflows, metrics, and implementation specifics are not included.</p>
        </div>
      </Section>

      <Section>
        <SectionLabel text="TL;DR" />
        <SectionHeading text="Five monoliths became 11 atoms." />
        <BodyText>Our platform sold five interview-preparation services, each built as a rigid, standalone unit. When B2B clients began demanding custom bundles and B2C candidates asked for packs, the architecture couldn't deliver either.</BodyText>
        <BodyText>I led the design of MCSF (Modular Capabilities-based Services Framework): we decomposed all five services into 11 atomic capabilities and rebuilt the service layer as compositions of those atoms.</BodyText>
        <OutcomeGrid items={[
          { val: 'Same-day', label: 'Custom B2B service launch — was weeks of engineering' },
          { val: '6', label: 'Global price points — down from 900+ manual entries' },
          { val: '0', label: 'Ops intervention on configured-topic bookings' },
          { val: '11', label: 'Atomic capabilities powering every service' },
        ]} />
      </Section>

      <Section>
        <SectionLabel text="Context" />
        <SectionHeading text="Five services. All monoliths." />
        <BodyText>The platform offered five services to job candidates and B2B organizations: one-on-one interviews with experts, one-way template-based interviews, one-way AI interviews, resume reviews, and LinkedIn profile reviews. Each service was a monolith — designed, built, priced, and sold as a single indivisible unit.</BodyText>
        <BodyText>This worked while customers bought services individually. Then two pressures arrived almost simultaneously.</BodyText>
        <CardGrid>
          <Card num="Pressure 01" title="B2B wanted bundles and customization" desc='"We want a branded mock interview, followed by expert feedback, plus an assessment — packaged as one program." Every custom deal became an engineering project. Sales could only sell what was already built.' />
          <Card num="Pressure 02" title="B2C candidates wanted packs" desc="Individual users asked for bundled journeys — but the same architectural rigidity blocked us there too. The same root cause sat underneath both: services couldn't be opened up." />
        </CardGrid>
      </Section>

      <Section>
        <SectionLabel text="The Insight" />
        <SectionHeading text="Services are compositions." />
        <BodyText>The breakthrough came from a mapping exercise. Instead of asking "how do we combine services?", we asked "what are services actually made of?"</BodyText>
        <DataTable
          headers={['Existing Service', 'What it decomposed into']}
          rows={[
            ['One-on-one interview', 'Meeting + Expert feedback + Candidate feedback'],
            ['One-way interview', 'One-way recording + Candidate feedback + AI feedback report'],
            ['Resume review', 'Data input + Meet with expert'],
            ['LinkedIn review', 'Data input + Meet with expert'],
          ]}
        />
        <BodyText>Every service was a recipe — a logical grouping of smaller, reusable capabilities. Once mapped, we added net-new capabilities the monoliths could never have supported: Code with AI, Assessments (MCQ and comprehensive tests), Overall expert feedback, and Chat.</BodyText>
        <Callout text="Decompose once, recombine infinitely. Capabilities are the atoms; every service — existing, custom, or future — is a configuration, not a build." />
        <BodyText>This was fundamentally an information-architecture redesign. The screens changed later; the object model changed first.</BodyText>
      </Section>

      <Section>
        <SectionLabel text="B2B Experience" />
        <SectionHeading text="Service templates: composition for enterprise clients." />
        <BodyText>B2B was the forcing function, so we designed for it first. The composition flow: Service Template → Sets → Capabilities (each configured) → Publish → Service Group. An admin creates a service template for an org. Inside it, capabilities are organized into sets — logical groupings named in the org's own language.</BodyText>
        <Feature num="01" title="Attempt availability — encoding domain logic into the system" desc="Every capability needs a rule for when a candidate can attempt it: Fixed (scheduled slot), Time-range (attempt within a window), or Until service expiry. One deliberate constraint: one-on-one meetings are always Fixed. Rather than documenting this as a guideline, the system enforces it. Admins can't create logically broken states. Constraints in the system, not in training material." />
        <Feature num="02" title="Dependencies — sequencing without a Gantt chart" desc="Real services have order: an expert can't give feedback on a meeting that hasn't happened. Capabilities support dependencies — e.g., Expert Feedback opens when the Meeting completes, and expires X days after its start. Admins can also choose fixed start dates. The design challenge: making 'this thing's window is relative to that thing's completion' legible without exposing scheduling-engine internals." />
        <Feature num="03" title="Display names — separating system language from candidate language" desc='Internally, a capability is "Meeting." To a candidate in a B2B program, it should read "TCS Mock Interview." Every capability gets an admin-chosen display name — letting B2B orgs fully brand their programs while keeping our internal taxonomy from leaking into candidate-facing surfaces.' />
        <Feature num="04" title="Expert payment — configuration that ripples downstream" desc="While adding a capability, admins flag whether an expert is paid for it. If yes, a payment-rate option surfaces later during expert assignment. A single checkbox at template-creation time reshapes the ops workflow weeks later." />
      </Section>

      <Section>
        <SectionLabel text="B2C Experience" />
        <SectionHeading text="Offerings, topics, and a pricing system that finally scales." />
        <BodyText>For B2C we kept the same foundation but named services "offerings" to avoid internal conflict with the B2B vocabulary. All five original services — plus assessments — were rebuilt as offerings composed from the same 11 capabilities.</BodyText>
        <BodyText>One new concept emerged: when creating an offering, we designate a main service versus customization capabilities. Customizations surface on the website as add-ons — e.g., expert feedback as an add-on to a one-way AI interview, with feedback parameters importable from that interview.</BodyText>
      </Section>

      <Section>
        <SectionLabel text="The Pricing Problem" />
        <SectionHeading text="900 entries nobody could maintain → 6 price points." />
        <BodyText>The platform had 300+ topics, each potentially offered through 3 offering types. That's roughly 900 price entries to create and maintain manually. Any topic launch or price revision was an ops bottleneck. The solution had to scale without constant manual updates.</BodyText>
        <BodyText>Research grounded the answer: when I asked stakeholders how they bucketed topics, a consistent mental model emerged — standard topics versus higher-demand specialist domains. Rather than inventing a pricing taxonomy, I built the system on the model the business already used.</BodyText>
        <CardGrid>
          <Card num="Tier 01" title="Classic / Premium classification" desc="Assigned at topic creation. Each classification maps to a default price per offering type — ops manages 6 global price points instead of 900+. Reclassify a topic, prices update everywhere automatically." />
          <Card num="Tier 02" title="Percentage-based hike for specialist topics" desc="For top-tier domains exceeding even Premium economics. Applied on top of the Premium price, visible to customers before booking — flexibility for outlier domains without inventing a third tier." />
        </CardGrid>
      </Section>

      <Section>
        <SectionLabel text="Topics as Infrastructure" />
        <SectionHeading text="Configure once, automate forever." />
        <BodyText>A topic (say, Product Design) is created, classified (pricing auto-pulled from global classifications), and offerings are configured inside it. For a one-way AI interview: number of questions, duration per question, attempts per question, AI interview prompt — configured per experience range (0–2, 2–5, 5–10 … 35+ years).</BodyText>
        <BodyText>The payoff: after a topic is set up, every future booking on that topic schedules itself — zero ops intervention. Ops only steps in where a human expert must be matched and payment rates assigned.</BodyText>
      </Section>

      <Section>
        <SectionLabel text="Baskets" />
        <SectionHeading text="Bundles for B2C — on the same foundation as B2B." />
        <BodyText>Baskets are the B2C mirror of service templates: bundles organized by experience range, where each experience range is a basket. Each basket offers three predefined bundles plus an à-la-carte builder, with pricing keyed to the chosen basket. The bundles B2C candidates had been asking for finally shipped — on the same composable foundation as B2B, not as a parallel system.</BodyText>
      </Section>

      <Section>
        <SectionLabel text="Trade-offs" />
        <SectionHeading text="Complexity didn't disappear — it moved." />
        <CardGrid>
          <Card num="Trade-off 01" title="Complexity shifted to configuration" desc="MCSF transferred complexity from engineering into configuration. The admin now carries significant conceptual load: capabilities, sets, dependencies, attempt types, payment flags, per-experience-range settings." />
          <Card num="Trade-off 02" title="Vocabulary debt" desc='Running "services" (B2B) and "offerings" (B2C) on one foundation avoided internal conflict but created a translation tax in cross-team conversations. With hindsight, I would push harder for one shared vocabulary earlier.' />
        </CardGrid>
      </Section>

      <Section last>
        <SectionLabel text="Why This Matters" />
        <SectionHeading text="Design the object model before the interface." />
        <Callout text="MCSF is a case for designing the object model before the interface. The highest-leverage design decision wasn't a screen — it was redefining the platform's atomic unit from 'service' to 'capability.' Everything customers eventually saw — bundles, add-ons, branded programs, transparent specialist pricing — became possible because of that one structural choice, and cheap because configuration replaced construction." />
      </Section>
    </>

    return null
  }

  return <>
    {/* Backdrop */}
    <div
      onClick={onClose}
      className={`cs-backdrop ${caseKey ? 'is-active' : ''}`}
    />

    {/* Bottom-sheet modal */}
    <div className={`cs-modal-container ${caseKey ? 'is-active' : ''}`}>
      <div className="modal-wrap">
        <div
          className={`cs-modal-sheet ${caseKey ? 'is-active' : ''}`}
          onTransitionEnd={() => {
            if (!caseKey) {
              setLocalCaseKey(null)
            }
          }}
        >
          {localCaseKey && <>
            {/* Handle + Topbar */}
            <div className="cs-modal-header">
              {/* Drag handle */}
              <div className="cs-modal-drag-wrap">
                <div className="cs-modal-drag-handle" />
              </div>
              {/* Topbar row */}
              <div className="modal-topbar">
                <span className="cs-modal-title">
                  Case Study
                </span>
                <button onClick={onClose} className="cs-close-btn">
                  ✕ Close
                </button>
              </div>
            </div>

            {/* Scrollable content */}
            <div className="modal-content">
              {renderContent()}
            </div>
          </>}
        </div>
      </div>
    </div>
  </>
}

/* ── Layout helpers ── */
function Section({ children, last }: { children: React.ReactNode; last?: boolean }) {
  return (
    <div className={last ? 'cs-section-last' : 'cs-section'}>
      {children}
    </div>
  )
}

interface HeroData {
  title: string; subtitle: string; eyebrow: string;
  meta: Record<string, string>; tags: string[]; isMVP?: boolean
}
function Hero({ c }: { c: HeroData }) {
  return (
    <div className="cs-hero">
      <div className="cs-hero-bg-text">OS</div>

      <div className="cs-hero-eyebrow-wrap">
        <div className="cs-hero-eyebrow">
          <span className="cs-hero-eyebrow-line" />
          {c.eyebrow}
        </div>
        {c.isMVP && <span className="cs-mvp-tag">MVP</span>}
      </div>

      <h2 className="cs-hero-title">{c.title}</h2>
      <p className="cs-hero-subtitle">{c.subtitle}</p>

      <div className="cs-meta-row">
        {Object.entries(c.meta).map(([k, v]) => (
          <div key={k}>
            <div className="cs-meta-label">{k}</div>
            <div className="cs-meta-val">{v}</div>
          </div>
        ))}
      </div>

      <div className="cs-tag-row">
        {c.tags.map(t => (
          <span key={t} className="cs-tag-item">{t}</span>
        ))}
      </div>
    </div>
  )
}

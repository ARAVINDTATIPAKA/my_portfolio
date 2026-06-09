'use client'

import { useTheme } from '@/lib/ThemeContext'

export default function IDCard() {
  const { theme } = useTheme()
  const isFunky = theme === 'funky'
  const accent = isFunky ? '#E8FF6B' : '#0891B2'
  const cardBg = isFunky ? '#1C1917' : '#FFFFFF'
  const textHi = isFunky ? '#F5F5F4' : '#1C1917'
  const textMid = isFunky ? '#78716C' : '#A8A29E'
  const textLo = isFunky ? '#57534E' : '#A8A29E'
  const divider = isFunky ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)'
  const border = isFunky ? 'rgba(232,255,107,0.12)' : 'rgba(8,145,178,0.15)'
  const shadow = isFunky
    ? '0 24px 64px rgba(0,0,0,0.4),0 0 0 1px rgba(255,255,255,0.04)'
    : '0 24px 64px rgba(0,0,0,0.1),0 0 0 1px rgba(0,0,0,0.04)'

  return (
    <div style={{
      position:'absolute', top:0, right:520, zIndex:10,
      display:'flex', justifyContent:'center', pointerEvents:'none',
    }}>
      {/* Drop wrapper — translateY entry only */}
      <div style={{
        display:'flex', flexDirection:'column', alignItems:'center',
        animation:'dropBounce 1.5s cubic-bezier(0.22,1,0.36,1) forwards',
        pointerEvents:'all',
      }}>
        {/* Swing wrapper — rotates left→right after drop, pivots from top */}
        <div style={{
          display:'flex', flexDirection:'column', alignItems:'center',
          transformOrigin:'top center',
          animation:'cardSwingIn 2s ease-in-out 1.5s',
        }}>
          {/* Lanyard */}
          <div style={{
            width:2, height:400, flexShrink:0, borderRadius:1,
            background:'linear-gradient(to bottom,rgba(168,162,158,0.9),rgba(120,113,108,0.7))',
            position:'relative',
          }}>
            <div style={{
              position:'absolute', top:-7, left:'50%', transform:'translateX(-50%)',
              width:12, height:12, borderRadius:'50%',
              background:'#57534E', border:'2px solid #78716C',
            }} />
          </div>

          {/* Card */}
          <div style={{
            width:240, background:cardBg, borderRadius:16,
            border:`1px solid ${border}`, overflow:'hidden',
            boxShadow:shadow, flexShrink:0,
            animation:'idSway 4s ease-in-out 2.9s infinite',
          }}>
            {/* Top bar */}
            <div style={{
              display:'flex', alignItems:'center', justifyContent:'space-between',
              padding:'12px 16px 10px', background:accent,
            }}>
              <span style={{
                fontFamily:'var(--font-display)', fontWeight:700, fontSize:10,
                textTransform:'uppercase', letterSpacing:'0.1em',
                color: isFunky ? '#1C1917' : '#fff',
              }}>Product Designer</span>
              <span style={{
                fontFamily:'var(--font-mono)', fontSize:9,
                color: isFunky ? 'rgba(28,25,23,0.55)' : 'rgba(255,255,255,0.6)',
              }}>#2021–NOW</span>
            </div>

            {/* Body */}
            <div style={{ padding:'16px 16px 14px' }}>
              <div style={{
                width:48, height:48, borderRadius:'50%', marginBottom:12,
                display:'flex', alignItems:'center', justifyContent:'center',
                fontFamily:'var(--font-display)', fontWeight:700, fontSize:16,
                color:accent,
                background: isFunky ? 'rgba(232,255,107,0.1)' : 'rgba(8,145,178,0.08)',
                border: `1.5px solid ${isFunky ? 'rgba(232,255,107,0.25)' : 'rgba(8,145,178,0.2)'}`,
              }}>AT</div>
              <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:15, letterSpacing:'-0.03em', color:textHi, marginBottom:2 }}>Aravind Tatipaka</div>
              <div style={{ fontFamily:'var(--font-body)', fontSize:10, color:'#78716C', marginBottom:14 }}>{'Product & UI/UX Designer · 5+ yrs'}</div>
              <div style={{ height:1, background:divider, marginBottom:12 }} />
              {[['Based','Visakhapatnam, India'],['Current','InterviewBuddy™'],['Prev','Keka HR'],['Focus','SaaS · AI · Design Systems']].map(([k,v]) => (
                <div key={k} style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:9, textTransform:'uppercase', letterSpacing:'0.1em', color:textLo, width:52, flexShrink:0 }}>{k}</span>
                  <span style={{ fontFamily:'var(--font-body)', fontSize:11, color:textMid }}>{v}</span>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div style={{
              display:'flex', alignItems:'center', justifyContent:'space-between',
              padding:'10px 16px 14px',
              borderTop:`1px solid ${divider}`,
            }}>
              <div style={{ display:'flex', gap:2, alignItems:'flex-end', height:20 }}>
                {[22,14,20,10,18,22,12,16,20,8,22,18,14,20,22].map((h,i) => (
                  <span key={i} style={{ display:'block', width:2, borderRadius:1, height:h, background: isFunky ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }} />
                ))}
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:5, fontFamily:'var(--font-mono)', fontSize:9, textTransform:'uppercase', letterSpacing:'0.08em', color:accent }}>
                <span style={{ width:5, height:5, borderRadius:'50%', background:accent, animation:'dotBlink 2s ease-in-out infinite' }} />
                Available
              </div>
            </div>
          </div>
        </div>{/* end swing wrapper */}
      </div>{/* end drop wrapper */}
    </div>
  )
}

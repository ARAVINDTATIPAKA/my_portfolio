'use client'

const BARS = [22, 14, 20, 10, 18, 22, 12, 16, 20, 8, 22, 18, 14, 20, 22]
const ROWS: [string, string][] = [
  ['Based',   'Visakhapatnam, India'],
  ['Current', 'InterviewBuddy™'],
  ['Prev',    'Keka HR'],
  ['Focus',   'SaaS · AI · Design Systems'],
]

export default function IDCard() {
  return (
    <div className="idcard-positioner">
      <div className="idcard-drop-wrapper">
        <div className="idcard-swing-wrapper">

          {/* Lanyard */}
          <div className="idcard-lanyard">
            <div className="idcard-lanyard-pin" />
          </div>

          {/* Card */}
          <div className="idcard-card">

            {/* Top bar */}
            <div className="idcard-topbar">
              <span className="idcard-topbar-title">Product Designer</span>
              <span className="idcard-topbar-id">#2021–NOW</span>
            </div>

            {/* Body */}
            <div className="idcard-body">
              <div className="idcard-avatar">AT</div>
              <div className="idcard-name">Aravind Tatipaka</div>
              <div className="idcard-subtitle">{'Product & UI/UX Designer · 5+ yrs'}</div>
              <div className="idcard-divider" />
              {ROWS.map(([k, v]) => (
                <div key={k} className="idcard-row">
                  <span className="idcard-row-label">{k}</span>
                  <span className="idcard-row-value">{v}</span>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="idcard-footer">
              <div className="idcard-waveform">
                {BARS.map((h, i) => (
                  <span key={i} className="idcard-waveform-bar" style={{ height: h }} />
                ))}
              </div>
              <div className="idcard-status">
                <span className="idcard-status-dot" />
                Available
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

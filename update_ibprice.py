import re

path = '/Users/aravindtatipaka/Desktop/Code files/Antigravity/index.html'
with open(path, 'r') as f:
    content = f.read()

# ── 1. New work card ──────────────────────────────────────────
new_card = '''
      <!-- Card 6 — IB Topic & Pricing System -->
      <div class="project-card card-sm reveal reveal-delay-1" onclick="openIBPriceCaseStudy()">
        <div class="project-img">
          <div class="project-img-bg" style="background:linear-gradient(135deg,#0e1a0e 0%,#0a1a14 100%);">
            <div class="mock-ui">
              <div class="mock-bar">
                <div class="mock-dot r"></div><div class="mock-dot y"></div><div class="mock-dot g"></div>
                <span style="font-family:var(--font-mono);font-size:9px;color:var(--stone-600);margin-left:8px;letter-spacing:0.06em;">Admin Portal — Topic &amp; Pricing</span>
              </div>
              <div class="mock-content" style="gap:8px;">
                <div style="display:flex;gap:6px;align-items:center;margin-bottom:4px;">
                  <div style="padding:4px 10px;background:rgba(34,197,94,0.15);border:1px solid rgba(34,197,94,0.3);border-radius:999px;">
                    <div style="height:4px;background:rgba(34,197,94,0.6);border-radius:2px;width:40px;"></div>
                  </div>
                  <div style="padding:4px 10px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:999px;">
                    <div style="height:4px;background:rgba(255,255,255,0.15);border-radius:2px;width:32px;"></div>
                  </div>
                </div>
                <div style="display:flex;gap:6px;">
                  <div style="flex:1;background:rgba(34,197,94,0.06);border:1px solid rgba(34,197,94,0.15);border-radius:8px;padding:10px;">
                    <div style="font-size:0;display:flex;align-items:baseline;gap:3px;margin-bottom:4px;">
                      <div style="height:16px;width:20px;background:rgba(34,197,94,0.5);border-radius:2px;"></div>
                    </div>
                    <div style="height:4px;background:rgba(255,255,255,0.08);border-radius:2px;width:80%;"></div>
                    <div style="height:3px;background:rgba(255,255,255,0.05);border-radius:2px;width:60%;margin-top:3px;"></div>
                  </div>
                  <div style="flex:1;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:10px;">
                    <div style="height:16px;width:16px;background:rgba(255,255,255,0.1);border-radius:2px;margin-bottom:4px;"></div>
                    <div style="height:4px;background:rgba(255,255,255,0.08);border-radius:2px;width:80%;"></div>
                    <div style="height:3px;background:rgba(255,255,255,0.05);border-radius:2px;width:50%;margin-top:3px;"></div>
                  </div>
                  <div style="flex:1;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:10px;">
                    <div style="height:16px;width:16px;background:rgba(255,255,255,0.1);border-radius:2px;margin-bottom:4px;"></div>
                    <div style="height:4px;background:rgba(255,255,255,0.08);border-radius:2px;width:80%;"></div>
                    <div style="height:3px;background:rgba(255,255,255,0.05);border-radius:2px;width:40%;margin-top:3px;"></div>
                  </div>
                </div>
                <div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);border-radius:6px;padding:8px;display:flex;gap:8px;align-items:center;">
                  <div style="width:6px;height:6px;border-radius:50%;background:rgba(34,197,94,0.6);flex-shrink:0;"></div>
                  <div style="flex:1;">
                    <div style="height:3px;background:rgba(255,255,255,0.1);border-radius:2px;width:70%;margin-bottom:3px;"></div>
                    <div style="height:3px;background:rgba(255,255,255,0.05);border-radius:2px;width:50%;"></div>
                  </div>
                  <div style="height:4px;width:28px;background:rgba(34,197,94,0.25);border-radius:999px;"></div>
                </div>
              </div>
            </div>
            <div class="bg-text">IB</div>
          </div>
          <div class="project-img-overlay"></div>
        </div>
        <div class="project-body">
          <div class="project-tags">
            <span class="project-tag">B2C SaaS</span>
            <span class="project-tag">Pricing System</span>
            <span class="project-tag">Admin Portal</span>
            <span class="project-tag">InterviewBuddy</span>
          </div>
          <div class="project-title">Designing a Scalable Topic and Pricing System</div>
          <div class="project-desc">From fragmented operations and rigid pricing to a scalable topic management system that improved operational efficiency and customer discovery.</div>
          <div class="project-footer">
            <span class="project-year">InterviewBuddy · Shipped</span>
            <span class="project-arrow" style="display:flex;align-items:center;gap:6px;font-size:13px;font-family:var(--font-display);font-weight:600;color:var(--lime);">Read case study ↗</span>
          </div>
        </div>
      </div>

    </div>
  </section>'''

content = content.replace(
    '''    </div>
  </section>

  <!-- ── ABOUT ── -->''',
    new_card + '\n\n  <!-- ── ABOUT ── -->',
    1
)

# ── 2. New case study panel ───────────────────────────────────
panel = '''<!-- ── IB TOPIC & PRICING CASE STUDY ── -->
<div class="cs-overlay" id="ibprice-overlay" onclick="closeIBPriceCaseStudy()"></div>
<div class="cs-panel" id="ibprice-panel">
  <div class="cs-topbar">
    <span class="cs-topbar-label">Case Study — Topic &amp; Pricing System</span>
    <button class="cs-close" onclick="closeIBPriceCaseStudy()">✕ Close</button>
  </div>
  <div class="cs-hero">
    <div class="cs-eyebrow">InterviewBuddy · B2C SaaS</div>
    <h2 class="cs-title">Designing a Scalable Topic and Pricing System</h2>
    <p class="cs-subtitle">From fragmented operations and rigid pricing to a scalable topic management system that improved operational efficiency and customer discovery.</p>
    <div class="cs-meta-row">
      <div class="cs-meta-item"><span class="cs-meta-key">Role</span><span class="cs-meta-val">Product Designer</span></div>
      <div class="cs-meta-item"><span class="cs-meta-key">Platform</span><span class="cs-meta-val">Web (Admin + Consumer)</span></div>
      <div class="cs-meta-item"><span class="cs-meta-key">Status</span><span class="cs-meta-val">Shipped</span></div>
    </div>
    <div class="cs-tags">
      <span class="cs-tag">B2C SaaS</span>
      <span class="cs-tag">Pricing System</span>
      <span class="cs-tag">Admin Portal</span>
      <span class="cs-tag">Topic Management</span>
      <span class="cs-tag">UX Design</span>
    </div>
    <!-- NDA callout -->
    <div style="margin-top:24px;padding:16px 20px;background:rgba(234,179,8,0.06);border:1px solid rgba(234,179,8,0.2);border-radius:12px;display:flex;gap:12px;align-items:flex-start;">
      <span style="font-size:14px;flex-shrink:0;margin-top:1px;">⚠</span>
      <p style="font-family:var(--font-body);font-size:13px;color:var(--text-mid);line-height:1.65;margin:0;">
        <strong style="color:rgba(234,179,8,0.9);">This project is covered under NDA.</strong> What I've shared here reflects my thinking process across problem framing, research, and design decisions. Detailed designs, workflows, metrics, and implementation specifics are not included.
      </p>
    </div>
  </div>
  <div class="cs-body">

    <!-- Overview -->
    <div class="cs-section" style="border-top:none;padding-top:36px;">
      <div class="cs-section-label">Overview</div>
      <p class="cs-body-text">InterviewBuddy offers two primary offerings: <strong style="color:var(--text-hi);">Meet with Expert</strong> (live 1:1 sessions) and <strong style="color:var(--text-hi);">One Way</strong> (AI-evaluated or template-based asynchronous interviews). With 300+ topics spanning diverse domains, the platform had been operating without a coherent pricing or topic management infrastructure. Ops teams relied on Excel sheets and fragmented CRMs to manage everything manually.</p>
    </div>

    <!-- Problem -->
    <div class="cs-section">
      <div class="cs-section-label" style="color:#EF4444;">Problem</div>
      <h3 class="cs-section-title">A single price for everything was causing silent revenue loss.</h3>
      <p class="cs-body-text" style="margin-bottom:24px;">The platform used one flat price across all topics for each offering. This worked until high-value topics — particularly research-domain expert sessions — began generating orders at a price point far below what experts actually charged. The ops team had no mechanism to handle this. They were often forced to absorb higher expert costs or manually intervene in bookings, creating operational friction and unpredictable margins.</p>
      <div class="cs-card-grid">
        <div class="cs-card">
          <div class="cs-card-num" style="color:#EF4444;">↘</div>
          <div class="cs-card-title">Revenue leakage</div>
          <div class="cs-card-desc">Fixed pricing could not account for expert cost variation across domains.</div>
        </div>
        <div class="cs-card">
          <div class="cs-card-num" style="color:#EF4444;">⊞</div>
          <div class="cs-card-title">No admin tools</div>
          <div class="cs-card-desc">Ops managed topics, pricing, and bookings via Excel and fragmented CRMs.</div>
        </div>
        <div class="cs-card">
          <div class="cs-card-num" style="color:#EF4444;">⊙</div>
          <div class="cs-card-title">Poor discoverability</div>
          <div class="cs-card-desc">Customers had to type full topic names to book, with no structured search experience.</div>
        </div>
        <div class="cs-card">
          <div class="cs-card-num" style="color:#EF4444;">⏱</div>
          <div class="cs-card-title">Manual scheduling</div>
          <div class="cs-card-desc">One Way interviews required ops involvement despite needing no human expert.</div>
        </div>
      </div>
    </div>

    <!-- Research -->
    <div class="cs-section">
      <div class="cs-section-label" style="color:var(--lime);">Research</div>
      <p class="cs-body-text" style="margin-bottom:28px;">Working sessions were facilitated with stakeholders and the ops team to understand how they thought about topics and pricing. The goal was to surface existing mental models rather than impose new ones.</p>
      <div style="display:flex;flex-direction:column;gap:12px;">
        <div class="ibp-insight-card">
          <div class="ibp-insight-num">01</div>
          <div>
            <div class="ibp-insight-title">Individual pricing per topic was rejected early</div>
            <div class="ibp-insight-desc">With 300+ topics and 3 offering types each, managing roughly 900 price entries was operationally infeasible. Any solution had to scale without constant manual updates.</div>
          </div>
        </div>
        <div class="ibp-insight-card">
          <div class="ibp-insight-num">02</div>
          <div>
            <div class="ibp-insight-title">Stakeholders naturally grouped topics into two pricing tiers</div>
            <div class="ibp-insight-desc">When asked how they would bucket topics, stakeholders consistently separated them into standard topics and higher-demand specialist domains. This existing mental model became the foundation for the Classic and Premium classification, grounding the system in how the business already thought about value.</div>
          </div>
        </div>
        <div class="ibp-insight-card">
          <div class="ibp-insight-num">03</div>
          <div>
            <div class="ibp-insight-title">A small set of truly exclusive topics existed</div>
            <div class="ibp-insight-desc">These were niche domains where experts commanded above-market rates. They did not fit even the Premium tier and needed a separate mechanism for flexibility.</div>
          </div>
        </div>
        <div class="ibp-insight-card">
          <div class="ibp-insight-num">04</div>
          <div>
            <div class="ibp-insight-title">A/B testing revealed a counter-intuitive insight</div>
            <div class="ibp-insight-desc">A minimal search-first hero outperformed visually richer versions with imagery and animation. Users who came with intent converted better when the search box was front and center.</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Solution -->
    <div class="cs-section">
      <div class="cs-section-label" style="color:#22C55E;">Solution</div>
      <h3 class="cs-section-title">Four interconnected design decisions.</h3>
      <div style="display:flex;flex-direction:column;gap:16px;margin-top:8px;">
        <div class="ibp-solution-card">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
            <span class="ibp-solution-tag">Classic and Premium</span>
            <span class="ibp-solution-num">01</span>
          </div>
          <div class="ibp-solution-title">Topic Classification System</div>
          <div class="ibp-solution-desc">Each topic is assigned a classification at the time of creation. This maps to a default price for each offering type: Meet with Expert, One Way (AI), and One Way (Template). Ops manages 6 price points instead of 900+. When a topic's classification changes, prices update automatically across the board.</div>
        </div>
        <div class="ibp-solution-card">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
            <span class="ibp-solution-tag">Flexible pricing for specialist domains</span>
            <span class="ibp-solution-num">02</span>
          </div>
          <div class="ibp-solution-title">Premium Hike for Exclusive Topics</div>
          <div class="ibp-solution-desc">For top-tier specialist topics, a percentage-based hike can be applied on top of the Premium price. This gives ops flexibility for high-demand domains without creating an entirely new pricing tier. The hike is visible to customers before booking.</div>
        </div>
        <div class="ibp-solution-card">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
            <span class="ibp-solution-tag">Backed by new topic taxonomy</span>
            <span class="ibp-solution-num">03</span>
          </div>
          <div class="ibp-solution-title">Smart Topic Search as Homepage Hero</div>
          <div class="ibp-solution-desc">A structured topic search replaced the previous static homepage. Customers can now discover sessions by domain, role, or keyword instead of typing exact topic names. Placed as the hero based on A/B test results showing higher intent-driven conversions.</div>
        </div>
        <div class="ibp-solution-card">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
            <span class="ibp-solution-tag">Fully self-serve, zero ops steps</span>
            <span class="ibp-solution-num">04</span>
          </div>
          <div class="ibp-solution-title">Automated One Way Scheduling</div>
          <div class="ibp-solution-desc">One Way interviews no longer route through the ops team for scheduling. Since no human expert is involved, the flow was redesigned to be fully self-serve. Customers book, receive access, and complete their session without any manual ops involvement.</div>
        </div>
      </div>
    </div>

    <!-- Impact -->
    <div class="cs-section">
      <div class="cs-section-label">Impact</div>
      <div class="cs-outcomes" style="grid-template-columns:repeat(4,1fr);margin-bottom:24px;">
        <div class="cs-outcome">
          <div class="cs-outcome-val">6</div>
          <div class="cs-outcome-label">Pricing rules</div>
          <div style="font-family:var(--font-mono);font-size:10px;color:var(--text-lo);margin-top:2px;">Down from 900+</div>
        </div>
        <div class="cs-outcome">
          <div class="cs-outcome-val">0</div>
          <div class="cs-outcome-label">Manual ops steps</div>
          <div style="font-family:var(--font-mono);font-size:10px;color:var(--text-lo);margin-top:2px;">One Way scheduling</div>
        </div>
        <div class="cs-outcome">
          <div class="cs-outcome-val">300+</div>
          <div class="cs-outcome-label">Structured topics</div>
          <div style="font-family:var(--font-mono);font-size:10px;color:var(--text-lo);margin-top:2px;">Searchable and scalable</div>
        </div>
        <div class="cs-outcome">
          <div class="cs-outcome-val">↑</div>
          <div class="cs-outcome-label">Conversion rate</div>
          <div style="font-family:var(--font-mono);font-size:10px;color:var(--text-lo);margin-top:2px;">Search-first hero</div>
        </div>
      </div>
      <div class="cs-callout">The ops team now manages topics, classifications, and pricing from a single admin portal instead of spreadsheets and CRMs. The classification model reduced pricing complexity, addressed recurring margin challenges for specialist topics, and improved topic discovery through a search-first booking experience.</div>
    </div>

    <!-- Closing quote -->
    <div class="cs-section" style="border-bottom:none;padding-bottom:60px;">
      <p style="font-family:var(--font-body);font-size:14px;color:var(--text-lo);line-height:1.8;font-style:italic;">"This module demonstrates how I approached product design beyond interfaces by balancing business constraints, operational workflows, pricing strategy, and customer experience within a growing 0→1 B2C platform. It was one of several systems I designed as part of InterviewBuddy's broader product ecosystem."</p>
    </div>

  </div>
</div>

'''

content = content.replace('<!-- ── NAV ──', panel + '<!-- ── NAV ──', 1)

# ── 3. JS functions ──────────────────────────────────────────
content = content.replace(
    'function openIBAICaseStudy()',
    '''function openIBPriceCaseStudy() {
  document.getElementById('ibprice-overlay').classList.add('open');
  document.getElementById('ibprice-panel').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeIBPriceCaseStudy() {
  document.getElementById('ibprice-overlay').classList.remove('open');
  document.getElementById('ibprice-panel').classList.remove('open');
  document.body.style.overflow = '';
}

function openIBAICaseStudy()'''
)

# Update escape key handler
content = content.replace(
    "if (e.key === 'Escape') { closeCaseStudy(); closeKekaCaseStudy(); closeIBCaseStudy(); closeIBAICaseStudy(); }",
    "if (e.key === 'Escape') { closeCaseStudy(); closeKekaCaseStudy(); closeIBCaseStudy(); closeIBAICaseStudy(); closeIBPriceCaseStudy(); }"
)

with open(path, 'w') as f:
    f.write(content)
print('HTML done, length:', len(content))

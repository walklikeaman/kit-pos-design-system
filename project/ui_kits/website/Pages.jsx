// KIT POS — Partners, Platform, Solutions, Contact pages
const { useState } = React;

// ─── Partners ─────────────────────────────────────────────

const partnerBenefits = [
  { title: 'Increase sales and margins', description: 'The edge comes from selling merchant value with software, support, and smoother daily operations.' },
  { title: 'Merchant retention', description: 'A stronger operating system helps make accounts stickier and gives agents a better long-term relationship.' },
  { title: 'Co-branding and private label', description: 'For selected partners, KIT POS supports more differentiated positioning than a generic hardware-only conversation.' },
  { title: 'Training and support', description: 'Merchants can be trained remotely and supported after go-live so the agent is not left alone with onboarding.' },
  { title: 'Financing options', description: 'When equipment cost becomes a sales obstacle, a flexible rollout structure can help the merchant move forward.' },
];

const rolloutSteps = [
  { n: '01', title: 'Qualification', body: 'Review the merchant category, volume, and fit before recommending hardware.' },
  { n: '02', title: 'Hardware selection', body: 'Match the right SUNMI or PAX devices to the counter footprint and workflow.' },
  { n: '03', title: 'Installation', body: 'Field agents configure and install hardware at the merchant location.' },
  { n: '04', title: 'Staff training', body: 'Walk staff through daily operations on KIT POS, KIT Stock, and KIT Merchant.' },
  { n: '05', title: 'Ongoing support', body: 'Direct access for adjustments, replacements, and process changes after go-live.' },
];

function PartnersPage({ setPage }) {
  return (
    <main>
      <section style={{ padding: '48px 0 56px' }}>
        <div className="shell">
          <div style={{ maxWidth: 640 }}>
            <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em', padding: '5px 14px', borderRadius: 9999, marginBottom: 20 }} className="kit-badge">For Partners</span>
            <h1 style={{ margin: '0 0 20px', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.08, fontSize: 'clamp(32px, 4vw, 52px)' }} className="kit-h1">
              A POS program built for agents who want to sell more than a terminal.
            </h1>
            <p style={{ margin: '0 0 32px', fontSize: 18, lineHeight: 1.65 }} className="kit-body">
              KIT POS gives agents and ISOs a complete software and hardware stack with onboarding, training, and support included so the sale does not end at activation.
            </p>
            <button onClick={() => setPage('contact')} className="btn-primary">Get in touch</button>
          </div>
        </div>
      </section>

      <section className="section-alt" style={{ padding: '56px 0' }}>
        <div className="shell">
          <SectionHeading eyebrow="Partner Benefits" title="What KIT POS brings to the partnership" />
          <div style={{ marginTop: 36, display: 'grid', gap: 16, gridTemplateColumns: 'repeat(3,1fr)' }} className="benefit-grid">
            {partnerBenefits.map(b => (
              <div key={b.title} className="kit-card" style={{ padding: 22 }}>
                <p style={{ margin: '0 0 8px', fontSize: 15, fontWeight: 700, letterSpacing: '-0.01em' }} className="kit-h3">{b.title}</p>
                <p style={{ margin: 0, fontSize: 13, lineHeight: 1.65 }} className="kit-body-sm">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '56px 0 72px' }}>
        <div className="shell">
          <SectionHeading eyebrow="Rollout Process" title="How a deployment actually works" description="From the first merchant conversation to post-activation support, the process is structured to minimize friction." />
          <div style={{ marginTop: 36, display: 'grid', gap: 14, gridTemplateColumns: 'repeat(5,1fr)' }} className="rollout-grid">
            {rolloutSteps.map(s => (
              <div key={s.n} className="kit-card-mist" style={{ padding: 18, borderRadius: 20 }}>
                <p style={{ margin: '0 0 8px', fontSize: 28, fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1 }} className="step-num">{s.n}</p>
                <p style={{ margin: '0 0 6px', fontSize: 13, fontWeight: 700 }} className="kit-h3">{s.title}</p>
                <p style={{ margin: 0, fontSize: 12, lineHeight: 1.6 }} className="kit-body-sm">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

// ─── Platform ─────────────────────────────────────────────

const hardware = [
  { name: 'SUNMI D3 Pro', brand: 'SUNMI', description: 'Dual-display desktop terminal. 15.6" operator screen, optional 10" customer display with Tap on Glass support.', img: '../../assets/hardware-d3-pro.png' },
  { name: 'PAX A35', brand: 'PAX', description: 'Compact payment terminal for tap, chip, and swipe acceptance without sacrificing counter space.', img: '../../assets/hardware-pax-a35.webp' },
];

const software = [
  { name: 'KIT POS', description: 'Checkout, cashier flow, tender handling, and front-counter usability for daily store operations.', points: ['Customizable quick keys', 'Scanner and scale integration', 'Common product database with recommended pricing'], img: '../../assets/kit-pos-screen.png' },
  { name: 'KIT Stock', description: 'Inventory visibility for merchants who need a clearer view of fast-moving products and reorder needs.', points: ['Low-stock alerts', 'Mobile inventory management', 'Cleaner reorder and restock visibility'], img: '../../assets/kit-stock-screen.png' },
  { name: 'KIT Merchant', description: 'Merchant-facing controls and reporting so owners can see sales activity and monitor store performance.', points: ['Sales, batches, and tax reports', 'Clerk permissions and shift visibility', 'QuickBooks-friendly exports'], img: '../../assets/kit-merchant-screen.png' },
];

function PlatformPage() {
  return (
    <main>
      <section style={{ padding: '48px 0 56px' }}>
        <div className="shell">
          <div style={{ maxWidth: 640 }}>
            <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em', padding: '5px 14px', borderRadius: 9999, marginBottom: 20 }} className="kit-badge">Platform</span>
            <h1 style={{ margin: '0 0 20px', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.08, fontSize: 'clamp(32px, 4vw, 52px)' }} className="kit-h1">Hardware, software, and support in one connected stack.</h1>
            <p style={{ margin: 0, fontSize: 18, lineHeight: 1.65 }} className="kit-body">KIT POS pairs PAX and SUNMI hardware with proprietary software built for specialty retail — checkout, inventory, and merchant controls designed to work together.</p>
          </div>
        </div>
      </section>

      <section className="section-alt" style={{ padding: '56px 0' }}>
        <div className="shell">
          <SectionHeading eyebrow="Software" title="Three tools, one operating picture" />
          <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 20 }}>
            {software.map((s, i) => (
              <div key={s.name} className="kit-card" style={{ overflow: 'hidden', display: 'grid', gridTemplateColumns: i % 2 === 0 ? '1fr 1fr' : '1fr 1fr', direction: i % 2 === 1 ? 'rtl' : 'ltr' }}>
                <div style={{ padding: '40px 40px', direction: 'ltr' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em' }} className="kit-eyebrow">Software</span>
                  <h3 style={{ margin: '8px 0 10px', fontSize: 22, fontWeight: 700, letterSpacing: '-0.025em' }} className="kit-h3">{s.name}</h3>
                  <p style={{ margin: '0 0 16px', fontSize: 14, lineHeight: 1.65 }} className="kit-body-sm">{s.description}</p>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                    {s.points.map(p => (
                      <li key={p} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, marginBottom: 7 }} className="kit-body-sm">
                        <span style={{ marginTop: 6, width: 5, height: 5, borderRadius: '50%', flexShrink: 0 }} className="kit-dot" />{p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="card-img-bg" style={{ minHeight: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, direction: 'ltr' }}>
                  <img src={s.img} alt={s.name} style={{ maxHeight: 200, width: '100%', objectFit: 'contain' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '56px 0 72px' }}>
        <div className="shell">
          <SectionHeading eyebrow="Hardware" title="Devices built for busy specialty retail counters" />
          <div style={{ marginTop: 36, display: 'grid', gap: 20, gridTemplateColumns: '1fr 1fr' }} className="hw-grid">
            {hardware.map(h => (
              <div key={h.name} className="kit-card" style={{ overflow: 'hidden' }}>
                <div className="card-img-bg" style={{ height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
                  <img src={h.img} alt={h.name} style={{ maxHeight: 190, objectFit: 'contain' }} />
                </div>
                <div style={{ padding: '20px 24px' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }} className="kit-eyebrow">{h.brand}</span>
                  <h3 style={{ margin: '5px 0 8px', fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }} className="kit-h3">{h.name}</h3>
                  <p style={{ margin: 0, fontSize: 13, lineHeight: 1.65 }} className="kit-body-sm">{h.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

// ─── Solutions ─────────────────────────────────────────────

const solutions = [
  { name: 'Grocery Stores', description: 'Turnkey grocery workflows with a common product database, recommended pricing, produce scale support, and faster checkout for everyday basket traffic.', points: ['Suggested pricing and common product data', 'Produce scale and barcode workflow', 'Cash, debit, credit, gift, rewards, and EBT'] },
  { name: 'Supermarkets', description: 'Higher-volume operations need cleaner cashier flow, department visibility, and reporting that helps the owner manage a larger store.', points: ['Faster lines and fewer manual workarounds', 'More reporting visibility across departments', 'A stronger fit for high-transaction environments'] },
  { name: 'Liquor Stores', description: 'Quick front-counter service, dependable payment handling, and a compact setup that fits specialty retail without slowing service.', points: ['Fast cashier workflow for frequent repeat traffic', 'Compact hardware and easier operator flow', 'Reporting and inventory tools for high-turnover items'] },
  { name: 'Smoke Shops', description: 'Setups for merchants selling tobacco, nicotine, CBD, hemp, and other cannabis-related retail products with category-aware rollout support.', points: ['Compact counter hardware for tighter footprints', 'Fast product handling, specials, and pricebook control', 'Category-aware rollout where other providers hesitate'] },
  { name: 'Quick Service Restaurants', description: 'Clean register flow, kitchen ticket handling, and the ability to keep orders open while customers add items before the ticket closes.', points: ['Kitchen order printing and routing', 'Open orders that stay active while items are added', 'Simpler front-counter flow during busy service windows'] },
];

function SolutionsPage({ setPage }) {
  return (
    <main>
      <section style={{ padding: '48px 0 56px' }}>
        <div className="shell">
          <div style={{ maxWidth: 600 }}>
            <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em', padding: '5px 14px', borderRadius: 9999, marginBottom: 20 }} className="kit-badge">Solutions</span>
            <h1 style={{ margin: '0 0 20px', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.08, fontSize: 'clamp(32px, 4vw, 52px)' }} className="kit-h1">Built for specialty retail, not generic retail.</h1>
            <p style={{ margin: 0, fontSize: 18, lineHeight: 1.65 }} className="kit-body">KIT POS is configured for the categories that need a more tailored approach — from grocery checkout to smoke shop counter workflows.</p>
          </div>
        </div>
      </section>
      <section style={{ padding: '0 0 72px' }}>
        <div className="shell" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {solutions.map(s => (
            <div key={s.name} className="kit-card" style={{ padding: '28px 32px', display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 32, alignItems: 'start' }} className2="sol-card">
              <div>
                <h2 style={{ margin: '0 0 10px', fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em' }} className="kit-h3">{s.name}</h2>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65 }} className="kit-body-sm">{s.description}</p>
              </div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {s.points.map(p => (
                  <li key={p} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13 }} className="kit-body-sm">
                    <span style={{ marginTop: 6, width: 5, height: 5, borderRadius: '50%', flexShrink: 0 }} className="kit-dot" />{p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

// ─── Contact ─────────────────────────────────────────────

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', business: '', email: '', phone: '', type: '', message: '' });
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  if (sent) return (
    <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', maxWidth: 400, padding: '0 24px' }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }} className="kit-card">
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24" className="check-icon"><path d="M20 6L9 17l-5-5"/></svg>
        </div>
        <h2 style={{ margin: '0 0 12px', fontSize: 26, fontWeight: 700, letterSpacing: '-0.025em' }} className="kit-h1">Message sent</h2>
        <p style={{ margin: 0, fontSize: 16, lineHeight: 1.65 }} className="kit-body">The KIT POS team will follow up within one business day.</p>
      </div>
    </main>
  );

  return (
    <main>
      <section style={{ padding: '48px 0 72px' }}>
        <div className="shell" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 56, alignItems: 'start' }} className2="contact-grid">
          <div>
            <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em', padding: '5px 14px', borderRadius: 9999, marginBottom: 20 }} className="kit-badge">Contact</span>
            <h1 style={{ margin: '0 0 20px', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.08, fontSize: 'clamp(28px, 3.5vw, 46px)' }} className="kit-h1">Get in touch with the KIT POS team.</h1>
            <p style={{ margin: '0 0 32px', fontSize: 17, lineHeight: 1.65 }} className="kit-body">Whether you are an agent expanding your portfolio or a merchant evaluating a new POS setup, the KIT POS team responds directly.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <p style={{ margin: 0, fontSize: 14 }} className="kit-body-sm"><strong className="kit-h3">Email</strong> &nbsp;info@kit-pos.com</p>
            </div>
          </div>

          <div className="kit-card" style={{ padding: 36 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {[['Your name', 'name', 'text', 'Ahmad H.'], ['Business name', 'business', 'text', 'Favorite Mart']].map(([l, k, t, ph]) => (
                  <div key={k}>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }} className="kit-h3">{l}</label>
                    <input type={t} value={form[k]} onChange={set(k)} placeholder={ph} className="kit-input" />
                  </div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {[['Email', 'email', 'email', 'you@example.com'], ['Phone', 'phone', 'tel', '(555) 000-0000']].map(([l, k, t, ph]) => (
                  <div key={k}>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }} className="kit-h3">{l}</label>
                    <input type={t} value={form[k]} onChange={set(k)} placeholder={ph} className="kit-input" />
                  </div>
                ))}
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }} className="kit-h3">Store type</label>
                <select value={form.type} onChange={set('type')} className="kit-input">
                  <option value="">Select a category…</option>
                  {['Grocery store','Supermarket','Liquor store','Smoke shop','Quick service restaurant','Other'].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }} className="kit-h3">Message</label>
                <textarea value={form.message} onChange={set('message')} rows={4} style={{ resize: 'none' }}
                  placeholder="Tell us about your current setup and what you are looking to improve." className="kit-input" />
              </div>
              <button onClick={() => setSent(true)} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Send message
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { PartnersPage, PlatformPage, SolutionsPage, ContactPage });

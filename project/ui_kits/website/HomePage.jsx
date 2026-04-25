// KIT POS — HomePage
const { useState } = React;

const productCards = [
  { name: 'KIT POS', description: 'A turnkey checkout workflow with a common product database, recommended pricing, and faster front-counter flow from day one.', highlights: ['Faster cashier flow', 'Multiple payment types including EBT', 'Produce scale and payment integration'], img: '../../assets/kit-pos-screen-2.png' },
  { name: 'KIT Stock', description: 'Inventory tooling for merchants who need live stock visibility, reorder awareness, and cleaner item management.', highlights: ['Low-stock alerts', 'Inventory management from POS and phone', 'Cleaner reorder visibility'], img: '../../assets/kit-stock-screen.png' },
  { name: 'KIT Merchant', description: 'Merchant-facing controls for clerks, reports, specials, settings, batches, taxes, and the operational visibility owners need.', highlights: ['Reports and analytics', 'Clerk permissions', 'QuickBooks-friendly exports'], img: '../../assets/kit-merchant-screen.png' },
];

const userStories = [
  { owner: 'Ahmad H.', role: 'Owner', business: 'Favorite Mart', category: 'Grocery store', quote: 'Before KIT POS, we were basically running the front counter without clean inventory visibility. After the rollout, our team finally had one system for checkout, stock awareness, and everyday cashier work.' },
  { owner: 'Omar K.', role: 'Operator', business: 'Valley Smoke & Gift', category: 'Smoking shop', quote: 'KIT POS reviewed our setup individually, sent an agent, installed everything, and trained our staff properly.' },
  { owner: 'Samir A.', role: 'Owner', business: 'Sunset Liquor', category: 'Liquor store', quote: 'KIT POS gave us a cleaner checkout flow, better item control, and a setup the staff could learn quickly.' },
];

const faqItems = [
  { q: 'Who is KIT POS really built for?', a: 'Agents and merchants should immediately understand that KIT POS is a full operating solution with hardware, software, onboarding, and hands-on support.' },
  { q: 'Do you work with smoke shops and other specialty retail categories?', a: 'Yes. KIT POS works with specialty categories that other providers may avoid, including smoke shops, groceries, supermarkets, liquor stores, and quick service restaurant environments.' },
  { q: 'Do you only sell terminals, or do you also install and train?', a: 'KIT POS installs equipment, configures the software stack, and helps merchants train staff so the system works in daily operations.' },
  { q: 'What software is part of the solution?', a: 'The core stack includes KIT POS for checkout, KIT Stock for inventory visibility, and KIT Merchant for merchant-facing operational controls.' },
];

function DotGrid() {
  return (
    <div style={{
      position: 'absolute', inset: 0, borderRadius: 'inherit', overflow: 'hidden', pointerEvents: 'none',
      backgroundImage: 'radial-gradient(circle, rgba(29,53,87,0.12) 1px, transparent 1px)',
      backgroundSize: '24px 24px', opacity: 0.6,
    }} />
  );
}

function HomePage({ setPage }) {
  const [faqOpen, setFaqOpen] = useState(null);

  return (
    <main>
      {/* Hero */}
      <section style={{ padding: '48px 0 56px' }}>
        <div className="shell" style={{ display: 'grid', alignItems: 'center', gap: 48, gridTemplateColumns: '1fr 1fr' }}>
          <div>
            <span style={{
              display: 'inline-block', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em',
              padding: '5px 14px', borderRadius: 9999, marginBottom: 20,
            }} className="kit-badge">Boutique POS Solutions</span>
            <h1 style={{ margin: '0 0 20px', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05, fontSize: 'clamp(36px, 4.5vw, 56px)' }} className="kit-h1">
              Real devices for checkout, payment acceptance, and merchant-facing workflows.
            </h1>
            <p style={{ margin: '0 0 32px', fontSize: 18, lineHeight: 1.65, maxWidth: 500 }} className="kit-body">
              KIT POS helps niche retail businesses with dependable checkout systems, faster front-counter flow, and cleaner inventory control.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <button onClick={() => setPage('partners')} className="btn-primary">For Partners</button>
              <button onClick={() => setPage('platform')} className="btn-ghost">Explore Platform</button>
            </div>
          </div>

          {/* Hero visual */}
          <div style={{ position: 'relative', borderRadius: 32, overflow: 'hidden', minHeight: 320, display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="hero-visual">
            <DotGrid />
            <div style={{ position: 'relative', zIndex: 1, padding: 32, animation: 'kitFloat 5s ease-in-out infinite' }}>
              <img src="../../assets/hardware-d3-pro.png" alt="SUNMI D3 Pro"
                style={{ maxWidth: '100%', maxHeight: 280, objectFit: 'contain', filter: 'drop-shadow(0 24px 48px rgba(29,53,87,0.18))' }} />
            </div>
            {/* Floating stat cards */}
            <div style={{ position: 'absolute', bottom: 24, left: 24, zIndex: 2 }} className="stat-card">
              <p style={{ margin: 0, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.6 }}>Hardware</p>
              <p style={{ margin: '3px 0 0', fontSize: 14, fontWeight: 700 }}>PAX + SUNMI</p>
            </div>
            <div style={{ position: 'absolute', top: 24, right: 24, zIndex: 2 }} className="stat-card">
              <p style={{ margin: 0, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.6 }}>Payment types</p>
              <p style={{ margin: '3px 0 0', fontSize: 14, fontWeight: 700 }}>Cash · Card · EBT</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product ecosystem */}
      <section className="section-alt" style={{ padding: '56px 0' }}>
        <div className="shell">
          <SectionHeading eyebrow="Product Ecosystem" title="One connected suite for checkout, inventory, and merchant control" description="Built around the way specialty retail businesses actually operate." />
          <div style={{ marginTop: 40, display: 'grid', gap: 20, gridTemplateColumns: 'repeat(3,1fr)' }} className="product-grid">
            {productCards.map(p => (
              <div key={p.name} className="kit-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div className="card-img-bg" style={{ height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
                  <img src={p.img} alt={p.name} style={{ height: '100%', width: '100%', objectFit: 'contain' }} />
                </div>
                <div style={{ padding: 20, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ margin: '0 0 8px', fontSize: 17, fontWeight: 700, letterSpacing: '-0.02em' }} className="kit-h3">{p.name}</h3>
                  <p style={{ margin: '0 0 14px', fontSize: 13, lineHeight: 1.6 }} className="kit-body-sm">{p.description}</p>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', flex: 1 }}>
                    {p.highlights.map(h => (
                      <li key={h} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, marginBottom: 6 }} className="kit-body-sm">
                        <span style={{ marginTop: 6, width: 5, height: 5, borderRadius: '50%', flexShrink: 0 }} className="kit-dot" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support block */}
      <section style={{ padding: '56px 0' }}>
        <div className="shell">
          <div className="kit-card" style={{ padding: '40px 48px' }}>
            <div style={{ display: 'grid', gap: 40, gridTemplateColumns: '1fr 1fr', alignItems: 'start' }} className="support-grid">
              <SectionHeading eyebrow="Support" title="A rollout team that stays close after installation" description="From qualification to activation, KIT POS keeps the process human. Direct access to recommendations, setup guidance, and practical follow-through." />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }} className="support-cards">
                {[['Onboarding', 'Configuration guidance tailored to each merchant footprint.'], ['Support', 'Fast responses when operators need adjustments or replacements.'], ['Scale', 'Hardware that grows from one counter to multi-location operations.']].map(([t, d]) => (
                  <div key={t} className="kit-card-mist" style={{ padding: 16, borderRadius: 20 }}>
                    <p style={{ margin: '0 0 6px', fontSize: 13, fontWeight: 700 }} className="kit-h3">{t}</p>
                    <p style={{ margin: 0, fontSize: 12, lineHeight: 1.6 }} className="kit-body-sm">{d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User stories */}
      <section className="section-alt" style={{ padding: '56px 0' }}>
        <div className="shell">
          <div style={{ display: 'grid', gap: 20, gridTemplateColumns: 'repeat(3,1fr)' }} className="stories-grid">
            {userStories.map(s => (
              <article key={s.business} className="kit-card" style={{ padding: 24 }}>
                <p style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em' }} className="kit-eyebrow">{s.category}</p>
                <h3 style={{ margin: '0 0 12px', fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }} className="kit-h3">{s.business}</h3>
                <blockquote style={{ margin: '0 0 16px', fontSize: 14, lineHeight: 1.7, fontStyle: 'italic' }} className="kit-quote">"{s.quote}"</blockquote>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 600 }} className="kit-h3">{s.owner}, {s.role}</p>
              </article>
            ))}
          </div>
          <div style={{ marginTop: 24 }}>
            <button className="btn-ghost" style={{ fontSize: 13 }}>Read full stories</button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '56px 0 72px' }}>
        <div className="shell">
          <SectionHeading eyebrow="FAQ" title="Questions agents and merchants are likely to ask early" />
          <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {faqItems.map((item, i) => (
              <div key={i} className="kit-card faq-item"
                style={{ padding: '18px 22px', cursor: 'pointer' }}
                onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                  <p style={{ margin: 0, fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em' }} className="kit-h3">{item.q}</p>
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24"
                    style={{ flexShrink: 0, transition: 'transform 200ms', transform: faqOpen === i ? 'rotate(180deg)' : 'none', opacity: 0.5 }}>
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </div>
                {faqOpen === i && (
                  <p style={{ margin: '12px 0 0', fontSize: 14, lineHeight: 1.7 }} className="kit-body-sm">{item.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { HomePage });

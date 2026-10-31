// KIT POS — Shared components: Header + Footer + SectionHeading
const { useState, useEffect } = React;

function useDark() {
  const [dark, setDark] = useState(() => {
    try {
      const s = localStorage.getItem('kit-pos-theme');
      if (s === 'dark') return true;
      if (s === 'light') return false;
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch { return false; }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try { localStorage.setItem('kit-pos-theme', dark ? 'dark' : 'light'); } catch {}
  }, [dark]);

  return [dark, setDark];
}

function SunIcon() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

function ChevronIcon({ open }) {
  return (
    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24"
      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 200ms' }}>
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  );
}

function KitHeader({ page, setPage }) {
  const [dark, setDark] = useDark();
  const [menuOpen, setMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'Partners', id: 'partners' },
    { label: 'Platform', id: 'platform' },
    { label: 'Solutions', id: 'solutions', children: ['Grocery Stores', 'Supermarkets', 'Liquor Stores', 'Smoke Shops', 'Quick Service'] },
    { label: 'Contact', id: 'contact' },
  ];

  const isActive = (link) => page === link.id || (link.children && page === 'solutions');

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 30,
      borderBottom: '1px solid rgba(228,233,240,0.7)',
      background: dark ? 'rgba(2,6,23,0.88)' : 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
    }}>
      <div style={{ maxWidth: 1152, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 56, gap: 16 }}>

        {/* Logo */}
        <button onClick={() => { setPage('home'); setMenuOpen(false); }}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <img src="../../assets/kit-pos-header-logo.png" alt="KIT POS"
            style={{ height: 32, width: 'auto', filter: dark ? 'brightness(0) invert(1)' : 'none' }} />
        </button>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }} className="desktop-nav">
          <nav style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {navLinks.map(link => (
              <div key={link.id} style={{ position: 'relative' }}
                onMouseEnter={() => link.children && setSolutionsOpen(true)}
                onMouseLeave={() => link.children && setSolutionsOpen(false)}>
                <button
                  onClick={() => { setPage(link.id); setMenuOpen(false); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 4,
                    borderRadius: 9999, padding: '6px 14px',
                    fontSize: 13, fontWeight: 500, fontFamily: 'inherit',
                    border: 'none', cursor: 'pointer', transition: 'all 150ms',
                    background: isActive(link)
                      ? (dark ? '#2c3540' : '#f4f7fb')
                      : 'transparent',
                    color: isActive(link)
                      ? (dark ? '#e6eaf0' : '#1d3557')
                      : (dark ? '#94a3b8' : '#5f6b7a'),
                  }}>
                  {link.label}
                  {link.children && <ChevronIcon open={solutionsOpen} />}
                </button>

                {link.children && solutionsOpen && (
                  <div style={{
                    position: 'absolute', left: 0, top: '100%', width: 200, paddingTop: 8, zIndex: 50
                  }}>
                    <div style={{
                      borderRadius: 20, border: `1px solid ${dark ? '#2c3540' : '#e4e9f0'}`,
                      background: dark ? '#1b2129' : '#fff',
                      boxShadow: '0 8px 30px rgba(29,53,87,0.12)', padding: 8
                    }}>
                      {link.children.map(child => (
                        <button key={child}
                          onClick={() => { setPage('solutions'); setSolutionsOpen(false); }}
                          style={{
                            display: 'block', width: '100%', textAlign: 'left',
                            borderRadius: 12, padding: '8px 12px',
                            fontSize: 13, fontFamily: 'inherit', border: 'none', cursor: 'pointer',
                            background: 'transparent', transition: 'all 150ms',
                            color: dark ? '#cbd5e1' : '#5f6b7a',
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = dark ? '#2c3540' : '#f4f7fb'; e.currentTarget.style.color = dark ? '#e6eaf0' : '#1d3557'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = dark ? '#cbd5e1' : '#5f6b7a'; }}>
                          {child}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Theme toggle */}
          <button onClick={() => setDark(d => !d)}
            style={{
              width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `1px solid ${dark ? '#2c3540' : '#e4e9f0'}`,
              background: dark ? '#1b2129' : '#fff',
              color: dark ? '#94a3b8' : '#5f6b7a',
              cursor: 'pointer', transition: 'all 150ms', flexShrink: 0
            }}>
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          style={{
            width: 36, height: 36, borderRadius: '50%', display: 'none', alignItems: 'center', justifyContent: 'center',
            border: `1px solid ${dark ? '#2c3540' : '#e4e9f0'}`,
            background: dark ? '#1b2129' : '#fff',
            color: dark ? '#94a3b8' : '#1d3557',
            cursor: 'pointer', flexShrink: 0
          }}
          className="mobile-menu-btn">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <rect y="2" width="16" height="1.5" rx="1"/>
            <rect y="7" width="16" height="1.5" rx="1"/>
            <rect y="12" width="16" height="1.5" rx="1"/>
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          borderTop: `1px solid ${dark ? '#2c3540' : 'rgba(228,233,240,0.7)'}`,
          background: dark ? '#12161c' : '#fff',
          padding: '12px 24px 16px'
        }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {navLinks.map(link => (
              <button key={link.id}
                onClick={() => { setPage(link.id); setMenuOpen(false); }}
                style={{
                  textAlign: 'left', borderRadius: 16, padding: '10px 16px',
                  fontSize: 14, fontWeight: 500, fontFamily: 'inherit', border: 'none', cursor: 'pointer',
                  background: isActive(link) ? (dark ? '#2c3540' : '#f4f7fb') : 'transparent',
                  color: isActive(link) ? (dark ? '#e6eaf0' : '#1d3557') : (dark ? '#94a3b8' : '#5f6b7a'),
                }}>
                {link.label}
              </button>
            ))}
            <button onClick={() => setDark(d => !d)}
              style={{
                textAlign: 'left', borderRadius: 16, padding: '10px 16px',
                fontSize: 14, fontWeight: 500, fontFamily: 'inherit', border: 'none', cursor: 'pointer',
                background: 'transparent', color: dark ? '#94a3b8' : '#5f6b7a',
                display: 'flex', alignItems: 'center', gap: 8
              }}>
              {dark ? <SunIcon /> : <MoonIcon />}
              {dark ? 'Switch to light mode' : 'Switch to dark mode'}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

function KitFooter({ setPage }) {
  const paymentLogos = [
    { src: '../../assets/visa.svg', alt: 'Visa' },
    { src: '../../assets/mastercard.svg', alt: 'Mastercard' },
    { src: '../../assets/americanexpress.svg', alt: 'Amex' },
    { src: '../../assets/applepay.svg', alt: 'Apple Pay' },
    { src: '../../assets/ebt.png', alt: 'EBT' },
    { src: '../../assets/pax-logo.png', alt: 'PAX' },
    { src: '../../assets/sunmi-logo.png', alt: 'SUNMI' },
  ];

  return (
    <footer style={{ borderTop: '1px solid rgba(228,233,240,0.8)', padding: '40px 0' }}
      className="kit-footer">
      <div style={{ maxWidth: 1152, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center', marginBottom: 32 }}>
          {paymentLogos.map(l => (
            <div key={l.alt} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              height: 34, padding: '0 12px', borderRadius: 10,
              border: '1px solid #e4e9f0',
            }} className="logo-pill">
              <img src={l.src} alt={l.alt} style={{ height: 20, maxWidth: 64, objectFit: 'contain' }} />
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center', justifyContent: 'space-between', fontSize: 13 }}
          className="kit-footer-links">
          <p style={{ margin: 0 }} className="footer-copy">© {new Date().getFullYear()} KIT POS. Boutique POS solutions with direct support.</p>
          <div style={{ display: 'flex', gap: 20 }}>
            {[['Privacy Policy', 'home'], ['Terms of Service', 'home'], ['Contact Us', 'contact']].map(([label, id]) => (
              <button key={label} onClick={() => setPage(id)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, fontFamily: 'inherit', padding: 0 }}
                className="footer-link">{label}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function SectionHeading({ eyebrow, title, description, center }) {
  return (
    <div style={{ textAlign: center ? 'center' : 'left' }}>
      {eyebrow && (
        <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em' }}
          className="kit-eyebrow">{eyebrow}</p>
      )}
      <h2 style={{ margin: 0, fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.1 }}
        className="kit-section-title">{title}</h2>
      {description && (
        <p style={{ margin: '16px 0 0', maxWidth: 560, lineHeight: 1.65, fontSize: 17 }}
          className="kit-section-desc">{description}</p>
      )}
    </div>
  );
}

Object.assign(window, { KitHeader, KitFooter, SectionHeading, useDark });

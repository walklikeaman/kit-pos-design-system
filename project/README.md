# KIT POS Design System

**KIT POS** is a boutique point-of-sale company serving small specialty retail businesses — grocery stores, supermarkets, liquor stores, smoke shops, and quick-service restaurants. The product is not a generic hardware reseller; it is a managed rollout partner that provides hardware (PAX, SUNMI), software (KIT POS, KIT Stock, KIT Merchant), and hands-on onboarding and support.

**Two primary audiences:**
1. **Agents / ISOs / referral partners** — who sell or refer merchants and need a confident, professional brand
2. **Merchants** — small business owners who need a practical, trustworthy POS solution

**Source repository:** `walklikeaman/KIT-POS-Website` (Next.js 15 / React 19 / Tailwind CSS 3)
**Live site:** https://kit-pos-website.vercel.app

---

## Products

| Product | Role |
|---|---|
| **KIT POS** | Checkout, cashier flow, tender handling (cash, credit, debit, EBT, gift) |
| **KIT Stock** | Inventory visibility, low-stock alerts, reorder management |
| **KIT Merchant** | Owner-facing controls: reports, clerk permissions, QuickBooks exports |

**Hardware partners:** SUNMI (D3 Pro dual-display terminal, label printer, cash drawer, handheld scanner) and PAX (A35 payment terminal).

---

## Content Fundamentals

### Tone & Voice
- **Calm, direct, practical.** No exclamation marks, no hype, no superlatives ("the best," "revolutionary," "game-changing").
- **Operational language.** Words like: *dependable, cleaner, faster, more visibility, practical, predictable, straightforward*.
- **Third-person brand references.** "KIT POS helps agents..." not "We help agents..."
- **Sentence case everywhere.** Headlines, nav items, buttons, and eyebrows all use sentence case.
- **No emoji.** None, ever. The brand communicates through clean type and photography.

### Casing
- Headlines: Sentence case (`Real devices for checkout, payment acceptance`)
- Eyebrows (small labels above titles): ALL CAPS with wide tracking (`BOUTIQUE POS SOLUTIONS`)
- Buttons: Sentence case (`For Partners`, `Explore Platform`)
- Nav links: Title case (`User Stories`, `Solutions`)

### Example copy patterns
- Eyebrow: `Product Ecosystem`
- Hero title: `Real devices for checkout, payment acceptance, and merchant-facing workflows.`
- Body: `KIT POS helps niche retail businesses with dependable checkout systems, faster front-counter flow, cleaner inventory control...`
- CTA: `For Partners` / `Explore Platform`
- Support card title: `A rollout team that stays close after installation`

### What NOT to do
- Do not use: "seamless", "revolutionize", "all-in-one", "game-changer", "cutting-edge"
- Do not bold random phrases in paragraphs
- Do not use numbered lists for marketing claims
- Do not use emojis or icons as decorative elements

---

## Visual Foundations

### Color System
| Token | Value | Usage |
|---|---|---|
| `--kit-blue` | `#1d3557` | Primary text, buttons, CTAs, brand anchor |
| `--kit-slate` | `#5f6b7a` | Secondary text, captions, eyebrows |
| `--kit-mist` | `#f0f2f5` | Section backgrounds, hover states, card fills |
| `--kit-border` | `#e4e9f0` | All borders, dividers |
| `--kit-white` | `#ffffff` | Card surfaces, page background |
| `--kit-canvas` | `#f0f2f5` | App boards behind white cards |
| Dark `--kit-dark-bg` | `#12161c` (graphite) | Page bg in dark mode |
| Dark `--kit-dark-surface` | `#1b2129` | Card surfaces in dark mode |
| Dark `--kit-dark-border` | `#2c3540` | Borders in dark mode |
| Dark `--kit-dark-text1` | `#e6eaf0` | Main button in dark mode (graphite text); sky `#0ea5e9` is accent and focus only |
| `--kit-error` / dark | `#dc2626` / `#ff5a4e` | Mistakes: wrong code, Log out |
| `--kit-late` | `#dc2626` | Late, New header: a fill with white text |
| `--kit-ready` / dark | `#3d7a30` / `#6fae52` | Ready, success (atom green) |
| `--kit-preparing` | `#f2c230` | Preparing (atom yellow) |
| `--kit-push` | `#e8891c` | A ticket getting old (atom orange) |

One palette for every KIT product, the apps and the website alike (Nikita
2026-10-27/30). The full table with every role is in `apps/README.md`, "One
palette"; the slate dark set (`#020617` / `#0f172a`) is retired.

**Color vibe:** Monochromatic navy-blue anchor, near-white canvas. No gradients on primary surfaces. Subtle radial gradient on body (see globals.css) for depth without distraction. Cool, calm, corporate-boutique.

### Typography
- **Font:** Inter (Google Fonts) — clean, geometric, screen-optimized sans-serif
  - *Note: The codebase does not explicitly declare a font; Inter is the recommended match for Tailwind's default.*
- **Headings:** `font-semibold`, `tracking-tight` (-0.025em)
- **Eyebrows:** `text-sm font-semibold uppercase tracking-[0.14em]` in `--kit-slate`
- **Body:** `text-base leading-relaxed` (1.625 line-height)
- **Scale:** xs/sm/base/lg/xl/2xl/3xl/4xl/5xl/6xl

### Spacing
- Content max-width: `max-w-6xl` (72rem / 1152px), padded `px-4 sm:px-6 md:px-8`
- Section vertical rhythm: `py-14 md:py-20 lg:py-24`
- Card padding: `p-5` (small), `p-6` (standard), `p-8 md:p-12` (large)
- Gap between cards: `gap-4` to `gap-6`

### Corner Radii
| Context | Value |
|---|---|
| Buttons, nav pills | `rounded-full` (9999px) |
| Small cards, dropdown items | `rounded-xl` (0.75rem) |
| Standard cards | `rounded-[1.25rem]` to `rounded-[1.5rem]` |
| Large feature cards | `rounded-[1.75rem]` to `rounded-[2rem]` |

### Shadows
- **Soft:** `0 8px 30px rgba(29, 53, 87, 0.08)` — used on cards and elevated surfaces
- No dramatic drop shadows; no colored shadows

### Backgrounds & Surfaces
- Page: white with subtle radial gradients (kit-blue tinted, very low opacity)
- Alternate sections: `bg-kit-mist/50` — every other section for visual rhythm
- Cards: white bg + `border border-kit-border` + `shadow-soft`
- Header: `bg-white/90 backdrop-blur` — glassmorphism sticky header

### Animations
| Name | Description | Duration |
|---|---|---|
| `float-gentle` | Subtle Y float ±14px | 4–6s infinite |
| `pulse-glow` | Opacity + scale pulse | 3s infinite |
| `grid-drift` | Slow background grid drift | 18s infinite |
| `shimmer-sweep` | Horizontal shimmer across surface | 2s |
| `bob-x` | Small XY bob (hardware visuals) | 5s infinite |

All animations respect `prefers-reduced-motion`. Easing is always smooth/ease-in-out — no bounces or elastic effects.

### Hover States
- Primary button: `hover:opacity-90`
- Ghost/outline button: `hover:bg-kit-mist`
- Nav links: `hover:bg-kit-mist hover:text-kit-blue`
- Cards: no hover transform (calm, not playful)
- Links in footer/body: `hover:text-kit-blue` color shift

### Borders
- All borders: `border-kit-border` (`#e4e9f0`) at full opacity or `/70` for headers
- No accent-color left-border cards
- No colored card headers

### Iconography
- **No icon library** is used in the codebase. KIT POS intentionally avoids icon-heavy UI.
- Payment logos (Visa, Mastercard, Amex, Apple Pay, etc.) are used as image assets
- Hardware partner logos (PAX, SUNMI) are image assets
- If icons are needed, use **Lucide** (CDN: https://unpkg.com/lucide@latest) — thin stroke, 24px, matching the clean minimal style
- No emoji, no unicode-as-icons, no decorative SVG illustrations

### Imagery
- **Hardware photography:** Clean product shots on white/near-white backgrounds, used at large scale
- **Interior photography:** Real store environments — warm-toned, natural light, counter settings
- **Software screenshots:** Actual UI screenshots in a neutral presentation frame
- **Color vibe:** Neutral, natural, cool-to-warm. No heavy filters. No stock-art illustrations.

### Dark Mode
- Triggered by `html.dark` class, stored in `localStorage` under key `kit-pos-theme`
- Background: graphite `#12161c`, surfaces: `#1b2129`
- Text: `#e6eaf0` primary, `#c9d2dc` secondary, `#9aa6b4` muted
- Borders: `#2c3540` / `#3a4552`
- Primary CTA switches to `sky-500` background with dark text in dark mode
- Radial gradients shift to sky/blue tones

---

## Modern Design Vision (2025–2026 Direction)

The following recommendations extend the existing visual language into a more forward-looking design position while staying true to the boutique, calm brand character:

1. **Variable font optical sizing** — Use Inter's variable axis for better headline rendering at large sizes
2. **Scroll-driven section reveals** — CSS `@keyframes` triggered by scroll position for section entrances
3. **Horizontal feature scroll** — Product cards in a horizontal scroll strip on mobile, fixed grid on desktop
4. **Split-screen hero** — Text left, hardware visual right with a gentle parallax effect
5. **Dot grid texture** — Subtle repeating dot pattern on mist-bg sections for depth
6. **Frosted glass cards** — `backdrop-filter: blur` for modal-style overlays and callout cards
7. **Typographic hero scale** — Push h1 to 72–96px at desktop for a more editorial feel
8. **Neutral tone photography framing** — Hardware images at 2x scale, cropped to key details
9. **Minimal micro-interactions** — Shimmer on card hover, smooth height transitions on FAQ expand
10. **Command palette pattern** — Quick-access "Try a demo" or "Find your solution" interactive element

---

## Iconography

No icon font or sprite is used in the current codebase. The design system recommends **Lucide Icons** (thin-stroke, 2px, rounded line-caps) if icons become needed. Load from CDN:
```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
```

Payment and partner logos are SVG/PNG image files in `assets/`.

---

## File Index

```
README.md                    ← This file
SKILL.md                     ← Agent skill manifest
colors_and_type.css          ← CSS custom properties (design tokens)
assets/
  kit-pos-header-logo.png    ← Primary brand logo
  pax-logo.png               ← PAX hardware partner logo
  sunmi-logo.png             ← SUNMI hardware partner logo
  visa.svg, mastercard.svg   ← Payment brand logos
  applepay.svg, ebt.png      ← More payment logos
  americanexpress.svg, discover.svg
  hardware-d3-pro.png        ← SUNMI D3 Pro product photo
  hardware-pax-a35.webp      ← PAX A35 product photo
  kit-pos-screen.png         ← KIT POS software screenshot
  kit-pos-screen-2.png       ← KIT POS checkout view
  kit-stock-screen.png       ← KIT Stock inventory view
  kit-merchant-screen.png    ← KIT Merchant reports view
  interior-counter-checkout.png ← Store interior photo
preview/
  colors-primary.html        ← Primary brand colors
  colors-neutral.html        ← Neutral / surface palette
  colors-dark.html           ← Dark mode palette
  colors-semantic.html       ← Semantic color usage
  type-scale.html            ← Type scale specimens
  type-eyebrow.html          ← Eyebrow + label patterns
  type-body.html             ← Body + caption styles
  spacing-tokens.html        ← Spacing & layout tokens
  radius-shadow.html         ← Border radius + shadow system
  animations.html            ← Animation library
  component-buttons.html     ← Button variants
  component-nav.html         ← Header navigation
  component-cards.html       ← Card patterns
  component-forms.html       ← Form inputs
  component-badges.html      ← Eyebrow badges & tags
  brand-logo.html            ← KIT POS logo
  brand-partners.html        ← Payment & hardware logos
  brand-photography.html     ← Imagery style guide
ui_kits/
  website/
    README.md                ← Website UI kit notes
    index.html               ← Full interactive website prototype
    Header.jsx               ← Site header component
    Footer.jsx               ← Site footer component
    HeroSection.jsx          ← Homepage hero
    ProductCards.jsx         ← Product ecosystem cards
    HardwareCard.jsx         ← Hardware showcase card
    SectionHeading.jsx       ← Eyebrow + title + description
    UserStoryCard.jsx        ← Merchant testimonial card
    ContactForm.jsx          ← Contact form component
```

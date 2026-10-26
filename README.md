# KIT POS Design System

Single source of truth for all KIT POS product visual decisions.
Used by the marketing website, the POS app, and all future mobile and web products.

**Created with [Claude Design](https://claude.ai/design).**

---

## What this repo contains

```
project/
├── colors_and_type.css   ← Master token file: all colors, typography, spacing
├── preview/              ← HTML visual previews for every token and component
├── assets/               ← Brand logos, hardware photos, software screenshots
├── apps/                 ← App layer for Kitchen, Monitor, Label, Invoice, Waiter (mark, icons, cards)
└── ui_kits/
    ├── website/          ← React/JSX components for the marketing site
    └── pos-app/          ← HTML prototype of the POS cashier app
```

Full documentation: [`project/README.md`](project/README.md)

---

## How to use in any product

### Web (Next.js / React)
Copy `project/colors_and_type.css` into your project and import in `globals.css`:
```css
@import './kit-pos-tokens.css';
```

### Mobile (React Native)
Convert CSS variables from `colors_and_type.css` to a JS token object.
See `project/README.md → React Native / Mobile` section.

### Asking an AI agent to build something
> "Use the KIT POS design system at https://github.com/walklikeaman/kit-pos-design-system —
> read `project/colors_and_type.css` for tokens and `project/preview/` for component examples."

---

## Products using this design system

| Product | Repository | Status |
|---|---|---|
| Marketing website | [walklikeaman/KIT-POS-Website](https://github.com/walklikeaman/KIT-POS-Website) | Live |
| Mobile app | TBD | Planned |
| POS app | Internal | In progress |

---

## Key design decisions

- **Primary font:** Plus Jakarta Sans
- **Primary color:** `#1d3557` (navy blue)
- **Light mode surface:** `#ffffff` / `#f4f7fb`
- **Dark mode surface:** `#020617` / `#0f172a`
- **No icon libraries** — Lucide if icons are needed
- **No emoji** in any product UI or copy
- Tone: calm, direct, professional — no hype language

---

## Updating tokens

1. Edit `project/colors_and_type.css`
2. Update relevant preview HTML in `project/preview/`
3. Commit: `update token: --kit-blue → #newvalue`
4. Pull latest in all product repos that reference this file

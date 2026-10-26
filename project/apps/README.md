# KIT app layer

Shared look for the KIT apps that run on the counter and in the kitchen:
KIT Kitchen, KIT Monitor, KIT Label, KIT Invoice and KIT Waiter. It sits on top
of `../colors_and_type.css`. It keeps the brand font (Plus Jakarta Sans) and the
status colours the apps already ship with. What changes is the card shape, the
effects, and one mark and one icon format for the whole family.

The decisions and the options that were turned down are recorded on the kitpos
wiki page `concepts/design-review-2026-10.md`. Nikita approved them on 2026-10-25
and 2026-10-26.

| File | What it is |
| --- | --- |
| `kit-apps.css` | Tokens and components: status colours, corners, Monitor order card, Kitchen flap number, Kitchen tabs |
| `kit-ready.js` | `kitReadyMove()` moves a Monitor card from PREPARING to READY (R2), then runs O1 |
| `kit-mark.js` | `kitMark()` draws the KIT atom with sheens running along its orbits |
| `kit-atom.png` | The clean app atom, the same file the apps already use. Never redraw it. |
| `icons/` | Launcher icons, 1024 px: full (`kit-<app>.png`) and adaptive foreground (`kit-<app>-foreground.png`), with SVG sources |

Previews: `../preview/app-monitor-card.html`, `app-mark.html`, `app-kitchen.html`, `app-icons.html`.

## The mark

The atom is never changed: not its shape, not its colours, not the weave. The
only addition is a soft sheen per orbit. Each sheen is masked to that orbit's own
pixels, so where two orbits cross it passes under the one on top. The
business-card vector in kitpos (`tool/business-cards/assets/kit-pos-mark.svg`) is
a reference only, because its edges are soft.

```js
kitMark({ size: 30 })                    // header LIVE indicator: endless, gentle
kitMark({ size: 110, sheen: 'once' })    // a label printed, an invoice page read
kitMark({ size: 30, sheen: 'none' })     // offline: no sheen, colours unchanged
```

Where it is used: the connection indicator in the header, reading invoice pages
(one orbit per page), label printing, and the empty Monitor screen. It never
appears on Kitchen tickets.

## App icons

Every app uses the same format: the atom at the same size and position, and the
app's object standing on a dark shelf at the bottom right, drawn in one style
(a green gradient dome with grey details).

- **Monitor**: a service bell ringing "ready".
- **Kitchen**: a cloche with steam.
- **Label**: a price tag, which replaces the old printer.
- **Invoice**: a receipt.

The object sits slightly inward so Android's round mask does not clip it.
Launcher icons are static. Only the Android 12+ splash screen can animate.

## Monitor order card

The left side is a stub showing where the order goes (TABLE T1, or TO GO with a
bag icon). A dashed tear line separates it from the customer's name, the order
number and the status. When an order turns ready, call
`kitReadyMove(card, readyColumn)`:

- R2: the card travels from PREPARING into READY and turns green when it arrives;
- O1: one pass of light then runs along a medium crescent ribbon, 5 px at its middle.

With reduced motion, the card simply appears in READY in green, with no ribbon.

## Kitchen

- **KD-2**: the order number is shown as flap tiles on a receipt-style ticket. The tiles flip when the ticket changes.
- **T1**: the tabs use a sliding pill, and one sheen passes over it when it moves.

## Corners

A squircle at the same radius cuts away less of the corner than plain rounding,
so it looks sharper. To keep the look as round as today's, the radii grow.
Nikita picked these on 2026-10-26:

| App | `corner-shape` | Radii |
| --- | --- | --- |
| Monitor | `squircle` | card 28 (was 16), stub 16 |
| Kitchen | `superellipse(1.5)` | ticket 16, buttons 13, chips and bands 10, flap tiles 8, tab pill 19 (today's radii ×1.6) |

`corner-shape` needs Chrome 139 or newer. Older WebViews fall back to plain
rounding at the same radius, which comes out a little rounder. In Flutter the
equivalent is `RoundedSuperellipseBorder` (Flutter 3.32+).

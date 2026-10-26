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
number and the status. When an order turns ready, add `.just-ready` once:

- the card flips to the ready colour (R1);
- one pass of light runs along a medium crescent ribbon, 5 px at its middle (O1).

With reduced motion, only the colour change happens.

## Kitchen

- **KD-2**: the order number is shown as flap tiles on a receipt-style ticket. The tiles flip when the ticket changes.
- **T1**: the tabs use a sliding pill, and one sheen passes over it when it moves.

## Corners: pending

On 2026-10-26 Nikita turned down a full squircle at radius 28 because it looks
less round than today's cards. A squircle at the same radius cuts away less of
the corner, so the radius has to grow to look just as round. The options, as
multiples of today's radii (Monitor card 16, Kitchen ticket 10):

| Option | `corner-shape` | Radius |
| --- | --- | --- |
| S1 | `superellipse(1.5)` | ×1.35, as round as today but smoother |
| S2 (recommended) | `superellipse(1.5)` | ×1.6, slightly rounder |
| S3 | `squircle` | ×2 |

Until he picks one, `--kit-app-corner-shape` stays `round` and the radii stay as
they are today. `corner-shape` needs Chrome 139 or newer; older WebViews fall back
to plain rounding. In Flutter the equivalent is `RoundedSuperellipseBorder`
(Flutter 3.32+).

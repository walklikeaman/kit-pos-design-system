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

Previews: `../preview/app-monitor-card.html`, `app-mark.html`, `app-kitchen.html`, `app-icons.html`,
`app-login.html` (L1, with a looping demo at `?auto=1`) and `app-shell.html` (header, menu, settings).

## One palette (Nikita 2026-10-27)

Every app uses the same surface and status colours, light and dark. They are
the `--kit-app-*` tokens in `kit-apps.css`; an app maps its theme onto them
and adds no colour of its own. The website keeps its slate dark palette from
`colors_and_type.css`; the apps don't use it.

| Role | Light | Dark |
| --- | --- | --- |
| Background | `#F0F2F5` | `#12161C` |
| Card | `#FFFFFF` | `#1B2129` |
| Line | `#E4E9F0` | `#2C3540` |
| Text | `#1D3557` | `#E6EAF0` |
| Second text | `#5F6B7A` | `#9AA6B4` |
| Main button | `#1D3557` | `#0EA5E9` |
| Error | `#9B2C2C` | `#E57373` |
| Ready | `#177245` | `#34B36B` |
| Preparing | `#E3B505` | `#E3B505` |

Sky `#0EA5E9` is the accent and the focus ring in light, the main button in
dark. White text never sits on plain sky (2.77:1); in light a filled button is
navy. Error is KIT Label's brand red, the family's canonical theme. Error red
is for mistakes only; a late order keeps its own status red.

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

## Login (L1, Nikita 2026-10-26)

Every app logs in the same way, from the same screen. Classes: `.kit-login` and
its parts in `kit-apps.css`. Preview: `../preview/app-login.html?app=label&auto=1`.

- **Layout.** One centred column, 440 px at most, no card: the KIT atom (132 px),
  the app name as a small eyebrow, the title "Log in", one line of lead, then the form.
  On a phone the same column fills the width with a 16 px gutter.
- **Copy.** Each app keeps the words it already ships; only layout and motion
  are shared. The wall screens (Monitor, Kitchen) are connected once, like an
  appliance: title "Connect this screen", button "Connect", "Checking…" while
  waiting. The handheld apps (Label, Invoice) say "Log in". Everywhere the field
  is "Login code" and the clerk's code is found in "KIT Merchant → Clerks", never
  "KIT Dashboard". The demo hint stays where the app has a demo store.
- **Scanning, as in KIT Label.** The field and a square camera button share one
  row. The camera opens a full-screen scanner; a code it reads logs in by itself,
  with no tap on "Log in". A device with its own scanner (the V3 Plus side keys)
  also logs in straight from a scan while the login screen is open. A device with
  no camera and no scanner shows the field alone. Monitor and Kitchen never get
  the scan button: they are typed in once on the wall (Nikita 2026-10-26).
- **Waiting.** The field dims. The button shows a 30 px atom and the waiting word ("Checking…" or "Logging in…").
  Both atoms get one sheen pass along the orbits every 1.3 s until the server
  answers. This is the only motion that repeats, and it ends with the wait.
- **Wrong code.** The field border turns the app's error colour (Monitor has none,
  so it uses its text colour), the field shakes once (360 ms) and the error line
  appears under it. Focus stays in the field.
- **Success.** The button turns green with a check and "Connected" (450 ms). Then
  the words drop away (300 ms), the atom swells to ×9 and fades (800 ms), and the
  app comes up behind it. In Angular put `animate.leave` on the login's host
  element, the one the `@if` removes; inside the component it never plays.
- **Reduced motion.** No shake, no swell, no sheen: the states change in place.
- **Storage.** The code or token lives only in the Keystore or Keychain (rule of 2026-10-21).

## Header, menu and settings (S-B, Nikita 2026-10-26)

Preview: `../preview/app-shell.html?app=kitchen&screen=settings` (`screen=menu`, `scheme=dark`).

- **Header** (`.kit-header`, 68 px, 60 px on a phone): the atom (34 px) on the
  left, then the app name with the store under it, then the app's own tabs. On
  the wall screens (Monitor, Kitchen) the clock and LIVE sit on the right, and the
  atom's sheen is the connection indicator. A ⋮ button closes the row.
- **⋮ menu** (`.kit-menu`): a store card on top (app icon, store name, app and
  version) above a dashed tear, then Settings, Store and clerk, Help, and Log out
  in the error colour. On a phone it spans the width under the header.
- **Settings S-B** (`.kit-settings`): a ticket. The stub on the left holds the app
  icon and name, the sections, and Log out at the foot. A dashed tear separates it
  from the rows. The body has the section title and a Done button. Controls are
  switches, segmented choices and steppers in the app's corners. Under 700 px the
  ticket fills the screen, the sections become chips in a strip on top, the tear
  runs across, and Log out stays in the ⋮ menu.

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
`app-login.html` (L1, with a looping demo at `?auto=1`), `app-shell.html` (header, menu, settings)
and `app-scanbar.html` (the scan bar).

## Look here before you build a screen (Nikita 2026-11-02)

We already have answers for most screens. Before you draw a login, a header, a
menu, Settings, a barcode field, a number field or an icon, find the pattern on
this page and copy it, words included. Only when nothing here fits do you design
something new, and then it comes here first, so the next app copies it too.
When one app's version gets better, the change lands here and in every app that
shows the same thing, not in one app alone.

KIT Invoice is why: its barcode entry was built from scratch (an emoji camera
button, an "Or type it" field and a Find button) while KIT Label had shipped the
right one since July. Gahl had to point it out.

## One palette (Nikita 2026-10-27)

Every app uses the same surface and status colours, light and dark. They are
the `--kit-app-*` tokens in `kit-apps.css`; an app maps its theme onto them
and adds no colour of its own. The website uses the same palette: since
2026-10-30 `colors_and_type.css` carries these values as `--kit-dark-*`,
`--kit-canvas`, `--kit-error`, `--kit-ready` and `--kit-preparing`.

| Role | Light | Dark |
| --- | --- | --- |
| Background | `#F0F2F5` | `#12161C` |
| Card | `#FFFFFF` | `#1B2129` |
| Line | `#E4E9F0` | `#2C3540` |
| Text | `#1D3557` | `#E6EAF0` |
| Second text | `#5F6B7A` | `#9AA6B4` |
| Main button | `#1D3557`, white text | `#E6EAF0`, `#12161C` text |
| Error text | `#DC2626` | `#FF5A4E` |
| Late, New header | `#DC2626`, white text | `#DC2626`, white text |
| Ready | `#3D7A30`, white text | `#6FAE52`, dark text |
| Preparing | `#F2C230` | `#F2C230` |
| Getting old (PUSH IT) | `#E8891C` | `#E8891C` |

Round 2, Nikita 2026-10-31. The main button is the colour of the text: navy in
light, near-white in dark (15:1). Sky `#0EA5E9` stays the accent and the focus
ring and is never a filled button; as the dark button it made the apps look
like every other AI product. The states take the colours of the logo's atom
(yellow, orange, green), so colour on screen always means a state. Red is
`#DC2626` everywhere as a fill (4.83:1 with white); red text on the dark card is
`#FF5A4E` (5.3:1), because `#E57373` read as pink. Options and ratings:
https://claude.ai/artifact/B8JeXyMr6vRVkgTbqzD3Tc

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
- **Waiter**: a bow tie.
- **Kiosk**: a kiosk screen on its stand.
- **POS Bench** (the printer test till): a receipt printer.

### One size on Android (Nikita 2026-11-02)

The 1024 px files are the part of the icon a launcher shows. On Android that is
the centre 72 dp of the 108 dp adaptive layer, so the art goes there and
nowhere else; then the atom spans the same 21.5 to 84.2 dp in every app.

- Either the XML insets the foreground (`<inset android:inset="16.7%">`, Kitchen,
  Monitor, Label, Waiter) and the PNG is the 1024 file scaled down as it is,
- or the XML uses the PNG as the whole layer (Kiosk, Bench, Invoice) and the PNG
  has the 1024 file in its centre two thirds.

Never both, never neither: both made KIT Monitor a third smaller, neither made
KIT Kiosk spill past its tile. The iOS app icon is the full 1024 file as it is.

**Sharp on every density.** With the XML inset, Android stretches the PNG to
fill 72 dp. So each `mipmap-*` foreground PNG is cut at 72 dp for its density
(mdpi 72, hdpi 108, xhdpi 144, xxhdpi 216, xxxhdpi 288 px), not at the 48 dp
legacy size (192 px at xxxhdpi), or the icon comes out 1.5 times blown up and
soft. KIT Waiter's icon looked smeared that way (Nikita 2026-11-02, fixed in
Waiter, Kitchen #92 and Monitor #45). Check: the xxxhdpi foreground is 288 px wide
with the XML inset, 432 px without it.

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
- **Settings S-B** (`.kit-settings`): one plain list, on every width (Nikita
  2026-11-02). The sheet has the title and Done, the app's name over a dashed
  tear, then one row per section (icon, name, chevron) and Log out last, in the
  error colour. A row opens that section's page: back arrow, the section's
  name, Done, then its rows. Controls are switches, segmented choices and
  steppers in the app's corners. Centred, at most 720 px wide; under 700 px it
  fills the screen. Preview `screen=settings` is the list, `screen=section` a page.
- **Never tabs, never a left column.** Up to 2026-11-02 this section said the
  sections sat on a stub on the left and became a strip of chips under 700 px.
  That narrow version was written here without being shown to Nikita, then
  copied into KIT Kitchen, KIT Monitor and KIT Label; he never approved it
  («У нас нигде не должно быть такое меню со вкладками»). All three went back
  to the list on 2026-11-02 (Kitchen #93, Monitor #46, Label #271).

## One design for every app (Nikita 2026-11-02)

Every KIT app follows the same principle for the same kind of screen. Rules
drawn from the tabs mistake:

1. **Every width is a design.** A pattern here is approved only for the widths
   Nikita was shown. Before a pattern lands here, render it on a small phone
   (360), a normal phone (390), a tablet in portrait and in landscape, light and
   dark, and show him all of them. A width nobody showed him is not approved.
2. **No invented variants.** An app, or a breakpoint in this file, never
   changes how a screen is navigated (list, tabs, columns, rail) on its own.
   A new layout is a new design: render it, show it, wait for his word.
3. **Change the pattern, then every app.** A fix to a shared screen goes here
   first, then into each app in the same pass; one app fixed and the rest
   left behind is a divergence.
4. **Design check.** Before showing a build, compare the screens this file
   covers (login, header, ⋮ menu, Settings, scan bar, number fields) with the
   preview and with the sibling apps. Any difference without a reason written
   here is a bug: fix it in the app, or record the reason here.

## Icons inside a screen: no emoji (Nikita 2026-11-02)

Buttons and rows use the line icons in `icons/ui/` (Material Symbols, the same
shapes KIT Label draws with Flutter's `Icons.*`), in the text or muted colour.
No emoji anywhere in the UI: 📷 looks different on every phone, cannot take
our colours and reads as a toy. KIT Invoice swapped its 📷 for these on
2026-11-02 (kit-stock 267c74e).

## Scan bar (Gahl 2026-07-24, every app 2026-11-02)

Class `.kit-scanbar`, preview `../preview/app-scanbar.html`. Flutter original:
`_ScanBar` in KIT Label `lib/screens/home/studio_widgets.dart`.

- **One row:** the barcode icon (`icons/ui/barcode.svg`, six stripes, not a hand
  scanner: Nikita chose it 2026-11-02 after seeing both), the field, a clear ✕ only while there is text, and the camera button
  last, in the accent colour.
- **Words:** the placeholder is "Scan or enter product barcode". No label above,
  no "Or type it".
- **No Find button.** Enter looks the code up (`enterkeyhint="search"` on web);
  a hardware scanner ends its code with Enter, so it works the same way.
- **An empty bar is not an error.** Nothing turns red until a real code is not found.
- **The field** is `inputmode="numeric"` text, 16 px or larger (iOS zooms into
  smaller fields), never `type="number"`, which drops leading zeros.

## Header on every width (Nikita 2026-11-02)

One top bar on phone and tablet, in both orientations: atom, app name with the
store under it, the app's own tabs, then ⋮ (see S-B above and kitpos
KIT-SHARED-RULES §13.12). No left rail: on a tablet it takes a whole column for
three links. From about 760 px the bar only gets roomier. KIT Invoice moved from
its rail to the top bar on 2026-11-02 (kit-stock cb32e3a). A list that is the
screen's content (KIT Waiter's tables) is not a navigation rail and may stay.

## Number fields (Nikita 2026-11-02)

Prices, costs, percents and counts:

- **Keep what is typed while the field has focus.** Show it as $0.00 or 30% only
  on blur. A field bound straight to the formatted value rewrites "1" as "1.00"
  and the next digit lands after the cents. That bug hit KIT Invoice on the
  iPhone (kit-stock 769695e).
- **Tapping selects the whole value,** so a new number replaces the old one.
- **Rows do not jump while typing.** A row that hides on a value (a case of 1)
  stays until the field loses focus: "12" starts with "1".
- **Text with `inputmode="decimal"`** (or `numeric` for counts), 16 px or larger;
  accept a comma as the decimal point.
- **Tests type one character at a time,** redrawing after each, for every number
  field on the screen, plus wrong input and an empty field. KIT Invoice's
  `src/app/invoice/invoice-fields.spec.ts` (33 cases, kit-stock b2f6535) is the model.


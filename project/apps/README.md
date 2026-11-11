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
`app-scanbar.html` (the scan bar), `app-motion.html` (menu, Settings, toast, pills, icons) and
`app-settings.html` (the ⋮ menu and Settings, exact, KIT Label as the model).

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
- **Label**: an electronic shelf label showing a price ($4.99). It replaced the price tag on a string, which read as a clothing tag (Nikita 2026-11-11).
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
  version) above a dashed tear, then the rows, Log out last in the error colour.
  Exact sizes: [⋮ menu, exact](#-menu-exact-nikita-2026-11-03) below.
- **Version on the store card** (Nikita 2026-11-03). The line under the store
  name is the app, its version and its build number, in KIT Label's format:
  `KIT Label · 4.4.0 (412)`, that is `<app name> · <version> (<build>)`. The
  version and build come from the installed package at run time (Flutter
  `PackageInfo`, Capacitor `App.getInfo()` → `version` and `build`), never a
  string typed into the code, so the card always names the build that is
  running. No `v` prefix. In a browser preview with no native layer, show the
  version from `package.json` without the build. KIT Label had this since its
  drawer was built; the other apps did not, which is why it is written here.
- **Settings** (`.kit-settings`): one plain list on every width. Exact
  container, rows and icons: [Settings, exact](#settings-exact-nikita-2026-11-03) below.
- **Never tabs, never a left column.** Up to 2026-11-02 this section said the
  sections sat on a stub on the left and became a strip of chips under 700 px.
  That narrow version was written here without being shown to Nikita, then
  copied into KIT Kitchen, KIT Monitor and KIT Label; he never approved it
  («У нас нигде не должно быть такое меню со вкладками»). All three went back
  to the list on 2026-11-02 (Kitchen #93, Monitor #46, Label #271).

## Reference: KIT Label's menu and Settings (Nikita 2026-11-03)

Nikita opened KIT Invoice's Settings on his phone and found it drifting: it
filled the screen with bare rows, while KIT Label shows the rows on a framed
card with a margin from the screen's edges. «Такие вещи должны быть в
дизайн-системе прописаны»: how the menu, Settings and their icons look. The
numbers below are measured from KIT Label 4.4.0 (`lib/screens/settings_screen.dart`,
`lib/screens/app_menu_drawer.dart`), rendered for real and put next to this
file's CSS. Every app copies them; a difference is a bug.

Preview: `../preview/app-settings.html` (`screen=menu|settings|section|about`,
`app=label|invoice|kitchen|monitor`, `scheme=dark`; the window size picks phone
or tablet). Reference shots: `../preview/img/reference/`, KIT Label beside the
preview, each labelled with device, orientation and theme.

### ⋮ menu, exact (Nikita 2026-11-03)

| Part | Value |
| --- | --- |
| Where | Under the header: top = header bottom + 6 px. Phone (< 600 px wide): 8 px from both sides. Wider: 320 px wide, right edge 8 px from the screen's. Taller than the window: stops 8 px above the bottom and scrolls, so Log out stays reachable. |
| Card | `--kit-app-surface`, 1 px `--kit-app-line`, radius `--kit-app-radius-card` (28, squircle), shadow `0 24px 60px #0003`, padding 8. No dimmer behind it; a tap outside closes it. |
| Store card | Padding 12 12 14. App icon 44 px, squircle radius 10. Store name 17/800, one line, ellipsis. Under it `<App> · <version> (<build>)` 12/600 muted, then the clerk 12/400 muted (left out when unknown). |
| Tear | 2 px dashed `--kit-app-line`, then 6 px. |
| Row | 52 px tall, padding 0 12, icon 22 px in `--kit-app-muted`, 14 px gap, label 16/700 in `--kit-app-text`, one line. Hover/press: `--kit-app-raised`, radius `--kit-app-radius-field`. |
| Rows, in order | The app's own rows first (KIT Label: Home, Print history; Kitchen and Monitor: Store and clerk), then **Help**, **Settings**, and **Log out** last: label and icon in `--kit-app-error`. |

### Settings, exact (Nikita 2026-11-03)

The inside is the same on every width: a head, then framed group cards on the
background colour. Only the container changes with the screen.

| Screen | Container |
| --- | --- |
| Phone upright (< 700 px wide) and phone on its side (< 500 px tall) | Fills the screen, `--kit-app-bg`. The head and the cards keep to a 720 px column in the middle. No sheet edge, no shadow. |
| Tablet upright and on its side, wall screens (Kitchen, Monitor) | A sheet over `--kit-scrim`, centred: `min(720 px, 100vw − 48)` wide, as tall as its content up to `min(760 px, 100vh − 48)`, so 24 px or more of the screen shows round it. `--kit-app-bg`, 1 px `--kit-app-line`, radius 28 squircle, shadow `0 30px 80px #0004`. It scrolls inside. |

**The sheet on every tablet** (Nikita chose it 2026-11-03 over KIT Label's
full page). KIT Label still opens Settings on a tablet as a full page with the
card centred (shot `label-settings-tablet1280-landscape-light.png`); it moves
to the sheet in its own thread.

| Part | Value |
| --- | --- |
| Head | At least 68 px; padding 12 16 12 22. Title 22/800, one line. **Done** on the right: the main button (`--kit-app-primary`, white text in light, dark text in dark), at least 88 × 44, 16/800, radius `--kit-app-radius-field`. A section page puts the back arrow (`back.svg`, 44 px target) before its title. Never a ✕. |
| List | Scrolls; padding 0 16 16, so every card is 16 px from the screen (or sheet) edge. |
| Group card | `--kit-app-surface`, 1 px `--kit-app-line`, radius 28 squircle. 12 px between two cards. The Settings list is one card with Log out as its last row. |
| Group title | Only over a second card that needs a name ("About us"): 12/700, letter-spacing 0.3 px, `--kit-app-muted`, 14 px above, 6 px below, 6 px in from the card. No title over a page's only card. |
| Section row (opens a page) | At least 60 px; padding 10 12 10 16. Icon 24 px in the text colour, 16 px gap, name 16/700, one muted line under it 13/500 that says what is inside (≤ 32 characters, so it stays on one line on a 360 px phone), chevron 24 px muted at the end. |
| Setting row (has a control) | The same row; the control (switch, segmented choice, stepper, picker) sits **on the same line** at the right. It drops under the text only when it does not fit there. No line under the name unless it tells the merchant something the name does not. |
| Value row | Name on the left, the value right-aligned 15/600 muted (version, store name). |
| Divider | 1 px `--kit-app-line` between rows, starting 56 px in (under the text, not under the icon). |
| Log out | Last row of the Settings card: `logout.svg` and "Log out" in `--kit-app-error`, no chevron, no line under it. |
| What is not there | No app-name block above the list (the ⋮ menu and About carry the app and version), no tabs, no left column, no full-width bare rows on a phone. |
| Motion | Opens rising 16 px and fading in, 220 ms; leaves in 160 ms (see Motion below). A section page opens the same way inside the same container. |

### Icons in the menu and in Settings

Material Symbols Outlined, files in `icons/ui/` (Flutter: the `Icons.*` named).
Rows use 24 px in the text colour; the ⋮ menu uses 22 px muted.

| Row | File | Flutter |
| --- | --- | --- |
| Settings | `settings.svg` | `Icons.settings_outlined` |
| Help | `help.svg` | `Icons.help_outline` |
| Log out | `logout.svg` | `Icons.logout` |
| Home | `home.svg` | `Icons.home_outlined` |
| Print history, history | `history.svg` | `Icons.history` |
| Store and clerk | `person.svg` | `Icons.person_outline` |
| Store, My store | `store.svg` | `Icons.storefront_outlined` |
| Printers | `print.svg` | `Icons.print_outlined` |
| Scanner | `scanner.svg` | `Icons.qr_code_scanner` |
| Notifications, Sound | `bell.svg` | `Icons.notifications_none` |
| Appearance | `palette.svg` | `Icons.palette_outlined` |
| Theme | `theme.svg` | `Icons.contrast` |
| Language, website | `language.svg` | `Icons.language` |
| Units | `units.svg` | `Icons.straighten` |
| Prices, markup | `price.svg` | `Icons.sell_outlined` |
| Board (Kitchen, Monitor) | `board.svg` | `Icons.view_column_outlined` |
| Storage | `storage.svg` | `Icons.cleaning_services_outlined` |
| About | `info.svg` | `Icons.info_outline` |
| What's new | `whats-new.svg` | `Icons.auto_awesome_outlined` |
| Send feedback | `feedback.svg` | `Icons.feedback_outlined` |
| Opens outside the app | `external.svg` | `Icons.open_in_new` |
| Opens a page | `chevron.svg` | `Icons.chevron_right` |
| Back | `back.svg` | `Icons.arrow_back` |

A new row needs an icon from this list or a new Material Symbol added here
first. Never an emoji, never a text character.

## Save screen space (Nikita 2026-11-03)

«Не нужно растягивать, не нужно делать длинные скроллинги по экрану.» What the
merchant came for has to be on the screen without scrolling, on every device.
KIT Invoice's item sheet is why: a banner "Not in your store yet, fill in what
is marked required to edit" wrapped and left the word "it" alone on a line, the
"New product" badge took a row of its own, and cost, markup, margin and price
were pushed below the fold, as if adding a product mattered more than its price.

1. **The main data first.** Each screen names its main data (item sheet: cost,
   markup, margin, price, stock; board: the tickets; Settings: the sections). On
   a 360 × 640 phone it is visible without scrolling. Everything else goes under it.
2. **One line for a banner or hint.** At most about 40 characters, so it fits a
   360 px phone in one line. Say it short ("New product: fill the required
   fields"), or move the explanation behind a help icon. A wrapped banner with
   one word on the last line is a bug.
3. **Badges and pills on the title row.** "New product", "Changed", status pills
   sit at the end of the title line, never on a row of their own.
4. **Controls beside their label.** A switch, segmented choice or stepper sits
   on the label's line when it fits; it drops under only when it doesn't.
5. **Compact heads.** A header is 60 px on a phone (68 on a tablet); one title per
   screen, never an app bar title and the same title again below it.
6. **Phone padding.** 16 px from the screen edge, 12 px between cards, 8 to 12 px
   inside dense rows. Nothing ≥ 24 px of empty space on a phone unless it
   separates two different things.
7. **No obvious text.** A line that repeats the label, explains how the app
   works inside, or says what every merchant already knows is cut (rule of
   2026-10-31: the UI shows only what the merchant needs).
8. **Adapt, don't stretch.** A tablet uses its width for more content side by
   side (two columns of fields, a wider list), not for bigger gaps. A phone on
   its side keeps the main data and the main button on screen.
9. **Check it.** The design check (rule 4 below) measures the main data on a
   360 × 640 phone, a 393 × 852 phone and a tablet both ways. Below the fold on
   any of them is a bug.

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
   covers (login, header, ⋮ menu, Settings, toast, pills, icons, motion, scan bar, number fields) with the
   preview and with the sibling apps. Any difference without a reason written
   here is a bug: fix it in the app, or record the reason here.
5. **Layout check on every size** (Nikita 2026-11-03). Every app and the website runs
   `../tools/layout-check.mjs` (Flutter apps: a widget test, see the tools README) over all its screens at eight sizes, light and dark, before
   a build is shown and in CI: no sideways scroll, nothing off the screen, nothing cut or
   on top of something else. See `../tools/README.md`.

## Motion, toasts, pills and icons: one set (Nikita 2026-11-03)

The design check of 2026-11-03 found that this file defined no motion, toast or
badge, so every app made its own: menus that appeared instantly or slid up,
Settings from the right, toasts from the top, seven badge shapes, text ✕ ✓ ←
instead of icons. Nikita saw them side by side (page «Сейчас и Станет») and said
«да». From now on, in every app, the website included:

| What | Class | How it moves | Notes |
| --- | --- | --- | --- |
| Timing | `--kit-enter`, `--kit-exit` | in 220 ms `cubic-bezier(0.16,1,0.3,1)`, out 160 ms `cubic-bezier(0.4,0,1,1)` | Flutter: the same numbers as `Cubic`. Nothing pops up without it, nothing vanishes in one frame. |
| ⋮ menu (website: phone menu, dropdowns) | `.kit-menu` | from the ⋮ corner, scale .96 → 1, 4 px down | No dimmer behind it; tap outside closes. Settings and Log out have icons; Log out in the error colour. |
| Settings, dialog, sheet | `.kit-scrim` + `.kit-settings` / `.kit-dialog` | rises 16 px and fades in | One dimmer `--kit-scrim` in both themes. Settings closes with **Done** (the main button, see Settings, exact), a section page goes back with `back.svg`. Never slides in from a side. On a phone Settings fills the screen; on a tablet it is a sheet. |
| Toast | `.kit-toast` | from the bottom, rises 12 px, stays 3 s | Main-button colours, an icon first. One at a time. Never from the top. |
| Status badge | `.kit-pill` (`--ok`, `--bad`, `--warn`, `--info`), count `--solid` | none | Round, 12 px bold, status colour on a pale fill of itself. |
| Icons | `icons/ui/*.svg` | none | close, back, chevron, check, plus, minus, warning, up, sun, moon, logout, settings, and the menu and Settings set above. No text characters as icons. |
| Colours | the palette above | none | Nothing outside it: no Android `Colors.red/green/orange`, no app's own palette. |

`prefers-reduced-motion` shortens every one of these to an instant change.
Preview: `../preview/app-motion.html` plays each one in both themes.

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


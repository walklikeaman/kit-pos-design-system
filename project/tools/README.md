# Layout check

One script for every KIT app and the website (Nikita 2026-11-03: nothing may shift, fly off
the screen or overlap, on any screen size, in any app, the website included).

`layout-check.mjs` opens each screen an app lists at eight sizes (320, 360, 390 and 430 px
phones, 768x1024 and 800x1280 tablets, 1280x800 and 1440x900) in light and dark, and fails on:

- the page wider than the screen (sideways scroll);
- text running out of its box, cut without "…", or squeezed to a few letters ("D" for DAVID);
- a button or field partly off the screen, or cut by its box;
- text, buttons or fields on top of each other.

It saves every screen as a PNG for a look by eye. Grown from KIT Invoice's check (kit-stock 40e76eb).

## Use it in an app

1. Copy `layout-check.mjs` into the app's `tools/`. Keep it identical; fixes go here first.
2. Write `tools/layout.config.mjs` from `layout.config.example.mjs`: every screen, the ⋮ menu,
   Settings and each of its pages, sheets and dialogs, with the longest real text you have.
3. Add `"layout": "node tools/layout-check.mjs tools/layout.config.mjs"` to `package.json`,
   and `tools/layout-shots/` to `.gitignore`.
4. Run it before every build shown to Nikita or Gahl, and in CI after the production build
   (serve the build, then `npm run layout`). Zero problems, or a reason in the config's `ignore`.

**Flutter apps (KIT Label, Kiosk) do not use this script.** Flutter web paints on a canvas,
so the page has no text elements and the script passes anything. Their check is a widget test
that pumps every screen at the same eight sizes, light and dark, with the longest real text,
and walks the render tree for overflow (`RenderFlex overflowed`, text cut without "…") and
overlapping text or buttons. The model is kit-kiosk `app/test/layout_test.dart` (2026-11-03;
it caught 3 real overflows). It runs with `flutter test` in CI. Then check the Android build
on the emulator or a device by eye: Android fonts are wider.

## Bigger text and speed

- **Font size.** Many merchants run their phone at 130 % text. Phone apps add
  `sizes: [...SIZES, ...LARGE_TEXT]` (import both from the script): each such size lays the
  page out at the screen width divided by the scale (360 at 130 % is 277 px of layout) and
  draws it at that scale, which is what Android and iOS do. **Never fake it with CSS `zoom`**:
  the page then lays out at full width and is only drawn bigger, so text running past the
  edge is never seen (KIT Invoice, 2026-11-03: zoom passed, the honest scale found 3 bugs).
- **Speed.** Screens run 4 at a time, each in its own browser context (`workers` in the config
  or `LAYOUT_WORKERS=6`). The report keeps the same order. Raise it on a big machine; lower it
  if the app server is slow to answer.

## In CI (GitHub Actions)

CI minutes are limited (3,000 a month for every KIT repo together; KIT-SHARED-RULES CI thrift).
The full check (8+ sizes x 2 themes x every screen) took up to 27 minutes per run, so CI runs a
short one and only when the screens change:

- **Its own job**, `timeout-minutes: 10`, after the build, skipped on draft PRs.
- **Only when screen files change**: a `paths` filter on the workflow, or a changed-files step,
  covering `src/**/*.{html,css,scss,ts}`, `public/**`, the layout config and the script.
- **Short list**: `LAYOUT_SIZES=ci` runs `CI_SIZES` (320, 360 at 130 % text, tablet portrait and
  landscape), light and dark. The full list runs locally before every build shown to Nikita.
- **No reruns by hand** (`workflow_dispatch`) on every push of a draft.

`ubuntu-latest` is Ubuntu 26.04, where `npx playwright install chromium` fails (KIT Waiter
thread). Use the runner's Chrome:

```yaml
layout:
  needs: build
  if: github.event.pull_request.draft == false
  timeout-minutes: 10
  steps:
    # checkout, setup-node, npm ci, download the build, serve it on :4200 in the background
    - run: npm i --no-save playwright-core@1.56.1
    - run: LAYOUT_SIZES=ci CHROMIUM="$(command -v google-chrome)" npm run layout
```

A page with a third-party widget that keeps polling (Cloudflare Turnstile, analytics) never
goes network-idle, so every screen waits out the 30 s load timeout (the website's CI hung for
23 minutes, 2026-11-03). Block those hosts in the config's `theme` hook:
`context.route(/challenges\.cloudflare\.com|googletagmanager/, (r) => r.abort())`.

## First runs (2026-11-03, before any fix)

- KIT Kitchen (dev): phones 320–430 overflow the header (⋮ off screen, column bands wrap
  "NE W"), tablets 768 cut the "Check all +N below" button.
- KIT Monitor (main): at 320 and 360 customers' names are squeezed to one letter, the column
  titles overlap and the ⋮ menu opens off the screen.
- Website (main): from 1024 px the software section's grid (56% + 44% columns plus a 32 px
  gap) ran 32 px past its container. Fixed in KIT-POS-Website #20 with fraction columns.
- KIT Waiter (2026-11-03, 14 screens x 8 sizes x 2 themes): 0 problems after two fixes to the
  check itself: anything inside a box that scrolls or pans (the floor plan on a phone) is
  reached by scrolling, not "cut" or "off the screen"; and icons (`svg`, `<i>` mask icons) now
  count in the overlap test, since an icon on top of a label is as bad as two labels.

## Not counted as a problem

Screen-reader-only text (`sr-only`, 1 px and clipped on purpose), the body of a closed
`<details>`, a link that wraps inside a sentence (compared line by line, not as one box), and
anything inside a box that scrolls or pans: it is reached by scrolling.

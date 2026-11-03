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

## First runs (2026-11-03, before any fix)

- KIT Kitchen (dev): phones 320–430 overflow the header (⋮ off screen, column bands wrap
  "NE W"), tablets 768 cut the "Check all +N below" button.
- KIT Monitor (main): at 320 and 360 customers' names are squeezed to one letter, the column
  titles overlap and the ⋮ menu opens off the screen.
- Website (main): from 1024 px the software section's grid (56% + 44% columns plus a 32 px
  gap) ran 32 px past its container. Fixed in KIT-POS-Website #20 with fraction columns.

## Not counted as a problem

Screen-reader-only text (`sr-only`, 1 px and clipped on purpose), the body of a closed
`<details>`, and a link that wraps inside a sentence (compared line by line, not as one box).

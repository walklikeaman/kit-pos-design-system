# UI icons

Small icons that sit inside a screen (not launcher icons). Except `barcode.svg`
(six stripes, drawn on the same 960 grid), they are the
Material Symbols (Outlined, 24 px grid) that KIT Label already draws through
Flutter's `Icons.*`, so a web app and a Flutter app show the same shape.
Source: google/material-design-icons, Apache License 2.0.

| File | Flutter | Use |
| --- | --- | --- |
| `barcode.svg` | none: draw it from this file (`flutter_svg` or a `CustomPainter`) | the barcode at the start of a scan bar (Nikita 2026-11-02) |
| `scan.svg` | `Icons.barcode_reader` | a hand scanner; not used in the scan bar since 2026-11-02 |
| `camera.svg` | `Icons.camera_alt_outlined` | the camera button at the end of a scan bar |
| `close.svg` | `Icons.close` | clear a field, close a window that has no Done |
| `back.svg` | `Icons.arrow_back` | back to the list (Settings section page, any sub-page) |
| `chevron.svg` | `Icons.chevron_right` | end of a row that opens a page |
| `check.svg` | `Icons.check` | done, ticked line, success toast |
| `plus.svg` | `Icons.add` | add one, count up |
| `minus.svg` | `Icons.remove` | take one away, count down |
| `warning.svg` | `Icons.warning_amber` | warning toast or row |
| `up.svg` | `Icons.expand_less` | fold a section, sort up (turn 180° for down) |
| `sun.svg` | `Icons.light_mode` | light theme |
| `moon.svg` | `Icons.dark_mode` | dark theme |
| `logout.svg` | `Icons.logout` | Log out, last row of the ⋮ menu and of Settings |
| `settings.svg` | `Icons.settings_outlined` | Settings row of the ⋮ menu |
| `help.svg` | `Icons.help_outline` | Help row (⋮ menu, Settings) |
| `home.svg` | `Icons.home_outlined` | Home row of the ⋮ menu |
| `history.svg` | `Icons.history` | Print history and other history rows |
| `person.svg` | `Icons.person_outline` | Store and clerk row of the ⋮ menu |
| `store.svg` | `Icons.storefront_outlined` | Store / My store section |
| `print.svg` | `Icons.print_outlined` | Printers section |
| `scanner.svg` | `Icons.qr_code_scanner` | Scanner section |
| `bell.svg` | `Icons.notifications_none` | Notifications, Sound |
| `palette.svg` | `Icons.palette_outlined` | Appearance section |
| `theme.svg` | `Icons.contrast` | Theme row |
| `language.svg` | `Icons.language` | Language row, website row |
| `units.svg` | `Icons.straighten` | Units row |
| `price.svg` | `Icons.sell_outlined` | Prices / markup section |
| `board.svg` | `Icons.view_column_outlined` | Board section (Kitchen, Monitor) |
| `storage.svg` | `Icons.cleaning_services_outlined` | Storage section |
| `info.svg` | `Icons.info_outline` | About section, version row |
| `whats-new.svg` | `Icons.auto_awesome_outlined` | What's new row |
| `feedback.svg` | `Icons.feedback_outlined` | Send feedback row |
| `external.svg` | `Icons.open_in_new` | end of a row that opens outside the app |

Text characters never stand in for these (Nikita 2026-11-03): no ✕ × ✓ › ‹ ← → ＋ − ⚠ ▲ ★ ☀ ☾ in a
screen. A digit or a word inside a pill is text; a shape is an icon.

They draw in `currentColor`. Inline the path in the app (no extra request) and
keep the `viewBox`. Never put an emoji where one of these belongs.

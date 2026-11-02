# UI icons

Small icons that sit inside a screen (not launcher icons). They are the
Material Symbols (Outlined, 24 px grid) that KIT Label already draws through
Flutter's `Icons.*`, so a web app and a Flutter app show the same shape.
Source: google/material-design-icons, Apache License 2.0.

| File | Flutter | Use |
| --- | --- | --- |
| `scan.svg` | `Icons.barcode_reader` | the scanner at the start of a scan bar |
| `camera.svg` | `Icons.camera_alt_outlined` | the camera button at the end of a scan bar |
| `close.svg` | `Icons.close` | clear a field |

They draw in `currentColor`. Inline the path in the app (no extra request) and
keep the `viewBox`. Never put an emoji where one of these belongs.

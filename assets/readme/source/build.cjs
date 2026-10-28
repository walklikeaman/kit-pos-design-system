// Render the README boards to assets/readme/*.png with headless Chromium.
//
// The boards (hero.html, tokens.html, app-layer.html) are plain HTML that links
// the design system's own files — project/colors_and_type.css,
// project/apps/kit-apps.css, the real atom and launcher icons — plus a locally
// bundled copy of Plus Jakarta Sans (source/fonts/) so they render the same
// everywhere, with no network.
//
//     node assets/readme/source/build.cjs
//
// Each board's fixed-size .stage element is screenshotted at 2x. Edit the .html
// sources here; this script never touches the committed PNGs except to rebuild them.
const { chromium } = require('playwright');
const { pathToFileURL } = require('url');
const path = require('path');

const SOURCE = __dirname;
const OUT = path.resolve(SOURCE, '..'); // assets/readme/
const BOARDS = ['hero', 'tokens', 'app-layer'];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ deviceScaleFactor: 2 });
  for (const name of BOARDS) {
    await page.goto(pathToFileURL(path.join(SOURCE, `${name}.html`)).href);
    await page.waitForTimeout(350); // let the webfont settle
    await page.locator('.stage').screenshot({ path: path.join(OUT, `${name}.png`) });
    console.log('wrote', path.join(OUT, `${name}.png`));
  }
  await browser.close();
})();

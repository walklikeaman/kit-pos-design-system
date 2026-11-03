#!/usr/bin/env node
/**
 * KIT layout check: one script for every KIT app and the website (Nikita 2026-11-03:
 * «чтобы у нас ничего не съехало, ничего не улетело, не было никаких наложений,
 * оверлапов в любых форматах экрана, на всех приложениях, на веб-сайте в том числе»).
 * Grown from KIT Invoice's tools/layout-check.mjs (kit-stock 40e76eb).
 *
 * Opens each screen an app lists in its config at eight sizes (small phone to desktop),
 * light and dark, and fails when:
 *   - the page is wider than the screen (sideways scroll),
 *   - text runs out of its box, or is cut without "…",
 *   - a button or field sits partly off the screen or is cut by its box,
 *   - two pieces of text, buttons or fields sit on top of each other.
 * Every screen is saved as <out>/<screen>-<size>-<theme>.png for a look by eye.
 *
 *   node layout-check.mjs path/to/layout.config.mjs [base-url]
 *
 * The config (one per app, kept in the app's repo, see layout.config.example.mjs):
 *   export default {
 *     base: 'http://localhost:4200',
 *     out: 'tools/layout-shots',                 // git-ignored
 *     theme: async (context, theme) => { ... }, // how this app picks light/dark before it starts
 *     ignore: ['.ticker'],                       // things allowed to overlap on purpose (optional)
 *     sizes: [...],                              // optional, defaults to SIZES below
 *     screens: [{ name: 'login', path: '/login', open: async (page) => { ... } }],
 *   };
 * A screen's `open` runs after the page loads: log in, open the ⋮ menu, fill long text.
 * Use the longest real text you can find (store names, product names, file names).
 *
 * Needs Playwright (the `playwright` or `playwright-core` package) and a Chromium; set
 * CHROMIUM=/path/to/chrome to pick one.
 */
import { mkdirSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

/** Phones (iPhone SE to Pro Max, small and large Android), tablets both ways, a laptop. */
export const SIZES = [
  ['320x640', 320, 640], ['360x780', 360, 780], ['390x844', 390, 844], ['430x932', 430, 932],
  ['768x1024', 768, 1024], ['800x1280', 800, 1280], ['1280x800', 1280, 800], ['1440x900', 1440, 900],
];

/** Runs in the page: what overflows or overlaps. */
function findProblems(ignore = []) {
  const out = [];
  const vw = document.documentElement.clientWidth;
  if (document.documentElement.scrollWidth > vw + 1) out.push(`page is ${document.documentElement.scrollWidth}px wide on a ${vw}px screen`);
  // Not seen: screen-reader-only text (1 px, clipped on purpose) and the body of a closed <details>.
  const srOnly = (el) => { const s = getComputedStyle(el); return s.position === 'absolute' && (s.clip === 'rect(0px, 0px, 0px, 0px)' || /inset\(50%\)/.test(s.clipPath)) && el.getBoundingClientRect().width <= 1; };
  const visible = (el) => {
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    if (srOnly(el) || (el.closest('details:not([open])') && !el.closest('summary'))) return false;
    return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && Number(s.opacity) > 0.05;
  };
  const label = (el) => `${el.tagName.toLowerCase()}${el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).join('.') : ''} "${(el.innerText || el.value || el.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ').slice(0, 40)}"`;
  const clipped = (el) => {
    for (let e = el; e && e !== document.body; e = e.parentElement) {
      const s = getComputedStyle(e);
      if (s.overflowX !== 'visible' || s.textOverflow === 'ellipsis') return true;
    }
    return false;
  };
  // Text that runs out of its own box.
  for (const el of document.querySelectorAll('body *')) {
    if (!visible(el) || !(el.innerText || '').trim() || el.children.length > 3) continue;
    if (el.scrollWidth > el.clientWidth + 2 && el.clientWidth > 0 && !clipped(el)) out.push(`text runs out of its box: ${label(el)} (${el.scrollWidth}px in ${el.clientWidth}px)`);
  }
  // Text cut off mid-word: clipped, but with no "…" to say so.
  for (const el of document.querySelectorAll('body *')) {
    if (!visible(el) || !(el.innerText || '').trim()) continue;
    const s = getComputedStyle(el);
    if (s.overflowX === 'hidden' && s.textOverflow !== 'ellipsis' && s.whiteSpace === 'nowrap' && el.scrollWidth > el.clientWidth + 2) out.push(`text cut off without "…": ${label(el)}`);
    for (const c of el.children) {
      const cs = getComputedStyle(c);
      if (s.overflowX === 'hidden' && s.textOverflow === 'ellipsis' && cs.display !== 'inline' && c.getBoundingClientRect().right > el.getBoundingClientRect().right + 2) out.push(`text cut off without "…": ${label(c)}`);
    }
  }
  // Text cut by a box that hides what does not fit (a card with overflow: hidden), with no "…".
  for (const box of document.querySelectorAll('body *')) {
    const bs = getComputedStyle(box);
    if (!visible(box) || !['hidden', 'clip'].includes(bs.overflowX)) continue;
    const c = box.getBoundingClientRect();
    for (const el of box.querySelectorAll('*')) {
      if (!visible(el) || ![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) continue;
      if (getComputedStyle(el).textOverflow === 'ellipsis') continue;
      const range = document.createRange(); range.selectNodeContents(el);
      const t = range.getBoundingClientRect();
      if (t.width > 0 && (t.right > c.right + 2 || t.left < c.left - 2) && t.left < c.right) out.push(`text cut off without "…": ${label(el)}`);
    }
  }
  // Text squeezed so narrow that "…" leaves a letter or two (a name shown as "D").
  for (const el of document.querySelectorAll('body *')) {
    if (!visible(el) || !(el.innerText || '').trim()) continue;
    const st = getComputedStyle(el);
    if (st.textOverflow === 'ellipsis' && el.scrollWidth > el.clientWidth + 2 && el.clientWidth < 3 * parseFloat(st.fontSize)) out.push(`text squeezed to a few letters: ${label(el)} (${el.clientWidth}px for ${el.scrollWidth}px)`);
  }
  // Buttons and fields pushed off the screen, or cut by a box that hides them.
  const vh = document.documentElement.clientHeight;
  for (const el of document.querySelectorAll('button, a[href], input, select, textarea, [role="button"]')) {
    if (!visible(el) || el.closest(ignore.join(', ') || '#__none__')) continue;
    const r = el.getBoundingClientRect();
    // A popup (menu, dialog, toast) is a fixed box smaller than the screen: all of it must be on screen.
    const fixed = (() => { for (let e = el; e; e = e.parentElement) if (getComputedStyle(e).position === 'fixed') { const f = e.getBoundingClientRect(); return f.height < vh - 1 || f.width < vw - 1; } return false; })();
    // Inside a box that scrolls sideways (a row of columns, a chip strip), off-screen is just "scroll to see".
    const scroller = (() => { for (let e = el.parentElement; e && e !== document.body; e = e.parentElement) { const o = getComputedStyle(e).overflowX; if (o === 'auto' || o === 'scroll') return e; } return null; })();
    if (scroller) {
      const c = scroller.getBoundingClientRect();
      if (r.right <= c.left + 1 || r.left >= c.right - 1) continue; // scrolled out of view, fine
    }
    if (r.left < -1 || r.right > vw + 1 || (fixed && (r.top < -1 || r.bottom > vh + 1))) { out.push(`off the screen: ${label(el)} (${Math.round(r.left)}..${Math.round(r.right)} of ${vw}px)`); continue; }
    for (let e = el.parentElement; e && e !== document.body; e = e.parentElement) {
      const s = getComputedStyle(e);
      if (s.overflowX === 'hidden' || s.overflowX === 'clip') {
        const c = e.getBoundingClientRect();
        if (r.right > c.right + 2 || r.left < c.left - 2) { out.push(`cut by its box: ${label(el)}`); break; }
      }
      if (s.overflowX === 'auto' || s.overflowX === 'scroll') break; // a scroller shows it when scrolled
    }
  }
  // Text, buttons and fields on top of each other.
  const leaves = [...document.querySelectorAll('button, a, input, select, label, b, small, em, span, p, h1, h2, h3, dt, dd')]
    .filter((el) => visible(el) && !el.closest(['[aria-hidden="true"]', '.scrim', '.menu-scrim', '.ask-scrim', ...ignore].join(', ')))
    .filter((el) => (el.matches('button, a, input, select') || [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())));
  const textRect = (el) => {
    if (el.matches('button, a, input, select')) return el.getBoundingClientRect();
    const range = document.createRange();
    range.selectNodeContents(el);
    return range.getBoundingClientRect();
  };
  // What is actually seen: text cut by a box that clips it (a name trimmed to two lines) does not count.
  const seen = (el, r) => {
    let l = r.left, t = r.top, rt = r.right, bt = r.bottom;
    for (let e = el; e && e !== document.documentElement; e = e.parentElement) {
      const s = getComputedStyle(e);
      if (s.overflowX !== 'visible' || s.overflowY !== 'visible') {
        const c = e.getBoundingClientRect();
        l = Math.max(l, c.left); t = Math.max(t, c.top); rt = Math.min(rt, c.right); bt = Math.min(bt, c.bottom);
      }
    }
    return { left: l, top: t, right: rt, bottom: bt };
  };
  // A link that wraps inside a sentence is two line boxes, not one big box over its neighbours.
  const lineRects = (el) => { const parts = el.getClientRects(); return getComputedStyle(el).display === 'inline' && parts.length > 1 ? [...parts] : [textRect(el)]; };
  const rects = leaves.flatMap((el) => lineRects(el).map((r) => ({ el, r: seen(el, r) }))).filter(({ r }) => r.right - r.left > 1 && r.bottom - r.top > 1);
  for (let i = 0; i < rects.length; i++) {
    for (let j = i + 1; j < rects.length; j++) {
      const a = rects[i], b = rects[j];
      if (a.el === b.el || a.el.contains(b.el) || b.el.contains(a.el)) continue;
      const x = Math.min(a.r.right, b.r.right) - Math.max(a.r.left, b.r.left);
      const y = Math.min(a.r.bottom, b.r.bottom) - Math.max(a.r.top, b.r.top);
      // Stacked lines (a caption over a big value) touch through their line boxes: count a real overlap only.
      if (x > 3 && y > Math.max(3, 0.3 * Math.min(a.r.bottom - a.r.top, b.r.bottom - b.r.top))) {
        // Something drawn over the page on purpose (a sheet, a menu, a bar) covers what is under it.
        const top = (el) => { for (let e = el; e; e = e.parentElement) { const st = getComputedStyle(e); if (st.position === 'fixed' || st.position === 'sticky' || (st.position === 'absolute' && Number(st.zIndex) > 0)) return e; } return null; };
        if (top(a.el) !== top(b.el)) continue;
        out.push(`overlap: ${label(a.el)} and ${label(b.el)}`);
      }
    }
  }
  return [...new Set(out)];
}


export { findProblems };

async function loadChromium() {
  for (const name of ['playwright', 'playwright-core']) {
    try { return (await import(name)).chromium; } catch { /* try the next */ }
    try { return createRequire(join(process.cwd(), 'x.js'))(name).chromium; } catch { /* global install (NODE_PATH) */ }
  }
  throw new Error('Install playwright (npm i -D playwright) to run the layout check.');
}

export async function run(config, base = config.base) {
  const chromium = await loadChromium();
  const out = resolve(config.out ?? 'tools/layout-shots');
  mkdirSync(out, { recursive: true });
  const browser = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});
  const report = [];
  let problems = 0;
  for (const theme of config.themes ?? ['light', 'dark']) {
    for (const [size, w, h] of config.sizes ?? SIZES) {
      for (const screen of config.screens) {
        const context = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: theme, hasTouch: w < 1000 });
        if (config.theme) await config.theme(context, theme);
        const page = await context.newPage();
        const name = `${screen.name}-${size}-${theme}`;
        try {
          await page.goto(base + (screen.path ?? '/'), { waitUntil: 'networkidle' }).catch(() => page.waitForLoadState('load'));
          if (screen.open) await screen.open(page, { width: w, height: h, theme });
          await page.waitForTimeout(screen.settle ?? 500); // let entrance animations finish (220 ms)
          let found;
          for (let i = 0; ; i++) {
            try { found = await page.evaluate(findProblems, [...(config.ignore ?? []), ...(screen.ignore ?? [])]); break; }
            catch (e) { if (i >= 2) throw e; await page.waitForTimeout(800); }
          }
          await page.screenshot({ path: join(out, `${name}.png`), fullPage: true });
          if (found.length) { problems += found.length; report.push(`✗ ${name}\n  - ${found.join('\n  - ')}`); }
          else report.push(`✓ ${name}`);
        } catch (e) {
          problems++; report.push(`✗ ${name}\n  - could not open the screen: ${String(e.message ?? e).split('\n')[0]}`);
        }
        await context.close();
      }
    }
  }
  await browser.close();
  console.log(report.join('\n'));
  console.log(problems ? `\n${problems} layout problem(s). Screenshots: ${out}` : `\nNo layout problems. Screenshots: ${out}`);
  return problems;
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  const [cfgPath, base] = process.argv.slice(2);
  if (!cfgPath) { console.error('usage: node layout-check.mjs layout.config.mjs [base-url]'); process.exit(2); }
  const config = (await import(pathToFileURL(resolve(cfgPath)).href)).default;
  process.exit((await run(config, base ?? config.base)) ? 1 : 0);
}

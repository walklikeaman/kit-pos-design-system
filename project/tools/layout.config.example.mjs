// Example layout-check config. Copy to your app as tools/layout.config.mjs, list every screen,
// then: node tools/layout-check.mjs tools/layout.config.mjs   (app running on `base`)
// This one is KIT Monitor's (2026-11-03): demo login, the board, the ⋮ menu, Settings and a section.
const login = async (page) => {
  await page.waitForTimeout(800);
  const code = page.locator('input').first();
  if (await code.count()) { await code.fill('demo'); await code.press('Enter'); }
  await page.waitForTimeout(2000);
};
const menu = async (page) => { await login(page); await page.locator('button.menu-btn').first().click(); };
const settings = async (page) => { await menu(page); await page.locator('button.menu-item', { hasText: 'Settings' }).click(); };

export default {
  base: 'http://localhost:4200',
  out: 'tools/layout-shots', // add to .gitignore
  // How the app picks its theme before it starts. Apps that follow the system theme need nothing:
  // the check already sets prefers-color-scheme. Apps with their own switch set it here, e.g.
  // theme: (context, theme) => context.addInitScript((t) => localStorage.setItem('kit-monitor.theme', t), theme),
  ignore: [], // selectors allowed to overlap on purpose (a marquee, a decorative layer)
  // sizes: SIZES is all eight; a wall-only app may narrow it, but only with Nikita's word.
  screens: [
    { name: 'login', path: '/' },
    { name: 'board', path: '/', open: login },
    { name: 'menu', path: '/', open: menu },
    { name: 'settings', path: '/', open: settings },
    { name: 'settings-section', path: '/', open: async (page) => { await settings(page); await page.locator('.stub .sec:not(.logout)').nth(1).click(); } },
  ],
};

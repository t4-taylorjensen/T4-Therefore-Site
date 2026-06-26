import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto('http://localhost:6010/iframe.html?id=pages-pillar-pages-v2--cms&viewMode=story', { waitUntil: 'networkidle' });
await page.waitForTimeout(1200);

const sections = ['v2-hero', 'v2-opp', 'v2-wwd', 'v2-ai', 'v2-cs', 'v2-plat', 'v2-logos', 'v2-cta', 'v2-faq', 'v2-related'];
for (const sel of sections) {
  const el = await page.$(`.${sel}`);
  if (!el) { console.log(sel, '-> NOT FOUND'); continue; }
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await el.screenshot({ path: `/tmp/m2_${sel}.png` });
  console.log(sel, '-> captured');
}
await browser.close();

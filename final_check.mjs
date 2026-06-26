import { chromium } from 'playwright';
const browser = await chromium.launch();
for (const width of [320, 375, 390, 430]) {
  const page = await browser.newPage({ viewport: { width, height: 800 } });
  await page.goto('http://localhost:6010/iframe.html?id=pages-pillar-pages-v2--cms&viewMode=story', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  console.log(`width=${width} overflow=${overflow}`);
  await page.close();
}
await browser.close();

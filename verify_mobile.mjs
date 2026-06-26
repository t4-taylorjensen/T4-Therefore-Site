import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto('http://localhost:6010/iframe.html?id=pages-pillar-pages-v2--cms&viewMode=story', { waitUntil: 'networkidle' });
await page.waitForTimeout(1200);
await page.screenshot({ path: '/tmp/verify_top.png' });

const info = await page.evaluate(() => {
  const img = document.querySelector('.v2-plat-media-photo img');
  const rect = img ? img.getBoundingClientRect() : null;
  const cs = document.querySelector('.nav-col--right .btn');
  return {
    platImgRect: rect,
    navCtaText: cs ? cs.textContent : null,
    navCtaRect: cs ? cs.getBoundingClientRect() : null,
  };
});
console.log(JSON.stringify(info, null, 2));
await browser.close();

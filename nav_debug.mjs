import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1300, height: 800 } });
const url = 'http://localhost:6010/iframe.html?id=pages-pillar-pages-v2--cms&viewMode=story';
await page.goto(url, { waitUntil: 'networkidle' });
await page.waitForTimeout(800);

const info = await page.evaluate(() => {
  const header = document.querySelector('.nav');
  const measure = document.querySelector('.nav-links-measure');
  const logo = document.querySelector('.nav-logo');
  const cta = document.querySelector('.nav-col--right');
  const more = document.querySelector('.nav-more .nav-link-a');
  if (!header) return { error: 'no .nav found', bodyHTML: document.body.innerHTML.slice(0, 500) };
  const lastLink = measure?.lastElementChild;
  return {
    headerRect: header.getBoundingClientRect(),
    measureRect: measure?.getBoundingClientRect(),
    lastLinkRect: lastLink?.getBoundingClientRect(),
    logoRect: logo?.getBoundingClientRect(),
    ctaRect: cta?.getBoundingClientRect(),
    moreText: more?.textContent,
    navClasses: header.className,
    measureClasses: measure?.className,
    bodyWidth: document.body.getBoundingClientRect().width,
  };
});

console.log(JSON.stringify(info, null, 2));
await browser.close();

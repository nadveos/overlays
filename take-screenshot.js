const { chromium } = require('playwright-core');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1920, height: 1080 });
  
  const filePath = 'file://' + path.resolve(__dirname, 'overlay.html');
  await page.goto(filePath, { waitUntil: 'networkidle' });
  
  const outputPath = path.resolve(__dirname, 'test_transparency.png');
  await page.screenshot({ path: outputPath, fullPage: true, omitBackground: true });
  
  console.log('SCREENSHOT_SAVED: ' + outputPath);
  await browser.close();
})();

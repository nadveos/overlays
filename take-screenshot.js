const { chromium } = require('playwright-core');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1080, height: 1920 });
  
  const filePath = 'file://' + path.resolve(__dirname, 'overlay-vertical.html');
  await page.goto(filePath, { waitUntil: 'networkidle' });
  
  const outputPath = path.resolve('C:\\Users\\gutaf\\.gemini\\antigravity-ide\\brain\\09520e5f-9427-4de6-8523-3f99354b8a39', 'overlay_vertical_preview.png');
  await page.screenshot({ path: outputPath, fullPage: true });
  
  console.log('SCREENSHOT_SAVED: ' + outputPath);
  await browser.close();
})();

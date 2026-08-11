const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    args: ['--disable-background-color']
  });
  const context = await browser.newContext({
    recordVideo: { dir: __dirname }
  });
  const page = await context.newPage();
  await page.setContent('<html style="background:transparent"><body style="background: transparent;"><h1>Test</h1></body></html>');
  await page.waitForTimeout(2000);
  const video = await page.video();
  await context.close();
  await browser.close();
  const savedPath = await video.path();
  fs.renameSync(savedPath, path.join(__dirname, 'test_alpha.webm'));
  console.log('Video saved to test_alpha.webm');
})();

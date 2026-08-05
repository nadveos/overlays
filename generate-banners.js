const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');

(async () => {
  const renderDir = path.resolve(__dirname, 'render');
  if (!fs.existsSync(renderDir)) fs.mkdirSync(renderDir);

  const browser = await chromium.launch();
  const page = await browser.newPage();
  const filePath = 'file:///' + path.resolve(__dirname, 'banners.html').replace(/\\/g, '/');

  console.log('Cargando HTML:', filePath);
  await page.goto(filePath, { waitUntil: 'load' });

  // YouTube (2560x1440)
  await page.setViewportSize({ width: 2560, height: 1440 });
  const yt = await page.$('.yt-frame');
  if (yt) {
    await yt.screenshot({ path: path.join(renderDir, 'banner_youtube_2560x1440.png') });
    console.log('✅ YouTube banner generado (2560x1440)');
  }

  // Facebook (1640x924)
  await page.setViewportSize({ width: 1640, height: 924 });
  const fb = await page.$('.fb-frame');
  if (fb) {
    await fb.screenshot({ path: path.join(renderDir, 'banner_facebook_1640x924.png') });
    console.log('✅ Facebook banner generado (1640x924)');
  }

  // Twitch & Kick (1200x480)
  await page.setViewportSize({ width: 1200, height: 480 });
  const tk = await page.$('.tk-frame');
  if (tk) {
    await tk.screenshot({ path: path.join(renderDir, 'banner_twitch_kick_1200x480.png') });
    console.log('✅ Twitch/Kick banner generado (1200x480)');
  }

  // Twitter / X (1500x500)
  await page.setViewportSize({ width: 1500, height: 500 });
  const tw = await page.$('.tw-frame');
  if (tw) {
    await tw.screenshot({ path: path.join(renderDir, 'banner_twitter_1500x500.png') });
    console.log('✅ Twitter/X banner generado (1500x500)');
  }

  await browser.close();
})();

const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR  = path.resolve(__dirname, 'render');
const HTML_FILE   = path.resolve(__dirname, 'transition.html');
const ANIM_MS     = 2700;   // 2.7 segundos (duración de la nueva transición rápida)
const WIDTH       = 1920;
const HEIGHT      = 1080;

(async () => {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);

  console.log('▶ Abriendo Chromium headless...');
  const browser = await chromium.launch({ headless: true });

  const context = await browser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 1,
    recordVideo: {
      dir: OUTPUT_DIR,
      size: { width: WIDTH, height: HEIGHT }
    }
  });

  const page = await context.newPage();
  const url = `file:///${HTML_FILE.replace(/\\/g, '/')}`;
  
  console.log(`▶ Navegando a: ${url}`);
  await page.goto(url, { waitUntil: 'load' });

  console.log(`▶ Grabando animación de transición rápida (${ANIM_MS / 1000}s)...`);
  await page.waitForTimeout(ANIM_MS);

  const video = await page.video();
  await context.close();
  await browser.close();

  const savedPath = await video.path();
  const finalPath = path.join(OUTPUT_DIR, 'transition_vp8.webm');
  fs.renameSync(savedPath, finalPath);

  console.log(`✅ Video base grabado: ${finalPath}`);
})();

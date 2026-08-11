const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');
const { Jimp } = require('jimp');

(async () => {
  const renderDir = path.resolve(__dirname, 'render');
  if (!fs.existsSync(renderDir)) fs.mkdirSync(renderDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const overlays = [
    { name: 'overlay_16x9_principal.png',  file: 'overlay.html',              width: 1920, height: 1080 },
    { name: 'overlay_16x9_solo.png',        file: 'overlay-solo.html',         width: 1920, height: 1080 },
    { name: 'overlay_16x9_multimedia.png',  file: 'overlay-multimedia.html',   width: 1920, height: 1080 },
    { name: 'overlay_9x16_vertical.png',    file: 'overlay-vertical.html',     width: 1080, height: 1920 },
    { name: 'overlay_9x16_vertical_solo.png', file: 'overlay-solo-vertical.html', width: 1080, height: 1920 }
  ];

  console.log('📸 Generando capturas PNG estáticas para TikTok Live Studio...');

  for (const item of overlays) {
    const filePath = 'file:///' + path.resolve(__dirname, item.file).replace(/\\/g, '/');
    await page.setViewportSize({ width: item.width, height: item.height });
    await page.goto(filePath, { waitUntil: 'networkidle' });

    // Wait for fonts and hide placeholders
    await page.evaluate(async () => {
      document.documentElement.style.background = 'transparent';
      document.body.style.background = 'transparent';
      if (document.fonts && document.fonts.ready) await document.fonts.ready;
      document.querySelectorAll('.mm-placeholder').forEach(ph => ph.style.display = 'none');
    });
    await page.waitForTimeout(500);

    // Get bounding boxes of all camera/multimedia windows BEFORE screenshot
    const camRects = await page.evaluate(() => {
      const selectors = ['.cam-window', '.mm-window'];
      const rects = [];
      for (const sel of selectors) {
        document.querySelectorAll(sel).forEach(el => {
          const r = el.getBoundingClientRect();
          if (r.width > 0 && r.height > 0) {
            rects.push({
              x: Math.round(r.left),
              y: Math.round(r.top),
              w: Math.round(r.width),
              h: Math.round(r.height)
            });
          }
        });
      }
      return rects;
    });

    const outputPath = path.join(renderDir, item.name);
    // Take screenshot with transparent background
    await page.screenshot({ path: outputPath, omitBackground: true, fullPage: true });

    // Post-process: clear (alpha=0) the interior of each camera frame using jimp
    if (camRects.length > 0) {
      const img = await Jimp.read(outputPath);
      for (const rect of camRects) {
        // Add 7px inset to stay inside the border frame (matches padding: 7-10px)
        const inset = 7;
        const x = rect.x + inset;
        const y = rect.y + inset;
        const w = Math.max(0, rect.w - inset * 2);
        const h = Math.max(0, rect.h - inset * 2);
        for (let py = y; py < y + h; py++) {
          for (let px = x; px < x + w; px++) {
            img.setPixelColor(0x00000000, px, py); // RGBA transparent
          }
        }
      }
      await img.write(outputPath);
      console.log(`   🔲 ${camRects.length} ventana(s) de cámara borradas (transparentes)`);
    }

    console.log(`✅ Overlay listo: render/${item.name} (${item.width}x${item.height})`);
  }

  await browser.close();
  console.log('🎉 Overlays PNG generados correctamente en la carpeta render/.');
})();

const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');

(async () => {
  const renderDir = path.resolve(__dirname, 'render');
  if (!fs.existsSync(renderDir)) fs.mkdirSync(renderDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const overlays = [
    { name: 'overlay_16x9_principal.png', file: 'overlay.html', width: 1920, height: 1080 },
    { name: 'overlay_16x9_solo.png', file: 'overlay-solo.html', width: 1920, height: 1080 },
    { name: 'overlay_16x9_multimedia.png', file: 'overlay-multimedia.html', width: 1920, height: 1080 },
    { name: 'overlay_9x16_vertical.png', file: 'overlay-vertical.html', width: 1080, height: 1920 },
    { name: 'overlay_9x16_vertical_solo.png', file: 'overlay-solo-vertical.html', width: 1080, height: 1920 }
  ];

  console.log('📸 Generando capturas PNG estáticas para TikTok Live Studio...');

  for (const item of overlays) {
    const filePath = 'file:///' + path.resolve(__dirname, item.file).replace(/\\/g, '/');
    await page.setViewportSize({ width: item.width, height: item.height });
    await page.goto(filePath, { waitUntil: 'networkidle' });

    // Vaciar ÚNICAMENTE el fondo interno de la ventana de cámara sin tocar la estructura del overlay
    await page.evaluate(() => {
      // 1. Asegurar que body/html no tengan fondo sólido si no está en el overlay
      document.documentElement.style.background = 'transparent';
      document.body.style.background = 'transparent';

      // 2. Vaciar el contenido y fondo interior de la ventana de la cámara
      const windows = document.querySelectorAll('.cam-window, .mm-window');
      windows.forEach(win => {
        win.style.background = 'transparent';
        win.style.backgroundColor = 'transparent';
        win.style.borderColor = 'transparent';
        win.innerHTML = '';
      });

      // 3. Ocultar placeholder multimedia si existiera
      const placeholders = document.querySelectorAll('.mm-placeholder');
      placeholders.forEach(ph => ph.style.display = 'none');
    });

    const outputPath = path.join(renderDir, item.name);
    await page.screenshot({ path: outputPath, omitBackground: true, fullPage: true });
    console.log(`✅ Overlay listo: render/${item.name} (${item.width}x${item.height})`);
  }

  await browser.close();
  console.log('🎉 Overlays PNG generados correctamente en la carpeta render/.');
})();

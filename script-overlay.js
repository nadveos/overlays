// script-overlay.js — Actualiza automáticamente todos los overlays desde localStorage o stream-data.json
(function () {
  // Detectar si estamos en file:// (abierto directo) o en http:// (servidor local)
  const IS_LOCAL_FILE = window.location.protocol === 'file:';
  const SERVER_BASE = 'http://localhost:3000';

  async function fetchData(url) {
    try {
      const r = await fetch(url + '?t=' + Date.now());
      if (r.ok) return await r.json();
    } catch (e) {}
    return null;
  }

  async function updateOverlayData() {
    try {
      let data = null;

      // 1. Intentar cargar desde localStorage del origen actual
      const localDataStr = localStorage.getItem('streamData');
      if (localDataStr) {
        try { data = JSON.parse(localDataStr); } catch (e) {}
      }

      // 2. Si estamos en file:// y no hay localStorage, intentar el servidor local
      if (!data && IS_LOCAL_FILE) {
        data = await fetchData(SERVER_BASE + '/stream-data.json');
      }

      // 3. Si no hay datos aún, cargar stream-data.json relativo (cuando sirve el mismo servidor)
      if (!data) {
        data = await fetchData('stream-data.json');
      }

      if (!data) return;

      // 1. ANFITRIÓN / HOST
      if (data.host) {
        document.querySelectorAll('[data-bind="host-name"]').forEach(el => {
          if (data.host.name && data.host.name.trim() !== '') {
            el.textContent = data.host.name;
          }
        });
        document.querySelectorAll('[data-bind="host-role"]').forEach(el => {
          if (data.host.role && data.host.role.trim() !== '') {
            el.textContent = data.host.role;
          }
        });
      }

      // 2. INVITADO
      const guestEnabled = data.guest && data.guest.enabled !== false && (data.guest.name && data.guest.name.trim() !== '');

      // Manejo de visibilidad de invitado
      // En panel de redes (.guest-info-panel) y name-tags especificas de invitado
      document.querySelectorAll('.guest-info-panel, [data-guest-box]').forEach(el => {
        el.style.display = guestEnabled ? '' : 'none';
      });

      // En overlay-vertical.html (.guest-section contiene la cam del invitado + panel de redes):
      // Si deshabilitamos invitado, ocultamos solo el panel de redes o la sección según corresponda
      const guestSection = document.querySelector('.guest-section');
      if (guestSection) {
        if (!guestEnabled) {
          const infoPanel = guestSection.querySelector('.guest-info-panel');
          if (infoPanel) infoPanel.style.display = 'none';
        } else {
          const infoPanel = guestSection.querySelector('.guest-info-panel');
          if (infoPanel) infoPanel.style.display = '';
        }
      }

      // En overlay principal (overlay.html) o multimedia (.cameras-container):
      document.querySelectorAll('.cameras-container').forEach(container => {
        const camBoxes = container.querySelectorAll('.cam-box');
        if (camBoxes.length >= 2) {
          camBoxes[1].style.display = guestEnabled ? '' : 'none';
        }
      });

      if (data.guest) {
        document.querySelectorAll('[data-bind="guest-name"]').forEach(el => {
          if (data.guest.name && data.guest.name.trim() !== '') {
            el.textContent = data.guest.name;
          }
        });
        document.querySelectorAll('[data-bind="guest-role"]').forEach(el => {
          if (data.guest.role && data.guest.role.trim() !== '') {
            el.textContent = data.guest.role;
          }
        });
        document.querySelectorAll('[data-bind="guest-bio"]').forEach(el => {
          if (data.guest.bio && data.guest.bio.trim() !== '') {
            el.textContent = data.guest.bio;
            el.style.display = '';
          } else {
            el.textContent = '';
            el.style.display = 'none';
          }
        });

        // Redes sociales del invitado
        document.querySelectorAll('[data-bind="guest-socials"]').forEach(container => {
          if (Array.isArray(data.guest.socials)) {
            const validSocials = data.guest.socials.filter(s => (s.platform && s.platform.trim() !== '') || (s.handle && s.handle.trim() !== ''));
            if (validSocials.length > 0) {
              container.style.display = '';
              container.innerHTML = validSocials.map(s => `
                <div class="social-item">
                  <span class="social-icon">${s.icon || '🌐'}</span>
                  <div class="social-text">
                    <span class="social-platform">${s.platform || ''}</span>
                    <span class="social-handle">${s.handle || ''}</span>
                  </div>
                </div>
              `).join('');
            } else {
              container.innerHTML = '';
              container.style.display = 'none';
            }
          } else {
            container.innerHTML = '';
            container.style.display = 'none';
          }
        });

        // Manejo del panel lateral .guest-info-panel en overlay-vertical.html
        const hasSocials = data.guest.socials && data.guest.socials.some(s => (s.platform && s.platform.trim() !== '') || (s.handle && s.handle.trim() !== ''));
        const hasBio = data.guest.bio && data.guest.bio.trim() !== '';

        document.querySelectorAll('.guest-info-panel').forEach(panel => {
          if (!hasSocials && !hasBio) {
            // Si no hay ni redes ni bio, ocultamos el panel lateral por completo (y el flex centrará la cámara)
            panel.style.display = 'none';
          } else if (guestEnabled) {
            panel.style.display = 'flex';
            // Ajustar la distribución del flexbox según haya redes o no
            if (!hasSocials && hasBio) {
              panel.style.justifyContent = 'flex-start';
              panel.style.gap = '20px';
            } else {
              panel.style.justifyContent = 'space-between';
              panel.style.gap = '';
            }
          }
        });
      }

      // 4. MODO SOLO DINÁMICO (solo-name, solo-role, solo-bio, solo-handle, solo-socials)
      // Si hay invitado habilitado con nombre, usa sus datos. Si no, usa los del Host.
      const activeName = guestEnabled ? data.guest.name : (data.host && data.host.name ? data.host.name : 'GUTA FLORES');
      const activeRole = guestEnabled ? (data.guest.role || '💬 INVITADO ESPECIAL') : (data.host && data.host.role ? data.host.role : '🎙️ ANFITRIÓN / HOST');

      document.querySelectorAll('[data-bind="solo-name"]').forEach(el => {
        if (activeName && activeName.trim() !== '') el.textContent = activeName;
      });

      document.querySelectorAll('[data-bind="solo-role"]').forEach(el => {
        if (activeRole && activeRole.trim() !== '') el.textContent = activeRole;
      });

      // Bio / Descripción
      document.querySelectorAll('[data-bind="solo-bio"]').forEach(el => {
        if (guestEnabled && data.guest.bio && data.guest.bio.trim() !== '') {
          el.textContent = data.guest.bio;
        } else if (!guestEnabled) {
          el.textContent = '¡Bienvenidos al stream en vivo! Música argentina, folklore y mucho entretenimiento con Guta Flores.';
        }
      });

      // Etiqueta de descripción ("✨ SOBRE EL INVITADO" o "📢 HOY EN EL STREAM")
      document.querySelectorAll('[data-bind="solo-desc-label"]').forEach(el => {
        el.textContent = guestEnabled ? '✨ SOBRE EL INVITADO' : '📢 HOY EN EL STREAM';
      });

      // Handle o usuario principal
      let primaryHandle = '@gutaflores';
      if (guestEnabled && data.guest.socials) {
        const firstSoc = data.guest.socials.find(s => s.handle && s.handle.trim() !== '');
        if (firstSoc) primaryHandle = firstSoc.handle;
      }
      document.querySelectorAll('[data-bind="solo-handle"]').forEach(el => {
        el.textContent = primaryHandle;
      });

      // Lista de Redes Sociales
      document.querySelectorAll('[data-bind="solo-socials"]').forEach(container => {
        if (guestEnabled && data.guest.socials) {
          const validSocials = data.guest.socials.filter(s => (s.platform && s.platform.trim() !== '') || (s.handle && s.handle.trim() !== ''));
          if (validSocials.length > 0) {
            container.innerHTML = validSocials.map(s => `
              <div class="social-row">
                <span class="social-icon">${s.icon || '🌐'}</span>
                <div class="social-info">
                  <span class="social-platform">${s.platform || ''}</span>
                  <span class="social-handle">${s.handle || ''}</span>
                </div>
              </div>
            `).join('');
            return;
          }
        }
        // Fallback a las redes del Host
        container.innerHTML = `
          <div class="social-row">
            <span class="social-icon">📸</span>
            <div class="social-info">
              <span class="social-platform">Instagram</span>
              <span class="social-handle">@gutaflores</span>
            </div>
          </div>
          <div class="social-row">
            <span class="social-icon">🎵</span>
            <div class="social-info">
              <span class="social-platform">TikTok</span>
              <span class="social-handle">@gutaflores</span>
            </div>
          </div>
          <div class="social-row">
            <span class="social-icon">▶️</span>
            <div class="social-info">
              <span class="social-platform">YouTube</span>
              <span class="social-handle">@gutaflores</span>
            </div>
          </div>
        `;
      });

      // 5. TICKER / DESTACADO
      if (Array.isArray(data.ticker) && data.ticker.length > 0) {
        const isSingle = data.ticker.length === 1;

        document.querySelectorAll('[data-bind="ticker-content"]').forEach(container => {
          const track = container.closest('.ticker-track');

          if (isSingle) {
            // ── Modo estático centrado (1 sola línea) ──
            const item = data.ticker[0];
            const prefixStr = item.prefix ? `${item.prefix} ` : '';
            const highlightClass = item.highlight ? 'class="highlight"' : '';
            container.innerHTML = `${prefixStr}<span ${highlightClass}>${item.text}</span>`;

            // Quitar animación de desplazamiento y centrar
            container.style.animation = 'none';
            container.style.transform = 'none';
            container.style.textAlign = 'center';
            container.style.width = '100%';
            container.style.paddingLeft = '0';
            if (track) {
              track.style.justifyContent = 'center';
              track.style.overflow = 'visible';
            }
          } else {
            // ── Modo scrolling animado (múltiples líneas) ──
            const htmlContent = data.ticker.map(item => {
              const highlightClass = item.highlight ? 'class="highlight"' : '';
              const prefixStr = item.prefix ? `${item.prefix} ` : '';
              return `${prefixStr}<span ${highlightClass}>${item.text}</span> <span class="sep">◆</span>`;
            }).join(' ');

            container.innerHTML = htmlContent;

            // Restaurar animación de scroll
            container.style.animation = '';
            container.style.transform = '';
            container.style.textAlign = '';
            container.style.width = '';
            container.style.paddingLeft = '';
            if (track) {
              track.style.justifyContent = '';
              track.style.overflow = 'hidden';
            }
          }
        });
      }

    } catch (e) {
      console.warn('Error al actualizar overlay:', e);
    }
  }

  // Escuchar eventos de cambio en tiempo real (cuando se modifica desde el panel en otra pestaña o en OBS)
  window.addEventListener('storage', (e) => {
    if (e.key === 'streamData') {
      updateOverlayData();
    }
  });

  // Ejecución inmediata
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateOverlayData);
  } else {
    updateOverlayData();
  }

  // Revisa automáticamente cada 2 segundos
  setInterval(updateOverlayData, 2000);
})();

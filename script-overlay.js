// script-overlay.js — Actualiza automáticamente todos los overlays desde localStorage o stream-data.json
(function () {
  async function updateOverlayData() {
    try {
      let data = null;
      
      // 1. Intentar cargar desde localStorage (guardado instantáneo desde el panel)
      const localDataStr = localStorage.getItem('streamData');
      if (localDataStr) {
        try { data = JSON.parse(localDataStr); } catch (e) {}
      }

      // 2. Si no hay en localStorage, cargar stream-data.json
      if (!data) {
        const response = await fetch('stream-data.json?t=' + Date.now());
        if (response.ok) {
          data = await response.json();
        }
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
          }
        });

        // Redes sociales del invitado
        const socialsContainers = document.querySelectorAll('[data-bind="guest-socials"]');
        socialsContainers.forEach(container => {
          if (Array.isArray(data.guest.socials)) {
            const validSocials = data.guest.socials.filter(s => s.platform || s.handle);
            if (validSocials.length > 0) {
              container.innerHTML = validSocials.map(s => `
                <div class="social-item">
                  <span class="social-icon">${s.icon || '🌐'}</span>
                  <div class="social-text">
                    <span class="social-platform">${s.platform || ''}</span>
                    <span class="social-handle">${s.handle || ''}</span>
                  </div>
                </div>
              `).join('');
            }
          }
        });
      }

      // 3. TICKER / DESTACADO
      if (Array.isArray(data.ticker) && data.ticker.length > 0) {
        const tickerContainers = document.querySelectorAll('[data-bind="ticker-content"]');
        tickerContainers.forEach(container => {
          const htmlContent = data.ticker.map(item => {
            const highlightClass = item.highlight ? 'class="highlight"' : '';
            const prefixStr = item.prefix ? `${item.prefix} ` : '';
            return `${prefixStr}<span ${highlightClass}>${item.text}</span> <span class="sep">◆</span>`;
          }).join(' ');
          
          container.innerHTML = htmlContent;
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

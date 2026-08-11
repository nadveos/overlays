import React, { useState, useEffect } from 'react';

export function Panel() {
  const [formData, setFormData] = useState({
    hostName: 'Guta Flores',
    hostRole: '',
    guestEnabled: true,
    guestName: 'Raúl Domingo',
    guestRole: '',
    guestBio: '',
    socials: [
      { icon: '♪', platform: 'TikTok', handle: '@rauldomingooficial' },
      { icon: '🅾', platform: 'Instagram', handle: '' },
      { icon: '🅾', platform: 'Facebook', handle: '' }
    ],
    tickerText: 'CHARLANDO CON RAÚL DOMINGO | ALITAS : GUTA.FLORES'
  });
  const [toast, setToast] = useState({ show: false, message: '', color: '#27ae60' });

  useEffect(() => {
    const loadInitialData = async () => {
      let data = null;
      const localDataStr = localStorage.getItem('streamData');
      if (localDataStr) {
        try { data = JSON.parse(localDataStr); } catch (e) {}
      }

      if (!data) {
        try {
          const res = await fetch('/api/stream-data');
          if (res.ok) data = await res.json();
        } catch (e) {}
      }

      if (data) {
        setFormData({
          hostName: data.host?.name || '',
          hostRole: data.host?.role || '',
          guestEnabled: data.guest?.enabled !== false,
          guestName: data.guest?.name || '',
          guestRole: data.guest?.role || '',
          guestBio: data.guest?.bio || '',
          socials: data.guest?.socials || [
            { icon: '', platform: '', handle: '' },
            { icon: '', platform: '', handle: '' },
            { icon: '', platform: '', handle: '' }
          ],
          tickerText: data.ticker ? data.ticker.map(t => `${t.prefix ? t.prefix + ' | ' : ''}${t.text}`).join('\n') : ''
        });
      }
    };

    loadInitialData();
  }, []);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSocialChange = (index, field, value) => {
    setFormData(prev => {
      const newSocials = [...prev.socials];
      newSocials[index] = { ...newSocials[index], [field]: value };
      return { ...prev, socials: newSocials };
    });
  };

  const showToast = (message, color = '#27ae60') => {
    setToast({ show: true, message, color });
    setTimeout(() => setToast({ show: false, message: '', color: '#27ae60' }), 3000);
  };

  const saveData = async () => {
    const tickerLines = formData.tickerText.split('\n').filter(l => l.trim() !== '');
    const tickerObj = tickerLines.map(l => {
      const parts = l.split('|');
      return {
        prefix: parts[1] ? parts[0].trim() : '',
        text: parts[1] ? parts[1].trim() : parts[0].trim(),
        highlight: true
      };
    });

    const updated = {
      host: {
        name: formData.hostName,
        role: formData.hostRole
      },
      guest: {
        enabled: formData.guestEnabled,
        name: formData.guestName,
        role: formData.guestRole,
        bio: formData.guestBio,
        socials: formData.socials
      },
      ticker: tickerObj
    };

    localStorage.setItem('streamData', JSON.stringify(updated));

    try {
      await fetch('/api/save-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
      showToast('⚡ ¡Datos guardados! Overlays actualizados.');
    } catch (e) {
      showToast('⚠️ Guardado en navegador (Servidor API no respondió)', '#e67e22');
    }
  };

  const copyUrl = (path) => {
    const fullUrl = `${window.location.origin}${path}`;
    navigator.clipboard.writeText(fullUrl);
    showToast(`📋 Copiado: ${fullUrl}`, '#2980b9');
  };

  const styles = {
    body: {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      background: '#121212',
      color: '#FFF',
      padding: '24px',
      maxWidth: '800px',
      margin: '0 auto',
      minHeight: '100vh'
    },
    card: {
      background: '#1E1E1E',
      border: '1px solid #333',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '20px'
    },
    cardTitle: {
      fontSize: '16px',
      fontWeight: 700,
      color: '#E74C3C',
      marginBottom: '14px',
      textTransform: 'uppercase',
      letterSpacing: '1px'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      marginBottom: '12px'
    },
    label: { fontSize: '12px', color: '#AAA', fontWeight: 600 },
    input: {
      background: '#0D0D0D',
      border: '1px solid #444',
      borderRadius: '6px',
      padding: '10px',
      color: '#FFF',
      fontSize: '14px'
    },
    button: {
      background: 'linear-gradient(135deg, #8B0000, #C0392B)',
      color: '#FFF',
      border: 'none',
      padding: '14px',
      fontSize: '16px',
      fontWeight: 800,
      borderRadius: '8px',
      cursor: 'pointer',
      width: '100%',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      boxShadow: '0 4px 15px rgba(192, 57, 43, 0.4)'
    },
    urlRow: {
      display: 'flex',
      gap: '6px',
      alignItems: 'center',
      marginBottom: '8px'
    },
    code: {
      background: '#111',
      color: '#4fc',
      flex: 1,
      padding: '6px 10px',
      borderRadius: '4px',
      fontSize: '12px',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  };

  const overlayRoutes = [
    { label: '📱 9:16 Vertical Solo (TikTok)', path: '/overlay-solo-vertical' },
    { label: '📱 9:16 Vertical Dúo (TikTok)', path: '/overlay-vertical' },
    { label: '📷 16:9 Principal (OBS)', path: '/overlay' },
    { label: '⚡ Transición 16:9', path: '/transition' },
    { label: '💌 Invitación Digital', path: '/invitacion' }
  ];

  return (
    <div style={styles.body}>
      <h1 style={{ color: '#FFD700', marginBottom: '20px', fontSize: '24px', textAlign: 'center' }}>
        🎛️ Panel de Control Cloud — Overlays Stream
      </h1>

      {/* HOST */}
      <div style={styles.card}>
        <div style={styles.cardTitle}>🎙️ Anfitrión (Host)</div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Nombre del Host</label>
          <input
            style={styles.input}
            type="text"
            value={formData.hostName}
            onChange={(e) => handleChange('hostName', e.target.value)}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Rol / Etiqueta</label>
          <input
            style={styles.input}
            type="text"
            value={formData.hostRole}
            onChange={(e) => handleChange('hostRole', e.target.value)}
          />
        </div>
      </div>

      {/* GUEST */}
      <div style={styles.card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div style={{ ...styles.cardTitle, marginBottom: 0 }}>💬 Invitado Especial</div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 700, color: '#FFD700' }}>
            <input
              type="checkbox"
              checked={formData.guestEnabled}
              onChange={(e) => handleChange('guestEnabled', e.target.checked)}
              style={{ width: '18px', height: '18px', accentColor: '#C0392B', cursor: 'pointer' }}
            />
            <span>MOSTRAR INVITADO EN OVERLAYS</span>
          </label>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Nombre del Invitado / Banda</label>
          <input
            style={styles.input}
            type="text"
            value={formData.guestName}
            onChange={(e) => handleChange('guestName', e.target.value)}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Rol / Etiqueta</label>
          <input
            style={styles.input}
            type="text"
            value={formData.guestRole}
            onChange={(e) => handleChange('guestRole', e.target.value)}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Biografía / Descripción corta</label>
          <textarea
            style={{ ...styles.input, resize: 'vertical' }}
            rows={2}
            value={formData.guestBio}
            onChange={(e) => handleChange('guestBio', e.target.value)}
          />
        </div>

        <label style={{ marginBottom: '8px', display: 'block', fontSize: '12px', color: '#AAA', fontWeight: 600 }}>Redes Sociales del Invitado</label>
        {formData.socials.map((soc, idx) => (
          <div key={idx} style={{ display: 'grid', gridTemplateColumns: '60px 1fr 1fr', gap: '8px', marginBottom: '8px' }}>
            <input
              style={styles.input}
              placeholder="Icono"
              value={soc.icon || ''}
              onChange={(e) => handleSocialChange(idx, 'icon', e.target.value)}
            />
            <input
              style={styles.input}
              placeholder="Plataforma"
              value={soc.platform || ''}
              onChange={(e) => handleSocialChange(idx, 'platform', e.target.value)}
            />
            <input
              style={styles.input}
              placeholder="Usuario"
              value={soc.handle || ''}
              onChange={(e) => handleSocialChange(idx, 'handle', e.target.value)}
            />
          </div>
        ))}
      </div>

      {/* TICKER */}
      <div style={styles.card}>
        <div style={styles.cardTitle}>✨ Ticker / Texto Destacado Animado</div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Items del Ticker (Separados por línea: prefijo | texto)</label>
          <textarea
            style={{ ...styles.input, resize: 'vertical' }}
            rows={4}
            value={formData.tickerText}
            onChange={(e) => handleChange('tickerText', e.target.value)}
          />
        </div>
      </div>

      {/* URLS */}
      <div style={{ ...styles.card, borderColor: '#2980b9' }}>
        <div style={{ ...styles.cardTitle, color: '#2980b9' }}>📡 URLs PARA OBS / TIKTOK LIVE STUDIO</div>
        <p style={{ fontSize: '12px', color: '#AAA', marginBottom: '10px' }}>
          Copiá estas URLs en el Enlace de Fuentes de TikTok Live Studio u OBS:
        </p>

        {overlayRoutes.map((route, idx) => (
          <div key={idx} style={styles.urlRow}>
            <span style={{ fontSize: '12px', width: '220px', color: '#FFF' }}>{route.label}</span>
            <code style={styles.code}>{`${window.location.origin}${route.path}`}</code>
            <button
              type="button"
              onClick={() => copyUrl(route.path)}
              style={{ background: '#2980b9', border: 'none', color: '#FFF', borderRadius: '4px', padding: '6px 12px', cursor: 'pointer', fontSize: '11px' }}
            >
              Copiar
            </button>
            <a
              href={route.path}
              target="_blank"
              rel="noreferrer"
              style={{ background: '#1a4a1a', border: '1px solid #2ecc71', color: '#2ecc71', borderRadius: '4px', padding: '6px 10px', fontSize: '11px', textDecoration: 'none' }}
            >
              Ir →
            </a>
          </div>
        ))}
      </div>

      <button type="button" style={styles.button} onClick={saveData}>
        💾 Guardar Datos del Stream
      </button>

      {toast.show && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: toast.color,
            color: '#FFF',
            padding: '12px 24px',
            borderRadius: '8px',
            fontWeight: 'bold',
            boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
            zIndex: 1000
          }}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}

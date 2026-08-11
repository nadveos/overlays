import React from 'react';
import { Link } from 'react-router-dom';

export function Home() {
  const routes = [
    { title: '🎛️ Panel de Control', path: '/panel', desc: 'Administrar datos del stream, invitado y ticker' },
    { title: '📱 9:16 Vertical Solo (TikTok)', path: '/overlay-solo-vertical', desc: 'Layout 9:16 para TikTok Live Studio (Host Solo)' },
    { title: '📱 9:16 Vertical Dúo (TikTok)', path: '/overlay-vertical', desc: 'Layout 9:16 para TikTok Live Studio (Host + Invitado)' },
    { title: '📷 16:9 Principal (OBS)', path: '/overlay', desc: 'Layout 16:9 clásico para OBS' },
    { title: '⚡ Transición 16:9', path: '/transition', desc: 'Stinger de transición rápida' },
    { title: '💌 Invitación Digital', path: '/invitacion', desc: 'Carta/Tarjeta de presentación del invitado' }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#121212', color: '#FFF', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ color: '#FFD700', textAlign: 'center', marginBottom: '8px' }}>🎙️ Stream Overlays Hub</h1>
        <p style={{ textAlign: 'center', color: '#AAA', marginBottom: '32px' }}>
          Sistema de Overlays para OBS Studio y TikTok Live Studio
        </p>

        <div style={{ display: 'grid', gap: '16px' }}>
          {routes.map((r, idx) => (
            <Link
              key={idx}
              to={r.path}
              style={{
                background: '#1E1E1E',
                border: '1px solid #333',
                borderRadius: '12px',
                padding: '20px',
                color: '#FFF',
                textDecoration: 'none',
                display: 'block',
                transition: 'border-color 0.2s'
              }}
            >
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#E74C3C', marginBottom: '4px' }}>
                {r.title}
              </div>
              <div style={{ fontSize: '14px', color: '#AAA' }}>{r.desc}</div>
              <div style={{ fontSize: '12px', color: '#4fc', marginTop: '8px' }}>{`${window.location.origin}${r.path}`}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

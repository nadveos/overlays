import React from 'react';
import { useStreamData } from '../../hooks/useStreamData';

export function Transition() {
  const { host } = useStreamData();

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', background: 'transparent' }}>
      <div className="transition-overlay" style={{ position: 'fixed', inset: 0 }}>
        <div className="stripe s1" style={{ position: 'absolute', top: 0, height: '11.2%', width: '100%', background: '#1a0000' }}></div>
        <div className="stripe s2" style={{ position: 'absolute', top: '11.1%', height: '11.2%', width: '100%', background: '#8B0000' }}></div>
        <div className="stripe s3" style={{ position: 'absolute', top: '22.2%', height: '11.2%', width: '100%', background: '#141414' }}></div>
        <div className="stripe s4" style={{ position: 'absolute', top: '33.3%', height: '11.2%', width: '100%', background: '#C0392B' }}></div>
        <div className="stripe s5" style={{ position: 'absolute', top: '44.4%', height: '11.2%', width: '100%', background: '#1A0505' }}></div>
        <div className="stripe s6" style={{ position: 'absolute', top: '55.5%', height: '11.2%', width: '100%', background: '#8B0000' }}></div>
        <div className="stripe s7" style={{ position: 'absolute', top: '66.6%', height: '11.2%', width: '100%', background: '#111111' }}></div>
        <div className="stripe s8" style={{ position: 'absolute', top: '77.7%', height: '11.2%', width: '100%', background: '#C0392B' }}></div>
        <div className="stripe s9" style={{ position: 'absolute', top: '88.8%', height: '11.2%', width: '100%', background: '#1a0000' }}></div>

        <div className="golden-line"></div>

        <div className="center-logo" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
          <div className="logo-brand" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '88px', color: '#FFF', letterSpacing: '8px' }}>
            {host?.name?.toUpperCase() || 'GUTA FLORES'}
          </div>
          <div className="logo-divider" style={{ width: '180px', height: '2px', background: '#FFD700', margin: '8px auto' }}></div>
          <div className="logo-sub" style={{ fontSize: '16px', color: '#FFD700', letterSpacing: '6px', fontWeight: 700 }}>🎙️ EN VIVO 🎙️</div>
        </div>
      </div>
    </div>
  );
}

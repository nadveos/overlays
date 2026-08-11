import React from 'react';
import { useStreamData } from '../../hooks/useStreamData';
import { useOverlayScale } from '../../hooks/useOverlayScale';
import { TickerBar } from '../../components/TickerBar';
import { MottoBanner } from '../../components/MottoBanner';
import { CamCorners } from '../../components/CamCorners';

export function OverlayPrincipal() {
  const { host, guest, ticker, guestEnabled } = useStreamData();
  const { wrapperStyle, innerStyle } = useOverlayScale(1920, 1080);

  return (
    <div style={wrapperStyle}>
      <div style={{ width: '1920px', height: '1080px', overflow: 'hidden', background: 'transparent', ...innerStyle }}>
      <div className="main-border" style={{ position: 'fixed', inset: 0 }}>
        <div className="main-inner">
          <div className="top-header">
            <span className="badge">● EN VIVO</span>
            <span>{host?.name || 'Guta Flores'}</span>
          </div>

          <div className="cameras-container" style={{ position: 'absolute', top: '72px', left: '16px', bottom: '54px', width: '30%', display: 'flex', flexDirection: 'column', gap: '45px', justifyContent: 'center' }}>
            {/* Host Cam Box */}
            <div className="cam-box" style={{ width: '100%', aspectRatio: '16/9', position: 'relative', background: 'transparent' }}>
              <div className="cam-window" style={{ width: '100%', height: '100%', background: 'transparent' }}></div>
              <CamCorners />
              <div className="name-tag">
                <div className="role-title">{host?.role || 'ANFITRIÓN'}</div>
                <div className="user-name">{host?.name || 'Guta Flores'}</div>
              </div>
            </div>

            {/* Guest Cam Box */}
            <div className="cam-box" style={{ width: '100%', aspectRatio: '16/9', position: 'relative', background: 'transparent', display: guestEnabled ? 'block' : 'none' }}>
              <div className="cam-window" style={{ width: '100%', height: '100%', background: 'transparent' }}></div>
              <CamCorners />
              <div className="name-tag">
                <div className="role-title">{guest?.role || 'INVITADO'}</div>
                <div className="user-name">{guest?.name || ''}</div>
              </div>
            </div>
          </div>

          <div style={{ position: 'absolute', right: '20px', top: '80px', width: '65%', bottom: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <MottoBanner />
          </div>

          <TickerBar items={ticker} />
        </div>
      </div>
    </div>
    </div>
  );
}

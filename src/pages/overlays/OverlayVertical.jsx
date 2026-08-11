import React from 'react';
import { useStreamData } from '../../hooks/useStreamData';
import { useOverlayScale } from '../../hooks/useOverlayScale';
import { TickerBar } from '../../components/TickerBar';
import { MottoBanner } from '../../components/MottoBanner';
import { CamCorners } from '../../components/CamCorners';
import { LiveIndicator } from '../../components/LiveIndicator';

export function OverlayVertical() {
  const { host, guest, ticker, guestEnabled } = useStreamData();
  const { wrapperStyle, innerStyle } = useOverlayScale(1080, 1920);

  const activeName = guestEnabled ? guest.name : (host?.name || 'GUTA FLORES');
  const activeRole = guestEnabled ? (guest.role || '💬 INVITADO ESPECIAL') : (host?.role || '🎙️ ANFITRIÓN / HOST');

  const styles = {
    htmlBody: {
      width: '1080px',
      height: '1920px',
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      backgroundColor: 'transparent'
    },
    mainBorder: {
      position: 'relative',
      width: '1080px',
      height: '1920px',
      padding: '14px',
      overflow: 'hidden'
    },
    topHeader: {
      position: 'absolute',
      top: '24px',
      left: '50%',
      transform: 'translateX(-50%)',
      fontSize: '26px',
      padding: '14px 52px',
      borderRadius: '40px',
      zIndex: 10
    },
    layout: {
      position: 'absolute',
      top: '110px',
      left: '20px',
      right: '20px',
      bottom: '100px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    camBox: {
      flex: 1,
      position: 'relative',
      background: 'transparent',
      borderRadius: '20px',
      overflow: 'hidden',
      border: '2px solid rgba(192, 57, 43, 0.4)'
    },
    camWindow: {
      width: '100%',
      height: '100%',
      background: 'transparent'
    },
    nameOverlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'linear-gradient(180deg, transparent 0%, rgba(10, 5, 5, 0.9) 100%)',
      padding: '24px 20px 14px 20px',
      zIndex: 4
    }
  };

  return (
    <div style={wrapperStyle}>
    <div style={{ ...styles.htmlBody, ...innerStyle }}>
      <div className="main-border" style={styles.mainBorder}>
        <div className="main-inner">
          <div className="top-header" style={styles.topHeader}>
            <span className="badge">● EN VIVO</span>
            <span>{host?.name || 'Guta Flores'}</span>
          </div>

          <div style={styles.layout}>
            {/* CÁMARA 1 - HOST */}
            <div style={styles.camBox}>
              <div style={styles.camWindow}></div>
              <CamCorners />
              <LiveIndicator />
              <div style={styles.nameOverlay}>
                <div style={{ fontSize: '14px', color: '#E74C3C', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px' }}>
                  {host?.role || '🎙️ ANFITRIÓN / HOST'}
                </div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '42px', color: '#FFF', letterSpacing: '3px', lineHeight: 1 }}>
                  {host?.name || 'GUTA FLORES'}
                </div>
              </div>
            </div>

            <MottoBanner />

            {/* CÁMARA 2 - INVITADO */}
            <div style={{ ...styles.camBox, display: guestEnabled ? 'block' : 'none' }}>
              <div style={styles.camWindow}></div>
              <CamCorners />
              <div style={styles.nameOverlay}>
                <div style={{ fontSize: '14px', color: '#E74C3C', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px' }}>
                  {activeRole}
                </div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '42px', color: '#FFF', letterSpacing: '3px', lineHeight: 1 }}>
                  {activeName}
                </div>
              </div>
            </div>
          </div>

          <div className="ticker-bar" style={{ position: 'absolute', bottom: '16px', left: '20px', right: '20px', height: '64px' }}>
            <TickerBar items={ticker} />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

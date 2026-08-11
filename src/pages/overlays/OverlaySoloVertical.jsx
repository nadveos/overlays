import React from 'react';
import { useStreamData } from '../../hooks/useStreamData';
import { TickerBar } from '../../components/TickerBar';
import { MottoBanner } from '../../components/MottoBanner';
import { CamCorners } from '../../components/CamCorners';
import { LiveIndicator } from '../../components/LiveIndicator';

export function OverlaySoloVertical() {
  const { host, guest, ticker, guestEnabled } = useStreamData();

  const activeName = guestEnabled ? guest.name : (host?.name || 'GUTA FLORES');
  const activeRole = guestEnabled ? (guest.role || '💬 INVITADO ESPECIAL') : (host?.role || '🎙️ ANFITRIÓN / HOST');
  const activeBio = guestEnabled && guest.bio && guest.bio.trim() !== ''
    ? guest.bio
    : '¡Bienvenidos al stream en vivo! Música argentina, folklore y mucho entretenimiento con Guta Flores.';
  const descLabel = guestEnabled ? '✨ SOBRE EL INVITADO' : '📢 HOY EN EL STREAM';

  let primaryHandle = '@gutaflores';
  if (guestEnabled && guest.socials) {
    const firstSoc = guest.socials.find(s => s.handle && s.handle.trim() !== '');
    if (firstSoc) primaryHandle = firstSoc.handle;
  }

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
    soloLayout: {
      position: 'absolute',
      top: '110px',
      left: '20px',
      right: '20px',
      bottom: '100px',
      display: 'flex',
      flexDirection: 'column',
      gap: 0
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
    topInfoZone: {
      flex: '0 0 180px',
      height: '180px',
      background: 'rgba(10, 10, 10, 0.75)',
      border: '1.5px solid rgba(192, 57, 43, 0.4)',
      borderRadius: '20px 20px 0 0',
      borderBottom: 'none',
      padding: '18px 32px',
      display: 'flex',
      alignItems: 'center',
      gap: '24px',
      backdropFilter: 'blur(6px)',
      position: 'relative',
      overflow: 'hidden'
    },
    camZone: {
      flex: 1,
      position: 'relative',
      background: 'transparent',
      minHeight: 0
    },
    soloCamBox: {
      position: 'absolute',
      inset: 0,
      background: 'transparent',
      borderLeft: '3px solid rgba(139, 0, 0, 0.5)',
      borderRight: '3px solid rgba(139, 0, 0, 0.5)'
    },
    camWindow: {
      width: '100%',
      height: '100%',
      background: 'transparent'
    },
    nameTagOverlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'linear-gradient(180deg, transparent 0%, rgba(10, 5, 5, 0.85) 40%, rgba(15, 5, 5, 0.97) 100%)',
      padding: '40px 32px 20px 32px',
      zIndex: 4
    },
    nameRole: {
      fontSize: '16px',
      fontWeight: 800,
      color: '#E74C3C',
      letterSpacing: '3px',
      textTransform: 'uppercase'
    },
    nameMain: {
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: '64px',
      color: '#FFFFFF',
      letterSpacing: '6px',
      lineHeight: 1,
      textShadow: '0 0 20px rgba(192, 57, 43, 0.7), 0 2px 8px rgba(0, 0, 0, 0.9)'
    },
    nameSocial: {
      fontSize: '20px',
      fontWeight: 700,
      color: '#FFD700',
      letterSpacing: '2px',
      marginTop: '4px',
      opacity: 0.9
    },
    bottomInfoZone: {
      flex: '0 0 300px',
      height: '300px',
      background: 'rgba(10, 10, 10, 0.88)',
      border: '1.5px solid rgba(192, 57, 43, 0.4)',
      borderRadius: '0 0 20px 20px',
      borderTop: 'none',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      backdropFilter: 'blur(8px)'
    },
    bottomContent: {
      flex: 1,
      padding: '20px 32px',
      display: 'flex',
      gap: '24px',
      alignItems: 'stretch',
      overflow: 'hidden'
    },
    streamDesc: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    },
    descLabel: {
      fontSize: '13px',
      fontWeight: 900,
      color: '#C0392B',
      letterSpacing: '2px',
      textTransform: 'uppercase'
    },
    descText: {
      fontSize: '20px',
      fontWeight: 600,
      color: 'rgba(255, 255, 255, 0.9)',
      lineHeight: 1.4,
      flex: 1
    },
    descTags: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px'
    },
    descTag: {
      background: 'rgba(139, 0, 0, 0.3)',
      border: '1px solid rgba(192, 57, 43, 0.5)',
      borderRadius: '20px',
      padding: '4px 14px',
      fontSize: '13px',
      fontWeight: 700,
      color: '#FFD700',
      letterSpacing: '1px'
    },
    innerDivider: {
      width: '2px',
      background: 'linear-gradient(180deg, transparent 0%, rgba(192, 57, 43, 0.6) 20%, #C0392B 50%, rgba(192, 57, 43, 0.6) 80%, transparent 100%)',
      flexShrink: 0
    },
    socialZone: {
      flex: '0 0 260px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      justifyContent: 'center'
    },
    socialZoneLabel: {
      fontSize: '13px',
      fontWeight: 900,
      color: '#C0392B',
      letterSpacing: '2px',
      textTransform: 'uppercase',
      marginBottom: '4px'
    },
    socialRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      background: 'rgba(255, 255, 255, 0.04)',
      border: '1px solid rgba(192, 57, 43, 0.3)',
      borderRadius: '12px',
      padding: '8px 12px'
    },
    zoneSeparator: {
      width: '100%',
      height: '3px',
      background: 'linear-gradient(90deg, transparent 0%, #8B0000 15%, #C0392B 35%, #FFD700 50%, #C0392B 65%, #8B0000 85%, transparent 100%)',
      boxShadow: '0 0 10px rgba(255, 215, 0, 0.3)',
      flexShrink: 0
    },
    tickerBarV: {
      position: 'absolute',
      bottom: '16px',
      left: '20px',
      right: '20px',
      height: '64px',
      background: 'linear-gradient(90deg, #0d0d0d 0%, #1a0000 40%, #0d0d0d 100%)',
      border: '2px solid #C0392B',
      borderRadius: '14px',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      zIndex: 20,
      boxShadow: '0 0 24px rgba(139, 0, 0, 0.6), inset 0 1px 0 rgba(255, 215, 0, 0.15)'
    }
  };

  const socialsToDisplay = (guestEnabled && guest.socials && guest.socials.some(s => s.platform || s.handle))
    ? guest.socials.filter(s => (s.platform && s.platform.trim() !== '') || (s.handle && s.handle.trim() !== ''))
    : [
        { icon: '📸', platform: 'Instagram', handle: '@gutaflores' },
        { icon: '🎵', platform: 'TikTok', handle: '@gutaflores' },
        { icon: '▶️', platform: 'YouTube', handle: '@gutaflores' }
      ];

  return (
    <div style={styles.htmlBody}>
      <div className="main-border" style={styles.mainBorder}>
        <div className="main-inner">
          <div className="top-header" style={styles.topHeader}>
            <span className="badge">● EN VIVO</span>
            <span>{host?.name || 'Guta Flores'}</span>
          </div>

          <div className="solo-layout" style={styles.soloLayout}>
            {/* 1. TOP INFO ZONE */}
            <div style={styles.topInfoZone}>
              <div className="event-badge" style={{ flexShrink: 0, background: 'linear-gradient(135deg, #8B0000, #C0392B)', borderRadius: '14px', padding: '10px 20px', textAlign: 'center', boxShadow: '0 0 20px rgba(192, 57, 43, 0.5)' }}>
                <div style={{ fontSize: '32px', lineHeight: 1 }}>🎙️</div>
                <div style={{ fontSize: '12px', fontWeight: 900, color: '#FFD700', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '4px' }}>STREAM</div>
              </div>
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <div style={{ fontSize: '36px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '2px', lineHeight: 1.1, textShadow: '0 0 20px rgba(192, 57, 43, 0.6)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>EN VIVO HOY</div>
                <div style={{ fontSize: '18px', fontWeight: 600, color: '#FFD700', letterSpacing: '3px', textTransform: 'uppercase', marginTop: '4px', opacity: 0.9 }}>Música y Folklore Argentino</div>
                <div style={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.55)', letterSpacing: '2px', marginTop: '6px' }}>📅 Todos los días</div>
              </div>
            </div>

            <div style={styles.zoneSeparator}></div>

            {/* 2. CAM ZONE (100% TRANSPARENT) */}
            <div style={styles.camZone}>
              <div style={styles.soloCamBox}>
                <div style={styles.camWindow}></div>
                <CamCorners />
                <LiveIndicator />
                <div style={styles.nameTagOverlay}>
                  <div style={styles.nameRole}>{activeRole}</div>
                  <div style={styles.nameMain}>{activeName}</div>
                  <div style={styles.nameSocial}>{primaryHandle}</div>
                </div>
              </div>
            </div>

            <MottoBanner />

            <div style={styles.zoneSeparator}></div>

            {/* 3. BOTTOM INFO ZONE */}
            <div style={styles.bottomInfoZone}>
              <div style={styles.bottomContent}>
                <div style={styles.streamDesc}>
                  <div style={styles.descLabel}>{descLabel}</div>
                  <div style={styles.descText}>{activeBio}</div>
                  <div style={styles.descTags}>
                    <span style={styles.descTag}>#Folklore</span>
                    <span style={styles.descTag}>#Musica</span>
                    <span style={styles.descTag}>#GuitarreandoALaGorra</span>
                    <span style={styles.descTag}>#EnVivo</span>
                    <span style={styles.descTag}>#ArgentinaMusic</span>
                  </div>
                </div>

                <div style={styles.innerDivider}></div>

                <div style={styles.socialZone}>
                  <div style={styles.socialZoneLabel}>🌐 Seguinos</div>
                  <div>
                    {socialsToDisplay.map((s, idx) => (
                      <div key={idx} style={styles.socialRow}>
                        <span style={{ fontSize: '20px', flexShrink: 0 }}>{s.icon || '🌐'}</span>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.45)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '1.5px' }}>{s.platform}</span>
                          <span style={{ fontSize: '15px', color: '#FFFFFF', fontWeight: 700, letterSpacing: '0.5px' }}>{s.handle}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="corner-stripe-left"></div>
          <div className="corner-stripe-right"></div>

          {/* TICKER INFERIOR */}
          <div style={styles.tickerBarV}>
            <TickerBar items={ticker} />
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { useStreamData } from '../../hooks/useStreamData';
import { useOverlayScale } from '../../hooks/useOverlayScale';
import { TickerBar } from '../../components/TickerBar';

export function OverlayPrincipal() {
  const { host, guest, ticker, guestEnabled } = useStreamData();
  const { wrapperStyle, innerStyle } = useOverlayScale(1920, 1080);

  return (
    <div style={wrapperStyle}>
      <div style={{ width: '1920px', height: '1080px', overflow: 'hidden', background: 'transparent', ...innerStyle }}>
        {/* Marco General Animado */}
        <div className="main-border">
          <div className="main-inner">

            {/* Encabezado / Titulo */}
            <div className="top-header">
              <span className="badge">● EN VIVO</span>
              <span data-bind="host-name">{host?.name || 'Guta Flores'}</span>
            </div>

            {/* Contenedor de Camaras (columna izquierda, apiladas) */}
            <div className="cameras-container">

              {/* Marco Host / Anfitrión */}
              <div className="cam-box">
                <div className="cam-window"></div>
                <div className="name-tag">
                  <div className="role-title" data-bind="host-role">
                    {host?.role || '🎙️ ANFITRIÓN / HOST'}
                  </div>
                  <div className="user-name" data-bind="host-name">
                    {host?.name || 'GUTA FLORES'}
                  </div>
                </div>
              </div>

              {/* Marco Invitado */}
              <div className="cam-box" style={{ display: guestEnabled ? 'block' : 'none' }}>
                <div className="cam-window"></div>
                <div className="name-tag">
                  <div className="role-title" data-bind="guest-role">
                    {guest?.role || '💬 INVITADO'}
                  </div>
                  <div className="user-name" data-bind="guest-name">
                    {guest?.name || ''}
                  </div>
                </div>
              </div>

            </div>

            <div className="corner-stripe-left"></div>
            <div className="corner-stripe-right"></div>

            {/* BANNER DE FRASES / MOTTO BANNER */}
            <div className="motto-banner" style={{ position: 'absolute', bottom: '50px', left: '10px', right: '10px', width: 'auto', padding: '5px 16px', borderRadius: '6px' }}>
              <div className="motto-text-group">
                <span className="motto-phrase highlight" style={{ fontSize: '14px' }}>🎙️ DIFUNDIENDO ARTISTAS POCOS CONOCIDOS</span>
                <span className="motto-connector" style={{ fontSize: '14px', width: '22px', height: '22px' }}>Y</span>
                <span className="motto-phrase" style={{ fontSize: '14px' }}>GUITARREAMOS A LA GORRA 🪕</span>
              </div>
            </div>

            {/* TICKER — Texto animado destacado */}
            <TickerBar items={ticker} />

          </div>
        </div>
      </div>
    </div>
  );
}

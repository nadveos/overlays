import React from 'react';
import { useStreamData } from '../../hooks/useStreamData';
import { useOverlayScale } from '../../hooks/useOverlayScale';
import { TickerBar } from '../../components/TickerBar';

export function OverlaySolo() {
  const { host, ticker } = useStreamData();
  const { wrapperStyle, innerStyle } = useOverlayScale(1920, 1080);

  return (
    <div style={wrapperStyle}>
      <div style={{ width: '1920px', height: '1080px', overflow: 'hidden', background: 'transparent', ...innerStyle }}>
        <style>{`
          .cam-solo-wrapper {
            position: absolute;
            top: 72px;
            bottom: 54px;
            left: 20px;
            right: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }

          .cam-solo-container {
            width: 100%;
            max-width: 1380px;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .cam-solo-box {
            width: 100%;
            aspect-ratio: 16 / 9;
            max-height: calc(100vh - 190px);
            position: relative;
            border-radius: 18px;
            background: transparent;
            box-shadow:
              0 0 40px rgba(139, 0, 0, 0.5),
              0 0 80px rgba(139, 0, 0, 0.2),
              0 20px 40px rgba(0, 0, 0, 0.85);
          }

          .cam-solo-box::after {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: 18px;
            padding: 9px;
            background: linear-gradient(45deg, #8B0000, #1A1A1A, #C0392B, #FFD700, #8B0000);
            background-size: 300% 300%;
            animation: borderGlow 6s ease infinite;
            -webkit-mask:
              linear-gradient(#fff 0 0) content-box,
              linear-gradient(#fff 0 0);
            -webkit-mask-composite: destination-out;
            mask:
              linear-gradient(#fff 0 0) content-box,
              linear-gradient(#fff 0 0);
            mask-composite: exclude;
            pointer-events: none;
          }

          .cam-solo-box .cam-window {
            width: 100%;
            height: 100%;
            background: transparent;
            border-radius: 12px;
          }

          .name-tag-solo {
            position: absolute;
            bottom: -26px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #0d0d0d 0%, #2a0000 50%, #0d0d0d 100%);
            border: 2.5px solid #C0392B;
            border-radius: 12px;
            padding: 8px 40px;
            text-align: center;
            box-shadow: 0 6px 24px rgba(0, 0, 0, 0.9), 0 0 16px rgba(192, 57, 43, 0.5);
            white-space: nowrap;
            z-index: 5;
          }

          .name-tag-solo .role-title {
            color: #E74C3C;
            font-size: 13px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 2px;
          }

          .name-tag-solo .user-name {
            color: #FFFFFF;
            font-size: 26px;
            font-weight: 900;
            margin-top: 2px;
            letter-spacing: 2px;
            text-shadow: 0 0 20px rgba(192, 57, 43, 0.6);
          }

          .side-deco {
            position: absolute;
            top: 90px;
            bottom: 58px;
            width: 10px;
            border-radius: 5px;
            background: repeating-linear-gradient(
              180deg,
              #8B0000 0px, #8B0000 12px,
              #1A1A1A 12px, #1A1A1A 20px,
              #C0392B 20px, #C0392B 32px,
              #1A1A1A 32px, #1A1A1A 40px,
              #FFD700 40px, #FFD700 44px,
              #1A1A1A 44px, #1A1A1A 52px
            );
            opacity: 0.7;
          }
          .side-deco-left  { left: 16px; }
          .side-deco-right { right: 16px; }
        `}</style>

        <div className="main-border">
          <div className="main-inner">
            <div className="top-header">
              <span className="badge">● EN VIVO</span>
              <span>{host?.name || 'Guta Flores'}</span>
            </div>

            <div className="side-deco side-deco-left"></div>
            <div className="side-deco side-deco-right"></div>

            <div className="cam-solo-wrapper">
              <div className="cam-solo-container">
                <div className="cam-solo-box">
                  <div className="cam-window"></div>

                  <div className="name-tag-solo">
                    <div className="role-title">{host?.role || '🎙️ ANFITRIÓN / HOST'}</div>
                    <div className="user-name">{host?.name || 'GUTA FLORES'}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="motto-banner" style={{ position: 'absolute', bottom: '50px', left: '10px', right: '10px', width: 'auto', padding: '5px 16px', borderRadius: '6px' }}>
              <div className="motto-text-group">
                <span className="motto-phrase highlight" style={{ fontSize: '14px' }}>🎙️ DIFUNDIENDO ARTISTAS POCOS CONOCIDOS</span>
                <span className="motto-connector" style={{ fontSize: '14px', width: '22px', height: '22px' }}>Y</span>
                <span className="motto-phrase" style={{ fontSize: '14px' }}>GUITARREAMOS A LA GORRA 🪕</span>
              </div>
            </div>

            <TickerBar items={ticker} />
          </div>
        </div>
      </div>
    </div>
  );
}

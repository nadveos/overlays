import React, { useState } from 'react';
import html2canvas from 'html2canvas';

const defaultTemplate = `Hola [Nombre del artista], ¿cómo estás?

Te escribo porque sigo de cerca tu trabajo musical y me gustaría invitarte a ser parte de una entrevista especial que estamos produciendo sobre música y trayectoria. 

La idea es tener una charla amena sobre tus inicios, el camino recorrido y compartir tu experiencia con artistas emergentes que están buscando su propio espacio.

La grabación la realizamos de forma remota (vía Google Meet) y no tomaría más de 15 a 20 minutos. Luego, los fragmentos destacados se compartirán en nuestras redes (TikTok/Instagram) para darle visibilidad a tu proyecto y conectar con nueva audiencia.

Avisame si te interesa la propuesta y coordinamos el día y horario que mejor te quede. ¡Sería un verdadero gusto contar con vos!`;

export function Invitacion() {
  const [artistName, setArtistName] = useState('[Nombre del artista]');
  const [hostName, setHostName] = useState('GUTA FLORES');
  const [bodyText, setBodyText] = useState(defaultTemplate);

  const getFormattedBody = () => {
    const nameToUse = artistName.trim() || '[Nombre del artista]';
    return bodyText.replace(/Hola\s+([^,]+),/i, `Hola <strong class="artist-highlight">${nameToUse}</strong>,`);
  };

  const downloadImage = () => {
    const card = document.getElementById('invitationCard');
    if (!card) return;
    html2canvas(card, {
      backgroundColor: null,
      scale: 2,
      useCORS: true
    }).then(canvas => {
      const link = document.createElement('a');
      const artist = artistName.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'artista';
      link.download = `Invitacion_Entrevista_${artist}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  };

  const copyText = () => {
    const textToCopy = `${bodyText}\n\nUn abrazo,\n${hostName}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert('¡Texto copiado al portapapeles!');
    });
  };

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      overflowY: 'auto',
      background: '#0d0d0d',
      color: '#FFFFFF',
      fontFamily: "'Outfit', sans-serif"
    }}>
      <style>{`
        .app-container {
          display: flex;
          flex-direction: row;
          min-height: 100vh;
          width: 100%;
        }

        .controls-sidebar {
          width: 380px;
          background: #141414;
          border-right: 2px solid #2a0000;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          box-shadow: 5px 0 25px rgba(0, 0, 0, 0.8);
          z-index: 100;
          flex-shrink: 0;
        }

        .controls-title {
          font-size: 20px;
          font-weight: 800;
          color: #FFD700;
          display: flex;
          align-items: center;
          gap: 8px;
          border-bottom: 1px solid #333;
          padding-bottom: 12px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-group label {
          font-size: 12px;
          font-weight: 700;
          color: #E74C3C;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .form-group input,
        .form-group textarea {
          background: #0a0a0a;
          border: 1px solid #333;
          border-radius: 8px;
          padding: 10px 12px;
          color: #fff;
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #C0392B;
          box-shadow: 0 0 10px rgba(192, 57, 43, 0.4);
        }

        .btn-action {
          background: linear-gradient(135deg, #8B0000, #C0392B);
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 12px 16px;
          font-weight: 800;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 1px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(139, 0, 0, 0.4);
          margin-top: 8px;
        }

        .btn-action:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(192, 57, 43, 0.6);
          background: linear-gradient(135deg, #A00000, #D63E2D);
        }

        .btn-secondary {
          background: #222;
          border: 1px solid #444;
          color: #ccc;
        }

        .btn-secondary:hover {
          background: #333;
          color: #fff;
        }

        .preview-area {
          flex: 1;
          padding: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at center, #1a0808 0%, #080808 100%);
          position: relative;
        }

        .invitation-card {
          width: 720px;
          background: rgba(15, 15, 15, 0.95);
          border: 3px solid #8B0000;
          border-radius: 24px;
          padding: 40px 48px;
          position: relative;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.9), 0 0 30px rgba(139, 0, 0, 0.3);
          backdrop-filter: blur(10px);
          overflow: hidden;
        }

        .invitation-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 6px;
          background: linear-gradient(90deg, #8B0000, #FFD700, #C0392B, #8B0000);
          background-size: 200% 200%;
          animation: ponchoWave 6s ease infinite;
        }

        .card-header-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(139, 0, 0, 0.25);
          border: 1px solid #C0392B;
          padding: 6px 18px;
          border-radius: 20px;
          color: #FFD700;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 24px;
        }

        .badge-dot {
          width: 8px;
          height: 8px;
          background: #E74C3C;
          border-radius: 50%;
          animation: pulse 1.5s infinite;
        }

        .invitation-body {
          font-size: 16px;
          line-height: 1.7;
          color: #E0E0E0;
          white-space: pre-line;
          margin-bottom: 28px;
        }

        .invitation-body strong.artist-highlight {
          color: #FFD700;
          font-size: 18px;
          font-weight: 700;
          text-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
        }

        .invitation-footer {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 20px;
          margin-top: 10px;
        }

        .signature-block {
          display: flex;
          flex-direction: column;
        }

        .sign-valediction {
          font-size: 14px;
          color: #AAA;
          font-style: italic;
        }

        .sign-name {
          font-size: 22px;
          font-weight: 900;
          color: #FFFFFF;
          letter-spacing: 1.5px;
          background: linear-gradient(90deg, #FFF, #C0392B);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-top: 2px;
        }

        .brand-stamp {
          text-align: right;
        }

        .brand-stamp .brand-tag {
          font-size: 11px;
          font-weight: 800;
          color: #C0392B;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .brand-stamp .brand-sub {
          font-size: 12px;
          color: #888;
        }

        @media (max-width: 1024px) {
          .app-container {
            flex-direction: column;
          }

          .controls-sidebar {
            width: 100%;
          }

          .invitation-card {
            width: 100%;
            padding: 24px;
          }
        }
      `}</style>

      <div className="app-container">
        {/* PANEL DE EDICIÓN LATERAL */}
        <div className="controls-sidebar">
          <div className="controls-title">
            <span>✉️ Editor de Invitación</span>
          </div>

          <div className="form-group">
            <label htmlFor="artistInput">Nombre del Artista / Banda</label>
            <input
              type="text"
              id="artistInput"
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
              placeholder="Ej. Gustavo Cerati"
            />
          </div>

          <div className="form-group">
            <label htmlFor="hostInput">Firma del Anfitrión</label>
            <input
              type="text"
              id="hostInput"
              value={hostName}
              onChange={(e) => setHostName(e.target.value)}
              placeholder="Tu nombre"
            />
          </div>

          <div className="form-group">
            <label htmlFor="bodyInput">Mensaje de Invitación</label>
            <textarea
              id="bodyInput"
              rows={12}
              style={{ resize: 'vertical' }}
              value={bodyText}
              onChange={(e) => setBodyText(e.target.value)}
            />
          </div>

          <button className="btn-action" onClick={downloadImage}>
            <span>📸 Descargar como Imagen (PNG)</span>
          </button>

          <button className="btn-action btn-secondary" onClick={copyText}>
            <span>📋 Copiar Texto del Mensaje</span>
          </button>
        </div>

        {/* ÁREA DE PREVISUALIZACIÓN / OVERLAY DIGITAL */}
        <div className="preview-area">
          <div className="invitation-card" id="invitationCard">
            <div className="card-header-badge">
              <span className="badge-dot"></span>
              <span>Invitación Especial — Entrevista &amp; Travesía Musical</span>
            </div>

            <div
              className="invitation-body"
              id="invitationContent"
              dangerouslySetInnerHTML={{ __html: getFormattedBody() }}
            />

            <div className="invitation-footer">
              <div className="signature-block">
                <span className="sign-valediction">Un abrazo,</span>
                <span className="sign-name" id="displayHostName">
                  {hostName.trim() || 'GUTA FLORES'}
                </span>
              </div>

              <div className="brand-stamp">
                <div className="brand-tag">GUTA FLORES SHOW</div>
                <div className="brand-sub">Música &amp; Trayectoria</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

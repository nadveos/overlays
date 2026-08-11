import React from 'react';
import { useStreamData } from '../hooks/useStreamData';

export function Invitacion() {
  const { guest, guestEnabled } = useStreamData();

  const styles = {
    container: {
      minHeight: '100vh',
      background: '#0d0d0d',
      color: '#FFF',
      padding: '40px 20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    card: {
      maxWidth: '600px',
      width: '100%',
      background: 'linear-gradient(135deg, #1a0000 0%, #0d0d0d 100%)',
      border: '2px solid #C0392B',
      borderRadius: '20px',
      padding: '36px',
      boxShadow: '0 0 30px rgba(192, 57, 43, 0.4)',
      textAlign: 'center'
    },
    badge: {
      background: 'linear-gradient(135deg, #8B0000, #C0392B)',
      color: '#FFD700',
      padding: '6px 16px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: 900,
      letterSpacing: '2px',
      display: 'inline-block',
      marginBottom: '20px'
    },
    title: {
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: '52px',
      color: '#FFF',
      letterSpacing: '4px',
      lineHeight: 1.1,
      marginBottom: '10px'
    },
    subtitle: {
      fontSize: '18px',
      color: '#FFD700',
      fontWeight: 700,
      letterSpacing: '2px',
      marginBottom: '24px'
    },
    bio: {
      fontSize: '16px',
      color: 'rgba(255,255,255,0.85)',
      lineHeight: 1.6,
      marginBottom: '30px',
      background: 'rgba(255,255,255,0.03)',
      padding: '16px',
      borderRadius: '12px',
      border: '1px solid rgba(192,57,43,0.3)'
    }
  };

  if (!guestEnabled) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.badge}>💌 INVITACIÓN DIGITAL</div>
          <div style={styles.title}>PRÓXIMO ENCUENTRO</div>
          <p style={{ color: '#AAA' }}>No hay invitado confirmado para esta sesión actualmente.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.badge}>🎙️ INVITADO ESPECIAL</div>
        <div style={styles.title}>{guest?.name?.toUpperCase() || 'INVITADO'}</div>
        <div style={styles.subtitle}>{guest?.role || 'ENTREVISTA MUSICAL EN VIVO'}</div>
        
        {guest?.bio && <div style={styles.bio}>{guest.bio}</div>}

        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          {guest?.socials?.map((s, idx) => (
            s.handle ? (
              <div key={idx} style={{ background: 'rgba(255,255,255,0.06)', padding: '8px 16px', borderRadius: '10px', fontSize: '14px', border: '1px solid rgba(255,215,0,0.3)' }}>
                <span>{s.icon || '🌐'} </span>
                <span style={{ color: '#FFD700', fontWeight: 'bold' }}>{s.handle}</span>
              </div>
            ) : null
          ))}
        </div>
      </div>
    </div>
  );
}

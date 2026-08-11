import React from 'react';

export function TickerBar({ items = [] }) {
  if (!items || items.length === 0) return null;

  const isSingle = items.length === 1;

  if (isSingle) {
    const item = items[0];
    return (
      <div className="ticker-bar">
        <div className="ticker-label">
          <span className="ticker-dot"></span>
          ✨ DESTACADO
        </div>
        <div className="ticker-track" style={{ justifyContent: 'center', overflow: 'visible' }}>
          <div
            className="ticker-content"
            style={{
              animation: 'none',
              transform: 'none',
              textAlign: 'center',
              width: '100%',
              paddingLeft: 0
            }}
          >
            {item.prefix && `${item.prefix} `}
            <span className={item.highlight ? 'highlight' : ''}>{item.text}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ticker-bar">
      <div className="ticker-label">
        <span className="ticker-dot"></span>
        ✨ DESTACADO
      </div>
      <div className="ticker-track">
        <div className="ticker-content">
          {items.map((item, idx) => (
            <React.Fragment key={idx}>
              {item.prefix && `${item.prefix} `}
              <span className={item.highlight ? 'highlight' : ''}>{item.text}</span>
              <span className="sep">◆</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

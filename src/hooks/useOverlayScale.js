import { useState, useEffect } from 'react';

/**
 * Calcula el factor de escala para que un overlay de dimensiones fijas
 * entre completamente dentro del viewport del navegador.
 *
 * @param {number} overlayWidth  - Ancho natural del overlay en px (ej: 1080)
 * @param {number} overlayHeight - Alto natural del overlay en px (ej: 1920)
 * @returns {{ scale: number, wrapperStyle: object, innerStyle: object }}
 */
export function useOverlayScale(overlayWidth, overlayHeight) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const calculate = () => {
      const scaleX = window.innerWidth  / overlayWidth;
      const scaleY = window.innerHeight / overlayHeight;
      setScale(Math.min(scaleX, scaleY));
    };

    calculate();
    window.addEventListener('resize', calculate);
    return () => window.removeEventListener('resize', calculate);
  }, [overlayWidth, overlayHeight]);

  const wrapperStyle = {
    width:    '100vw',
    height:   '100vh',
    overflow: 'hidden',
    display:  'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
  };

  const innerStyle = {
    width:           `${overlayWidth}px`,
    height:          `${overlayHeight}px`,
    transformOrigin: 'center center',
    transform:       `scale(${scale})`,
    flexShrink:      0,
  };

  return { scale, wrapperStyle, innerStyle };
}

import { useState, useEffect } from 'react';

export function useStreamData() {
  const [data, setData] = useState({
    host: { name: 'Guta Flores', role: '' },
    guest: {
      enabled: true,
      name: '',
      role: '',
      bio: '',
      socials: []
    },
    ticker: []
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchStreamData = async () => {
    try {
      // 1. Probar desde localStorage primero
      const localDataStr = localStorage.getItem('streamData');
      if (localDataStr) {
        try {
          const parsed = JSON.parse(localDataStr);
          setData(parsed);
          setIsLoading(false);
          return;
        } catch (e) {}
      }

      // 2. Fetch de la API backend
      const res = await fetch('/api/stream-data?t=' + Date.now());
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.warn('Error al cargar streamData:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStreamData();

    const handleStorage = (e) => {
      if (e.key === 'streamData' && e.newValue) {
        try {
          setData(JSON.parse(e.newValue));
        } catch (err) {}
      }
    };

    window.addEventListener('storage', handleStorage);
    const interval = setInterval(fetchStreamData, 2000);

    return () => {
      window.removeEventListener('storage', handleStorage);
      clearInterval(interval);
    };
  }, []);

  return {
    ...data,
    guestEnabled: data.guest?.enabled !== false && Boolean(data.guest?.name && data.guest.name.trim() !== ''),
    isLoading
  };
}

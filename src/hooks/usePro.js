import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export function usePro() {
  const [isPro, setIsPro] = useState(() => {
    return localStorage.getItem('ck_pro') === 'true';
  });
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get('pro') === 'activated') {
      localStorage.setItem('ck_pro', 'true');
      setIsPro(true);
      // Success toast would be triggered here in the component or via a callback
    }
  }, [searchParams]);

  return isPro;
}

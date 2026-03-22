import { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { PAYHIP_PRODUCT_URL, PAYHIP_API_KEY } from '../utils/config';

const ProContext = createContext();

export function ProProvider({ children }) {
  const [isPro, setIsPro] = useState(() => {
    return localStorage.getItem('ck_pro') === 'true';
  });

  const unlockPro = async (licenseKey) => {
    if (!licenseKey) return false;

    try {
      const response = await fetch(
        `https://payhip.com/api/v1/license/verify?product_link=${encodeURIComponent(PAYHIP_PRODUCT_URL)}&license_key=${encodeURIComponent(licenseKey)}`,
        {
          headers: {
            'Authorization': `Bearer ${PAYHIP_API_KEY}`
          }
        }
      );

      const result = await response.json();
      if (result.data && result.data.status === 'active') {
        localStorage.setItem('ck_pro', 'true');
        localStorage.setItem('ck_license', licenseKey);
        setIsPro(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('License verification error:', error);
      return false;
    }
  };

  const revokePro = () => {
    localStorage.removeItem('ck_pro');
    localStorage.removeItem('ck_license');
    setIsPro(false);
  };

  return (
    <ProContext.Provider value={{ isPro, unlockPro, revokePro }}>
      {children}
    </ProContext.Provider>
  );
}

export function usePro() {
  const context = useContext(ProContext);
  if (!context) {
    throw new Error('usePro must be used within a ProProvider');
  }
  return context;
}

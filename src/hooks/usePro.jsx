import { useState, createContext, useContext } from 'react';
import { PAYHIP_PRODUCT_URL, VERIFY_ENDPOINT } from '../utils/config';

const ProContext = createContext();

export function ProProvider({ children }) {
  const [isPro, setIsPro] = useState(() => {
    return localStorage.getItem('ck_pro') === 'true';
  });

  const unlockPro = async (licenseKey) => {
    if (!licenseKey) return false;

    try {
      const response = await fetch(VERIFY_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          licenseKey,
          productUrl: PAYHIP_PRODUCT_URL,
        }),
      });

      const data = await response.json();
      if (data.valid === true) {
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


import { useState, useEffect } from 'react';

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile(); // Check on initial load
    window.addEventListener('resize', checkIfMobile); // Listen for resize events
    
    return () => {
      window.removeEventListener('resize', checkIfMobile); // Clean up listener
    };
  }, []);

  return isMobile;
}

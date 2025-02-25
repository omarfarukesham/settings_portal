import { useEffect, useState } from 'react';
const useDevice = (deviceWidth = 640) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleWindowResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= deviceWidth);
    };

    window.addEventListener('resize', handleWindowResize);
    handleWindowResize(); // Initial check on component mount

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [deviceWidth]);

  return { isMobile };
};

export default useDevice;

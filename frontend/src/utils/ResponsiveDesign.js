import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

const useResponsiveDesign = (screenType = 'desktop') => {
  const [isResponsive, setIsResponsive] = useState(false);

  const isSmallScreen = useMediaQuery({ maxWidth: 640 });
  const isOther = useMediaQuery({ maxWidth: 835 });
  const isMobile = useMediaQuery({ maxWidth: 1023 });
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  useEffect(() => {
    if (screenType === 'small') {
      setIsResponsive(isSmallScreen);
    } else if (screenType === 'other') {
      setIsResponsive(isOther);
    } else if (screenType === 'mobile') {
      setIsResponsive(isMobile);
    } else if (screenType === 'desktop') {
      setIsResponsive(isDesktop);
    }
  }, [isSmallScreen, isOther, isMobile, isDesktop]);

  return isResponsive;
};

export default useResponsiveDesign;

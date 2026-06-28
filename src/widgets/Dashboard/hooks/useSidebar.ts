import { useState, useEffect } from 'react';

const MOBILE_BREAKPOINT = 768;

export const useSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(
    window.innerWidth < MOBILE_BREAKPOINT
  );

  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth < MOBILE_BREAKPOINT);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggle = () => setIsCollapsed((prev) => !prev);

  return { isCollapsed, toggle };
};

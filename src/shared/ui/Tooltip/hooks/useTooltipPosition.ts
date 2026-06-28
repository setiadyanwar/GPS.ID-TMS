import { useState, useRef, useEffect, useCallback } from 'react';

export const useTooltipPosition = (isVisible: boolean) => {
  const [position, setPosition] = useState<{ x: number; y: number; position: 'top' | 'bottom' }>({ x: 0, y: 0, position: 'top' });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const tooltipHeight = tooltipRef.current?.offsetHeight || 40;
    const tooltipWidth = tooltipRef.current?.offsetWidth || 200;

    const spaceAbove = rect.top;
    const spaceBelow = window.innerHeight - rect.bottom;

    let pos: 'top' | 'bottom' = 'top';
    let y = rect.top - 8;

    if (spaceAbove < tooltipHeight + 10 && spaceBelow > spaceAbove) {
      pos = 'bottom';
      y = rect.bottom + 8;
    }

    let x = rect.left + rect.width / 2;
    if (x - tooltipWidth / 2 < 10) {
      x = tooltipWidth / 2 + 10;
    } else if (x + tooltipWidth / 2 > window.innerWidth - 10) {
      x = window.innerWidth - tooltipWidth / 2 - 10;
    }

    setPosition({ x, y, position: pos });
  }, []);

  useEffect(() => {
    if (isVisible) {
      calculatePosition();
      window.addEventListener('scroll', calculatePosition, true);
      window.addEventListener('resize', calculatePosition);
      return () => {
        window.removeEventListener('scroll', calculatePosition, true);
        window.removeEventListener('resize', calculatePosition);
      };
    }
  }, [isVisible, calculatePosition]);

  return { triggerRef, tooltipRef, position };
};

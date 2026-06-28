import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useTooltipPosition } from './hooks/useTooltipPosition';

interface TooltipProps {
  content: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Tooltip = ({ content, children, className = '' }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const { triggerRef, tooltipRef, position } = useTooltipPosition(isVisible);


  if (!content || content === 'N/A' || content === '-') {
    return <div className={`inline-flex min-w-0 ${className}`}>{children}</div>;
  }

  return (
    <>
      <div 
        ref={triggerRef}
        className={`inline-flex min-w-0 ${className}`}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      
      {isVisible && createPortal(
        <div 
          ref={tooltipRef}
          className="fixed z-[9999] pointer-events-none animate-in fade-in duration-200"
          style={{ 
            left: `${position.x}px`, 
            top: `${position.y}px`,
            transform: `translate(-50%, ${position.position === 'top' ? '-100%' : '0'})`
          }}
        >
          <div className="bg-white/80 backdrop-blur-md border border-slate-200/50 text-typography-heading text-[11px] font-bold leading-relaxed rounded-lg py-1.5 px-3 shadow-[0_8px_30px_rgb(0,0,0,0.08)] whitespace-normal text-center w-max max-w-[400px]">
            {content}
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

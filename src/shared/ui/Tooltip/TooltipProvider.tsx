/**
 * TooltipProvider.tsx
 *
 * Sistem tooltip global ala Sonner/Toast — cukup dirender SEKALI di root App.
 *
 * Cara pakai di komponen mana saja (TANPA import apapun):
 *   <span data-tooltip="Teks tooltip di sini">...</span>
 *
 * Untuk teks yang hanya tampil ketika benar-benar ter-truncate:
 *   <span data-tooltip data-tooltip-truncate className="truncate">Teks panjang...</span>
 *   → Tooltip hanya muncul jika scrollWidth > clientWidth (benar-benar terpotong).
 *   → Konten tooltip diambil otomatis dari textContent elemen itu sendiri.
 *
 * Untuk konten custom + truncate check:
 *   <span data-tooltip="Custom teks" data-tooltip-truncate className="truncate">Teks...</span>
 */
import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';

interface TooltipState {
  text: string;
  x: number;
  y: number;
  placement: 'top' | 'bottom' | 'right' | 'left';
}

const TOOLTIP_OFFSET = 8;
const HIDE_DELAY_MS = 80;

export const TooltipProvider = () => {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const computePlacement = useCallback(
    (rect: DOMRect, requestedPlacement?: string | null): { x: number; y: number; placement: 'top' | 'bottom' | 'right' | 'left' } => {
      const tooltipH = tooltipRef.current?.offsetHeight ?? 40;
      const tooltipW = tooltipRef.current?.offsetWidth ?? 250;

      let placement: 'top' | 'bottom' | 'right' | 'left' = 'top';

      if (requestedPlacement === 'right' || requestedPlacement === 'left' || requestedPlacement === 'bottom') {
        placement = requestedPlacement as any;
      } else {
        // Auto detect untuk top/bottom jika tidak diset
        placement = rect.top > tooltipH + TOOLTIP_OFFSET ? 'top' : 'bottom';
      }

      let x = 0;
      let y = 0;

      if (placement === 'top' || placement === 'bottom') {
        x = rect.left + rect.width / 2;
        y = placement === 'top' ? rect.top - TOOLTIP_OFFSET : rect.bottom + TOOLTIP_OFFSET;
        
        // Cek overflow horizontal
        if (x - tooltipW / 2 < 10) x = tooltipW / 2 + 10;
        else if (x + tooltipW / 2 > window.innerWidth - 10) x = window.innerWidth - tooltipW / 2 - 10;
      } else if (placement === 'right' || placement === 'left') {
        y = rect.top + rect.height / 2;
        x = placement === 'right' ? rect.right + TOOLTIP_OFFSET : rect.left - TOOLTIP_OFFSET;
        
        // Cek overflow vertical
        if (y - tooltipH / 2 < 10) y = tooltipH / 2 + 10;
        else if (y + tooltipH / 2 > window.innerHeight - 10) y = window.innerHeight - tooltipH / 2 - 10;
      }

      return { x, y, placement };
    },
    []
  );

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Cari ancestor terdekat yang punya attribute data-tooltip
      const el = target.closest<HTMLElement>('[data-tooltip]');
      if (!el) return;

      // Jika data-tooltip-truncate ada, hanya tampilkan jika benar-benar terpotong
      const isTruncateOnly = el.hasAttribute('data-tooltip-truncate');
      if (isTruncateOnly && el.scrollWidth <= el.clientWidth) return;

      // Konten tooltip: dari attribute, atau fallback ke textContent jika attribute kosong/boolean
      const attrVal = el.getAttribute('data-tooltip');
      const text =
        attrVal && attrVal !== 'true' && attrVal !== ''
          ? attrVal
          : el.textContent?.trim() ?? '';

      if (!text) return;

      clearTimeout(hideTimer.current);

      const requestedPlacement = el.getAttribute('data-tooltip-position');
      const rect = el.getBoundingClientRect();
      const { x, y, placement } = computePlacement(rect, requestedPlacement);
      setTooltip({ text, x, y, placement });
    };

    const handleMouseOut = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null;
      // Kalau masih di dalam elemen data-tooltip, jangan sembunyikan
      if (related?.closest('[data-tooltip]')) return;
      hideTimer.current = setTimeout(() => setTooltip(null), HIDE_DELAY_MS);
    };

    const handleScroll = () => setTooltip(null);

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('scroll', handleScroll, true);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('scroll', handleScroll, true);
      clearTimeout(hideTimer.current);
    };
  }, [computePlacement]);

  if (!tooltip) return null;

  const getTransform = () => {
    switch (tooltip.placement) {
      case 'top': return 'translate(-50%, -100%)';
      case 'bottom': return 'translate(-50%, 0)';
      case 'right': return 'translate(0, -50%)';
      case 'left': return 'translate(-100%, -50%)';
    }
  };

  return createPortal(
    <div
      ref={tooltipRef}
      className="fixed z-[9999] pointer-events-none"
      style={{
        left: `${tooltip.x}px`,
        top: `${tooltip.y}px`,
        transform: getTransform(),
      }}
    >
      <div className="bg-white/10 backdrop-blur-xl border border-white/40 text-typography-heading text-xs font-bold leading-relaxed rounded-lg py-1.5 px-3 shadow-xl whitespace-normal text-center w-max max-w-[400px]">
        {tooltip.text}
      </div>
    </div>,
    document.body
  );
};

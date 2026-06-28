/**
 * Speedometer.tsx
 *
 * Pure presentational component untuk menampilkan kecepatan dan odometer
 * dalam bentuk gauge/speedometer setengah lingkaran.
 *
 * Menggunakan React.useId() agar setiap instance memiliki SVG ID yang unik
 * — ini penting agar mask dan gradient tidak saling "mencuri" style antar card.
 */
import { useId } from 'react';

interface SpeedometerProps {
  speed: number;
  mileage: number;
  maxSpeed?: number;
}

export const Speedometer = ({ speed, mileage, maxSpeed = 120 }: SpeedometerProps) => {
  const svgId = useId();
  const maskId = `gaugeMask-${svgId}`;
  const gradId = `speedGradient-${svgId}`;

  const circumference = 125.6;
  const speedPercent = Math.min(speed / maxSpeed, 1);
  const strokeDashoffset = circumference - speedPercent * circumference;

  return (
    <div className="flex flex-col items-center relative w-36">
      <div className="relative w-32 h-16 overflow-hidden flex justify-center mt-2">
        <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
          <defs>
            <mask id={maskId}>
              <path
                d="M 10 50 A 40 40 0 0 1 90 50"
                fill="none"
                stroke="white"
                strokeWidth="16"
                strokeDasharray="125.6"
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="butt"
              />
            </mask>
            <linearGradient id={gradId} x1="0%" y1="100%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#43A6EE" />
              <stop offset="19%" stopColor="#E1E8EC30" />
            </linearGradient>
          </defs>

          {/* Background Dashes */}
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke="#F1F5F9"
            strokeWidth="12"
            strokeDasharray="6 3"
            strokeLinecap="butt"
          />

          {/* Active Dashes (Masked by speed) */}
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth="12"
            strokeDasharray="6 3"
            strokeLinecap="butt"
            mask={`url(#${maskId})`}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
      </div>

      <div className="absolute bottom-0 flex flex-col items-center text-center w-full">
        <span className="text-sm font-bold text-typography-heading">{speed}km/h</span>
        <span 
          className="text-[10px] font-bold text-typography-placeholder truncate max-w-[72px] block cursor-default"
          data-tooltip={`Odo : ${new Intl.NumberFormat('id-ID').format(mileage)} km`}
        >
          Odo : {new Intl.NumberFormat('id-ID').format(mileage)} km
        </span>
      </div>
    </div>
  );
};

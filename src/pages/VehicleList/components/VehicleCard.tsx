import type { Vehicle, VehicleStatus } from '../types/vehicle';
import { ClipboardList, BatteryFull } from 'lucide-react';

import TruckBox from '@/assets/images/truck-box.png';
import SatelitIcon from '@/assets/icons/satelit.svg';

import { Speedometer } from './Speedometer';
import { EngineIcon } from '@/shared/ui/Icons/EngineIcon';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { formatToIDDate } from '../utils/dateUtils';

// ─── Overloaded types ──────────────────────────────────────────────────────
type VehicleCardProps =
  | { loading: true; vehicle?: never; status?: never }
  | { loading?: false; vehicle: Vehicle; status: VehicleStatus };

const STATUS_CONFIG: Record<VehicleStatus, { label: string; colorClass: string }> = {
  Running: { label: 'Running', colorClass: 'bg-success' },
  Stop: { label: 'Stop', colorClass: 'bg-danger' },
  Parking: { label: 'Parking', colorClass: 'bg-slate-400' },
  Unknown: { label: 'Unknown', colorClass: 'bg-slate-300' },
};

// ─── Skeleton version (mirrors real layout) ────────────────────────────────
const VehicleCardSkeleton = () => (
  <div className="w-full">
    {/* Tab */}
    <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-t-xl border-b border-body">
      <Skeleton className="h-3.5 w-16 rounded-md" />
      <Skeleton className="h-3.5 w-20 rounded-md" />
    </div>

    {/* Body */}
    <div className="bg-white rounded-xl rounded-tl-none p-5 relative">

      {/* Top: Speedometer area + Truck + Info */}
      <div className="flex items-center gap-6 mb-5">
        {/* Speedometer placeholder */}
        <div className="flex flex-col items-center relative w-36 shrink-0">
          <Skeleton className="w-32 h-16 rounded-full mt-2" />
        </div>

        {/* Truck icon placeholder */}
        <Skeleton className="w-10 h-10 rounded-lg shrink-0" />

        {/* Title info */}
        <div className="flex flex-col justify-center ml-2 min-w-0 flex-1 gap-2">
          <Skeleton className="h-3 w-2/3 rounded-md" />
          <Skeleton className="h-5 w-full rounded-md" />
        </div>
      </div>

      {/* Middle: ACC | Address | Battery */}
      <div className="flex items-center justify-between px-2 mb-5">
        <Skeleton className="h-4 w-20 rounded-md" />
        <Skeleton className="h-4 w-32 rounded-md" />
        <Skeleton className="h-4 w-16 rounded-md" />
      </div>

      {/* Bottom: Footer info */}
      <div className="bg-body rounded-lg py-1 px-3 flex justify-between items-center gap-4">
        <Skeleton className="h-3 w-32 rounded-md" />
        <Skeleton className="h-3 w-24 rounded-md" />
        <Skeleton className="h-3 w-28 rounded-md" />
      </div>
    </div>
  </div>
);

// ─── Real version ──────────────────────────────────────────────────────────
export const VehicleCard = ({ loading, vehicle, status }: VehicleCardProps) => {
  if (loading) return <VehicleCardSkeleton />;

  const statusConfig = STATUS_CONFIG[status] || STATUS_CONFIG.Unknown;

  return (
    <div className="w-full">
      {/* Folder Tab */}
      <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-t-xl border-b border-body">
        <span className="text-typography-muted text-sm font-medium">Status :</span>
        <div className="flex items-center gap-1.5 font-bold text-typography-heading text-sm">
          <span className={`w-2.5 h-2.5 rounded-full ${statusConfig.colorClass}`} />
          {statusConfig.label}
        </div>
      </div>

      {/* Main Body */}
      <div className="bg-white rounded-xl rounded-tl-none p-5 relative">

        {/* Top Section: Speedometer + Truck + Info */}
        <div className="flex items-center gap-6 mb-5">
          <Speedometer speed={vehicle.speed} mileage={vehicle.mileage} />

          <img src={TruckBox} alt="Truck" className="w-10 h-auto drop-shadow-md" />

          <div className="flex flex-col justify-center ml-2 min-w-0 overflow-hidden flex-1">
            <div className="flex items-center gap-2 mb-1 whitespace-nowrap">
              <span className="text-xs text-typography-placeholder font-medium">Shipment Number</span>
              <span className="text-sm font-medium text-typography-heading">{vehicle.nomesin ?? '-'}</span>
            </div>
            <span
              data-tooltip={`${vehicle.plate} - ${vehicle.device_name}`}
              data-tooltip-truncate
              className="text-xl font-bold text-typography-heading truncate w-full block"
            >
              {vehicle.plate} - {vehicle.device_name}
            </span>
          </div>
        </div>

        {/* Middle Section: ACC | Address | Battery */}
        <div className="flex items-center justify-between px-2 mb-5">
          <div className="flex items-center gap-2 shrink-0">
            <EngineIcon />
            <span className="text-sm font-extrabold text-typography-heading whitespace-nowrap">
              ACC {vehicle.acc}
            </span>
          </div>

          <div className="flex-1 relative h-5 mx-4">
            <div className="absolute top-0 left-1/2 -translate-x-[27px] flex items-center justify-start gap-2 w-max max-w-[130px] sm:max-w-[180px]">
              <img src={SatelitIcon} alt="Satellite" className="w-5 h-5 shrink-0" />
              <span
                data-tooltip={vehicle.address}
                data-tooltip-truncate
                className="text-sm font-extrabold text-typography-heading truncate block w-full text-left"
              >
                {vehicle.address ?? 'N/A'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <BatteryFull size={20} className="text-typography-muted shrink-0" />
            <span className="text-sm font-extrabold text-typography-heading whitespace-nowrap">
              {vehicle.battery ?? '100%'}
            </span>
          </div>
        </div>

        {/* Bottom Section: Footer Info */}
        <div className="bg-body py-1 px-3 flex justify-between items-center">
          <span className="text-xs font-semibold text-typography-muted">
            Activated : {formatToIDDate(vehicle.activation_time)}
          </span>
          <span className="text-xs font-semibold text-typography-muted">
            GSM No : {vehicle.gsm_no}
          </span>
          <span className="text-xs font-semibold text-typography-muted">
            Expired : {formatToIDDate(vehicle.expired_gsm)}
          </span>
        </div>

      </div>
    </div>
  );
};

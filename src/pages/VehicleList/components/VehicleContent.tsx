import type { Vehicle } from '../types/vehicle';
import { getVehicleStatus } from '../utils/vehicleUtils';
import { VehicleCard } from './VehicleCard';
import { useVehicleGrid } from '../hooks/useVehicleGrid';

interface VehicleContentProps {
  vehicles: Vehicle[];
  isLoading: boolean;
  error: string | null;
}

export const VehicleContent = ({ vehicles, isLoading, error }: VehicleContentProps) => {
  const {
    query,
    filteredVehicles,
    visibleVehicles,
    isLoadingMore,
    hasMore,
    sentinelRef,
    PAGE_SIZE,
  } = useVehicleGrid(vehicles, isLoading);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {Array.from({ length: PAGE_SIZE }).map((_, i) => (
          <VehicleCard key={i} loading />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-5 gap-4">
        <svg width="48" height="48" viewBox="0 0 24 24" className="fill-danger">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
        <p className="text-danger font-medium text-base text-center">{error}</p>
      </div>
    );
  }

  if (filteredVehicles.length === 0 && !isLoading) {
    return (
      <div className="text-center py-16 px-5 text-typography-placeholder font-medium text-[15px]">
        <p>{query ? `No vehicles found for "${query}".` : 'No vehicles found.'}</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {visibleVehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.imei}
            vehicle={vehicle}
            status={getVehicleStatus(vehicle.acc, vehicle.speed)}
          />
        ))}
      </div>

      {isLoadingMore && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
          {Array.from({ length: Math.min(2, filteredVehicles.length - visibleVehicles.length) }).map((_, i) => (
            <VehicleCard key={i} loading />
          ))}
        </div>
      )}

      {/* Sentinel — selalu di paling bawah */}
      <div ref={sentinelRef} className="h-4" />

      {!hasMore && filteredVehicles.length > PAGE_SIZE && (
        <p className="text-center text-typography-placeholder text-sm mt-8 pb-4">
          All {filteredVehicles.length} vehicles have been loaded.
        </p>
      )}
    </>
  );
};

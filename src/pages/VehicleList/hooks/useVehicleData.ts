// Logic fetching data
import { useState, useEffect, useCallback } from 'react';
import { getVehicleList } from '../api/vehicleApi';
import type { Vehicle } from '../types/vehicle';

interface UseVehicleDataReturn {
  vehicles: Vehicle[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useVehicleData = (): UseVehicleDataReturn => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVehicles = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getVehicleList();
      if (response.status && typeof response.message !== 'string') {
        setVehicles(response.message.data);
      } else {
        setError(
          typeof response.message === 'string'
            ? response.message
            : 'Failed to load vehicle data.'
        );
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  return { vehicles, isLoading, error, refetch: fetchVehicles };
};

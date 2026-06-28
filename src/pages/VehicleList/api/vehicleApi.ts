import { apiClient } from '@/shared/api';
import type { Vehicle } from '../types/vehicle';

export interface VehicleListApiResponse {
  status: boolean;
  message: { total: number; data: Vehicle[] } | string;
}

export const getVehicleList = async (): Promise<VehicleListApiResponse> => {
  const response = await apiClient.get<VehicleListApiResponse>('/vehicle');
  return response.data;
};

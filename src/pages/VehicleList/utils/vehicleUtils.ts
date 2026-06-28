import type { VehicleStatus } from '../types/vehicle';


export const getVehicleStatus = (acc: string, speed: number): VehicleStatus => {
  if (acc === 'ON' && speed > 0) return 'Running';
  if (acc === 'ON' && speed === 0) return 'Stop';
  if (acc === 'OFF' && speed === 0) return 'Parking';
  return 'Unknown';
};

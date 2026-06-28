/**
 * Pure functions untuk logika bisnis domain Vehicle.
 * Tidak ada UI, tidak ada HTTP call — hanya kalkulasi murni.
 * Keuntungan: mudah di-unit test tanpa perlu render komponen apapun.
 */
import type { VehicleStatus } from '../types/vehicle';

/**
 * Menentukan status kendaraan berdasarkan kondisi ACC dan kecepatan.
 * - Running: Mesin ON dan kendaraan bergerak
 * - Stop   : Mesin ON tapi kendaraan diam (berhenti di tengah jalan)
 * - Parking: Mesin OFF dan kendaraan diam
 * - Unknown: Kondisi tidak dikenali
 */
export const getVehicleStatus = (acc: string, speed: number): VehicleStatus => {
  if (acc === 'ON' && speed > 0) return 'Running';
  if (acc === 'ON' && speed === 0) return 'Stop';
  if (acc === 'OFF' && speed === 0) return 'Parking';
  return 'Unknown';
};

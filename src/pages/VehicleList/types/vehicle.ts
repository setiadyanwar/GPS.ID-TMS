// Type untuk data vehicle
export interface Vehicle {
  imei: string;
  owner: string;
  device_name: string;
  plate: string;
  gsm_no: string;
  activation_time: string;
  expired_gsm: string;
  gps_type: string;
  vehicle_type: string;
  nomesin: string | null;
  norangka: string | null;
  acc: string;
  longitude: string;
  latitude: string;
  angle: number;
  altitude: string | null;
  speed: number;
  mileage: number;
  address: string | null;
  door: string;
  temperature: string | null;
  last_positioning: string;
  last_update: string;
  satellite: string | null;
  gsm_signal: number;
  battery: string;
}

export type VehicleStatus = 'Running' | 'Parking' | 'Stop' | 'Unknown';

// Halaman utama VehicleList(Entry Point)
import { useVehicleData } from './hooks/useVehicleData';
import { VehicleContent } from './components/VehicleContent';
import { VehicleListHeader } from './components/VehicleListHeader';
import { Dashboard } from '@/widgets/Dashboard/Dashboard';

const VehicleList = () => {
  const { vehicles, isLoading, error, refetch } = useVehicleData();

  return (
    <Dashboard>
      <VehicleListHeader 
        totalVehicles={vehicles.length} 
        isLoading={isLoading} 
        onRefresh={refetch} 
      />
      <VehicleContent 
        vehicles={vehicles} 
        isLoading={isLoading} 
        error={error} 
      />
    </Dashboard>
  );
};

export default VehicleList;

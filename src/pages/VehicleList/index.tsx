import { useVehicleData } from './hooks/useVehicleData';
import { VehicleGrid } from './components/VehicleGrid';
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
      <VehicleGrid 
        vehicles={vehicles} 
        isLoading={isLoading} 
        error={error} 
      />
    </Dashboard>
  );
};

export default VehicleList;

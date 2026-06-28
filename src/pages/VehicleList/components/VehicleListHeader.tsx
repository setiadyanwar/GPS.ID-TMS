import { Button } from '@/shared/ui/Button';

interface VehicleListHeaderProps {
  totalVehicles: number;
  isLoading: boolean;
  onRefresh: () => void;
}

export const VehicleListHeader = ({ totalVehicles, isLoading, onRefresh }: VehicleListHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-7 gap-4">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 mb-1 tracking-tight">Vehicle List</h1>
        <p className="text-sm font-medium text-slate-500">
          {isLoading ? 'Loading data...' : `${totalVehicles} vehicles registered`}
        </p>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={onRefresh}
        isLoading={isLoading}
      >
        {!isLoading && (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
          </svg>
        )}
        Refresh
      </Button>
    </div>
  );
};

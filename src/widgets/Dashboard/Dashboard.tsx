import { Sidebar } from '@/widgets/Sidebar/Sidebar';
import { Header } from '@/widgets/Header/Header';
import { useSidebar } from './hooks/useSidebar';

interface DashboardProps {
  children: React.ReactNode;
}


export const Dashboard = ({ children }: DashboardProps) => {
  const { isCollapsed, toggle } = useSidebar();

  return (
    <div className="flex h-screen w-full bg-body font-sans overflow-hidden">
      <Sidebar isCollapsed={isCollapsed} onToggle={toggle} />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden relative">
        <Header onToggleSidebar={toggle} />
        <main className="flex-1 overflow-y-auto p-8 bg-body">
          {children}
        </main>
      </div>
    </div>
  );
};

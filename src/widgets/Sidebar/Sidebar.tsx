import { Settings, Power } from 'lucide-react';
import { Button } from '@/shared/ui/Button';
import MenuIcon from '@/assets/icons/menu.svg';
import { useSidebarNav, NAV_ITEMS } from './hooks/useSidebarNav';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const Sidebar = ({ isCollapsed, onToggle }: SidebarProps) => {
  const { handleLogout, handleNavigate, isActive } = useSidebarNav();

  return (
    <>
      {/* Overlay untuk mobile saat sidebar terbuka */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-20 md:hidden" 
          onClick={onToggle}
        />
      )}
      
      <aside
        className={`bg-white flex flex-col transition-all duration-300 ease-in-out z-30 fixed md:relative h-full top-0 left-0 ${
          isCollapsed 
            ? '-translate-x-full w-64 md:translate-x-0 md:w-20' 
            : 'translate-x-0 w-64'
        }`}
      >
      {/* Logo Area */}
      <div className={`h-16 flex items-center justify-between px-4`}>
        {!isCollapsed && (
          <span className="font-extrabold text-primary text-xl tracking-tight whitespace-nowrap overflow-hidden">
            GPS.ID TMS
          </span>
        )}
        <Button 
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className={`text-slate-400 hover:text-slate-700 ${isCollapsed ? 'mx-auto' : ''}`}
          data-tooltip={isCollapsed ? "Expand" : "Collapse"}
          data-tooltip-position="right"
        >
          <img src={MenuIcon} alt="Toggle Sidebar" className="w-6 h-6 shrink-0" />
        </Button>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 py-4 flex flex-col gap-1.5 px-3 overflow-y-auto mt-2">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.path);
          const Icon = item.icon;
          return (
            <Button
              key={item.label}
              variant={active ? 'ghost-primary' : 'ghost'}
              justify={isCollapsed ? 'center' : 'start'}
              fullWidth
              onClick={() => handleNavigate(item.path)}
              className="relative group"
              data-tooltip={isCollapsed ? item.label : undefined}
              data-tooltip-position="right"
            >
              {/* Active Indicator Bar */}
              {active && (
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 h-10 w-1.5 bg-primary rounded-r-lg" />
              )}
              <Icon size={22} className={`shrink-0 transition-colors ${active ? 'text-primary' : 'text-charcoal group-hover:opacity-80'}`} />
              {!isCollapsed && <span className={active ? 'text-primary' : 'text-charcoal'}>{item.label}</span>}
            </Button>
          );
        })}
      </nav>

      {/* Bottom Links */}
      <div className="p-3 flex flex-col gap-1.5 mb-2">
        <Button 
          variant="ghost"
          justify={isCollapsed ? 'center' : 'start'}
          fullWidth
          data-tooltip={isCollapsed ? "Settings" : undefined}
          data-tooltip-position="right"
          className="group"
        >
          <Settings size={22} className="shrink-0 text-charcoal group-hover:opacity-80" strokeWidth={1.5} />
          {!isCollapsed && <span className="text-charcoal">Settings</span>}
        </Button>
        <Button 
          variant="ghost-danger"
          justify={isCollapsed ? 'center' : 'start'}
          fullWidth
          data-tooltip={isCollapsed ? "Logout" : undefined}
          data-tooltip-position="right"
          onClick={handleLogout}
          className="group"
        >
          <Power size={22} className="shrink-0 text-charcoal group-hover:text-red-500" strokeWidth={1.5} />
          {!isCollapsed && <span className="text-charcoal group-hover:text-red-500 transition-colors">Logout</span>}
        </Button>
      </div>
    </aside>
    </>
  );
};

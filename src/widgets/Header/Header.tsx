import { Menu } from 'lucide-react';
import { Button } from '@/shared/ui/Button';
import { HeaderSearch } from './components/HeaderSearch';
import { HeaderActions } from './components/HeaderActions';
import { HeaderProfile } from './components/HeaderProfile';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export const Header = ({ onToggleSidebar }: HeaderProps) => {
  return (
    <header className="h-16 bg-white flex items-center justify-between px-4 sticky top-0 z-20">
      <div className="flex items-center gap-4 flex-1">
        <Button 
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="-ml-2 text-slate-500 hover:text-slate-800"
        >
          <Menu size={20} />
        </Button>
        <HeaderSearch className="max-w-md w-full hidden sm:block" />  
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        <HeaderActions />
        <HeaderProfile />
      </div>
    </header>
  );
};

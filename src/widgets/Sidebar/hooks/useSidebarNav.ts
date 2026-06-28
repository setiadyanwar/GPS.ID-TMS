import { useNavigate, useLocation } from 'react-router-dom';
import { logoutUser } from '@/pages/Login/service/authService';
import { HiSquares2X2, HiCube, HiSquare3Stack3D } from 'react-icons/hi2';
import { toast } from '@/shared/ui/Toast/Toast';

export const NAV_ITEMS = [
  { icon: HiSquares2X2, label: 'Dashboard', path: '/dashboard-home' },
  { icon: HiCube, label: 'Job', path: '/job' },
  { icon: HiSquare3Stack3D, label: 'Vehicle Lists', path: '/vehicle-list' },
];

export const useSidebarNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logoutUser();
    toast.success('Logout Successful!');
    navigate('/login', { replace: true });
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const isActive = (path: string) => location.pathname === path;

  return { handleLogout, handleNavigate, isActive };
};

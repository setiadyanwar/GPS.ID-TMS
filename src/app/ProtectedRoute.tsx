import { Navigate } from 'react-router-dom';
import { useSessionStore } from '../shared/store/sessionStore';

/**
 * Guard untuk route yang membutuhkan autentikasi.
 * Jika user tidak memiliki token, redirect ke halaman /login.
 */
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = useSessionStore((state) => state.token);
  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

export default ProtectedRoute;

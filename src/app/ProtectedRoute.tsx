import { Navigate } from 'react-router-dom';
import { useSessionStore } from '../shared/store/sessionStore';

// Untuk menjaga halaman-halaman yang bersifat rahasia/pribadi, jika tidak login maka akan diarahkan ke login
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = useSessionStore((state) => state.token);
  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

export default ProtectedRoute;

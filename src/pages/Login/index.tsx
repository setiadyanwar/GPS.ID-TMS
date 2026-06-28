// Halaman utama login(Entry Point), merender layout dan background
import { Navigate } from 'react-router-dom';
import { useSessionStore } from '@/shared/store/sessionStore';
import LoginCard from './components/LoginCard';

const Login = () => {
  const token = useSessionStore((state) => state.token);

  // Jika sudah punya token, langsung redirect tanpa render komponen sama sekali (mencegah flicker)
  if (token) {
    return <Navigate to="/vehicle-list" replace />;
  }

  return <LoginCard />;
};

export default Login;

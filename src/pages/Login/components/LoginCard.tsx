// Komponen UI untuk kotak form login
import patternBg from '@/assets/illustrations/pattern.svg';
import { LoginForm } from './LoginForm';


const LoginCard = () => (
  <main className="flex min-h-screen w-full font-sans bg-primary items-center justify-center p-4 relative overflow-hidden">
    {/* Background Pattern */}
    <img
      src={patternBg}
      alt=""
      className="absolute inset-0 z-0 w-full h-full object-cover pointer-events-none"
    />

    <div className="w-full max-w-2xl relative z-10 px-4 sm:px-0">
      <div className="bg-white py-8 px-6 sm:p-12 rounded-2xl shadow-2xl mx-auto max-w-[560px]">
        <LoginForm />
      </div>
    </div>
  </main>
);

export default LoginCard;

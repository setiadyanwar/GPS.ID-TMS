// Komponen form input dan tombol submit
import { Input } from '@/shared/ui/Input';
import { Checkbox } from '@/shared/ui/Checkbox';
import { Alert } from '@/shared/ui/Alert';
import { useLoginContent } from '../hooks/useLoginContent';
import { LoginHeader } from './LoginHeader';
import { LoginActions } from './LoginActions';


export const LoginContent = () => {
  const {
    username,
    password,
    remember,
    isLoading,
    error,
    emailError,
    passwordError,
    setUsername,
    setPassword,
    setRemember,
    handleSubmit,
  } = useLoginContent();

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit} noValidate>
      <LoginHeader />

      {/* Global Error Alert (dari Server) */}
      {error && (
        <Alert message={error} type="error" />
      )}

      <Input
        id="login-username"
        type="text"
        label="Email or Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="esteban_schiller@gmail.com"
        autoComplete="username"
        error={emailError ?? undefined}
      />

      <Input
        id="login-password"
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
        autoComplete="current-password"
        error={passwordError ?? undefined}
        labelAction={
          <a
            href="#"
            className="text-sm font-bold text-slate-400 hover:text-primary hover:underline transition-colors"
          >
            Forget Password?
          </a>
        }
      />

      <Checkbox
        id="remember"
        label="Remember Password"
        checked={remember}
        onChange={(e) => setRemember(e.target.checked)}
      />

      <LoginActions isLoading={isLoading} />
    </form>
  );
};

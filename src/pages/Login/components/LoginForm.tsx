import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Checkbox } from '@/shared/ui/Checkbox';
import { useLoginForm } from '../hooks/useLoginForm';


export const LoginForm = () => {
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
  } = useLoginForm();

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit} noValidate>
      <div className="text-center mb-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2 leading-tight">
          Login to <span className="text-primary">GPS.ID TMS</span> Account
        </h2>
        <p className="text-lg sm:text-base text-slate-500 font-semibold sm:whitespace-nowrap">
          Please enter your email and password to continue
        </p>
      </div>

      {/* Global Error Alert (dari Server) */}
      {error && (
        <div
          className="flex items-start gap-3 bg-red-50/80 text-red-600 border border-red-100 rounded-lg px-4 py-3 text-sm font-semibold"
          role="alert"
        >
          <span className="leading-snug">{error}</span>
        </div>
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

      <div className="flex flex-col mt-3">
        <Button id="login-submit-btn" type="submit" size="lg" fullWidth isLoading={isLoading}>
          {isLoading ? 'Processing...' : 'Sign In'}
        </Button>

        <p className="text-sm text-slate-500 font-bold mt-5 text-center">
          Don't have an account?{' '}
          <a href="#" className="text-primary underline hover:text-primary-600 font-bold transition-colors">
            Create Account
          </a>
        </p>
      </div>
    </form>
  );
};

// Hook untuk handle state input dan error form
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { loginUser } from '../service/authService';

interface LoginFormState {
  username: string;
  password: string;
  remember: boolean;
  isLoading: boolean;
  error: string | null;
  emailError: string | null;
  passwordError: string | null;
}


export const useLoginForm = () => {
  const navigate = useNavigate();

  const [state, setState] = useState<LoginFormState>({
    username: '',
    password: '',
    remember: false,
    isLoading: false,
    error: null,
    emailError: null,
    passwordError: null,
  });

  const setField = <K extends keyof LoginFormState>(key: K, value: LoginFormState[K]) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const validate = (): boolean => {
    let isValid = true;
    let emailError: string | null = null;
    let passwordError: string | null = null;

    // Validasi Username / Email
    if (!state.username.trim()) {
      emailError = 'Email or Username is required';
      isValid = false;
    } else if (state.username.includes('@')) {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!emailRegex.test(state.username)) {
        emailError = 'Please enter a valid email address';
        isValid = false;
      }
    } else if (state.username.length < 3) {
      emailError = 'Username must be at least 3 characters';
      isValid = false;
    }

    // Validasi Password
    if (!state.password) {
      passwordError = 'Password is required';
      isValid = false;
    } else if (state.password.length < 6) {
      passwordError = 'Password must be at least 6 characters';
      isValid = false;
    }

    setState((prev) => ({ ...prev, emailError, passwordError, error: null }));
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      // Set bendera "Remember Me" agar Zustand tahu mau simpan di mana (Local vs Session)
      localStorage.setItem('gps-remember', state.remember ? 'true' : 'false');
      
      await loginUser({ username: state.username, password: state.password });
      toast.success('Login Successful!');
      navigate('/vehicle-list');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Terjadi kesalahan yang tidak diketahui.';
      setState((prev) => ({ ...prev, error: message }));
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  return {
    ...state,
    setUsername: (v: string) => setField('username', v),
    setPassword: (v: string) => setField('password', v),
    setRemember: (v: boolean) => setField('remember', v),
    handleSubmit,
  };
};

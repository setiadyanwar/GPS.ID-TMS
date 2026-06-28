import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { AuthUser } from '@/pages/Login/service/authService';

interface SessionState {
  token: string | null;
  user: AuthUser | null;
  setSession: (token: string, user: AuthUser) => void;
  clearSession: () => void;
}

// Custom storage: otomatis memilih localStorage atau sessionStorage 
// berdasarkan status "Remember Me" dari user.
const dynamicStorage = {
  getItem: (name: string) => {
    return localStorage.getItem(name) || sessionStorage.getItem(name);
  },
  setItem: (name: string, value: string) => {
    if (localStorage.getItem('gps-remember') === 'true') {
      localStorage.setItem(name, value);
      sessionStorage.removeItem(name); // Bersihkan sisa jika ada
    } else {
      sessionStorage.setItem(name, value);
      localStorage.removeItem(name); // Bersihkan sisa jika ada
    }
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name);
    sessionStorage.removeItem(name);
  },
};

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setSession: (token, user) => set({ token, user }),
      clearSession: () => set({ token: null, user: null }),
    }),
    {
      name: 'gps-session',
      storage: createJSONStorage(() => dynamicStorage),
    }
  )
);

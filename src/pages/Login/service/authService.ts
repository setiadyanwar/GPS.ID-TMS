import { postLogin } from '../api/authApi';
import type { LoginPayload } from '../api/authApi';
import { useSessionStore } from '@/shared/store/sessionStore';

export interface AuthUser {
  username: string;
  fullname: string;
  email: string;
  phone: string;
}

export const loginUser = async (payload: LoginPayload): Promise<void> => {
  try {
    const response = await postLogin(payload);

    if (!response.status || typeof response.message === 'string') {
      throw new Error(
        typeof response.message === 'string'
          ? response.message
          : 'Login Failed. Please check your username and password.'
      );
    }

    const { token, username, fullname, email, phone } = response.message.data;
    useSessionStore.getState().setSession(token, { username, fullname, email, phone });

  } catch (err: unknown) {
    // Jika Axios menerima response HTTP error (4xx/5xx), ambil pesan dari body server
    if (err && typeof err === 'object' && 'response' in err) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      const serverMsg = axiosErr.response?.data?.message;
      throw new Error(serverMsg ?? 'Username or password wrong. Please try again.');
    }
    // Jika bukan Axios error (misal: network down), teruskan error aslinya
    throw err;
  }
};

export const logoutUser = (): void => {
  useSessionStore.getState().clearSession();
};

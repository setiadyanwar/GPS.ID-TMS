// Konfigurasi request HTTP ke API GPS.ID
import { apiClient } from '@/shared/api';

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponseData {
  username: string;
  fullname: string;
  email: string;
  phone: string;
  token: string;
}

export interface LoginApiResponse {
  status: boolean;
  message: { data: LoginResponseData } | string;
}

const LOGIN_ENDPOINT = '/login';

export const postLogin = async (payload: LoginPayload): Promise<LoginApiResponse> => {
  const formData = new FormData();
  formData.append('username', payload.username);
  formData.append('password', payload.password);

  const response = await apiClient.post<LoginApiResponse>(LOGIN_ENDPOINT, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

// Komponen wrapper untuk notifikasi Toast (Adapter Pattern)
import { Toaster as SonnerToaster, toast as sonnerToast } from 'sonner';

/**
 * Toaster harus dipasang di root aplikasi (App.tsx)
 */
export const Toaster = () => {
  return <SonnerToaster position="top-center" richColors />;
};

export const toast = {
  success: (message: string) => sonnerToast.success(message),
  error: (message: string) => sonnerToast.error(message),
  info: (message: string) => sonnerToast.info(message),
  warning: (message: string) => sonnerToast.warning(message),
};

import { useSessionStore } from '@/shared/store/sessionStore';

export const useHeaderProfile = () => {
  const user = useSessionStore((state) => state.user);

  return {
    fullname: user?.fullname || 'User',
    username: user?.username || '',
  };
};

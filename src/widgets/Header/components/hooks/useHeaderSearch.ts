import { useSearchStore } from '@/shared/store/searchStore';

export const useHeaderSearch = () => {
  const query = useSearchStore((state) => state.query);
  const setQuery = useSearchStore((state) => state.setQuery);
  const clearQuery = useSearchStore((state) => state.clearQuery);

  return {
    query,
    setQuery,
    clearQuery,
  };
};

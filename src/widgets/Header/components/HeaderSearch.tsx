import { SearchBar } from '@/shared/ui/SearchBar/SearchBar';
import { useHeaderSearch } from './hooks/useHeaderSearch';

interface HeaderSearchProps {
  className?: string;
}

export const HeaderSearch = ({ className = '' }: HeaderSearchProps) => {
  const { query, setQuery, clearQuery } = useHeaderSearch();

  return (
    <SearchBar
      className={className}
      value={query}
      onChange={setQuery}
      onClear={clearQuery}
      placeholder="Search vehicles..."
    />
  );
};

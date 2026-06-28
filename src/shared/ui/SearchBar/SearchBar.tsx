import { Search, X } from 'lucide-react';
import { Input } from '../Input/Input';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar = ({ 
  value, 
  onChange, 
  onClear, 
  placeholder = '', 
  className = '' 
}: SearchBarProps) => {
  return (
    <Input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rounded="full"
      className={className}
      leftIcon={<Search size={18} />}
      rightIcon={
        value ? (
          <button
            onClick={onClear}
            className="text-slate-400 hover:text-slate-600 transition-colors flex items-center justify-center h-full w-full px-2"
          >
            <X size={16} />
          </button>
        ) : undefined
      }
    />
  );
};

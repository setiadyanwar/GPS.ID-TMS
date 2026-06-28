import { ChevronDown } from 'lucide-react';

interface LanguageSelectorProps {
  flagSrc: string;
  language: string;
  className?: string;
  onClick?: () => void;
}

export const LanguageSelector = ({ flagSrc, language, className = '', onClick }: LanguageSelectorProps) => {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity ${className}`}
    >
      <img src={flagSrc} alt={language} className="w-7 h-auto object-cover rounded-sm" />
      <span className="text-sm font-semibold text-slate-500">{language}</span>
      <ChevronDown size={14} className="text-slate-400" />
    </div>
  );
};

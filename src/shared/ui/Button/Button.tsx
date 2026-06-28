import { forwardRef, type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' | 'ghost-primary' | 'ghost-danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  justify?: 'center' | 'start' | 'between';
  fullWidth?: boolean;
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', size = 'md', justify = 'center', fullWidth = false, isLoading, className = '', disabled, ...props }, ref) => {
    const justifyClass = {
      center: 'justify-center',
      start: 'justify-start',
      between: 'justify-between'
    }[justify];

    const baseStyles = `rounded-lg font-bold transition-all flex items-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed ${justifyClass}`;
    
    const sizes = {
      sm: 'py-2 px-4 text-sm',
      md: 'py-2.5 px-5 text-[15px]',
      lg: 'py-3.5 px-6 text-base',
      icon: 'p-1.5' // For icon-only buttons
    };

    const variants = {
      primary: 'bg-primary hover:bg-primary-600 text-white shadow-sm',
      secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-800',
      outline: 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50',
      danger: 'bg-red-50 text-red-600 hover:bg-red-100',
      ghost: 'bg-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-800 font-semibold',
      'ghost-primary': 'bg-transparent text-primary font-bold',
      'ghost-danger': 'bg-transparent text-slate-500 hover:bg-red-50 hover:text-red-600 font-semibold',
    };

    const widthClass = fullWidth ? 'w-full' : '';

    return (
      <button 
        ref={ref}
        className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${widthClass} ${className}`.trim()}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <span className="w-4 h-4 border-[2px] border-current border-t-transparent rounded-full animate-spin" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

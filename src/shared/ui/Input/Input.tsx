import { useState } from 'react';
import { forwardRef, type ReactNode, type InputHTMLAttributes } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  labelAction?: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  rounded?: 'lg' | 'full';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, labelAction, leftIcon, rightIcon, rounded = 'lg', className = '', type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordType = type === 'password';

    // Mencegah user meng-copy/cut password yang disembunyikan
    const handleCopyCut = (e: React.ClipboardEvent) => {
      if (isPasswordType && !showPassword) {
        e.preventDefault();
      }
    };

    const roundedClass = rounded === 'full' ? 'rounded-full' : 'rounded-lg';
    const paddingLeft = leftIcon ? 'pl-10' : 'px-4';
    const paddingRight = isPasswordType || rightIcon ? 'pr-11' : 'px-4';

    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        {label && (
          <div className="flex justify-between items-center">
            <label htmlFor={props.id} className="text-sm font-bold text-slate-500">
              {label}
            </label>
            {labelAction}
          </div>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            type={isPasswordType ? (showPassword ? 'text' : 'password') : type}
            className={`w-full ${paddingLeft} ${paddingRight} py-3 bg-slate-50 border ${
              error 
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                : 'border-slate-200 focus:border-primary focus:ring-primary/20'
            } ${roundedClass} text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 transition-all font-medium`}
            onCopy={handleCopyCut}
            onCut={handleCopyCut}
            {...props}
          />
          {isPasswordType ? (
            <button
              type="button"
              tabIndex={-1}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          ) : rightIcon ? (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
              {rightIcon}
            </div>
          ) : null}
        </div>
        {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

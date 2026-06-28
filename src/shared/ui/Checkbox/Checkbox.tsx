import { forwardRef, type InputHTMLAttributes } from 'react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, id, className = '', checked, onChange, ...props }, ref) => {
    return (
      <label
        htmlFor={id}
        className={`inline-flex items-center gap-3 cursor-pointer select-none ${className}`}
      >
        <div className="relative flex items-center justify-center">
          <input
            ref={ref}
            id={id}
            type="checkbox"
            className="sr-only"
            checked={checked}
            onChange={onChange}
            {...props}
          />
          {/* Style Checkbox */}
          <div
            className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-colors ${
              checked
                ? 'bg-white border-slate-300'
                : 'bg-white border-slate-300'
            }`}
          >
            {checked && (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9ca3af"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </div>
        </div>
        {label && (
          <span className="text-sm font-semibold text-slate-400">{label}</span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';

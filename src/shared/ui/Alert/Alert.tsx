import React from 'react';

export interface AlertProps {
  message: string;
  type?: 'error' | 'success' | 'warning' | 'info';
  className?: string;
}

export const Alert = ({ message, type = 'error', className = '' }: AlertProps) => {
  const baseClasses = "flex items-start gap-3 rounded-lg px-4 py-3 text-sm font-semibold border";
  
  const typeClasses = {
    error: "bg-red-50/80 text-red-600 border-red-100",
    success: "bg-green-50/80 text-green-600 border-green-100",
    warning: "bg-yellow-50/80 text-yellow-600 border-yellow-100",
    info: "bg-blue-50/80 text-blue-600 border-blue-100",
  };

  return (
    <div
      className={`${baseClasses} ${typeClasses[type]} ${className}`}
      role="alert"
    >
      <span className="leading-snug">{message}</span>
    </div>
  );
};

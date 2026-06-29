export interface AlertProps {
  message: string;
  type?: 'error' | 'success' | 'warning' | 'info';
  className?: string;
}

export const Alert = ({ message, type = 'error', className = '' }: AlertProps) => {
  const baseClasses = "flex items-start gap-3 rounded-lg px-4 py-3 text-sm font-semibold border";
  
  const typeClasses = {
    error: "bg-danger-50/80 text-danger-600 border-danger-100",
    success: "bg-success-50/80 text-success-600 border-success-100",
    warning: "bg-yellow-50/80 text-yellow-600 border-yellow-100",
    info: "bg-primary-50/80 text-primary-600 border-primary-100",
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

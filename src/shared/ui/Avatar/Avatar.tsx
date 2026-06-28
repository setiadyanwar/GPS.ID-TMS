

import AvatarImg from '@/assets/images/avatar.png';

interface AvatarProps {
  name?: string;
  size?: 'sm' | 'md' | 'lg';
  src?: string;
  className?: string;
}

export const Avatar = ({ name, size = 'md', src, className = '' }: AvatarProps) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  return (
    <div 
      className={`rounded-full bg-slate-200 overflow-hidden shrink-0 border border-slate-200 shadow-sm ${sizes[size]} ${className}`}
    >
      <img 
        src={src || AvatarImg} 
        alt={name ? `${name} avatar` : 'Avatar'} 
        className="w-full h-full object-cover"
      />
    </div>
  );
};

import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  /** Ganti tag semantik HTML, default 'div' */
  as?: 'div' | 'article' | 'section' | 'li';
  /** Tambahkan efek hover shadow */
  hoverable?: boolean;
  /** Hapus padding default */
  noPadding?: boolean;
}

export const Card = ({
  children,
  as: Tag = 'div',
  hoverable = false,
  noPadding = false,
  className = '',
  ...props
}: CardProps) => {
  return (
    <Tag
      className={`bg-white rounded-xl border border-slate-200 shadow-sm ${
        hoverable ? 'hover:shadow-lg transition-all duration-300 cursor-pointer' : ''
      } ${noPadding ? '' : 'p-4'} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
};

/**
 * Skeleton.tsx
 *
 * Primitive reusable untuk loading placeholder.
 * Dipakai sebagai building block di komponen skeleton lain.
 *
 * Cara pakai:
 *   <Skeleton className="h-4 w-3/4 rounded-md" />
 */

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className = '' }: SkeletonProps) => (
  <div
    className={`relative overflow-hidden bg-slate-100 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent ${className}`}
  />
);

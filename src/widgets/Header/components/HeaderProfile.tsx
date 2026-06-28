import { ChevronDown } from 'lucide-react';
import AvatarImg from '@/assets/images/avatar.png';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { useHeaderProfile } from './hooks/useHeaderProfile';

export const HeaderProfile = () => {
  const { fullname, username } = useHeaderProfile();

  return (
    <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity pl-2">
      <Avatar
        name={fullname}
        src={AvatarImg}
        size="md"
      />

      {/* Text */}
      <div className="hidden sm:flex flex-col text-left mr-1">
        <span className="text-sm font-bold text-slate-700 leading-tight">
          {fullname}
        </span>
        <span className="text-xs font-medium text-slate-400">
          {username}
        </span>
      </div>

      {/* Circle Chevron */}
      <div className="hidden sm:flex items-center justify-center w-6 h-6 rounded-full border border-slate-200">
        <ChevronDown size={14} className="text-slate-400" />
      </div>
    </div>
  );
};

import FlagIcon from '@/assets/icons/flag.svg';
import { NotificationBadge } from '@/shared/ui/NotificationBadge/NotificationBadge';
import { LanguageSelector } from '@/shared/ui/LanguageSelector/LanguageSelector';

export const HeaderActions = () => {
  return (
    <div className="flex items-center gap-6">
      <NotificationBadge count={6} />
      <LanguageSelector flagSrc={FlagIcon} language="English" className="hidden sm:flex" />
    </div>
  );
};

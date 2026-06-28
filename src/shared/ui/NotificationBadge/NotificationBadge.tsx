import NotifIcon from '@/assets/icons/notif.svg';

interface NotificationBadgeProps {
  count?: number;
  icon?: string;
  onClick?: () => void;
}

export const NotificationBadge = ({ count = 0, icon = NotifIcon, onClick }: NotificationBadgeProps) => {
  return (
    <button 
      onClick={onClick}
      className="relative hover:opacity-80 transition-opacity flex items-center justify-center mt-1"
    >
      <img src={icon} alt="Notifications" className="w-6 h-6" />
      {count > 0 && (
        <span className="absolute -top-1.5 -right-1 flex items-center justify-center bg-danger text-white text-[10px] font-bold w-[18px] h-[18px] rounded-full ring-1 ring-danger/30 leading-none">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </button>
  );
};

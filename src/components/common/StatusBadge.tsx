import React from 'react';

export type StatusType = 'aktif' | 'sinirli' | 'bakimda' | 'baglanti_yok' | 'applied' | 'dismissed' | 'pending' | 'success' | 'warning' | 'danger' | 'info';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
  customLabel?: string;
  showDot?: boolean;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  customLabel,
  showDot = true,
  className = '',
}) => {
  const norm = status.toLowerCase();

  let label = customLabel || status;
  let bg = 'bg-[#EFF0EB]';
  let text = 'text-[#5D665E]';
  let border = 'border-[#DDE1DA]';
  let dot = 'bg-[#5D665E]';

  if (norm === 'aktif' || norm === 'success' || norm === 'yeterli' || norm === 'normal') {
    label = customLabel || 'Aktif';
    bg = 'bg-[#E5F0EA]';
    text = 'text-[#1F5A43]';
    border = 'border-[#1F5A43]/30';
    dot = 'bg-[#1F5A43]';
  } else if (norm === 'sinirli' || norm === 'warning' || norm === 'kısmi' || norm === 'düşük' || norm === 'orta') {
    label = customLabel || 'Sınırlı Mod';
    bg = 'bg-[#FFF7E6]';
    text = 'text-[#B7791F]';
    border = 'border-[#B7791F]/30';
    dot = 'bg-[#B7791F]';
  } else if (norm === 'bakimda' || norm === 'danger' || norm === 'kritik' || norm === 'kapalı') {
    label = customLabel || 'Bakımda';
    bg = 'bg-[#FCECEC]';
    text = 'text-[#B94040]';
    border = 'border-[#B94040]/30';
    dot = 'bg-[#B94040]';
  } else if (norm === 'baglanti_yok' || norm === 'çevrimdışı') {
    label = customLabel || 'Bağlantı Yok';
    bg = 'bg-[#EFF0EB]';
    text = 'text-[#5D665E]';
    border = 'border-[#CBD3C8]';
    dot = 'bg-[#8C968D]';
  } else if (norm === 'applied') {
    label = customLabel || 'Uygulandı';
    bg = 'bg-[#E5F0EA]';
    text = 'text-[#1F5A43]';
    border = 'border-[#1F5A43]/30';
    dot = 'bg-[#1F5A43]';
  } else if (norm === 'dismissed') {
    label = customLabel || 'Yoksayıldı';
    bg = 'bg-[#EFF0EB]';
    text = 'text-[#5D665E]';
    border = 'border-[#DDE1DA]';
    dot = 'bg-[#8C968D]';
  } else if (norm === 'pending') {
    label = customLabel || 'Bekliyor';
    bg = 'bg-[#FDF3D9]';
    text = 'text-[#925C08]';
    border = 'border-[#F3B33D]/40';
    dot = 'bg-[#F3B33D]';
  }

  const sizeClasses = size === 'sm' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-0.5 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${bg} ${text} ${border} ${sizeClasses} ${className}`}
    >
      {showDot && <span className={`w-1.5 h-1.5 rounded-full ${dot} shrink-0`} />}
      <span>{label}</span>
    </span>
  );
};

export default StatusBadge;

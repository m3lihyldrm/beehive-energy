import React from 'react';
import { AlertCircle, ShieldAlert } from 'lucide-react';

interface SimulationBannerProps {
  message?: string;
  subtext?: string;
  variant?: 'warning' | 'info' | 'forest';
  className?: string;
}

export const SimulationBanner: React.FC<SimulationBannerProps> = ({
  message = 'Simülasyon modu aktif. Bu panel fiziksel cihazlara komut göndermez.',
  subtext = 'Karar destek amaçlı dijital ikiz simülasyonudur; fiziksel sistem kontrolü yetkili mühendislik doğrulaması gerektirir.',
  variant = 'warning',
  className = '',
}) => {
  const styles = {
    warning: {
      bg: 'bg-[#FFF9EC] border-[#F3B33D]/40 text-[#925C08]',
      icon: <AlertCircle className="w-4 h-4 text-[#D59B2E] shrink-0 mt-0.5" />,
    },
    info: {
      bg: 'bg-[#EFF0EB] border-[#DDE1DA] text-[#5D665E]',
      icon: <ShieldAlert className="w-4 h-4 text-[#1F5A43] shrink-0 mt-0.5" />,
    },
    forest: {
      bg: 'bg-[#E5F0EA] border-[#1F5A43]/20 text-[#174634]',
      icon: <ShieldAlert className="w-4 h-4 text-[#1F5A43] shrink-0 mt-0.5" />,
    },
  };

  const current = styles[variant];

  return (
    <div
      role="alert"
      className={`border rounded-lg px-3.5 py-2.5 flex items-start gap-2.5 text-xs ${current.bg} ${className}`}
    >
      {current.icon}
      <div className="flex-1 leading-relaxed">
        <span className="font-semibold text-[#182019]">{message} </span>
        {subtext && <span className="text-[#5D665E] block sm:inline">{subtext}</span>}
      </div>
    </div>
  );
};

export default SimulationBanner;

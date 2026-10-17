import React from 'react';

interface BeeHiveLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
  subtext?: string;
}

export const BeeHiveLogo: React.FC<BeeHiveLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
  subtext = 'İkinci Yaşam Enerji'
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const titleSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
  };

  const subtextSizes = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-xs',
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Geometrik Yeşil Altıgen Petek + Bal Sarısı Enerji Vurgusu */}
      <div className={`${iconSizes[size]} relative flex items-center justify-center shrink-0`}>
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-2xs transition-transform group-hover:scale-105 duration-200"
        >
          {/* Dış Altıgen Petek Çerçevesi - Derin Orman Yeşili */}
          <polygon
            points="32,4 56,18 56,46 32,60 8,46 8,18"
            fill="#1F5A43"
            stroke="#174634"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* İç Geometrik Petek Çizgisi */}
          <polygon
            points="32,10 50,21 50,43 32,54 14,43 14,21"
            fill="#E5F0EA"
            fillOpacity="0.12"
            stroke="#E5F0EA"
            strokeWidth="1.2"
            strokeOpacity="0.35"
            strokeLinejoin="round"
          />
          {/* Bal Sarısı / Amber Enerji Çekirdeği */}
          <polygon
            points="32,18 42,24 42,40 32,46 22,40 22,24"
            fill="#F3B33D"
            stroke="#D59B2E"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          {/* Merkez Temiz Enerji Şimşek Kıvılcımı */}
          <path
            d="M34 23L27 34H33L30 43L39 31H33L36 23H34Z"
            fill="#FFFFFF"
            stroke="#D59B2E"
            strokeWidth="0.5"
            strokeLinejoin="round"
          />
          {/* Çevresel Mikro Enerji Parıltıları */}
          <circle cx="32" cy="14" r="1.4" fill="#FDF3D9" />
          <circle cx="46" cy="32" r="1.4" fill="#FDF3D9" />
          <circle cx="18" cy="32" r="1.4" fill="#FDF3D9" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-baseline leading-none">
            <span className={`${titleSizes[size]} font-bold tracking-tight text-[#182019]`}>
              BeeHive
            </span>
            <span className="text-[11px] font-semibold text-[#1F5A43] ml-1">Energy</span>
          </div>
          {subtext && (
            <span className={`${subtextSizes[size]} text-[#5D665E] font-medium leading-none mt-1`}>
              {subtext}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default BeeHiveLogo;

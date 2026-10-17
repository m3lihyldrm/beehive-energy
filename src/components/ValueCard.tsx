import React from 'react';

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  tag?: string;
  className?: string;
}

export const ValueCard: React.FC<ValueCardProps> = ({
  icon,
  title,
  description,
  tag,
  className = '',
}) => {
  return (
    <div
      className={`bg-white border border-[#DDE1DA] rounded-xl p-6 shadow-subtle hover:shadow-elevated hover:border-[#1F5A43]/40 transition-all duration-200 flex flex-col justify-between group ${className}`}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-xl bg-[#E5F0EA] border border-[#1F5A43]/20 flex items-center justify-center text-[#1F5A43] group-hover:scale-105 transition-transform">
            {icon}
          </div>
          {tag && (
            <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-[#FDF3D9] text-[#925C08] border border-[#F3B33D]/30">
              {tag}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <h3 className="text-base sm:text-lg font-bold text-[#182019] tracking-tight">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-[#5D665E] leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      <div className="pt-4 mt-2 border-t border-[#EFF0EB] flex items-center text-xs font-semibold text-[#1F5A43] group-hover:translate-x-0.5 transition-transform">
        <span>Teknik Standart</span>
        <span className="ml-1">→</span>
      </div>
    </div>
  );
};

export default ValueCard;

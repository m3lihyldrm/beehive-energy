import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  subtext?: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  highlight?: boolean;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  subtext,
  icon,
  badge,
  highlight = false,
  className = '',
}) => {
  return (
    <div
      className={`bg-white border rounded-xl p-4 sm:p-5 shadow-subtle flex flex-col justify-between transition-all duration-200 ${
        highlight
          ? 'border-[#1F5A43]/40 ring-1 ring-[#1F5A43]/20 bg-linear-to-b from-white to-[#F6F9F7]'
          : 'border-[#DDE1DA] hover:border-[#CBD3C8]'
      } ${className}`}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-xs font-medium text-[#5D665E] tracking-tight">{title}</span>
        {icon && (
          <div className="w-8 h-8 rounded-lg bg-[#F6F6F2] border border-[#DDE1DA] flex items-center justify-center text-[#1F5A43] shrink-0">
            {icon}
          </div>
        )}
      </div>

      <div className="space-y-1">
        <div className="flex items-baseline gap-1.5">
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#182019] tabular-nums">
            {value}
          </span>
          {unit && <span className="text-xs font-semibold text-[#5D665E]">{unit}</span>}
        </div>

        {subtext && <p className="text-[11px] text-[#5D665E] leading-normal">{subtext}</p>}
        {badge && <div className="pt-1">{badge}</div>}
      </div>
    </div>
  );
};

export default MetricCard;

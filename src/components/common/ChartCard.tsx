import React from 'react';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  subtitle,
  badge,
  actions,
  children,
  footer,
  className = '',
}) => {
  return (
    <div className={`bg-white border border-[#DDE1DA] rounded-xl p-4 sm:p-5 shadow-subtle flex flex-col justify-between ${className}`}>
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm sm:text-base font-bold text-[#182019]">{title}</h3>
            {badge}
          </div>
          {subtitle && <p className="text-xs text-[#5D665E] mt-0.5">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>

      {/* Chart Canvas Area */}
      <div className="w-full flex-1 min-h-[220px]">
        {children}
      </div>

      {/* Optional Footer */}
      {footer && (
        <div className="mt-4 pt-3 border-t border-[#EFF0EB] text-[11px] text-[#5D665E]">
          {footer}
        </div>
      )}
    </div>
  );
};

export default ChartCard;

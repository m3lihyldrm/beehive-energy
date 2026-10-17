import React from 'react';
import { Calendar } from 'lucide-react';

export interface DateRange {
  startDate: string;
  endDate: string;
  preset?: string;
}

interface DateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
  className?: string;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  value,
  onChange,
  className = '',
}) => {
  const today = new Date().toISOString().split('T')[0];

  const getPastDate = (days: number) => {
    const d = new Date();
    d.setDate(d.getDate() - days);
    return d.toISOString().split('T')[0];
  };

  const presets = [
    { label: 'Bugün', preset: 'today', start: today, end: today },
    { label: 'Son 7 Gün', preset: '7d', start: getPastDate(7), end: today },
    { label: 'Son 30 Gün', preset: '30d', start: getPastDate(30), end: today },
    { label: 'Bu Yıl', preset: 'year', start: `${new Date().getFullYear()}-01-01`, end: today },
  ];

  const handlePreset = (p: typeof presets[0]) => {
    onChange({
      startDate: p.start,
      endDate: p.end,
      preset: p.preset,
    });
  };

  return (
    <div className={`flex flex-wrap items-center gap-2 text-xs ${className}`}>
      {/* Preset Buttons */}
      <div className="flex items-center gap-1 bg-[#F6F6F2] p-1 rounded-lg border border-[#DDE1DA]">
        {presets.map((p) => {
          const isActive = value.preset === p.preset;
          return (
            <button
              key={p.preset}
              type="button"
              onClick={() => handlePreset(p)}
              className={`px-2.5 py-1 rounded text-xs font-medium transition ${
                isActive
                  ? 'bg-white text-[#1F5A43] font-bold shadow-2xs border border-[#DDE1DA]'
                  : 'text-[#5D665E] hover:text-[#182019]'
              }`}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      {/* Manual Date Inputs */}
      <div className="flex items-center gap-1.5 bg-white border border-[#DDE1DA] rounded-lg px-2.5 py-1">
        <Calendar className="w-3.5 h-3.5 text-[#5D665E]" />
        <input
          type="date"
          value={value.startDate}
          onChange={(e) =>
            onChange({ ...value, startDate: e.target.value, preset: 'custom' })
          }
          className="text-xs text-[#182019] bg-transparent focus:outline-none cursor-pointer"
        />
        <span className="text-[#5D665E]">—</span>
        <input
          type="date"
          value={value.endDate}
          onChange={(e) =>
            onChange({ ...value, endDate: e.target.value, preset: 'custom' })
          }
          className="text-xs text-[#182019] bg-transparent focus:outline-none cursor-pointer"
        />
      </div>
    </div>
  );
};

export default DateRangePicker;

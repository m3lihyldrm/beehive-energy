import React, { useState, useRef, useEffect } from 'react';
import { Download, FileSpreadsheet, FileCode, Printer, ChevronDown } from 'lucide-react';

interface ExportButtonProps {
  data: any[];
  filename?: string;
  title?: string;
  onPrint?: () => void;
  className?: string;
}

export const ExportButton: React.FC<ExportButtonProps> = ({
  data,
  filename = 'beehive-rapor',
  title = 'Dışa Aktar',
  onPrint,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const exportCSV = () => {
    if (!data || data.length === 0) return;
    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(','),
      ...data.map((row) =>
        headers
          .map((fieldName) => {
            const val = row[fieldName];
            const strVal = typeof val === 'object' ? JSON.stringify(val) : String(val ?? '');
            return `"${strVal.replace(/"/g, '""')}"`;
          })
          .join(',')
      ),
    ];
    const blob = new Blob([csvRows.join('\r\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${filename}-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsOpen(false);
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${filename}-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsOpen(false);
  };

  const handlePrint = () => {
    setIsOpen(false);
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-1.5 rounded-lg border border-[#DDE1DA] bg-white hover:bg-[#F6F6F2] text-[#182019] text-xs font-medium flex items-center gap-1.5 shadow-2xs transition"
      >
        <Download className="w-3.5 h-3.5 text-[#1F5A43]" />
        <span>{title}</span>
        <ChevronDown className="w-3 h-3 text-[#5D665E]" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-44 rounded-xl bg-white border border-[#DDE1DA] shadow-elevated py-1 z-50 text-xs">
          <button
            onClick={exportCSV}
            className="w-full text-left px-3 py-2 hover:bg-[#F6F6F2] text-[#182019] flex items-center gap-2 transition"
          >
            <FileSpreadsheet className="w-4 h-4 text-[#1F5A43]" />
            <span>CSV Olarak İndir</span>
          </button>
          <button
            onClick={exportJSON}
            className="w-full text-left px-3 py-2 hover:bg-[#F6F6F2] text-[#182019] flex items-center gap-2 transition"
          >
            <FileCode className="w-4 h-4 text-[#416D86]" />
            <span>JSON Olarak İndir</span>
          </button>
          <button
            onClick={handlePrint}
            className="w-full text-left px-3 py-2 hover:bg-[#F6F6F2] text-[#182019] flex items-center gap-2 transition border-t border-[#EFF0EB]"
          >
            <Printer className="w-4 h-4 text-[#5D665E]" />
            <span>Yazdır / PDF Raporu</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ExportButton;

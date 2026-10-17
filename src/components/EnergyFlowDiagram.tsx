import React from 'react';
import {
  Sun,
  Cpu,
  Layers,
  BatteryCharging,
  Zap,
  Smartphone,
  Radio,
  MapPin,
  ShieldCheck,
  ArrowRight,
  Info
} from 'lucide-react';

interface EnergyFlowDiagramProps {
  className?: string;
  isHighlighted?: boolean;
}

export const EnergyFlowDiagram: React.FC<EnergyFlowDiagramProps> = ({
  className = '',
  isHighlighted = false,
}) => {
  const steps = [
    {
      num: '01',
      title: 'Güneş Paneli',
      subtitle: 'Monokristal Çatı PV (5.4 kWp)',
      icon: <Sun className="w-5 h-5 text-[#D59B2E]" />,
      color: 'border-[#F3B33D]/40 bg-[#FFFDF7]',
      badge: 'Girdi',
    },
    {
      num: '02',
      title: 'MPPT Ünitesi',
      subtitle: 'Akıllı Güç Takibi (%98 Verim)',
      icon: <Cpu className="w-5 h-5 text-[#1F5A43]" />,
      color: 'border-[#1F5A43]/30 bg-white',
      badge: 'Dönüşüm',
    },
    {
      num: '03',
      title: 'DC Bara',
      subtitle: '48V Stabil Dağıtım Hattı',
      icon: <Layers className="w-5 h-5 text-[#416D86]" />,
      color: 'border-[#416D86]/30 bg-white',
      badge: 'Dağıtım',
    },
    {
      num: '04',
      title: '2. Yaşam Batarya',
      subtitle: 'BMS Korumalı Güvenli Kabin (EI60)',
      icon: <BatteryCharging className="w-5 h-5 text-[#1F5A43]" />,
      color: 'border-[#1F5A43] bg-[#E5F0EA]/40 ring-2 ring-[#1F5A43]/20',
      badge: 'Depolama',
      highlight: true,
    },
    {
      num: '05',
      title: 'İnverter / DC',
      subtitle: '220V AC & 5V/12V DC Dağıtım',
      icon: <Zap className="w-5 h-5 text-[#B7791F]" />,
      color: 'border-[#B7791F]/30 bg-white',
      badge: 'Yönetim',
    },
    {
      num: '06',
      title: 'Kamusal Hizmetler',
      subtitle: 'LED, USB-C, Qi, Ekran, HVAC',
      icon: <Smartphone className="w-5 h-5 text-[#1F5A43]" />,
      color: 'border-[#1F5A43]/30 bg-white',
      badge: 'Tüketim',
    },
    {
      num: '07',
      title: 'Telemetri & IoT',
      subtitle: 'LoRaWAN / 4G Uç Nokta',
      icon: <Radio className="w-5 h-5 text-[#416D86]" />,
      color: 'border-[#416D86]/30 bg-white',
      badge: 'İletişim',
    },
    {
      num: '08',
      title: 'Halk Haritası',
      subtitle: 'Sade Servis & Durum Ekranı',
      icon: <MapPin className="w-5 h-5 text-[#1F5A43]" />,
      color: 'border-[#1F5A43]/30 bg-white',
      badge: 'Vatandaş',
    },
    {
      num: '09',
      title: 'İşletme Yönetim Paneli',
      subtitle: 'Operasyon & Karar Destek',
      icon: <ShieldCheck className="w-5 h-5 text-[#182019]" />,
      color: 'border-[#182019]/30 bg-[#F6F6F2]',
      badge: 'İşletmeci',
    },
  ];

  return (
    <div
      className={`bg-white border rounded-2xl p-6 sm:p-8 shadow-subtle border-[#DDE1DA] ${className}`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1F5A43]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1F5A43]">
              Sistem Mimarisi
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-[#182019] mt-1">
            BeeHive Uçtan Uca Enerji ve Veri Akışı
          </h3>
          <p className="text-xs text-[#5D665E] mt-1">
            Güneş üretiminden batarya depolamaya, kamu hizmetinden telemetri ve yönetici paneline kesintisiz döngü.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#EFF0EB] border border-[#DDE1DA] text-[11px] text-[#5D665E]">
          <Info className="w-3.5 h-3.5 text-[#1F5A43] shrink-0" />
          <span>Demo / Simülasyon Akışı</span>
        </div>
      </div>

      {/* Grid of Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 relative">
        {steps.map((st, idx) => (
          <div
            key={st.num}
            className={`border rounded-xl p-4 flex items-start gap-3 relative transition-all duration-200 hover:shadow-subtle ${st.color}`}
          >
            <div className="w-10 h-10 rounded-lg bg-white border border-[#DDE1DA] flex items-center justify-center shrink-0 shadow-2xs">
              {st.icon}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1 mb-0.5">
                <span className="text-[10px] font-mono font-bold text-[#5D665E]">
                  ADIM {st.num}
                </span>
                <span className="text-[9px] font-medium px-1.5 py-0.2 rounded bg-[#EFF0EB] text-[#5D665E]">
                  {st.badge}
                </span>
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-[#182019] truncate">
                {st.title}
              </h4>
              <p className="text-[11px] text-[#5D665E] leading-snug mt-0.5">
                {st.subtitle}
              </p>
            </div>

            {idx < steps.length - 1 && (
              <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-[#CBD3C8]">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Alt Güvenlik Notu (Zorunlu kural) */}
      <div className="mt-6 pt-4 border-t border-[#EFF0EB] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#5D665E]">
        <div className="flex items-center gap-2 font-medium text-[#182019]">
          <ShieldCheck className="w-4 h-4 text-[#1F5A43] shrink-0" />
          <span>BMS güvenlik sınırları, enerji planlama önerilerinden bağımsız çalışır.</span>
        </div>
        <div className="text-[11px] text-[#5D665E]">
          Otomatik yangın izolasyonu (EI60) ve aşırı şarj/deşarj koruması donanımsal önceliğe sahiptir.
        </div>
      </div>
    </div>
  );
};

export default EnergyFlowDiagram;

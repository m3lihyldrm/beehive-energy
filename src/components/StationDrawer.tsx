import React, { useEffect } from 'react';
import {
  X,
  Zap,
  Clock,
  Lock,
  ExternalLink,
  MessageSquare,
  Navigation,
  CheckCircle2,
  AlertCircle,
  Sun,
  ShieldCheck,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import { PublicStation, StationStatus } from '../types';

interface StationDrawerProps {
  station: PublicStation | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenFeedback: (station: PublicStation) => void;
}

export const getStatusBadge = (status: StationStatus) => {
  switch (status) {
    case 'aktif':
      return {
        label: 'Hizmet Aktif',
        bg: 'bg-[#E5F0EA] text-[#1F5A43] border-[#1F5A43]/30',
        dot: 'bg-[#1F5A43]',
      };
    case 'sinirli':
      return {
        label: 'Sınırlı Mod',
        bg: 'bg-[#FFF7E6] text-[#B7791F] border-[#B7791F]/30',
        dot: 'bg-[#B7791F]',
      };
    case 'bakimda':
      return {
        label: 'Bakımda',
        bg: 'bg-[#FCECEC] text-[#B94040] border-[#B94040]/30',
        dot: 'bg-[#B94040]',
      };
    case 'baglanti_yok':
      return {
        label: 'Bağlantı Yok',
        bg: 'bg-[#EFF0EB] text-[#5D665E] border-[#DDE1DA]',
        dot: 'bg-[#5D665E]',
      };
  }
};

export const StationDrawer: React.FC<StationDrawerProps> = ({
  station,
  isOpen,
  onClose,
  onOpenFeedback,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !station) return null;

  const statusBadge = getStatusBadge(station.status);
  const [lat, lng] = station.coordinates;
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return (
        date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }) +
        ', ' +
        date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })
      );
    } catch {
      return isoString;
    }
  };

  // 7 Günlük Üretim - Tüketim Simülasyon Verisi (kWh)
  const last7DaysData = [
    { day: 'Pzt', solar: 6.8, consumption: 3.2 },
    { day: 'Sal', solar: 7.4, consumption: 3.5 },
    { day: 'Çar', solar: 5.9, consumption: 3.1 },
    { day: 'Per', solar: 8.1, consumption: 3.8 },
    { day: 'Cum', solar: 7.6, consumption: 3.6 },
    { day: 'Cmt', solar: 6.2, consumption: 2.9 },
    { day: 'Paz', solar: 7.9, consumption: 3.4 },
  ];

  return (
    <>
      {/* Karartma arka plan */}
      <div
        className="fixed inset-0 bg-[#182019]/40 backdrop-blur-2xs z-40 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Mobilde TAM EKRAN (w-full inset-0), masaüstünde sağdan açılan şık panel */}
      <aside
        aria-label="Durak Detayları"
        className="fixed inset-0 sm:inset-y-0 sm:right-0 sm:left-auto w-full sm:max-w-[440px] bg-white shadow-elevated z-50 flex flex-col border-l border-[#DDE1DA] text-[#182019] transition-transform duration-200 ease-out overflow-hidden"
      >
        {/* Üst Başlık Barı */}
        <div className="p-4 sm:p-5 border-b border-[#DDE1DA] flex items-start justify-between bg-[#F6F6F2]">
          <div className="space-y-1.5 pr-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusBadge.bg}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${statusBadge.dot}`} />
                {statusBadge.label}
              </span>
              <span className="text-[11px] font-mono text-[#5D665E] bg-white px-2 py-0.5 rounded border border-[#DDE1DA]">
                {station.stationId}
              </span>
            </div>

            <h2 className="text-base sm:text-lg font-bold text-[#182019] leading-snug">
              {station.name}
            </h2>

            <div className="flex items-center gap-1.5 text-xs text-[#5D665E]">
              <Clock className="w-3.5 h-3.5 text-[#5D665E]" />
              <span>Son güncelleme: {formatTime(station.lastUpdated)}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#5D665E] hover:text-[#182019] hover:bg-white rounded-lg transition-colors border border-transparent hover:border-[#DDE1DA]"
            aria-label="Detay panelini kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Kaydırılabilir İçerik Alanı */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
          {/* Varsa Bakım Notu */}
          {station.maintenanceMessage && (
            <div className="p-3.5 rounded-xl bg-[#FFF7E6] border border-[#B7791F]/30 text-xs text-[#B7791F] flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block">Bakım Notu:</span>
                <span className="text-[#182019]">{station.maintenanceMessage}</span>
              </div>
            </div>
          )}

          {/* Varsa Kullanıcıya Mesafe */}
          {station.distanceKm !== undefined && (
            <div className="p-3 bg-[#E5F0EA] rounded-xl border border-[#1F5A43]/20 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-[#174634]">
                <Navigation className="w-4 h-4 text-[#1F5A43]" />
                <span>
                  Konumunuza <strong className="font-bold">{station.distanceKm} km</strong> mesafede (~
                  {station.walkingMinutes} dk yürüme)
                </span>
              </div>
            </div>
          )}

          {/* 1. HİZMET OLANAKLARI */}
          <div className="space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#5D665E] block pb-1 border-b border-[#DDE1DA]">
              Hizmet Olanakları
            </span>

            <div className="divide-y divide-[#DDE1DA] border border-[#DDE1DA] rounded-xl bg-[#F6F6F2] text-xs">
              {/* Hizmet Durumu */}
              <div className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#5D665E]">
                  <CheckCircle2 className="w-4 h-4 text-[#1F5A43]" />
                  <span>Hizmet Durumu</span>
                </div>
                <span className="font-semibold text-[#182019]">{statusBadge.label}</span>
              </div>

              {/* Şarj Kullanılabilir (USB-C & 220V & Qi) */}
              <div className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#5D665E]">
                  <Zap className="w-4 h-4 text-[#1F5A43]" />
                  <span>Şarj Noktaları</span>
                </div>
                <div className="text-right font-medium text-[#182019]">
                  <span>{station.usbCPorts}x USB-C</span>
                  <span className="text-[#5D665E] mx-1">·</span>
                  <span>{station.powerOutlets}x 220V</span>
                  {station.wirelessCharging && (
                    <>
                      <span className="text-[#5D665E] mx-1">·</span>
                      <span className="text-[#1F5A43]">Qi Kablosuz</span>
                    </>
                  )}
                </div>
              </div>

              {/* İklimlendirme */}
              <div className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#5D665E]">
                  <Sun className="w-4 h-4 text-[#416D86]" />
                  <span>İklimlendirme</span>
                </div>
                <span className="font-medium text-[#182019] truncate max-w-[200px]" title={station.hvacStatus}>
                  {station.hvacStatus}
                </span>
              </div>

              {/* Erişilebilirlik */}
              <div className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#5D665E]">
                  <CheckCircle2 className="w-4 h-4 text-[#1F5A43]" />
                  <span>Erişilebilirlik</span>
                </div>
                <span className="font-medium text-[#182019] truncate max-w-[200px]" title={station.accessibility}>
                  {station.accessibility.split('(')[0].trim() || 'Tam Uyumlu'}
                </span>
              </div>
            </div>
          </div>

          {/* 2. BUGÜNÜN ENERJİ ÖZETİ (Demo / Simülasyon Etiketli) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-1 border-b border-[#DDE1DA]">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#5D665E]">
                Bugünün Enerji Özeti
              </span>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-[#FDF3D9] text-[#925C08] border border-[#F3B33D]/30">
                Demo / simülasyon verisi
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-white border border-[#DDE1DA] shadow-2xs">
                <span className="text-[11px] text-[#5D665E] block">Temiz Enerji Oranı</span>
                <span className="text-xl font-bold text-[#1F5A43] tabular-nums mt-0.5 block">
                  %{station.dailyCleanEnergyRatio}
                </span>
                <span className="text-[10px] text-[#5D665E]">Güneş + Batarya Payı</span>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#DDE1DA] shadow-2xs">
                <span className="text-[11px] text-[#5D665E] block">Anlık Güneş Üretimi</span>
                <span className="text-xl font-bold text-[#D59B2E] tabular-nums mt-0.5 block">
                  {station.solarProductionKw} kW
                </span>
                <span className="text-[10px] text-[#5D665E]">Monokristal Çatı PV</span>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#DDE1DA] shadow-2xs">
                <span className="text-[11px] text-[#5D665E] block">İç Ortam Sıcaklığı</span>
                <span className="text-base font-bold text-[#182019] tabular-nums mt-0.5 block">
                  {station.indoorTemperature} °C
                </span>
                <span className="text-[10px] text-[#5D665E]">Bağıl nem: %{station.indoorHumidity}</span>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#DDE1DA] shadow-2xs">
                <span className="text-[11px] text-[#5D665E] block">Hava Kalitesi</span>
                <span className="text-sm font-bold text-[#1F5A43] mt-1 block truncate">
                  {station.airQuality.split('(')[0].trim() || 'İyi'}
                </span>
                <span className="text-[10px] text-[#5D665E]">Filtrelenmiş iç hava</span>
              </div>
            </div>
          </div>

          {/* 3. 7 GÜNLÜK ÜRETİM - TÜKETİM MİNİ GRAFİĞİ */}
          <div className="bg-white border border-[#DDE1DA] rounded-xl p-4 shadow-subtle space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#182019]">
                <BarChart3 className="w-4 h-4 text-[#1F5A43]" />
                <span>7 Günlük Enerji Trendi</span>
              </div>
              <span className="text-[10px] text-[#5D665E]">Günlük Üretim vs Tüketim (kWh)</span>
            </div>

            {/* Basit ve Hızlı SVG Mini Bar Grafiği */}
            <div className="pt-2">
              <div className="flex items-end justify-between gap-2 h-24 px-1">
                {last7DaysData.map((d) => {
                  const maxVal = 10;
                  const solarH = Math.round((d.solar / maxVal) * 80);
                  const consH = Math.round((d.consumption / maxVal) * 80);

                  return (
                    <div key={d.day} className="flex-1 flex flex-col items-center gap-1 group">
                      <div className="w-full flex items-end justify-center gap-1 h-20">
                        {/* Güneş Üretimi (Yeşil) */}
                        <div
                          style={{ height: `${solarH}%` }}
                          title={`${d.day}: ${d.solar} kWh Güneş`}
                          className="w-2 sm:w-2.5 bg-[#1F5A43] rounded-t-xs transition-all group-hover:bg-[#174634]"
                        />
                        {/* Tüketim (Sarı/Amber) */}
                        <div
                          style={{ height: `${consH}%` }}
                          title={`${d.day}: ${d.consumption} kWh Tüketim`}
                          className="w-2 sm:w-2.5 bg-[#F3B33D] rounded-t-xs transition-all group-hover:bg-[#D59B2E]"
                        />
                      </div>
                      <span className="text-[10px] font-medium text-[#5D665E]">{d.day}</span>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-center gap-4 pt-3 border-t border-[#EFF0EB] text-[10px] text-[#5D665E]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#1F5A43]" />
                  <span>Güneş Üretimi</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#F3B33D]" />
                  <span>Durak Tüketimi</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4. GÜVENLİ ENERJİ KABİNİ KARTI (Belirgin ve Güven Veren) */}
          <div className="p-4 rounded-xl bg-[#E5F0EA] border border-[#1F5A43]/30 space-y-2.5 text-xs shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold text-[#1F5A43]">
                <Lock className="w-4 h-4 text-[#1F5A43]" />
                <span>Güvenli Enerji Kabini</span>
              </div>
              <span className="text-[10px] font-semibold px-2 py-0.5 bg-white text-[#1F5A43] rounded-full border border-[#1F5A43]/30">
                EI60 yangın dayanımı
              </span>
            </div>

            <p className="text-[#174634] font-medium leading-relaxed">
              Batarya oturma alanında değil; ayrı güvenli enerji kabininde korunur.
            </p>

            <div className="text-[11px] text-[#174634]/80 space-y-1 pt-1 border-t border-[#1F5A43]/20">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1F5A43] shrink-0" />
                <span>Durağın yanında/arkasında, kilitli ve zorlamalı havalandırmalı kabin.</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1F5A43] shrink-0" />
                <span>Çok katmanlı BMS sıcaklık, aşırı akım ve yangın koruma sensörleri.</span>
              </div>
            </div>
          </div>
        </div>

        {/* ALT AKSİYON BUTONLARI: YOL TARİFİ VE SORUN BİLDİR */}
        <div className="p-4 sm:p-5 border-t border-[#DDE1DA] bg-[#F6F6F2] space-y-2">
          {/* Birincil Buton: Yol Tarifi Al */}
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${station.name} için Google Haritalar'da yol tarifi al`}
            className="w-full min-h-[44px] py-3 px-4 bg-[#1F5A43] hover:bg-[#174634] text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-2 shadow-subtle focus:ring-2 focus:ring-offset-2 focus:ring-[#1F5A43] focus:outline-none"
          >
            <Navigation className="w-4 h-4" />
            <span>Yol tarifi al</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-75" />
          </a>

          {/* İkincil Buton: Sorun Bildir */}
          <button
            onClick={() => onOpenFeedback(station)}
            aria-label={`${station.name} durağı için sorun veya arıza bildir`}
            className="w-full min-h-[44px] py-2.5 px-4 bg-white hover:bg-[#EFF0EB] text-[#182019] border border-[#DDE1DA] font-medium text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-[#1F5A43] focus:outline-none"
          >
            <MessageSquare className="w-4 h-4 text-[#5D665E]" />
            <span>Sorun bildir</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default StationDrawer;

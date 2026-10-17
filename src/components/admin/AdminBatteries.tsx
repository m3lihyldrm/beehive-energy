import React, { useState } from 'react';
import {
  Battery,
  AlertTriangle,
  ShieldAlert,
  Zap,
  Thermometer,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  PowerOff,
  BarChart2,
  Clock,
  Layers,
  Activity,
  Sliders,
  Info
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { AdminStation } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { BaseModal } from '../common/BaseModal';

interface AdminBatteriesProps {
  stations: AdminStation[];
  onIsolateBattery: (station: AdminStation) => void;
}

export const AdminBatteries: React.FC<AdminBatteriesProps> = ({ stations, onIsolateBattery }) => {
  const [isolationTarget, setIsolationTarget] = useState<AdminStation | null>(null);
  const [activeChartTab, setActiveChartTab] = useState<'soc' | 'temp' | 'imbalance' | 'cycles'>('soc');
  const [selectedModule, setSelectedModule] = useState<AdminStation | null>(null);

  // Hücre voltaj dengesizliği hesaplama (mV cinsinden)
  const getCellImbalanceMv = (station: AdminStation) => {
    if (station.status === 'bakimda') return 48;
    if (station.status === 'sinirli') return 32;
    return 14;
  };

  // Hücre voltaj simülasyonu
  const getCellVoltages = (station: AdminStation) => {
    const baseV = parseFloat((station.adminOnly?.currentVoltageV ? station.adminOnly.currentVoltageV / 16 : 3.32).toFixed(3));
    const delta = getCellImbalanceMv(station) / 1000;
    return [
      (baseV + delta * 0.4).toFixed(3),
      (baseV - delta * 0.3).toFixed(3),
      (baseV + delta * 0.1).toFixed(3),
      (baseV - delta * 0.5).toFixed(3),
    ];
  };

  // SOC Zaman Serisi Verisi (Simülasyon)
  const socTimeSeriesData = [
    { time: '00:00', Kampus: 74, Alaaddin: 72, Selcuklu: 55, Karatay: 88, Meram: 18, Kilicarslan: 70 },
    { time: '04:00', Kampus: 69, Alaaddin: 68, Selcuklu: 48, Karatay: 82, Meram: 18, Kilicarslan: 66 },
    { time: '08:00', Kampus: 78, Alaaddin: 75, Selcuklu: 42, Karatay: 89, Meram: 18, Kilicarslan: 71 },
    { time: '12:00', Kampus: 95, Alaaddin: 88, Selcuklu: 58, Karatay: 98, Meram: 18, Kilicarslan: 85 },
    { time: '16:00', Kampus: 92, Alaaddin: 82, Selcuklu: 45, Karatay: 94, Meram: 18, Kilicarslan: 78 },
    { time: '20:00', Kampus: 84, Alaaddin: 78, Selcuklu: 39, Karatay: 91, Meram: 18, Kilicarslan: 72 },
  ];

  // Sıcaklık Zaman Serisi Verisi (Simülasyon)
  const tempTimeSeriesData = [
    { time: '00:00', Kampus: 20.2, Alaaddin: 21.0, Selcuklu: 23.4, Karatay: 19.8, Meram: 18.5, Kilicarslan: 21.2 },
    { time: '04:00', Kampus: 19.5, Alaaddin: 20.1, Selcuklu: 22.8, Karatay: 19.1, Meram: 18.2, Kilicarslan: 20.5 },
    { time: '08:00', Kampus: 21.4, Alaaddin: 22.5, Selcuklu: 25.1, Karatay: 20.6, Meram: 19.0, Kilicarslan: 22.0 },
    { time: '12:00', Kampus: 23.8, Alaaddin: 24.8, Selcuklu: 27.5, Karatay: 22.4, Meram: 20.2, Kilicarslan: 23.7 },
    { time: '16:00', Kampus: 23.1, Alaaddin: 24.2, Selcuklu: 26.8, Karatay: 22.0, Meram: 20.0, Kilicarslan: 23.2 },
    { time: '20:00', Kampus: 22.4, Alaaddin: 23.4, Selcuklu: 25.5, Karatay: 21.5, Meram: 19.6, Kilicarslan: 22.6 },
  ];

  // Hücre Voltaj Dengesizliği Serisi (mV)
  const imbalanceSeriesData = [
    { time: '00:00', Kampus: 12, Alaaddin: 14, Selcuklu: 28, Karatay: 9, Meram: 45, Kilicarslan: 15 },
    { time: '06:00', Kampus: 13, Alaaddin: 15, Selcuklu: 30, Karatay: 10, Meram: 46, Kilicarslan: 16 },
    { time: '12:00', Kampus: 14, Alaaddin: 16, Selcuklu: 42, Karatay: 11, Meram: 48, Kilicarslan: 18 },
    { time: '18:00', Kampus: 13, Alaaddin: 15, Selcuklu: 36, Karatay: 10, Meram: 47, Kilicarslan: 17 },
  ];

  // Döngü Sayısı Karşılaştırma Verisi
  const cycleCountData = stations.map((st) => ({
    name: st.name.split(' ')[0],
    cycles: st.adminOnly?.cycleCount || 500,
    soh: st.adminOnly?.sohRaw || 90,
  }));

  return (
    <div className="space-y-6">
      {/* 1. ŞEFFAFLIK VE GÜVENLİK BİLGİLENDİRMESİ */}
      <div className="p-4 bg-[#EFF0EB] border border-[#DDE1DA] rounded-2xl text-xs text-[#5D665E] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <ShieldAlert className="w-4 h-4 text-[#1F5A43] shrink-0" />
          <span>
            <strong>İkinci Yaşam EV Batarya İzleme & Yönetim:</strong> İkinci yaşam bataryalar, teknik test ve güvenlik değerlendirmesi sonrasında sabit depolama için aday olabilir.
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono bg-white px-2.5 py-1 rounded-lg border border-[#DDE1DA] text-[#1F5A43] font-bold">
            EI60 Güvenli Kabin
          </span>
          <span className="text-[10px] bg-[#E5F0EA] text-[#1F5A43] font-semibold px-2 py-1 rounded-lg">
            Simülasyon Modu
          </span>
        </div>
      </div>

      {/* 2. UYARI EŞİKLERİ VE KURAL TABLOLARI */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-3.5 bg-white border border-[#DDE1DA] rounded-xl shadow-subtle space-y-1">
          <span className="text-[10px] text-[#5D665E] font-medium block">Hücre Sıcaklığı</span>
          <div className="text-xs font-bold text-[#182019]">Eşik: &gt; 35°C</div>
          <span className="text-[10px] text-[#B94040] block">Kritik: &gt; 45°C</span>
        </div>

        <div className="p-3.5 bg-white border border-[#DDE1DA] rounded-xl shadow-subtle space-y-1">
          <span className="text-[10px] text-[#5D665E] font-medium block">Düşük SOC Rezervi</span>
          <div className="text-xs font-bold text-[#182019]">Eşik: &lt; %20</div>
          <span className="text-[10px] text-[#D59B2E] block">Tasarruf: &lt; %35</span>
        </div>

        <div className="p-3.5 bg-white border border-[#DDE1DA] rounded-xl shadow-subtle space-y-1">
          <span className="text-[10px] text-[#5D665E] font-medium block">Voltaj Dengesizliği</span>
          <div className="text-xs font-bold text-[#182019]">Eşik: &gt; 30 mV</div>
          <span className="text-[10px] text-[#B94040] block">Kritik: &gt; 50 mV</span>
        </div>

        <div className="p-3.5 bg-white border border-[#DDE1DA] rounded-xl shadow-subtle space-y-1">
          <span className="text-[10px] text-[#5D665E] font-medium block">BMS İletişim Hatası</span>
          <div className="text-xs font-bold text-[#182019]">Zaman Aşımı: &gt; 30 sn</div>
          <span className="text-[10px] text-[#5D665E] block">CANBus / Modbus RTU</span>
        </div>

        <div className="p-3.5 bg-white border border-[#DDE1DA] rounded-xl shadow-subtle space-y-1 col-span-2 sm:col-span-1">
          <span className="text-[10px] text-[#5D665E] font-medium block">İzolasyon Protokolü</span>
          <div className="text-xs font-bold text-[#1F5A43]">Termal & DC Kesici</div>
          <span className="text-[10px] text-[#1F5A43] block">Otomatik Donanım Koruma</span>
        </div>
      </div>

      {/* 3. PETEK BATARYA FİLOSU (HONEYCOMB MODÜL GÖRÜNÜMÜ) */}
      <div className="bg-white border border-[#DDE1DA] rounded-2xl p-5 sm:p-6 shadow-subtle space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DDE1DA]">
          <div>
            <h3 className="text-sm font-bold text-[#182019] flex items-center gap-2">
              <Battery className="w-4 h-4 text-[#1F5A43]" />
              <span>Petek Batarya Modülleri & Hücre Bazlı Durum Haritası</span>
            </h3>
            <p className="text-xs text-[#5D665E] mt-0.5">
              Hücre voltaj dengesizliği (Δ mV), hücre sıcaklıkları (H1-H4) ve BMS güvenlik durumları.
            </p>
          </div>
          <span className="text-[11px] text-[#5D665E] bg-[#F6F6F2] px-3 py-1 rounded-lg border border-[#DDE1DA]">
            6 İkinci Yaşam Modülü
          </span>
        </div>

        {/* Petek Kartları Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stations.map((st) => {
            const imbalanceMv = getCellImbalanceMv(st);
            const isImbalanceCritical = imbalanceMv > 40;
            const isImbalanceWarning = imbalanceMv > 25;
            const admin = st.adminOnly;
            const cellVoltages = getCellVoltages(st);
            const cellTemps = admin?.cellTemperatures || [22.0, 22.4, 22.2, 22.6];

            // Güvenlik durumu etiketi
            let safetyStatus = 'Normal';
            let safetyBadgeColor = 'bg-[#E5F0EA] text-[#1F5A43] border-[#1F5A43]/30';
            if (st.status === 'bakimda') {
              safetyStatus = 'İzolasyonda / Bakımda';
              safetyBadgeColor = 'bg-[#FCECEC] text-[#B94040] border-[#B94040]/30';
            } else if (st.status === 'sinirli' || isImbalanceWarning) {
              safetyStatus = 'İzleme Gerekli';
              safetyBadgeColor = 'bg-[#FFF9EC] text-[#925C08] border-[#F3B33D]/40';
            }

            return (
              <div
                key={st.stationId}
                className={`border rounded-2xl p-5 shadow-subtle flex flex-col justify-between transition-all duration-200 hover:shadow-elevated relative overflow-hidden ${
                  st.status === 'bakimda'
                    ? 'border-[#B94040]/40 bg-[#FFFDFD]'
                    : st.status === 'sinirli'
                    ? 'border-[#D59B2E]/40 bg-[#FFFDF7]'
                    : 'border-[#1F5A43]/30 bg-white'
                }`}
              >
                <div className="space-y-3 relative z-10">
                  {/* Başlık ve Kimlik */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono text-[#5D665E] bg-[#F6F6F2] px-1.5 py-0.5 rounded border border-[#DDE1DA]">
                          {admin?.moduleId || st.stationId}
                        </span>
                        <span className="text-[10px] text-[#5D665E]">{st.stationId}</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#182019] mt-1">
                        {st.name}
                      </h4>
                      <span className="text-[10px] text-[#5D665E] block">
                        {admin?.chemistryType || 'LFP Batarya'}
                      </span>
                    </div>

                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${safetyBadgeColor}`}>
                      {safetyStatus}
                    </span>
                  </div>

                  {/* SOH & SOC Çubukları */}
                  <div className="space-y-2 pt-1">
                    <div>
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="text-[#5D665E]">Batarya Sağlığı (SOH)</span>
                        <span className="font-bold text-[#1F5A43] tabular-nums">
                          %{admin?.sohRaw || 85}
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-[#EFF0EB] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#1F5A43] rounded-full"
                          style={{ width: `${admin?.sohRaw || 85}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="text-[#5D665E]">Şarj Seviyesi (SOC)</span>
                        <span className="font-bold text-[#D59B2E] tabular-nums">
                          %{admin?.socRaw || 75}
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-[#EFF0EB] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#F3B33D] rounded-full"
                          style={{ width: `${admin?.socRaw || 75}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Hücre Bazlı Sıcaklık & Voltaj Görünümü (H1-H4 Petek) */}
                  <div className="p-3 rounded-xl bg-[#F6F6F2] border border-[#DDE1DA] space-y-2">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-semibold text-[#5D665E] uppercase tracking-wider">
                        Hücre Sıcaklıkları & Voltajları
                      </span>
                      <span className={`font-mono font-bold ${isImbalanceCritical ? 'text-[#B94040]' : isImbalanceWarning ? 'text-[#D59B2E]' : 'text-[#1F5A43]'}`}>
                        Δ {imbalanceMv} mV
                      </span>
                    </div>

                    <div className="grid grid-cols-4 gap-1.5 text-center">
                      {cellTemps.map((temp, idx) => (
                        <div
                          key={idx}
                          className="p-1.5 rounded-lg bg-white border border-[#DDE1DA] space-y-0.5"
                        >
                          <div className="text-[9px] font-bold text-[#5D665E]">H{idx + 1}</div>
                          <div className="text-[11px] font-bold text-[#182019] tabular-nums">{temp}°C</div>
                          <div className="text-[9px] font-mono text-[#5D665E]">{cellVoltages[idx]}V</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Seri Numarası ve Döngü Bilgisi */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-[#5D665E] pt-1">
                    <div>
                      <span>Seri No: </span>
                      <strong className="text-[#182019] font-mono block truncate">
                        {admin?.batterySerialNumber || 'EV-BAT-2026-X'}
                      </strong>
                    </div>
                    <div>
                      <span>Döngü Sayısı: </span>
                      <strong className="text-[#182019] block">
                        {admin?.cycleCount || 412} Döngü
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Butonlar: Detay Modal & İzolasyon */}
                <div className="pt-3 mt-3 border-t border-[#EFF0EB] flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedModule(st)}
                    className="px-2.5 py-1 rounded-lg border border-[#DDE1DA] hover:bg-[#F6F6F2] text-[#182019] text-[11px] font-medium transition"
                  >
                    Detaylı İncele
                  </button>

                  <button
                    onClick={() => setIsolationTarget(st)}
                    className="px-2.5 py-1 rounded-lg bg-[#FCECEC] hover:bg-[#FADBD8] text-[#B94040] font-semibold text-[11px] transition flex items-center gap-1 cursor-pointer"
                  >
                    <PowerOff className="w-3 h-3" />
                    <span>Simülasyonda İzole Et</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. BATARYA GRAFİKLERİ (ZAMAN SERİLERİ & KARŞILAŞTIRMA) */}
      <div className="bg-white border border-[#DDE1DA] rounded-2xl p-5 sm:p-6 shadow-subtle space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DDE1DA]">
          <div>
            <h3 className="text-sm font-bold text-[#182019] flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-[#1F5A43]" />
              <span>Batarya Telemetri Grafikleri & Performans Korelasyonu</span>
            </h3>
            <p className="text-xs text-[#5D665E] mt-0.5">
              Zaman serisi SOC, hücre sıcaklıkları, voltaj dengesizliği ve döngü ömrü analizi.
            </p>
          </div>

          {/* Grafik Sekme Butonları */}
          <div className="flex items-center gap-1 bg-[#F6F6F2] p-1 rounded-lg border border-[#DDE1DA] text-xs">
            <button
              onClick={() => setActiveChartTab('soc')}
              className={`px-3 py-1 rounded-md font-medium transition ${
                activeChartTab === 'soc'
                  ? 'bg-white text-[#1F5A43] font-bold shadow-2xs border border-[#DDE1DA]'
                  : 'text-[#5D665E] hover:text-[#182019]'
              }`}
            >
              SOC Zaman Serisi
            </button>
            <button
              onClick={() => setActiveChartTab('temp')}
              className={`px-3 py-1 rounded-md font-medium transition ${
                activeChartTab === 'temp'
                  ? 'bg-white text-[#1F5A43] font-bold shadow-2xs border border-[#DDE1DA]'
                  : 'text-[#5D665E] hover:text-[#182019]'
              }`}
            >
              Sıcaklık Trendi
            </button>
            <button
              onClick={() => setActiveChartTab('imbalance')}
              className={`px-3 py-1 rounded-md font-medium transition ${
                activeChartTab === 'imbalance'
                  ? 'bg-white text-[#1F5A43] font-bold shadow-2xs border border-[#DDE1DA]'
                  : 'text-[#5D665E] hover:text-[#182019]'
              }`}
            >
              Hücre Δ mV
            </button>
            <button
              onClick={() => setActiveChartTab('cycles')}
              className={`px-3 py-1 rounded-md font-medium transition ${
                activeChartTab === 'cycles'
                  ? 'bg-white text-[#1F5A43] font-bold shadow-2xs border border-[#DDE1DA]'
                  : 'text-[#5D665E] hover:text-[#182019]'
              }`}
            >
              Döngü Sayıları
            </button>
          </div>
        </div>

        {/* Aktif Grafik Çizim Alanı */}
        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            {activeChartTab === 'soc' ? (
              <LineChart data={socTimeSeriesData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EFF0EB" />
                <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#5D665E' }} stroke="#DDE1DA" />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#5D665E' }} stroke="#DDE1DA" />
                <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Line type="monotone" dataKey="Kampus" stroke="#1F5A43" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="Alaaddin" stroke="#D59B2E" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="Selcuklu" stroke="#B94040" strokeWidth={2} strokeDasharray="4 4" dot={{ r: 3 }} />
                <Line type="monotone" dataKey="Karatay" stroke="#416D86" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            ) : activeChartTab === 'temp' ? (
              <LineChart data={tempTimeSeriesData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EFF0EB" />
                <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#5D665E' }} stroke="#DDE1DA" />
                <YAxis domain={[15, 35]} tick={{ fontSize: 11, fill: '#5D665E' }} stroke="#DDE1DA" />
                <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Line type="monotone" dataKey="Kampus" stroke="#1F5A43" strokeWidth={2} />
                <Line type="monotone" dataKey="Alaaddin" stroke="#D59B2E" strokeWidth={2} />
                <Line type="monotone" dataKey="Selcuklu" stroke="#B94040" strokeWidth={2} />
                <Line type="monotone" dataKey="Karatay" stroke="#416D86" strokeWidth={2} />
              </LineChart>
            ) : activeChartTab === 'imbalance' ? (
              <LineChart data={imbalanceSeriesData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EFF0EB" />
                <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#5D665E' }} stroke="#DDE1DA" />
                <YAxis domain={[0, 60]} tick={{ fontSize: 11, fill: '#5D665E' }} stroke="#DDE1DA" />
                <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Line type="monotone" dataKey="Kampus" stroke="#1F5A43" strokeWidth={2} />
                <Line type="monotone" dataKey="Alaaddin" stroke="#D59B2E" strokeWidth={2} />
                <Line type="monotone" dataKey="Selcuklu" stroke="#B94040" strokeWidth={2} />
                <Line type="monotone" dataKey="Meram" stroke="#5D665E" strokeWidth={2} strokeDasharray="3 3" />
              </LineChart>
            ) : (
              <BarChart data={cycleCountData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EFF0EB" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#5D665E' }} stroke="#DDE1DA" />
                <YAxis tick={{ fontSize: 11, fill: '#5D665E' }} stroke="#DDE1DA" />
                <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="cycles" name="Toplam Döngü Sayısı" fill="#1F5A43" radius={[4, 4, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* 5. MODÜL DETAY MODALI */}
      {selectedModule && (
        <BaseModal
          isOpen={true}
          onClose={() => setSelectedModule(null)}
          title={`Batarya Modül Analizi: ${selectedModule.adminOnly?.moduleId || selectedModule.stationId}`}
          subtitle={`${selectedModule.name} · Seri No: ${selectedModule.adminOnly?.batterySerialNumber || 'BMS-LFP-2026'}`}
          maxWidth="lg"
          footer={
            <button
              onClick={() => setSelectedModule(null)}
              className="px-4 py-2 rounded-lg bg-[#EFF0EB] hover:bg-[#DDE1DA] text-xs font-semibold text-[#182019] transition"
            >
              Kapat
            </button>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-[#F6F6F2] border border-[#DDE1DA] rounded-xl space-y-1">
              <div className="font-bold text-[#182019]">{selectedModule.adminOnly?.chemistryType}</div>
              <div className="text-[11px] text-[#5D665E]">
                Nominal Kapasite: {selectedModule.adminOnly?.nominalCapacityAh || 200} Ah · Kullanılabilir: {selectedModule.adminOnly?.usableCapacityAh || 184} Ah
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-2.5 bg-white border border-[#DDE1DA] rounded-lg">
                <span className="text-[10px] text-[#5D665E] block">SOH Sağlık</span>
                <span className="font-bold text-[#1F5A43] text-sm">%{selectedModule.adminOnly?.sohRaw || 85}</span>
              </div>
              <div className="p-2.5 bg-white border border-[#DDE1DA] rounded-lg">
                <span className="text-[10px] text-[#5D665E] block">SOC Doluluk</span>
                <span className="font-bold text-[#D59B2E] text-sm">%{selectedModule.adminOnly?.socRaw || 75}</span>
              </div>
              <div className="p-2.5 bg-white border border-[#DDE1DA] rounded-lg">
                <span className="text-[10px] text-[#5D665E] block">Voltaj / Akım</span>
                <span className="font-bold text-[#182019] text-xs">{selectedModule.adminOnly?.currentVoltageV}V · {selectedModule.adminOnly?.currentAmperageA}A</span>
              </div>
              <div className="p-2.5 bg-white border border-[#DDE1DA] rounded-lg">
                <span className="text-[10px] text-[#5D665E] block">BMS Protokol</span>
                <span className="font-bold text-[#1F5A43] text-xs">{selectedModule.adminOnly?.bmsConnection || 'CANBus'}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#E5F0EA] border border-[#1F5A43]/30 space-y-1 text-[11px] text-[#174634]">
              <div className="font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1F5A43]" />
                <span>Teknik Değerlendirme & Güvenlik</span>
              </div>
              <p className="leading-relaxed">
                {selectedModule.adminOnly?.technicalEvaluation ||
                  'İkinci yaşam bataryalar, teknik test ve güvenlik değerlendirmesi sonrasında sabit depolama için aday olabilir.'}
              </p>
            </div>
          </div>
        </BaseModal>
      )}

      {/* 6. İZOLASYON ONAY MODALI */}
      {isolationTarget && (
        <BaseModal
          isOpen={true}
          onClose={() => setIsolationTarget(null)}
          title="Batarya İzolasyon Onayı (Simülasyon)"
          subtitle={`${isolationTarget.name} (${isolationTarget.adminOnly?.moduleId || isolationTarget.stationId})`}
          maxWidth="md"
          footer={
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsolationTarget(null)}
                className="px-3 py-1.5 rounded-lg border border-[#DDE1DA] text-xs text-[#5D665E] hover:text-[#182019]"
              >
                Vazgeç
              </button>
              <button
                onClick={() => {
                  onIsolateBattery(isolationTarget);
                  setIsolationTarget(null);
                }}
                className="px-4 py-1.5 rounded-lg bg-[#B94040] hover:bg-[#A33434] text-white text-xs font-semibold cursor-pointer"
              >
                Simülasyonda İzole Et
              </button>
            </div>
          }
        >
          <div className="space-y-3 text-xs leading-relaxed text-[#182019]">
            <p>
              Bu işlem, <strong>{isolationTarget.name}</strong> durağındaki ikinci yaşam bataryayı sanal olarak şebekeden ve DC baradan ayırır ve olay günlüğüne simüle kayıt ekler.
            </p>
            <div className="p-3 bg-[#FFF7E6] border border-[#B7791F]/30 rounded-lg text-[#B7791F] flex items-start gap-2">
              <Info className="w-4 h-4 text-[#B7791F] shrink-0 mt-0.5" />
              <div>
                <strong>Demo / Simülasyon Kuralı:</strong> Gerçek fiziksel donanıma veya yangın kesicilerine sinyal gönderilmez; yalnızca sistem arayüzünde sınırlı mod simüle edilir.
              </div>
            </div>
          </div>
        </BaseModal>
      )}
    </div>
  );
};

export default AdminBatteries;

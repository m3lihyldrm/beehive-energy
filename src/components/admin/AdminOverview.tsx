import React, { useState } from 'react';
import {
  Sun,
  Zap,
  Battery,
  AlertTriangle,
  Compass,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Wrench,
  Activity,
  Layers,
  MapPin,
  Clock,
  Info
} from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { MetricCard } from '../common/MetricCard';
import { StatusBadge } from '../common/StatusBadge';
import { SimulationBanner } from '../common/SimulationBanner';
import { BaseModal } from '../common/BaseModal';
import { AdminTab } from './AdminLayout';
import { AdminStation, AdminAlert } from '../../types';

interface AdminOverviewProps {
  overview: any;
  stations?: AdminStation[];
  alerts?: AdminAlert[];
  eventLogs?: any[];
  onNavigateTab: (tab: AdminTab) => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({
  overview,
  stations = [],
  alerts = [],
  eventLogs = [],
  onNavigateTab,
}) => {
  const [selectedStation, setSelectedStation] = useState<AdminStation | null>(null);

  // Fallback calculations from stations array
  const totalStations = stations.length || 6;
  const activeStations = stations.filter((s) => s.status === 'aktif').length || 4;
  const limitedStations = stations.filter((s) => s.status === 'sinirli').length || 1;
  const maintenanceStations = stations.filter((s) => s.status === 'bakimda').length || 1;

  const totalPv = stations.length
    ? parseFloat(stations.reduce((acc, s) => acc + s.solarProductionKw, 0).toFixed(1))
    : overview?.stats?.totalSolarProductionKw || 24.9;

  const totalLoad = stations.length
    ? parseFloat(stations.reduce((acc, s) => acc + s.instantConsumptionKw, 0).toFixed(1))
    : overview?.stats?.totalInstantConsumptionKw || 11.2;

  const avgSoc = stations.length
    ? Math.round(
        stations.reduce((acc, s) => acc + (s.adminOnly?.socRaw || 80), 0) / stations.length
      )
    : 81;

  const avgCleanEnergy = stations.length
    ? Math.round(
        stations.reduce((acc, s) => acc + (s.dailyCleanEnergyRatio || 85), 0) / stations.length
      )
    : 89;

  const openAlertsCount = alerts.length || overview?.stats?.criticalAlertCount || 3;

  // 24 Saatlik Zenginleştirilmiş Enerji Simülasyon Verisi (Güneş, Yük, Batarya SOC, Şebeke Etkileşimi)
  const hourlyData = [
    { hour: '00:00', solar: 0, consumption: 0.8, batterySoc: 74, grid: 0 },
    { hour: '03:00', solar: 0, consumption: 0.5, batterySoc: 71, grid: 0 },
    { hour: '06:00', solar: 0.9, consumption: 1.2, batterySoc: 68, grid: 0.1 },
    { hour: '09:00', solar: 3.8, consumption: 2.1, batterySoc: 79, grid: 1.2 },
    { hour: '12:00', solar: 6.2, consumption: 2.8, batterySoc: 94, grid: 2.8 },
    { hour: '15:00', solar: 5.1, consumption: 2.4, batterySoc: 98, grid: 2.1 },
    { hour: '18:00', solar: 1.9, consumption: 3.2, batterySoc: 88, grid: 0.5 },
    { hour: '21:00', solar: 0, consumption: 2.2, batterySoc: 80, grid: 0 },
  ];

  // Birleştirilmiş Son Olaylar (Uyarılar, Bakım, Karar Destek, İzolasyon)
  const recentEvents = [
    ...eventLogs.map((log) => ({
      id: log.id,
      timestamp: log.timestamp,
      title: log.message,
      category: log.type === 'BATTERY_ISOLATION_MOCK'
        ? 'İzolasyon'
        : log.type === 'MAINTENANCE'
        ? 'Bakım'
        : 'Karar Destek',
      badgeClass: log.type === 'BATTERY_ISOLATION_MOCK'
        ? 'bg-[#FCECEC] text-[#B94040]'
        : log.type === 'MAINTENANCE'
        ? 'bg-[#EFF0EB] text-[#5D665E]'
        : 'bg-[#E5F0EA] text-[#1F5A43]',
    })),
    ...alerts.slice(0, 4).map((alt) => ({
      id: alt.id,
      timestamp: alt.timestamp || new Date().toISOString(),
      title: `${alt.stationName || alt.stationId}: ${alt.message}`,
      category: alt.level === 'critical' ? 'Kritik Uyarı' : 'Uyarı',
      badgeClass: alt.level === 'critical' ? 'bg-[#FCECEC] text-[#B94040]' : 'bg-[#FFF9EC] text-[#D59B2E]',
    })),
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 6);

  return (
    <div className="space-y-6">
      {/* 1. ÜST SİMÜLASYON BİLGİ BANDI */}
      <SimulationBanner
        message="Simülasyon Modu Aktif:"
        subtext="Bu panel fiziksel cihazlara komut göndermez. Veriler Konya pilot durak ağının dijital ikiz referans telemetrisidir."
      />

      {/* 2. FAZ 2 METRİK KARTLARI (8 KART) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        <MetricCard
          title="Aktif Durak"
          value={activeStations}
          unit={`/ ${totalStations}`}
          subtext="Tam kapasite"
          icon={<Compass className="w-4 h-4 text-[#1F5A43]" />}
        />

        <MetricCard
          title="Sınırlı Mod"
          value={limitedStations}
          subtext="Tasarruf modu"
          icon={<Clock className="w-4 h-4 text-[#D59B2E]" />}
        />

        <MetricCard
          title="Bakımda"
          value={maintenanceStations}
          subtext="Revizyon / test"
          icon={<Wrench className="w-4 h-4 text-[#B94040]" />}
        />

        <MetricCard
          title="Anlık PV Üretim"
          value={totalPv}
          unit="kW"
          subtext="6 durak toplamı"
          icon={<Sun className="w-4 h-4 text-[#D59B2E]" />}
          highlight={true}
        />

        <MetricCard
          title="Anlık Yük"
          value={totalLoad}
          unit="kW"
          subtext="Kamusal hizmet"
          icon={<Zap className="w-4 h-4 text-[#1F5A43]" />}
        />

        <MetricCard
          title="Ortalama SOC"
          value={`%${avgSoc}`}
          subtext="Depolama rezervi"
          icon={<Battery className="w-4 h-4 text-[#1F5A43]" />}
        />

        <MetricCard
          title="Açık Uyarılar"
          value={openAlertsCount}
          subtext="Sensör / BMS"
          icon={<AlertTriangle className="w-4 h-4 text-[#B94040]" />}
          badge={
            <button
              onClick={() => onNavigateTab('alerts')}
              className="text-[10px] font-semibold text-[#B94040] hover:underline"
            >
              İncele →
            </button>
          }
        />

        <MetricCard
          title="Temiz Enerji"
          value={`%${avgCleanEnergy}`}
          subtext="Güneş karşılama"
          icon={<TrendingUp className="w-4 h-4 text-[#416D86]" />}
        />
      </div>

      {/* 3. 24 SAATLİK ENERJİ GRAFİĞİ */}
      <div className="bg-white border border-[#DDE1DA] rounded-2xl p-5 sm:p-6 shadow-subtle space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#DDE1DA]">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-[#182019]">
                24 Saatlik Enerji & Batarya SOC Profili (Simülasyon)
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#EFF0EB] text-[#5D665E] font-mono">
                3 Saatlik Örneklem
              </span>
            </div>
            <p className="text-xs text-[#5D665E] mt-0.5">
              Güneş üretimi (kW), yük tüketimi (kW), batarya doluluk oranı (% SOC) ve planlanan şebeke etkileşimi (kW).
            </p>
          </div>

          <div className="text-[11px] text-[#5D665E] bg-[#F6F6F2] px-3 py-1.5 rounded-lg border border-[#DDE1DA]">
            Simülasyon telemetrisi · 15 saniyelik demo veri akışı
          </div>
        </div>

        <div className="h-72 sm:h-80 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={hourlyData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="solarGradOverview" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D59B2E" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#D59B2E" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="loadGradOverview" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1F5A43" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#1F5A43" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#EFF0EB" />
              <XAxis dataKey="hour" tick={{ fontSize: 11, fill: '#5D665E' }} stroke="#DDE1DA" />
              <YAxis yAxisId="left" tick={{ fontSize: 11, fill: '#5D665E' }} stroke="#DDE1DA" label={{ value: 'Güç (kW)', angle: -90, position: 'insideLeft', fontSize: 10, fill: '#5D665E' }} />
              <YAxis yAxisId="right" orientation="right" domain={[0, 100]} tick={{ fontSize: 11, fill: '#5D665E' }} stroke="#DDE1DA" label={{ value: '% SOC', angle: 90, position: 'insideRight', fontSize: 10, fill: '#5D665E' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#DDE1DA',
                  borderRadius: '10px',
                  fontSize: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
              <Area yAxisId="left" type="monotone" dataKey="solar" name="Güneş Üretimi (kW)" stroke="#D59B2E" strokeWidth={2} fill="url(#solarGradOverview)" />
              <Area yAxisId="left" type="monotone" dataKey="consumption" name="Yük Tüketimi (kW)" stroke="#1F5A43" strokeWidth={2} fill="url(#loadGradOverview)" />
              <Bar yAxisId="left" dataKey="grid" name="Şebeke Etkileşimi (kW - Planlanan)" fill="#416D86" opacity={0.6} />
              <Line yAxisId="right" type="monotone" dataKey="batterySoc" name="Batarya SOC (%)" stroke="#925C08" strokeWidth={2.5} dot={{ r: 3 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="pt-3 border-t border-[#EFF0EB] flex flex-wrap items-center justify-between gap-3 text-xs text-[#5D665E]">
          <div className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-[#1F5A43]" />
            <span>Şebeke aktarımı; ilgili mevzuat, dağıtım şirketi bağlantısı ve teknik uygunluğa bağlı planlanan bir özelliktir.</span>
          </div>
          <div>Pik Üretim: 12:00 (6.2 kW) · Min SOC: %68 (06:00)</div>
        </div>
      </div>

      {/* 4. İKİLİ BÖLÜM: HARİTA GÖRÜNÜMÜ & SON OLAYLAR PANELİ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sol Taraf: Harita ve Durak Sağlık Durumu Kartları (lg:col-span-7) */}
        <div className="lg:col-span-7 bg-white border border-[#DDE1DA] rounded-2xl p-5 shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#DDE1DA]">
            <div>
              <h3 className="text-sm font-bold text-[#182019] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#1F5A43]" />
                <span>Konya Pilot Ağı Durak Sağlık Durumu</span>
              </h3>
              <p className="text-xs text-[#5D665E] mt-0.5">
                Durak sağlık renkleri ve hızlı özet için karta tıklayınız.
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('stations')}
              className="text-xs font-semibold text-[#1F5A43] hover:underline"
            >
              Tüm Duraklar →
            </button>
          </div>

          {/* Durak Kartları Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {stations.map((st) => {
              const statusColors: Record<string, { bg: string; dot: string; text: string; label: string }> = {
                aktif: { bg: 'bg-[#E5F0EA]/50 border-[#1F5A43]/30', dot: 'bg-[#1F5A43]', text: 'text-[#1F5A43]', label: 'Aktif' },
                sinirli: { bg: 'bg-[#FFF9EC] border-[#F3B33D]/40', dot: 'bg-[#D59B2E]', text: 'text-[#925C08]', label: 'Sınırlı Mod' },
                bakimda: { bg: 'bg-[#FCECEC] border-[#B94040]/30', dot: 'bg-[#B94040]', text: 'text-[#B94040]', label: 'Bakımda' },
                baglanti_yok: { bg: 'bg-[#EFF0EB] border-[#DDE1DA]', dot: 'bg-[#5D665E]', text: 'text-[#5D665E]', label: 'Bağlantı Yok' },
              };
              const sc = statusColors[st.status] || statusColors.aktif;

              return (
                <div
                  key={st.stationId}
                  onClick={() => setSelectedStation(st)}
                  className={`border rounded-xl p-3.5 cursor-pointer transition-all hover:shadow-subtle ${sc.bg}`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="font-bold text-xs text-[#182019] truncate">{st.name}</div>
                    <span className="flex items-center gap-1.5 text-[10px] font-semibold shrink-0">
                      <span className={`w-2 h-2 rounded-full ${sc.dot}`} />
                      <span className={sc.text}>{sc.label}</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-[11px] text-[#5D665E] pt-2 border-t border-black/5">
                    <div>
                      <div className="text-[10px] text-[#5D665E]/80">PV</div>
                      <div className="font-semibold text-[#182019]">{st.solarProductionKw} kW</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#5D665E]/80">SOC</div>
                      <div className="font-semibold text-[#182019]">%{st.adminOnly?.socRaw || 80}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#5D665E]/80">Temiz %</div>
                      <div className="font-semibold text-[#182019]">%{st.dailyCleanEnergyRatio || 90}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Alt Harita Bilgilendirmesi */}
          <div className="p-3 rounded-xl bg-[#F6F6F2] border border-[#DDE1DA] flex items-center justify-between text-xs text-[#5D665E]">
            <span className="text-[11px]">
              Koordinat bazlı GIS harita modülü için Şehir Haritası sekmesini kullanabilirsiniz.
            </span>
            <button
              onClick={() => onNavigateTab('stations')}
              className="text-xs font-bold text-[#1F5A43] hover:underline shrink-0"
            >
              Yönetime Git
            </button>
          </div>
        </div>

        {/* Sağ Taraf: Son Olaylar Paneli (lg:col-span-5) */}
        <div className="lg:col-span-5 bg-white border border-[#DDE1DA] rounded-2xl p-5 shadow-subtle flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#DDE1DA]">
              <h3 className="text-sm font-bold text-[#182019] flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#1F5A43]" />
                <span>Son Olaylar & İşletme Günlüğü</span>
              </h3>
              <button
                onClick={() => onNavigateTab('alerts')}
                className="text-xs font-semibold text-[#1F5A43] hover:underline"
              >
                Tüm Kayıtlar →
              </button>
            </div>

            <div className="divide-y divide-[#EFF0EB] mt-2">
              {recentEvents.length === 0 ? (
                <div className="py-6 text-center text-xs text-[#5D665E]">
                  Kayıtlı olay bulunmuyor.
                </div>
              ) : (
                recentEvents.map((ev, i) => (
                  <div key={ev.id || i} className="py-2.5 flex items-start justify-between gap-3 text-xs">
                    <div className="space-y-0.5 min-w-0">
                      <div className="font-medium text-[#182019] text-xs leading-snug truncate">
                        {ev.title}
                      </div>
                      <div className="text-[10px] text-[#5D665E]">
                        {new Date(ev.timestamp).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })} · {new Date(ev.timestamp).toLocaleDateString('tr-TR')}
                      </div>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold shrink-0 ${ev.badgeClass}`}>
                      {ev.category}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Hızlı Aksiyon Kutusu */}
          <div className="p-3.5 rounded-xl bg-linear-to-b from-[#E5F0EA]/40 to-white border border-[#1F5A43]/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#1F5A43]">Karar Destek Algoritması</span>
              <span className="text-[10px] text-[#5D665E]">Kural Tabanlı</span>
            </div>
            <p className="text-[11px] text-[#5D665E] leading-relaxed">
              Algoritma şu anda gün ortası şarj optimizasyonu ve Selçuklu durağında yük kısıtlama senaryosunu izliyor.
            </p>
            <button
              onClick={() => onNavigateTab('ai')}
              className="w-full py-1.5 rounded-lg bg-[#1F5A43] hover:bg-[#184835] text-white text-xs font-bold transition flex items-center justify-center gap-1.5"
            >
              <span>Önerileri İncele</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Durak Hızlı Özet Modalı */}
      {selectedStation && (
        <BaseModal
          isOpen={true}
          onClose={() => setSelectedStation(null)}
          title={selectedStation.name}
          subtitle={`Durak Kodu: ${selectedStation.stationId} · Durum: ${selectedStation.status}`}
          maxWidth="lg"
          footer={
            <div className="flex items-center justify-between w-full">
              <span className="text-xs text-[#5D665E]">Simülasyon Modu Aktif</span>
              <button
                onClick={() => {
                  setSelectedStation(null);
                  onNavigateTab('stations');
                }}
                className="px-3 py-1.5 rounded-lg bg-[#1F5A43] text-white text-xs font-semibold"
              >
                Durak Yönetimine Git
              </button>
            </div>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 rounded-xl bg-[#EFF0EB] border border-[#DDE1DA] space-y-1">
              <div className="font-semibold text-[#182019]">{selectedStation.description}</div>
              <div className="text-[11px] text-[#5D665E]">
                Konum Koordinatları: {selectedStation.coordinates.join(', ')}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-white border border-[#DDE1DA] rounded-xl">
                <div className="text-[#5D665E] text-[10px]">Anlık PV</div>
                <div className="text-base font-bold text-[#182019]">{selectedStation.solarProductionKw} kW</div>
              </div>
              <div className="p-3 bg-white border border-[#DDE1DA] rounded-xl">
                <div className="text-[#5D665E] text-[10px]">Anlık Yük</div>
                <div className="text-base font-bold text-[#182019]">{selectedStation.instantConsumptionKw} kW</div>
              </div>
              <div className="p-3 bg-white border border-[#DDE1DA] rounded-xl">
                <div className="text-[#5D665E] text-[10px]">Batarya SOC</div>
                <div className="text-base font-bold text-[#1F5A43]">%{selectedStation.adminOnly?.socRaw || 80}</div>
              </div>
              <div className="p-3 bg-white border border-[#DDE1DA] rounded-xl">
                <div className="text-[#5D665E] text-[10px]">Batarya SOH</div>
                <div className="text-base font-bold text-[#182019]">%{selectedStation.adminOnly?.sohRaw || 95}</div>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#DDE1DA]">
              <div className="font-semibold text-[#182019]">Güvenli Enerji Kabini Bilgileri</div>
              <div className="text-[11px] text-[#5D665E] leading-relaxed">
                {selectedStation.energyCabinet?.location} · {selectedStation.energyCabinet?.safetySummary}
              </div>
              <div className="text-[11px] text-[#5D665E]">
                <strong>Modül Kimliği:</strong> {selectedStation.adminOnly?.moduleId} (
                {selectedStation.adminOnly?.chemistryType})
              </div>
            </div>
          </div>
        </BaseModal>
      )}
    </div>
  );
};

export default AdminOverview;

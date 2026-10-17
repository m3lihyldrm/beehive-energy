import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  ArrowUpDown,
  Eye,
  Lock,
  Battery,
  Sun,
  Zap,
  Shield,
  Clock,
  Wrench,
  AlertTriangle,
  Cpu,
  Layers,
  Thermometer,
  Smartphone
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { AdminStation } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { BaseModal } from '../common/BaseModal';
import { EnergyFlowDiagram } from '../common/EnergyFlowDiagram';

interface AdminStationsProps {
  stations: AdminStation[];
}

export function getStationDistrict(stationId: string): string {
  switch (stationId) {
    case 'ST-KNY-01':
      return 'Selçuklu';
    case 'ST-KNY-02':
      return 'Karatay';
    case 'ST-KNY-03':
      return 'Selçuklu';
    case 'ST-KNY-04':
      return 'Karatay';
    case 'ST-KNY-05':
      return 'Meram';
    case 'ST-KNY-06':
      return 'Selçuklu';
    default:
      return 'Konya Merkez';
  }
}

export const AdminStations: React.FC<AdminStationsProps> = ({ stations }) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [districtFilter, setDistrictFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'solar' | 'ratio' | 'soc' | 'consumption'>('name');
  const [selectedStation, setSelectedStation] = useState<AdminStation | null>(null);

  const filteredStations = useMemo(() => {
    return stations
      .filter((st) => {
        const district = getStationDistrict(st.stationId);
        if (search.trim()) {
          const q = search.toLowerCase();
          const match =
            st.name.toLowerCase().includes(q) ||
            st.stationId.toLowerCase().includes(q) ||
            district.toLowerCase().includes(q);
          if (!match) return false;
        }
        if (statusFilter !== 'all' && st.status !== statusFilter) return false;
        if (districtFilter !== 'all' && district !== districtFilter) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name, 'tr');
        if (sortBy === 'solar') return b.solarProductionKw - a.solarProductionKw;
        if (sortBy === 'ratio') return b.dailyCleanEnergyRatio - a.dailyCleanEnergyRatio;
        if (sortBy === 'soc')
          return (b.adminOnly?.socRaw || 0) - (a.adminOnly?.socRaw || 0);
        if (sortBy === 'consumption') return b.instantConsumptionKw - a.instantConsumptionKw;
        return 0;
      });
  }, [stations, search, statusFilter, districtFilter, sortBy]);

  // Modal içi mini telemetri verisi
  const modalTelemetryData = selectedStation
    ? [
        { time: '06:00', solar: (selectedStation.solarProductionKw * 0.15).toFixed(1), soc: Math.max(30, (selectedStation.adminOnly?.socRaw || 75) - 15) },
        { time: '09:00', solar: (selectedStation.solarProductionKw * 0.65).toFixed(1), soc: Math.max(40, (selectedStation.adminOnly?.socRaw || 75) - 5) },
        { time: '12:00', solar: selectedStation.solarProductionKw.toFixed(1), soc: Math.min(100, (selectedStation.adminOnly?.socRaw || 75) + 12) },
        { time: '15:00', solar: (selectedStation.solarProductionKw * 0.85).toFixed(1), soc: Math.min(100, (selectedStation.adminOnly?.socRaw || 75) + 8) },
        { time: '18:00', solar: (selectedStation.solarProductionKw * 0.35).toFixed(1), soc: selectedStation.adminOnly?.socRaw || 75 },
      ]
    : [];

  return (
    <div className="space-y-5">
      {/* Üst Filtreleme, Arama ve Sıralama Barı */}
      <div className="bg-white border border-[#DDE1DA] rounded-2xl p-4 sm:p-5 shadow-subtle space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Arama */}
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-4 h-4 text-[#5D665E] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Durak adı, kod (ST-KNY-01) veya ilçe ara..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-[#F6F6F2] border border-[#DDE1DA] rounded-lg text-[#182019] focus:bg-white focus:border-[#1F5A43] focus:outline-none transition"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* İlçe Filtresi */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-[#5D665E] hidden sm:inline">İlçe:</span>
              <select
                value={districtFilter}
                onChange={(e) => setDistrictFilter(e.target.value)}
                className="bg-[#F6F6F2] border border-[#DDE1DA] rounded-lg px-2.5 py-1.5 text-xs text-[#182019] focus:bg-white focus:outline-none"
              >
                <option value="all">Tüm İlçeler</option>
                <option value="Selçuklu">Selçuklu</option>
                <option value="Karatay">Karatay</option>
                <option value="Meram">Meram</option>
              </select>
            </div>

            {/* Durum Filtresi */}
            <div className="flex items-center gap-1 bg-[#F6F6F2] p-1 rounded-lg border border-[#DDE1DA]">
              {[
                { id: 'all', label: 'Tümü' },
                { id: 'aktif', label: 'Aktif' },
                { id: 'sinirli', label: 'Sınırlı' },
                { id: 'bakimda', label: 'Bakımda' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setStatusFilter(f.id)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition ${
                    statusFilter === f.id
                      ? 'bg-white text-[#1F5A43] font-bold shadow-2xs border border-[#DDE1DA]'
                      : 'text-[#5D665E] hover:text-[#182019]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Sıralama */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-[#5D665E] hidden md:inline">Sırala:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#F6F6F2] border border-[#DDE1DA] rounded-lg px-2.5 py-1.5 text-xs text-[#182019] focus:bg-white focus:outline-none"
              >
                <option value="name">İsim (A-Z)</option>
                <option value="solar">PV Üretimi (Yüksek)</option>
                <option value="ratio">Temiz Enerji (%)</option>
                <option value="soc">Batarya SOC (%)</option>
                <option value="consumption">Yük Tüketimi (kW)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="text-xs text-[#5D665E] pt-2 border-t border-[#EFF0EB] flex flex-wrap items-center justify-between gap-2">
          <span>
            Toplam <strong className="text-[#1F5A43]">{filteredStations.length}</strong> durak listeleniyor.
          </span>
          <span className="text-[11px]">
            Simülasyon telemetrisi · 15 saniyelik demo veri akışı
          </span>
        </div>
      </div>

      {/* Durak Tablosu */}
      <div className="bg-white border border-[#DDE1DA] rounded-2xl shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F6F6F2] border-b border-[#DDE1DA] text-[#5D665E] uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4 font-semibold">Durak Adı & Kod</th>
                <th className="py-3 px-4 font-semibold">İlçe</th>
                <th className="py-3 px-4 font-semibold">Durum</th>
                <th className="py-3 px-4 font-semibold">Anlık PV</th>
                <th className="py-3 px-4 font-semibold">Anlık Yük</th>
                <th className="py-3 px-4 font-semibold">Temiz Enerji</th>
                <th className="py-3 px-4 font-semibold">Batarya SOC</th>
                <th className="py-3 px-4 font-semibold">Son Telemetri</th>
                <th className="py-3 px-4 font-semibold text-center">Açık Uyarı</th>
                <th className="py-3 px-4 font-semibold text-right">Eylem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFF0EB]">
              {filteredStations.map((station) => {
                const district = getStationDistrict(station.stationId);
                const alertsCount = station.adminOnly?.alerts?.length || 0;
                const lastTime = station.lastUpdated
                  ? new Date(station.lastUpdated).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
                  : '09:25';

                return (
                  <tr key={station.stationId} className="hover:bg-[#FDFDFD] transition">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#182019] text-sm">{station.name}</div>
                      <span className="font-mono text-[10px] text-[#5D665E]">{station.stationId}</span>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-[#182019]">{district}</td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={station.status} size="sm" />
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#182019] tabular-nums">
                        {station.solarProductionKw} kW
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-[#182019] tabular-nums">
                        {station.instantConsumptionKw} kW
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#1F5A43] tabular-nums">
                        %{station.dailyCleanEnergyRatio}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#1F5A43] tabular-nums">
                        %{station.adminOnly?.socRaw || 80}
                      </div>
                      <span className="text-[10px] text-[#5D665E] block">
                        SOH: %{station.adminOnly?.sohRaw || 95}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#5D665E] font-mono text-[11px]">
                      {lastTime}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {alertsCount > 0 ? (
                        <span className="px-2 py-0.5 rounded-full bg-[#FCECEC] text-[#B94040] font-bold text-[10px]">
                          {alertsCount}
                        </span>
                      ) : (
                        <span className="text-[#5D665E] text-[11px]">—</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedStation(station)}
                        className="px-3 py-1.5 rounded-lg bg-[#E5F0EA] hover:bg-[#D4E8DC] text-[#1F5A43] font-semibold text-xs transition inline-flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Detay</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* DURAK DETAY MODALI (KAPSAMLI DONANIM ENVANTERİ & AKIŞ) */}
      {selectedStation && (
        <BaseModal
          isOpen={true}
          onClose={() => setSelectedStation(null)}
          title={`${selectedStation.name} (${selectedStation.stationId})`}
          subtitle={`İlçe: ${getStationDistrict(selectedStation.stationId)} · Durum: ${selectedStation.status.toUpperCase()}`}
          maxWidth="2xl"
          footer={
            <div className="flex items-center justify-between w-full">
              <span className="text-xs text-[#5D665E]">
                Güvenli Kabin: {selectedStation.energyCabinet?.safetySummary}
              </span>
              <button
                onClick={() => setSelectedStation(null)}
                className="px-4 py-2 rounded-lg bg-[#1F5A43] text-white text-xs font-semibold hover:bg-[#184835] transition"
              >
                Kapat
              </button>
            </div>
          }
        >
          <div className="space-y-6 text-xs">
            {/* 1. Donanım Envanteri Grid */}
            <div className="space-y-2">
              <h4 className="font-bold text-[#182019] text-xs uppercase tracking-wide flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-[#1F5A43]" />
                <span>Donanım ve Sistem Envanteri</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                <div className="p-3 bg-[#F6F6F2] border border-[#DDE1DA] rounded-xl">
                  <span className="text-[10px] text-[#5D665E] block">PV Bilgisi</span>
                  <span className="font-bold text-[#182019]">Monokristal Çatı Panel</span>
                  <span className="text-[10px] text-[#1F5A43] block mt-0.5">{selectedStation.solarProductionKw} kWp Kapasite</span>
                </div>

                <div className="p-3 bg-[#F6F6F2] border border-[#DDE1DA] rounded-xl">
                  <span className="text-[10px] text-[#5D665E] block">İnverter Durumu</span>
                  <span className="font-bold text-[#182019] truncate block">
                    {selectedStation.adminOnly?.inverterStatus || 'Hibrit İnverter Senkron'}
                  </span>
                  <span className="text-[10px] text-[#5D665E] block mt-0.5">MPPT Verimi: %98.2</span>
                </div>

                <div className="p-3 bg-[#F6F6F2] border border-[#DDE1DA] rounded-xl">
                  <span className="text-[10px] text-[#5D665E] block">Batarya Modülü</span>
                  <span className="font-mono font-bold text-[#182019] block">
                    {selectedStation.adminOnly?.moduleId || 'MOD-KNY-01'}
                  </span>
                  <span className="text-[10px] text-[#5D665E] block mt-0.5">
                    {selectedStation.adminOnly?.chemistryType || 'LFP İkinci Yaşam'}
                  </span>
                </div>

                <div className="p-3 bg-[#F6F6F2] border border-[#DDE1DA] rounded-xl">
                  <span className="text-[10px] text-[#5D665E] block">BMS Durumu</span>
                  <span className="font-bold text-[#1F5A43]">
                    {selectedStation.adminOnly?.bmsStatus || 'NORMAL'}
                  </span>
                  <span className="text-[10px] text-[#5D665E] block mt-0.5 font-mono">
                    {selectedStation.adminOnly?.bmsFaultCode || 'BMS_OK_000'}
                  </span>
                </div>

                <div className="p-3 bg-[#F6F6F2] border border-[#DDE1DA] rounded-xl">
                  <span className="text-[10px] text-[#5D665E] block">Şarj Portları</span>
                  <span className="font-bold text-[#182019]">
                    {selectedStation.usbCPorts}x USB-C · {selectedStation.powerOutlets}x 220V
                  </span>
                  <span className="text-[10px] text-[#1F5A43] block mt-0.5">
                    Qi Kablosuz: {selectedStation.wirelessCharging ? 'Aktif' : 'Devre Dışı'}
                  </span>
                </div>

                <div className="p-3 bg-[#F6F6F2] border border-[#DDE1DA] rounded-xl">
                  <span className="text-[10px] text-[#5D665E] block">İklimlendirme (HVAC)</span>
                  <span className="font-bold text-[#182019] truncate block">
                    {selectedStation.hvacStatus}
                  </span>
                  <span className="text-[10px] text-[#5D665E] block mt-0.5">
                    İç Sıcaklık: {selectedStation.indoorTemperature}°C
                  </span>
                </div>
              </div>
            </div>

            {/* 2. Bakım Geçmişi & Kabin Güvenliği */}
            <div className="p-3.5 rounded-xl bg-[#E5F0EA]/40 border border-[#1F5A43]/20 space-y-2">
              <div className="flex items-center justify-between font-bold text-[#1F5A43]">
                <span className="flex items-center gap-1.5">
                  <Wrench className="w-4 h-4" />
                  <span>Bakım Geçmişi & Güvenli Kabin Notları</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-[#1F5A43]">
                  EI60 Yangın Korumalı
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-[#174634]">
                <div>
                  <strong>Son Bakım Tarihi:</strong> {selectedStation.adminOnly?.lastMaintenanceDate || '2026-08-15'}
                </div>
                <div>
                  <strong>Kabin Kilit Durumu:</strong> {selectedStation.adminOnly?.cabinetDoorStatus || 'Kilitli ve Güvenli'}
                </div>
                <div>
                  <strong>Havalandırma:</strong> {selectedStation.adminOnly?.energyCabinetDetails?.ventilationStatus || 'Otomatik cebri fan'}
                </div>
                <div>
                  <strong>Yangın Koruma:</strong> {selectedStation.adminOnly?.energyCabinetDetails?.fireSuppressionSystem || 'Aerosol otomatik modül'}
                </div>
              </div>
              <p className="text-[11px] text-[#5D665E] pt-1 border-t border-[#1F5A43]/20 leading-relaxed">
                {selectedStation.adminOnly?.technicalEvaluation ||
                  'İkinci yaşam bataryalar, teknik test ve güvenlik değerlendirmesi sonrasında sabit depolama için aday olabilir.'}
              </p>
            </div>

            {/* 3. Gün İçi Telemetri Grafiği */}
            <div className="space-y-2 bg-[#F6F6F2] p-3.5 rounded-xl border border-[#DDE1DA]">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#182019] text-xs">Gün İçi Üretim & SOC Seyri (Simülasyon)</span>
                <span className="text-[10px] text-[#5D665E]">Örnek Saatler</span>
              </div>
              <div className="h-40 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={modalTelemetryData} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#EFF0EB" />
                    <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#5D665E' }} stroke="#DDE1DA" />
                    <YAxis tick={{ fontSize: 10, fill: '#5D665E' }} stroke="#DDE1DA" />
                    <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                    <Area type="monotone" dataKey="solar" name="PV (kW)" stroke="#D59B2E" fill="#F3B33D" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 4. Enerji Akış Şeması */}
            <div className="space-y-2">
              <h4 className="font-bold text-[#182019] text-xs uppercase tracking-wide flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#1F5A43]" />
                <span>Bu Durağın Enerji Akış Şeması</span>
              </h4>
              <EnergyFlowDiagram />
            </div>
          </div>
        </BaseModal>
      )}
    </div>
  );
};

export default AdminStations;

import React, { useState } from 'react';
import {
  Zap,
  Plug,
  Wifi,
  ShieldCheck,
  AlertCircle,
  BarChart2,
  CheckCircle2,
  Power,
  Activity,
  Smartphone
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { AdminStation } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { MetricCard } from '../common/MetricCard';

interface AdminChargingProps {
  stations: AdminStation[];
}

export const AdminCharging: React.FC<AdminChargingProps> = ({ stations }) => {
  const [selectedStationId, setSelectedStationId] = useState<string>(stations[0]?.stationId || 'ST-KNY-01');

  const totalUsb = stations.reduce((acc, s) => acc + s.usbCPorts, 0);
  const totalOutlets = stations.reduce((acc, s) => acc + s.powerOutlets, 0);
  const totalQi = stations.filter((s) => s.wirelessCharging).length;
  const outOfServicePorts = stations.reduce((acc, s) => acc + (s.status === 'bakimda' ? s.usbCPorts + s.powerOutlets : 0), 0);

  // Günlük Saatlik Şarj Yükü Verisi (Simülasyon)
  const hourlyChargingData = [
    { hour: '06:00', usbKw: 0.2, outletKw: 0.1, qiKw: 0.05 },
    { hour: '08:00', usbKw: 0.9, outletKw: 0.4, qiKw: 0.2 },
    { hour: '11:00', usbKw: 1.4, outletKw: 0.6, qiKw: 0.3 },
    { hour: '14:00', usbKw: 1.8, outletKw: 0.8, qiKw: 0.35 },
    { hour: '17:00', usbKw: 2.1, outletKw: 0.9, qiKw: 0.4 },
    { hour: '20:00', usbKw: 1.5, outletKw: 0.5, qiKw: 0.25 },
    { hour: '22:00', usbKw: 0.6, outletKw: 0.2, qiKw: 0.1 },
  ];

  // Port Türü Kullanım Dağılımı Verisi
  const portDistributionData = [
    { name: 'USB-C Hızlı Şarj (45W)', value: 62, color: '#1F5A43' },
    { name: '220V Topraklı Priz', value: 26, color: '#D59B2E' },
    { name: 'Qi Kablosuz (15W)', value: 12, color: '#416D86' },
  ];

  const currentStation = stations.find((s) => s.stationId === selectedStationId) || stations[0];

  // Seçili durağın port bazlı mock dökümü
  const usbPortsList = Array.from({ length: currentStation?.usbCPorts || 4 }, (_, i) => ({
    id: `USB-${i + 1}`,
    name: `USB-C Port ${i + 1}`,
    type: 'USB-C PD (45W)',
    isActive: currentStation?.status !== 'bakimda',
    isOccupied: i % 2 === 0 && currentStation?.status === 'aktif',
    powerDrawW: i % 2 === 0 && currentStation?.status === 'aktif' ? 28 : 0,
    fault: false,
    overcurrentProtected: true,
  }));

  const powerOutletsList = Array.from({ length: currentStation?.powerOutlets || 2 }, (_, i) => ({
    id: `OUTLET-${i + 1}`,
    name: `220V AC Priz ${i + 1}`,
    type: '220V Schuko (Topraklı)',
    isActive: currentStation?.status !== 'bakimda',
    isOccupied: i === 0 && currentStation?.status === 'aktif',
    powerDrawW: i === 0 && currentStation?.status === 'aktif' ? 65 : 0,
    fault: false,
    overcurrentProtected: true,
  }));

  return (
    <div className="space-y-6">
      {/* 1. ÜST ÖZET METRİKLER */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <MetricCard
          title="Toplam USB-C Port"
          value={totalUsb}
          unit="Port"
          subtext="45W Power Delivery"
          icon={<Zap className="w-4 h-4 text-[#1F5A43]" />}
        />

        <MetricCard
          title="220V Topraklı Priz"
          value={totalOutlets}
          unit="Adet"
          subtext="Akıllı sigortalı"
          icon={<Plug className="w-4 h-4 text-[#D59B2E]" />}
        />

        <MetricCard
          title="Qi Kablosuz Şarj"
          value={totalQi}
          unit="Durakta"
          subtext="15W Hızlı Şarj Pad"
          icon={<Wifi className="w-4 h-4 text-[#416D86]" />}
        />

        <MetricCard
          title="Servis Dışı Portlar"
          value={outOfServicePorts}
          unit="Port"
          subtext="Bakım ve revizyon"
          icon={<AlertCircle className="w-4 h-4 text-[#B94040]" />}
          badge={
            <span className="text-[10px] text-[#5D665E]">
              {outOfServicePorts === 0 ? 'Tüm portlar aktif' : 'Meram Park bakımda'}
            </span>
          }
        />
      </div>

      {/* 2. ŞARJ KULLANIM GRAFİKLERİ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sol: Saatlik Güç Çekimi (kW) */}
        <div className="lg:col-span-8 bg-white border border-[#DDE1DA] rounded-2xl p-5 shadow-subtle space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#DDE1DA]">
            <div>
              <h3 className="text-sm font-bold text-[#182019] flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-[#1F5A43]" />
                <span>Saatlik Şarj Tüketimi & Port Yük Dağılımı (Simülasyon)</span>
              </h3>
              <p className="text-xs text-[#5D665E] mt-0.5">
                USB-C, 220V priz ve Qi ünitelerinin gün içindeki toplam güç çekimi (kW).
              </p>
            </div>
            <span className="text-[10px] bg-[#EFF0EB] text-[#5D665E] px-2.5 py-1 rounded-lg font-mono">
              Pik: 17:00 (3.4 kW)
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyChargingData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EFF0EB" />
                <XAxis dataKey="hour" tick={{ fontSize: 11, fill: '#5D665E' }} stroke="#DDE1DA" />
                <YAxis tick={{ fontSize: 11, fill: '#5D665E' }} stroke="#DDE1DA" />
                <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="usbKw" name="USB-C PD (kW)" fill="#1F5A43" stackId="a" radius={[0, 0, 0, 0]} />
                <Bar dataKey="outletKw" name="220V Priz (kW)" fill="#D59B2E" stackId="a" />
                <Bar dataKey="qiKw" name="Qi Kablosuz (kW)" fill="#416D86" stackId="a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sağ: Port Türü Dağılımı (Pie Chart) */}
        <div className="lg:col-span-4 bg-white border border-[#DDE1DA] rounded-2xl p-5 shadow-subtle flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-sm font-bold text-[#182019] pb-3 border-b border-[#DDE1DA]">
              Port Türü Kullanım Oranı (%)
            </h3>
            <div className="h-48 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={portDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {portDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-1.5 text-xs">
            {portDistributionData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-[#5D665E]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span>{item.name}</span>
                </div>
                <strong className="text-[#182019]">%{item.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. PORT BAZLI TELEMETRİ GÖRÜNÜMÜ */}
      <div className="bg-white border border-[#DDE1DA] rounded-2xl p-5 sm:p-6 shadow-subtle space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DDE1DA]">
          <div>
            <h3 className="text-sm font-bold text-[#182019] flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#1F5A43]" />
              <span>Durak Bazlı Port Sağlık & Anlık Güç Çekimi</span>
            </h3>
            <p className="text-xs text-[#5D665E] mt-0.5">
              İstasyon seçerek tek tek USB-C portlarını, 220V prizleri ve Qi durumunu inceleyin.
            </p>
          </div>

          {/* Durak Seçici */}
          <select
            value={selectedStationId}
            onChange={(e) => setSelectedStationId(e.target.value)}
            className="bg-[#F6F6F2] border border-[#DDE1DA] rounded-lg px-3 py-1.5 text-xs text-[#182019] font-semibold focus:outline-none focus:bg-white"
          >
            {stations.map((st) => (
              <option key={st.stationId} value={st.stationId}>
                {st.name} ({st.stationId})
              </option>
            ))}
          </select>
        </div>

        {/* Seçili Durak Port Listesi */}
        <div className="space-y-4">
          {/* USB-C Portları */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-[#182019] uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#1F5A43]" />
              <span>USB-C Hızlı Şarj Portları ({usbPortsList.length} Port)</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {usbPortsList.map((port) => (
                <div
                  key={port.id}
                  className={`p-3 rounded-xl border transition ${
                    !port.isActive
                      ? 'bg-[#FCECEC]/50 border-[#B94040]/30'
                      : port.isOccupied
                      ? 'bg-[#E5F0EA]/60 border-[#1F5A43]/40'
                      : 'bg-[#F6F6F2] border-[#DDE1DA]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-xs text-[#182019]">{port.name}</span>
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded font-semibold ${
                        !port.isActive
                          ? 'bg-[#B94040] text-white'
                          : port.isOccupied
                          ? 'bg-[#1F5A43] text-white'
                          : 'bg-[#EFF0EB] text-[#5D665E]'
                      }`}
                    >
                      {!port.isActive ? 'Servis Dışı' : port.isOccupied ? 'Şarjda' : 'Boşta'}
                    </span>
                  </div>

                  <div className="text-[11px] text-[#5D665E] space-y-0.5">
                    <div className="flex justify-between">
                      <span>Anlık Güç:</span>
                      <strong className="text-[#182019]">{port.powerDrawW} W</strong>
                    </div>
                    <div className="flex justify-between text-[10px]">
                      <span>Koruma:</span>
                      <span className="text-[#1F5A43] font-medium">Aşırı Akım OK</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 220V AC Prizler */}
          <div className="space-y-2 pt-2 border-t border-[#EFF0EB]">
            <h4 className="text-xs font-bold text-[#182019] uppercase tracking-wider flex items-center gap-1.5">
              <Plug className="w-3.5 h-3.5 text-[#D59B2E]" />
              <span>220V Topraklı AC Prizler ({powerOutletsList.length} Adet)</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {powerOutletsList.map((outlet) => (
                <div
                  key={outlet.id}
                  className={`p-3 rounded-xl border transition ${
                    !outlet.isActive
                      ? 'bg-[#FCECEC]/50 border-[#B94040]/30'
                      : outlet.isOccupied
                      ? 'bg-[#FBF2DD]/60 border-[#D59B2E]/40'
                      : 'bg-[#F6F6F2] border-[#DDE1DA]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-xs text-[#182019]">{outlet.name}</span>
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded font-semibold ${
                        !outlet.isActive
                          ? 'bg-[#B94040] text-white'
                          : outlet.isOccupied
                          ? 'bg-[#D59B2E] text-white'
                          : 'bg-[#EFF0EB] text-[#5D665E]'
                      }`}
                    >
                      {!outlet.isActive ? 'Servis Dışı' : outlet.isOccupied ? 'Kullanımda' : 'Boşta'}
                    </span>
                  </div>

                  <div className="text-[11px] text-[#5D665E] space-y-0.5">
                    <div className="flex justify-between">
                      <span>Anlık Güç:</span>
                      <strong className="text-[#182019]">{outlet.powerDrawW} W</strong>
                    </div>
                    <div className="flex justify-between text-[10px]">
                      <span>Kaçak Akım Rölesi:</span>
                      <span className="text-[#1F5A43] font-medium">Aktif</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Qi Kablosuz Şarj Pad */}
          <div className="p-3.5 rounded-xl bg-[#EFF0EB] border border-[#DDE1DA] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Wifi className="w-4 h-4 text-[#416D86]" />
              <div>
                <strong className="text-[#182019] block">Qi 15W Hızlı Kablosuz Şarj Alanı</strong>
                <span className="text-[11px] text-[#5D665E]">
                  Durum: {currentStation?.wirelessCharging ? 'Aktif ve Kullanıma Hazır' : 'Bu Durakta Yok'}
                </span>
              </div>
            </div>
            <span
              className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                currentStation?.wirelessCharging
                  ? 'bg-[#E5F0EA] text-[#1F5A43]'
                  : 'bg-[#FCECEC] text-[#B94040]'
              }`}
            >
              {currentStation?.wirelessCharging ? 'Normal (15W)' : 'Devre Dışı'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCharging;

import React, { useState } from 'react';
import {
  Sun,
  BatteryCharging,
  Zap,
  ArrowRight,
  TrendingUp,
  Info,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Activity,
  Cpu,
  BarChart2,
  Calendar
} from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  BarChart,
  LineChart,
  Area,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { AdminStation } from '../../types';
import { EnergyFlowDiagram } from '../common/EnergyFlowDiagram';

interface AdminEnergyProps {
  stations: AdminStation[];
  overview: any;
}

export const AdminEnergy: React.FC<AdminEnergyProps> = ({ stations, overview }) => {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly' | 'clean' | 'cycles'>('daily');

  const totalSolar = stations.reduce((acc, s) => acc + s.solarProductionKw, 0).toFixed(1);
  const totalLoad = stations.reduce((acc, s) => acc + s.instantConsumptionKw, 0).toFixed(1);
  const totalGridExport = stations.reduce((acc, s) => acc + s.gridFeedEnergyKwh, 0).toFixed(1);

  // Günlük Üretim ve Tüketim Zaman Serisi (Simülasyon)
  const dailyEnergyData = [
    { hour: '06:00', solarKw: 0.9, loadKw: 1.2, netKw: -0.3, batteryChargeKw: 0.4 },
    { hour: '08:00', solarKw: 2.8, loadKw: 1.6, netKw: 1.2, batteryChargeKw: 1.8 },
    { hour: '10:00', solarKw: 4.9, loadKw: 2.1, netKw: 2.8, batteryChargeKw: 3.2 },
    { hour: '12:00', solarKw: 6.2, loadKw: 2.8, netKw: 3.4, batteryChargeKw: 3.8 },
    { hour: '14:00', solarKw: 5.6, loadKw: 2.5, netKw: 3.1, batteryChargeKw: 3.4 },
    { hour: '16:00', solarKw: 3.9, loadKw: 2.3, netKw: 1.6, batteryChargeKw: 2.1 },
    { hour: '18:00', solarKw: 1.9, loadKw: 3.2, netKw: -1.3, batteryChargeKw: -1.2 },
    { hour: '20:00', solarKw: 0.0, loadKw: 2.4, netKw: -2.4, batteryChargeKw: -2.2 },
  ];

  // Haftalık Karşılaştırma Verisi (Son 7 Gün kWh)
  const weeklyEnergyData = [
    { day: 'Pzt', solarKwh: 41.2, loadKwh: 18.4, cleanRatio: 94 },
    { day: 'Sal', solarKwh: 38.6, loadKwh: 19.1, cleanRatio: 91 },
    { day: 'Çar', solarKwh: 44.5, loadKwh: 17.8, cleanRatio: 96 },
    { day: 'Per', solarKwh: 36.0, loadKwh: 20.2, cleanRatio: 88 },
    { day: 'Cum', solarKwh: 42.8, loadKwh: 18.0, cleanRatio: 95 },
    { day: 'Cmt', solarKwh: 40.4, loadKwh: 19.5, cleanRatio: 92 },
    { day: 'Paz', solarKwh: 43.1, loadKwh: 18.2, cleanRatio: 95 },
  ];

  // Aylık Toplam Üretim Trendi (kWh)
  const monthlyEnergyData = [
    { month: 'May', solarKwh: 1120, loadKwh: 520 },
    { month: 'Haz', solarKwh: 1340, loadKwh: 580 },
    { month: 'Tem', solarKwh: 1480, loadKwh: 610 },
    { month: 'Ağu', solarKwh: 1420, loadKwh: 600 },
    { month: 'Eyl', solarKwh: 1250, loadKwh: 560 },
    { month: 'Eki', solarKwh: 1180, loadKwh: 540 },
  ];

  return (
    <div className="space-y-6">
      {/* 1. ŞEBEKE ŞEFFAFLIK VE MEVZUAT NOTU */}
      <div className="p-4 bg-[#EFF0EB] border border-[#DDE1DA] rounded-2xl text-xs text-[#5D665E] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <Info className="w-4 h-4 text-[#1F5A43] shrink-0" />
          <span>
            <strong>Şebeke Etkileşimi Bildirimi:</strong> Şebeke aktarımı; ilgili mevzuat, dağıtım şirketi bağlantısı ve teknik uygunluğa bağlı planlanan bir özelliktir. Ana gelir modeli değildir.
          </span>
        </div>
        <span className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-white border border-[#DDE1DA] text-[#1F5A43] font-bold">
          EPDK / EDAŞ Planlaması
        </span>
      </div>

      {/* 2. UÇTAN UCA ENERJİ AKIŞ ŞEMASI */}
      <EnergyFlowDiagram />

      {/* 3. ENERJİ GRAFİKLERİ VE KORELASYONLAR */}
      <div className="bg-white border border-[#DDE1DA] rounded-2xl p-5 sm:p-6 shadow-subtle space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DDE1DA]">
          <div>
            <h3 className="text-sm font-bold text-[#182019] flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-[#1F5A43]" />
              <span>Enerji Üretim, Tüketim & Karşılama Grafikleri</span>
            </h3>
            <p className="text-xs text-[#5D665E] mt-0.5">
              Günlük güç eğrisi, haftalık enerji karşılaştırması ve temiz enerji karşılama oranları.
            </p>
          </div>

          {/* Grafik Sekmeleri */}
          <div className="flex items-center gap-1 bg-[#F6F6F2] p-1 rounded-lg border border-[#DDE1DA] text-xs">
            <button
              onClick={() => setActiveTab('daily')}
              className={`px-3 py-1 rounded-md font-medium transition ${
                activeTab === 'daily'
                  ? 'bg-white text-[#1F5A43] font-bold shadow-2xs border border-[#DDE1DA]'
                  : 'text-[#5D665E] hover:text-[#182019]'
              }`}
            >
              Günlük Profil
            </button>
            <button
              onClick={() => setActiveTab('weekly')}
              className={`px-3 py-1 rounded-md font-medium transition ${
                activeTab === 'weekly'
                  ? 'bg-white text-[#1F5A43] font-bold shadow-2xs border border-[#DDE1DA]'
                  : 'text-[#5D665E] hover:text-[#182019]'
              }`}
            >
              Haftalık Karşılaştırma
            </button>
            <button
              onClick={() => setActiveTab('monthly')}
              className={`px-3 py-1 rounded-md font-medium transition ${
                activeTab === 'monthly'
                  ? 'bg-white text-[#1F5A43] font-bold shadow-2xs border border-[#DDE1DA]'
                  : 'text-[#5D665E] hover:text-[#182019]'
              }`}
            >
              Aylık Toplam
            </button>
            <button
              onClick={() => setActiveTab('clean')}
              className={`px-3 py-1 rounded-md font-medium transition ${
                activeTab === 'clean'
                  ? 'bg-white text-[#1F5A43] font-bold shadow-2xs border border-[#DDE1DA]'
                  : 'text-[#5D665E] hover:text-[#182019]'
              }`}
            >
              Temiz Karşılama %
            </button>
          </div>
        </div>

        {/* Grafik Çizim Tuvali */}
        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            {activeTab === 'daily' ? (
              <ComposedChart data={dailyEnergyData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EFF0EB" />
                <XAxis dataKey="hour" tick={{ fontSize: 11, fill: '#5D665E' }} stroke="#DDE1DA" />
                <YAxis tick={{ fontSize: 11, fill: '#5D665E' }} stroke="#DDE1DA" />
                <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Area type="monotone" dataKey="solarKw" name="Güneş Üretimi (kW)" stroke="#D59B2E" fill="#F3B33D" fillOpacity={0.3} />
                <Line type="monotone" dataKey="loadKw" name="Yük Tüketimi (kW)" stroke="#1F5A43" strokeWidth={2.5} dot={{ r: 3 }} />
                <Bar dataKey="batteryChargeKw" name="Batarya Şarj/Deşarj (kW)" fill="#416D86" opacity={0.7} />
              </ComposedChart>
            ) : activeTab === 'weekly' ? (
              <ComposedChart data={weeklyEnergyData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EFF0EB" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#5D665E' }} stroke="#DDE1DA" />
                <YAxis tick={{ fontSize: 11, fill: '#5D665E' }} stroke="#DDE1DA" />
                <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="solarKwh" name="Güneş Üretimi (kWh)" fill="#D59B2E" radius={[4, 4, 0, 0]} />
                <Bar dataKey="loadKwh" name="Yük Tüketimi (kWh)" fill="#1F5A43" radius={[4, 4, 0, 0]} />
              </ComposedChart>
            ) : activeTab === 'monthly' ? (
              <BarChart data={monthlyEnergyData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EFF0EB" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#5D665E' }} stroke="#DDE1DA" />
                <YAxis tick={{ fontSize: 11, fill: '#5D665E' }} stroke="#DDE1DA" />
                <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="solarKwh" name="Aylık Güneş (kWh)" fill="#D59B2E" radius={[4, 4, 0, 0]} />
                <Bar dataKey="loadKwh" name="Aylık Tüketim (kWh)" fill="#416D86" radius={[4, 4, 0, 0]} />
              </BarChart>
            ) : (
              <LineChart data={weeklyEnergyData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EFF0EB" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#5D665E' }} stroke="#DDE1DA" />
                <YAxis domain={[70, 100]} tick={{ fontSize: 11, fill: '#5D665E' }} stroke="#DDE1DA" />
                <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Line type="monotone" dataKey="cleanRatio" name="Temiz Enerji Karşılama Oranı (%)" stroke="#1F5A43" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* 4. DURAK BAZLI ENERJİ KARTLARI */}
      <div className="bg-white border border-[#DDE1DA] rounded-2xl p-5 sm:p-6 shadow-subtle space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#DDE1DA]">
          <h4 className="text-sm font-bold text-[#182019]">
            Durak Bazlı Detaylı Enerji & Güç Kartları
          </h4>
          <span className="text-xs text-[#5D665E]">Toplam 6 İstasyon</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stations.map((st) => {
            const netPower = (st.solarProductionKw - st.instantConsumptionKw).toFixed(1);
            const isCharging = parseFloat(netPower) > 0;
            const batteryStatus = isCharging ? 'Şarj Ediliyor (+Net Güç)' : 'Deşarj Ediliyor';
            const dailyGeneratedKwh = (st.solarProductionKw * 4.8).toFixed(1);
            const dailyConsumedKwh = (st.instantConsumptionKw * 14).toFixed(1);

            return (
              <div
                key={st.stationId}
                className="p-4 rounded-xl border border-[#DDE1DA] bg-[#F6F6F2] hover:bg-white hover:shadow-subtle transition space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-mono text-[10px] text-[#5D665E] block">{st.stationId}</span>
                    <h5 className="font-bold text-xs text-[#182019] truncate">{st.name}</h5>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                      isCharging ? 'bg-[#E5F0EA] text-[#1F5A43]' : 'bg-[#FFF9EC] text-[#925C08]'
                    }`}
                  >
                    {batteryStatus}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-[#DDE1DA]">
                  <div>
                    <span className="text-[#5D665E] text-[10px] block">Anlık PV</span>
                    <strong className="text-[#D59B2E] text-sm tabular-nums">
                      {st.solarProductionKw} kW
                    </strong>
                  </div>
                  <div>
                    <span className="text-[#5D665E] text-[10px] block">Anlık Yük</span>
                    <strong className="text-[#182019] text-sm tabular-nums">
                      {st.instantConsumptionKw} kW
                    </strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-[#5D665E]">
                  <div>
                    <span>Günlük Üretim:</span>
                    <strong className="text-[#182019] block">{dailyGeneratedKwh} kWh</strong>
                  </div>
                  <div>
                    <span>Günlük Tüketim:</span>
                    <strong className="text-[#182019] block">{dailyConsumedKwh} kWh</strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#DDE1DA] flex items-center justify-between text-[11px]">
                  <span className="text-[#5D665E]">Temiz Karşılama:</span>
                  <span className="font-bold text-[#1F5A43]">%{st.dailyCleanEnergyRatio}</span>
                </div>

                <div className="text-[10px] text-[#5D665E] truncate">
                  İnverter: {st.adminOnly?.inverterStatus || 'Aktif Senkron'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminEnergy;

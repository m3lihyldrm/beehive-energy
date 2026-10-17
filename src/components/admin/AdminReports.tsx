import React, { useState, useMemo } from 'react';
import {
  FileText,
  Download,
  Calendar,
  Filter,
  BarChart3,
  Battery,
  Wrench,
  Leaf,
  MessageSquare,
  FileSpreadsheet,
  Printer,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { AdminStation, FeedbackSubmission } from '../../types';
import { DateRangePicker, DateRange } from '../common/DateRangePicker';
import { ExportButton } from '../common/ExportButton';
import { DataTable, Column } from '../common/DataTable';

interface AdminReportsProps {
  stations: AdminStation[];
  feedbacks?: FeedbackSubmission[];
}

export type ReportType =
  | 'daily_energy'
  | 'weekly_perf'
  | 'battery_health'
  | 'maintenance'
  | 'co2_impact'
  | 'feedback';

export const AdminReports: React.FC<AdminReportsProps> = ({ stations, feedbacks = [] }) => {
  const [selectedReport, setSelectedReport] = useState<ReportType>('daily_energy');
  const [selectedStationId, setSelectedStationId] = useState<string>('all');
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: '2026-10-11',
    endDate: '2026-10-17',
    preset: '7d',
  });

  const reportTypes = [
    { id: 'daily_energy' as ReportType, label: 'Günlük Enerji Raporu', icon: BarChart3, desc: 'Günlük PV üretimi, yük ve şebeke etkileşimi' },
    { id: 'weekly_perf' as ReportType, label: 'Haftalık Performans', icon: Calendar, desc: 'Haftalık durak bazlı temiz enerji karşılama oranları' },
    { id: 'battery_health' as ReportType, label: 'Batarya Sağlığı (SOH/SOC)', icon: Battery, desc: 'İkinci yaşam hücre sıcaklık, dengesizlik ve döngü dökümü' },
    { id: 'maintenance' as ReportType, label: 'Bakım & Servis Kayıtları', icon: Wrench, desc: 'Periyodik kontroller, kabin kilit ve parça durumları' },
    { id: 'co2_impact' as ReportType, label: 'CO2 & Çevresel Etki', icon: Leaf, desc: 'Önlenen sera gazı emisyonu ve döngüsel ekonomi verisi' },
    { id: 'feedback' as ReportType, label: 'Geri Bildirim Özeti', icon: MessageSquare, desc: 'Vatandaş durak sorun bildirimleri ve çözüm süreleri' },
  ];

  // 1. Günlük Enerji Raporu Verisi
  const dailyEnergyRows = useMemo(() => {
    return [
      { date: '2026-10-17', station: 'Konya Pilot Ağı (6 Durak)', pvKw: 24.9, loadKw: 11.2, cleanRatio: '%95', gridKwh: 85.7 },
      { date: '2026-10-16', station: 'Konya Pilot Ağı (6 Durak)', pvKw: 23.8, loadKw: 10.9, cleanRatio: '%92', gridKwh: 78.4 },
      { date: '2026-10-15', station: 'Konya Pilot Ağı (6 Durak)', pvKw: 25.1, loadKw: 11.5, cleanRatio: '%96', gridKwh: 91.2 },
      { date: '2026-10-14', station: 'Konya Pilot Ağı (6 Durak)', pvKw: 21.4, loadKw: 11.0, cleanRatio: '%88', gridKwh: 64.5 },
      { date: '2026-10-13', station: 'Konya Pilot Ağı (6 Durak)', pvKw: 26.2, loadKw: 10.8, cleanRatio: '%97', gridKwh: 98.0 },
      { date: '2026-10-12', station: 'Konya Pilot Ağı (6 Durak)', pvKw: 22.9, loadKw: 11.4, cleanRatio: '%91', gridKwh: 72.8 },
      { date: '2026-10-11', station: 'Konya Pilot Ağı (6 Durak)', pvKw: 24.3, loadKw: 11.1, cleanRatio: '%94', gridKwh: 84.1 },
    ];
  }, []);

  // 2. Haftalık Performans Rapor Verisi
  const weeklyPerfRows = useMemo(() => {
    return stations.map((st) => ({
      stationId: st.stationId,
      stationName: st.name,
      status: st.status,
      weeklyProductionKwh: (st.solarProductionKw * 33.6).toFixed(1),
      weeklyConsumptionKwh: (st.instantConsumptionKw * 85).toFixed(1),
      avgCleanRatio: `%${st.dailyCleanEnergyRatio}`,
      uptimePercent: st.status === 'aktif' ? '%99.8' : st.status === 'sinirli' ? '%96.2' : '%84.0',
    }));
  }, [stations]);

  // 3. Batarya Sağlığı Rapor Verisi
  const batteryHealthRows = useMemo(() => {
    return stations.map((st) => ({
      stationId: st.stationId,
      stationName: st.name,
      moduleId: st.adminOnly?.moduleId || 'MOD-KNY-01',
      chemistry: st.adminOnly?.chemistryType || 'LFP',
      soh: `%${st.adminOnly?.sohRaw || 85}`,
      soc: `%${st.adminOnly?.socRaw || 75}`,
      cycleCount: st.adminOnly?.cycleCount || 500,
      maxCellTemp: `${Math.max(...(st.adminOnly?.cellTemperatures || [22]))}°C`,
      bmsStatus: st.adminOnly?.bmsStatus || 'NORMAL',
    }));
  }, [stations]);

  // 4. Bakım Rapor Verisi
  const maintenanceRows = useMemo(() => {
    return stations.map((st) => ({
      stationId: st.stationId,
      stationName: st.name,
      lastDate: st.adminOnly?.lastMaintenanceDate || '2026-08-15',
      nextScheduled: '2026-11-15',
      cabinetDoor: st.adminOnly?.cabinetDoorStatus || 'Kilitli',
      fireSafety: 'EI60 / Aerosol Hazır',
      filterStatus: 'Temiz (%90 Hava Geçirgenliği)',
      engineerNote: st.adminOnly?.technicalDiagnostics?.slice(0, 50) + '...',
    }));
  }, [stations]);

  // 5. CO2 & Etki Rapor Verisi
  const co2ImpactRows = useMemo(() => {
    return [
      { metric: 'Güneşten Üretilen Toplam Enerji', value: '42.8 kWh / gün', annualEquivalent: '15.620 kWh / yıl' },
      { metric: 'Önlenen Tahmini CO2 Salımı', value: '20.5 kg CO2e / gün', annualEquivalent: '7.480 kg CO2e / yıl' },
      { metric: 'Döngüsel İkinci Yaşam EV Batarya', value: '6 Modül (240 kWh)', annualEquivalent: 'Sıfır Yeni Lityum Madenciliği' },
      { metric: 'Kamusal Ücretsiz Şarj Seansları', value: '142 seans / gün', annualEquivalent: '~51.800 seans / yıl' },
      { metric: 'Şebekeye Verilebilecek Temiz Fazla', value: '22.8 kWh / gün (Planlanan)', annualEquivalent: '8.320 kWh / yıl' },
    ];
  }, []);

  // 6. Geri Bildirim Rapor Verisi
  const feedbackRows = useMemo(() => {
    return feedbacks.map((fb) => ({
      feedbackId: fb.feedbackId,
      stationId: fb.stationId,
      stationName: fb.stationName || fb.stationId,
      issueType: fb.issueType,
      date: new Date(fb.createdAt).toLocaleDateString('tr-TR'),
      status: fb.status,
    }));
  }, [feedbacks]);

  // Aktif Veri ve Kolonlar
  const { currentData, currentColumns, filename } = useMemo(() => {
    switch (selectedReport) {
      case 'daily_energy':
        return {
          currentData: dailyEnergyRows,
          filename: 'beehive-gunluk-enerji-raporu',
          currentColumns: [
            { key: 'date', header: 'Tarih', sortable: true },
            { key: 'station', header: 'Kapsam' },
            { key: 'pvKw', header: 'Pik PV (kW)', sortable: true },
            { key: 'loadKw', header: 'Yük (kW)', sortable: true },
            { key: 'cleanRatio', header: 'Temiz Oran %', sortable: true },
            { key: 'gridKwh', header: 'Şebeke Aktarım (kWh)', sortable: true },
          ],
        };
      case 'weekly_perf':
        return {
          currentData: weeklyPerfRows,
          filename: 'beehive-haftalik-performans',
          currentColumns: [
            { key: 'stationId', header: 'Kod', sortable: true },
            { key: 'stationName', header: 'Durak Adı', sortable: true },
            { key: 'weeklyProductionKwh', header: 'Haftalık PV (kWh)', sortable: true },
            { key: 'weeklyConsumptionKwh', header: 'Haftalık Yük (kWh)', sortable: true },
            { key: 'avgCleanRatio', header: 'Temiz Oran %', sortable: true },
            { key: 'uptimePercent', header: 'Hizmet Süresi', sortable: true },
          ],
        };
      case 'battery_health':
        return {
          currentData: batteryHealthRows,
          filename: 'beehive-batarya-sagligi',
          currentColumns: [
            { key: 'moduleId', header: 'Modül ID', sortable: true },
            { key: 'stationName', header: 'Durak', sortable: true },
            { key: 'chemistry', header: 'Kimya' },
            { key: 'soh', header: 'SOH Sağlık', sortable: true },
            { key: 'soc', header: 'SOC Doluluk', sortable: true },
            { key: 'cycleCount', header: 'Döngü Sayısı', sortable: true },
            { key: 'maxCellTemp', header: 'Maks Sıcaklık' },
            { key: 'bmsStatus', header: 'BMS Durumu' },
          ],
        };
      case 'maintenance':
        return {
          currentData: maintenanceRows,
          filename: 'beehive-bakim-raporu',
          currentColumns: [
            { key: 'stationId', header: 'Durak Kodu' },
            { key: 'stationName', header: 'Durak Adı' },
            { key: 'lastDate', header: 'Son Bakım', sortable: true },
            { key: 'nextScheduled', header: 'Sonraki Kontrol' },
            { key: 'cabinetDoor', header: 'Kabin Kilidi' },
            { key: 'fireSafety', header: 'Yangın Bariyeri' },
            { key: 'filterStatus', header: 'Filtre' },
          ],
        };
      case 'co2_impact':
        return {
          currentData: co2ImpactRows,
          filename: 'beehive-co2-surdurulebilirlik',
          currentColumns: [
            { key: 'metric', header: 'Çevresel Etki Parametresi' },
            { key: 'value', header: 'Pilot Günlük Değer' },
            { key: 'annualEquivalent', header: 'Yıllık Projeksiyon' },
          ],
        };
      case 'feedback':
      default:
        return {
          currentData: feedbackRows,
          filename: 'beehive-geri-bildirim-raporu',
          currentColumns: [
            { key: 'feedbackId', header: 'Takip No' },
            { key: 'stationName', header: 'Durak' },
            { key: 'issueType', header: 'Kategori' },
            { key: 'date', header: 'Tarih', sortable: true },
            { key: 'status', header: 'Durum' },
          ],
        };
    }
  }, [selectedReport, dailyEnergyRows, weeklyPerfRows, batteryHealthRows, maintenanceRows, co2ImpactRows, feedbackRows]);

  return (
    <div className="space-y-6">
      {/* 1. ÜST RAPOR MENÜSÜ & SEÇİM ALANI */}
      <div className="bg-white border border-[#DDE1DA] rounded-2xl p-5 sm:p-6 shadow-subtle space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#DDE1DA]">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-[#182019] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#1F5A43]" />
              <span>İşletme Raporlama & Veri Dışa Aktarma Merkezi</span>
            </h3>
            <p className="text-xs text-[#5D665E] mt-0.5">
              Enerji, performans, batarya sağlığı, bakım ve karbon tasarrufu raporlarını üretin ve indirin.
            </p>
          </div>

          {/* Dışa Aktar Butonu (CSV, JSON, Yazdır/PDF) */}
          <ExportButton
            data={currentData}
            filename={filename}
            title="Raporu Dışa Aktar"
          />
        </div>

        {/* 6 Rapor Türü Kartları Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {reportTypes.map((rt) => {
            const Icon = rt.icon;
            const isSelected = selectedReport === rt.id;
            return (
              <button
                key={rt.id}
                type="button"
                onClick={() => setSelectedReport(rt.id)}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#1F5A43] bg-[#E5F0EA]/50 ring-1 ring-[#1F5A43]/30 shadow-2xs'
                    : 'border-[#DDE1DA] bg-[#F6F6F2] hover:bg-white text-[#5D665E]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-[#1F5A43]' : 'text-[#5D665E]'}`} />
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#1F5A43]" />}
                </div>
                <div>
                  <div className={`text-xs font-bold leading-tight ${isSelected ? 'text-[#182019]' : 'text-[#5D665E]'}`}>
                    {rt.label}
                  </div>
                  <div className="text-[10px] text-[#5D665E] mt-1 line-clamp-1">{rt.desc}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Filtre ve Tarih Seçici Çubuğu */}
        <div className="pt-3 border-t border-[#EFF0EB] flex flex-wrap items-center justify-between gap-3">
          <DateRangePicker value={dateRange} onChange={setDateRange} />

          {/* Durak Seçici */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-[#5D665E]">Kapsam:</span>
            <select
              value={selectedStationId}
              onChange={(e) => setSelectedStationId(e.target.value)}
              className="bg-[#F6F6F2] border border-[#DDE1DA] rounded-lg px-2.5 py-1 text-xs text-[#182019] focus:outline-none focus:bg-white"
            >
              <option value="all">Tüm Pilot Durakları (6 Durak)</option>
              {stations.map((st) => (
                <option key={st.stationId} value={st.stationId}>
                  {st.name} ({st.stationId})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 2. TABLO VERİ GÖRÜNÜMÜ */}
      <DataTable
        columns={currentColumns as any}
        data={currentData as any}
        searchPlaceholder="Rapor satırlarında ara..."
        pageSize={10}
      />
    </div>
  );
};

export default AdminReports;

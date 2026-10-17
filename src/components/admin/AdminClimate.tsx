import React from 'react';
import {
  Thermometer,
  Wind,
  CloudRain,
  Snowflake,
  CheckCircle2,
  AlertCircle,
  Shield,
  Activity,
  Layers,
  Sun
} from 'lucide-react';
import { AdminStation } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { MetricCard } from '../common/MetricCard';

interface AdminClimateProps {
  stations: AdminStation[];
}

export const AdminClimate: React.FC<AdminClimateProps> = ({ stations }) => {
  const outdoorRefTemp = 19.5; // Konya dış ortam referans sıcaklığı

  const avgIndoorTemp = (
    stations.reduce((acc, s) => acc + s.indoorTemperature, 0) / (stations.length || 1)
  ).toFixed(1);

  const avgIndoorHumidity = Math.round(
    stations.reduce((acc, s) => acc + s.indoorHumidity, 0) / (stations.length || 1)
  );

  return (
    <div className="space-y-6">
      {/* 1. ÜST ÖZET METRİK KARTLARI */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <MetricCard
          title="Ort. Durak İçi Sıcaklık"
          value={`${avgIndoorTemp} °C`}
          subtext="Yolcu bekleme alanı"
          icon={<Thermometer className="w-4 h-4 text-[#416D86]" />}
        />

        <MetricCard
          title="Dış Ortam Referansı"
          value={`${outdoorRefTemp} °C`}
          subtext="Konya anlık meteoroloji"
          icon={<Sun className="w-4 h-4 text-[#D59B2E]" />}
        />

        <MetricCard
          title="Ortalama Bağıl Nem"
          value={`%${avgIndoorHumidity}`}
          subtext="İdeal konfor aralığı (%35-50)"
          icon={<CloudRain className="w-4 h-4 text-[#416D86]" />}
        />

        <MetricCard
          title="HVAC Enerji Optimizasyonu"
          value="Eco Modu"
          subtext="Termostatik akıllı kontrol"
          icon={<Snowflake className="w-4 h-4 text-[#1F5A43]" />}
          highlight={true}
        />
      </div>

      {/* 2. DURAK BAZLI İKLİM & KABİN TELEMETRİSİ */}
      <div className="bg-white border border-[#DDE1DA] rounded-2xl p-5 sm:p-6 shadow-subtle space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DDE1DA]">
          <div>
            <h3 className="text-sm font-bold text-[#182019] flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-[#416D86]" />
              <span>Durak Bekleme Alanı & Güvenli Kabin İklimlendirme Telemetrisi</span>
            </h3>
            <p className="text-xs text-[#5D665E] mt-0.5">
              Yolcu konfor alanı, harici enerji kabini sıcaklığı, cebri havalandırma ve dış sıcaklık farkı (ΔT).
            </p>
          </div>
          <span className="text-[11px] text-[#5D665E] bg-[#F6F6F2] px-3 py-1 rounded-lg border border-[#DDE1DA]">
            Sensör Ağı · Simülasyon Telemetrisi
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stations.map((st) => {
            const tempDiff = (st.indoorTemperature - outdoorRefTemp).toFixed(1);
            const isWarmer = parseFloat(tempDiff) > 0;
            const cabinetTemp =
              st.adminOnly?.energyCabinetDetails?.internalTemperature ||
              st.adminOnly?.cellTemperatures?.[0] ||
              22.4;
            const ventilationStatus =
              st.adminOnly?.energyCabinetDetails?.ventilationStatus ||
              'Akıllı Termostatik Cebri Fan (%40)';

            return (
              <div
                key={st.stationId}
                className="bg-[#F6F6F2] border border-[#DDE1DA] rounded-xl p-4 space-y-3.5 hover:bg-white hover:shadow-subtle transition"
              >
                {/* Durak Başlığı */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#182019] truncate">{st.name}</h4>
                    <span className="text-[10px] font-mono text-[#5D665E]">{st.stationId}</span>
                  </div>
                  <StatusBadge status={st.status} size="sm" />
                </div>

                {/* 1. Bekleme Alanı Metrikleri */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 rounded-lg bg-white border border-[#DDE1DA]">
                    <span className="text-[10px] text-[#5D665E] block">Bekleme Alanı</span>
                    <span className="text-sm font-bold text-[#182019] tabular-nums mt-0.5 block">
                      {st.indoorTemperature} °C
                    </span>
                    <span className="text-[9px] text-[#5D665E] block">
                      Δ {isWarmer ? `+${tempDiff}` : tempDiff} °C
                    </span>
                  </div>

                  <div className="p-2 rounded-lg bg-white border border-[#DDE1DA]">
                    <span className="text-[10px] text-[#5D665E] block">Bağıl Nem</span>
                    <span className="text-sm font-bold text-[#416D86] tabular-nums mt-0.5 block">
                      %{st.indoorHumidity}
                    </span>
                    <span className="text-[9px] text-[#1F5A43] block">Normal</span>
                  </div>

                  <div className="p-2 rounded-lg bg-white border border-[#DDE1DA]">
                    <span className="text-[10px] text-[#5D665E] block">Hava (AQI)</span>
                    <span className="text-xs font-bold text-[#1F5A43] mt-1 block truncate">
                      {st.airQuality.split('(')[0].trim() || 'İyi'}
                    </span>
                    <span className="text-[9px] text-[#5D665E] block">PM2.5 Filtreli</span>
                  </div>
                </div>

                {/* 2. Harici Güvenli Enerji Kabini İklimi */}
                <div className="p-2.5 rounded-lg bg-white border border-[#DDE1DA] space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between font-semibold text-[#182019]">
                    <span className="flex items-center gap-1.5 text-[#1F5A43]">
                      <Shield className="w-3.5 h-3.5" />
                      <span>Güvenli Kabin Sıcaklığı:</span>
                    </span>
                    <span className="tabular-nums font-bold text-[#1F5A43]">{cabinetTemp} °C</span>
                  </div>
                  <div className="text-[10px] text-[#5D665E] truncate">
                    <strong>Havalandırma:</strong> {ventilationStatus}
                  </div>
                </div>

                {/* 3. HVAC Modu */}
                <div className="p-2 rounded-lg bg-[#EFF0EB] text-[11px] text-[#5D665E] flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Snowflake className="w-3.5 h-3.5 text-[#416D86]" />
                    <span>Isıtma / Soğutma Modu:</span>
                  </span>
                  <strong className="text-[#182019] truncate max-w-[140px]">{st.hvacStatus}</strong>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminClimate;

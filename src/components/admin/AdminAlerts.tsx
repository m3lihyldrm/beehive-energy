import React, { useState, useMemo } from 'react';
import {
  AlertTriangle,
  Download,
  CheckCircle,
  Clock,
  FileSpreadsheet,
  CheckCheck,
  ShieldAlert,
  Filter,
  Info,
  Calendar,
  Layers
} from 'lucide-react';
import { AdminAlert, EventLog } from '../../types';
import { StatusBadge } from '../common/StatusBadge';

interface AdminAlertsProps {
  alerts: AdminAlert[];
  eventLogs?: EventLog[];
}

export const AdminAlerts: React.FC<AdminAlertsProps> = ({ alerts: initialAlerts, eventLogs = [] }) => {
  const [alerts, setAlerts] = useState<AdminAlert[]>(initialAlerts);
  const [readAlertIds, setReadAlertIds] = useState<Set<string>>(new Set());

  // Filtre durumları
  const [stationFilter, setStationFilter] = useState<string>('all');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [readFilter, setReadFilter] = useState<'all' | 'unread' | 'read'>('all');

  const uniqueStations = useMemo(() => {
    const map = new Map<string, string>();
    alerts.forEach((a) => {
      if (a.stationId) map.set(a.stationId, a.stationName || a.stationId);
    });
    return Array.from(map.entries());
  }, [alerts]);

  const filteredAlerts = useMemo(() => {
    return alerts.filter((a) => {
      if (stationFilter !== 'all' && a.stationId !== stationFilter) return false;
      if (levelFilter !== 'all' && a.level !== levelFilter) return false;
      const isRead = readAlertIds.has(a.id);
      if (readFilter === 'unread' && isRead) return false;
      if (readFilter === 'read' && !isRead) return false;
      return true;
    });
  }, [alerts, stationFilter, levelFilter, readFilter, readAlertIds]);

  const handleMarkAsRead = (id: string) => {
    setReadAlertIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const handleMarkAllAsRead = () => {
    setReadAlertIds(new Set(alerts.map((a) => a.id)));
  };

  const handleDownloadCsv = () => {
    const headers = ['Uyarı ID', 'Düzey', 'Durak Adı', 'Durak Kodu', 'Zaman Damgası', 'Mesaj', 'Okundu Durumu'];
    const rows = filteredAlerts.map((a) => [
      a.id,
      a.level,
      `"${a.stationName || ''}"`,
      a.stationId || '',
      a.timestamp,
      `"${a.message.replace(/"/g, '""')}"`,
      readAlertIds.has(a.id) ? 'Okundu' : 'Yeni',
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `beehive_uyarilar_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* 1. ÜST PANEL & FİLTRELER */}
      <div className="bg-white border border-[#DDE1DA] rounded-2xl p-5 sm:p-6 shadow-subtle space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DDE1DA]">
          <div>
            <h3 className="text-sm font-bold text-[#182019] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#B94040]" />
              <span>Sistem ve Telemetri Uyarıları</span>
            </h3>
            <p className="text-xs text-[#5D665E] mt-0.5">
              Sensör eşik değerleri, BMS koruma modları ve kabin alarmları.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleMarkAllAsRead}
              className="px-3 py-1.5 rounded-lg border border-[#DDE1DA] hover:bg-[#F6F6F2] text-xs font-medium text-[#182019] transition flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCheck className="w-3.5 h-3.5 text-[#1F5A43]" />
              <span>Tümünü Okundu İşaretle</span>
            </button>

            <button
              onClick={handleDownloadCsv}
              className="px-3 py-1.5 rounded-lg bg-[#E5F0EA] hover:bg-[#D4E8DC] text-xs font-semibold text-[#1F5A43] transition flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>CSV Olarak İndir</span>
            </button>
          </div>
        </div>

        {/* Filtre Barı */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {/* Durak Filtresi */}
          <div className="space-y-1 text-xs">
            <span className="text-[#5D665E] font-medium">Durak Seçimi:</span>
            <select
              value={stationFilter}
              onChange={(e) => setStationFilter(e.target.value)}
              className="w-full bg-[#F6F6F2] border border-[#DDE1DA] rounded-lg px-2.5 py-1.5 text-xs text-[#182019] focus:outline-none focus:bg-white"
            >
              <option value="all">Tüm Duraklar ({uniqueStations.length})</option>
              {uniqueStations.map(([id, name]) => (
                <option key={id} value={id}>
                  {name} ({id})
                </option>
              ))}
            </select>
          </div>

          {/* Uyarı Düzeyi Filtresi */}
          <div className="space-y-1 text-xs">
            <span className="text-[#5D665E] font-medium">Uyarı Seviyesi:</span>
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="w-full bg-[#F6F6F2] border border-[#DDE1DA] rounded-lg px-2.5 py-1.5 text-xs text-[#182019] focus:outline-none focus:bg-white"
            >
              <option value="all">Tüm Seviyeler</option>
              <option value="critical">Kritik</option>
              <option value="warning">Uyarı</option>
              <option value="info">Bilgi</option>
            </select>
          </div>

          {/* Okundu Durumu Filtresi */}
          <div className="space-y-1 text-xs">
            <span className="text-[#5D665E] font-medium">Okunma Durumu:</span>
            <select
              value={readFilter}
              onChange={(e) => setReadFilter(e.target.value as any)}
              className="w-full bg-[#F6F6F2] border border-[#DDE1DA] rounded-lg px-2.5 py-1.5 text-xs text-[#182019] focus:outline-none focus:bg-white"
            >
              <option value="all">Tümü</option>
              <option value="unread">Yalnızca Okunmamış</option>
              <option value="read">Yalnızca Okunmuş</option>
            </select>
          </div>
        </div>

        {/* 2. UYARI LİSTESİ */}
        <div className="space-y-3 pt-2">
          {filteredAlerts.length === 0 ? (
            <div className="text-center py-8 text-xs text-[#5D665E]">
              Filtre kriterlerine uygun telemetri uyarısı bulunmamaktadır.
            </div>
          ) : (
            filteredAlerts.map((alert) => {
              const isRead = readAlertIds.has(alert.id);
              const isCritical = alert.level === 'critical';
              const isWarning = alert.level === 'warning';

              return (
                <div
                  key={alert.id}
                  className={`border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                    isRead
                      ? 'bg-[#FAFAFA] border-[#DDE1DA] opacity-75'
                      : isCritical
                      ? 'bg-[#FFFDFD] border-[#B94040]/30 shadow-2xs'
                      : isWarning
                      ? 'bg-[#FFFDF7] border-[#D59B2E]/30 shadow-2xs'
                      : 'bg-white border-[#DDE1DA]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        isCritical
                          ? 'bg-[#FCECEC] text-[#B94040]'
                          : isWarning
                          ? 'bg-[#FFF7E6] text-[#D59B2E]'
                          : 'bg-[#EFF0EB] text-[#5D665E]'
                      }`}
                    >
                      <AlertTriangle className="w-4 h-4" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap text-xs">
                        <span className="font-bold text-[#182019]">{alert.stationName}</span>
                        <span className="font-mono text-[10px] text-[#5D665E]">({alert.stationId})</span>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.2 rounded-full uppercase ${
                            isCritical
                              ? 'bg-[#FCECEC] text-[#B94040]'
                              : isWarning
                              ? 'bg-[#FFF7E6] text-[#B7791F]'
                              : 'bg-[#EFF0EB] text-[#5D665E]'
                          }`}
                        >
                          {isCritical ? 'Kritik' : isWarning ? 'Uyarı' : 'Bilgi'}
                        </span>
                        {isRead && (
                          <span className="text-[10px] text-[#5D665E] italic">· Okundu</span>
                        )}
                      </div>

                      <p className="text-xs text-[#182019] leading-relaxed">{alert.message}</p>

                      <div className="flex items-center gap-1.5 text-[10px] text-[#5D665E]">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(alert.timestamp).toLocaleString('tr-TR')}</span>
                      </div>
                    </div>
                  </div>

                  {!isRead && (
                    <button
                      onClick={() => handleMarkAsRead(alert.id)}
                      className="px-3 py-1.5 rounded-lg border border-[#DDE1DA] hover:bg-[#F6F6F2] text-xs font-semibold text-[#1F5A43] transition shrink-0 self-end sm:self-center cursor-pointer flex items-center gap-1"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Okundu İşaretle</span>
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* 3. SİSTEM OLAY GÜNLÜĞÜ (KRONOLOJİK AUDIT TRAIL) */}
      {eventLogs.length > 0 && (
        <div className="bg-white border border-[#DDE1DA] rounded-2xl p-5 shadow-subtle space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#DDE1DA]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#182019] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#1F5A43]" />
              <span>Sistem Kronolojik Olay Günlüğü (Audit Trail)</span>
            </h4>
            <span className="text-[10px] text-[#5D665E]">Toplam {eventLogs.length} Olay</span>
          </div>

          <div className="divide-y divide-[#EFF0EB] text-xs">
            {eventLogs.map((log) => (
              <div key={log.id} className="py-2.5 flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-xs font-medium text-[#182019]">{log.message}</span>
                  <span className="block text-[10px] text-[#5D665E]">
                    {new Date(log.timestamp).toLocaleString('tr-TR')} · Tip: {log.type}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[#5D665E] bg-[#F6F6F2] px-2 py-0.5 rounded border border-[#DDE1DA]">
                  {log.id}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAlerts;

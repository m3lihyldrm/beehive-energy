import React from 'react';
import {
  Activity,
  Compass,
  Battery,
  Sun,
  Thermometer,
  Zap,
  CheckCircle2,
  AlertTriangle,
  MessageSquare,
  FileText,
  Settings,
  LogOut,
  RefreshCw,
  MapPin,
  CheckCircle,
  XCircle,
  Play,
  Pause
} from 'lucide-react';
import { BeeHiveLogo } from '../BeeHiveLogo';

export type AdminTab =
  | 'overview'
  | 'stations'
  | 'batteries'
  | 'energy'
  | 'climate'
  | 'charging'
  | 'ai'
  | 'alerts'
  | 'feedback'
  | 'reports'
  | 'settings';

interface AdminLayoutProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  onLogout: () => void;
  onBackToPublic?: () => void;
  onRefresh: () => void;
  isLoading: boolean;
  lastUpdatedTime: string;
  actionSuccessMessage: string | null;
  onClearActionSuccess: () => void;
  alertCount?: number;
  recommendationCount?: number;
  feedbackCount?: number;
  autoRefreshEnabled?: boolean;
  onToggleAutoRefresh?: () => void;
  secondsUntilNextRefresh?: number;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  activeTab,
  setActiveTab,
  onLogout,
  onBackToPublic,
  onRefresh,
  isLoading,
  lastUpdatedTime,
  actionSuccessMessage,
  onClearActionSuccess,
  alertCount = 0,
  recommendationCount = 0,
  feedbackCount = 0,
  autoRefreshEnabled = true,
  onToggleAutoRefresh,
  secondsUntilNextRefresh = 15,
  children,
}) => {
  const tabs = [
    { id: 'overview' as AdminTab, label: 'Genel Bakış', icon: Activity },
    { id: 'stations' as AdminTab, label: 'Durak Yönetimi', icon: Compass },
    { id: 'batteries' as AdminTab, label: 'Batarya Yönetimi', icon: Battery },
    { id: 'energy' as AdminTab, label: 'Enerji', icon: Sun },
    { id: 'climate' as AdminTab, label: 'İklimlendirme', icon: Thermometer },
    { id: 'charging' as AdminTab, label: 'Şarj', icon: Zap },
    {
      id: 'ai' as AdminTab,
      label: 'Enerji Planlama Önerileri',
      icon: CheckCircle2,
      count: recommendationCount,
    },
    { id: 'alerts' as AdminTab, label: 'Uyarılar', icon: AlertTriangle, count: alertCount },
    { id: 'feedback' as AdminTab, label: 'Geri Bildirim', icon: MessageSquare, count: feedbackCount },
    { id: 'reports' as AdminTab, label: 'Raporlar', icon: FileText },
    { id: 'settings' as AdminTab, label: 'Ayarlar', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F6F6F2] text-[#182019] flex flex-col font-sans">
      {/* 1. ZORUNLU ÜST SİMÜLASYON BANDI */}
      <div className="bg-[#FFF9EC] border-b border-[#F3B33D]/30 px-4 sm:px-6 py-2 text-xs text-[#925C08] flex flex-wrap items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D59B2E] animate-pulse" />
          <strong className="font-semibold text-[#182019]">
            Simülasyon modu aktif. Bu panel fiziksel cihazlara komut göndermez.
          </strong>
        </div>
        <div className="text-[11px] text-[#5D665E] hidden sm:block">
          Simülasyon telemetrisi · 15 saniyelik demo veri akışı
        </div>
      </div>

      {/* Aksiyon Bildirim Toast'ı */}
      {actionSuccessMessage && (
        <div className="fixed top-14 right-4 z-50 max-w-md bg-white border border-[#1F5A43]/40 shadow-elevated rounded-xl p-4 flex items-start gap-3 animate-in fade-in">
          <CheckCircle className="w-5 h-5 text-[#1F5A43] shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="text-xs font-semibold text-[#1F5A43]">Simülasyon Güncellendi</div>
            <p className="text-xs text-[#5D665E] mt-0.5 leading-relaxed">{actionSuccessMessage}</p>
          </div>
          <button onClick={onClearActionSuccess} className="text-[#5D665E] hover:text-[#182019]">
            <XCircle className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 2. ANA YÖNETİCİ HEADER & MENÜ TABLARI */}
      <header className="bg-white border-b border-[#DDE1DA] px-4 sm:px-6 py-3 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <BeeHiveLogo size="sm" subtext="İşletme Yönetim Paneli" />
            <div className="hidden md:flex items-center gap-2 pl-3 border-l border-[#DDE1DA] text-[11px] text-[#5D665E]">
              <span>Son güncelleme: {lastUpdatedTime}</span>
              <span>·</span>
              <span className="font-mono text-[#1F5A43] font-semibold">Örnek Durak Ağı (6 İstasyon)</span>
            </div>
          </div>

          {/* Aksiyon Butonları (Oto Yenile, Yenile, Haritaya Dön, Çıkış) */}
          <div className="flex items-center gap-2">
            {/* 15 Saniyelik Otomatik Yenileme Butonu */}
            {onToggleAutoRefresh && (
              <button
                type="button"
                onClick={onToggleAutoRefresh}
                className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium transition flex items-center gap-1.5 ${
                  autoRefreshEnabled
                    ? 'border-[#1F5A43]/30 bg-[#E5F0EA] text-[#1F5A43]'
                    : 'border-[#DDE1DA] bg-[#F6F6F2] text-[#5D665E]'
                }`}
                title={autoRefreshEnabled ? 'Otomatik yenilemeyi durdur' : 'Otomatik yenilemeyi başlat'}
              >
                {autoRefreshEnabled ? (
                  <>
                    <Pause className="w-3 h-3 text-[#1F5A43]" />
                    <span className="hidden sm:inline">Oto ({secondsUntilNextRefresh}s)</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 text-[#5D665E]" />
                    <span className="hidden sm:inline">Oto: Kapalı</span>
                  </>
                )}
              </button>
            )}

            <button
              onClick={onRefresh}
              disabled={isLoading}
              className="p-2 rounded-lg border border-[#DDE1DA] hover:bg-[#F6F6F2] text-[#5D665E] hover:text-[#182019] transition flex items-center gap-1.5 text-xs disabled:opacity-50"
              title="Telemetri Verilerini Manuel Yenile"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-[#1F5A43]' : ''}`} />
              <span className="hidden sm:inline">Yenile</span>
            </button>

            {onBackToPublic && (
              <button
                onClick={onBackToPublic}
                className="px-3 py-1.5 rounded-lg border border-[#DDE1DA] hover:bg-[#F6F6F2] text-[#182019] transition flex items-center gap-1.5 text-xs font-medium"
              >
                <MapPin className="w-3.5 h-3.5 text-[#1F5A43]" />
                <span className="hidden sm:inline">Şehir Haritası</span>
              </button>
            )}

            <button
              onClick={onLogout}
              className="px-3 py-1.5 rounded-lg bg-[#FCECEC] hover:bg-[#F8DADA] text-[#B94040] border border-[#B94040]/30 transition flex items-center gap-1.5 text-xs font-semibold"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Çıkış Yap</span>
            </button>
          </div>
        </div>

        {/* Tab Menüsü */}
        <div className="max-w-7xl mx-auto mt-3 pt-2 border-t border-[#EFF0EB]">
          <nav className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-thin">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition whitespace-nowrap ${
                    isActive
                      ? 'bg-[#E5F0EA] text-[#1F5A43] font-bold border border-[#1F5A43]/30 shadow-2xs'
                      : 'text-[#5D665E] hover:text-[#182019] hover:bg-[#F6F6F2]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#1F5A43]' : 'text-[#5D665E]'}`} />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && tab.count > 0 && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        isActive
                          ? 'bg-[#1F5A43] text-white'
                          : 'bg-[#EFF0EB] text-[#5D665E]'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* 3. ANA İÇERİK */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {children}
      </main>

      {/* 4. FOOTER */}
      <footer className="bg-white border-t border-[#DDE1DA] py-4 px-4 sm:px-6 text-xs text-[#5D665E]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div>
            BeeHive İşletme Yönetim Paneli · Konya Pilot Ağı (v1.0.0)
          </div>
          <div className="text-[11px]">
            Halk API’sinde teknik telemetri paylaşımı tasarım gereği engellenmiştir; bu ayrım otomatik testlerle doğrulanmıştır.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminLayout;

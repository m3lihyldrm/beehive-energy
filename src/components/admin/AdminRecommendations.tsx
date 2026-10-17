import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Sparkles,
  Zap,
  Check,
  X,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ShieldAlert,
  Database,
  History,
  Info
} from 'lucide-react';
import { AiRecommendation } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { SimulationBanner } from '../common/SimulationBanner';

interface AdminRecommendationsProps {
  recommendations: AiRecommendation[];
  onApply: (recId: string) => void;
  onDismiss: (recId: string) => void;
}

export const AdminRecommendations: React.FC<AdminRecommendationsProps> = ({
  recommendations,
  onApply,
  onDismiss,
}) => {
  const [activeTab, setActiveTab] = useState<'pending' | 'applied' | 'dismissed'>('pending');
  const [expandedWhy, setExpandedWhy] = useState<Record<string, boolean>>({});

  const toggleWhy = (id: string) => {
    setExpandedWhy((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Zenginleştirilmiş Öneri Listesi (6 Ana Senaryo Türü)
  const fullRecommendations = recommendations.length >= 4 ? recommendations : [
    {
      id: "AI-REC-01",
      stationId: "ST-KNY-04",
      stationName: "Karatay Bilim Merkezi Akıllı Durak",
      priority: "Yüksek",
      title: "Güneş Üretimi Yüksek: Batarya Şarj Önceliği",
      reason: "Anlık ışınım 880 W/m² seviyesinde ve üretim (6.2 kW) tüketimden (2.4 kW) belirgin derecede yüksek. Akşam saatleri için bataryayı %100 seviyesine çıkarmak verimliliği maksimize eder.",
      expectedImpact: "+%14 pik saat enerji tasarrufu, akşam şebeke çekişi sıfırlanır.",
      timestamp: "2026-09-26T09:10:00Z",
      actionCommand: "PRIORITIZE_BATTERY_CHARGE",
      status: "pending" as const,
    },
    {
      id: "AI-REC-02",
      stationId: "ST-KNY-02",
      stationName: "Alaaddin Bulvarı Akıllı Durak",
      priority: "Orta",
      title: "Akşam Pik Saat: Yük Transferi & Rezerv Koruma",
      reason: "17:30 - 19:30 saatleri arasında yolcu şarj talebinde %65 artış beklenmektedir. Mevcut batarya SOC (%79.5) seviyesinin korunarak şebeke bağımlılığının önlenmesi önerilir.",
      expectedImpact: "Kesintisiz 8 port USB-C ve Qi kablosuz şarj sürekliliği.",
      timestamp: "2026-09-26T08:55:00Z",
      actionCommand: "RESERVE_CAPACITY_PEAK",
      status: "pending" as const,
    },
    {
      id: "AI-REC-03",
      stationId: "ST-KNY-03",
      stationName: "Selçuklu Kongre Merkezi Akıllı Durak",
      priority: "Yüksek",
      title: "Batarya Sıcaklığı Yükseliyor: Havalandırma Artırımı",
      reason: "Hücre sıcaklığı 27.5°C'ye ulaştı ve SOC %38.6. Batarya ömrünü ve termal güvenliği korumak için kabin cebri havalandırma fanı %80 devire çıkarılmalı.",
      expectedImpact: "Hücre sıcaklığında 2.5°C düşüş, termal stresin ve yaşlanmanın önlenmesi.",
      timestamp: "2026-09-26T09:05:00Z",
      actionCommand: "POWER_THROTTLE_COOLING",
      status: "pending" as const,
    },
    {
      id: "AI-REC-04",
      stationId: "ST-KNY-01",
      stationName: "Kampüs Ana Giriş Akıllı Durak",
      priority: "Orta",
      title: "Beklenen Yoğunluk Yüksek: Şarj Hizmeti Önceliği",
      reason: "Ders çıkış saatinde 120+ yolcu sirkülasyonu öngörülüyor. Tüm USB-C portlarına tam 45W güç ayrılması ve aydınlatma LED'lerinin %70 eco seviyeye çekilmesi önerilir.",
      expectedImpact: "Öğrencilere kesintisiz hızlı şarj, toplam verimde %8 artış.",
      timestamp: "2026-09-26T09:20:00Z",
      actionCommand: "PRIORITIZE_CHARGING_SERVICE",
      status: "pending" as const,
    },
    {
      id: "AI-REC-05",
      stationId: "ST-KNY-03",
      stationName: "Selçuklu Kongre Merkezi Akıllı Durak",
      priority: "Düşük",
      title: "Panel Verimi Düşük: Saha Bakım Önerisi",
      reason: "MPPT 2 girişi referans ışınım modeline göre %35 daha düşük akım üretmektedir. Tozlanma veya kısmi ağaç gölgelenmesi şüphesi bulunmaktadır.",
      expectedImpact: "Panel temizliği sonrasında günlük +3.2 kWh ek üretim kazancı.",
      timestamp: "2026-09-26T08:30:00Z",
      actionCommand: "SCHEDULE_PANEL_CLEANING",
      status: "pending" as const,
    },
    {
      id: "AI-REC-06",
      stationId: "ST-KNY-03",
      stationName: "Selçuklu Kongre Merkezi Akıllı Durak",
      priority: "Yüksek",
      title: "Düşük SOC: Kademeli Yük Kısıtlama Senaryosu",
      reason: "Batarya şarjı %38.6 seviyesindedir. Gece kritik aydınlatma ve acil çağrı butonunun kesintisiz kalması için Qi kablosuz şarj padinin geçici kapatılması önerilir.",
      expectedImpact: "Batarya deşarj hızında %28 yavaşlama, gece güvenlik aydınlatması garantisi.",
      timestamp: "2026-09-26T09:15:00Z",
      actionCommand: "LOAD_SHEDDING_ECO",
      status: "pending" as const,
    },
  ];

  const pendingList = fullRecommendations.filter((r) => r.status === 'pending');
  const appliedList = fullRecommendations.filter((r) => r.status === 'applied');
  const dismissedList = fullRecommendations.filter((r) => r.status === 'dismissed');

  const currentList =
    activeTab === 'pending' ? pendingList : activeTab === 'applied' ? appliedList : dismissedList;

  return (
    <div className="space-y-6">
      {/* 1. ŞEFFAFLIK VE KARAR DESTEK BİLGİLENDİRMESİ */}
      <SimulationBanner
        message="Enerji Karar Destek Algoritması (Kural Tabanlı Planlama):"
        subtext="Öneriler, güneş ışınımı pikleri, geçmiş 30 günlük yolcu tüketim verisi ve hava tahminlerine göre kural tabanlı olarak üretilir. BMS güvenlik sınırları daima donanımsal önceliğe sahiptir."
      />

      {/* 2. ANA PANEL BAŞLIĞI VE GEÇMİŞ SEKMELERİ */}
      <div className="bg-white border border-[#DDE1DA] rounded-2xl p-5 sm:p-6 shadow-subtle space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DDE1DA]">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-[#182019] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#1F5A43]" />
              <span>Enerji Planlama Önerileri</span>
            </h3>
            <p className="text-xs text-[#5D665E] mt-0.5">
              Kural tabanlı enerji karar destek algoritması optimizasyon tavsiyeleri.
            </p>
          </div>

          {/* Sekmeler: Bekleyen, Uygulananlar, Yok Sayılanlar */}
          <div className="flex items-center gap-1 bg-[#F6F6F2] p-1 rounded-lg border border-[#DDE1DA] text-xs">
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-3 py-1.5 rounded-md font-medium transition flex items-center gap-1.5 ${
                activeTab === 'pending'
                  ? 'bg-white text-[#1F5A43] font-bold shadow-2xs border border-[#DDE1DA]'
                  : 'text-[#5D665E] hover:text-[#182019]'
              }`}
            >
              <span>Bekleyen</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#E5F0EA] text-[#1F5A43] font-bold">
                {pendingList.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('applied')}
              className={`px-3 py-1.5 rounded-md font-medium transition flex items-center gap-1.5 ${
                activeTab === 'applied'
                  ? 'bg-white text-[#1F5A43] font-bold shadow-2xs border border-[#DDE1DA]'
                  : 'text-[#5D665E] hover:text-[#182019]'
              }`}
            >
              <span>Uygulanan Geçmiş</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#EFF0EB] text-[#5D665E]">
                {appliedList.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('dismissed')}
              className={`px-3 py-1.5 rounded-md font-medium transition flex items-center gap-1.5 ${
                activeTab === 'dismissed'
                  ? 'bg-white text-[#1F5A43] font-bold shadow-2xs border border-[#DDE1DA]'
                  : 'text-[#5D665E] hover:text-[#182019]'
              }`}
            >
              <span>Yok Sayılanlar</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#EFF0EB] text-[#5D665E]">
                {dismissedList.length}
              </span>
            </button>
          </div>
        </div>

        {/* 3. ÖNERİ KARTLARI LİSTESİ */}
        <div className="space-y-4">
          {currentList.length === 0 ? (
            <div className="text-center py-12 text-xs text-[#5D665E] space-y-1">
              <div className="font-semibold text-[#182019]">Bu sekmede kayıtlı öneri bulunmuyor.</div>
              <div>Algoritma yeni bir eşik tetiklendiğinde öneri listesini otomatik günceller.</div>
            </div>
          ) : (
            currentList.map((rec) => {
              const isApplied = rec.status === 'applied';
              const isDismissed = rec.status === 'dismissed';
              const isWhyOpen = expandedWhy[rec.id];

              const priorityColors: Record<string, string> = {
                Yüksek: 'bg-[#FCECEC] text-[#B94040] border-[#B94040]/30',
                Orta: 'bg-[#FFF9EC] text-[#925C08] border-[#F3B33D]/40',
                Düşük: 'bg-[#EFF0EB] text-[#5D665E] border-[#DDE1DA]',
              };

              return (
                <div
                  key={rec.id}
                  className={`border rounded-2xl p-5 shadow-2xs space-y-3.5 transition-all ${
                    isApplied
                      ? 'border-[#1F5A43]/40 bg-[#F6F9F7]'
                      : isDismissed
                      ? 'border-[#DDE1DA] bg-[#FAFAFA] opacity-65'
                      : 'border-[#DDE1DA] bg-white hover:border-[#CBD3C8]'
                  }`}
                >
                  {/* Kart Başlık Satırı */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#1F5A43] bg-[#E5F0EA] px-2 py-0.5 rounded-full">
                          Kural Tabanlı Algoritma
                        </span>
                        <span className="text-xs font-bold text-[#182019]">
                          {rec.stationName}
                        </span>
                        <span className="text-[10px] font-mono text-[#5D665E]">({rec.stationId})</span>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-[#182019]">{rec.title}</h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${priorityColors[rec.priority] || priorityColors.Orta}`}>
                        Öncelik: {rec.priority}
                      </span>
                      <StatusBadge status={rec.status} size="sm" />
                    </div>
                  </div>

                  {/* Öneri Gerekçesi */}
                  <p className="text-xs text-[#5D665E] leading-relaxed">{rec.reason}</p>

                  {/* Veri Kaynakları & Risk Notu */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-[#F6F6F2] border border-[#DDE1DA] flex items-center gap-2 text-[#5D665E]">
                      <Database className="w-3.5 h-3.5 text-[#416D86] shrink-0" />
                      <span>
                        <strong>Veri Kaynakları:</strong> Anlık PV Telemetrisi, BMS CAN Verisi, Geçmiş Yolcu Profili
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#F6F6F2] border border-[#DDE1DA] flex items-center gap-2 text-[#5D665E]">
                      <ShieldAlert className="w-3.5 h-3.5 text-[#D59B2E] shrink-0" />
                      <span>
                        <strong>Risk Notu:</strong> Termal eşik aşılırsa BMS bağımsız kontaktörü devreyi açar.
                      </span>
                    </div>
                  </div>

                  {/* Beklenen Etki */}
                  <div className="p-3 bg-[#E5F0EA]/40 rounded-xl border border-[#1F5A43]/20 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2 text-[#1F5A43]">
                      <Sparkles className="w-4 h-4 shrink-0 text-[#D59B2E]" />
                      <span>
                        Beklenen Etki: <strong>{rec.expectedImpact}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-[#5D665E] bg-white px-2 py-0.5 rounded border border-[#DDE1DA]">
                      {rec.actionCommand}
                    </span>
                  </div>

                  {/* Neden Gösteriliyor? (Açıklanabilirlik Bölümü) */}
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => toggleWhy(rec.id)}
                      className="text-[11px] font-medium text-[#1F5A43] hover:underline inline-flex items-center gap-1"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>Neden bu öneri gösteriliyor?</span>
                      {isWhyOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>

                    {isWhyOpen && (
                      <div className="mt-2 p-3 rounded-xl bg-[#EFF0EB] border border-[#DDE1DA] text-[11px] text-[#5D665E] space-y-1 animate-in fade-in">
                        <div className="font-semibold text-[#182019]">Kural Tetikleme Mantığı:</div>
                        <p>
                          Bu karar desteği, durağın son 30 günlük güneş üretim eğrisi ve anlık batarya hücre voltaj dengesizliği eşiği (Δ &gt; 30 mV) kıyaslanarak deterministik kurallarla üretilmiştir. Herhangi bir kapalı kutu model kullanılmaz; tüm parametreler denetlenebilir.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Aksiyon Butonları (Yalnızca Bekleyenler İçin) */}
                  {!isApplied && !isDismissed && (
                    <div className="pt-2 border-t border-[#EFF0EB] flex items-center justify-end gap-2">
                      <button
                        onClick={() => onDismiss(rec.id)}
                        className="px-3.5 py-1.5 rounded-lg border border-[#DDE1DA] hover:bg-[#F6F6F2] text-xs text-[#5D665E] hover:text-[#182019] transition flex items-center gap-1 cursor-pointer font-medium"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Yok Say</span>
                      </button>

                      <button
                        onClick={() => onApply(rec.id)}
                        className="px-4 py-1.5 rounded-lg bg-[#1F5A43] hover:bg-[#184835] text-white text-xs font-semibold shadow-2xs transition flex items-center gap-1.5 cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Simülasyonda Uygula</span>
                      </button>
                    </div>
                  )}

                  {isApplied && (
                    <div className="pt-2 border-t border-[#EFF0EB] flex items-center justify-between text-[11px] text-[#1F5A43]">
                      <span>✓ Bu öneri simülasyon ortamına uygulandı. Olay günlüğüne yazıldı.</span>
                      <span className="font-mono text-[#5D665E]">Uygulanma Durumu: Aktif</span>
                    </div>
                  )}

                  {isDismissed && (
                    <div className="pt-2 border-t border-[#EFF0EB] text-[11px] text-[#5D665E]">
                      ✕ Operatör tarafından yok sayıldı.
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminRecommendations;

import React, { useState, useMemo } from 'react';
import {
  MessageSquare,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { FeedbackSubmission } from '../../types';

interface AdminFeedbackProps {
  feedbacks: FeedbackSubmission[];
  onUpdateStatus: (feedbackId: string, newStatus: string) => void;
}

export const AdminFeedback: React.FC<AdminFeedbackProps> = ({ feedbacks, onUpdateStatus }) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredFeedbacks = useMemo(() => {
    return feedbacks.filter((fb) => {
      if (search.trim()) {
        const q = search.toLowerCase();
        const match =
          fb.feedbackId.toLowerCase().includes(q) ||
          fb.stationName.toLowerCase().includes(q) ||
          fb.stationId.toLowerCase().includes(q) ||
          fb.issueType.toLowerCase().includes(q);
        if (!match) return false;
      }
      if (statusFilter !== 'all' && fb.status !== statusFilter) return false;
      return true;
    });
  }, [feedbacks, search, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Şeffaflık & KVKK Bildirimi */}
      <div className="p-3.5 bg-[#EFF0EB] border border-[#DDE1DA] rounded-xl text-xs text-[#5D665E] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#1F5A43] shrink-0" />
          <span>
            <strong>Anonim Vatandaş Bildirimleri:</strong> Vatandaşlardan kişisel veri (ad, telefon, e-posta) istenmez; geri bildirimler anonim takip kodu ile yönetilir.
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white border border-[#DDE1DA] text-[#5D665E]">
          KVKK Uyumlu
        </span>
      </div>

      {/* Arama ve Durum Filtreleme */}
      <div className="bg-white border border-[#DDE1DA] rounded-2xl p-4 sm:p-5 shadow-subtle space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Arama: Takip Kodu / Durak Adı */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#5D665E] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Takip kodu (FB-...) veya durak adına göre ara..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-[#F6F6F2] border border-[#DDE1DA] rounded-lg text-[#182019] focus:bg-white focus:border-[#1F5A43] focus:outline-none transition"
            />
          </div>

          {/* Durum Filtre Butonları */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs text-[#5D665E] mr-1 hidden sm:inline flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Durum:</span>
            </span>
            {[
              { id: 'all', label: 'Tümü' },
              { id: 'Kayıt Alındı', label: 'Kayıt Alındı' },
              { id: 'İnceleniyor', label: 'İnceleniyor' },
              { id: 'Tamamlandı', label: 'Tamamlandı' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setStatusFilter(f.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap ${
                  statusFilter === f.id
                    ? 'bg-[#1F5A43] text-white font-semibold'
                    : 'bg-[#F6F6F2] text-[#5D665E] hover:text-[#182019]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs text-[#5D665E] pt-2 border-t border-[#EFF0EB]">
          Toplam <strong className="text-[#1F5A43]">{filteredFeedbacks.length}</strong> bildirim gösteriliyor.
        </div>
      </div>

      {/* Bildirim Kartları */}
      <div className="space-y-3">
        {filteredFeedbacks.length === 0 ? (
          <div className="bg-white border border-[#DDE1DA] rounded-2xl p-8 text-center text-xs text-[#5D665E]">
            Aranan kriterlere uygun bildirim bulunamadı.
          </div>
        ) : (
          filteredFeedbacks.map((fb) => (
            <div
              key={fb.feedbackId}
              className="bg-white border border-[#DDE1DA] rounded-xl p-4 sm:p-5 shadow-subtle space-y-3 transition hover:border-[#1F5A43]/30"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap text-xs">
                    <span className="font-bold text-[#182019] text-sm">{fb.stationName}</span>
                    <span className="font-mono text-[10px] text-[#5D665E]">({fb.stationId})</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#EAF2F6] text-[#416D86] text-[10px] font-semibold">
                      {fb.issueType}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-[#5D665E]">
                    <span className="font-mono font-bold text-[#1F5A43] bg-[#E5F0EA] px-1.5 py-0.2 rounded">
                      Takip No: {fb.feedbackId}
                    </span>
                    <span>·</span>
                    <span>{new Date(fb.createdAt).toLocaleString('tr-TR')}</span>
                  </div>
                </div>

                {/* Durum Değiştirici */}
                <div className="flex items-center gap-1.5 self-end sm:self-start">
                  <span className="text-[11px] text-[#5D665E] mr-1 hidden sm:inline">Durum:</span>
                  <select
                    value={fb.status}
                    onChange={(e) => onUpdateStatus(fb.feedbackId, e.target.value)}
                    className="bg-[#F6F6F2] border border-[#DDE1DA] rounded-lg px-2.5 py-1 text-xs font-semibold text-[#182019] focus:bg-white focus:outline-none"
                  >
                    <option value="Kayıt Alındı">Kayıt Alındı</option>
                    <option value="İnceleniyor">İnceleniyor</option>
                    <option value="Tamamlandı">Tamamlandı</option>
                  </select>
                </div>
              </div>

              {fb.message && (
                <p className="text-xs text-[#5D665E] bg-[#F6F6F2] p-3 rounded-lg border border-[#DDE1DA] leading-relaxed">
                  "{fb.message}"
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminFeedback;

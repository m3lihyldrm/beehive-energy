import React, { useState } from 'react';
import {
  Settings,
  User,
  KeyRound,
  Bell,
  Sliders,
  Shield,
  Clock,
  CheckCircle,
  AlertTriangle,
  Info,
  Radio
} from 'lucide-react';
import { SimulationBanner } from '../common/SimulationBanner';

interface AdminSettingsProps {
  onRefreshTelemetry?: () => void;
}

export const AdminSettings: React.FC<AdminSettingsProps> = () => {
  const [activeSection, setActiveSection] = useState<
    'profile' | 'security' | 'notifications' | 'thresholds' | 'roles' | 'audit'
  >('profile');

  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  // Form states (mock)
  const [userName, setUserName] = useState('Konya Akıllı Şebeke Yöneticisi');
  const [userEmail, setUserEmail] = useState('admin@beehive.energy');
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');

  // Thresholds state (mock)
  const [tempThreshold, setTempThreshold] = useState('35');
  const [socMinThreshold, setSocMinThreshold] = useState('20');
  const [cellDeltaThreshold, setCellDeltaThreshold] = useState('30');
  const [autoRefreshInterval, setAutoRefreshInterval] = useState('15');

  const rolesList = [
    {
      role: 'Süper Yönetici',
      code: 'SUPER_ADMIN',
      desc: 'Tüm durak, batarya, telemetri, kullanıcı ve şebeke parametrelerinde tam okuma/yazma yetkisi.',
      usersCount: 1,
      badge: 'bg-[#1F5A43] text-white',
    },
    {
      role: 'Operasyon Yöneticisi',
      code: 'OPS_MANAGER',
      desc: 'Durak durum yönetimi, karar destek onayları ve günlük enerji raporlama yetkisi.',
      usersCount: 2,
      badge: 'bg-[#E5F0EA] text-[#1F5A43]',
    },
    {
      role: 'Saha Bakım Ekibi',
      code: 'FIELD_TECHNICIAN',
      desc: 'Kabin kilit erişimi, batarya izolasyon simülasyonu ve arıza müdahale kayıtları.',
      usersCount: 4,
      badge: 'bg-[#EFF0EB] text-[#5D665E]',
    },
    {
      role: 'Enerji Analisti',
      code: 'ENERGY_ANALYST',
      desc: 'Güneş verimi, batarya ömrü, döngü analizleri ve CSV/JSON dışa aktarma yetkisi.',
      usersCount: 2,
      badge: 'bg-[#EFF0EB] text-[#5D665E]',
    },
    {
      role: 'Salt Okunur Kullanıcı',
      code: 'READ_ONLY_VIEWER',
      desc: 'Yalnızca genel bakış ekranları ve kamuya açık olmayan panelleri inceleme yetkisi.',
      usersCount: 5,
      badge: 'bg-[#F6F6F2] text-[#5D665E]',
    },
  ];

  const auditLogs = [
    { time: '17.10.2026 16:45', user: 'admin@beehive.energy', ip: '127.0.0.1 (Localhost)', action: 'Yönetim oturumu açıldı' },
    { time: '17.10.2026 16:30', user: 'admin@beehive.energy', ip: '127.0.0.1 (Localhost)', action: 'Enerji planlama önerisi AI-REC-01 uygulandı' },
    { time: '17.10.2026 15:12', user: 'admin@beehive.energy', ip: '127.0.0.1 (Localhost)', action: 'ST-KNY-03 batarya izolasyonu simüle edildi' },
    { time: '17.10.2026 14:00', user: 'sistem@beehive.energy', ip: 'internal', action: 'Periyodik 15s simülasyon telemetrisi tetiklendi' },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotice('Ayarlar başarıyla simüle olarak güncellendi.');
    setTimeout(() => setSavedNotice(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* 1. ÜST ŞEFFAFLIK BANDI */}
      <SimulationBanner
        message="Simülasyon Ayar Merkezi:"
        subtext="Bu ekrandaki kullanıcı rolleri, şifre formları ve eşik değerleri demo/prototip amaçlıdır. Fiziksel donanım ayarlarını değiştirmez."
      />

      {savedNotice && (
        <div className="p-3.5 bg-[#E5F0EA] border border-[#1F5A43]/40 rounded-xl text-xs text-[#1F5A43] font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>{savedNotice}</span>
        </div>
      )}

      {/* 2. AYARLAR KONTROL PANELİ */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Sol Menü */}
        <div className="md:col-span-4 bg-white border border-[#DDE1DA] rounded-2xl p-4 shadow-subtle space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-[#5D665E] px-3 py-2">
            İşletme Ayarları
          </div>

          {[
            { id: 'profile' as const, label: 'Profil Bilgileri', icon: User },
            { id: 'security' as const, label: 'Güvenlik & Şifre', icon: KeyRound },
            { id: 'notifications' as const, label: 'Bildirim Tercihleri', icon: Bell },
            { id: 'thresholds' as const, label: 'Uyarı & Simülasyon Eşikleri', icon: Sliders },
            { id: 'roles' as const, label: 'Kullanıcı Rolleri', icon: Shield },
            { id: 'audit' as const, label: 'Erişim Kayıtları (Audit)', icon: Clock },
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveSection(item.id)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium transition flex items-center gap-2.5 ${
                  isSelected
                    ? 'bg-[#E5F0EA] text-[#1F5A43] font-bold shadow-2xs border border-[#1F5A43]/20'
                    : 'text-[#5D665E] hover:text-[#182019] hover:bg-[#F6F6F2]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-[#1F5A43]' : 'text-[#5D665E]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Sağ İçerik Alanı */}
        <div className="md:col-span-8 bg-white border border-[#DDE1DA] rounded-2xl p-6 shadow-subtle">
          {/* A. Profil Bilgileri */}
          {activeSection === 'profile' && (
            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <h4 className="text-sm font-bold text-[#182019]">Profil Bilgileri</h4>
                <p className="text-[#5D665E] mt-0.5">Operasyon paneli yetkili kullanıcı detayları.</p>
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="font-semibold text-[#182019] block mb-1">Ad Soyad / Unvan</label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F6F6F2] border border-[#DDE1DA] rounded-lg text-[#182019] focus:outline-none focus:bg-white"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#182019] block mb-1">Kurumsal E-Posta</label>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F6F6F2] border border-[#DDE1DA] rounded-lg text-[#182019] focus:outline-none focus:bg-white"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#182019] block mb-1">Aktif Yetki Seviyesi</label>
                  <input
                    type="text"
                    disabled
                    value="LEVEL_4_FULL_TELEMETRY (Süper Yönetici)"
                    className="w-full px-3 py-2 bg-[#EFF0EB] border border-[#DDE1DA] rounded-lg text-[#5D665E] cursor-not-allowed"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-[#1F5A43] hover:bg-[#184835] text-white rounded-lg font-semibold transition"
              >
                Bilgileri Güncelle
              </button>
            </form>
          )}

          {/* B. Güvenlik & Şifre */}
          {activeSection === 'security' && (
            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <h4 className="text-sm font-bold text-[#182019]">Güvenlik ve Şifre Güncelleme</h4>
                <p className="text-[#5D665E] mt-0.5">İşletme paneli yetkili giriş şifresi.</p>
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="font-semibold text-[#182019] block mb-1">Mevcut Şifre</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={currentPass}
                    onChange={(e) => setCurrentPass(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F6F6F2] border border-[#DDE1DA] rounded-lg text-[#182019] focus:outline-none focus:bg-white"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#182019] block mb-1">Yeni Şifre</label>
                  <input
                    type="password"
                    placeholder="En az 8 karakter, büyük harf ve sembol"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F6F6F2] border border-[#DDE1DA] rounded-lg text-[#182019] focus:outline-none focus:bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-[#1F5A43] hover:bg-[#184835] text-white rounded-lg font-semibold transition"
              >
                Şifreyi Değiştir
              </button>
            </form>
          )}

          {/* C. Bildirim Tercihleri */}
          {activeSection === 'notifications' && (
            <div className="space-y-4 text-xs">
              <div>
                <h4 className="text-sm font-bold text-[#182019]">Bildirim Tercihleri</h4>
                <p className="text-[#5D665E] mt-0.5">Kritik alarm ve günlük e-posta raporları.</p>
              </div>

              <div className="space-y-2.5 pt-2">
                <label className="flex items-center gap-2.5 p-3 rounded-xl border border-[#DDE1DA] bg-[#F6F6F2] cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-[#1F5A43]" />
                  <div>
                    <strong className="text-[#182019] block">Kritik BMS Alarmları (E-Posta)</strong>
                    <span className="text-[11px] text-[#5D665E]">Hücre sıcaklığı &gt; 45°C veya voltaj dengesizliği &gt; 50mV durumunda anlık e-posta</span>
                  </div>
                </label>

                <label className="flex items-center gap-2.5 p-3 rounded-xl border border-[#DDE1DA] bg-[#F6F6F2] cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-[#1F5A43]" />
                  <div>
                    <strong className="text-[#182019] block">Günlük Sabah Enerji Özeti</strong>
                    <span className="text-[11px] text-[#5D665E]">Her sabah 07:00'de dünün üretim ve temiz karşılama oranı</span>
                  </div>
                </label>

                <label className="flex items-center gap-2.5 p-3 rounded-xl border border-[#DDE1DA] bg-[#F6F6F2] cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-[#1F5A43]" />
                  <div>
                    <strong className="text-[#182019] block">Karar Destek Algoritması Önerileri</strong>
                    <span className="text-[11px] text-[#5D665E]">Yüksek öncelikli kural tabanlı önerilerde bildirim</span>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* D. Uyarı Eşikleri & Simülasyon Modu */}
          {activeSection === 'thresholds' && (
            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <h4 className="text-sm font-bold text-[#182019]">Uyarı Eşikleri & Simülasyon Ayarları</h4>
                <p className="text-[#5D665E] mt-0.5">Sensör alarm sınırları ve otomatik yenileme frekansı.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="font-semibold text-[#182019] block mb-1">Maks. Hücre Sıcaklığı Alarmı (°C)</label>
                  <input
                    type="number"
                    value={tempThreshold}
                    onChange={(e) => setTempThreshold(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F6F6F2] border border-[#DDE1DA] rounded-lg text-[#182019] focus:outline-none focus:bg-white"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#182019] block mb-1">Min. Batarya SOC Rezervi (%)</label>
                  <input
                    type="number"
                    value={socMinThreshold}
                    onChange={(e) => setSocMinThreshold(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F6F6F2] border border-[#DDE1DA] rounded-lg text-[#182019] focus:outline-none focus:bg-white"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#182019] block mb-1">Voltaj Dengesizliği Eşiği (mV)</label>
                  <input
                    type="number"
                    value={cellDeltaThreshold}
                    onChange={(e) => setCellDeltaThreshold(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F6F6F2] border border-[#DDE1DA] rounded-lg text-[#182019] focus:outline-none focus:bg-white"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#182019] block mb-1">Simülasyon Veri Akış Aralığı (Saniye)</label>
                  <input
                    type="number"
                    value={autoRefreshInterval}
                    onChange={(e) => setAutoRefreshInterval(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F6F6F2] border border-[#DDE1DA] rounded-lg text-[#182019] focus:outline-none focus:bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-[#1F5A43] hover:bg-[#184835] text-white rounded-lg font-semibold transition"
              >
                Eşikleri Kaydet
              </button>
            </form>
          )}

          {/* E. Kullanıcı Rolleri */}
          {activeSection === 'roles' && (
            <div className="space-y-4 text-xs">
              <div>
                <h4 className="text-sm font-bold text-[#182019]">Kullanıcı Rolleri & Yetki Matrisi</h4>
                <p className="text-[#5D665E] mt-0.5">Sistemde tanımlı 5 ana kullanıcı rolü.</p>
              </div>

              <div className="space-y-3 pt-2">
                {rolesList.map((r) => (
                  <div key={r.code} className="p-3.5 rounded-xl border border-[#DDE1DA] bg-[#F6F6F2] space-y-1">
                    <div className="flex items-center justify-between">
                      <strong className="text-[#182019] text-xs">{r.role}</strong>
                      <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded ${r.badge}`}>
                        {r.code} ({r.usersCount} Kullanıcı)
                      </span>
                    </div>
                    <p className="text-[11px] text-[#5D665E] leading-relaxed">{r.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* F. Erişim Kayıtları (Audit) */}
          {activeSection === 'audit' && (
            <div className="space-y-4 text-xs">
              <div>
                <h4 className="text-sm font-bold text-[#182019]">Sistem Erişim & Oturum Kayıtları (Audit Trail)</h4>
                <p className="text-[#5D665E] mt-0.5">Son yapılan yönetici işlemleri ve IP kayıtları.</p>
              </div>

              <div className="divide-y divide-[#EFF0EB] border border-[#DDE1DA] rounded-xl overflow-hidden">
                {auditLogs.map((log, idx) => (
                  <div key={idx} className="p-3 bg-white flex items-center justify-between gap-2 text-[11px]">
                    <div className="space-y-0.5">
                      <strong className="text-[#182019] block">{log.action}</strong>
                      <span className="text-[#5D665E]">{log.user} · IP: {log.ip}</span>
                    </div>
                    <span className="text-[#5D665E] font-mono shrink-0">{log.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;

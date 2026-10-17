import React from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  CheckCircle2,
  Server,
  Wrench,
  FileSpreadsheet,
  ArrowRight,
  ShieldCheck,
  Building,
  GraduationCap,
  Sparkles,
  HelpCircle,
  AlertCircle
} from 'lucide-react';

export const BusinessModelView: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16 animate-in fade-in duration-200">
      {/* 1. HERO BÖLÜMÜ */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#1F5A43] bg-[#E5F0EA] px-3.5 py-1.5 rounded-full border border-[#1F5A43]/20">
          <Briefcase className="w-3.5 h-3.5" /> İş Modeli & Gelir Akışları
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#182019] tracking-tight">
          Sürdürülebilir, Şeffaf ve <br className="hidden sm:inline" />
          <span className="text-[#1F5A43]">Ölçeklenebilir Değer Modeli</span>
        </h1>
        <p className="text-base sm:text-lg text-[#5D665E] leading-relaxed">
          BeeHive, kamu kurumları ve özel kampüslere tek seferlik yüksek maliyetler yerine donanım kurulumu, bulut SaaS yönetim aboneliği ve periyodik SLA bakım hizmetleri sunan çok katmanlı bir iş modeli uygular.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/iletisim"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#1F5A43] text-white text-sm font-semibold hover:bg-[#184835] shadow-sm transition-all"
          >
            Kurumsal Teklif İsteyin
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/cozum"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-[#DDE1DA] text-[#182019] text-sm font-semibold hover:bg-[#F6F6F2] transition-all"
          >
            Çözümü Detaylı İncele
          </Link>
        </div>
      </div>

      {/* 2. DÖRT ANA GELİR & HİZMET KANALI */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-[#DDE1DA] rounded-2xl p-6 shadow-subtle space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#E5F0EA] text-[#1F5A43] flex items-center justify-center font-bold">
              01
            </div>
            <h3 className="text-base font-bold text-[#182019]">Pilot Donanım & Kurulum</h3>
            <p className="text-xs text-[#5D665E] leading-relaxed">
              İkinci yaşam batarya modülleri, EI60 güvenlik kabini, monokristal PV çatısı ve telemetri donanımının anahtar teslim saha montajı ve devreye alımı.
            </p>
          </div>
          <div className="text-[11px] font-medium text-[#1F5A43] pt-3 border-t border-[#DDE1DA]">
            Tek seferlik kurulum bedeli
          </div>
        </div>

        <div className="bg-white border border-[#DDE1DA] rounded-2xl p-6 shadow-subtle space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#EAF2F6] text-[#416D86] flex items-center justify-center font-bold">
              02
            </div>
            <h3 className="text-base font-bold text-[#182019]">SaaS Bulut İzleme Lisansı</h3>
            <p className="text-xs text-[#5D665E] leading-relaxed">
              BeeHive Cloud İşletme Yönetim Paneli üzerinden durak başına uzaktan telemetri izleme, dijital ikiz simülasyonu, anlık alarm bildirimleri ve API erişimi.
            </p>
          </div>
          <div className="text-[11px] font-medium text-[#416D86] pt-3 border-t border-[#DDE1DA]">
            Yıllık / Aylık durak başı abonelik
          </div>
        </div>

        <div className="bg-white border border-[#DDE1DA] rounded-2xl p-6 shadow-subtle space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#FEF6E9] text-[#D59B2E] flex items-center justify-center font-bold">
              03
            </div>
            <h3 className="text-base font-bold text-[#182019]">SLA Bakım & Değişim</h3>
            <p className="text-xs text-[#5D665E] leading-relaxed">
              6 ayda bir yerinde filtre/kabin kontrolü, aerosol tüp testi, termal sensör kalibrasyonu ve batarya kullanım ömrü tamamlandığında (%60 altı) modül değişimi.
            </p>
          </div>
          <div className="text-[11px] font-medium text-[#D59B2E] pt-3 border-t border-[#DDE1DA]">
            Servis Seviyesi Anlaşması (SLA)
          </div>
        </div>

        <div className="bg-white border border-[#DDE1DA] rounded-2xl p-6 shadow-subtle space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#F6F6F2] text-[#182019] flex items-center justify-center font-bold">
              04
            </div>
            <h3 className="text-base font-bold text-[#182019]">ESG & Karbon Raporlama</h3>
            <p className="text-xs text-[#5D665E] leading-relaxed">
              Belediyelerin ve kurumsal şirketlerin sürdürülebilirlik raporlamalarında (GRI, CDP, GreenMetric) denetlenebilir yeşil enerji ve önlenen karbon sertifikası.
            </p>
          </div>
          <div className="text-[11px] font-medium text-[#182019] pt-3 border-t border-[#DDE1DA]">
            Dönemsel denetim ve raporlama
          </div>
        </div>
      </div>

      {/* 3. PAKETLER / İŞBİRLİĞİ MODELLERİ */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#1F5A43] bg-[#E5F0EA] px-3 py-1 rounded-full border border-[#1F5A43]/20">
            İşbirliği Paketleri
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#182019]">
            İhtiyacınıza Göre Ölçeklenen Planlar
          </h2>
          <p className="text-sm text-[#5D665E]">
            Küçük bir pilot denemesinden şehir çapında yaygın ağ operasyonuna kadar esnek yapılar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Paket 1 */}
          <div className="bg-white border border-[#DDE1DA] rounded-2xl p-6 shadow-subtle space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-[#182019]">Pilot Doğrulama</h3>
                <span className="text-xs text-[#5D665E]">1 - 2 Durak Lokasyonu</span>
              </div>
              <p className="text-xs text-[#5D665E] leading-relaxed">
                Belediyenin ya da kampüsün seçtiği kritik duraklarda sistemi 3 ay boyunca risk almadan denemek isteyen paydaşlar için.
              </p>
              <ul className="space-y-2.5 text-xs text-[#182019] pt-2 border-t border-[#DDE1DA]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1F5A43] shrink-0" />
                  1 adet modüler durak donanımı
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1F5A43] shrink-0" />
                  3 ay tam erişimli SaaS yönetim paneli
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1F5A43] shrink-0" />
                  Haftalık performans ve enerji analizi
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1F5A43] shrink-0" />
                  Pilot sonu kapsamlı fizibilite raporu
                </li>
              </ul>
            </div>
            <Link
              to="/iletisim"
              className="w-full text-center py-2.5 rounded-xl border border-[#DDE1DA] text-[#182019] text-xs font-bold hover:bg-[#F6F6F2] transition-colors"
            >
              Pilot Başvurusunda Bulun
            </Link>
          </div>

          {/* Paket 2 (Öne Çıkan) */}
          <div className="bg-white border-2 border-[#1F5A43] rounded-2xl p-6 shadow-md space-y-6 flex flex-col justify-between relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1F5A43] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full">
              En Çok Tercih Edilen
            </span>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-[#182019]">Belediye / Kampüs Hattı</h3>
                <span className="text-xs text-[#5D665E]">5 - 15 Durak Ağı</span>
              </div>
              <p className="text-xs text-[#5D665E] leading-relaxed">
                Belirli bir otobüs veya tramvay hattı boyunca enerji sürekliliği ve akıllı şehir telemetrisi kurmak isteyen yönetimler için.
              </p>
              <ul className="space-y-2.5 text-xs text-[#182019] pt-2 border-t border-[#DDE1DA]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1F5A43] shrink-0" />
                  Çoklu durak filo kurulumu
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1F5A43] shrink-0" />
                  Sınırsız kullanıcı erişimli yönetim paneli
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1F5A43] shrink-0" />
                  7/24 telemetri izleme ve alarm sistemi
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1F5A43] shrink-0" />
                  Yılda 2 defa yerinde periyodik bakım (SLA)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1F5A43] shrink-0" />
                  Doğrulanmış ESG karbon sertifikasyonu
                </li>
              </ul>
            </div>
            <Link
              to="/iletisim"
              className="w-full text-center py-2.5 rounded-xl bg-[#1F5A43] text-white text-xs font-bold hover:bg-[#184835] transition-colors shadow-sm"
            >
              Kurumsal Teklif Alın
            </Link>
          </div>

          {/* Paket 3 */}
          <div className="bg-white border border-[#DDE1DA] rounded-2xl p-6 shadow-subtle space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-[#182019]">Metropol Genişleme</h3>
                <span className="text-xs text-[#5D665E]">20+ Durak & Transfer Merkezi</span>
              </div>
              <p className="text-xs text-[#5D665E] leading-relaxed">
                Tüm şehir ulaşım ağını yeşil enerji odaklı dönüştürmeyi hedefleyen büyükşehir belediyeleri ve ulaşım otoriteleri.
              </p>
              <ul className="space-y-2.5 text-xs text-[#182019] pt-2 border-t border-[#DDE1DA]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1F5A43] shrink-0" />
                  Özel mühendislik ve durak mimarisi uyarlaması
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1F5A43] shrink-0" />
                  Kurum içi SCADA / Akıllı Şehir API entegrasyonu
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1F5A43] shrink-0" />
                  Özel atanmış teknik hesap yöneticisi
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1F5A43] shrink-0" />
                  Hızlı müdahale garantili (4 saat) SLA
                </li>
              </ul>
            </div>
            <Link
              to="/iletisim"
              className="w-full text-center py-2.5 rounded-xl border border-[#DDE1DA] text-[#182019] text-xs font-bold hover:bg-[#F6F6F2] transition-colors"
            >
              Stratejik Ortaklık Görüşmesi
            </Link>
          </div>
        </div>
      </div>

      {/* 4. ŞEBEKE ENERJİ SATIŞI POLİTİKASI (DİPNOT / UYARI) */}
      <div className="bg-[#EFF0EB] border border-[#DDE1DA] rounded-2xl p-6 space-y-3">
        <div className="flex items-center gap-2 text-sm font-bold text-[#182019]">
          <AlertCircle className="w-4 h-4 text-[#D59B2E] shrink-0" />
          Mevzuat ve Şebeke Entegrasyonu Bilgilendirmesi
        </div>
        <p className="text-xs text-[#5D665E] leading-relaxed">
          BeeHive’ın birincil odak noktası <strong>yerinde temiz üretim, batarya depolama ve kesintisiz kamusal hizmettir</strong>. Şebekeye enerji satışı veya çift yönlü şebeke enjeksiyonu doğrudan bir gelir modeli taahhüdü değildir; yalnızca EPDK mevzuatı, yerel elektrik dağıtım şirketi (EDAŞ) bağlantı onayları ve teknik altyapı fizibilitesine bağlı olarak faz 2 sürecinde değerlendirilecek ek bir opsiyondur.
        </p>
      </div>

      {/* 5. ÇAĞRI */}
      <div className="bg-white border border-[#DDE1DA] rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-subtle">
        <h2 className="text-2xl font-bold text-[#182019]">Sizin Kurumunuza Özel Modeli Konuşalım</h2>
        <p className="text-sm text-[#5D665E] max-w-xl mx-auto">
          Lokasyon sayısı, yolcu sirkülasyonu ve batarya tedarik süreçlerinize göre fizibilite çalışmasını birlikte yapalım.
        </p>
        <div className="pt-2">
          <Link
            to="/iletisim"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1F5A43] text-white text-sm font-semibold hover:bg-[#184835] shadow-sm transition-all"
          >
            Demo ve İşbirliği Talebi Oluştur
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default BusinessModelView;

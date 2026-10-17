import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Cpu,
  Layers,
  ArrowRight,
  Building2,
  GraduationCap,
  Bus,
  CheckCircle2,
  Clock,
  Sparkles,
  BarChart3,
  Wrench,
  Flame,
  FileCheck2,
  SlidersHorizontal
} from 'lucide-react';

export const SolutionView: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16 animate-in fade-in duration-200">
      {/* 1. HERO BÖLÜMÜ */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#1F5A43] bg-[#E5F0EA] px-3.5 py-1.5 rounded-full border border-[#1F5A43]/20">
          <Sparkles className="w-3.5 h-3.5" /> Modüler Kent Enerji Mimarisi
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#182019] tracking-tight">
          İkinci Yaşam Bataryalar ile <br className="hidden sm:inline" />
          <span className="text-[#1F5A43]">Akıllı ve Güvenli Durak Altyapısı</span>
        </h1>
        <p className="text-base sm:text-lg text-[#5D665E] leading-relaxed">
          BeeHive, elektrikli araçlardan ayrılan %70-80 sağlık durumundaki bataryaları gelişmiş BMS ve çatı güneş panelleriyle harmanlayarak şehir şebekesine yük bindirmeden duraklarda kesintisiz kamu enerjisi sunar.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/iletisim"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#1F5A43] text-white text-sm font-semibold hover:bg-[#184835] shadow-sm transition-all"
          >
            Pilot Proje Başlat
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/teknoloji"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-[#DDE1DA] text-[#182019] text-sm font-semibold hover:bg-[#F6F6F2] transition-all"
          >
            Teknik Detayları Gör
          </Link>
        </div>
      </div>

      {/* 2. ÇÖZDÜĞÜMÜZ PROBLEM & DEĞER ÖNERİSİ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        <div className="bg-[#FFF8F6] border border-[#FADCD5] rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-[#FDEEEB] text-[#D84C32] flex items-center justify-center font-bold">
            !
          </div>
          <h2 className="text-xl font-bold text-[#182019]">Mevcut Durum & Karşılaşılan Sorunlar</h2>
          <ul className="space-y-3 text-sm text-[#5D665E]">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D84C32] mt-2 shrink-0" />
              <span><strong>Atıl EV Bataryaları:</strong> Otomotiv sektöründen %70-80 kapasitede ayrılan bataryalar ya erken geri dönüşüme gitmekte ya da depolarda beklemektedir.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D84C32] mt-2 shrink-0" />
              <span><strong>Şebeke Bağımlılığı & Kesintiler:</strong> Geleneksel durak aydınlatması ve dijital panolar elektrik şebekesindeki dalgalanmalardan doğrudan etkilenmektedir.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D84C32] mt-2 shrink-0" />
              <span><strong>Yüksek Şebeke Çekiş Maliyeti:</strong> Şehir duraklarının aydınlatma ve dijital ekran giderleri belediye bütçelerinde sürekli operasyonel yük oluşturur.</span>
            </li>
          </ul>
        </div>

        <div className="bg-[#E5F0EA]/40 border border-[#1F5A43]/20 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-[#E5F0EA] text-[#1F5A43] flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-[#182019]">BeeHive Çözüm Yaklaşımı</h2>
          <ul className="space-y-3 text-sm text-[#5D665E]">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#1F5A43] mt-0.5 shrink-0" />
              <span><strong>Döngüsel Ekonomi:</strong> İkinci yaşam bataryalara 5 ila 8 yıl ilave ekonomik ömür kazandırarak karbon ayak izini %40 azaltır.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#1F5A43] mt-0.5 shrink-0" />
              <span><strong>Yerinde Üretim & Tüketim:</strong> Çatı fotovoltaik paneller gündüz üretir, batarya depolar; durak aydınlatması ve USB şarj kesintisiz çalışır.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#1F5A43] mt-0.5 shrink-0" />
              <span><strong>Ada Modu Güvenilirliği:</strong> Şebeke kesintilerinde dahi kritik kamu aydınlatmasını ve acil çağrı/bilgilendirme ekranlarını aktif tutar.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 3. KİMLER İÇİN? HEDEF KİTLE */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#1F5A43] bg-[#E5F0EA] px-3 py-1 rounded-full border border-[#1F5A43]/20">
            Paydaşlar & Sektörler
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#182019]">
            BeeHive Kimler İçin Tasarlandı?
          </h2>
          <p className="text-sm text-[#5D665E]">
            Kamu kurumlarından özel kampüslere kadar ölçeklenebilir altyapı ihtiyaçlarına yönelik uyarlanabilir mimari.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-[#DDE1DA] rounded-2xl p-6 shadow-subtle space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#E5F0EA] text-[#1F5A43] flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#182019]">Büyükşehir ve İlçe Belediyeleri</h3>
            <p className="text-xs text-[#5D665E] leading-relaxed">
              Sürdürülebilir kentsel dönüşüm, sıfır atık hedefleri, kesintisiz durak aydınlatması ve vatandaş memnuniyetini artıran modern kamu hizmetleri.
            </p>
            <div className="pt-2 border-t border-[#DDE1DA] text-[11px] font-medium text-[#1F5A43]">
              Öne Çıkan: Karbon Azaltımı & Düşük İşletme Maliyeti
            </div>
          </div>

          <div className="bg-white border border-[#DDE1DA] rounded-2xl p-6 shadow-subtle space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#EAF2F6] text-[#416D86] flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#182019]">Üniversite Kampüsleri & Teknoparklar</h3>
            <p className="text-xs text-[#5D665E] leading-relaxed">
              Yeşil kampüs derecelendirmesi (GreenMetric), öğrencilere açık ücretsiz açık hava çalışma ve şarj alanları, anlık telemetri ve Ar-Ge veri akışı.
            </p>
            <div className="pt-2 border-t border-[#DDE1DA] text-[11px] font-medium text-[#416D86]">
              Öne Çıkan: Öğrenci Memnuniyeti & Telemetri Ar-Ge Verisi
            </div>
          </div>

          <div className="bg-white border border-[#DDE1DA] rounded-2xl p-6 shadow-subtle space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#FEF6E9] text-[#D59B2E] flex items-center justify-center">
              <Bus className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#182019]">Toplu Taşıma & Filo Operatörleri</h3>
            <p className="text-xs text-[#5D665E] leading-relaxed">
              Akıllı durak telemetrisi, yolcu bilgilendirme ekranlarının enerji sürekliliği ve transfer merkezlerinde mikromobilite şarj noktaları.
            </p>
            <div className="pt-2 border-t border-[#DDE1DA] text-[11px] font-medium text-[#D59B2E]">
              Öne Çıkan: Kesintisiz Sefer Bilgilendirmesi & Prestij
            </div>
          </div>
        </div>
      </div>

      {/* 4. MODÜLER KURULUM & FİZİKSEL YAPI */}
      <div className="bg-white border border-[#DDE1DA] rounded-2xl p-6 sm:p-8 space-y-6 shadow-subtle">
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#1F5A43] bg-[#E5F0EA] px-3 py-1 rounded-full border border-[#1F5A43]/20">
            Fiziksel Yapı & Güvenlik
          </span>
          <h2 className="text-2xl font-bold text-[#182019]">Modüler Donanım ve Koruma Seviyeleri</h2>
          <p className="text-sm text-[#5D665E]">
            Yolcu güvenliğini en üstte tutan ayrı kabin mimarisi ve zorlu iklim koşullarına dayanıklı endüstriyel bileşenler.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2 p-4 rounded-xl bg-[#F6F6F2] border border-[#DDE1DA]">
            <div className="flex items-center gap-2 text-[#182019] font-bold text-sm">
              <Flame className="w-4 h-4 text-[#D84C32]" />
              EI60 Yangın Dayanımlı Kabin
            </div>
            <p className="text-xs text-[#5D665E] leading-relaxed">
              Batarya bloğu, yolcu bekleme alanından izole edilmiş 60 dakika yangına ve duman sızdırmazlığına dirençli çelik kompartımanda muhafaza edilir.
            </p>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-[#F6F6F2] border border-[#DDE1DA]">
            <div className="flex items-center gap-2 text-[#182019] font-bold text-sm">
              <ShieldCheck className="w-4 h-4 text-[#1F5A43]" />
              Aerosol Yangın Bastırma
            </div>
            <p className="text-xs text-[#5D665E] leading-relaxed">
              Termal kaçak veya anormal sıcaklık artışı sensörler tarafından algılandığında kabin içi aerosol tüpü milisaniyeler içinde devreye girerek oksijeni keser.
            </p>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-[#F6F6F2] border border-[#DDE1DA]">
            <div className="flex items-center gap-2 text-[#182019] font-bold text-sm">
              <Layers className="w-4 h-4 text-[#416D86]" />
              IP65 İklim & Toz Koruması
            </div>
            <p className="text-xs text-[#5D665E] leading-relaxed">
              -20°C kış donlarından +55°C yaz kavurucu sıcaklıklarına kadar termoelektrik peltier iklimlendirme ve aktif fan tahliyesi.
            </p>
          </div>
        </div>
      </div>

      {/* 5. PİLOT ENTEGRASYON SÜRECİ (5 ADIM) */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#1F5A43] bg-[#E5F0EA] px-3 py-1 rounded-full border border-[#1F5A43]/20">
            Uygulama Metodolojisi
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#182019]">
            5 Adımda Anahtar Teslim Pilot Entegrasyonu
          </h2>
          <p className="text-sm text-[#5D665E]">
            Fikirden sahaya kadar riskleri minimize eden, belediye ve paydaş ekiplerini yormayan yalın adımlar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            {
              step: '01',
              title: 'Keşif & Analiz',
              desc: 'Durak lokasyonunun güneş ışınım verisi, yolcu yoğunluğu ve enerji ihtiyacı modellenir.',
              icon: SlidersHorizontal
            },
            {
              step: '02',
              title: 'Batarya Sınıflama',
              desc: 'EV bataryaları kapasite, iç direnç ve SOH (%75-80) testlerinden geçirilerek eşleştirilir.',
              icon: FileCheck2
            },
            {
              step: '03',
              title: 'Saha Kurulumu',
              desc: '1-2 günde altyapı kazısı gerekmeden modüler montaj ve güvenlik testleri tamamlanır.',
              icon: Wrench
            },
            {
              step: '04',
              title: 'Dijital İkiz & Test',
              desc: 'IoT gateway üzerinden uzaktan telemetri ve işletme yönetim paneli entegre edilir.',
              icon: Cpu
            },
            {
              step: '05',
              title: 'Raporlama & Karar',
              desc: '3 aylık pilot dönemi sonunda gerçek karbon ve enerji tasarruf raporu sunulur.',
              icon: BarChart3
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white border border-[#DDE1DA] rounded-xl p-4 shadow-subtle space-y-2.5 relative">
              <span className="text-xs font-mono font-bold text-[#1F5A43] bg-[#E5F0EA] px-2 py-0.5 rounded">
                {item.step}
              </span>
              <h4 className="text-sm font-bold text-[#182019] pt-1">{item.title}</h4>
              <p className="text-xs text-[#5D665E] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 6. ÇAĞRI (CTA) */}
      <div className="bg-[#1F5A43] text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-md">
        <div className="max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Şehrinizde Temiz Enerji Pilotunu Başlatalım
          </h2>
          <p className="text-sm sm:text-base text-white/80 leading-relaxed">
            Belediyeniz veya kampüsünüz için uygun durak lokasyonlarını birlikte belirleyelim; fizibilite ve enerji simülasyon raporunu 48 saat içinde hazırlayalım.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/iletisim"
            className="px-6 py-3 rounded-xl bg-white text-[#1F5A43] font-bold text-sm hover:bg-[#F6F6F2] shadow transition-all inline-flex items-center gap-2"
          >
            Demo Talebi & İletişim
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/is-modeli"
            className="px-6 py-3 rounded-xl bg-white/10 text-white border border-white/20 font-semibold text-sm hover:bg-white/20 transition-all inline-flex items-center gap-2"
          >
            İş Modeli ve Hizmet Paketleri
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SolutionView;

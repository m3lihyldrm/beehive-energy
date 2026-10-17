import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sun,
  Shield,
  BatteryCharging,
  Cpu,
  Zap,
  Lock,
  ArrowRight,
  Sparkles,
  Layers,
  ThermometerSnowflake,
  Wifi,
  Activity,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export const TechnologyView: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16 animate-in fade-in duration-200">
      {/* 1. HERO BÖLÜMÜ */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#1F5A43] bg-[#E5F0EA] px-3.5 py-1.5 rounded-full border border-[#1F5A43]/20">
          <Cpu className="w-3.5 h-3.5" /> Donanım & Yazılım Mimarisi
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#182019] tracking-tight">
          Yüksek Güvenlikli <br className="hidden sm:inline" />
          <span className="text-[#1F5A43]">Donanım ve Telemetri Katmanı</span>
        </h1>
        <p className="text-base sm:text-lg text-[#5D665E] leading-relaxed">
          Otomotiv standardında ikinci yaşam bataryalar, endüstriyel BMS mimarisi, IP65/EI60 korumalı modüler enerji kabini ve sıfır kişisel veri toplayan telemetri altyapısı.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/harita"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#1F5A43] text-white text-sm font-semibold hover:bg-[#184835] shadow-sm transition-all"
          >
            Durak Telemetrisini İncele
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/iletisim"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-[#DDE1DA] text-[#182019] text-sm font-semibold hover:bg-[#F6F6F2] transition-all"
          >
            Teknik Dokümantasyon İste
          </Link>
        </div>
      </div>

      {/* 2. TEKNOLOJİ BİLEŞENLERİ (6 TEMEL BLOK) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Güneş & MPPT */}
        <div className="bg-white border border-[#DDE1DA] rounded-2xl p-6 shadow-subtle space-y-4 hover:border-[#1F5A43]/40 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-[#FEF6E9] text-[#D59B2E] flex items-center justify-center">
            <Sun className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-[#182019]">Fotovoltaik Çatı & MPPT</h3>
            <span className="text-xs font-mono text-[#5D665E]">1.2 kWp Monokristal Panel</span>
          </div>
          <p className="text-xs text-[#5D665E] leading-relaxed">
            Durak saçak yapısına entegre, yüksek verimli monokristal PV paneller. Gelişmiş MPPT (Maximum Power Point Tracking) algoritması ile kısmi gölgelenmelerde bile %98.5 çevrim verimi.
          </p>
          <div className="pt-3 border-t border-[#DDE1DA] flex items-center gap-2 text-[11px] text-[#182019] font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#1F5A43]" />
            Dahili aşırı gerilim ve yıldırım koruması (SPD Tip 2)
          </div>
        </div>

        {/* İkinci Yaşam EV Bataryası */}
        <div className="bg-white border border-[#DDE1DA] rounded-2xl p-6 shadow-subtle space-y-4 hover:border-[#1F5A43]/40 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-[#E5F0EA] text-[#1F5A43] flex items-center justify-center">
            <BatteryCharging className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-[#182019]">İkinci Yaşam EV Bataryası</h3>
            <span className="text-xs font-mono text-[#5D665E]">5.2 - 6.5 kWh LiFePO4 / NMC</span>
          </div>
          <p className="text-xs text-[#5D665E] leading-relaxed">
            Elektrikli araçlardan ayrılan %70-80 sağlık durumundaki (SOH) paketler laboratuvar testlerinden geçirilerek sınıflandırılır. Hücre düzeyinde aktif dengeleme ile güvenli ikinci yaşam döngüsü.
          </p>
          <div className="pt-3 border-t border-[#DDE1DA] flex items-center gap-2 text-[11px] text-[#182019] font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#1F5A43]" />
            3.000+ ek şarj/deşarj döngüsü ömrü
          </div>
        </div>

        {/* EI60 Güvenli Kabin */}
        <div className="bg-white border border-[#DDE1DA] rounded-2xl p-6 shadow-subtle space-y-4 hover:border-[#1F5A43]/40 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-[#EAF2F6] text-[#416D86] flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-[#182019]">EI60 Güvenli Kabin</h3>
            <span className="text-xs font-mono text-[#5D665E]">Ayrı Kompartıman İzolasyonu</span>
          </div>
          <p className="text-xs text-[#5D665E] leading-relaxed">
            60 dakika yangına dayanımlı çift cidar çelik kabin, dahili aerosol gazlı yangın söndürme modülü, termal kaçak erken uyarı sensörleri ve IP65 sızdırmazlık.
          </p>
          <div className="pt-3 border-t border-[#DDE1DA] flex items-center gap-2 text-[11px] text-[#182019] font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#1F5A43]" />
            Yolcu bekleme alanından fiziksel tam izolasyon
          </div>
        </div>

        {/* Endüstriyel BMS & Telemetri */}
        <div className="bg-white border border-[#DDE1DA] rounded-2xl p-6 shadow-subtle space-y-4 hover:border-[#1F5A43]/40 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-[#E5F0EA] text-[#1F5A43] flex items-center justify-center">
            <Activity className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-[#182019]">Akıllı BMS & Telemetri</h3>
            <span className="text-xs font-mono text-[#5D665E]">LTE-M / NB-IoT / MQTT</span>
          </div>
          <p className="text-xs text-[#5D665E] leading-relaxed">
            Hücre gerilimleri, modül sıcaklıkları, SOC (Şarj Seviyesi), SOH (Sağlık Seviyesi) ve anlık akım değerleri 10 saniyede bir merkeze şifreli MQTT kanalıyla iletilir.
          </p>
          <div className="pt-3 border-t border-[#DDE1DA] flex items-center gap-2 text-[11px] text-[#182019] font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#1F5A43]" />
            Uzaktan acil güç kesme (Emergency Trip) yeteneği
          </div>
        </div>

        {/* İnvertör & Kamu Dağıtım */}
        <div className="bg-white border border-[#DDE1DA] rounded-2xl p-6 shadow-subtle space-y-4 hover:border-[#1F5A43]/40 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-[#FEF6E9] text-[#D59B2E] flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-[#182019]">Kamu Enerji Dağıtım Modülü</h3>
            <span className="text-xs font-mono text-[#5D665E]">USB-C PD, Qi & 220V AC</span>
          </div>
          <p className="text-xs text-[#5D665E] leading-relaxed">
            Vatandaşların güvenle kullanımına açık 65W hızlı şarj portları, kablosuz şarj alanı, akıllı LED aydınlatma sürücüsü ve acil durum priz hattı. Kaçak akım rölesi korumalıdır.
          </p>
          <div className="pt-3 border-t border-[#DDE1DA] flex items-center gap-2 text-[11px] text-[#182019] font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#1F5A43]" />
            Aşırı akım ve kısa devreye karşı bağımsız sigortalar
          </div>
        </div>

        {/* Gizlilik & KVKK */}
        <div className="bg-white border border-[#DDE1DA] rounded-2xl p-6 shadow-subtle space-y-4 hover:border-[#1F5A43]/40 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-[#EAF2F6] text-[#416D86] flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-[#182019]">Sıfır Kişisel Veri Güvencesi</h3>
            <span className="text-xs font-mono text-[#5D665E]">KVKK ve GDPR Uyumlu Tasarım</span>
          </div>
          <p className="text-xs text-[#5D665E] leading-relaxed">
            Sistemde hiçbir kamera, mikrofon veya biyometrik algılayıcı yer almaz. Telemetri yalnızca anonim elektriksel değerleri (kW, V, °C) ölçer; yolcu mahremiyeti tam koruma altındadır.
          </p>
          <div className="pt-3 border-t border-[#DDE1DA] flex items-center gap-2 text-[11px] text-[#182019] font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#1F5A43]" />
            Uçtan uca TLS 1.3 şifreleme ve donanımsal HSM
          </div>
        </div>
      </div>

      {/* 3. ENERJİ KARAR DESTEK ALGORİTMASI DETAYI */}
      <div className="bg-[#182019] text-white rounded-3xl p-6 sm:p-10 space-y-6 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#D59B2E] bg-[#D59B2E]/10 px-3 py-1 rounded-full border border-[#D59B2E]/30">
              Yazılım Mantığı
            </span>
            <h2 className="text-xl sm:text-2xl font-bold mt-2">
              Kural Tabanlı Enerji Karar Destek Algoritması
            </h2>
            <p className="text-xs sm:text-sm text-white/70 mt-1">
              Gereksiz karmaşıklıktan uzak, deterministik ve sahada %100 güvenilirliği kanıtlanmış akıllı enerji yönetimi.
            </p>
          </div>
          <div className="text-xs font-mono bg-white/5 border border-white/10 px-3 py-2 rounded-lg text-white/80 shrink-0">
            Döngü Sıklığı: 10 saniye
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
            <div className="font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1F5A43]" />
              Gündüz Şarj Önceliği (Güneş &gt; Tüketim)
            </div>
            <p className="text-xs text-white/70 leading-relaxed">
              PV üretimi tüketimden yüksek olduğunda doğrudan batarya şarj edilir. Şebeke çekişi tamamen kesilir (Sıfır İthalat).
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
            <div className="font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D59B2E]" />
              Akşam & Gece Pik Saat Yönetimi
            </div>
            <p className="text-xs text-white/70 leading-relaxed">
              18:00 - 22:00 saatleri arasında depolanan temiz enerji kullanılır. Şebekenin en pahalı olduğu zaman diliminde yerel kaynak tüketilir.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
            <div className="font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D84C32]" />
              Kritik SOC & Şebeke Destek Modu
            </div>
            <p className="text-xs text-white/70 leading-relaxed">
              Batarya doluluğu %20 altına inerse, batarya hücre ömrünü korumak amacıyla kamu şarjı kısıtlanır, sadece durak aydınlatması çalışır.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-white/60">
          <AlertTriangle className="w-4 h-4 text-[#D59B2E] shrink-0" />
          <span>
            Not: Şebekeye enerji satışı/enjeksiyonu birincil gelir kaynağı değildir; yalnızca yerel dağıtım şirketi (EDAŞ) teknik onayı ve çift yönlü sayaç izinlerine bağlı olarak planlanan faz 2 opsiyonudur.
          </span>
        </div>
      </div>

      {/* 4. ÇAĞRI (CTA) */}
      <div className="text-center max-w-xl mx-auto space-y-4">
        <h3 className="text-2xl font-bold text-[#182019]">Teknik Detayları Görüşmek İster misiniz?</h3>
        <p className="text-sm text-[#5D665E]">
          Mühendislik ekibimiz ile durağınızın güneş potansiyelini ve ikinci yaşam batarya uyumluluğunu değerlendirin.
        </p>
        <Link
          to="/iletisim"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1F5A43] text-white text-sm font-semibold hover:bg-[#184835] shadow-sm transition-all"
        >
          Teknik Ekiple İletişime Geç
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
export default TechnologyView;

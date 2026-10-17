import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  ArrowRight,
  ShieldCheck,
  Lock,
  BatteryCharging,
  Eye,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Compass,
  FileText,
  MessageSquare,
  Sparkles,
  Zap,
  Radio,
  Cpu
} from 'lucide-react';
import { ValueCard } from './ValueCard';
import { EnergyFlowDiagram } from './EnergyFlowDiagram';
import { SimulationBanner } from './common/SimulationBanner';
import { DemoRequestCTA } from './DemoRequestCTA';
import { trackEvent } from '../services/analytics';

interface HomeViewProps {
  onNavigate?: (tab: any) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 sm:space-y-24 py-6 sm:py-12 animate-in fade-in duration-200">
      {/* 1. HERO BÖLÜMÜ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#DDE1DA] rounded-3xl p-6 sm:p-12 lg:p-16 shadow-subtle relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Sol Taraf: Startup Konumlandırma & Değer Önerisi */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5F0EA] border border-[#1F5A43]/20 text-xs font-semibold text-[#1F5A43]">
                <Sparkles className="w-3.5 h-3.5 text-[#F3B33D]" />
                <span>Temiz Teknoloji · Akıllı Kent Altyapısı</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#182019] leading-[1.15]">
                İkinci Yaşam Enerjiden Akıllı Şehirlere.
              </h1>

              <p className="text-base sm:text-lg text-[#5D665E] leading-relaxed max-w-2xl">
                BeeHive, ikinci yaşam elektrikli araç bataryalarını güneş enerjisiyle birleştirerek akıllı duraklarda güvenli, izlenebilir ve erişilebilir kamusal enerji hizmetleri sunan modüler kent altyapısıdır.
              </p>

              {/* Startup CTA Butonları */}
              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                <Link
                  to="/cozum"
                  className="px-6 py-3.5 rounded-xl bg-[#1F5A43] hover:bg-[#174634] text-white font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-subtle cursor-pointer hover:shadow-elevated"
                >
                  <span>Çözümü İncele</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/iletisim"
                  onClick={() => trackEvent('demo_request_cta_clicked', { source: 'home_hero' })}
                  className="px-6 py-3.5 rounded-xl bg-[#F6F6F2] hover:bg-[#EFF0EB] text-[#182019] border border-[#DDE1DA] font-semibold text-xs sm:text-sm transition-colors flex items-center gap-2 cursor-pointer focus:ring-2 focus:ring-[#1F5A43] focus:outline-none min-h-[44px]"
                >
                  <span>Demo Talebi Oluştur</span>
                </Link>
              </div>

              {/* Alt Bilgi */}
              <div className="pt-4 border-t border-[#DDE1DA] flex flex-wrap items-center justify-between gap-3 text-xs text-[#5D665E]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#1F5A43]" />
                  <span className="font-medium text-[#182019]">
                    Dijital platform · Demo/simülasyon verisiyle çalışır
                  </span>
                </div>
                <Link
                  to="/harita"
                  className="text-xs font-semibold text-[#1F5A43] hover:underline flex items-center gap-1"
                >
                  <span>Konya Pilot Haritası</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Sağ Taraf: Örnek Durak Ağı & Güvenli Kabin Kartı */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-[#F6F6F2] border border-[#DDE1DA] rounded-2xl p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-[#DDE1DA] pb-3">
                  <div className="text-xs font-bold text-[#182019] uppercase tracking-wide">
                    Konya Referans Durak Ağı
                  </div>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-white border border-[#DDE1DA] text-[#1F5A43] font-semibold font-mono">
                    Örnek Durak Ağı (6 İstasyon)
                  </span>
                </div>

                <div className="bg-white rounded-xl border border-[#DDE1DA] p-5 space-y-3.5 shadow-2xs">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#E5F0EA] border border-[#1F5A43]/20 flex items-center justify-center text-[#1F5A43] shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#182019]">
                        Ayrı Güvenli Enerji Kabini
                      </h4>
                      <p className="text-[11px] text-[#5D665E] leading-relaxed mt-0.5">
                        Batarya oturma alanında değil; durağın arkasında, kilitli, havalandırmalı ve EI60 yangın dayanımlı harici kabinde korunur.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 text-center text-xs">
                    <div className="p-2.5 rounded-lg bg-[#F6F6F2] border border-[#DDE1DA]">
                      <span className="text-[10px] text-[#5D665E] block">Güneş Üretimi</span>
                      <span className="font-bold text-[#182019] text-sm sm:text-base tabular-nums">42.8 kWh/gün</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#F6F6F2] border border-[#DDE1DA]">
                      <span className="text-[10px] text-[#5D665E] block">Temiz Enerji</span>
                      <span className="font-bold text-[#1F5A43] text-sm sm:text-base tabular-nums">%84 Ortalama</span>
                    </div>
                  </div>
                </div>

                <SimulationBanner
                  variant="info"
                  message="Şeffaflık İlkesi:"
                  subtext="Halk API'sinde teknik telemetri paylaşımı kısıtlanmıştır; kurumsal izleme işletme yönetim panelindedir."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROBLEM - FIRSAT - ÇÖZÜM BÖLÜMÜ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#1F5A43]">
              Döngüsel Ekonomi Fırsatı
            </h2>
            <h3 className="text-2xl sm:text-4xl font-bold text-[#182019] tracking-tight">
              Problemden Kamusal Değere
            </h3>
            <p className="text-xs sm:text-sm text-[#5D665E]">
              Elektrikli araç ekosistemi büyürken batarya atık riskini akıllı şehirlere sürdürülebilir enerji kaynağı olarak dönüştürüyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Problem */}
            <div className="bg-white border border-[#DDE1DA] rounded-2xl p-6 sm:p-7 shadow-subtle space-y-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#FCECEC] border border-[#B94040]/30 flex items-center justify-center text-[#B94040]">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-[#B94040] uppercase tracking-wider block">
                01 · Problem
              </span>
              <h4 className="text-base font-bold text-[#182019]">
                Erken Geri Dönüşüm Riski
              </h4>
              <p className="text-xs sm:text-sm text-[#5D665E] leading-relaxed">
                Elektrikli araç bataryaları araç performansı için yetersiz hale geldiğinde erken geri dönüşüme yönlendirilebiliyor.
              </p>
            </div>

            {/* Fırsat */}
            <div className="bg-white border border-[#DDE1DA] rounded-2xl p-6 sm:p-7 shadow-subtle space-y-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#FDF3D9] border border-[#F3B33D]/40 flex items-center justify-center text-[#D59B2E]">
                <Lightbulb className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-[#D59B2E] uppercase tracking-wider block">
                02 · Fırsat
              </span>
              <h4 className="text-base font-bold text-[#182019]">
                Sabit Depolama Potansiyeli
              </h4>
              <p className="text-xs sm:text-sm text-[#5D665E] leading-relaxed">
                Bu bataryaların bir kısmı, düşük güçlü sabit enerji depolama uygulamaları için hâlâ değer taşıyabilir.
              </p>
            </div>

            {/* Çözüm */}
            <div className="bg-white border border-[#1F5A43]/40 rounded-2xl p-6 sm:p-7 shadow-subtle space-y-3.5 bg-linear-to-b from-white to-[#F6F9F7]">
              <div className="w-10 h-10 rounded-xl bg-[#E5F0EA] border border-[#1F5A43]/30 flex items-center justify-center text-[#1F5A43]">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-[#1F5A43] uppercase tracking-wider block">
                03 · Çözüm
              </span>
              <h4 className="text-base font-bold text-[#182019]">
                BeeHive Akıllı Altyapı
              </h4>
              <p className="text-xs sm:text-sm text-[#5D665E] leading-relaxed">
                BeeHive, uygun bataryaları güvenli enerji kabininde güneş enerjisiyle birleştirerek kamusal hizmetlere dönüştürür.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ÜÇ DEĞER KARTI */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#1F5A43]">
              Temel İlkelerimiz
            </h2>
            <h3 className="text-2xl sm:text-4xl font-bold text-[#182019] tracking-tight">
              Güvenli, Şeffaf ve İkinci Yaşam Odaklı
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ValueCard
              icon={<BatteryCharging className="w-6 h-6" />}
              tag="Döngüsel Enerji"
              title="İkinci Yaşam Enerji"
              description="Araç kullanımına uygunluğu azalan EV bataryaları, test ve güvenlik değerlendirmesi sonrasında sabit depolamada değerlendirilir."
            />

            <ValueCard
              icon={<ShieldCheck className="w-6 h-6" />}
              tag="Fiziksel İzolasyon"
              title="Güvenli Enerji Kabini"
              description="Batarya, vatandaş erişiminden ayrı, kilitli ve havalandırmalı bir kabinde konumlandırılır."
            />

            <ValueCard
              icon={<Eye className="w-6 h-6" />}
              tag="Açık Yönetim"
              title="Şeffaf Kent Altyapısı"
              description="Vatandaş harita ve hizmet bilgisi görür; işletmeci enerji, batarya ve bakım verilerini izler."
            />
          </div>
        </div>
      </section>

      {/* 4. BEEHIVE ENERJİ AKIŞI ŞEMASI */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <EnergyFlowDiagram />
      </section>

      {/* 5. ÜRÜN MODÜLLERİ BÖLÜMÜ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#DDE1DA] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-subtle space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#1F5A43]">
                Entegre Ürün Mimarisi
              </span>
              <h3 className="text-xl sm:text-3xl font-bold text-[#182019] mt-1">
                Kapsamlı Kent Altyapısı Modülleri
              </h3>
              <p className="text-xs sm:text-sm text-[#5D665E] mt-1 max-w-2xl">
                BeeHive; vatandaş deneyimi, saha işletimi ve enerji karar desteğini tek bir platformda birleştirir.
              </p>
            </div>

            <Link
              to="/cozum"
              className="text-xs font-semibold text-[#1F5A43] hover:underline flex items-center gap-1"
            >
              <span>Tüm Çözüm Detayları</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <Link
              to="/harita"
              className="p-5 rounded-2xl border border-[#DDE1DA] hover:border-[#1F5A43] hover:bg-[#F6F9F7] text-left transition group block shadow-2xs"
            >
              <div className="w-10 h-10 rounded-xl bg-[#E5F0EA] flex items-center justify-center text-[#1F5A43] mb-3 group-hover:scale-105 transition-transform">
                <Compass className="w-5 h-5" />
              </div>
              <h5 className="text-sm font-bold text-[#182019]">Şehir Haritası</h5>
              <p className="text-xs text-[#5D665E] mt-1 leading-snug">
                Petek pinlerle durak konumları, mesafe ve hizmet filtreleme.
              </p>
            </Link>

            <Link
              to="/harita"
              className="p-5 rounded-2xl border border-[#DDE1DA] hover:border-[#1F5A43] hover:bg-[#F6F9F7] text-left transition group block shadow-2xs"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FDF3D9] flex items-center justify-center text-[#D59B2E] mb-3 group-hover:scale-105 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
              <h5 className="text-sm font-bold text-[#182019]">Durak Detayı</h5>
              <p className="text-xs text-[#5D665E] mt-1 leading-snug">
                USB, priz, iklimlendirme ve 7 günlük enerji trendi.
              </p>
            </Link>

            <Link
              to="/harita"
              className="p-5 rounded-2xl border border-[#DDE1DA] hover:border-[#1F5A43] hover:bg-[#F6F9F7] text-left transition group block shadow-2xs"
            >
              <div className="w-10 h-10 rounded-xl bg-[#EAF2F6] flex items-center justify-center text-[#416D86] mb-3 group-hover:scale-105 transition-transform">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h5 className="text-sm font-bold text-[#182019]">Geri Bildirim</h5>
              <p className="text-xs text-[#5D665E] mt-1 leading-snug">
                Anonim vatandaş bildirimleri ve takip kodu sistemi.
              </p>
            </Link>

            <Link
              to="/admin"
              className="p-5 rounded-2xl border border-[#DDE1DA] hover:border-[#1F5A43] hover:bg-[#F6F9F7] text-left transition group block shadow-2xs"
            >
              <div className="w-10 h-10 rounded-xl bg-[#EFF0EB] flex items-center justify-center text-[#182019] mb-3 group-hover:scale-105 transition-transform">
                <Lock className="w-5 h-5" />
              </div>
              <h5 className="text-sm font-bold text-[#182019]">İşletme Yönetim Paneli</h5>
              <p className="text-xs text-[#5D665E] mt-1 leading-snug">
                Operasyon kontrolü, uyarılar ve karar destek algoritması.
              </p>
            </Link>

            <Link
              to="/teknoloji"
              className="p-5 rounded-2xl border border-[#DDE1DA] hover:border-[#1F5A43] hover:bg-[#F6F9F7] text-left transition group block shadow-2xs"
            >
              <div className="w-10 h-10 rounded-xl bg-[#E5F0EA] flex items-center justify-center text-[#1F5A43] mb-3 group-hover:scale-105 transition-transform">
                <Cpu className="w-5 h-5" />
              </div>
              <h5 className="text-sm font-bold text-[#182019]">Enerji Telemetrisi</h5>
              <p className="text-xs text-[#5D665E] mt-1 leading-snug">
                BMS hücre voltajı, SOH/SOC ve EI60 kabin sensörleri.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. DEMO TALEBİ CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DemoRequestCTA />
      </section>
    </div>
  );
};

export default HomeView;

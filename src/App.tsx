import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Navigate, Link } from 'react-router-dom';
import { Navbar, NavTab, TAB_ROUTES, PATH_TO_TAB } from './components/Navbar';
import { BeeHiveLogo } from './components/BeeHiveLogo';
import { PublicStation } from './types';
import { getPublicStations } from './services/api';
import { fallbackStations } from './services/mockData';
import { ShieldCheck, Lock, Sparkles, Loader2 } from 'lucide-react';

// Code-splitting with React.lazy
const HomeView = lazy(() => import('./components/HomeView').then((m) => ({ default: m.HomeView })));
const SolutionView = lazy(() => import('./components/SolutionView').then((m) => ({ default: m.SolutionView })));
const TechnologyView = lazy(() => import('./components/TechnologyView').then((m) => ({ default: m.TechnologyView })));
const CityMapView = lazy(() => import('./components/CityMapView').then((m) => ({ default: m.CityMapView })));
const HowItWorksView = lazy(() => import('./components/HowItWorksView').then((m) => ({ default: m.HowItWorksView })));
const ImpactView = lazy(() => import('./components/ImpactView').then((m) => ({ default: m.ImpactView })));
const BusinessModelView = lazy(() => import('./components/BusinessModelView').then((m) => ({ default: m.BusinessModelView })));
const FaqView = lazy(() => import('./components/FaqView').then((m) => ({ default: m.FaqView })));
const ContactView = lazy(() => import('./components/ContactView').then((m) => ({ default: m.ContactView })));
const AdminPortal = lazy(() => import('./components/AdminPortal').then((m) => ({ default: m.AdminPortal })));
const PrivacyPolicyView = lazy(() => import('./components/PrivacyPolicyView').then((m) => ({ default: m.PrivacyPolicyView })));
const TermsOfUseView = lazy(() => import('./components/TermsOfUseView').then((m) => ({ default: m.TermsOfUseView })));
const CookiePolicyView = lazy(() => import('./components/CookiePolicyView').then((m) => ({ default: m.CookiePolicyView })));

import { SEOHead } from './components/common/SEOHead';

const PageLoader: React.FC = () => (
  <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3 text-[#5D665E]">
    <Loader2 className="w-8 h-8 text-[#1F5A43] animate-spin" />
    <span className="text-xs font-medium">Yükleniyor...</span>
  </div>
);

const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [stations, setStations] = useState<PublicStation[]>(fallbackStations);

  // Aktif sekme hesaplama
  const currentTab: NavTab = PATH_TO_TAB[location.pathname.toLowerCase()] || 'home';

  useEffect(() => {
    getPublicStations().then((data) => {
      if (data && data.length > 0) {
        setStations(data);
      }
    });
  }, []);

  const handleNavigate = (tab: NavTab) => {
    navigate(TAB_ROUTES[tab]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Eğer /admin yolundaysak, bağımsız İşletme Yönetim Paneli göster
  const isAdminPath = location.pathname.toLowerCase().startsWith('/admin');
  if (isAdminPath) {
    return (
      <Suspense fallback={<PageLoader />}>
        <SEOHead />
        <AdminPortal onBackToPublic={() => navigate('/')} />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F6F2] text-[#182019] flex flex-col font-sans selection:bg-[#1F5A43] selection:text-white">
      {/* Dynamic SEO Meta Tags */}
      <SEOHead />

      {/* Global Navbar */}
      <Navbar currentTab={currentTab} onNavigate={handleNavigate} />

      {/* Main View Area with Routes & Suspense */}
      <main className="flex-1 w-full">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomeView onNavigate={handleNavigate} />} />
            <Route path="/cozum" element={<SolutionView />} />
            <Route path="/solution" element={<Navigate to="/cozum" replace />} />
            <Route path="/teknoloji" element={<TechnologyView />} />
            <Route path="/technology" element={<Navigate to="/teknoloji" replace />} />
            <Route path="/harita" element={<CityMapView stations={stations} />} />
            <Route path="/map" element={<Navigate to="/harita" replace />} />
            <Route path="/nasil-calisir" element={<HowItWorksView />} />
            <Route path="/nasil" element={<Navigate to="/nasil-calisir" replace />} />
            <Route path="/etki" element={<ImpactView />} />
            <Route path="/impact" element={<Navigate to="/etki" replace />} />
            <Route path="/is-modeli" element={<BusinessModelView />} />
            <Route path="/business-model" element={<Navigate to="/is-modeli" replace />} />
            <Route path="/sss" element={<FaqView />} />
            <Route path="/faq" element={<Navigate to="/sss" replace />} />
            <Route path="/iletisim" element={<ContactView />} />
            <Route path="/contact" element={<Navigate to="/iletisim" replace />} />
            <Route path="/gizlilik-politikasi" element={<PrivacyPolicyView />} />
            <Route path="/kullanim-kosullari" element={<TermsOfUseView />} />
            <Route path="/cerez-politikasi" element={<CookiePolicyView />} />
            <Route path="/admin" element={<AdminPortal onBackToPublic={() => navigate('/')} />} />
            <Route path="/admin/*" element={<AdminPortal onBackToPublic={() => navigate('/')} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>

      {/* SAKİN KURUMSAL FOOTER */}
      <footer className="bg-white border-t border-[#DDE1DA] text-[#5D665E] py-12 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Marka & Tanım */}
            <div className="space-y-4">
              <Link to="/" className="inline-block focus:outline-none">
                <BeeHiveLogo size="md" subtext="İkinci Yaşam Enerjiden Akıllı Şehirlere" />
              </Link>
              <p className="text-xs text-[#5D665E] leading-relaxed">
                BeeHive, ikinci yaşam elektrikli araç bataryalarını güneş enerjisiyle birleştirerek akıllı duraklarda güvenli, izlenebilir ve erişilebilir kamusal enerji hizmetleri sunan modüler kent altyapısıdır.
              </p>
              <div className="flex items-center gap-2 text-xs text-[#1F5A43] font-medium bg-[#E5F0EA]/60 border border-[#1F5A43]/20 px-3 py-2 rounded-xl">
                <ShieldCheck className="w-4 h-4 shrink-0 text-[#1F5A43]" />
                <span>Batarya ayrı güvenli enerji kabininde korunur.</span>
              </div>
            </div>

            {/* Hızlı Menü */}
            <div className="space-y-2 text-xs">
              <div className="font-bold text-[#182019] uppercase tracking-wider mb-2">Kurumsal & Ürün</div>
              <div><Link to="/" className="hover:text-[#182019] transition">Ana Sayfa</Link></div>
              <div><Link to="/cozum" className="hover:text-[#182019] transition">Çözüm & Yaklaşım</Link></div>
              <div><Link to="/teknoloji" className="hover:text-[#182019] transition">Teknoloji & Donanım</Link></div>
              <div><Link to="/harita" className="hover:text-[#182019] transition">Konya Pilot Haritası</Link></div>
              <div><Link to="/etki" className="hover:text-[#182019] transition">Sürdürülebilirlik & Etki</Link></div>
              <div><Link to="/is-modeli" className="hover:text-[#182019] transition">İş Modeli & Paketler</Link></div>
              <div><Link to="/sss" className="hover:text-[#182019] transition">Sıkça Sorulan Sorular</Link></div>
              <div><Link to="/iletisim" className="hover:text-[#182019] transition">Demo Talebi & İletişim</Link></div>
            </div>

            {/* Yasal & KVKK */}
            <div className="space-y-2 text-xs">
              <div className="font-bold text-[#182019] uppercase tracking-wider mb-2">Yasal & KVKK</div>
              <div><Link to="/gizlilik-politikasi" className="hover:text-[#182019] transition">Gizlilik ve KVKK Politikası</Link></div>
              <div><Link to="/kullanim-kosullari" className="hover:text-[#182019] transition">Kullanım Koşulları</Link></div>
              <div><Link to="/cerez-politikasi" className="hover:text-[#182019] transition">Çerez Politikası</Link></div>
              <p className="text-[11px] text-[#7A837B] pt-2 leading-relaxed">
                Konum izni yalnızca en yakın durak hesaplaması için kullanılır. Konum verisi sunucularda kalıcı olarak saklanmaz.
              </p>
            </div>

            {/* Şeffaflık & Operasyon */}
            <div className="space-y-2 text-xs text-[#5D665E]">
              <div className="font-bold text-[#182019] uppercase tracking-wider mb-2">Şeffaflık & Mevzuat</div>
              <p>
                <strong>Pilot Demo:</strong> Harita ve telemetri ekranlarında sunulan veriler simülasyon amaçlıdır; fiziksel donanım testleri bağımsız kabinlerde yürütülmektedir.
              </p>
              <p>
                <strong>Şebeke Entegrasyonu:</strong> Şebeke aktarımı; ilgili EPDK mevzuatı, yerel dağıtım şirketi (EDAŞ) onayı ve teknik uygunluğa bağlı planlanan bir opsiyondur.
              </p>
              <div className="pt-2">
                <Link
                  to="/admin"
                  className="text-xs text-[#5D665E] hover:text-[#182019] transition flex items-center gap-1.5 py-1 px-2 rounded border border-[#DDE1DA] bg-[#F6F6F2] inline-flex"
                >
                  <Lock className="w-3 h-3 text-[#5D665E]" />
                  <span>Yetkili Operasyon Erişimi</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#DDE1DA] flex flex-wrap items-center justify-between gap-4 text-xs text-[#5D665E]">
            <div className="flex items-center gap-3 flex-wrap">
              <span>© 2026 BeeHive Energy. Tüm hakları saklıdır.</span>
              <span>·</span>
              <Link to="/gizlilik-politikasi" className="hover:text-[#182019] transition">Gizlilik</Link>
              <span>·</span>
              <Link to="/kullanim-kosullari" className="hover:text-[#182019] transition">Kullanım Koşulları</Link>
              <span>·</span>
              <Link to="/cerez-politikasi" className="hover:text-[#182019] transition">Çerezler</Link>
            </div>
            <div className="text-[11px] max-w-xl text-right">
              Halk API’sinde teknik telemetri paylaşımı tasarım gereği engellenmiştir; bu ayrım otomatik testlerle doğrulanmaktadır.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;

import React, { useState } from 'react';
import {
  MapPin,
  HelpCircle,
  BarChart3,
  MessageCircleQuestion,
  Lock,
  Menu,
  X,
  Sparkles,
  ArrowRight,
  Layers,
  Cpu,
  Briefcase,
  Mail
} from 'lucide-react';
import { useNavigate, useLocation, useInRouterContext, Link } from 'react-router-dom';
import { BeeHiveLogo } from './BeeHiveLogo';
import { trackEvent } from '../services/analytics';

export type NavTab =
  | 'home'
  | 'solution'
  | 'technology'
  | 'map'
  | 'how-it-works'
  | 'impact'
  | 'business-model'
  | 'faq'
  | 'contact'
  | 'admin'
  | 'privacy'
  | 'terms'
  | 'cookies';

export const TAB_ROUTES: Record<NavTab, string> = {
  home: '/',
  solution: '/cozum',
  technology: '/teknoloji',
  map: '/harita',
  'how-it-works': '/nasil-calisir',
  impact: '/etki',
  'business-model': '/is-modeli',
  faq: '/sss',
  contact: '/iletisim',
  admin: '/admin',
  privacy: '/gizlilik-politikasi',
  terms: '/kullanim-kosullari',
  cookies: '/cerez-politikasi'
};

export const PATH_TO_TAB: Record<string, NavTab> = {
  '/': 'home',
  '/cozum': 'solution',
  '/solution': 'solution',
  '/teknoloji': 'technology',
  '/technology': 'technology',
  '/harita': 'map',
  '/map': 'map',
  '/nasil-calisir': 'how-it-works',
  '/nasil': 'how-it-works',
  '/etki': 'impact',
  '/impact': 'impact',
  '/is-modeli': 'business-model',
  '/business-model': 'business-model',
  '/sss': 'faq',
  '/faq': 'faq',
  '/iletisim': 'contact',
  '/contact': 'contact',
  '/admin': 'admin',
  '/gizlilik-politikasi': 'privacy',
  '/kullanim-kosullari': 'terms',
  '/cerez-politikasi': 'cookies'
};

export interface NavbarProps {
  currentTab?: NavTab;
  onNavigate?: (tab: NavTab) => void;
}

const NavbarInner: React.FC<NavbarProps> = ({
  currentTab: propTab,
  onNavigate
}) => {
  const inRouter = useInRouterContext();
  const navigate = inRouter ? useNavigate() : null;
  const location = useLocation ? (inRouter ? useLocation() : null) : null;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Router path'i ile sekme senkronizasyonu
  const activeTab: NavTab =
    propTab || (location ? PATH_TO_TAB[location.pathname.toLowerCase()] || 'home' : 'home');

  const navItems: { id: NavTab; label: string; path: string }[] = [
    { id: 'home', label: 'Ana Sayfa', path: '/' },
    { id: 'solution', label: 'Çözüm', path: '/cozum' },
    { id: 'technology', label: 'Teknoloji', path: '/teknoloji' },
    { id: 'map', label: 'Şehir Haritası', path: '/harita' },
    { id: 'impact', label: 'Etki', path: '/etki' },
    { id: 'business-model', label: 'İş Modeli', path: '/is-modeli' },
    { id: 'faq', label: 'SSS', path: '/sss' },
    { id: 'contact', label: 'İletişim', path: '/iletisim' }
  ];

  const handleItemClick = (tab: NavTab) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(tab);
    }
    if (navigate) {
      navigate(TAB_ROUTES[tab]);
    }
  };

  return (
    <>
      {/* SAKİN BİLGİLENDİRME BANDI */}
      <div className="bg-[#EFF0EB] border-b border-[#DDE1DA] text-xs py-1.5 px-4 sm:px-6 text-[#5D665E] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1F5A43]" />
          <span className="font-semibold text-[#182019]">Pilot Arayüz</span>
          <span>·</span>
          <span>Gösterilen telemetri ve etki değerleri konsept simülasyonudur.</span>
        </div>
        <div className="text-[11px] hidden sm:block text-[#5D665E]">
          Konya Pilot Bölgesi · Modüler Enerji Altyapısı
        </div>
      </div>

      {/* ANA NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b border-[#DDE1DA] text-[#182019]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* LOGO */}
            {inRouter ? (
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="group focus:outline-none"
              >
                <BeeHiveLogo size="md" subtext="İkinci Yaşam Enerji" />
              </Link>
            ) : (
              <button
                onClick={() => handleItemClick('home')}
                className="group focus:outline-none text-left"
              >
                <BeeHiveLogo size="md" subtext="İkinci Yaşam Enerji" />
              </button>
            )}

            {/* MASAÜSTÜ MENÜ */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                if (inRouter) {
                  return (
                    <Link
                      key={item.id}
                      to={item.path}
                      onClick={() => onNavigate && onNavigate(item.id)}
                      className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-[#E5F0EA] text-[#1F5A43] font-semibold'
                          : 'text-[#5D665E] hover:text-[#182019] hover:bg-[#F6F6F2]'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-[#E5F0EA] text-[#1F5A43] font-semibold'
                        : 'text-[#5D665E] hover:text-[#182019] hover:bg-[#F6F6F2]'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* SAĞ: DEMO TALEBİ CTA BUTONU */}
            <div className="hidden lg:flex items-center gap-3">
              {inRouter ? (
                <Link
                  to="/iletisim"
                  onClick={() => trackEvent('demo_request_cta_clicked', { source: 'navbar_desktop' })}
                  className="px-4 py-2 rounded-xl bg-[#1F5A43] hover:bg-[#184835] text-white text-xs font-bold transition-all shadow-sm inline-flex items-center gap-1.5 focus:ring-2 focus:ring-[#1F5A43] focus:outline-none"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#D59B2E]" />
                  <span>Demo Talebi</span>
                </Link>
              ) : (
                <button
                  onClick={() => {
                    trackEvent('demo_request_cta_clicked', { source: 'navbar_desktop' });
                    handleItemClick('contact');
                  }}
                  className="px-4 py-2 rounded-xl bg-[#1F5A43] hover:bg-[#184835] text-white text-xs font-bold transition-all shadow-sm inline-flex items-center gap-1.5 focus:ring-2 focus:ring-[#1F5A43] focus:outline-none"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#D59B2E]" />
                  <span>Demo Talebi</span>
                </button>
              )}
            </div>

            {/* MOBİL VE ORTA EKRAN MENÜ BUTONU */}
            <div className="flex lg:hidden items-center gap-2">
              {inRouter ? (
                <Link
                  to="/iletisim"
                  onClick={() => trackEvent('demo_request_cta_clicked', { source: 'navbar_mobile' })}
                  className="px-3 py-1.5 rounded-lg bg-[#1F5A43] text-white text-xs font-bold flex items-center gap-1 min-h-[36px]"
                >
                  <span>Demo Talebi</span>
                </Link>
              ) : (
                <button
                  onClick={() => {
                    trackEvent('demo_request_cta_clicked', { source: 'navbar_mobile' });
                    handleItemClick('contact');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#1F5A43] text-white text-xs font-bold flex items-center gap-1 min-h-[36px]"
                >
                  <span>Demo Talebi</span>
                </button>
              )}

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-[#182019] hover:bg-[#F6F6F2] border border-[#DDE1DA] focus:outline-none"
                aria-label="Menüyü aç/kapat"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* MOBİL AÇILIR MENÜ */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#DDE1DA] bg-white px-4 pt-2 pb-5 space-y-1 shadow-subtle">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              if (inRouter) {
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      if (onNavigate) onNavigate(item.id);
                    }}
                    className={`block w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-[#E5F0EA] text-[#1F5A43] font-semibold'
                        : 'text-[#5D665E] hover:text-[#182019] hover:bg-[#F6F6F2]'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#E5F0EA] text-[#1F5A43] font-semibold'
                      : 'text-[#5D665E] hover:text-[#182019] hover:bg-[#F6F6F2]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        )}
      </header>
    </>
  );
};

export const Navbar: React.FC<NavbarProps> = (props) => {
  return <NavbarInner {...props} />;
};

export default Navbar;

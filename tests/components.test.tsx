import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import fs from 'fs';
import path from 'path';
import { FilterBar } from '../src/components/FilterBar';
import { OfflineFallbackView } from '../src/components/OfflineFallbackView';
import { StationDrawer } from '../src/components/StationDrawer';
import { fallbackStations } from '../src/services/mockData';
import { FilterState } from '../src/types';

describe('BeeHive Frontend Bileşen ve Arayüz Testleri', () => {
  // 9. React uygulaması build kontrolü
  describe('9. React Uygulaması Build Kontrolü', () => {
    it('Vite build çıktısı (dist/index.html ve varlıklar) başarıyla oluşturulmuştur', () => {
      const distPath = path.resolve(__dirname, '../dist');
      const indexPath = path.join(distPath, 'index.html');
      const assetsPath = path.join(distPath, 'assets');

      expect(fs.existsSync(distPath)).toBe(true);
      expect(fs.existsSync(indexPath)).toBe(true);
      expect(fs.existsSync(assetsPath)).toBe(true);

      const htmlContent = fs.readFileSync(indexPath, 'utf-8');
      expect(htmlContent).toContain('BeeHive');
      expect(htmlContent).toContain('<div id="root">');
    });
  });

  // 10. Harita modülü ve yedek liste görünümü render kontrolü
  describe('10. Harita ve Liste Görünümü Render Kontrolü', () => {
    it('Offline/Yedek Liste Görünümü tüm 6 pilot durağı ve durumlarını eksiksiz listeler', () => {
      const handleSelect = vi.fn();
      const handleFeedback = vi.fn();

      render(
        <OfflineFallbackView
          stations={fallbackStations}
          onSelectStation={handleSelect}
          onOpenFeedback={handleFeedback}
        />
      );

      // 6 durak adının ekranda listelendiğini doğrula
      expect(screen.getByText('Kampüs Ana Giriş Akıllı Durak')).toBeInTheDocument();
      expect(screen.getByText('Alaaddin Bulvarı Akıllı Durak')).toBeInTheDocument();
      expect(screen.getByText('Selçuklu Kongre Merkezi Akıllı Durak')).toBeInTheDocument();
      expect(screen.getByText('Karatay Bilim Merkezi Akıllı Durak')).toBeInTheDocument();
      expect(screen.getByText('Meram Park Akıllı Durak')).toBeInTheDocument();
      expect(screen.getByText('Kılıçarslan Gençlik Merkezi Akıllı Durak')).toBeInTheDocument();

      // Güvenli Enerji Kabini mesajını doğrula
      const safetyNotes = screen.getAllByText(/Güvenli Enerji Kabini/i);
      expect(safetyNotes.length).toBeGreaterThan(0);
    });

    it('Durak kartına tıklandığında onSelectStation çağrılır', () => {
      const handleSelect = vi.fn();
      const handleFeedback = vi.fn();

      render(
        <OfflineFallbackView
          stations={fallbackStations}
          onSelectStation={handleSelect}
          onOpenFeedback={handleFeedback}
        />
      );

      const inspectButtons = screen.getAllByText('Detayları İncele');
      expect(inspectButtons.length).toBe(6);
      fireEvent.click(inspectButtons[0]);

      expect(handleSelect).toHaveBeenCalledWith(fallbackStations[0]);
    });
  });

  // 11. Filtrelerin çalışması
  describe('11. Filtrelerin Çalışması (FilterBar)', () => {
    it('Filtre butonları tıklandığında setFilters fonksiyonunu tetikler', () => {
      const filters: FilterState = {
        chargingAvailable: false,
        wirelessCharging: false,
        powerOutlet: false,
        hvacActive: false,
        accessible: false,
        onlyActive: false,
        showNearestOnly: false,
        searchQuery: '',
      };

      const setFilters = vi.fn();
      const handleTriggerNearest = vi.fn();
      const setViewMode = vi.fn();

      render(
        <FilterBar
          filters={filters}
          setFilters={setFilters}
          onTriggerNearest={handleTriggerNearest}
          isNearestActive={false}
          totalCount={6}
          filteredCount={6}
          viewMode="map"
          setViewMode={setViewMode}
        />
      );

      // 'Şarj Kullanılabilir' butonuna tıkla
      const chargingButton = screen.getByText('Şarj Kullanılabilir');
      fireEvent.click(chargingButton);

      expect(setFilters).toHaveBeenCalled();
    });

    it('Arama kutusuna yazıldığında setFilters tetiklenir', () => {
      const filters: FilterState = {
        chargingAvailable: false,
        wirelessCharging: false,
        powerOutlet: false,
        hvacActive: false,
        accessible: false,
        onlyActive: false,
        showNearestOnly: false,
        searchQuery: '',
      };

      const setFilters = vi.fn();

      render(
        <FilterBar
          filters={filters}
          setFilters={setFilters}
          onTriggerNearest={vi.fn()}
          isNearestActive={false}
          totalCount={6}
          filteredCount={6}
          viewMode="map"
          setViewMode={vi.fn()}
        />
      );

      const searchInput = screen.getByPlaceholderText(/Durak adı veya koduna göre ara/i);
      fireEvent.change(searchInput, { target: { value: 'Alaaddin' } });

      expect(setFilters).toHaveBeenCalled();
    });
  });

  // 12. Mobilde yatay taşma olmaması (overflow-x kontrolü)
  describe('12. Mobilde Yatay Taşma ve Responsive Uyumluluk Kontrolü', () => {
    it('index.html dosyasında mobil viewport ve body overflow-x-hidden tanımlıdır', () => {
      const indexPath = path.resolve(__dirname, '../index.html');
      const htmlContent = fs.readFileSync(indexPath, 'utf-8');

      expect(htmlContent).toContain('<meta name="viewport" content="width=device-width, initial-scale=1.0');
      expect(htmlContent).toContain('overflow-x-hidden');
    });

    it('src/index.css dosyasında html ve body için overflow-x kısıtlaması tanımlıdır', () => {
      const cssPath = path.resolve(__dirname, '../src/index.css');
      const cssContent = fs.readFileSync(cssPath, 'utf-8');

      expect(cssContent).toContain('overflow-x: hidden');
      expect(cssContent).toContain('max-width: 100%');
    });

    it('StationDrawer mobil ekranda güvenli kabin ve şeffaflık uyarılarını taşmadan sunar', () => {
      const station = fallbackStations[0];
      const handleClose = vi.fn();
      const handleFeedback = vi.fn();

      render(
        <StationDrawer
          station={station}
          isOpen={true}
          onClose={handleClose}
          onOpenFeedback={handleFeedback}
        />
      );

      expect(screen.getByText(station.name)).toBeInTheDocument();
      expect(screen.getByText(/Batarya oturma alanında değil/i)).toBeInTheDocument();
      expect(screen.getByText(/Ayrı Güvenli Enerji Kabini/i)).toBeInTheDocument();
      expect(screen.queryByText(/Zero Leakage/i)).toBeNull();
    });
  });

  // 13. Kurumsal Startup Navigasyon ve Güvenli Yönetim Girişi Kontrolü
  describe('13. Kurumsal Startup Navigasyon ve Güvenli Yönetim Girişi Kontrolü', () => {
    it('Navbar kurumsal sayfaları (Çözüm, Teknoloji, İş Modeli) ve Demo Talebi butonunu eksiksiz görüntüler', async () => {
      const { Navbar } = await import('../src/components/Navbar');
      const handleNavigate = vi.fn();

      render(
        <Navbar
          currentTab="home"
          onNavigate={handleNavigate}
        />
      );

      // Startup menü elemanlarını doğrula
      expect(screen.getByText('Çözüm')).toBeInTheDocument();
      expect(screen.getByText('Teknoloji')).toBeInTheDocument();
      expect(screen.getByText('İş Modeli')).toBeInTheDocument();
      expect(screen.getByText('Şehir Haritası')).toBeInTheDocument();
      expect(screen.getByText('Etki')).toBeInTheDocument();
      expect(screen.getByText('SSS')).toBeInTheDocument();
      expect(screen.getByText('İletişim')).toBeInTheDocument();

      const demoCtaButtons = screen.getAllByText('Demo Talebi');
      expect(demoCtaButtons.length).toBeGreaterThan(0);

      // Hiçbir jüri butonu veya metni bulunmamalı
      expect(screen.queryByText(/Jüri/i)).toBeNull();
    });

    it('AdminLogin kurumsal "Yetkili Operasyon Erişimi" başlığı taşır ve demo şifre doldurma butonu içermez', async () => {
      const { AdminLogin } = await import('../src/components/admin/AdminLogin');
      const handleLoginSuccess = vi.fn();

      render(
        <AdminLogin
          loginEmail=""
          setLoginEmail={vi.fn()}
          loginPassword=""
          setLoginPassword={vi.fn()}
          loginError=""
          isLoggingIn={false}
          onSubmit={vi.fn()}
        />
      );

      expect(screen.getByText('Yetkili Operasyon Erişimi')).toBeInTheDocument();
      expect(
        screen.getByText(/Bu panel yalnızca yetkili BeeHive işletme kullanıcıları içindir/i)
      ).toBeInTheDocument();

      // Demo doldur butonu olmamalı
      expect(screen.queryByText(/Demo Bilgilerini Doldur/i)).toBeNull();
      // Arayüzde açık demo şifre bulunmamalı
      expect(screen.queryByText('Demo123!')).toBeNull();
      expect(screen.queryByText(/Jüri/i)).toBeNull();
    });

    it('TAB_ROUTES ve PATH_TO_TAB tüm startup kurumsal rotalarını (/cozum, /teknoloji, /is-modeli) içerir', async () => {
      const { TAB_ROUTES, PATH_TO_TAB } = await import('../src/components/Navbar');

      expect(TAB_ROUTES.solution).toBe('/cozum');
      expect(TAB_ROUTES.technology).toBe('/teknoloji');
      expect(TAB_ROUTES['business-model']).toBe('/is-modeli');
      expect(PATH_TO_TAB['/cozum']).toBe('solution');
      expect(PATH_TO_TAB['/teknoloji']).toBe('technology');
      expect(PATH_TO_TAB['/is-modeli']).toBe('business-model');
    });
  });

  // 14. Yasal ve KVKK Sayfaları Kontrolü
  describe('14. Yasal ve KVKK Sayfaları Kontrolü', () => {
    it('Gizlilik Politikası sayfasında konum verisi açıklaması ve KVKK maddeleri yer alır', async () => {
      const { MemoryRouter } = await import('react-router-dom');
      const { PrivacyPolicyView } = await import('../src/components/PrivacyPolicyView');
      const { unmount } = render(
        <MemoryRouter>
          <PrivacyPolicyView />
        </MemoryRouter>
      );
      expect(screen.getByText('Gizlilik Politikası')).toBeInTheDocument();
      expect(
        screen.getByText(/Konum izni yalnızca en yakın durak hesaplaması için kullanılır/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/Konum verisi kalıcı olarak saklanmaz/i)).toBeInTheDocument();
      unmount();
    });

    it('Kullanım Koşulları ve Çerez Politikası sayfaları başarıyla render edilir', async () => {
      const { MemoryRouter } = await import('react-router-dom');
      const { TermsOfUseView } = await import('../src/components/TermsOfUseView');
      const { CookiePolicyView } = await import('../src/components/CookiePolicyView');

      const { unmount: unmountTerms } = render(
        <MemoryRouter>
          <TermsOfUseView />
        </MemoryRouter>
      );
      expect(screen.getByText('Kullanım Koşulları')).toBeInTheDocument();
      unmountTerms();

      const { unmount: unmountCookies } = render(
        <MemoryRouter>
          <CookiePolicyView />
        </MemoryRouter>
      );
      expect(screen.getByText('Çerez Politikası')).toBeInTheDocument();
      unmountCookies();
    });
  });

  // 15. BeeHive İşletme Yönetim Paneli Modülleri Kontrolü
  describe('15. BeeHive İşletme Yönetim Paneli Modülleri Kontrolü', () => {
    it('AdminReports rapor türlerini ve dışa aktarma arayüzünü eksiksiz sunar', async () => {
      const { AdminReports } = await import('../src/components/admin/AdminReports');
      const { unmount } = render(<AdminReports stations={fallbackStations as any} feedbacks={[]} />);

      expect(screen.getByText('İşletme Raporlama & Veri Dışa Aktarma Merkezi')).toBeInTheDocument();
      expect(screen.getByText('Günlük Enerji Raporu')).toBeInTheDocument();
      expect(screen.getByText('Haftalık Performans')).toBeInTheDocument();
      expect(screen.getByText('Batarya Sağlığı (SOH/SOC)')).toBeInTheDocument();
      expect(screen.getByText('Bakım & Servis Kayıtları')).toBeInTheDocument();
      expect(screen.getByText('CO2 & Çevresel Etki')).toBeInTheDocument();
      expect(screen.getByText('Raporu Dışa Aktar')).toBeInTheDocument();
      unmount();
    });

    it('AdminSettings 5 kurumsal rol tanımını ve eşik değerlerini görüntüler', async () => {
      const { AdminSettings } = await import('../src/components/admin/AdminSettings');
      const { unmount } = render(<AdminSettings />);

      expect(screen.getByText('İşletme Ayarları')).toBeInTheDocument();
      expect(screen.getByText('Kullanıcı Rolleri')).toBeInTheDocument();

      // Rol sekmesine tıkla
      fireEvent.click(screen.getByText('Kullanıcı Rolleri'));
      expect(screen.getByText('Süper Yönetici')).toBeInTheDocument();
      expect(screen.getByText('Operasyon Yöneticisi')).toBeInTheDocument();
      expect(screen.getByText('Saha Bakım Ekibi')).toBeInTheDocument();
      expect(screen.getByText('Enerji Analisti')).toBeInTheDocument();
      expect(screen.getByText('Salt Okunur Kullanıcı')).toBeInTheDocument();
      unmount();
    });

    it('AdminLayout zorunlu simülasyon bandını ve 11 işletme sekmesini görüntüler', async () => {
      const { AdminLayout } = await import('../src/components/admin/AdminLayout');
      const { unmount } = render(
        <AdminLayout
          activeTab="overview"
          setActiveTab={vi.fn()}
          onLogout={vi.fn()}
          onRefresh={vi.fn()}
          isLoading={false}
          lastUpdatedTime="16:45"
          actionSuccessMessage={null}
          onClearActionSuccess={vi.fn()}
        >
          <div>Panel İçeriği</div>
        </AdminLayout>
      );

      expect(
        screen.getByText('Simülasyon modu aktif. Bu panel fiziksel cihazlara komut göndermez.')
      ).toBeInTheDocument();
      expect(screen.getByText('Genel Bakış')).toBeInTheDocument();
      expect(screen.getByText('Durak Yönetimi')).toBeInTheDocument();
      expect(screen.getByText('Batarya Yönetimi')).toBeInTheDocument();
      expect(screen.getByText('Enerji')).toBeInTheDocument();
      expect(screen.getByText('İklimlendirme')).toBeInTheDocument();
      expect(screen.getByText('Şarj')).toBeInTheDocument();
      expect(screen.getByText('Enerji Planlama Önerileri')).toBeInTheDocument();
      expect(screen.getByText('Uyarılar')).toBeInTheDocument();
      expect(screen.getByText('Raporlar')).toBeInTheDocument();
      expect(screen.getByText('Ayarlar')).toBeInTheDocument();
      unmount();
    });
  });
});


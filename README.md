# BeeHive
> **İkinci Yaşam Enerjiden Akıllı Şehirlere**  
> *Konya Pilot Akıllı Şehir Uygulaması*

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Tests](https://img.shields.io/badge/tests-35%20passed-emerald.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)]()
[![Konya Pilot](https://img.shields.io/badge/pilot-Konya%2C%20TR-amber.svg)]()

---

## 📌 Proje Özeti

**BeeHive**, ikinci yaşam elektrikli araç bataryalarını güneş enerjisiyle birleştirerek akıllı duraklarda güvenli, izlenebilir ve erişilebilir kamusal enerji hizmetleri sunan modüler kent altyapısıdır.

Sistem iki temel katmandan oluşur:
1. **Kurumsal & Kamusal Web Portalı:**
   - **Ana Sayfa:** Değer önerisi, interaktif istatistikler ve akıllı durak ekosistemi.
   - **Çözüm & Teknoloji:** 4 katmanlı mimari, batarya döngüsel ekonomisi, modüler donanım ve güvenlik standartları.
   - **Etki & İş Modeli:** Çevresel etki metrikleri, belediye & kampüs değer zinciri, regülasyon uyumu.
   - **Şehir Haritası:** Konya örnek durak ağında anlık filtreleme, temiz enerji oranı ve en yakın durak bulma.
   - **Demo Talebi:** Resend entegrasyonlu kurumsal demo ve pilot başvuru formu.
   - **Yasal:** KVKK / Gizlilik Politikası, Kullanım Koşulları ve Çerez Politikası.
2. **BeeHive İşletme Yönetim Paneli (Yetkili Operasyon Erişimi):**
   - 11 modüllü operasyon merkezi (Genel Bakış, Duraklar, Bataryalar, Enerji Akışı, İklim, Şarj, Karar Destek, Uyarılar, Geri Bildirim, Raporlar, Ayarlar).
   - Hücre seviyesinde sıcaklık & voltaj izleme, kural tabanlı enerji planlama önerileri, 15 saniyelik simülasyon telemetrisi.

---

## 🛡️ Güvenlik, Şeffaflık ve Mimari İlkeler

* **Fiziksel Güvenlik Standardı:**  
  > *"Batarya oturma alanında değil; durağın yanında/arkasında, ayrı, kilitli, havalandırmalı ve yangına dayanımlı (EI60 / IP65 sertifikalı) **Güvenli Enerji Kabini** içinde korunur."*
* **API Telemetri Ayrımı:**  
  > *"Halk API’sinde teknik telemetri paylaşımı tasarım gereği engellenmiştir; bu ayrım otomatik testlerle doğrulanmıştır."*  
  *(Halk arayüzü; batarya seri numarası, hücre sıcaklıkları, ham SOC/SOH, BMS arıza kodları veya kabin kilit durumunu kesinlikle görüntülemez.)*
* **Donanım Komut Simülasyonu:**  
  > *"Demo / Simülasyon – Gerçek fiziksel donanıma komut gönderilmez."*  
  *(Yönetici panelindeki 'İzolasyona al' veya 'Enerji Planlama Önerisi Uygula' butonları yalnızca güvenli mock olay logları üretir.)*
* **Karar Destek:**  
  > *"Bu ekran karar destek amaçlıdır; fiziksel sistem kontrolü yetkili mühendislik doğrulaması gerektirir."*
* **Şebeke Aktarım Bildirimi:**  
  > *"Şebeke aktarımı; ilgili mevzuat, dağıtım şirketi bağlantısı ve teknik uygunluğa bağlı planlanan özelliktir."*
* **İkinci Yaşam Batarya Uygunluğu:**  
  > *"İkinci yaşam bataryalar, teknik test ve güvenlik değerlendirmesi sonrasında sabit depolama için aday olabilir."*
* **Demo Şeffaflık Etiketi:**  
  > *"Pilot Demo – Simülasyon Verisi"* ve *"Gerçek donanım bağlantısı sonraki aşamada planlanmaktadır."*

---

## 📍 Konya Referans Durak Ağı (6 Lokasyonluk Örnek Senaryo)

| Durak Kodu | Durak Adı | Koordinatlar | USB-C | Priz | Kablosuz | Durum | Güneş (kW) |
|---|---|---|:---:|:---:|:---:|:---:|:---:|
| `ST-KNY-01` | **Kampüs Ana Giriş Akıllı Durak** | `38.0028° N, 32.5186° E` | 8 Port | 4 Adet | Var (15W) | Aktif | 5.4 kW |
| `ST-KNY-02` | **Alaaddin Bulvarı Akıllı Durak** | `37.8728° N, 32.4925° E` | 6 Port | 2 Adet | Var (15W) | Aktif | 4.8 kW |
| `ST-KNY-03` | **Selçuklu Kongre Merkezi Akıllı Durak** | `37.9231° N, 32.4984° E` | 10 Port | 4 Adet | Var (15W) | Sınırlı Mod | 3.2 kW |
| `ST-KNY-04` | **Karatay Bilim Merkezi Akıllı Durak** | `37.8890° N, 32.5580° E` | 8 Port | 4 Adet | Var (15W) | Aktif | 6.2 kW |
| `ST-KNY-05` | **Meram Park Akıllı Durak** | `37.8465° N, 32.4410° E` | 4 Port | 2 Adet | Yok | Bakımda | 1.8 kW |
| `ST-KNY-06` | **Kılıçarslan Gençlik Merkezi Akıllı Durak**| `37.8785° N, 32.4860° E` | 8 Port | 4 Adet | Var (15W) | Aktif | 5.0 kW |

---

## 🏗️ Teknoloji Yığını

* **Arayüz (Frontend):**
  - React 18 & TypeScript
  - Vite (Yüksek hızlı build & HMR)
  - Tailwind CSS (Doğal İskandinav renk paleti, sürdürülebilir yeşil ve enerji tonları)
  - React Leaflet & OpenStreetMap (API anahtarsız, mobilde dokunmatik uyumlu interaktif harita)
  - Recharts (Bileşik enerji eğrileri, hücre sıcaklıkları ve port kullanım grafikleri)
  - Lucide React (Sistem ikon seti)
* **Sunucu & Veri (Backend):**
  - Node.js & Express REST API
  - Haversine Mesafe Hesaplama Algoritması
  - 15 Saniyelik Simülasyon Telemetri Drift Motoru
  - Resend API (Kurumsal Demo Başvuru E-posta Entegrasyonu)
  - JWT Formatında Yetkili Operasyon Doğrulama Middleware
* **Test & Kalite:**
  - Vitest & React Testing Library (35 otomatik test)
  - Supertest (API entegrasyon testleri)
  - JSDOM & TypeScript Type-check

---

## 📡 API Uç Noktaları

### 🌍 Halka Açık (Public) & Sağlık API
* `GET /api/health` – Servis sağlık durumu ve simülasyon modu kontrolü.
* `GET /api/public/stations` – 6 pilot durağın filtrelenmiş genel bilgilerini döner (Hassas telemetri içermez).
* `GET /api/public/stations/:id` – Tekil durak halk detayları.
* `GET /api/public/nearby?lat=...&lng=...` – Haversine formülü ile kullanıcıya en yakın durakları mesafeye göre sıralar.
* `POST /api/public/feedback` – Anonim durak geri bildirimi kaydeder (Kişisel veri istemez, takip ID üretir).
* `POST /api/contact/demo-request` – Kurumsal pilot / demo talebi oluşturur (Resend entegrasyonu).
* `GET /api/public/impact-summary` – Döngüsel ekonomi etki özeti ve CO2 tasarruf metrikleri.
* `GET /api/public/faqs` – Sıkça sorulan sorular listesi.

### 🔒 İşletme Yönetim (Admin) API
* `POST /api/admin/login` – Yetkili operasyon girişi (`admin@beehive.energy` / `Demo123!`).
* `GET /api/admin/overview` – Filo KPI'ları, 24 saatlik enerji eğrisi verisi ve karar destek özeti.
* `GET /api/admin/stations` – Tüm duraklar ve ayrıntılı teknik telemetri verileri.
* `GET /api/admin/stations/:id` – Tek durak detaylı telemetrisi.
* `GET /api/admin/stations/:id/battery` – İkinci yaşam batarya hücre sıcaklıkları (H1-H4), SOH/SOC, BMS hata kodları.
* `GET /api/admin/energy` – Güneş üretimi, inverter modu, MPPT ve şebeke aktarım verileri.
* `GET /api/admin/climate` – Bekleme alanı iç ortam sıcaklığı, nem, AQI ve kabin havalandırması.
* `GET /api/admin/charging` – USB-C, 220V Schuko ve Qi kablosuz port anlık yük dağılımı.
* `GET /api/admin/ai/recommendations` – Enerji Karar Destek Algoritması optimizasyon senaryoları.
* `POST /api/admin/ai/recommendations/:id/apply` – Öneriyi simülasyonda uygular.
* `POST /api/admin/ai/recommendations/:id/dismiss` – Öneriyi arşivler/yok sayar.
* `POST /api/admin/batteries/:id/isolate` – Bataryayı simüle güvenlik modunda izolasyona alır.
* `GET /api/admin/alerts` – Sensör uyarıları, eşik aşımları ve denetim kayıtları.
* `GET /api/admin/feedback` – Vatandaş geri bildirimleri listesi.
* `GET /api/admin/reports` – Tarih ve istasyon filtreli operasyonel raporlama verisi.

---

## 🚀 Yerel Kurulum ve Çalıştırma

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

```bash
# 1. Depoyu klonlayın veya proje klasörüne girin
git clone https://github.com/m3lihyldrm/beehive-energy.git
cd beehive-energy

# 2. Çevre değişkenlerini oluşturun
cp .env.example .env

# 3. Bağımlılıkları yükleyin
npm install

# 4. Otomatik testleri çalıştırın (35/35 passed)
npm test

# 5. Üretim derlemesini yapın
npm run build

# 6. Hem Backend API (Port 5000) hem Frontend İstemcisini (Port 3000) başlatın:
npm run dev
```

* **Halk Portalı:** `http://localhost:3000/`
* **Şehir Haritası:** `http://localhost:3000/harita`
* **İşletme Yönetim Paneli Girişi:** `http://localhost:3000/admin`
  * **E-Posta:** `admin@beehive.energy`
  * **Şifre:** `Demo123!`
  * *(Yetkili Operasyon Erişimi)*

---

## 🧪 Otomatik Test Kapsamı

Proje 35 adet bağımsız Vitest ve Supertest senaryosu ile %100 doğrulanmıştır:
1. `GET /api/public/stations` 6 pilot durağı ve simülasyon etiketini döner.
2. Public API; seri no, hücre sıcaklığı, BMS kodları ve kilit durumunu döndürmez.
3. Admin endpointleri yetkisiz erişimde 401/403 yanıtı verir.
4. Admin işletme girişi doğrulanır ve JWT token üretir.
5. Geri bildirim servisi kişisel veri olmadan kayıt oluşturup takip ID döner.
6. Haversine formülü ile yakın durak hesabı ve sıralaması doğrulanır.
7. Enerji planlama önerisi uygulama/yok sayma işlemleri mock durum üretir.
8. Batarya izolasyonu gerçek donanıma komut göndermez, mock olay logu üretir.
9. Kurumsal demo talebi doğrulama kuralları ve takip kimliği üretimi doğrulanır.
10. `GET /api/admin/reports` tarih aralığı ve istasyon bazlı rapor verisi üretir.
11. React uygulaması build çıktısı doğrulanır.
12. Harita ve yedek liste görünümü 6 pilot durağı eksiksiz render eder.
13. Filtre barı ve arama kutusu durum değişikliklerini tetikler.
14. Mobilde yatay taşma (overflow-x) kısıtlamaları ve responsive uyumluluk doğrulanır.
15. Yasal sayfalar (Gizlilik Politikası, Kullanım Koşulları, Çerez Politikası) KVKK uyumluluğu doğrulanır.
16. İşletme Yönetim Paneli (Raporlar, Ayarlar, Rol Tanımları ve 11 Modül) doğrulanır.

---

## 📄 Lisans
Bu proje BeeHive modüler akıllı şehir altyapısı için açık kaynaklı dijital prototip olarak geliştirilmiştir. MIT Lisansı ile korunmaktadır.

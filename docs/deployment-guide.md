# BeeHive Production Dağıtım & Operasyon Rehberi

Bu belge, **BeeHive** web platformunun production (canlı) ortamda Vercel, Netlify, Cloudflare Pages veya Docker/Node.js sunucularında sıfır kesintiyle dağıtılması ve işletilmesi için gereken rehberdir.

---

## 1. Ortam Değişkenleri (Environment Variables)

Production ortamında `.env.example` şablonuna göre aşağıdaki değişkenleri yapılandırın:

### Frontend (Vite)
| Değişken | Açıklama | Örnek Değer | Zorunlu? |
|---|---|---|---|
| `VITE_API_BASE_URL` | Express API uç noktası adresi | `https://api.beehive.energy/api` veya `/api` (aynı origin) | Evet |
| `VITE_SITE_URL` | Canonical ve Open Graph URL'leri için kök alan adı | `https://beehive.energy` | Evet |
| `VITE_PLAUSIBLE_DOMAIN` | Plausible Analytics alan adı (gizlilik odaklı, çerezsiz) | `beehive.energy` | Hayır (boşsa script yüklenmez) |

### Backend (Node.js / Express)
| Değişken | Açıklama | Örnek Değer | Zorunlu? |
|---|---|---|---|
| `PORT` | API sunucusunun dinleyeceği port | `5000` (veya PaaS tarafından atanan port) | Evet |
| `CORS_ORIGIN` | İzin verilen frontend alan adları | `https://beehive.energy` veya `*` | Evet |
| `DEMO_ADMIN_EMAIL` | Yetkili operasyon giriş e-postası | `admin@beehive.energy` | Evet |
| `DEMO_ADMIN_TOKEN` | Bearer kimlik doğrulama tokenı | `beehive-admin-jwt-token-2026` | Evet |
| `DEMO_ADMIN_PASSWORD`| Yetkili operasyon şifresi | `Demo123!` | Evet |
| `RESEND_API_KEY` | Resend E-posta Gönderim API Anahtarı | `re_abc123...` | Hayır (yoksa konsola loglar, istek kaybolmaz) |
| `CONTACT_EMAIL_TO` | Demo taleplerinin iletileceği kurumsal adres | `demo@beehive.energy` | Hayır (varsayılan: `demo@beehive.energy`) |
| `CONTACT_EMAIL_FROM` | E-postaların gönderici başlığı | `BeeHive Platform <noreply@beehive.energy>` | Hayır |

> [!IMPORTANT]
> `RESEND_API_KEY` asla frontend koduna veya istemciye gönderilmemelidir. E-posta gönderimi yalnızca backend üzerinden yürütülür.

---

## 2. E-posta Entegrasyonu (Resend API)

BeeHive, `/iletisim` sayfasındaki demo taleplerini kurumsal ekibe anında iletmek için Resend API kullanır:

1. [Resend.com](https://resend.com) adresinde kurumsal hesap oluşturun.
2. **Domains** sekmesinden `beehive.energy` alan adını ekleyin ve DNS kayıtlarını (DKIM, SPF, MX) DNS sağlayıcınıza (Cloudflare / GoDaddy vb.) girin.
3. **API Keys** sekmesinden "Sending access" yetkisine sahip bir API anahtarı üretin (`re_...`).
4. Backend ortam değişkenlerine `RESEND_API_KEY`, `CONTACT_EMAIL_TO` ve `CONTACT_EMAIL_FROM` değerlerini ekleyin.
5. **Dayanıklılık (Fallback):** Eğer `RESEND_API_KEY` tanımlı değilse veya Resend geçici bir hata verirse, gelen demo talepleri backend bellek günlüğüne kaydedilir ve kullanıcıya başarı yanıtı döner; hiçbir talep kaybolmaz.

---

## 3. Plausible Analytics Entegrasyonu

BeeHive, kullanıcı gizliliğine ve KVKK uyumluluğuna saygı duyan Plausible Analytics altyapısına sahiptir:
- Çerez (cookie) kullanmaz.
- Kişisel veri (PII) toplamaz.
- Yalnızca `VITE_PLAUSIBLE_DOMAIN` ortam değişkeni tanımlandığında `plausible.io` script'i asenkron yüklenir.
- **İzlenen Özel Olaylar:**
  - `demo_request_cta_clicked`: Ziyaretçi demo talebi butonlarına tıkladığında (kaynak bilgisiyle birlikte).
  - `demo_request_submitted`: Demo formu başarıyla doldurulup gönderildiğinde (kurum tipi ve ilgi alanı bilgisiyle).
  - `contact_form_error`: Form gönderiminde hata oluştuğunda.
  - `map_station_viewed`: Şehir haritasında bir pilot durak incelendiğinde.

---

## 4. Dağıtım Seçenekleri (Vercel & Netlify)

### A. Vercel Dağıtımı
Proje kök dizininde bulunan `vercel.json` SPA yönlendirmelerini yönetir:
1. Vercel Dashboard'da **Add New Project** seçin ve GitHub/GitLab deposunu içe aktarın.
2. **Framework Preset:** Vite
3. **Build Command:** `npm run build`
4. **Output Directory:** `dist`
5. **Environment Variables:**
   - `VITE_API_BASE_URL`: API backend URL'i
   - `VITE_SITE_URL`: `https://beehive.energy`
   - `VITE_PLAUSIBLE_DOMAIN`: `beehive.energy`
6. **Deploy** butonuna tıklayın.

### B. Netlify Dağıtımı
`public/_redirects` dosyası sayesinde tüm direct URL erişimleri (örn. `/cozum`, `/harita`, `/gizlilik-politikasi`, `/admin`) 200 HTTP kodu ile `/index.html`'e iletilir:
```text
/*    /index.html   200
```
1. Netlify Dashboard'da **Add new site** > **Import an existing project**.
2. **Build command:** `npm run build`
3. **Publish directory:** `dist`
4. **Environment variables** alanında gerekli değişkenleri tanımlayın.
5. Dağıtımı başlatın.

### C. Backend API Dağıtımı (Node.js / Express / Docker)
Backend bağımsız bir Docker konteyneri, Railway, Render, Fly.io veya geleneksel VPS (Ubuntu/PM2) üzerinde çalıştırılabilir:
```bash
# Bağımlılıkları yükle (yalnızca production)
npm install --omit=dev

# PM2 ile backend'i arka planda başlat
pm2 start server/index.js --name "beehive-api"
```

---

## 5. Özel Alan Adı & SSL Yapılandırması

1. **DNS Kayıtları:**
   - Apex Domain (`beehive.energy`): A kaydı ile platform IP'sine (`76.76.21.21` - Vercel veya sağlayıcı IP'si).
   - Subdomain (`www.beehive.energy`): CNAME kaydı ile `cname.vercel-dns.com` (veya Netlify DNS).
   - API Subdomain (`api.beehive.energy`): Backend sunucusu CNAME veya A kaydı.
2. **SSL/TLS Sertifikası:** Vercel/Netlify ve Cloudflare Let's Encrypt sertifikasını otomatik olarak sağlar ve HTTPS yönlendirmesini zorunlu kılar.

---

## 6. Google Search Console & Sitemap Kaydı

1. Google Search Console'da `https://beehive.energy` alan adını TXT DNS kaydı veya HTML meta etiketi ile doğrulayın.
2. **Sitemaps** menüsüne gidin:
   - `https://beehive.energy/sitemap.xml` adresini gönderin.
3. Sitemap içindeki tüm sayfaların (`/`, `/cozum`, `/teknoloji`, `/etki`, `/is-modeli`, `/harita`, `/sss`, `/iletisim`, `/gizlilik-politikasi`, `/kullanim-kosullari`, `/cerez-politikasi`) başarıyla indekslendiğini kontrol edin.
4. `robots.txt` dosyasının `/admin` yolunu `Disallow` ettiğini ve sitemap adresini doğru gösterdiğini teyit edin.

---

## 7. Dağıtım Sonrası Doğrulama Kontrol Listesi (Post-Deployment Checklist)

Canlıya çıkış yapıldıktan hemen sonra aşağıdaki kontrolleri gerçekleştirin:

- [ ] **Tüm Sayfalar ve Direct Routing:**
  - [ ] `https://beehive.energy/` (Ana Sayfa)
  - [ ] `https://beehive.energy/cozum`
  - [ ] `https://beehive.energy/teknoloji`
  - [ ] `https://beehive.energy/etki`
  - [ ] `https://beehive.energy/is-modeli`
  - [ ] `https://beehive.energy/harita`
  - [ ] `https://beehive.energy/sss`
  - [ ] `https://beehive.energy/iletisim`
  - [ ] `https://beehive.energy/gizlilik-politikasi`
  - [ ] `https://beehive.energy/kullanim-kosullari`
  - [ ] `https://beehive.energy/cerez-politikasi`
  - [ ] `https://beehive.energy/admin`
  - [ ] Sayfalar yenilendiğinde (F5) 404 vermediği doğrulandı mı?
- [ ] **SEO & Meta Etiketleri:**
  - [ ] Başlık hiyerarşisi (H1, H2) doğru mu?
  - [ ] Canonical URL ve Open Graph etiketleri sayfaya özgü dinamik yükleniyor mu?
  - [ ] Favicon ve manifest ikonları düzgün görünüyor mu?
- [ ] **İletişim & Demo Formu:**
  - [ ] Form eksik doldurulduğunda istemci doğrulaması çalışıyor mu?
  - [ ] Form gönderildiğinde backend `POST /api/contact/demo-request` 201 dönüyor mu?
  - [ ] E-posta kurumsal adrese ulaşıyor mu?
- [ ] **İşletme Yönetim Paneli (Admin Portal):**
  - [ ] Yetkili kullanıcı adı ve şifresiyle giriş yapılabiliyor mu?
  - [ ] Yanlış şifrede 401 hatası veriliyor mu?
  - [ ] Halka açık API'de teknik telemetri verilerinin sızmadığı doğrulandı mı?
- [ ] **Erişilebilirlik ve Mobil Uyumluluk:**
  - [ ] Mobil menü açılıp kapanıyor mu?
  - [ ] Contrast oranı WCAG AA standardına uygun mu?

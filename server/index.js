import express from 'express';
import cors from 'cors';
import { stationsData, feedbackSubmissions, initialAiRecommendations } from './data/stations.js';

const app = express();
const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

app.use(cors({ origin: CORS_ORIGIN === '*' ? true : CORS_ORIGIN }));
app.use(express.json());

// Demo Admin Token sabiti (Ortam değişkeni desteği)
export const DEMO_ADMIN_TOKEN = process.env.DEMO_ADMIN_TOKEN || "beehive-admin-jwt-token-2026";
export const DEMO_ADMIN_EMAIL = process.env.DEMO_ADMIN_EMAIL || "admin@beehive.energy";
export const DEMO_ADMIN_PASSWORD = process.env.DEMO_ADMIN_PASSWORD || "Demo123!";

// Resend E-posta Gönderim Yapılandırması
export const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
export const CONTACT_EMAIL_TO = process.env.CONTACT_EMAIL_TO || 'iletisim@beehive.energy';
export const CONTACT_EMAIL_FROM = process.env.CONTACT_EMAIL_FROM || 'BeeHive Demo <onboarding@resend.dev>';

// In-memory state for admin actions & contact requests
export let aiRecommendations = [...initialAiRecommendations];
export let feedbacks = [...feedbackSubmissions];
export let demoRequests = [];
export let eventLogs = [
  {
    id: "LOG-01",
    timestamp: "2026-09-26T08:15:00Z",
    type: "MAINTENANCE",
    message: "Meram Park (ST-KNY-05) bakım moduna alındı (Mock simülasyon)."
  },
  {
    id: "LOG-02",
    timestamp: "2026-09-26T09:00:00Z",
    type: "ALGO_SUGGESTION",
    message: "Enerji Karar Destek Algoritması: Güneş ışınımı pik saati tespit edildi."
  }
];

export const faqsData = [
  {
    id: "faq-1",
    question: "Bu duraklar nasıl enerji üretiyor?",
    answer: "Durakların çatısında yer alan yüksek verimli monokristal güneş panelleri gün boyunca güneş ışığını elektrik enerjisine dönüştürür. Üretilen enerji MPPT şarj kontrol ünitesi aracılığıyla güvenli enerji kabinindeki bataryalara depolanır."
  },
  {
    id: "faq-2",
    question: "İkinci yaşam batarya nedir?",
    answer: "Elektrikli araçlarda kapasitesi belirli bir seviyeye gerilemiş ancak sabit depolama için yüksek performans sunan batarya modülleridir. İkinci yaşam bataryalar, teknik test ve güvenlik değerlendirmesi sonrasında sabit depolama için aday olabilir."
  },
  {
    id: "faq-3",
    question: "Bataryalar güvenli mi?",
    answer: "Kesinlikle güvenlidir. Batarya oturma alanında değil; durağın yanında/arkasında, ayrı, kilitli, havalandırmalı ve yangına dayanımlı (EI60 sertifikalı) “Güvenli Enerji Kabini” içinde korunur. Çok katmanlı BMS ve otomatik yangın söndürme modülü ile izlenir."
  },
  {
    id: "faq-4",
    question: "Haritadaki veriler gerçek zamanlı mı?",
    answer: "Haritadaki tüm durak, enerji üretimi ve batarya verileri referans senaryo ve konsept simülasyonudur. Sahadaki gerçek fiziksel batarya, PV ve şebeke donanım bağlantısı sonraki aşamada planlanmaktadır."
  },
  {
    id: "faq-5",
    question: "Şarj noktaları nasıl kullanılır?",
    answer: "Durak içerisinde yer alan USB-C portları ve 220V topraklı prizler halkın ücretsiz ve anlık kullanımına açıktır. Akıllı güç yönetim sistemi tüm cihazları aşırı akıma karşı korur."
  },
  {
    id: "faq-6",
    question: "Konumum kaydediliyor mu?",
    answer: "Hayır. Konumunuz yalnızca size en yakın durağı göstermek için anlık olarak kullanılır ve sunucuda kalıcı olarak saklanmaz. Açık onay vermediğiniz sürece konum verisi talep edilmez."
  },
  {
    id: "faq-7",
    question: "Şebekeye enerji aktarımı nasıl olur?",
    answer: "Şebeke aktarımı; ilgili mevzuat, dağıtım şirketi bağlantısı ve teknik uygunluğa bağlı planlanan bir özelliktir. Fazla üretilen temiz enerjinin çift yönlü sayaçla mikro şebekeye verilmesi hedeflenmektedir."
  },
  {
    id: "faq-8",
    question: "Bu sistem nerelerde kurulabilir?",
    answer: "Güneş alan meydanlar, üniversite kampüsleri, aktarma merkezleri, rekreasyon alanları ve kırsal duraklar dahil olmak üzere şehir şebekesinden bağımsız veya on-grid olarak her yere kurulabilir."
  }
];

/**
 * Haversine Mesafe Hesaplama (Kilometre cinsinden)
 */
export function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Dünya yarıçapı (km)
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Halk API'si için hassas teknik verileri ayıran filtreleyici.
 * KURAL: "Halk API’sinde teknik telemetri paylaşımı tasarım gereği engellenmiştir; bu ayrım otomatik testlerle doğrulanmıştır."
 */
export function sanitizeStationForPublic(station) {
  const { adminOnly, ...publicFields } = station;
  return {
    ...publicFields,
    isDemoData: true,
    policyNotice: "Halk API’sinde teknik telemetri paylaşımı tasarım gereği engellenmiştir; bu ayrım otomatik testlerle doğrulanmıştır."
  };
}

/**
 * Yönetici Kimlik Doğrulama Middleware
 */
export function requireAdminAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      error: "Yetkisiz Erişim",
      message: "Bu teknik uç noktaya erişmek için yönetici yetkilendirmesi gereklidir."
    });
  }

  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  if (token !== DEMO_ADMIN_TOKEN) {
    return res.status(403).json({
      error: "Geçersiz Yetki",
      message: "Sağlanan token geçersiz veya yetersiz role sahip."
    });
  }

  next();
}

// ==========================================
// HALK (PUBLIC) & SAĞLIK API ENDPOINTS
// ==========================================

/**
 * GET /api/health
 * Servis sağlık ve durum kontrol uç noktası.
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'beehive-energy-api',
    mode: 'simulation',
    timestamp: new Date().toISOString()
  });
});

/**
 * GET /api/public/stations
 * Tüm durakların halka açık güvenli listesini döner.
 */
app.get('/api/public/stations', (req, res) => {
  const sanitized = stationsData.map(sanitizeStationForPublic);
  res.json({
    success: true,
    total: sanitized.length,
    disclaimer: "Pilot Demo – Simülasyon Verisi",
    hardwareStatus: "Gerçek donanım bağlantısı sonraki aşamada planlanmaktadır.",
    securityAudit: "Halk API’sinde teknik telemetri paylaşımı tasarım gereği engellenmiştir; bu ayrım otomatik testlerle doğrulanmıştır.",
    stations: sanitized
  });
});

/**
 * GET /api/public/stations/:id
 * Belirli bir durağın halka açık güvenli detayını döner.
 */
app.get('/api/public/stations/:id', (req, res) => {
  const station = stationsData.find(s => s.stationId.toLowerCase() === req.params.id.toLowerCase());
  if (!station) {
    return res.status(404).json({
      success: false,
      error: "Durak bulunamadı."
    });
  }
  res.json({
    success: true,
    station: sanitizeStationForPublic(station)
  });
});

/**
 * GET /api/public/nearby?lat={lat}&lng={lng}
 * Kullanıcının ilettiği anlık koordinata göre durakları mesafeye göre sıralar.
 * Konum sunucuda kalıcı olarak saklanmaz.
 */
app.get('/api/public/nearby', (req, res) => {
  const lat = parseFloat(req.query.lat);
  const lng = parseFloat(req.query.lng);

  if (isNaN(lat) || isNaN(lng)) {
    return res.status(400).json({
      success: false,
      error: "Geçerli lat ve lng koordinatları gereklidir."
    });
  }

  const nearbyStations = stationsData.map(station => {
    const dist = calculateDistance(lat, lng, station.coordinates[0], station.coordinates[1]);
    const walkingMinutes = Math.max(1, Math.round((dist / 4.8) * 60));
    return {
      ...sanitizeStationForPublic(station),
      distanceKm: parseFloat(dist.toFixed(2)),
      walkingMinutes: walkingMinutes
    };
  }).sort((a, b) => a.distanceKm - b.distanceKm);

  res.json({
    success: true,
    userLocation: { lat, lng },
    privacyNotice: "Konumunuz yalnızca size en yakın durağı göstermek için kullanılır ve sunucuda kalıcı olarak saklanmaz.",
    stations: nearbyStations
  });
});

/**
 * POST /api/public/feedback
 * Halktan gelen durak geri bildirimlerini kaydeder.
 * Kişisel veri istenmez.
 */
app.post('/api/public/feedback', (req, res) => {
  const { stationId, issueType, message } = req.body;

  const validIssues = [
    "Şarj noktası çalışmıyor",
    "Şarj noktası sorunu",
    "Priz sorunu",
    "İklimlendirme sorunu",
    "Aydınlatma sorunu",
    "Durak temiz değil",
    "Erişilebilirlik sorunu",
    "Diğer"
  ];

  if (!stationId) {
    return res.status(400).json({
      success: false,
      error: "stationId alanı zorunludur."
    });
  }

  const station = stationsData.find(s => s.stationId.toLowerCase() === stationId.toLowerCase());
  if (!station) {
    return res.status(404).json({
      success: false,
      error: "Belirtilen durak bulunamadı."
    });
  }

  if (!issueType || !validIssues.includes(issueType)) {
    return res.status(400).json({
      success: false,
      error: `Geçersiz bildirim konusu. Geçerli seçenekler: ${validIssues.join(", ")}`
    });
  }

  const newFeedback = {
    feedbackId: `FB-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`,
    stationId: station.stationId,
    stationName: station.name,
    issueType,
    message: (message || "").trim(),
    createdAt: new Date().toISOString(),
    status: "Kayıt Alındı"
  };

  feedbacks.unshift(newFeedback);

  res.status(201).json({
    success: true,
    message: "Geri bildiriminiz başarıyla iletildi. Katkınız için teşekkür ederiz!",
    feedbackId: newFeedback.feedbackId,
    feedback: newFeedback
  });
});

/**
 * POST /api/contact/demo-request
 * Kurumsal demo talebi alma ve e-posta iletimi
 */
app.post('/api/contact/demo-request', async (req, res) => {
  const { fullName, organization, email, organizationType, interest, message } = req.body || {};

  const errors = [];
  if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
    errors.push('fullName zorunludur.');
  }
  if (!organization || typeof organization !== 'string' || !organization.trim()) {
    errors.push('organization zorunludur.');
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
    errors.push('email geçerli formatta zorunludur.');
  }
  if (!organizationType || typeof organizationType !== 'string' || !organizationType.trim()) {
    errors.push('organizationType zorunludur.');
  }
  if (!message || typeof message !== 'string' || message.trim().length < 20) {
    errors.push('message en az 20 karakter zorunludur.');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Doğrulama hatası',
      details: errors
    });
  }

  const newDemoRequest = {
    id: `DEMO-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`,
    fullName: fullName.trim(),
    organization: organization.trim(),
    email: email.trim().toLowerCase(),
    organizationType: organizationType.trim(),
    interest: (interest || 'Genel Demo ve Bilgi').trim(),
    message: message.trim(),
    createdAt: new Date().toISOString(),
    status: 'Alındı'
  };

  demoRequests.unshift(newDemoRequest);

  // Resend API üzerinden e-posta gönderimi (Varsa)
  let emailDelivered = false;
  if (RESEND_API_KEY) {
    try {
      const emailHtml = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #dde1da; border-radius: 12px; background-color: #ffffff;">
          <div style="border-bottom: 2px solid #1F5A43; padding-bottom: 12px; margin-bottom: 16px;">
            <h2 style="color: #1F5A43; margin: 0; font-size: 20px;">BeeHive Kurumsal Demo Talebi</h2>
            <p style="color: #5D665E; margin: 4px 0 0 0; font-size: 13px;">Tarih: ${new Date().toLocaleString('tr-TR')}</p>
          </div>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 16px;">
            <tr>
              <td style="padding: 8px 0; color: #5D665E; width: 140px;"><strong>Talep Eden:</strong></td>
              <td style="padding: 8px 0; color: #182019;">${newDemoRequest.fullName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #5D665E;"><strong>Kurum:</strong></td>
              <td style="padding: 8px 0; color: #182019;">${newDemoRequest.organization}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #5D665E;"><strong>Kurum Türü:</strong></td>
              <td style="padding: 8px 0; color: #182019;">${newDemoRequest.organizationType}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #5D665E;"><strong>E-Posta:</strong></td>
              <td style="padding: 8px 0; color: #182019;"><a href="mailto:${newDemoRequest.email}">${newDemoRequest.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #5D665E;"><strong>İlgi Alanı:</strong></td>
              <td style="padding: 8px 0; color: #182019;">${newDemoRequest.interest}</td>
            </tr>
          </table>
          <div style="background-color: #f6f6f2; padding: 14px; border-radius: 8px; border: 1px solid #dde1da;">
            <p style="margin: 0 0 6px 0; font-size: 12px; color: #5D665E; font-weight: bold; text-transform: uppercase;">Talep Mesajı:</p>
            <p style="margin: 0; color: #182019; font-size: 14px; line-height: 1.5;">${newDemoRequest.message}</p>
          </div>
          <p style="font-size: 11px; color: #888888; margin-top: 20px; text-align: center;">Bu e-posta BeeHive platformu iletişim formu tarafından otomatik olarak oluşturulmuştur.</p>
        </div>
      `;

      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: CONTACT_EMAIL_FROM,
          to: [CONTACT_EMAIL_TO],
          reply_to: newDemoRequest.email,
          subject: `[BeeHive Demo] ${newDemoRequest.fullName} - ${newDemoRequest.organization}`,
          html: emailHtml
        })
      });

      if (resendRes.ok) {
        emailDelivered = true;
      } else {
        const errorData = await resendRes.json();
        console.warn('[Resend API] E-posta gönderilemedi:', errorData);
      }
    } catch (sendErr) {
      console.warn('[Resend API] Gönderim hatası:', sendErr.message);
    }
  } else {
    console.info('[Demo Request] RESEND_API_KEY tanımlı değil; demo talebi yerel olarak kaydedildi:', newDemoRequest.id);
  }

  res.status(201).json({
    success: true,
    message: 'Talebiniz alındı. BeeHive ekibi en kısa sürede dönüş yapacaktır.',
    requestId: newDemoRequest.id,
    emailDelivered
  });
});

/**
 * GET /api/public/impact-summary
 * Halk paneli etki özeti metrikleri
 */
app.get('/api/public/impact-summary', (req, res) => {
  res.json({
    success: true,
    disclaimer: "Demo/simülasyon verisi; gerçek pilot ölçümü değildir.",
    metrics: {
      pilotStationCount: 6,
      averageCleanEnergyRatio: 84, // %84 ortalama temiz enerji karşılama
      dailySolarGenerationKwh: 42.8, // 42,8 kWh günlük güneş üretimi
      activeChargingPoints: 18, // 18 aktif şarj noktası
      estimatedCo2EquivalentKg: 1260, // 1.260 kg tahmini CO2 eşdeğeri
      dailyGridSupportKwh: 85.7,
      totalFeedbackCount: feedbacks.length,
      circularEconomyRatio: "%100 İkinci Yaşam Batarya Dönüşümü"
    }
  });
});

/**
 * GET /api/public/faqs
 * Sıkça Sorulan Sorular listesi
 */
app.get('/api/public/faqs', (req, res) => {
  res.json({
    success: true,
    faqs: faqsData
  });
});

// ==========================================
// YÖNETİCİ (ADMIN) API ENDPOINTS
// ==========================================

/**
 * POST /api/admin/login
 * Yönetici paneli işletme yetkili girişi
 */
app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;

  if (email === DEMO_ADMIN_EMAIL && password === DEMO_ADMIN_PASSWORD) {
    return res.json({
      success: true,
      token: DEMO_ADMIN_TOKEN,
      user: {
        email: DEMO_ADMIN_EMAIL,
        name: "Konya Akıllı Şebeke Yöneticisi",
        role: "SYSTEM_ADMIN",
        accessLevel: "LEVEL_4_FULL_TELEMETRY"
      },
      accountNotice: "Yetkili Operasyon Hesabı",
      message: "Yönetici oturumu başarıyla açıldı."
    });
  }

  return res.status(401).json({
    success: false,
    error: "Giriş başarısız. Lütfen bilgilerinizi kontrol ediniz."
  });
});

/**
 * GET /api/admin/overview
 * Yönetici genel bakış kontrol paneli metrikleri ve son 24 saat enerji simülasyonu
 */
app.get('/api/admin/overview', requireAdminAuth, (req, res) => {
  const total = stationsData.length;
  const active = stationsData.filter(s => s.status === 'aktif').length;
  const limited = stationsData.filter(s => s.status === 'sinirli').length;
  const maintenance = stationsData.filter(s => s.status === 'bakimda').length;
  const totalSolar = parseFloat(stationsData.reduce((acc, s) => acc + s.solarProductionKw, 0).toFixed(1));
  const totalConsumption = parseFloat(stationsData.reduce((acc, s) => acc + s.instantConsumptionKw, 0).toFixed(1));
  const totalGridExport = parseFloat(stationsData.reduce((acc, s) => acc + s.gridFeedEnergyKwh, 0).toFixed(1));

  // Son 24 saat saatlik enerji grafiği mock serisi
  const hourly24h = [
    { hour: "00:00", solar: 0, consumption: 0.8, batterySoc: 74 },
    { hour: "03:00", solar: 0, consumption: 0.5, batterySoc: 71 },
    { hour: "06:00", solar: 0.8, consumption: 1.2, batterySoc: 68 },
    { hour: "09:00", solar: 3.8, consumption: 2.1, batterySoc: 79 },
    { hour: "12:00", solar: 6.2, consumption: 2.8, batterySoc: 94 },
    { hour: "15:00", solar: 5.1, consumption: 2.4, batterySoc: 98 },
    { hour: "18:00", solar: 1.9, consumption: 3.2, batterySoc: 88 },
    { hour: "21:00", solar: 0, consumption: 2.2, batterySoc: 80 },
  ];

  res.json({
    success: true,
    disclaimer: "Demo / Simülasyon – Gerçek fiziksel donanıma komut gönderilmez.",
    decisionSupportNote: "Bu ekran karar destek amaçlıdır; fiziksel sistem kontrolü yetkili mühendislik doğrulaması gerektirir.",
    stats: {
      totalStations: total,
      activeStations: active,
      limitedStations: limited,
      maintenanceStations: maintenance,
      totalSolarProductionKw: totalSolar,
      totalInstantConsumptionKw: totalConsumption,
      totalGridExportKwh: totalGridExport,
      criticalAlertCount: 2,
      pendingFeedbackCount: feedbacks.filter(f => f.status === 'Kayıt Alındı').length,
    },
    hourly24h,
    aiSummary: {
      pendingCount: aiRecommendations.filter(r => r.status === 'pending').length,
      topSuggestion: aiRecommendations[0]?.title || "Tüm parametreler dengeli"
    }
  });
});

/**
 * GET /api/admin/stations
 * Tüm duraklar ve ayrıntılı teknik telemetri verileri
 */
app.get('/api/admin/stations', requireAdminAuth, (req, res) => {
  res.json({
    success: true,
    role: "ADMIN",
    stations: stationsData,
    decisionSupportNote: "Bu ekran karar destek amaçlıdır; fiziksel sistem kontrolü yetkili mühendislik doğrulaması gerektirir."
  });
});

/**
 * GET /api/admin/stations/:id
 * Tek durak detaylı teknik telemetrisi
 */
app.get('/api/admin/stations/:id', requireAdminAuth, (req, res) => {
  const station = stationsData.find(s => s.stationId.toLowerCase() === req.params.id.toLowerCase());
  if (!station) {
    return res.status(404).json({ success: false, error: "Durak bulunamadı." });
  }
  res.json({ success: true, station });
});

/**
 * GET /api/admin/stations/:id/battery
 * Batarya ve BMS telemetrisi
 */
app.get('/api/admin/stations/:id/battery', requireAdminAuth, (req, res) => {
  const station = stationsData.find(s => s.stationId.toLowerCase() === req.params.id.toLowerCase());
  if (!station) {
    return res.status(404).json({ success: false, error: "Durak bulunamadı." });
  }
  res.json({
    success: true,
    stationId: station.stationId,
    name: station.name,
    status: station.status,
    batteryTelemetry: station.adminOnly
  });
});

/**
 * GET /api/admin/energy
 * Güneş ve enerji telemetrisi özeti
 */
app.get('/api/admin/energy', requireAdminAuth, (req, res) => {
  res.json({
    success: true,
    disclaimer: "Demo / Simülasyon – Gerçek fiziksel donanıma komut gönderilmez.",
    gridNotice: "Şebeke aktarımı; ilgili mevzuat, dağıtım şirketi bağlantısı ve teknik uygunluğa bağlı planlanan özelliktir.",
    stationsEnergy: stationsData.map(s => ({
      stationId: s.stationId,
      name: s.name,
      solarProductionKw: s.solarProductionKw,
      instantConsumptionKw: s.instantConsumptionKw,
      gridFeedEnergyKwh: s.gridFeedEnergyKwh,
      dailyCleanEnergyRatio: s.dailyCleanEnergyRatio,
      inverterStatus: s.adminOnly.inverterStatus
    }))
  });
});

/**
 * GET /api/admin/climate
 * İklimlendirme ve konfor telemetrisi
 */
app.get('/api/admin/climate', requireAdminAuth, (req, res) => {
  res.json({
    success: true,
    stationsClimate: stationsData.map(s => ({
      stationId: s.stationId,
      name: s.name,
      hvacStatus: s.hvacStatus,
      indoorTemperature: s.indoorTemperature,
      indoorHumidity: s.indoorHumidity,
      airQuality: s.airQuality,
      cabinetVentilation: s.adminOnly.energyCabinetDetails?.ventilationStatus
    }))
  });
});

/**
 * GET /api/admin/charging
 * Şarj hizmetleri yük dağılımı
 */
app.get('/api/admin/charging', requireAdminAuth, (req, res) => {
  res.json({
    success: true,
    stationsCharging: stationsData.map(s => ({
      stationId: s.stationId,
      name: s.name,
      usbCPorts: s.usbCPorts,
      powerOutlets: s.powerOutlets,
      wirelessCharging: s.wirelessCharging,
      loadPercentage: s.usbCPorts > 0 ? 65 : 0
    }))
  });
});

/**
 * GET /api/admin/ai/recommendations
 * Enerji Karar Destek Algoritması önerileri
 */
app.get('/api/admin/ai/recommendations', requireAdminAuth, (req, res) => {
  res.json({
    success: true,
    disclaimer: "Demo / Simülasyon – Gerçek fiziksel donanıma komut gönderilmez.",
    recommendations: aiRecommendations
  });
});

/**
 * POST /api/admin/ai/recommendations/:id/apply
 * Enerji planlama önerisini uygulama (Yalnızca mock durum değişikliği)
 */
app.post('/api/admin/ai/recommendations/:id/apply', requireAdminAuth, (req, res) => {
  const rec = aiRecommendations.find(r => r.id === req.params.id);
  if (!rec) {
    return res.status(404).json({ success: false, error: "Öneri bulunamadı." });
  }

  rec.status = 'applied';

  const logEntry = {
    id: `LOG-${Date.now().toString().slice(-4)}`,
    timestamp: new Date().toISOString(),
    type: "ALGO_APPLY",
    message: `Enerji planlama önerisi '${rec.title}' için optimizasyon uygulandı.`
  };
  eventLogs.unshift(logEntry);

  res.json({
    success: true,
    disclaimer: "Demo / Simülasyon – Gerçek fiziksel donanıma komut gönderilmez.",
    message: "Öneri simüle olarak uygulandı.",
    recommendation: rec,
    logEntry
  });
});

/**
 * POST /api/admin/ai/recommendations/:id/dismiss
 * Enerji planlama önerisini yok sayma
 */
app.post('/api/admin/ai/recommendations/:id/dismiss', requireAdminAuth, (req, res) => {
  const rec = aiRecommendations.find(r => r.id === req.params.id);
  if (!rec) {
    return res.status(404).json({ success: false, error: "Öneri bulunamadı." });
  }

  rec.status = 'dismissed';

  const logEntry = {
    id: `LOG-${Date.now().toString().slice(-4)}`,
    timestamp: new Date().toISOString(),
    type: "ALGO_DISMISS",
    message: `Enerji planlama önerisi '${rec.title}' yok sayıldı.`
  };
  eventLogs.unshift(logEntry);

  res.json({
    success: true,
    disclaimer: "Demo / Simülasyon – Gerçek fiziksel donanıma komut gönderilmez.",
    message: "Öneri yok sayıldı.",
    recommendation: rec,
    logEntry
  });
});

/**
 * POST /api/admin/batteries/:id/isolate
 * Batarya modülünü izolasyona alma (Yalnızca mock olay kaydı oluşturur, gerçek donanıma komut göndermez)
 */
app.post('/api/admin/batteries/:id/isolate', requireAdminAuth, (req, res) => {
  const station = stationsData.find(
    s => s.stationId.toLowerCase() === req.params.id.toLowerCase() ||
         s.adminOnly.moduleId.toLowerCase() === req.params.id.toLowerCase()
  );

  if (!station) {
    return res.status(404).json({ success: false, error: "Batarya modülü bulunamadı." });
  }

  station.adminOnly.batteryState = "İzolasyona alındı";

  const logEntry = {
    id: `LOG-${Date.now().toString().slice(-4)}`,
    timestamp: new Date().toISOString(),
    type: "BATTERY_ISOLATION_MOCK",
    message: `Durak ${station.stationId} bataryası (${station.adminOnly.moduleId}) güvenlik simülasyonu amacıyla izolasyona alındı.`
  };
  eventLogs.unshift(logEntry);

  res.json({
    success: true,
    disclaimer: "Demo / Simülasyon – Gerçek fiziksel donanıma komut gönderilmez.",
    message: `Modül ${station.adminOnly.moduleId} simüle izolasyona alındı. Gerçek fiziksel donanıma komut gönderilmemiştir.`,
    stationId: station.stationId,
    batteryState: "İzolasyona alındı",
    logEntry
  });
});

/**
 * GET /api/admin/alerts
 * Sistem uyarıları ve telemetri alarmları
 */
app.get('/api/admin/alerts', requireAdminAuth, (req, res) => {
  const allAlerts = [];
  stationsData.forEach(st => {
    if (st.adminOnly.alerts && st.adminOnly.alerts.length > 0) {
      st.adminOnly.alerts.forEach(a => {
        allAlerts.push({
          stationId: st.stationId,
          stationName: st.name,
          ...a
        });
      });
    }
  });

  res.json({
    success: true,
    totalAlerts: allAlerts.length,
    alerts: allAlerts,
    eventLogs: eventLogs
  });
});

/**
 * GET /api/admin/feedback
 * Vatandaş geri bildirimleri listesi
 */
app.get('/api/admin/feedback', requireAdminAuth, (req, res) => {
  res.json({
    success: true,
    total: feedbacks.length,
    feedbacks: feedbacks
  });
});

/**
 * PATCH /api/admin/feedback/:id
 * Geri bildirim durumunu güncelleme
 */
app.patch('/api/admin/feedback/:id', requireAdminAuth, (req, res) => {
  const { status } = req.body;
  const item = feedbacks.find(f => f.feedbackId === req.params.id);
  if (!item) {
    return res.status(404).json({ success: false, error: "Geri bildirim bulunamadı." });
  }

  if (status) item.status = status;

  res.json({
    success: true,
    message: "Geri bildirim durumu güncellendi.",
    feedback: item
  });
});

/**
 * GET /api/admin/reports
 * Kapsamlı operasyon, enerji, batarya ve etki raporları verisi
 */
app.get('/api/admin/reports', requireAdminAuth, (req, res) => {
  const { startDate, endDate, stationId } = req.query;

  let filteredStations = stationsData;
  if (stationId && stationId !== 'all') {
    filteredStations = stationsData.filter(
      s => s.stationId.toLowerCase() === stationId.toLowerCase()
    );
  }

  // Günlük enerji serisi simülasyonu
  const dailyEnergy = [
    { date: "2026-10-11", solarProductionKwh: 41.2, loadConsumptionKwh: 18.4, cleanEnergyRatio: 94, gridFeedKwh: 22.8 },
    { date: "2026-10-12", solarProductionKwh: 38.6, loadConsumptionKwh: 19.1, cleanEnergyRatio: 91, gridFeedKwh: 19.5 },
    { date: "2026-10-13", solarProductionKwh: 44.5, loadConsumptionKwh: 17.8, cleanEnergyRatio: 96, gridFeedKwh: 26.7 },
    { date: "2026-10-14", solarProductionKwh: 36.0, loadConsumptionKwh: 20.2, cleanEnergyRatio: 88, gridFeedKwh: 15.8 },
    { date: "2026-10-15", solarProductionKwh: 42.8, loadConsumptionKwh: 18.0, cleanEnergyRatio: 95, gridFeedKwh: 24.8 },
    { date: "2026-10-16", solarProductionKwh: 40.4, loadConsumptionKwh: 19.5, cleanEnergyRatio: 92, gridFeedKwh: 20.9 },
    { date: "2026-10-17", solarProductionKwh: 43.1, loadConsumptionKwh: 18.2, cleanEnergyRatio: 95, gridFeedKwh: 24.9 },
  ];

  // Batarya sağlığı rapor verisi
  const batteryHealth = filteredStations.map(s => ({
    stationId: s.stationId,
    stationName: s.name,
    moduleId: s.adminOnly.moduleId,
    chemistry: s.adminOnly.chemistryType,
    soh: s.adminOnly.sohRaw,
    soc: s.adminOnly.socRaw,
    cycleCount: s.adminOnly.cycleCount,
    cellDeltaMv: Math.round(
      (Math.max(...s.adminOnly.cellTemperatures) - Math.min(...s.adminOnly.cellTemperatures)) * 25
    ),
    state: s.adminOnly.batteryState,
    lastMaintenance: s.adminOnly.lastMaintenanceDate
  }));

  // Çevresel ve CO2 etki raporu
  const impactSummary = {
    totalSolarGeneratedKwh: dailyEnergy.reduce((acc, d) => acc + d.solarProductionKwh, 0),
    totalLoadConsumedKwh: dailyEnergy.reduce((acc, d) => acc + d.loadConsumptionKwh, 0),
    totalCo2AvoidedKg: Math.round(dailyEnergy.reduce((acc, d) => acc + d.solarProductionKwh, 0) * 0.48),
    circularBatteryCount: filteredStations.length,
    activeChargingSessions: 142
  };

  res.json({
    success: true,
    disclaimer: "Demo / Simülasyon – Veriler referans operasyon senaryosuna dayanır.",
    dateRange: { startDate: startDate || "2026-10-11", endDate: endDate || "2026-10-17" },
    dailyEnergy,
    batteryHealth,
    impactSummary,
    eventLogsCount: eventLogs.length
  });
});

/**
 * 15 Saniyede Bir Küçük Değişken Simülasyon Telemetrisi (Demo Canlılığı)
 * Yalnızca test ortamı dışındayken çalışır.
 */
if (process.env.NODE_ENV !== 'test') {
  setInterval(() => {
    stationsData.forEach(st => {
      // Yalnızca aktif veya sınırlı duraklarda küçük doğal dalgalanma
      if (st.status === 'aktif' || st.status === 'sinirli') {
        // Güneş üretimi ±0.15 kW dalgalanma (0 ile 6.8 kW arası)
        const pvDelta = (Math.random() * 0.3 - 0.15);
        st.solarProductionKw = Math.max(0, Math.min(6.8, parseFloat((st.solarProductionKw + pvDelta).toFixed(2))));

        // Yük tüketimi ±0.08 kW dalgalanma (0.8 ile 3.5 kW arası)
        const loadDelta = (Math.random() * 0.16 - 0.08);
        st.instantConsumptionKw = Math.max(0.5, Math.min(3.5, parseFloat((st.instantConsumptionKw + loadDelta).toFixed(2))));

        // Batarya SOC ±0.1% dalgalanma
        if (st.adminOnly && typeof st.adminOnly.socRaw === 'number') {
          const socDelta = (Math.random() * 0.2 - 0.1);
          st.adminOnly.socRaw = Math.max(15, Math.min(99.9, parseFloat((st.adminOnly.socRaw + socDelta).toFixed(1))));
        }

        // Hücre sıcaklıkları ±0.1°C dalgalanma
        if (st.adminOnly && Array.isArray(st.adminOnly.cellTemperatures)) {
          st.adminOnly.cellTemperatures = st.adminOnly.cellTemperatures.map(t =>
            parseFloat((t + (Math.random() * 0.1 - 0.05)).toFixed(1))
          );
        }

        st.lastUpdated = new Date().toISOString();
      }
    });
  }, 15000);
}

export default app;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[BeeHive API] Sunucu ${PORT} portunda çalışıyor.`);
  });
}

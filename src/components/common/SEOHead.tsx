import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface MetaConfig {
  title: string;
  description: string;
}

const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://beehive.energy').replace(/\/$/, '');
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;
const TWITTER_IMAGE = `${SITE_URL}/twitter-image.png`;

const ROUTE_SEO: Record<string, MetaConfig> = {
  '/': {
    title: 'BeeHive | İkinci Yaşam Enerjiden Akıllı Şehirlere',
    description:
      'BeeHive, ikinci yaşam elektrikli araç bataryalarını güneş enerjisiyle birleştirerek akıllı duraklarda kamusal enerji hizmetleri sunan modüler kent altyapısıdır.'
  },
  '/cozum': {
    title: 'Çözüm & Modüler Altyapı | BeeHive',
    description:
      'İkinci yaşam bataryalar ve güneş enerjisiyle donatılmış, belediyeler ve kampüsler için güvenli modüler akıllı durak altyapı çözümü.'
  },
  '/teknoloji': {
    title: 'Teknoloji & Güvenli Kabin | BeeHive',
    description:
      'EI60 yangın dayanımlı kabin, otomotiv standardında ikinci yaşam bataryalar, MPPT güneş şarjı ve endüstriyel BMS telemetrisi.'
  },
  '/etki': {
    title: 'Sürdürülebilirlik & Etki Modeli | BeeHive',
    description:
      'Döngüsel batarya ekonomisi, temiz enerji karşılama oranları ve kentsel karbon azaltım örnek simülasyonu.'
  },
  '/is-modeli': {
    title: 'İş Modeli & Hizmet Paketleri | BeeHive',
    description:
      'Pilot kurulum, SaaS bulut yönetim lisansı ve periyodik SLA bakım hizmetlerinden oluşan esnek iş modeli.'
  },
  '/harita': {
    title: 'Konya Referans Durak Ağı | BeeHive',
    description:
      'Akıllı durak telemetrisi, lokasyon bazlı hizmet erişilebilirliği ve temiz enerji depolama haritası.'
  },
  '/sss': {
    title: 'Sıkça Sorulan Sorular | BeeHive',
    description:
      'İkinci yaşam batarya güvenliği, modüler durak yapısı ve kamusal enerji hizmetleri hakkında merak edilenler.'
  },
  '/iletisim': {
    title: 'İletişim & Kurumsal Demo Talebi | BeeHive',
    description:
      'Belediyeler, üniversiteler ve enerji paydaşları için fizibilite değerlendirmesi ve kurumsal demo başvurusu.'
  },
  '/gizlilik-politikasi': {
    title: 'Gizlilik Politikası & KVKK Aydınlatma | BeeHive',
    description: 'BeeHive kullanıcı verileri, konum izinleri ve gizlilik ilkeleri aydınlatma metni.'
  },
  '/kullanim-kosullari': {
    title: 'Kullanım Koşulları & Hizmet Şartları | BeeHive',
    description: 'BeeHive akıllı durak enerji istasyonları ve web platformu kullanım şartları.'
  },
  '/cerez-politikasi': {
    title: 'Çerez Politikası | BeeHive',
    description: 'BeeHive çerez ve yerel depolama teknolojileri kullanım politikası.'
  },
  '/admin': {
    title: 'Yetkili Operasyon Erişimi | BeeHive',
    description: 'BeeHive yetkili işletme yönetim ve telemetri izleme portalı.'
  }
};

function updateMetaTag(attributeName: string, attributeValue: string, content: string) {
  let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function updateCanonical(url: string) {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

export const SEOHead: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname.toLowerCase();
  const config = ROUTE_SEO[currentPath] || ROUTE_SEO['/'];
  const pageUrl = `${SITE_URL}${currentPath === '/' ? '' : currentPath}`;

  useEffect(() => {
    // 1. Title
    document.title = config.title;

    // 2. Meta description
    updateMetaTag('name', 'description', config.description);

    // 3. Canonical link
    updateCanonical(pageUrl);

    // 4. Open Graph Tags
    updateMetaTag('property', 'og:title', config.title);
    updateMetaTag('property', 'og:description', config.description);
    updateMetaTag('property', 'og:url', pageUrl);
    updateMetaTag('property', 'og:type', 'website');
    updateMetaTag('property', 'og:site_name', 'BeeHive');
    updateMetaTag('property', 'og:image', DEFAULT_IMAGE);

    // 5. Twitter Card Tags
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', config.title);
    updateMetaTag('name', 'twitter:description', config.description);
    updateMetaTag('name', 'twitter:image', TWITTER_IMAGE);
  }, [currentPath, config.title, config.description, pageUrl]);

  return null;
};
export default SEOHead;

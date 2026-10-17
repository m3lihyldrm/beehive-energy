import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Shield, AlertTriangle, Cpu, Scale, ArrowLeft, Mail } from 'lucide-react';

export const TermsOfUseView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10 animate-in fade-in duration-200">
      {/* Başlık */}
      <div className="space-y-3">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1F5A43] hover:underline mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Ana Sayfaya Dön</span>
        </Link>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5F0EA] border border-[#1F5A43]/20 text-xs font-semibold text-[#1F5A43]">
          <FileText className="w-3.5 h-3.5" />
          <span>Hizmet Şartları</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#182019] tracking-tight">
          Kullanım Koşulları
        </h1>
        <p className="text-xs sm:text-sm text-[#5D665E]">
          Son güncelleme: 17 Ekim 2026 · Yürürlük Tarihi: 17 Ekim 2026
        </p>
      </div>

      {/* Giriş */}
      <div className="p-5 rounded-2xl bg-white border border-[#DDE1DA] space-y-2 text-xs sm:text-sm text-[#182019] leading-relaxed shadow-subtle">
        <p>
          Bu internet sitesini ve BeeHive akıllı kent enerji istasyonlarını ziyaret ederek veya kullanarak, aşağıda belirtilen şart ve koşulları kabul etmiş sayılırsınız. Şartları kabul etmiyorsanız lütfen siteyi veya istasyon hizmetlerini kullanmayınız.
        </p>
      </div>

      {/* Bölümler */}
      <div className="space-y-8 text-xs sm:text-sm text-[#5D665E] leading-relaxed">
        {/* 1. Hizmet Kapsamı ve Kamusal Kullanım */}
        <section className="space-y-3 bg-white border border-[#DDE1DA] rounded-2xl p-6 shadow-subtle">
          <h2 className="text-base sm:text-lg font-bold text-[#182019] flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#1F5A43]" />
            <span>1. Hizmet Kapsamı ve Kamusal Kullanım</span>
          </h2>
          <p>
            BeeHive, ikinci yaşam elektrikli araç bataryalarını güneş enerjisiyle birleştirerek duraklarda ücretsiz USB-C, Qi kablosuz şarj ve 220V acil durum prizi hizmeti sunar. Bu hizmetler kamusal fayda amaçlıdır; ticari veya endüstriyel yüksek akım çekişi için kullanılamaz.
          </p>
        </section>

        {/* 2. Güvenlik ve Donanım Bütünlüğü */}
        <section className="space-y-3 bg-white border border-[#DDE1DA] rounded-2xl p-6 shadow-subtle">
          <h2 className="text-base sm:text-lg font-bold text-[#182019] flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#1F5A43]" />
            <span>2. Güvenlik ve Donanım Bütünlüğü</span>
          </h2>
          <p>
            Batarya üniteleri, yolcu oturma alanının dışında yer alan <strong>EI60 yangın dayanımlı ve kilitli Güvenli Enerji Kabini</strong> içinde muhafaza edilmektedir. Kabin kapaklarını zorlamak, kablolara müdahale etmek veya istasyon donanımına fiziksel zarar vermek suç teşkil eder ve hukuki yaptırıma tabidir.
          </p>
        </section>

        {/* 3. Simülasyon Verileri ve Sorumluluk Reddi */}
        <section className="space-y-3 bg-white border border-[#DDE1DA] rounded-2xl p-6 shadow-subtle">
          <h2 className="text-base sm:text-lg font-bold text-[#182019] flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[#D59B2E]" />
            <span>3. Simülasyon Verileri ve Sorumluluk Reddi</span>
          </h2>
          <p>
            Platformda ve haritada gösterilen üretim, tüketim ve karbon tasarrufu metrikleri konsept simülasyonudur. Sahadaki gerçek değerler hava koşullarına, batarya kimyasına ve şebeke durumuna göre değişiklik gösterebilir. BeeHive, üçüncü taraf donanımlardan veya elektrik kesintilerinden kaynaklanan doğrudan veya dolaylı kayıplardan sorumlu tutulamaz.
          </p>
        </section>

        {/* 4. Şebeke Entegrasyonu ve Mevzuat */}
        <section className="space-y-3 bg-white border border-[#DDE1DA] rounded-2xl p-6 shadow-subtle">
          <h2 className="text-base sm:text-lg font-bold text-[#182019] flex items-center gap-2">
            <Scale className="w-4 h-4 text-[#1F5A43]" />
            <span>4. Şebeke Entegrasyonu ve Mevzuat</span>
          </h2>
          <p>
            Şebekeye enerji aktarımı veya satışı birincil gelir taahhüdü değildir; ilgili EPDK mevzuatı, elektrik dağıtım şirketi (EDAŞ) teknik izinleri ve çift yönlü sayaç onaylarına bağlı olarak değerlendirilecek gelecek aşama opsiyonudur.
          </p>
        </section>

        {/* 5. Fikri Mülkiyet Hakları */}
        <section className="space-y-3 bg-white border border-[#DDE1DA] rounded-2xl p-6 shadow-subtle">
          <h2 className="text-base sm:text-lg font-bold text-[#182019] flex items-center gap-2">
            <Scale className="w-4 h-4 text-[#1F5A43]" />
            <span>5. Fikri Mülkiyet Hakları</span>
          </h2>
          <p>
            BeeHive markası, altıgen petek logosu, web sitesi yazılım kodları, arayüz tasarımları ve Kural Tabanlı Enerji Karar Destek Algoritması mantığı BeeHive Energy Teknolojileri A.Ş.'ye aittir. İzinsiz kopyalanamaz veya ticari amaçla çoğaltılamaz.
          </p>
        </section>

        {/* 6. İletişim */}
        <section className="space-y-3 bg-[#F6F6F2] border border-[#DDE1DA] rounded-2xl p-6">
          <h2 className="text-base sm:text-lg font-bold text-[#182019] flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#1F5A43]" />
            <span>6. İletişim</span>
          </h2>
          <p>
            Kullanım koşullarına dair tüm sorularınız için <Link to="/iletisim" className="text-[#1F5A43] underline font-semibold">İletişim Sayfamızı</Link> ziyaret edebilir veya <strong>hukuk@beehive.energy</strong> adresine yazabilirsiniz.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfUseView;

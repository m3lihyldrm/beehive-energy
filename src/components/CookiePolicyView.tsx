import React from 'react';
import { Link } from 'react-router-dom';
import { Cookie, ShieldCheck, CheckCircle2, XCircle, ArrowLeft, Mail } from 'lucide-react';

export const CookiePolicyView: React.FC = () => {
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
          <Cookie className="w-3.5 h-3.5" />
          <span>Şeffaflık & Çerezler</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#182019] tracking-tight">
          Çerez Politikası
        </h1>
        <p className="text-xs sm:text-sm text-[#5D665E]">
          Son güncelleme: 17 Ekim 2026 · Yürürlük Tarihi: 17 Ekim 2026
        </p>
      </div>

      {/* Giriş */}
      <div className="p-5 rounded-2xl bg-white border border-[#DDE1DA] space-y-2 text-xs sm:text-sm text-[#182019] leading-relaxed shadow-subtle">
        <p>
          BeeHive olarak kullanıcılarımızın gizliliğine saygı duyuyoruz. Bu Çerez Politikası, web sitemizde hangi teknolojilerin kullanıldığını ve verilerinizin nasıl korunduğunu açıklar. Sitemizde <strong>reklam veya profil çıkarma amaçlı takip çerezleri kesinlikle kullanılmaz.</strong>
        </p>
      </div>

      {/* Bölümler */}
      <div className="space-y-8 text-xs sm:text-sm text-[#5D665E] leading-relaxed">
        {/* 1. Çerez Nedir? */}
        <section className="space-y-3 bg-white border border-[#DDE1DA] rounded-2xl p-6 shadow-subtle">
          <h2 className="text-base sm:text-lg font-bold text-[#182019] flex items-center gap-2">
            <Cookie className="w-4 h-4 text-[#1F5A43]" />
            <span>1. Çerez (Cookie) Nedir?</span>
          </h2>
          <p>
            Çerezler, bir web sitesini ziyaret ettiğinizde tarayıcınız tarafından cihazınıza kaydedilen küçük metin dosyalarıdır. Genellikle sitenin düzgün çalışmasını sağlamak, tercihlerinizi hatırlamak ve güvenliği artırmak için kullanılır.
          </p>
        </section>

        {/* 2. Kullandığımız Teknolojiler */}
        <section className="space-y-4 bg-white border border-[#DDE1DA] rounded-2xl p-6 shadow-subtle">
          <h2 className="text-base sm:text-lg font-bold text-[#182019] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#1F5A43]" />
            <span>2. Sitemizde Kullanılan Teknolojiler</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#F6F6F2] border border-[#DDE1DA] space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#182019]">
                <CheckCircle2 className="w-4 h-4 text-[#1F5A43]" />
                <span>Teknik Zorunlu Depolama</span>
              </div>
              <p className="text-xs text-[#5D665E]">
                Yetkili yönetim paneline giriş yaptığınızda oturumunuzun korunması için kullanılan `localStorage` anahtarı (`beehive_admin_token`).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F6F6F2] border border-[#DDE1DA] space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#182019]">
                <CheckCircle2 className="w-4 h-4 text-[#1F5A43]" />
                <span>Çerezsiz Gizlilik Analitiği</span>
              </div>
              <p className="text-xs text-[#5D665E]">
                Plausible Analytics kullanılarak hiçbir çerez bırakılmadan anonim sayfa gösterim sayıları ölçülür. IP veya cihaz parmak izi saklanmaz.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Kullanmadığımız Çerezler */}
        <section className="space-y-3 bg-white border border-[#DDE1DA] rounded-2xl p-6 shadow-subtle">
          <h2 className="text-base sm:text-lg font-bold text-[#182019] flex items-center gap-2">
            <XCircle className="w-4 h-4 text-[#D84C32]" />
            <span>3. Kullanmadığımız Çerez Türleri</span>
          </h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Reklam ve Hedefleme Çerezleri:</strong> Sitemizde üçüncü taraf reklam ağları (Google Ads, Facebook Pixel vb.) bulunmaz.</li>
            <li><strong>Kullanıcı Profilleme Çerezleri:</strong> Ziyaretçilerin internet geçmişi veya ilgi alanları profillenmez.</li>
            <li><strong>Çapraz Site Takibi:</strong> Diğer web sitelerindeki gezinmeleriniz izlenmez.</li>
          </ul>
        </section>

        {/* 4. Çerezleri Nasıl Kontrol Edebilirsiniz? */}
        <section className="space-y-3 bg-white border border-[#DDE1DA] rounded-2xl p-6 shadow-subtle">
          <h2 className="text-base sm:text-lg font-bold text-[#182019] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#1F5A43]" />
            <span>4. Çerezleri ve Yerel Depolamayı Yönetme</span>
          </h2>
          <p>
            Tarayıcınızın ayarlarından çerezleri dilediğiniz zaman silebilir veya engelleyebilirsiniz. Ancak zorunlu teknik depolamayı engellemeniz durumunda yetkili operasyon panelinde oturum açma fonksiyonu etkilenebilir.
          </p>
        </section>

        {/* 5. İletişim */}
        <section className="space-y-3 bg-[#F6F6F2] border border-[#DDE1DA] rounded-2xl p-6">
          <h2 className="text-base sm:text-lg font-bold text-[#182019] flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#1F5A43]" />
            <span>5. İletişim</span>
          </h2>
          <p>
            Çerez politikamız ile ilgili sorularınız için <strong>iletisim@beehive.energy</strong> adresinden bize ulaşabilirsiniz.
          </p>
        </section>
      </div>
    </div>
  );
};

export default CookiePolicyView;

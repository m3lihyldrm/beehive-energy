import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, MapPin, MessageSquare, Cookie, Server, UserCheck, Mail, ArrowLeft } from 'lucide-react';

export const PrivacyPolicyView: React.FC = () => {
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
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Yasal Dokümantasyon</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#182019] tracking-tight">
          Gizlilik Politikası
        </h1>
        <p className="text-xs sm:text-sm text-[#5D665E]">
          Son güncelleme: 17 Ekim 2026 · Yürürlük Tarihi: 17 Ekim 2026
        </p>
      </div>

      {/* Giriş Özeti */}
      <div className="p-5 rounded-2xl bg-[#E5F0EA]/40 border border-[#1F5A43]/20 space-y-2 text-xs sm:text-sm text-[#182019] leading-relaxed">
        <p>
          <strong>BeeHive</strong> olarak kişisel verilerinizin güvenliğine ve mahremiyetinize en yüksek düzeyde önem veriyoruz. Bu Gizlilik Politikası, BeeHive web sitesi, mobil tarayıcı arayüzü ve akıllı durak kamusal şarj hizmetlerimizi kullanırken işlenen verilere ilişkin 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) ve ilgili mevzuat uyarınca aydınlatma amacıyla hazırlanmıştır.
        </p>
      </div>

      {/* Bölümler */}
      <div className="space-y-8 text-xs sm:text-sm text-[#5D665E] leading-relaxed">
        {/* 1. Toplanan Veriler */}
        <section className="space-y-3 bg-white border border-[#DDE1DA] rounded-2xl p-6 shadow-subtle">
          <h2 className="text-base sm:text-lg font-bold text-[#182019] flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#1F5A43]" />
            <span>1. Toplanan Veriler</span>
          </h2>
          <p>
            BeeHive kamusal durak sisteminde bireysel yolculardan hiçbir kamera, biyometrik veri veya kimlik bilgisi toplanmaz. Sistem yalnızca teknik enerji telemetrisini (üretim kW, tüketim kW, pil gerilimi, hücre sıcaklığı) anonim olarak kaydeder.
          </p>
          <p>
            Web sitesi üzerinden kurumsal demo talebinde bulunmanız durumunda ad-soyad, kurumsal e-posta, kurum adı ve görev unvanı bilgileri işlenir.
          </p>
        </section>

        {/* 2. Konum Verisi */}
        <section className="space-y-3 bg-white border border-[#DDE1DA] rounded-2xl p-6 shadow-subtle">
          <h2 className="text-base sm:text-lg font-bold text-[#182019] flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#1F5A43]" />
            <span>2. Konum Verisi</span>
          </h2>
          <div className="p-3.5 rounded-xl bg-[#EFF0EB] border border-[#DDE1DA] text-[#182019] font-medium">
            Konum izni yalnızca en yakın durak hesaplaması için kullanılır. Konum verisi kalıcı olarak saklanmaz.
          </div>
          <p>
            Harita ekranında "En Yakın Durağı Bul" özelliğini kullandığınızda, tarayıcınızın Geolocation API'si üzerinden anlık enlem ve boylam bilginiz Haversine algoritması ile en yakın durağı listelemek üzere tek seferlik işlenir. Sunucularımızda konum geçmişi veya cihaz takibi tutulmaz.
          </p>
        </section>

        {/* 3. Geri Bildirim Verisi */}
        <section className="space-y-3 bg-white border border-[#DDE1DA] rounded-2xl p-6 shadow-subtle">
          <h2 className="text-base sm:text-lg font-bold text-[#182019] flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#1F5A43]" />
            <span>3. Geri Bildirim Verisi</span>
          </h2>
          <p>
            Durak arıza veya hizmet sorun bildiriminde (priz çalışmıyor, temizlik, aydınlatma vb.) sizden ad veya telefon istenmez. Yalnızca durak kodu, sorun kategorisi ve isteğe bağlı açıklama mesajı anonim teknik bakım günlüğüne kaydedilir.
          </p>
        </section>

        {/* 4. Çerezler ve Yerel Depolama */}
        <section className="space-y-3 bg-white border border-[#DDE1DA] rounded-2xl p-6 shadow-subtle">
          <h2 className="text-base sm:text-lg font-bold text-[#182019] flex items-center gap-2">
            <Cookie className="w-4 h-4 text-[#1F5A43]" />
            <span>4. Çerezler ve Yerel Depolama</span>
          </h2>
          <p>
            Sitemizde reklam, kullanıcı profilleme veya davranışsal takip çerezleri kullanılmaz. Yalnızca harita görünüm tercihiniz ve yetkili operasyon giriş tokenı (localStorage) teknik süreklilik için saklanır. Ayrıntılı bilgi için <Link to="/cerez-politikasi" className="text-[#1F5A43] underline font-semibold">Çerez Politikamızı</Link> inceleyebilirsiniz.
          </p>
        </section>

        {/* 5. Üçüncü Taraf Servisler */}
        <section className="space-y-3 bg-white border border-[#DDE1DA] rounded-2xl p-6 shadow-subtle">
          <h2 className="text-base sm:text-lg font-bold text-[#182019] flex items-center gap-2">
            <Server className="w-4 h-4 text-[#1F5A43]" />
            <span>5. Üçüncü Taraf Servisler</span>
          </h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Harita Altlığı:</strong> OpenStreetMap / CartoDB harita karoları üzerinden açık kaynak olarak sunulur.</li>
            <li><strong>Gizlilik Dostu Analitik:</strong> Plausible Analytics (kişisel veri toplamaz, çerez bırakmaz, GDPR tam uyumludur).</li>
            <li><strong>E-Posta Servisi:</strong> Kurumsal demo talepleri Resend API altyapısı üzerinden şifreli aktarılır.</li>
          </ul>
        </section>

        {/* 6. Veri Saklama Süreleri */}
        <section className="space-y-3 bg-white border border-[#DDE1DA] rounded-2xl p-6 shadow-subtle">
          <h2 className="text-base sm:text-lg font-bold text-[#182019] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#1F5A43]" />
            <span>6. Veri Saklama ve Güvenlik</span>
          </h2>
          <p>
            Kurumsal iletişim talepleri değerlendirme ve sözleşme süresince güvenli veri merkezlerinde TLS 1.3 şifreleme ile saklanır. Yetkisiz erişimleri önlemek amacıyla tüm veritabanı uç noktaları JWT tabanlı kimlik doğrulama duvarı arkasındadır.
          </p>
        </section>

        {/* 7. Kullanıcı Hakları (KVKK Madde 11) */}
        <section className="space-y-3 bg-white border border-[#DDE1DA] rounded-2xl p-6 shadow-subtle">
          <h2 className="text-base sm:text-lg font-bold text-[#182019] flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-[#1F5A43]" />
            <span>7. Kullanıcı Hakları</span>
          </h2>
          <p>
            KVKK'nın 11. maddesi kapsamında; verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, silinmesini veya düzeltilmesini isteme haklarına sahipsiniz. Taleplerinizi aşağıdaki iletişim adresine iletebilirsiniz.
          </p>
        </section>

        {/* 8. İletişim */}
        <section className="space-y-3 bg-[#F6F6F2] border border-[#DDE1DA] rounded-2xl p-6">
          <h2 className="text-base sm:text-lg font-bold text-[#182019] flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#1F5A43]" />
            <span>8. İletişim Bilgileri</span>
          </h2>
          <p>
            Gizlilik politikamız ve veri haklarınız ile ilgili her türlü soru için:
          </p>
          <div className="text-xs space-y-1 font-mono text-[#182019]">
            <p><strong>Veri Sorumlusu:</strong> BeeHive Energy Teknolojileri A.Ş.</p>
            <p><strong>E-Posta:</strong> kvkk@beehive.energy / iletisim@beehive.energy</p>
            <p><strong>Adres:</strong> Teknoloji Geliştirme Bölgesi, Selçuklu / Konya</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicyView;

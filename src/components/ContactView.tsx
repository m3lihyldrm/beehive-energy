import React, { useState } from 'react';
import { Mail, Building, User, Send, CheckCircle2, ShieldCheck, MapPin, Download, Globe, ExternalLink, AlertCircle, Loader2 } from 'lucide-react';
import { SimulationBanner } from './common/SimulationBanner';
import { submitDemoRequest } from '../services/api';
import { trackEvent } from '../services/analytics';

export const ContactView: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string>('Talebiniz alındı. BeeHive ekibi en kısa sürede dönüş yapacaktır.');

  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    orgType: 'Belediye / Kamu Kurumu',
    role: '',
    email: '',
    city: 'Konya',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // İstemci tarafı doğrulama kuralları
    if (!formData.name.trim()) {
      setErrorMessage('Lütfen ad ve soyadınızı belirtiniz.');
      trackEvent('contact_form_error', { reason: 'missing_name' });
      return;
    }
    if (!formData.organization.trim()) {
      setErrorMessage('Lütfen kurum veya şirket adını belirtiniz.');
      trackEvent('contact_form_error', { reason: 'missing_organization' });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setErrorMessage('Lütfen geçerli bir kurumsal e-posta adresi giriniz.');
      trackEvent('contact_form_error', { reason: 'invalid_email' });
      return;
    }
    if (!formData.orgType.trim()) {
      setErrorMessage('Lütfen kurum türünü seçiniz.');
      trackEvent('contact_form_error', { reason: 'missing_org_type' });
      return;
    }
    if (formData.message.trim().length < 20) {
      setErrorMessage('Talep mesajınız en az 20 karakter olmalıdır (Lütfen durağınız ve ihtiyaçlarınız hakkında kısa bilgi veriniz).');
      trackEvent('contact_form_error', { reason: 'message_too_short' });
      return;
    }

    setSubmitting(true);
    try {
      const res = await submitDemoRequest({
        fullName: formData.name,
        organization: formData.organization,
        email: formData.email,
        organizationType: formData.orgType,
        interest: formData.role ? `${formData.role} - ${formData.city}` : formData.city,
        message: formData.message,
      });

      if (res.success) {
        setSuccessNotice(res.message || 'Talebiniz alındı. BeeHive ekibi en kısa sürede dönüş yapacaktır.');
        setSubmitted(true);
        trackEvent('demo_request_submitted', {
          organizationType: formData.orgType,
          hasEmailDelivery: Boolean(res.emailDelivered)
        });
      } else {
        const errorText = res.details?.join(' ') || res.message || 'İstek gönderilirken bir hata oluştu.';
        setErrorMessage(errorText);
        trackEvent('contact_form_error', { reason: errorText });
      }
    } catch {
      setErrorMessage('Sunucuya ulaşılamadı. Lütfen internet bağlantınızı kontrol ediniz.');
      trackEvent('contact_form_error', { reason: 'network_failure' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDownloadDeck = () => {
    // Demo sunum indirme simulasyonu
    const blob = new Blob([
      `BeeHive - Ikinci Yasam Enerjiden Akilli Sehirlere\nKurumsal Urun ve Teknoloji Dokumani (2026)\n\nIletisim: iletisim@beehive.energy\nWeb: https://beehive.energy\n\n1. Ikinci Yasam EV Bataryalari ile Sehir Altyapisi\n2. EI60 Guvenli Enerji Kabini\n3. Kural Tabanli Enerji Karar Destek Algoritmasi\n4. Kamu Sarj ve Akilli Sehir Hizmetleri\n5. ESG ve Karbon Salim Raporlamasi`
    ], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'BeeHive_Kurumsal_Sunum_2026.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10 animate-in fade-in duration-200">
      {/* Başlık */}
      <div className="space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5F0EA] border border-[#1F5A43]/20 text-xs font-semibold text-[#1F5A43]">
          <Mail className="w-3.5 h-3.5" />
          <span>İletişim & Kurumsal Demo Talebi</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#182019]">
          BeeHive Ekibiyle İletişime Geçin
        </h1>
        <p className="text-sm sm:text-base text-[#5D665E] max-w-2xl leading-relaxed">
          Belediyeler, enerji şirketleri, üniversite kampüsleri, ulaşım operatörleri ve yatırımcılar için modüler akıllı durak pilot kurulum fizibilitesi ve platform sunumu.
        </p>
      </div>

      <SimulationBanner
        message="Demo / Simülasyon Aşaması:"
        subtext="Bu talep formu gerçek e-posta servisine (Resend) bağlıdır; yetkili operasyon ekibimize iletilir ve yerel veritabanında güvenle işlenir."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* İletişim & Doküman Kartları */}
        <div className="md:col-span-1 space-y-5">
          <div className="bg-white border border-[#DDE1DA] rounded-2xl p-6 shadow-subtle space-y-5">
            <h3 className="text-sm font-bold text-[#182019]">Genel Merkez & Operasyon</h3>
            <div className="space-y-3.5 text-xs text-[#5D665E]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#1F5A43] shrink-0 mt-0.5" />
                <span>Teknoloji Geliştirme Bölgesi, Selçuklu / Konya</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#1F5A43] shrink-0 mt-0.5" />
                <span>iletisim@beehive.energy</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Globe className="w-4 h-4 text-[#1F5A43] shrink-0 mt-0.5" />
                <span>www.beehive.energy</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#DDE1DA] space-y-2 text-xs">
              <span className="font-semibold text-[#182019] block">Sosyal & Kod Ağları:</span>
              <div className="flex flex-col gap-2">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="BeeHive LinkedIn Sayfası"
                  className="flex items-center justify-between text-[#1F5A43] hover:underline font-medium min-h-[36px]"
                >
                  <span>LinkedIn / BeeHive Energy</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="BeeHive GitHub Sayfası"
                  className="flex items-center justify-between text-[#1F5A43] hover:underline font-medium min-h-[36px]"
                >
                  <span>GitHub / beehive-energy</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="pt-4 border-t border-[#DDE1DA] space-y-2 text-[11px] text-[#5D665E]">
              <div className="flex items-center gap-1.5 font-medium text-[#182019]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1F5A43]" />
                <span>KVKK & Veri Güvenliği</span>
              </div>
              <p className="leading-relaxed">
                İlettiğiniz kurum ve iletişim verileri yalnızca değerlendirme amacıyla kullanılır; üçüncü taraflarla paylaşılmaz.
              </p>
            </div>
          </div>

          {/* Doküman İndirme Kartı */}
          <div className="bg-[#E5F0EA]/50 border border-[#1F5A43]/20 rounded-2xl p-5 space-y-3">
            <h4 className="text-xs font-bold text-[#182019] uppercase tracking-wider">
              Kurumsal Dokümantasyon
            </h4>
            <p className="text-xs text-[#5D665E] leading-relaxed">
              BeeHive teknik özellikleri, güvenlik test protokolleri ve iş modeli özetini tek dosyada inceleyin.
            </p>
            <button
              onClick={handleDownloadDeck}
              aria-label="BeeHive Kurumsal Tanıtım Dosyasını İndir"
              className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white border border-[#1F5A43]/30 text-[#1F5A43] text-xs font-bold hover:bg-[#E5F0EA] transition-all shadow-sm focus:ring-2 focus:ring-[#1F5A43] focus:outline-none"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Tanıtım Dosyasını İndir</span>
            </button>
          </div>
        </div>

        {/* Form Alanı */}
        <div className="md:col-span-2">
          <div className="bg-white border border-[#DDE1DA] rounded-2xl p-6 sm:p-8 shadow-subtle">
            {submitted ? (
              <div className="text-center py-12 space-y-4 animate-in fade-in duration-200">
                <div className="w-14 h-14 rounded-full bg-[#E5F0EA] border border-[#1F5A43]/20 flex items-center justify-center text-[#1F5A43] mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-[#182019]">
                  {successNotice}
                </h3>
                <p className="text-xs sm:text-sm text-[#5D665E] max-w-md mx-auto leading-relaxed">
                  Talebiniz kurumsal operasyon ekibimize iletilmiştir. İlgili teknik şartname, pilot fizibilite örneği ve platform erişim daveti en kısa sürede kurumsal e-posta adresinize iletilecektir.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        organization: '',
                        orgType: 'Belediye / Kamu Kurumu',
                        role: '',
                        email: '',
                        city: 'Konya',
                        message: '',
                      });
                    }}
                    className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#EFF0EB] hover:bg-[#DDE1DA] text-xs font-bold text-[#182019] transition"
                  >
                    Yeni Talep Oluştur
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-[#FCECEC] border border-[#B94040]/30 text-xs text-[#B94040] flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-medium text-[#182019] mb-1">
                      Ad Soyad *
                    </label>
                    <div className="relative">
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Örn: Dr. Ahmet Yılmaz"
                        className="w-full bg-[#F6F6F2] border border-[#DDE1DA] rounded-lg px-3 py-2.5 text-xs sm:text-sm text-[#182019] focus:bg-white focus:border-[#1F5A43] focus:ring-1 focus:ring-[#1F5A43] focus:outline-none transition min-h-[44px]"
                      />
                      <User className="w-3.5 h-3.5 text-[#5D665E] absolute right-3 top-3.5 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-medium text-[#182019] mb-1">
                      Kurumsal E-Posta *
                    </label>
                    <div className="relative">
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ahmet@belediye.gov.tr"
                        className="w-full bg-[#F6F6F2] border border-[#DDE1DA] rounded-lg px-3 py-2.5 text-xs sm:text-sm text-[#182019] focus:bg-white focus:border-[#1F5A43] focus:ring-1 focus:ring-[#1F5A43] focus:outline-none transition min-h-[44px]"
                      />
                      <Mail className="w-3.5 h-3.5 text-[#5D665E] absolute right-3 top-3.5 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-org" className="block text-xs font-medium text-[#182019] mb-1">
                      Kurum / Şirket Adı *
                    </label>
                    <input
                      id="contact-org"
                      type="text"
                      required
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="Örn: Konya Büyükşehir Belediyesi"
                      className="w-full bg-[#F6F6F2] border border-[#DDE1DA] rounded-lg px-3 py-2.5 text-xs sm:text-sm text-[#182019] focus:bg-white focus:border-[#1F5A43] focus:ring-1 focus:ring-[#1F5A43] focus:outline-none transition min-h-[44px]"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-org-type" className="block text-xs font-medium text-[#182019] mb-1">
                      Kurum Türü *
                    </label>
                    <select
                      id="contact-org-type"
                      value={formData.orgType}
                      onChange={(e) => setFormData({ ...formData, orgType: e.target.value })}
                      className="w-full bg-[#F6F6F2] border border-[#DDE1DA] rounded-lg px-3 py-2.5 text-xs sm:text-sm text-[#182019] focus:bg-white focus:border-[#1F5A43] focus:ring-1 focus:ring-[#1F5A43] focus:outline-none transition min-h-[44px]"
                    >
                      <option value="Belediye / Kamu Kurumu">Belediye / Kamu Kurumu</option>
                      <option value="Üniversite / Teknopark">Üniversite / Teknopark</option>
                      <option value="Toplu Taşıma / Ulaşım Operatörü">Toplu Taşıma / Ulaşım Operatörü</option>
                      <option value="Enerji / Şarj Altyapı Şirketi">Enerji / Şarj Altyapı Şirketi</option>
                      <option value="Yatırımcı / Girişim Sermayesi">Yatırımcı / Girişim Sermayesi</option>
                      <option value="Diğer">Diğer</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-role" className="block text-xs font-medium text-[#182019] mb-1">
                      Göreviniz / Unvanınız
                    </label>
                    <input
                      id="contact-role"
                      type="text"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="Örn: Ulaşım Daire Bşk. / Yatırım Direktörü"
                      className="w-full bg-[#F6F6F2] border border-[#DDE1DA] rounded-lg px-3 py-2.5 text-xs sm:text-sm text-[#182019] focus:bg-white focus:border-[#1F5A43] focus:ring-1 focus:ring-[#1F5A43] focus:outline-none transition min-h-[44px]"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-city" className="block text-xs font-medium text-[#182019] mb-1">
                      Şehir / Bölge
                    </label>
                    <input
                      id="contact-city"
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-[#F6F6F2] border border-[#DDE1DA] rounded-lg px-3 py-2.5 text-xs sm:text-sm text-[#182019] focus:bg-white focus:border-[#1F5A43] focus:ring-1 focus:ring-[#1F5A43] focus:outline-none transition min-h-[44px]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-medium text-[#182019] mb-1">
                    İlgi Alanınız veya Talep Detayı * (En az 20 karakter)
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Örnek durak entegrasyonu, ikinci yaşam batarya tedariği, teknik şartname veya saha fizibilitesi hakkında bilgi almak istiyoruz..."
                    className="w-full bg-[#F6F6F2] border border-[#DDE1DA] rounded-lg p-3 text-xs sm:text-sm text-[#182019] focus:bg-white focus:border-[#1F5A43] focus:ring-1 focus:ring-[#1F5A43] focus:outline-none transition resize-none"
                  />
                  <div className="flex justify-between items-center text-[10px] text-[#5D665E] mt-1">
                    <span>Minimum 20 karakter</span>
                    <span>{formData.message.trim().length} karakter</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  aria-label="Demo ve İşbirliği Talebini Gönder"
                  className="w-full min-h-[44px] py-3 px-4 bg-[#1F5A43] hover:bg-[#174634] text-white font-semibold rounded-xl text-xs sm:text-sm shadow-sm transition flex items-center justify-center gap-2 focus:ring-2 focus:ring-offset-2 focus:ring-[#1F5A43] focus:outline-none disabled:opacity-60 cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>İletiliyor...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Demo & İşbirliği Talebini Gönder</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactView;

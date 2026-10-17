import React, { useState } from 'react';
import { Lock, Shield, AlertCircle, ArrowLeft, Mail } from 'lucide-react';
import { BeeHiveLogo } from '../BeeHiveLogo';
import { BaseModal } from '../common/BaseModal';

interface AdminLoginProps {
  loginEmail: string;
  setLoginEmail: (email: string) => void;
  loginPassword: string;
  setLoginPassword: (password: string) => void;
  loginError: string;
  isLoggingIn: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onBackToPublic?: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({
  loginEmail,
  setLoginEmail,
  loginPassword,
  setLoginPassword,
  loginError,
  isLoggingIn,
  onSubmit,
  onBackToPublic,
}) => {
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F6F6F2] text-[#182019] flex flex-col justify-center items-center px-4 py-12 font-sans">
      <div className="w-full max-w-md bg-white border border-[#DDE1DA] rounded-2xl p-8 shadow-subtle space-y-6">
        <div className="flex items-center gap-3">
          <BeeHiveLogo size="md" subtext="İşletme Yönetim Paneli" />
        </div>

        {/* Yetkili Operasyon Erişimi Bildirimi */}
        <div className="space-y-1">
          <h2 className="text-base font-bold text-[#182019]">Yetkili Operasyon Erişimi</h2>
          <p className="text-xs text-[#5D665E] leading-relaxed">
            Bu panel yalnızca yetkili BeeHive işletme kullanıcıları içindir.
          </p>
        </div>

        {loginError && (
          <div className="p-3 bg-[#FCECEC] border border-[#B94040]/30 rounded-xl text-[#B94040] text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{loginError}</span>
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="admin-email" className="block text-xs font-semibold text-[#182019] mb-1">
              E-Posta
            </label>
            <input
              id="admin-email"
              type="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              placeholder="ad.soyad@beehive.energy"
              required
              className="w-full bg-[#F6F6F2] border border-[#DDE1DA] rounded-lg px-3 py-2.5 text-xs sm:text-sm text-[#182019] focus:bg-white focus:border-[#1F5A43] focus:ring-1 focus:ring-[#1F5A43] focus:outline-none transition min-h-[44px]"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="admin-password" className="text-xs font-semibold text-[#182019]">
                Şifre
              </label>
              <button
                type="button"
                onClick={() => setForgotPasswordOpen(true)}
                className="text-[11px] text-[#1F5A43] hover:underline"
              >
                Şifremi unuttum
              </button>
            </div>
            <input
              id="admin-password"
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full bg-[#F6F6F2] border border-[#DDE1DA] rounded-lg px-3 py-2.5 text-xs sm:text-sm text-[#182019] focus:bg-white focus:border-[#1F5A43] focus:ring-1 focus:ring-[#1F5A43] focus:outline-none transition min-h-[44px]"
            />
          </div>

          <button
            type="submit"
            aria-label="Yetkili Girişi Yap"
            disabled={isLoggingIn}
            className="w-full min-h-[44px] py-3 px-4 bg-[#1F5A43] hover:bg-[#174634] text-white font-semibold rounded-lg text-xs sm:text-sm shadow-subtle transition flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-[#1F5A43] focus:outline-none"
          >
            <Lock className="w-4 h-4" />
            <span>{isLoggingIn ? 'Doğrulanıyor...' : 'Giriş Yap'}</span>
          </button>
        </form>

        {onBackToPublic && (
          <div className="pt-3 border-t border-[#DDE1DA] text-center">
            <button
              onClick={onBackToPublic}
              className="text-xs text-[#5D665E] hover:text-[#182019] transition flex items-center justify-center gap-1 mx-auto"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Ana Sayfaya Dön</span>
            </button>
          </div>
        )}

        <div className="p-3 bg-[#EFF0EB] rounded-lg text-[10px] text-[#5D665E] text-center leading-relaxed">
          Güvenlik Bildirimi: Halk API’sinde teknik telemetri paylaşımı kısıtlanmıştır; yetkisiz erişim denemeleri denetim günlüğünde kayıt altına alınır.
        </div>
      </div>

      {/* Şifremi Unuttum Modalı */}
      <BaseModal
        isOpen={forgotPasswordOpen}
        onClose={() => setForgotPasswordOpen(false)}
        title="Şifre Sıfırlama"
        subtitle="BeeHive İşletme Yönetim Paneli"
        footer={
          <button
            onClick={() => setForgotPasswordOpen(false)}
            className="px-4 py-2 rounded-lg bg-[#EFF0EB] hover:bg-[#DDE1DA] text-xs font-semibold text-[#182019] transition"
          >
            Kapat
          </button>
        }
      >
        <div className="space-y-3 text-xs leading-relaxed text-[#182019]">
          <p>
            Kurumsal şifre sıfırlama talepleriniz için lütfen kurum sistem yöneticiniz veya{' '}
            <strong className="text-[#1F5A43]">destek@beehive.energy</strong> operasyon masası ile iletişime geçiniz.
          </p>
          <div className="p-3 bg-[#F6F6F2] border border-[#DDE1DA] rounded-lg text-[11px] text-[#5D665E]">
            Güvenlik gereği harici şifre sıfırlama linkleri yalnızca kayıtlı iki faktörlü kimlik doğrulama adresiyle paylaşılır.
          </div>
        </div>
      </BaseModal>
    </div>
  );
};

export default AdminLogin;

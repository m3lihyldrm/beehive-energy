import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Building2, Shield, CalendarCheck } from 'lucide-react';
import { trackEvent } from '../services/analytics';

interface DemoRequestCTAProps {
  className?: string;
}

export const DemoRequestCTA: React.FC<DemoRequestCTAProps> = ({ className = '' }) => {
  return (
    <div
      className={`bg-white border border-[#1F5A43]/30 rounded-2xl p-6 sm:p-10 shadow-subtle relative overflow-hidden bg-linear-to-br from-white via-[#FBFDFB] to-[#E5F0EA]/30 ${className}`}
    >
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5F0EA] border border-[#1F5A43]/20 text-xs font-semibold text-[#1F5A43]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Belediye & Kampüs Entegrasyonu</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-[#182019] tracking-tight">
            Şehrinizde İkinci Yaşam Enerji Dönüşümünü Başlatın
          </h3>

          <p className="text-xs sm:text-sm text-[#5D665E] max-w-xl leading-relaxed">
            BeeHive modüler akıllı durak ve güvenli enerji kabini mimarisi hakkında belediyeniz, ulaşım idareniz veya üniversite kampüsünüz için demo talebinde bulunun.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-[#5D665E] pt-1">
            <div className="flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#1F5A43]" />
              <span>Modüler Montaj</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#1F5A43]" />
              <span>EI60 Yangın Güvenliği</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CalendarCheck className="w-3.5 h-3.5 text-[#1F5A43]" />
              <span>Dijital İkiz Simülasyonu</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <Link
            to="/iletisim"
            onClick={() => trackEvent('demo_request_cta_clicked', { source: 'cta_banner' })}
            className="px-6 py-3.5 rounded-xl bg-[#1F5A43] hover:bg-[#174634] text-white font-semibold text-xs sm:text-sm shadow-subtle transition-colors flex items-center justify-center gap-2 group text-center"
          >
            <span>Demo Talebinde Bulunun</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            to="/nasil-calisir"
            className="px-5 py-3.5 rounded-xl bg-white border border-[#DDE1DA] hover:bg-[#F6F6F2] text-[#182019] font-semibold text-xs sm:text-sm transition-colors text-center"
          >
            Teknik Raporu İncele
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DemoRequestCTA;

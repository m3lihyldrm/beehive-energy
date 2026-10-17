import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AdminStation, AdminAlert, FeedbackSubmission, AiRecommendation } from '../types';
import {
  loginAdmin,
  getAdminOverview,
  getAdminStations,
  getAiRecommendations,
  applyAiRecommendation,
  dismissAiRecommendation,
  isolateBattery,
  getAdminAlerts,
  getAdminFeedbacks,
  updateFeedbackStatus
} from '../services/api';
import { AdminLayout, AdminTab } from './admin/AdminLayout';
import { AdminLogin } from './admin/AdminLogin';
import { AdminOverview } from './admin/AdminOverview';
import { AdminStations } from './admin/AdminStations';
import { AdminBatteries } from './admin/AdminBatteries';
import { AdminEnergy } from './admin/AdminEnergy';
import { AdminClimate } from './admin/AdminClimate';
import { AdminCharging } from './admin/AdminCharging';
import { AdminRecommendations } from './admin/AdminRecommendations';
import { AdminAlerts } from './admin/AdminAlerts';
import { AdminFeedback } from './admin/AdminFeedback';
import { AdminReports } from './admin/AdminReports';
import { AdminSettings } from './admin/AdminSettings';

interface AdminPortalProps {
  onBackToPublic?: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onBackToPublic }) => {
  const location = useLocation();

  // Auth state
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('beehive_admin_token'));
  const [loginEmail, setLoginEmail] = useState('admin@beehive.energy');
  const [loginPassword, setLoginPassword] = useState('Demo123!');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active admin tab - sync with sub-routes if provided
  const getInitialTab = (): AdminTab => {
    const p = location.pathname.toLowerCase();
    if (p.includes('/admin/ayarlar') || p.includes('/admin/settings')) return 'settings';
    if (p.includes('/admin/raporlar') || p.includes('/admin/reports')) return 'reports';
    if (p.includes('/admin/duraklar') || p.includes('/admin/stations')) return 'stations';
    if (p.includes('/admin/bataryalar') || p.includes('/admin/batteries')) return 'batteries';
    if (p.includes('/admin/enerji') || p.includes('/admin/energy')) return 'energy';
    if (p.includes('/admin/iklimlendirme') || p.includes('/admin/climate')) return 'climate';
    if (p.includes('/admin/sarj') || p.includes('/admin/charging')) return 'charging';
    if (p.includes('/admin/oneriler') || p.includes('/admin/ai')) return 'ai';
    if (p.includes('/admin/uyarilar') || p.includes('/admin/alerts')) return 'alerts';
    if (p.includes('/admin/geribildirim') || p.includes('/admin/feedback')) return 'feedback';
    return 'overview';
  };

  const [activeTab, setActiveTab] = useState<AdminTab>(getInitialTab);

  // Data states
  const [overview, setOverview] = useState<any>(null);
  const [stations, setStations] = useState<AdminStation[]>([]);
  const [recommendations, setRecommendations] = useState<AiRecommendation[]>([]);
  const [alerts, setAlerts] = useState<AdminAlert[]>([]);
  const [eventLogs, setEventLogs] = useState<any[]>([]);
  const [feedbacks, setFeedbacks] = useState<FeedbackSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdatedTime, setLastUpdatedTime] = useState<string>(() =>
    new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
  );
  const [actionSuccessMessage, setActionSuccessMessage] = useState<string | null>(null);

  // 15 Saniyelik Otomatik Yenileme State & Timer
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState(true);
  const [secondsUntilNextRefresh, setSecondsUntilNextRefresh] = useState(15);

  // Load admin data
  const loadAllAdminData = async (authToken: string) => {
    setIsLoading(true);
    try {
      const [ovData, stData, recData, alData, fbData] = await Promise.all([
        getAdminOverview(authToken),
        getAdminStations(authToken),
        getAiRecommendations(authToken),
        getAdminAlerts(authToken),
        getAdminFeedbacks(authToken),
      ]);

      setOverview(ovData);
      setStations(stData);
      setRecommendations(recData.recommendations || []);
      setAlerts(alData.alerts || []);
      setEventLogs(alData.eventLogs || []);
      setFeedbacks(fbData || []);
      setLastUpdatedTime(
        new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
      );
    } catch (err) {
      console.error('Admin veri yükleme hatası:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      loadAllAdminData(token);
    }
  }, [token]);

  // 15 Saniyelik Otomatik Veri Akışı Döngüsü
  useEffect(() => {
    if (!token || !autoRefreshEnabled) return;

    const timer = setInterval(() => {
      setSecondsUntilNextRefresh((prev) => {
        if (prev <= 1) {
          loadAllAdminData(token);
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [token, autoRefreshEnabled]);

  const handleToggleAutoRefresh = () => {
    setAutoRefreshEnabled((prev) => {
      if (!prev) setSecondsUntilNextRefresh(15);
      return !prev;
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');
    try {
      const res = await loginAdmin(loginEmail, loginPassword);
      if (res.success && res.token) {
        setToken(res.token);
        localStorage.setItem('beehive_admin_token', res.token);
      } else {
        setLoginError(res.error || 'Giriş yapılamadı.');
      }
    } catch {
      setLoginError('Bağlantı hatası. Lütfen tekrar deneyiniz.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('beehive_admin_token');
  };

  const handleIsolateBattery = async (target: AdminStation) => {
    if (!token) return;
    try {
      await isolateBattery(target.stationId, token);
      setActionSuccessMessage(
        `${target.name} bataryası simüle izolasyona alındı. Gerçek fiziksel donanıma komut gönderilmemiştir.`
      );
      setStations((prev) =>
        prev.map((s) =>
          s.stationId === target.stationId
            ? {
                ...s,
                status: 'sinirli' as const,
                batteryReadiness: 'bakimda' as const,
                adminOnly: {
                  ...s.adminOnly,
                  batteryState: 'İzolasyona alındı' as const,
                },
              }
            : s
        )
      );
      setTimeout(() => setActionSuccessMessage(null), 6000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleApplyRecommendation = async (recId: string) => {
    if (!token) return;
    try {
      await applyAiRecommendation(recId, token);
      setActionSuccessMessage('Enerji planlama önerisi simülasyon ortamına başarıyla uygulandı.');
      setRecommendations((prev) =>
        prev.map((r) => (r.id === recId ? { ...r, status: 'applied' } : r))
      );
      setTimeout(() => setActionSuccessMessage(null), 6000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDismissRecommendation = async (recId: string) => {
    if (!token) return;
    try {
      await dismissAiRecommendation(recId, token);
      setActionSuccessMessage('Enerji planlama önerisi yok sayıldı.');
      setRecommendations((prev) =>
        prev.map((r) => (r.id === recId ? { ...r, status: 'dismissed' } : r))
      );
      setTimeout(() => setActionSuccessMessage(null), 5000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFeedbackStatusChange = async (feedbackId: string, newStatus: string) => {
    if (!token) return;
    try {
      await updateFeedbackStatus(feedbackId, newStatus, token);
      setFeedbacks((prev) =>
        prev.map((f) => (f.feedbackId === feedbackId ? { ...f, status: newStatus } : f))
      );
      setActionSuccessMessage(`Takip No ${feedbackId} durumu "${newStatus}" olarak güncellendi.`);
      setTimeout(() => setActionSuccessMessage(null), 4000);
    } catch (err) {
      console.error(err);
    }
  };

  // 1. Giriş Yapılmamışsa Login Formu Göster
  if (!token) {
    return (
      <AdminLogin
        loginEmail={loginEmail}
        setLoginEmail={setLoginEmail}
        loginPassword={loginPassword}
        setLoginPassword={setLoginPassword}
        loginError={loginError}
        isLoggingIn={isLoggingIn}
        onSubmit={handleLogin}
        onBackToPublic={onBackToPublic}
      />
    );
  }

  // 2. Giriş Yapılmışsa Modular Admin Portal Layout'u Göster
  return (
    <AdminLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onLogout={handleLogout}
      onBackToPublic={onBackToPublic}
      onRefresh={() => loadAllAdminData(token)}
      isLoading={isLoading}
      lastUpdatedTime={lastUpdatedTime}
      actionSuccessMessage={actionSuccessMessage}
      onClearActionSuccess={() => setActionSuccessMessage(null)}
      alertCount={alerts.filter((a) => a.level === 'critical').length}
      recommendationCount={recommendations.filter((r) => r.status === 'pending').length}
      feedbackCount={feedbacks.filter((f) => f.status === 'Kayıt Alındı').length}
      autoRefreshEnabled={autoRefreshEnabled}
      onToggleAutoRefresh={handleToggleAutoRefresh}
      secondsUntilNextRefresh={secondsUntilNextRefresh}
    >
      {activeTab === 'overview' && (
        <AdminOverview
          overview={overview}
          stations={stations}
          alerts={alerts}
          eventLogs={eventLogs}
          onNavigateTab={setActiveTab}
        />
      )}

      {activeTab === 'stations' && <AdminStations stations={stations} />}

      {activeTab === 'batteries' && (
        <AdminBatteries stations={stations} onIsolateBattery={handleIsolateBattery} />
      )}

      {activeTab === 'energy' && <AdminEnergy stations={stations} overview={overview} />}

      {activeTab === 'climate' && <AdminClimate stations={stations} />}

      {activeTab === 'charging' && <AdminCharging stations={stations} />}

      {activeTab === 'ai' && (
        <AdminRecommendations
          recommendations={recommendations}
          onApply={handleApplyRecommendation}
          onDismiss={handleDismissRecommendation}
        />
      )}

      {activeTab === 'alerts' && <AdminAlerts alerts={alerts} eventLogs={eventLogs} />}

      {activeTab === 'feedback' && (
        <AdminFeedback feedbacks={feedbacks} onUpdateStatus={handleFeedbackStatusChange} />
      )}

      {activeTab === 'reports' && (
        <AdminReports stations={stations} feedbacks={feedbacks} />
      )}

      {activeTab === 'settings' && (
        <AdminSettings onRefreshTelemetry={() => loadAllAdminData(token)} />
      )}
    </AdminLayout>
  );
};

export default AdminPortal;

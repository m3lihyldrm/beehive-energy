import React, { useState, useMemo } from 'react';
import { PublicStation, FilterState } from '../types';
import { getNearbyStations } from '../services/api';
import { MapModule } from './MapModule';
import { FilterBar } from './FilterBar';
import { OfflineFallbackView } from './OfflineFallbackView';
import { StationDrawer } from './StationDrawer';
import { FeedbackModal } from './FeedbackModal';
import { PrivacyConsentModal } from './PrivacyConsentModal';
import { Info, CheckCircle2 } from 'lucide-react';
import { trackEvent } from '../services/analytics';

interface CityMapViewProps {
  stations: PublicStation[];
  onSelectStation?: (station: PublicStation) => void;
}

export const CityMapView: React.FC<CityMapViewProps> = ({
  stations: initialStations,
}) => {
  const [stations, setStations] = useState<PublicStation[]>(initialStations);
  const [selectedStation, setSelectedStation] = useState<PublicStation | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [feedbackStation, setFeedbackStation] = useState<PublicStation | null>(null);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [isNearestActive, setIsNearestActive] = useState(false);
  const [locationNotice, setLocationNotice] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

  const [filters, setFilters] = useState<FilterState>({
    chargingAvailable: false,
    wirelessCharging: false,
    powerOutlet: false,
    hvacActive: false,
    accessible: false,
    onlyActive: false,
    showNearestOnly: false,
    searchQuery: '',
  });

  const handleTriggerNearest = () => {
    if (userLocation) {
      setIsNearestActive(!isNearestActive);
    } else {
      setPrivacyModalOpen(true);
    }
  };

  const handleConsentApproved = () => {
    setLocationNotice(null);
    if (!navigator.geolocation) {
      setLocationNotice('Tarayıcınız konum servisini desteklememektedir.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLocation([latitude, longitude]);
        setIsNearestActive(true);
        const nearby = await getNearbyStations(latitude, longitude);
        setStations(nearby);
        if (nearby.length > 0) {
          setSelectedStation(nearby[0]);
          setDrawerOpen(true);
        }
      },
      (err) => {
        const simLat = 37.8720;
        const simLng = 32.4920;
        setUserLocation([simLat, simLng]);
        setIsNearestActive(true);
        getNearbyStations(simLat, simLng).then((nearby) => {
          setStations(nearby);
          if (nearby.length > 0) {
            setSelectedStation(nearby[0]);
            setDrawerOpen(true);
          }
        });
      },
      { timeout: 8000 }
    );
  };

  const handleConsentDenied = () => {
    setLocationNotice('Konum izni verilmedi. Durakları harita veya listeden seçebilirsiniz.');
  };

  const filteredStations = useMemo(() => {
    return stations.filter((station) => {
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matches = station.name.toLowerCase().includes(q) || station.stationId.toLowerCase().includes(q);
        if (!matches) return false;
      }
      if (filters.onlyActive && station.status !== 'aktif') return false;
      if (filters.chargingAvailable && station.usbCPorts === 0 && station.powerOutlets === 0) return false;
      if (filters.wirelessCharging && !station.wirelessCharging) return false;
      if (filters.powerOutlet && station.powerOutlets === 0) return false;
      if (filters.hvacActive && !station.hvacStatus.includes('Aktif')) return false;
      if (filters.accessible && !station.accessibility.includes('Uyumlu')) return false;
      if (filters.ledLighting && station.status === 'bakimda') return false;
      if (filters.screenDisplay && station.status === 'bakimda') return false;
      return true;
    });
  }, [stations, filters]);

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#F6F6F2] relative">
      {/* Konum İzni Reddedildiğinde Bilgilendirme */}
      {locationNotice && (
        <div className="bg-white border-b border-[#DDE1DA] px-4 py-2 text-xs text-[#5D665E] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-[#1F5A43]" />
            <span>{locationNotice}</span>
          </div>
          <button
            onClick={() => setLocationNotice(null)}
            className="text-xs text-[#5D665E] hover:text-[#182019]"
          >
            ✕
          </button>
        </div>
      )}

      {/* Filtre Barı */}
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        totalCount={stations.length}
        filteredCount={filteredStations.length}
        onTriggerNearest={handleTriggerNearest}
        isNearestActive={isNearestActive}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {/* Harita veya Yedek Liste Görünümü */}
      <div className="flex-1 relative min-h-[500px]">
        {viewMode === 'map' ? (
          <MapModule
            stations={filteredStations}
            selectedStation={selectedStation}
            onSelectStation={(st) => {
              setSelectedStation(st);
              setDrawerOpen(true);
              trackEvent('map_station_viewed', { stationId: st.stationId, stationName: st.name });
            }}
            userLocation={userLocation}
            onSwitchToFallback={() => setViewMode('list')}
          />
        ) : (
          <OfflineFallbackView
            stations={filteredStations}
            onSelectStation={(st) => {
              setSelectedStation(st);
              setDrawerOpen(true);
              trackEvent('map_station_viewed', { stationId: st.stationId, stationName: st.name });
            }}
            onOpenFeedback={(st) => {
              setFeedbackStation(st);
              setFeedbackModalOpen(true);
            }}
            onSwitchToMap={() => setViewMode('map')}
          />
        )}
      </div>

      {/* Mobilde "En Yakın Durak" İçin Sabit Alt Buton */}
      <div className="sm:hidden fixed bottom-4 left-4 right-4 z-[400] pointer-events-auto shadow-elevated">
        <button
          onClick={handleTriggerNearest}
          className={`w-full py-3 px-4 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 border transition ${
            isNearestActive
              ? 'bg-[#1F5A43] text-white border-[#174634]'
              : 'bg-white text-[#182019] border-[#DDE1DA] active:bg-[#F6F6F2]'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#F3B33D]" />
          <span>{isNearestActive ? 'Tüm Durakları Göster' : 'En Yakındaki Durağı Bul'}</span>
        </button>
      </div>

      {/* Detay Paneli */}
      <StationDrawer
        station={selectedStation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onOpenFeedback={(st) => {
          setDrawerOpen(false);
          setFeedbackStation(st);
          setFeedbackModalOpen(true);
        }}
      />

      {/* Geri Bildirim Modal */}
      <FeedbackModal
        station={feedbackStation}
        isOpen={feedbackModalOpen}
        onClose={() => setFeedbackModalOpen(false)}
      />

      {/* Konum Onay Modal */}
      <PrivacyConsentModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
        onConfirm={handleConsentApproved}
        onDeny={handleConsentDenied}
      />
    </div>
  );
};

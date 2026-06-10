import React, { useState, useEffect } from "react";
import { hospitals } from "../data/hospitalData";

function getDistanceKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function EmergencyMode({ onClose, onViewHospital }) {
  const [status, setStatus] = useState("asking"); // asking | locating | found | denied
  const [userLocation, setUserLocation] = useState(null);
  const [nearest, setNearest] = useState([]);

  useEffect(() => {
    requestLocation();
  }, []);

  const requestLocation = () => {
    setStatus("locating");
    if (!navigator.geolocation) {
      setStatus("denied");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude: lat, longitude: lng } = pos.coords;
        setUserLocation({ lat, lng });
        const sorted = [...hospitals]
          .map(h => ({ ...h, distance: getDistanceKm(lat, lng, h.lat, h.lng) }))
          .sort((a, b) => a.distance - b.distance)
          .slice(0, 5);
        setNearest(sorted);
        setStatus("found");
      },
      () => setStatus("denied")
    );
  };

  const openDirections = (h) => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${h.lat},${h.lng}`, "_blank");
  };
  const openNearbyOnMap = () => {
    if (userLocation) {
      window.open(`https://www.google.com/maps/search/hospital+emergency/@${userLocation.lat},${userLocation.lng},13z`, "_blank");
    } else {
      window.open(`https://www.google.com/maps/search/hospital+emergency+Tamil+Nadu`, "_blank");
    }
  };

  return (
    <div className="emergency-overlay" onClick={onClose}>
      <div className="emergency-modal" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="em-header">
          <div className="em-pulse-dot" />
          <h2>🚨 Emergency Mode</h2>
          <button className="em-close" onClick={onClose}>✕</button>
        </div>

        {/* Ambulance Banner */}
        <div className="em-ambulance-banner">
          <div className="em-amb-icon">🚑</div>
          <div>
            <div className="em-amb-title">National Ambulance</div>
            <a className="em-amb-number" href="tel:108">108</a>
          </div>
          <a className="em-call-btn" href="tel:108">Call Now</a>
        </div>

        {/* Status */}
        {status === "locating" && (
          <div className="em-status">
            <div className="em-spinner" />
            <p>Getting your location to find nearest hospitals...</p>
          </div>
        )}

        {status === "denied" && (
          <div className="em-status">
            <p className="em-denied">📍 Location access denied.</p>
            <p>Please allow location access in your browser, or use the map button below to search manually.</p>
            <button className="em-retry-btn" onClick={requestLocation}>Try Again</button>
            <button className="em-map-manual" onClick={openNearbyOnMap}>
              🗺️ Search Hospitals on Map Manually
            </button>
          </div>
        )}

        {status === "found" && (
          <>
            <div className="em-found-header">
              <span className="em-loc-tag">📍 Your location detected</span>
              <button className="em-map-all" onClick={openNearbyOnMap}>
                🗺️ All Hospitals Near Me on Map
              </button>
            </div>

            <div className="em-nearest-label">Nearest Hospitals (sorted by distance)</div>

            <div className="em-hospital-list">
              {nearest.map((h, i) => (
                <div key={h.id} className={`em-hosp-card ${i === 0 ? "em-closest" : ""}`}>
                  {i === 0 && <div className="em-closest-tag">📍 Closest</div>}
                  <div className="em-hosp-top">
                    <span className="em-hosp-icon">{h.image}</span>
                    <div className="em-hosp-info">
                      <h4>{h.name}</h4>
                      <p>{h.area}, {h.district}</p>
                      <p className="em-addr">{h.address}</p>
                    </div>
                    <div className="em-dist-badge">
                      {h.distance < 1
                        ? `${Math.round(h.distance * 1000)} m`
                        : `${h.distance.toFixed(1)} km`}
                    </div>
                  </div>
                  <div className="em-hosp-actions">
                    <a className="em-btn em-btn-call" href={`tel:${h.emergency}`}>
                      🚨 {h.emergency}
                    </a>
                    <button className="em-btn em-btn-dir" onClick={() => openDirections(h)}>
                      🗺️ Directions
                    </button>
                    <button className="em-btn em-btn-details" onClick={() => onViewHospital(h)}>
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="em-footer">
          <p>🏥 Fire: <a href="tel:101">101</a> &nbsp;|&nbsp; Police: <a href="tel:100">100</a> &nbsp;|&nbsp; Ambulance: <a href="tel:108">108</a> &nbsp;|&nbsp; Women Helpline: <a href="tel:1091">1091</a></p>
        </div>
      </div>
    </div>
  );
}

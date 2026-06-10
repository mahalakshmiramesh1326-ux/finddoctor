import React from "react";

export default function MapModal({ hospital, onClose }) {
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${hospital.lat},${hospital.lng}`;
  const nearbyUrl = `https://www.google.com/maps/search/hospital/@${hospital.lat},${hospital.lng},14z`;

  return (
    <div className="map-modal-overlay" onClick={onClose}>
      <div className="map-modal-box" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="map-modal-header">
          <div className="map-modal-title">
            <span>{hospital.image}</span>
            <div>
              <h3>{hospital.name}</h3>
              <p>📍 {hospital.address}</p>
            </div>
          </div>
          <button className="map-modal-close" onClick={onClose}>✕ Close</button>
        </div>

        {/* Map Embed */}
        <div className="map-modal-embed">
          <iframe
            title="Hospital Map"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src={`https://maps.google.com/maps?q=${hospital.lat},${hospital.lng}&z=16&output=embed`}
          />
        </div>

        {/* Bottom Action Buttons */}
        <div className="map-modal-actions">
          <a
            className="map-modal-btn map-modal-btn-dir"
            href={directionsUrl}
            target="_blank"
            rel="noreferrer"
          >
            🗺️ Get Directions
            <span>Opens Google Maps navigation</span>
          </a>
          <a
            className="map-modal-btn map-modal-btn-nearby"
            href={nearbyUrl}
            target="_blank"
            rel="noreferrer"
          >
            🏥 Nearby Hospitals
            <span>Find hospitals around this area</span>
          </a>
          <a
            className="map-modal-btn map-modal-btn-call"
            href={`tel:${hospital.emergency}`}
          >
            🚨 Emergency Call
            <span>{hospital.emergency}</span>
          </a>
        </div>

      </div>
    </div>
  );
}

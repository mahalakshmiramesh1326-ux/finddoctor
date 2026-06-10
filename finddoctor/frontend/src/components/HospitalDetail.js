import React, { useState } from "react";
import MapModal from "./MapModal";

export default function HospitalDetail({ hospital, onBack, onBook }) {
  const [tab, setTab] = useState("overview");
  const [selectedSlots, setSelectedSlots] = useState({});
  const [showMap, setShowMap] = useState(false);

  return (
    <div className="detail-page">
      <button className="back-link" onClick={onBack}>← Back to Results</button>

      {/* ── BANNER ── */}
      <div className="detail-banner">
        <div className="banner-left">
          <div className="banner-emoji">{hospital.image}</div>
          <div>
            <h1 className="banner-name">{hospital.name}</h1>
            <p className="banner-address">📍 {hospital.address}</p>
            <div className="banner-chips">
              <span className="bchip">⭐ {hospital.rating} Rating</span>
              <span className="bchip">🛏 {hospital.beds} Beds</span>
              <span className="bchip">📅 Est. {hospital.established}</span>
              <span className="bchip">🏘️ {hospital.area}, {hospital.district}</span>
            </div>
          </div>
        </div>
        <div className="banner-right">
          <a className="banner-call" href={`tel:${hospital.phone}`}>📞 {hospital.phone}</a>
          <a className="banner-emergency" href={`tel:${hospital.emergency}`}>🚨 Emergency: {hospital.emergency}</a>
          <div className="banner-map-btns">
            <button onClick={() => setShowMap(true)} className="bmap-btn">🗺️ View Map</button>
            <button onClick={() => setShowMap(true)} className="bmap-btn bmap-nearby">🏥 Nearby Hospitals</button>
          </div>
        </div>
      </div>

      {/* ── TABS ── */}
      <div className="detail-tabs">
        {[
          { key: "overview", label: "📋 Overview" },
          { key: "doctors", label: `🩺 Doctors (${hospital.doctors.length})` },
          { key: "facilities", label: "🏥 Facilities" },
          { key: "map", label: "🗺️ Map" },
        ].map(t => (
          <button
            key={t.key}
            className={`dtab ${tab === t.key ? "dtab-active" : ""}`}
            onClick={() => { setTab(t.key); if (t.key === "map") setShowMap(true); }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="detail-body">

        {/* ── OVERVIEW ── */}
        {tab === "overview" && (
          <div className="tab-overview">
            <div className="overview-about">
              <h3>About</h3>
              <p>{hospital.about}</p>
            </div>
            <div className="overview-stats">
              <div className="ostat"><span className="ostat-n">⭐ {hospital.rating}</span><span>Rating</span></div>
              <div className="ostat"><span className="ostat-n">🛏 {hospital.beds}</span><span>Beds</span></div>
              <div className="ostat"><span className="ostat-n">👨‍⚕️ {hospital.doctors.length}</span><span>Doctors</span></div>
              <div className="ostat"><span className="ostat-n">📅 {hospital.established}</span><span>Est.</span></div>
            </div>
            <div className="overview-contact">
              <h3>Contact</h3>
              <div className="contact-rows">
                <div className="contact-row"><span>📞 General</span><a href={`tel:${hospital.phone}`}>{hospital.phone}</a></div>
                <div className="contact-row"><span>🚨 Emergency</span><a href={`tel:${hospital.emergency}`}>{hospital.emergency}</a></div>
                <div className="contact-row"><span>📍 Address</span><span>{hospital.address}</span></div>
              </div>
            </div>
            {/* Open Map Button inside Overview */}
            <button className="open-map-btn" onClick={() => setShowMap(true)}>
              🗺️ View Hospital Location on Map
            </button>
            <div className="overview-quick-doctors">
              <h3>Available Doctors Right Now</h3>
              {hospital.doctors.filter(d => d.availableNow).length === 0
                ? <p className="muted">No doctors available right now. Book an appointment for a slot.</p>
                : hospital.doctors.filter(d => d.availableNow).map(doc => (
                  <div key={doc.id} className="quick-doc-row">
                    <span>{doc.image}</span>
                    <span className="qd-name">{doc.name}</span>
                    <span className="qd-spec">{doc.type}</span>
                    <span className="qd-avail">🟢 Available Now</span>
                    <button className="btn-book-sm" onClick={() => onBook(hospital, doc, doc.slots[0])}>Book</button>
                  </div>
                ))
              }
            </div>
          </div>
        )}

        {/* ── DOCTORS ── */}
        {tab === "doctors" && (
          <div className="tab-doctors">
            {hospital.doctors.map(doc => (
              <div key={doc.id} className="doctor-detail-card">
                <div className="ddc-top">
                  <span className="ddc-avatar">{doc.image}</span>
                  <div className="ddc-info">
                    <h4>{doc.name}</h4>
                    <p className="ddc-spec">{doc.type}</p>
                    <p className="ddc-exp">{doc.experience} years experience</p>
                  </div>
                  <span className={`ddc-avail ${doc.availableNow ? "now" : "later"}`}>
                    {doc.availableNow ? "🟢 Available Now" : "🕐 By Appointment"}
                  </span>
                  <div className="ddc-fee">
                    <span>Consultation</span>
                    <strong>{doc.fee === 0 ? "Free" : `₹${doc.fee}`}</strong>
                  </div>
                </div>
                <div className="ddc-slots">
                  <p className="slots-label">Select Time Slot:</p>
                  <div className="slot-wrap">
                    {doc.slots.map(slot => (
                      <button
                        key={slot}
                        className={`slot-chip ${selectedSlots[doc.id] === slot ? "slot-selected" : ""}`}
                        onClick={() => setSelectedSlots(p => ({ ...p, [doc.id]: slot }))}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                  <button className="btn-book" onClick={() => onBook(hospital, doc, selectedSlots[doc.id] || doc.slots[0])}>
                    📅 Book with {doc.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── FACILITIES ── */}
        {tab === "facilities" && (
          <div className="tab-facilities">
            <h3>Hospital Facilities</h3>
            <div className="facilities-grid">
              {hospital.facilities.map(f => (
                <div key={f} className="facility-item">✅ {f}</div>
              ))}
            </div>
          </div>
        )}

        {/* ── MAP TAB — shows map inline ── */}
        {tab === "map" && (
          <div className="tab-map-inline">
            <div className="map-inline-header">
              <div>
                <h3>{hospital.name}</h3>
                <p>📍 {hospital.address}</p>
              </div>
              <div className="map-inline-btns">
                <a
                  className="map-inline-action dir"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${hospital.lat},${hospital.lng}`}
                  target="_blank" rel="noreferrer"
                >
                  🗺️ Get Directions
                </a>
                <a
                  className="map-inline-action nearby"
                  href={`https://www.google.com/maps/search/hospital/@${hospital.lat},${hospital.lng},14z`}
                  target="_blank" rel="noreferrer"
                >
                  🏥 Nearby
                </a>
              </div>
            </div>
            <div className="map-inline-embed">
              <iframe
                title="Hospital Location"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: "12px" }}
                loading="lazy"
                allowFullScreen
                src={`https://maps.google.com/maps?q=${hospital.lat},${hospital.lng}&z=16&output=embed`}
              />
            </div>
            <p className="map-coords">GPS: {hospital.lat}, {hospital.lng}</p>
          </div>
        )}
      </div>

      {/* ── MAP MODAL POPUP ── */}
      {showMap && (
        <MapModal hospital={hospital} onClose={() => setShowMap(false)} />
      )}
    </div>
  );
}

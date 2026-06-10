import React, { useState } from "react";
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

export default function SearchResults({ filters, onViewHospital, onBook }) {
  const [selectedSlots, setSelectedSlots] = useState({});
  const [sortBy, setSortBy] = useState("relevance");
  const [userLocation, setUserLocation] = useState(null);
  const [locating, setLocating] = useState(false);

  const { district, area, doctorType } = filters;

  // Filter hospitals
  let filtered = hospitals.filter(h => {
    const districtMatch = h.district === district;
    const areaMatch = !area || h.area === area;
    const hasDoctor = !doctorType || h.doctors.some(d => d.type === doctorType);
    return districtMatch && areaMatch && hasDoctor;
  });

  // Sort
  if (sortBy === "rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  if (sortBy === "available") {
    filtered = [...filtered].sort((b, a) => {
      const aAvail = a.doctors.filter(d => (!doctorType || d.type === doctorType) && d.availableNow).length;
      const bAvail = b.doctors.filter(d => (!doctorType || d.type === doctorType) && d.availableNow).length;
      return aAvail - bAvail;
    });
  }
  if (sortBy === "distance" && userLocation) {
    filtered = [...filtered].sort((a, b) =>
      getDistanceKm(userLocation.lat, userLocation.lng, a.lat, a.lng) -
      getDistanceKm(userLocation.lat, userLocation.lng, b.lat, b.lng)
    );
  }

  const getMatchedDoctors = (hospital) =>
    doctorType ? hospital.doctors.filter(d => d.type === doctorType) : hospital.doctors;

  const handleGetLocation = () => {
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      pos => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setSortBy("distance");
        setLocating(false);
      },
      () => {
        alert("Could not get your location. Please allow location access.");
        setLocating(false);
      }
    );
  };

  const openDirections = (hospital) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${hospital.lat},${hospital.lng}`;
    window.open(url, "_blank");
  };

  const openOnMap = (hospital) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hospital.name + " " + hospital.address)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="results-page">

      {/* ── HEADER ── */}
      <div className="results-header">
        <div>
          <h2 className="results-title">
            {doctorType || "All Doctors"} in {area || district}
          </h2>
          <p className="results-sub">
            {filtered.length} hospital{filtered.length !== 1 ? "s" : ""} found
            {area ? ` in ${area}, ${district}` : ` in ${district}`}
          </p>
        </div>

        <div className="results-controls">
          <div className="sort-row">
            <span className="sort-label">Sort by:</span>
            {["relevance", "rating", "available", "distance"].map(s => (
              <button
                key={s}
                className={`sort-btn ${sortBy === s ? "active" : ""}`}
                onClick={() => {
                  if (s === "distance" && !userLocation) { handleGetLocation(); return; }
                  setSortBy(s);
                }}
              >
                {s === "relevance" && "Default"}
                {s === "rating" && "⭐ Rating"}
                {s === "available" && "🟢 Available"}
                {s === "distance" && (locating ? "📍 Locating..." : "📍 Nearest")}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── NO RESULTS ── */}
      {filtered.length === 0 && (
        <div className="no-results">
          <div className="no-results-icon">🔍</div>
          <h3>No hospitals found</h3>
          <p>No {doctorType} found in {area || district}.<br />Try removing the area filter or choosing a different specialization.</p>
        </div>
      )}

      {/* ── HOSPITAL CARDS ── */}
      <div className="hospital-list">
        {filtered.map(hospital => {
          const matchedDoctors = getMatchedDoctors(hospital);
          const availableNow = matchedDoctors.filter(d => d.availableNow).length;
          const dist = userLocation
            ? getDistanceKm(userLocation.lat, userLocation.lng, hospital.lat, hospital.lng).toFixed(1)
            : null;

          return (
            <div key={hospital.id} className="hosp-card">

              {/* Hospital Info Row */}
              <div className="hosp-top">
                <div className="hosp-icon-wrap">
                  <span className="hosp-emoji">{hospital.image}</span>
                  <span className={`hosp-avail-dot ${availableNow > 0 ? "green" : "red"}`} />
                </div>

                <div className="hosp-main">
                  <div className="hosp-name-row">
                    <h3 className="hosp-name">{hospital.name}</h3>
                    <span className="hosp-rating">⭐ {hospital.rating}</span>
                  </div>
                  <p className="hosp-address">📍 {hospital.address}</p>
                  <div className="hosp-tags">
                    <span className="htag">{hospital.area}</span>
                    <span className="htag">🛏 {hospital.beds} beds</span>
                    {dist && <span className="htag dist-tag">📍 {dist} km away</span>}
                    <span className={`htag ${availableNow > 0 ? "htag-green" : "htag-red"}`}>
                      {availableNow > 0 ? `🟢 ${availableNow} available now` : "🔴 By appointment only"}
                    </span>
                  </div>
                </div>

                <div className="hosp-actions">
                  <button className="btn-view" onClick={() => onViewHospital(hospital)}>View Details</button>
                  <button className="btn-map" onClick={() => openDirections(hospital)}>🗺️ Directions</button>
                  <button className="btn-map-search" onClick={() => openOnMap(hospital)}>📌 View on Map</button>
                  <a className="btn-call" href={`tel:${hospital.emergency}`}>🚨 {hospital.emergency}</a>
                </div>
              </div>

              {/* Matched Doctors */}
              {matchedDoctors.length > 0 && (
                <div className="hosp-doctors">
                  <div className="doctors-label">
                    🩺 {doctorType ? `${doctorType}s` : "Doctors"} ({matchedDoctors.length})
                  </div>
                  <div className="doctor-scroll">
                    {matchedDoctors.map(doc => (
                      <div key={doc.id} className="doc-pill">
                        <div className="doc-pill-top">
                          <span className="doc-avatar">{doc.image}</span>
                          <div>
                            <div className="doc-pill-name">{doc.name}</div>
                            <div className="doc-pill-spec">{doc.type} · {doc.experience} yrs</div>
                          </div>
                          <span className={`doc-avail-badge ${doc.availableNow ? "now" : "later"}`}>
                            {doc.availableNow ? "🟢 Now" : "🕐 Appt"}
                          </span>
                        </div>
                        <div className="doc-pill-fee">
                          {doc.fee === 0 ? "Free (Govt)" : `₹${doc.fee}`}
                        </div>
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
                        <button
                          className="btn-book"
                          onClick={() => onBook(hospital, doc, selectedSlots[doc.id] || doc.slots[0])}
                        >
                          Book Appointment
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

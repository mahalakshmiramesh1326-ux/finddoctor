import React, { useState } from "react";
import { hospitals } from "../data/hospitalData";

export default function HospitalSearch({ onViewHospital, onBook }) {
  const [query, setQuery] = useState("");
  const [selectedSlots, setSelectedSlots] = useState({});

  // Filter hospitals by name, district, area, or doctor name
  const results = query.trim().length < 2 ? [] : hospitals.filter(h => {
    const q = query.toLowerCase();
    return (
      h.name.toLowerCase().includes(q) ||
      h.district.toLowerCase().includes(q) ||
      h.area.toLowerCase().includes(q) ||
      h.doctors.some(d => d.name.toLowerCase().includes(q) || d.type.toLowerCase().includes(q))
    );
  });

  return (
    <div className="hsearch-page">
      <div className="hsearch-hero">
        <h2>🔎 Search Hospital Directly</h2>
        <p>Know the hospital name? Search and book appointment in one step!</p>
        <div className="hsearch-input-wrap">
          <span className="hsearch-icon">🔍</span>
          <input
            className="hsearch-input"
            type="text"
            placeholder="Type hospital name, doctor name, district or area..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
          />
          {query && (
            <button className="hsearch-clear" onClick={() => setQuery("")}>✕</button>
          )}
        </div>
        {query.length > 0 && query.length < 2 && (
          <p className="hsearch-hint">Type at least 2 letters to search...</p>
        )}
        {query.length >= 2 && (
          <p className="hsearch-hint">
            {results.length > 0
              ? `✅ ${results.length} hospital${results.length > 1 ? "s" : ""} found`
              : "❌ No hospitals found — try a different name"}
          </p>
        )}
      </div>

      {/* Quick suggestion chips */}
      {query.length === 0 && (
        <div className="hsearch-suggestions">
          <p className="suggest-label">🔥 Quick Search:</p>
          <div className="suggest-chips">
            {["Apollo", "Government", "Nagapattinam", "CMC", "PSG", "Kavery", "Chennai", "Coimbatore"].map(s => (
              <button key={s} className="suggest-chip" onClick={() => setQuery(s)}>
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      <div className="hsearch-results">
        {results.map(hospital => {
          const availableNow = hospital.doctors.filter(d => d.availableNow).length;
          return (
            <div key={hospital.id} className="hsearch-card">

              {/* Hospital Header */}
              <div className="hsearch-card-top">
                <div className="hsearch-card-left">
                  <span className="hsearch-emoji">{hospital.image}</span>
                  <div>
                    <h3>{hospital.name}</h3>
                    <p className="hsearch-loc">📍 {hospital.area}, {hospital.district}</p>
                    <p className="hsearch-addr">{hospital.address}</p>
                    <div className="hsearch-tags">
                      <span className="hstag">⭐ {hospital.rating}</span>
                      <span className="hstag">🛏 {hospital.beds} beds</span>
                      <span className={`hstag ${availableNow > 0 ? "hstag-green" : "hstag-red"}`}>
                        {availableNow > 0 ? `🟢 ${availableNow} available now` : "🔴 By appointment"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="hsearch-card-actions">
                  <button className="btn-view" onClick={() => onViewHospital(hospital)}>
                    View Details
                  </button>
                  <a className="btn-call" href={`tel:${hospital.emergency}`}>
                    🚨 Emergency
                  </a>
                </div>
              </div>

              {/* All Doctors — Quick Book */}
              <div className="hsearch-doctors">
                <p className="hsearch-doc-label">👨‍⚕️ Doctors ({hospital.doctors.length})</p>
                <div className="hsearch-doc-grid">
                  {hospital.doctors.map(doc => (
                    <div key={doc.id} className="hsearch-doc-card">
                      <div className="hsearch-doc-top">
                        <span className="hdoc-avatar">{doc.image}</span>
                        <div className="hdoc-info">
                          <p className="hdoc-name">{doc.name}</p>
                          <p className="hdoc-spec">{doc.type} · {doc.experience} yrs</p>
                          <p className="hdoc-fee">{doc.fee === 0 ? "Free" : `₹${doc.fee}`}</p>
                        </div>
                        <span className={`hdoc-badge ${doc.availableNow ? "now" : "later"}`}>
                          {doc.availableNow ? "🟢 Now" : "🕐 Appt"}
                        </span>
                      </div>

                      {/* Slots */}
                      <div className="slot-wrap" style={{ marginTop: 8 }}>
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

                      {/* Book Button */}
                      <button
                        className="btn-book"
                        style={{ marginTop: 10 }}
                        onClick={() => onBook(hospital, doc, selectedSlots[doc.id] || doc.slots[0])}
                      >
                        📅 Book Appointment
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

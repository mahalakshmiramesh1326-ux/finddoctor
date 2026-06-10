import React, { useState } from "react";
import { districts, districtAreas, doctorTypes } from "../data/hospitalData";

export default function Home({ onSearch, onEmergency }) {
  const [district, setDistrict] = useState("");
  const [area, setArea] = useState("");
  const [doctorType, setDoctorType] = useState("");
  const [error, setError] = useState("");

  const areas = district ? (districtAreas[district] || []) : [];

  const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
    setArea("");
  };

  const handleSearch = () => {
    if (!district || !doctorType) {
      setError("Please select at least a District and Doctor Type.");
      return;
    }
    setError("");
    onSearch(district, area, doctorType);
  };

  return (
    <div className="home-page">

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg-circles">
          <div className="hbc hbc1" />
          <div className="hbc hbc2" />
          <div className="hbc hbc3" />
        </div>

        <div className="hero-content">
          <div className="hero-badge">🇮🇳 Tamil Nadu Healthcare Network</div>
          <h1>Find the Right Doctor<br /><em>Right Now</em></h1>
          <p className="hero-sub">
            Search hospitals across all 38 districts, check real-time doctor availability, filter by your exact area and book appointments instantly.
          </p>

          {/* ── SEARCH CARD ── */}
          <div className="search-card">
            <div className="search-card-title">🔍 Search Hospitals & Doctors</div>

            <div className="search-row">
              {/* District */}
              <div className="sfield">
                <label>📍 District <span className="req">*</span></label>
                <select value={district} onChange={handleDistrictChange}>
                  <option value="">Select District</option>
                  {districts.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              {/* Area */}
              <div className="sfield">
                <label>🏘️ Area / Town <span className="opt">(optional)</span></label>
                <select value={area} onChange={e => setArea(e.target.value)} disabled={!district}>
                  <option value="">All Areas in District</option>
                  {areas.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>

              {/* Doctor Type */}
              <div className="sfield">
                <label>🩺 Specialization <span className="req">*</span></label>
                <select value={doctorType} onChange={e => setDoctorType(e.target.value)}>
                  <option value="">Select Specialization</option>
                  {doctorTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            {error && <p className="search-error">⚠️ {error}</p>}

            <div className="search-actions">
              <button className="btn-search" onClick={handleSearch}>
                Search Hospitals →
              </button>
              <button className="btn-emergency-search" onClick={onEmergency}>
                🚨 Emergency — Find Nearest Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="how-section">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-row">
          <div className="step-card">
            <div className="step-num">1</div>
            <div className="step-icon">📍</div>
            <h4>Choose Your Area</h4>
            <p>Select your district and specific town or area within it</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step-card">
            <div className="step-num">2</div>
            <div className="step-icon">🩺</div>
            <h4>Pick Specialization</h4>
            <p>Choose the type of doctor you need from 15 specializations</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step-card">
            <div className="step-num">3</div>
            <div className="step-icon">🟢</div>
            <h4>See Availability</h4>
            <p>View which doctors are available now or pick a time slot</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step-card">
            <div className="step-num">4</div>
            <div className="step-icon">✅</div>
            <h4>Book & Confirm</h4>
            <p>Book your appointment in seconds and get a confirmation ID</p>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="features-section">
        <div className="feat-grid">
          <div className="feat-card feat-emergency">
            <div className="feat-icon">🚨</div>
            <h4>Emergency Mode</h4>
            <p>Uses your GPS to instantly find the 3 nearest hospitals with one-tap calling and Google Maps directions</p>
            <button className="feat-action-btn" onClick={onEmergency}>Open Emergency Mode</button>
          </div>
          <div className="feat-card">
            <div className="feat-icon">🗺️</div>
            <h4>Map Directions</h4>
            <p>Every hospital has a "Get Directions" button that opens Google Maps with turn-by-turn navigation</p>
          </div>
          <div className="feat-card">
            <div className="feat-icon">🏘️</div>
            <h4>Area-Level Search</h4>
            <p>Filter not just by district but by specific town or taluk — perfect for finding the closest hospital</p>
          </div>
          <div className="feat-card">
            <div className="feat-icon">📋</div>
            <h4>Full Hospital Info</h4>
            <p>See all facilities, all doctors, fees, contact numbers, and complete address for every hospital</p>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="stats-section">
        <div className="stat-item"><span className="stat-num">38</span><span className="stat-lbl">Districts</span></div>
        <div className="stat-div" />
        <div className="stat-item"><span className="stat-num">200+</span><span className="stat-lbl">Areas / Towns</span></div>
        <div className="stat-div" />
        <div className="stat-item"><span className="stat-num">20+</span><span className="stat-lbl">Hospitals</span></div>
        <div className="stat-div" />
        <div className="stat-item"><span className="stat-num">15</span><span className="stat-lbl">Specializations</span></div>
        <div className="stat-div" />
        <div className="stat-item"><span className="stat-num">24/7</span><span className="stat-lbl">Emergency</span></div>
      </section>

      <footer className="footer">
        <p>MediFind TN — Connecting Tamil Nadu to Healthcare &nbsp;|&nbsp; Emergency Ambulance: <strong>108</strong></p>
      </footer>
    </div>
  );
}

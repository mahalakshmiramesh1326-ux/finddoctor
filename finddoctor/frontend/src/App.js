import React, { useState, useEffect } from "react";
import Home from "./components/Home";
import SearchResults from "./components/SearchResults";
import HospitalDetail from "./components/HospitalDetail";
import HospitalSearch from "./components/HospitalSearch";
import BookingModal from "./components/BookingModal";
import BookingConfirmation from "./components/BookingConfirmation";
import EmergencyMode from "./components/EmergencyMode";
import "./App.css";

// ── BACKEND URL ──
// When Python backend is running, app uses real database
// When backend is OFF, app uses local JS data as backup
const API = "http://localhost:8000/api";

export default function App() {
  const [page, setPage] = useState("home");
  const [filters, setFilters] = useState({ district: "", area: "", doctorType: "" });
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [backendOnline, setBackendOnline] = useState(false);

  // ── Check if backend is running ──
  useEffect(() => {
    fetch(`${API}/hospitals/`)
      .then(r => { if (r.ok) setBackendOnline(true); })
      .catch(() => setBackendOnline(false));
  }, []);

  const handleSearch = (district, area, doctorType) => {
    setFilters({ district, area, doctorType });
    setPage("results");
  };

  const handleViewHospital = (hospital) => {
    setSelectedHospital(hospital);
    setPage("detail");
  };

  const handleBook = (hospital, doctor, slot) => {
    setBookingData({ hospital, doctor, slot });
    setShowBooking(true);
  };

  // ── Save booking to Python backend OR show local confirmation ──
  const handleConfirmBooking = async (patientInfo) => {
    if (backendOnline) {
      try {
        const res = await fetch(`${API}/bookings/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            hospital_id:   bookingData.hospital.id,
            hospital_name: bookingData.hospital.name,
            doctor_id:     bookingData.doctor.id,
            doctor_name:   bookingData.doctor.name,
            doctor_type:   bookingData.doctor.type,
            slot:          bookingData.slot,
            fee:           bookingData.doctor.fee,
            patient_name:  patientInfo.name,
            patient_phone: patientInfo.phone,
            patient_age:   parseInt(patientInfo.age),
            patient_gender:patientInfo.gender,
            reason:        patientInfo.reason,
          }),
        });
        const result = await res.json();
        setConfirmedBooking({
          ...bookingData,
          patient: patientInfo,
          bookingRef: result.booking_ref,
          savedToServer: true,
        });
      } catch {
        setConfirmedBooking({ ...bookingData, patient: patientInfo, savedToServer: false });
      }
    } else {
      setConfirmedBooking({ ...bookingData, patient: patientInfo, savedToServer: false });
    }
    setShowBooking(false);
    setBookingData(null);
  };

  const goHome = () => {
    setPage("home");
    setEmergencyMode(false);
    setSelectedHospital(null);
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-brand" onClick={goHome}>
          <span className="brand-cross">✚</span>
          <span className="brand-name">MediFind<span className="brand-tn"> TN</span></span>
        </div>

        <div className="nav-tabs">
          <button className={`nav-tab ${page === "home" ? "nav-tab-active" : ""}`} onClick={goHome}>
            🏠 Home
          </button>
          <button className={`nav-tab ${page === "hsearch" ? "nav-tab-active" : ""}`} onClick={() => setPage("hsearch")}>
            🔎 Search Hospital
          </button>
          {page === "results" && <button className="nav-tab nav-tab-active">📋 Results</button>}
          {page === "detail" && <button className="nav-tab nav-tab-active">🏥 Details</button>}
        </div>

        <div className="nav-right">
          {/* Backend status indicator */}
          <span className={`backend-status ${backendOnline ? "online" : "offline"}`}>
            {backendOnline ? "🟢 Live DB" : "🟡 Local Mode"}
          </span>
          {(page === "results" || page === "detail") && (
            <button className="nav-home-btn" onClick={goHome}>← Home</button>
          )}
          <button className="nav-emergency-btn" onClick={() => setEmergencyMode(true)}>
            🚨 EMERGENCY
          </button>
        </div>
      </nav>

      <main>
        {page === "home"    && <Home onSearch={handleSearch} onEmergency={() => setEmergencyMode(true)} />}
        {page === "hsearch" && <HospitalSearch onViewHospital={handleViewHospital} onBook={handleBook} />}
        {page === "results" && <SearchResults filters={filters} onViewHospital={handleViewHospital} onBook={handleBook} />}
        {page === "detail"  && selectedHospital && (
          <HospitalDetail hospital={selectedHospital} onBack={() => setPage("results")} onBook={handleBook} />
        )}
      </main>

      {emergencyMode && (
        <EmergencyMode onClose={() => setEmergencyMode(false)}
          onViewHospital={(h) => { setSelectedHospital(h); setPage("detail"); setEmergencyMode(false); }} />
      )}

      {showBooking && bookingData && (
        <BookingModal data={bookingData} onConfirm={handleConfirmBooking} onClose={() => setShowBooking(false)} />
      )}

      {confirmedBooking && (
        <BookingConfirmation booking={confirmedBooking} onClose={() => { setConfirmedBooking(null); goHome(); }} />
      )}
    </div>
  );
}

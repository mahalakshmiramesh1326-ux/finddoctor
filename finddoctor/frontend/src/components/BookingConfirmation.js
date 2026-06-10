import React from "react";

export default function BookingConfirmation({ booking, onClose }) {
  const id = "MF" + Math.floor(100000 + Math.random() * 900000);
  const { hospital, doctor, slot, patient } = booking;

  return (
    <div className="modal-overlay">
      <div className="confirm-box">
        <div className="confirm-anim">✅</div>
        <h2>Appointment Confirmed!</h2>
        <p className="confirm-sub">Your appointment has been booked successfully.</p>

        <div className="confirm-card">
          <div className="confirm-id">Booking ID: <strong>{id}</strong></div>
          <div className="confirm-rows">
            <div className="cr"><span>Patient</span><strong>{patient.name}</strong></div>
            <div className="cr"><span>Age / Gender</span><strong>{patient.age} / {patient.gender}</strong></div>
            <div className="cr"><span>Phone</span><strong>{patient.phone}</strong></div>
            <div className="cr"><span>Hospital</span><strong>{hospital.name}</strong></div>
            <div className="cr"><span>Area</span><strong>{hospital.area}, {hospital.district}</strong></div>
            <div className="cr"><span>Doctor</span><strong>{doctor.name}</strong></div>
            <div className="cr"><span>Specialization</span><strong>{doctor.type}</strong></div>
            <div className="cr"><span>Appointment Time</span><strong>{slot}</strong></div>
            <div className="cr"><span>Fee</span><strong>{doctor.fee === 0 ? "Free (Govt)" : `₹${doctor.fee}`}</strong></div>
          </div>
        </div>

        <div className="confirm-tips">
          <p>📌 Arrive 15 minutes before your appointment</p>
          <p>📋 Bring previous medical records or prescriptions</p>
          <p>📞 For cancellation call: {hospital.phone}</p>
          <p>📍 {hospital.address}</p>
        </div>

        <button className="btn-done" onClick={onClose}>Done — Back to Home</button>
      </div>
    </div>
  );
}

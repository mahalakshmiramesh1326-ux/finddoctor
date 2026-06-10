import React, { useState } from "react";

// ✅ FIXED: FormField is defined OUTSIDE the main component
// This stops the input from losing focus after every letter
function FormField({ label, err, children }) {
  return (
    <div className="form-field">
      <label>{label}</label>
      {children}
      {err && <span className="field-err">{err}</span>}
    </div>
  );
}

export default function BookingModal({ data, onConfirm, onClose }) {
  const { hospital, doctor, slot } = data;
  const [form, setForm] = useState({ name: "", phone: "", age: "", gender: "", reason: "" });
  const [errors, setErrors] = useState({});

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.match(/^\d{10}$/)) e.phone = "Enter valid 10-digit number";
    if (!form.age || isNaN(form.age) || form.age < 1 || form.age > 120) e.age = "Enter valid age";
    if (!form.gender) e.gender = "Select gender";
    if (!form.reason.trim()) e.reason = "Please describe your reason for visit";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    onConfirm(form);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>📅 Book Appointment</h2>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>

        {/* Summary */}
        <div className="booking-summary">
          <div className="bs-row"><span>🏥 Hospital</span><strong>{hospital.name}</strong></div>
          <div className="bs-row"><span>👨‍⚕️ Doctor</span><strong>{doctor.name}</strong></div>
          <div className="bs-row"><span>🩺 Type</span><strong>{doctor.type}</strong></div>
          <div className="bs-row"><span>🕐 Slot</span><strong>{slot}</strong></div>
          <div className="bs-row"><span>💰 Fee</span><strong>{doctor.fee === 0 ? "Free (Government)" : `₹${doctor.fee}`}</strong></div>
        </div>

        {/* Form */}
        <div className="booking-form">
          <h4>Patient Details</h4>

          <FormField label="Full Name *" err={errors.name}>
            <input
              type="text"
              placeholder="Your full name"
              value={form.name}
              onChange={e => update("name", e.target.value)}
            />
          </FormField>

          <div className="form-two-col">
            <FormField label="Phone Number *" err={errors.phone}>
              <input
                type="tel"
                placeholder="10-digit number"
                value={form.phone}
                onChange={e => update("phone", e.target.value)}
              />
            </FormField>
            <FormField label="Age *" err={errors.age}>
              <input
                type="number"
                placeholder="Age"
                value={form.age}
                onChange={e => update("age", e.target.value)}
              />
            </FormField>
          </div>

          <FormField label="Gender *" err={errors.gender}>
            <select value={form.gender} onChange={e => update("gender", e.target.value)}>
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </FormField>

          <FormField label="Reason for Visit *" err={errors.reason}>
            <textarea
              rows={3}
              placeholder="Describe symptoms or reason..."
              value={form.reason}
              onChange={e => update("reason", e.target.value)}
            />
          </FormField>
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-confirm" onClick={handleSubmit}>Confirm Booking ✓</button>
        </div>
      </div>
    </div>
  );
}

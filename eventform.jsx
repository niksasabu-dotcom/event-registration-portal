import { useState } from 'react';
import axios from 'axios';

function EventForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    participant_name: '',
    email: '',
    event_name: 'Tech Workshop 2026',
    ticket_type: 'Standard'
  });
  
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setErrorMsg('');

    try {
      const res = await axios.post('http://localhost:5000/api/registrations', formData);
      setMessage(res.data.message);
      setFormData({
        participant_name: '',
        email: '',
        event_name: 'Tech Workshop 2026',
        ticket_type: 'Standard'
      });
      onSuccess();
    } catch (error) {
      setErrorMsg('Error submitting registration. Please try again.');
    }
  };

  return (
    <div className="box">
      <div className="box-header">
        <h2>Reserve Your Pass</h2>
      </div>

      {message && <div className="status-msg">{message}</div>}
      {errorMsg && <div className="error-msg">{errorMsg}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="participant_name"
            value={formData.participant_name}
            onChange={handleChange}
            placeholder="e.g. Alex Morgan"
            required
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. alex@example.com"
            required
          />
        </div>

        <div className="form-group">
          <label>Select Event</label>
          <select name="event_name" value={formData.event_name} onChange={handleChange}>
            <option value="Tech Workshop 2026">Tech Workshop 2026 — Hands-on</option>
            <option value="Hackathon Sprint">Hackathon Sprint — 24-Hr Coding</option>
            <option value="Cloud & DevOps Summit">Cloud & DevOps Summit — Keynote</option>
          </select>
        </div>

        <div className="form-group">
          <label>Pass Type</label>
          <select name="ticket_type" value={formData.ticket_type} onChange={handleChange}>
            <option value="Standard">Standard Pass</option>
            <option value="VIP">VIP Pass (Includes Lounge Access)</option>
            <option value="Student Pass">Student Pass (ID Required)</option>
          </select>
        </div>

        {/* Conditional Note rendered based on user ticket selection */}
        {formData.ticket_type === 'VIP' && (
          <div className="conditional-note vip-note">
            ⭐ <strong>VIP Perk:</strong> Priority front-row seating and complimentary networking lunch included!
          </div>
        )}

        {formData.ticket_type === 'Student Pass' && (
          <div className="conditional-note student-note">
            🎓 <strong>Student Note:</strong> Please bring your valid university student ID card to the check-in desk.
          </div>
        )}

        <button type="submit">Confirm Registration</button>
      </form>
    </div>
  );
}

export default EventForm;
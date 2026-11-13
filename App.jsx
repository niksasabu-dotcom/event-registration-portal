import { useState, useEffect } from 'react';
import axios from 'axios';
import EventForm from './components/eventform';
import AttendeeList from './components/AttendeeList';
import './App.css';

const FEATURED_EVENTS = [
  {
    title: 'Tech Workshop 2026',
    date: 'Nov 24, 2026 • Main Auditorium',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80',
    tag: 'Hands-on'
  },
  {
    title: 'Hackathon Sprint',
    date: 'Dec 05, 2026 • Innovation Lab',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80',
    tag: '24-Hr Coding'
  },
  {
    title: 'Cloud & DevOps Summit',
    date: 'Dec 18, 2026 • Tech Hall B',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=600&q=80',
    tag: 'Keynote'
  }
];

function App() {
  const [attendees, setAttendees] = useState([]);

  const fetchAttendees = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/registrations');
      setAttendees(res.data);
    } catch (error) {
      console.error('Fetch failed:', error);
    }
  };

  useEffect(() => {
    fetchAttendees();
  }, []);

  return (
    <div className="page-wrapper">
      {/* Top Hero Banner with Image */}
      <header className="hero-banner">
        <div className="hero-overlay">
          <span className="hero-badge">LIVE EVENT PORTAL</span>
          <h1>EventHub — Conference & Workshop Manager</h1>
          <p>Book your seat, manage passes, and track live registrations in real time.</p>
        </div>
      </header>

      <main className="app-container">
        {/* Visual Event Cards Section */}
        <section className="events-showcase">
          {FEATURED_EVENTS.map((ev) => (
            <div className="event-card" key={ev.title}>
              <div className="event-img-wrapper">
                <img src={ev.image} alt={ev.title} />
                <span className="event-tag">{ev.tag}</span>
              </div>
              <div className="event-info">
                <h3>{ev.title}</h3>
                <p>{ev.date}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Form & Live Attendee Table */}
        <div className="layout">
          <EventForm onSuccess={fetchAttendees} />
          <AttendeeList attendees={attendees} onDelete={fetchAttendees} />
        </div>
      </main>
    </div>
  );
}

export default App;
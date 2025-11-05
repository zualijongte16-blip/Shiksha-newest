import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Schedule.css';

const Schedule = () => {
  const navigate = useNavigate();
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [filterSubject, setFilterSubject] = useState('All');
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Physics Live Class",
      type: "live-class",
      subject: "Physics",
      date: "2023-10-16",
      time: "10:00 AM",
      teacher: "Mr. Sharma",
      platform: "Google Meet",
      link: "https://meet.google.com/abc-defg-hij",
    },
    {
      id: 2,
      title: "Mathematics Assignment Due",
      type: "assignment",
      subject: "Mathematics",
      date: "2023-10-17",
      time: "11:59 PM",
      description: "Submit algebra homework",
    },
    {
      id: 3,
      title: "Science Test",
      type: "test",
      subject: "Science",
      date: "2023-10-18",
      time: "9:00 AM",
      description: "Chapter 5-7 test",
    },
    {
      id: 4,
      title: "English Live Class",
      type: "live-class",
      subject: "English",
      date: "2023-10-19",
      time: "2:00 PM",
      teacher: "Mrs. Gupta",
      platform: "Zoom",
      link: "https://zoom.us/j/123456789",
    },
    {
      id: 5,
      title: "History Assignment Due",
      type: "assignment",
      subject: "Social Studies",
      date: "2023-10-20",
      time: "11:59 PM",
      description: "Submit essay on World War II",
    },
    {
      id: 6,
      title: "Mathematics Test",
      type: "test",
      subject: "Mathematics",
      date: "2023-10-21",
      time: "10:00 AM",
      description: "Geometry test",
    },
  ]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("auth")) || "";
    const userType = localStorage.getItem('userType');
    if (token === "" || userType !== 'student') {
      navigate('/login');
    }
  }, [navigate]);

  const getWeekDates = (date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    const week = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const weekDates = getWeekDates(currentWeek);

  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    const isInWeek = eventDate >= weekDates[0] && eventDate <= weekDates[6];
    const matchesSubject = filterSubject === 'All' || event.subject === filterSubject;
    return isInWeek && matchesSubject;
  });

  const getEventsForDate = (date) => {
    return filteredEvents.filter(event => event.date === date.toISOString().split('T')[0]);
  };

  const getEventIcon = (type) => {
    switch (type) {
      case 'live-class': return '🟢';
      case 'assignment': return '🟠';
      case 'test': return '🔵';
      default: return '📅';
    }
  };

  const handleSyncCalendar = () => {
    alert("Syncing with Google Calendar... (This is a placeholder for actual integration)");
  };

  const navigateWeek = (direction) => {
    const newWeek = new Date(currentWeek);
    newWeek.setDate(currentWeek.getDate() + (direction * 7));
    setCurrentWeek(newWeek);
  };

  const subjects = ['All', 'Mathematics', 'Physics', 'Science', 'English', 'Social Studies'];

  return (
    <div className="schedule-page">
      <div className="schedule-header">
        <h1>Calendar & Schedule</h1>
        <p>Unified view of classes, tests, and due dates</p>
        <div className="schedule-controls">
          <button onClick={() => navigateWeek(-1)} className="nav-btn">Previous Week</button>
          <span className="current-week">
            {weekDates[0].toLocaleDateString()} - {weekDates[6].toLocaleDateString()}
          </span>
          <button onClick={() => navigateWeek(1)} className="nav-btn">Next Week</button>
        </div>
        <div className="schedule-filters">
          <select value={filterSubject} onChange={(e) => setFilterSubject(e.target.value)}>
            {subjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
          <button onClick={handleSyncCalendar} className="sync-btn">Sync with Google Calendar</button>
        </div>
      </div>

      <div className="calendar-grid">
        {weekDates.map((date, index) => (
          <div key={index} className="calendar-day">
            <div className="day-header">
              <h3>{date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</h3>
            </div>
            <div className="day-events">
              {getEventsForDate(date).map(event => (
                <div key={event.id} className={`event-item ${event.type}`}>
                  <span className="event-icon">{getEventIcon(event.type)}</span>
                  <div className="event-details">
                    <h4>{event.title}</h4>
                    <p>{event.time}</p>
                    {event.type === 'live-class' && (
                      <a href={event.link} target="_blank" rel="noopener noreferrer" className="join-link">
                        Join {event.platform}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="legend">
        <h3>Legend</h3>
        <div className="legend-items">
          <div className="legend-item">
            <span className="legend-icon">🟢</span>
            <span>Live Class</span>
          </div>
          <div className="legend-item">
            <span className="legend-icon">🟠</span>
            <span>Assignment</span>
          </div>
          <div className="legend-item">
            <span className="legend-icon">🔵</span>
            <span>Test</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;

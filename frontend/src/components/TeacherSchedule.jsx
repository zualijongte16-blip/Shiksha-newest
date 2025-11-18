import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TeacherSchedule.css';

const TeacherSchedule = () => {
  const navigate = useNavigate();
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [filterSubject, setFilterSubject] = useState('All');
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Physics Live Class",
      type: "live-class",
      subject: "Physics",
      date: "2025-11-6",
      time: "10:00 AM",
      class: "Class 10",
      platform: "Google Meet",
      link: "https://meet.google.com/abc-defg-hij",
    },
    {
      id: 2,
      title: "Mathematics Assignment Due",
      type: "assignment",
      subject: "Mathematics",
      date: "2025-11-7",
      time: "11:59 PM",
      class: "Class 10",
      description: "Submit algebra homework",
    },
    {
      id: 3,
      title: "Science Test",
      type: "test",
      subject: "Science",
      date: "2025-11-5",
      time: "9:00 AM",
      class: "Class 10",
      description: "Chapter 5-7 test",
    },
    {
      id: 4,
      title: "English Live Class",
      type: "live-class",
      subject: "English",
      date: "2025-11-8",
      time: "2:00 PM",
      class: "Class 11",
      platform: "Zoom",
      link: "https://zoom.us/j/123456789",
    },
    {
      id: 5,
      title: "History Assignment Due",
      type: "assignment",
      subject: "Social Studies",
      date: "2025-11-9",
      time: "11:59 PM",
      class: "Class 11",
      description: "Submit essay on World War II",
    },
    {
      id: 6,
      title: "Mathematics Test",
      type: "test",
      subject: "Mathematics",
      date: "2025-11-4",
      time: "10:00 AM",
      class: "Class 10",
      description: "Geometry test",
    },
  ]);

  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    type: 'live-class',
    subject: 'Mathematics',
    date: '',
    time: '',
    class: 'Class 10',
    description: '',
    platform: '',
    link: '',
  });

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("auth")) || "";
    const userType = localStorage.getItem('userType');
    if (token === "" || userType !== 'teacher') {
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

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.time) {
      const event = {
        ...newEvent,
        id: events.length + 1,
      };
      setEvents([...events, event]);
      setNewEvent({
        title: '',
        type: 'live-class',
        subject: 'Mathematics',
        date: '',
        time: '',
        class: 'Class 10',
        description: '',
        platform: '',
        link: '',
      });
      setShowAddEvent(false);
    }
  };

  const subjects = ['All', 'Mathematics', 'Physics', 'Science', 'English', 'Social Studies'];
  const classes = ['Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'];

  return (
    <div className="ts-schedule-page">
      <div className="ts-schedule-header">
        <h1>Teachers Schedule</h1>
        <p>Manage your classes, assignments, and tests</p>
        <div className="ts-schedule-controls">
          <button onClick={() => navigateWeek(-1)} className="ts-nav-btn">Previous Week</button>
          <span className="ts-current-week">
            {weekDates[0].toLocaleDateString()} - {weekDates[6].toLocaleDateString()}
          </span>
          <button onClick={() => navigateWeek(1)} className="ts-nav-btn">Next Week</button>
        </div>
        <div className="ts-schedule-filters">
          <select value={filterSubject} onChange={(e) => setFilterSubject(e.target.value)}>
            {subjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
          <button onClick={handleSyncCalendar} className="ts-sync-btn">Sync with Google Calendar</button>
          <button onClick={() => setShowAddEvent(true)} className="ts-add-event-btn">Add Event</button>
        </div>
      </div>

      {showAddEvent && (
        <div className="ts-add-event-modal">
          <div className="ts-modal-content">
            <h3>Add New Event</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleAddEvent(); }}>
              <input
                type="text"
                placeholder="Event Title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                required
              />
              <select
                value={newEvent.type}
                onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
              >
                <option value="live-class">Live Class</option>
                <option value="assignment">Assignment</option>
                <option value="test">Test</option>
              </select>
              <select
                value={newEvent.subject}
                onChange={(e) => setNewEvent({ ...newEvent, subject: e.target.value })}
              >
                {subjects.slice(1).map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
              <select
                value={newEvent.class}
                onChange={(e) => setNewEvent({ ...newEvent, class: e.target.value })}
              >
                {classes.map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
              <input
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                required
              />
              <input
                type="time"
                value={newEvent.time}
                onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                required
              />
              <textarea
                placeholder="Description"
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              />
              {newEvent.type === 'live-class' && (
                <>
                  <input
                    type="text"
                    placeholder="Platform (e.g., Google Meet)"
                    value={newEvent.platform}
                    onChange={(e) => setNewEvent({ ...newEvent, platform: e.target.value })}
                  />
                  <input
                    type="url"
                    placeholder="Link"
                    value={newEvent.link}
                    onChange={(e) => setNewEvent({ ...newEvent, link: e.target.value })}
                  />
                </>
              )}
              <div className="ts-modal-buttons">
                <button type="submit">Add Event</button>
                <button type="button" onClick={() => setShowAddEvent(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="ts-calendar-grid">
        {weekDates.map((date, index) => (
          <div key={index} className="ts-calendar-day">
            <div className="ts-day-header">
              <h3>{date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</h3>
            </div>
            <div className="ts-day-events">
              {getEventsForDate(date).map(event => (
                <div key={event.id} className={`ts-event-item ${event.type}`}>
                  <span className="ts-event-icon">{getEventIcon(event.type)}</span>
                  <div className="ts-event-details">
                    <h4>{event.title}</h4>
                    <p>{event.time} - {event.class}</p>
                    {event.description && <p>{event.description}</p>}
                    {event.type === 'live-class' && event.link && (
                      <a href={event.link} target="_blank" rel="noopener noreferrer" className="ts-join-link">
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

      <div className="ts-legend">
        <h3>Legend</h3>
        <div className="ts-legend-items">
          <div className="ts-legend-item">
            <span className="ts-legend-icon">🟢</span>
            <span>Live Class</span>
          </div>
          <div className="ts-legend-item">
            <span className="ts-legend-icon">🟠</span>
            <span>Assignment</span>
          </div>
          <div className="ts-legend-item">
            <span className="ts-legend-icon">🔵</span>
            <span>Test</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherSchedule;

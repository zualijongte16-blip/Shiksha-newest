import React, { useState, useEffect } from 'react';
import './Calendar.css';

const Calendar = ({ onClose }) => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [events] = useState([
    { date: '2023-10-15', title: 'Physics Live Class', type: 'live-class' },
    { date: '2023-10-16', title: 'English Live Class', type: 'live-class' },
    { date: '2023-10-17', title: 'Math Assignment Due', type: 'assignment' },
    { date: '2023-10-18', title: 'Science Test', type: 'test' },
    { date: '2023-10-20', title: 'History Assignment Due', type: 'assignment' },
    { date: '2023-10-21', title: 'Math Test', type: 'test' },
    { date: '2023-11-05', title: 'Chemistry Live Class', type: 'live-class' },
    { date: '2023-11-12', title: 'Biology Assignment Due', type: 'assignment' },
    { date: '2023-12-01', title: 'Final Exam', type: 'test' },
    { date: '2024-01-15', title: 'New Year Assignment', type: 'assignment' },
    { date: '2024-02-20', title: 'Valentine Test', type: 'test' },
    { date: '2024-03-10', title: 'Spring Break Live Class', type: 'live-class' },
  ]);

  const getDaysInMonth = (year, month) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const getEventsForDate = (date) => {
    if (!date) return [];
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateString);
  };

  const getEventColor = (type) => {
    switch (type) {
      case 'live-class': return '#28a745';
      case 'assignment': return '#ffc107';
      case 'test': return '#007bff';
      default: return '#6c757d';
    }
  };

  const navigateYear = (direction) => {
    setCurrentYear(prevYear => prevYear + direction);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const renderMonth = (monthIndex) => {
    const days = getDaysInMonth(currentYear, monthIndex);

    return (
      <div key={monthIndex} className="month-calendar">
        <h3 className="month-name">{monthNames[monthIndex]}</h3>
        <div className="month-grid">
          <div className="day-header">S</div>
          <div className="day-header">M</div>
          <div className="day-header">T</div>
          <div className="day-header">W</div>
          <div className="day-header">T</div>
          <div className="day-header">F</div>
          <div className="day-header">S</div>

          {days.map((date, index) => (
            <div key={index} className={`month-day ${!date ? 'empty' : ''}`}>
              {date && (
                <>
                  <span className="day-number">{date.getDate()}</span>
                  <div className="day-events">
                    {getEventsForDate(date).map((event, eventIndex) => (
                      <div
                        key={eventIndex}
                        className="event-dot"
                        style={{ backgroundColor: getEventColor(event.type) }}
                        title={event.title}
                      ></div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="calendar-modal-overlay" onClick={onClose}>
      <div className="calendar-modal yearly-view" onClick={(e) => e.stopPropagation()}>
        <div className="calendar-header">
          <button onClick={() => navigateYear(-1)} className="nav-btn">{'<'}</button>
          <h2>{currentYear}</h2>
          <button onClick={() => navigateYear(1)} className="nav-btn">{'>'}</button>
          <button onClick={onClose} className="close-btn">×</button>
        </div>

        <div className="yearly-calendar">
          {Array.from({ length: 12 }, (_, i) => renderMonth(i))}
        </div>

        <div className="calendar-legend">
          <div className="legend-item">
            <span className="legend-dot" style={{ backgroundColor: '#28a745' }}></span>
            <span>Live Class</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot" style={{ backgroundColor: '#ffc107' }}></span>
            <span>Assignment</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot" style={{ backgroundColor: '#007bff' }}></span>
            <span>Test</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;

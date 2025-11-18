import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LiveRecordedClasses.css';

const LiveRecordedClasses = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('live');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('All');
  const [notifications, setNotifications] = useState({});

  // Mock data for live classes
  const [liveClasses] = useState([
    {
      id: 1,
      title: "Physics Live Class",
      subject: "Physics",
      teacher: "Mr. Sharma",
      date: "2023-10-15",
      time: "10:00 AM",
      platform: "Google Meet",
      link: "https://meet.google.com/abc-defg-hij",
    },
    {
      id: 2,
      title: "Mathematics Live Class",
      subject: "Mathematics",
      teacher: "Ms. Patel",
      date: "2023-10-15",
      time: "2:00 PM",
      platform: "Zoom",
      link: "https://zoom.us/j/123456789",
    },
    {
      id: 3,
      title: "English Live Class",
      subject: "English",
      teacher: "Mrs. Gupta",
      date: "2023-10-16",
      time: "11:00 AM",
      platform: "Jitsi",
      link: "https://meet.jit.si/abcdef123",
    },
  ]);

  // Mock data for recorded classes
  const [recordedClasses] = useState([
    {
      id: 1,
      title: "Algebra Fundamentals",
      subject: "Mathematics",
      teacher: "Mr. Sharma",
      date: "2023-10-10",
      duration: "45 min",
      videoUrl: "https://example.com/video1.mp4",
      notesUrl: "https://example.com/notes1.pdf",
      thumbnail: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "Photosynthesis Lecture",
      subject: "Science",
      teacher: "Ms. Patel",
      date: "2023-10-12",
      duration: "30 min",
      videoUrl: "https://example.com/video2.mp4",
      notesUrl: "https://example.com/notes2.pdf",
      thumbnail: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      title: "Literature Analysis",
      subject: "English",
      teacher: "Mrs. Gupta",
      date: "2023-10-13",
      duration: "50 min",
      videoUrl: "https://example.com/video3.mp4",
      notesUrl: "https://example.com/notes3.pdf",
      thumbnail: "https://via.placeholder.com/150",
    },
  ]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("auth")) || "";
    const userType = localStorage.getItem('userType');
    if (token === "" || userType !== 'student') {
      navigate('/login');
    }
  }, [navigate]);

  const handleNotificationToggle = (classId) => {
    setNotifications(prev => ({
      ...prev,
      [classId]: !prev[classId]
    }));
  };

  const filteredRecordedClasses = recordedClasses.filter(cls => {
    const matchesSearch = cls.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cls.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterSubject === 'All' || cls.subject === filterSubject;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="live-recorded-page">
      <div className="live-page-header">
        <h1>Live & Recorded Classes</h1>
        <p>Access your live sessions and recorded lectures in one place.</p>
      </div>

      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === 'live' ? 'active' : ''}`}
          onClick={() => setActiveTab('live')}
        >
          Live Classes
        </button>
        <button
          className={`tab-btn ${activeTab === 'recorded' ? 'active' : ''}`}
          onClick={() => setActiveTab('recorded')}
        >
          Recorded Classes
        </button>
      </div>

      {activeTab === 'live' && (
        <div className="live-classes-content">
          <div className="calendar-integration">
            <p>📅 Classes are integrated with your calendar. Upcoming live sessions:</p>
          </div>
          <ul className="live-classes-list">
            {liveClasses.map(cls => (
              <li key={cls.id} className="live-class-item">
                <div className="class-info">
                  <h4>{cls.title}</h4>
                  <p>{cls.subject} • {cls.teacher}</p>
                  <p>{cls.date} at {cls.time}</p>
                </div>
                <div className="class-actions">
                  <button
                    className="join-btn"
                    onClick={() => window.open(cls.link, '_blank')}
                  >
                    Join via {cls.platform}
                  </button>
                  <label className="notification-toggle">
                    <input
                      type="checkbox"
                      checked={notifications[cls.id] || false}
                      onChange={() => handleNotificationToggle(cls.id)}
                    />
                    Remind me before class
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === 'recorded' && (
        <div className="recorded-classes-content">
          <div className="search-filter">
            <input
              type="text"
              placeholder="Search by title or teacher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="filter-select"
            >
              <option value="All">All Subjects</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Science">Science</option>
              <option value="English">English</option>
            </select>
          </div>
          <div className="recorded-classes-playlist">
            {filteredRecordedClasses.map(cls => (
              <div key={cls.id} className="playlist-item">
                <img src={cls.thumbnail} alt={cls.title} className="video-thumbnail" />
                <div className="video-info">
                  <h4>{cls.title}</h4>
                  <p>{cls.subject} • {cls.teacher} • {cls.date} • {cls.duration}</p>
                </div>
                <div className="video-actions">
                  <button
                    className="watch-btn"
                    onClick={() => window.open(cls.videoUrl, '_blank')}
                  >
                    ▶️ Watch
                  </button>
                  <button
                    className="download-btn"
                    onClick={() => window.open(cls.notesUrl, '_blank')}
                  >
                    📄 Notes
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveRecordedClasses;
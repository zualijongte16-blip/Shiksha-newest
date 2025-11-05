import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from './Calendar';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState('Class 10');
  const [activeTab, setActiveTab] = useState('live');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('All');
  const [notifications, setNotifications] = useState({});
  const [showCalendar, setShowCalendar] = useState(false);

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

  const handleLogout = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('userType');
    navigate('/login');
  };

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

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
    <div className="student-dashboard">
      {/* Top Navbar */}
      <nav className="sd-top-navbar">
        <div className="sd-top-navbar-left">
          <div className="sd-profile-info">
            <div className="sd-profile-avatar">S</div>
            <span>Student Name</span>
          </div>
          <div className="sd-class-dropdown">
            <select value={selectedClass} onChange={handleClassChange}>
              <option value="Class 8">Class 8</option>
              <option value="Class 9">Class 9</option>
              <option value="Class 10">Class 10</option>
              <option value="Class 11">Class 11</option>
              <option value="Class 12">Class 12</option>
            </select>
          </div>
        </div>
        <div className="sd-top-navbar-right">
          <span className="sd-nav-icon">🔔</span>
          <span className="sd-nav-icon">&#9881;</span>
          <button onClick={handleLogout} className="sd-logout-btn">Logout</button>
        </div>
      </nav>

      {/* Dashboard Body */}
      <div className="sd-dashboard-body">
        {/* Left Sidebar */}
        <aside className="sd-left-sidebar">
          <ul className="sd-sidebar-nav">
            <li><a href="#dashboard"><span className="sd-sidebar-icon">•</span> Dashboard</a></li>
            <li><a href="/student-courses"><span className="sd-sidebar-icon">•</span> My Classes</a></li>
            <li><a href="/student-test"><span className="sd-sidebar-icon">•</span> Tests</a></li>
            <li><a href='/live-recorded'><span className="sd-sidebar-icon">•</span> Live & Recorded</a></li>
            <li><a href='/assignments'><span className="sd-sidebar-icon">•</span> Assignments</a></li>
            <li><a href='/schedule'><span className="sd-sidebar-icon">•</span> Schedule</a></li>
            <li><a href="#grades"><span className="sd-sidebar-icon">•</span> Grades</a></li>
            <li><a href="#study-materials"><span className="sd-sidebar-icon">•</span> Study Materials</a></li>
            <li><a href="#messages"><span className="sd-sidebar-icon">•</span> Messages</a></li>
          </ul>
        </aside>

        {/* Main Dashboard */}
        <main className="sd-main-dashboard">
          <div className="sd-dashboard-content">
            {/* Welcome Banner */}
            <div className="sd-welcome-banner">
              <h1>Welcome, Student!</h1>
              <p>"Success is not final, failure is not fatal: It is the courage to continue that counts." - Winston Churchill</p>
              <div className="sd-profile-progress">
                <span>Profile 80% complete</span>
                <div className="sd-progress-bar">
                  <div className="sd-progress-fill" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>

            {/* Progress Summary Cards */}
            <div className="sd-progress-summary">
              <h3>Subject Progress</h3>
              <div className="sd-progress-cards">
                <div className="sd-progress-card">
                  <h4>Mathematics</h4>
                  <div className="sd-circular-progress">
                    <div className="sd-progress-circle" style={{ '--percentage': '85' }}>
                      <span>85%</span>
                    </div>
                  </div>
                  <p>Average: 88%</p>
                  <button>Continue Lesson</button>
                </div>
                <div className="sd-progress-card">
                  <h4>Science</h4>
                  <div className="sd-circular-progress">
                    <div className="sd-progress-circle" style={{ '--percentage': '72' }}>
                      <span>72%</span>
                    </div>
                  </div>
                  <p>Average: 75%</p>
                  <button>Continue Lesson</button>
                </div>
                <div className="sd-progress-card">
                  <h4>English</h4>
                  <div className="sd-circular-progress">
                    <div className="sd-progress-circle" style={{ '--percentage': '90' }}>
                      <span>90%</span>
                    </div>
                  </div>
                  <p>Average: 92%</p>
                  <button>Continue Lesson</button>
                </div>
                <div className="sd-progress-card">
                  <h4>Social Studies</h4>
                  <div className="sd-circular-progress">
                    <div className="sd-progress-circle" style={{ '--percentage': '78' }}>
                      <span>78%</span>
                    </div>
                  </div>
                  <p>Average: 80%</p>
                  <button>Continue Lesson</button>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="sd-recent-activities">
              <h3>Recent Activity</h3>
              <div className="sd-activity-timeline">
                <div className="sd-activity-item">
                  <div className="sd-activity-icon">✓</div>
                  <div className="sd-activity-content">
                    <p>Completed "Trigonometry Test"</p>
                    <span>2 hours ago</span>
                  </div>
                </div>
                <div className="sd-activity-item">
                  <div className="sd-activity-icon">📤</div>
                  <div className="sd-activity-content">
                    <p>Uploaded "History Assignment"</p>
                    <span>1 day ago</span>
                  </div>
                </div>
                <div className="sd-activity-item">
                  <div className="sd-activity-icon">▶️</div>
                  <div className="sd-activity-content">
                    <p>Watched "Photosynthesis Lecture"</p>
                    <span>2 days ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="sd-right-sidebar">
            <div className="sd-quick-access">
              <h3>Quick Access</h3>
              <ul>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setShowCalendar(true); }}><span className="sd-quick-icon">•</span> Calendar</a></li>
                <li><a href="#timetable"><span className="sd-quick-icon">•</span> Timetable</a></li>
                <li><a href="#support"><span className="sd-quick-icon">•</span> Support</a></li>
              </ul>
            </div>
          </aside>
        </main>
      </div>

      {/* Calendar Modal */}
      {showCalendar && <Calendar onClose={() => setShowCalendar(false)} />}
    </div>
  );
};

export default StudentDashboard;

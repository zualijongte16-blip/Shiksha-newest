import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaCog } from 'react-icons/fa';
import Calendar from './Calendar';
import './TeacherDashboard.css';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState('Class 10');
  const [activeTab, setActiveTab] = useState('live');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('All');
  const [notifications, setNotifications] = useState({});
  const [showCalendar, setShowCalendar] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settingsTab, setSettingsTab] = useState('personal');
  const [teacherName, setTeacherName] = useState('Teacher Name');
  const [teacherBio, setTeacherBio] = useState('English');

  // Mock data for students
  const [students] = useState([
    { id: 1, name: 'Alice Johnson', class: 'Class 10', subject: 'Mathematics' },
    { id: 2, name: 'Bob Smith', class: 'Class 10', subject: 'Science' },
    { id: 3, name: 'Charlie Brown', class: 'Class 11', subject: 'English' },
  ]);

  // Mock data for live classes
  const [liveClasses] = useState([
    {
      id: 1,
      title: "Physics Live Class",
      subject: "Physics",
      date: "2023-10-15",
      time: "10:00 AM",
      platform: "Google Meet",
      link: "https://meet.google.com/abc-defg-hij",
    },
    {
      id: 2,
      title: "Mathematics Live Class",
      subject: "Mathematics",
      date: "2023-10-15",
      time: "2:00 PM",
      platform: "Zoom",
      link: "https://zoom.us/j/123456789",
    },
  ]);

  // Mock data for assignments
  const [assignments] = useState([
    { id: 1, title: 'Algebra Homework', subject: 'Mathematics', dueDate: '2023-10-20', status: 'pending' },
    { id: 2, title: 'Physics Lab Report', subject: 'Physics', dueDate: '2023-10-18', status: 'submitted' },
  ]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("auth")) || "";
    const userType = localStorage.getItem('userType');
    if (token === "" || userType !== 'teacher') {
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

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedStudent) {
      const message = {
        id: messages.length + 1,
        to: selectedStudent,
        content: newMessage,
        timestamp: new Date().toLocaleString(),
        sender: 'Teacher',
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'All' || student.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setShowSettings(false);
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    setShowNotifications(false);
  };

  const handleSettingsSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const bio = formData.get('bio');
    if (name) setTeacherName(name);
    if (bio) setTeacherBio(bio);
    alert('Settings updated successfully!');
    setShowSettings(false);
  };

  return (
    <div className="teacher-dashboard">
      {/* Top Navbar */}
      <nav className="teacher-top-navbar">
        <div className="teacher-top-navbar-left">
          <div className="teacher-profile-info">
            <div className="teacher-profile-avatar">T</div>
            <span>{teacherName} ({teacherBio})</span>
          </div>
          <div className="teacher-class-dropdown">
            <select value={selectedClass} onChange={handleClassChange}>
              <option value="All">All Classes</option>
              <option value="Class 8">Class 8</option>
              <option value="Class 9">Class 9</option>
              <option value="Class 10">Class 10</option>
              <option value="Class 11">Class 11</option>
              <option value="Class 12">Class 12</option>
            </select>
          </div>
        </div>
        <div className="teacher-top-navbar-right">
           <div style={{ position: 'relative', display: 'inline-block', verticalAlign: 'middle' }}>
             <span
               className="teacher-nav-icon"
               onClick={toggleNotifications}
               style={{ cursor: "pointer", fontSize: "20px", color: "yellow", display: 'inline-block', verticalAlign: 'middle' }}
             >
               🔔
             </span>
             {showNotifications && (
               <div className="dropdown notifications-dropdown" style={{ position: 'absolute', top: '30px', right: '0', background: 'white', border: '1px solid #ddd', borderRadius: '5px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: '10px', zIndex: 1001, width: '200px' }}>
                 <h4>Notifications</h4>
                 <ul style={{ listStyle: 'none', padding: 0 }}>
                   <li style={{ padding: '5px 0', borderBottom: '1px solid #eee' }}>
                     <strong>Student Submission:</strong> Alice Johnson submitted Mathematics assignment
                   </li>
                   <li style={{ padding: '5px 0', borderBottom: '1px solid #eee' }}>
                     <strong>Schedule Update:</strong> Physics class rescheduled to 11 AM tomorrow
                   </li>
                   <li style={{ padding: '5px 0' }}>
                     <strong>System Alert:</strong> New student enrolled in Class 10
                   </li>
                 </ul>
               </div>
             )}
           </div>
           <div style={{ position: 'relative', display: 'inline-block', verticalAlign: 'middle' }}>
             <FaCog
               className="teacher-nav-icon"
               onClick={toggleSettings}
               style={{ cursor: "pointer", fontSize: "30px", display: 'inline-block', verticalAlign: 'middle' }}
             />
             {showSettings && (
              <div className="modal settings-modal" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1002 }}>
                <div className="modal-content" style={{ background: 'white', padding: '20px', borderRadius: '5px', width: '500px', maxHeight: '80vh', overflowY: 'auto' }}>
                  <h4>Settings</h4>
                  <div className="settings-tabs" style={{ display: 'flex', marginBottom: '20px' }}>
                    <button
                      onClick={() => setSettingsTab('personal')}
                      style={{
                        padding: '10px 20px',
                        border: 'none',
                        background: settingsTab === 'personal' ? '#007bff' : '#f8f9fa',
                        color: settingsTab === 'personal' ? 'white' : 'black',
                        cursor: 'pointer',
                        borderRadius: '5px 0 0 5px'
                      }}
                    >
                      Personal Info
                    </button>
                    <button
                      onClick={() => setSettingsTab('account')}
                      style={{
                        padding: '10px 20px',
                        border: 'none',
                        background: settingsTab === 'account' ? '#007bff' : '#f8f9fa',
                        color: settingsTab === 'account' ? 'white' : 'black',
                        cursor: 'pointer'
                      }}
                    >
                      Account Settings
                    </button>
                    <button
                      onClick={() => setSettingsTab('preferences')}
                      style={{
                        padding: '10px 20px',
                        border: 'none',
                        background: settingsTab === 'preferences' ? '#007bff' : '#f8f9fa',
                        color: settingsTab === 'preferences' ? 'white' : 'black',
                        cursor: 'pointer',
                        borderRadius: '0 5px 5px 0'
                      }}
                    >
                      Preferences
                    </button>
                  </div>
                  <form onSubmit={handleSettingsSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {settingsTab === 'personal' && (
                      <>
                        <label style={{ display: 'flex', flexDirection: 'column' }}>
                          Name:
                          <input type="text" name="name" placeholder="Enter name" style={{ padding: '5px', marginTop: '5px' }} />
                        </label>
                        <label style={{ display: 'flex', flexDirection: 'column' }}>
                          Bio:
                          <textarea name="bio" placeholder="Enter bio" rows="3" style={{ padding: '5px', marginTop: '5px' }} />
                        </label>
                      </>
                    )}
                    {settingsTab === 'account' && (
                      <>
                        <label style={{ display: 'flex', flexDirection: 'column' }}>
                          Username:
                          <input type="text" placeholder="Enter username" style={{ padding: '5px', marginTop: '5px' }} />
                        </label>
                        <label style={{ display: 'flex', flexDirection: 'column' }}>
                          Email:
                          <input type="email" placeholder="Enter email" style={{ padding: '5px', marginTop: '5px' }} />
                        </label>
                        <label style={{ display: 'flex', flexDirection: 'column' }}>
                          Password:
                          <input type="password" placeholder="Enter password" style={{ padding: '5px', marginTop: '5px' }} />
                        </label>
                        <label style={{ display: 'flex', flexDirection: 'column' }}>
                          Confirm Password:
                          <input type="password" placeholder="Confirm password" style={{ padding: '5px', marginTop: '5px' }} />
                        </label>
                      </>
                    )}
                    {settingsTab === 'preferences' && (
                      <>
                        <label style={{ display: 'flex', flexDirection: 'column' }}>
                          Theme:
                          <select style={{ padding: '5px', marginTop: '5px' }}>
                            <option>Light</option>
                            <option>Dark</option>
                          </select>
                        </label>
                      </>
                    )}
                    <button type="submit" style={{ marginTop: '10px', padding: '5px', cursor: 'pointer' }}>Save Changes</button>
                  </form>
                  <button onClick={toggleSettings} style={{ marginTop: '10px', padding: '5px', cursor: 'pointer' }}>Close</button>
                </div>
              </div>
            )}
          </div>
          <button onClick={handleLogout} className="teacher-logout-btn">Logout</button>
        </div>
      </nav>

      {/* Dashboard Body */}
      <div className="teacher-dashboard-body">
        {/* Left Sidebar */}
        <aside className="teacher-left-sidebar">
          <ul className="teacher-sidebar-nav">
            <li><a href="#dashboard"><span className="teacher-sidebar-icon">•</span> Dashboard</a></li>
            <li><a href='/teacher-live-recorded'><span className="teacher-sidebar-icon">•</span> Live & Recorded</a></li>
            <li><a href='/teacher-assignments'><span className="teacher-sidebar-icon">•</span> Assignments</a></li>
            <li><a href="/class-test"><span className="teacher-sidebar-icon">•</span> Class-Test</a></li>
            <li><a href="/teacher-courses"><span className="teacher-sidebar-icon">•</span> Study Materials</a></li>
            <li><a href='/teacher-schedule'><span className="teacher-sidebar-icon">•</span> Schedule</a></li>
            <li><a href="/teachers-messages"><span className="teacher-sidebar-icon">•</span> Messages</a></li>
          </ul>
        </aside>

        {/* Main Dashboard */}
        <main className="teacher-main-dashboard">
          <div className="teacher-dashboard-content">
            {/* Welcome Banner */}
            <div className="teacher-welcome-banner">
              <h1>Welcome, {teacherName}!</h1>
              <p>"The best teachers are those who show you where to look but don't tell you what to see." - Alexandra K. Trenfor</p>
              <div className="teacher-profile-progress">
                <span>Profile 85% complete</span>
                <div className="teacher-progress-bar">
                  <div className="teacher-progress-fill" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>

            {/* Class Overview */}
            <div className="teacher-progress-summary">
              <h3>Class Overview</h3>
              <div className="teacher-progress-cards">
                <div className="teacher-progress-card">
                  <h4>Class 10 - Mathematics</h4>
                  <div className="teacher-circular-progress">
                    <div className="teacher-progress-circle" style={{ '--percentage': '75' }}>
                      <span>75%</span>
                    </div>
                  </div>
                  <p>Average Attendance: 78%</p>
                  <button>View Details</button>
                </div>
                <div className="teacher-progress-card">
                  <h4>Class 11 - Physics</h4>
                  <div className="teacher-circular-progress">
                    <div className="teacher-progress-circle" style={{ '--percentage': '82' }}>
                      <span>82%</span>
                    </div>
                  </div>
                  <p>Average Attendance: 85%</p>
                  <button>View Details</button>
                </div>
                <div className="teacher-progress-card">
                  <h4>Class 9 - English</h4>
                  <div className="teacher-circular-progress">
                    <div className="teacher-progress-circle" style={{ '--percentage': '90' }}>
                      <span>90%</span>
                    </div>
                  </div>
                  <p>Average Attendance: 92%</p>
                  <button>View Details</button>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="teacher-recent-activities">
              <h3>Recent Activity</h3>
              <div className="teacher-activity-timeline">
                <div className="teacher-activity-item">
                  <div className="teacher-activity-icon">✓</div>
                  <div className="teacher-activity-content">
                    <p>Graded "Algebra Homework" for Class 10</p>
                    <span>2 hours ago</span>
                  </div>
                </div>
                <div className="teacher-activity-item">
                  <div className="teacher-activity-icon">📤</div>
                  <div className="teacher-activity-content">
                    <p>Uploaded "Physics Lab Report" assignment</p>
                    <span>1 day ago</span>
                  </div>
                </div>
                <div className="teacher-activity-item">
                  <div className="teacher-activity-icon">▶️</div>
                  <div className="teacher-activity-content">
                    <p>Conducted Live Class on Trigonometry</p>
                    <span>2 days ago</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Messaging Section */}
            {/*<div className="teacher-panel messaging">
              <h3>Send Message to Student</h3>
              <div className="teacher-messaging-content">
                <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)}>
                  <option value="">Select Student</option>
                  {students.map(student => (
                    <option key={student.id} value={student.name}>{student.name} - {student.class}</option>
                  ))}
                </select>
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message here..."
                  rows="4"
                />
                <button onClick={handleSendMessage} className="teacher-send-btn">Send Message</button>
              </div>
              <div className="teacher-messages-list">
                <h4>Recent Messages</h4>
                {messages.map(msg => (
                  <div key={msg.id} className="teacher-message-item">
                    <p><strong>To: {msg.to}</strong> - {msg.timestamp}</p>
                    <p>{msg.content}</p>
                  </div>
                ))}
              </div>
            </div>*/}
          </div>  

          {/* Right Sidebar */}
          <aside className="teacher-right-sidebar">
            <div className="teacher-quick-access">
              <h3>Quick Access</h3>
              <ul>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setShowCalendar(true); }}><span className="teacher-quick-icon">•</span> Calendar</a></li>
                <li><a href="#my-assistant"><span className="teacher-quick-icon">•</span> My Assistant</a></li>
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

export default TeacherDashboard;

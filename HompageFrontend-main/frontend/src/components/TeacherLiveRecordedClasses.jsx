import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TeacherLiveRecordedClasses.css';

const TeacherLiveRecordedClasses = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('live');
  const [recordedFilter, setRecordedFilter] = useState('All Recorded');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [upcomingClasses, setUpcomingClasses] = useState([
    {
      id: 1,
      subject: 'Physics – Reflection of Light',
      date: 'Nov 2, 2025',
      time: '5:00 PM',
      duration: '45 mins',
      class: 'Class 10',
      joinLink: 'https://meet.google.com/abc-defg-hij',
    },
    // Add more mock data as needed
  ]);
  const [recordedClasses, setRecordedClasses] = useState([
    {
      id: 1,
      title: 'Reflection of Light – Lecture 1',
      subject: 'Physics',
      uploadedOn: 'Oct 28, 2025',
      views: 320,
      comments: 12,
      class: '10th',
      thumbnail: 'https://via.placeholder.com/150',
      videoUrl: 'https://example.com/video1.mp4',
      description: 'Introduction to reflection of light with practical examples.',
      notesUrl: 'https://example.com/notes1.pdf',
      likes: 45,
    },
    {
      id: 2,
      title: 'Algebra Fundamentals',
      subject: 'Mathematics',
      uploadedOn: 'Oct 25, 2025',
      views: 280,
      comments: 8,
      class: '9th',
      thumbnail: 'https://via.placeholder.com/150',
      videoUrl: 'https://example.com/video2.mp4',
      description: 'Basic algebra concepts and problem solving.',
      notesUrl: 'https://example.com/notes2.pdf',
      likes: 32,
    },
    {
      id: 3,
      title: 'English Literature Analysis',
      subject: 'English',
      uploadedOn: 'Oct 20, 2025',
      views: 195,
      comments: 15,
      class: '11th',
      thumbnail: 'https://via.placeholder.com/150',
      videoUrl: 'https://example.com/video3.mp4',
      description: 'Analyzing classic literature pieces.',
      notesUrl: 'https://example.com/notes3.pdf',
      likes: 28,
    },
    // Add more
  ]);

  // Analytics data
  const analytics = {
    totalLiveSessions: 24,
    totalRecordings: 67,
    avgViews: 310,
    avgRating: 4.8,
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("auth")) || "";
    const userType = localStorage.getItem('userType');
    if (token === "" || userType !== 'teacher') {
      navigate('/login');
    }
  }, [navigate]);

  const handleScheduleLiveClass = () => {
    // Placeholder for scheduling modal
    alert('Scheduling modal would open here.');
    setShowScheduleModal(false);
  };

  const handleUploadRecordedClass = () => {
    // Placeholder for upload modal
    alert('Upload modal would open here.');
    setShowUploadModal(false);
  };

  const handleGoLiveNow = () => {
    // Placeholder for going live
    alert('Going live now...');
  };

  const handleEditClass = (id) => {
    alert(`Edit class ${id}`);
  };

  const handleCancelClass = (id) => {
    setUpcomingClasses(upcomingClasses.filter(cls => cls.id !== id));
  };

  const handleStartNow = (id) => {
    alert(`Starting class ${id} now`);
  };

  const handleEditRecorded = (id) => {
    alert(`Edit recorded class ${id}`);
  };

  const handleDeleteRecorded = (id) => {
    setRecordedClasses(recordedClasses.filter(cls => cls.id !== id));
  };

  const handleViewAnalytics = (id) => {
    alert(`View analytics for class ${id}`);
  };

  const handleCopyLink = (url) => {
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setShowVideoModal(true);
  };

  const filteredRecordedClasses = recordedClasses.filter(cls => {
    if (recordedFilter === 'All Recorded') return true;
    return cls.class === recordedFilter;
  });

  return (
    <div className="teacher-live-recorded-page">
      <div className="T-L-page-header">
        <h1>Live & Recorded Classes</h1>
        <div className="T-L-action-buttons">
          <button className="T-L-action-btn schedule-btn" onClick={() => setShowScheduleModal(true)}>
            Schedule Live Class
          </button>
          <button className="T-L-action-btn upload-btn" onClick={() => setShowUploadModal(true)}>
            Upload Recorded Class
          </button>
          <button className="T-L-action-btn go-live-btn" onClick={handleGoLiveNow}>
            Go Live Now
          </button>
        </div>
      </div>

      <div className="T-L-tabs">
        <button
          className={`T-L-tab-btn ${activeTab === 'live' ? 'active' : ''}`}
          onClick={() => setActiveTab('live')}
        >
          Live Classes
        </button>
        <button
          className={`T-L-tab-btn ${activeTab === 'recorded' ? 'active' : ''}`}
          onClick={() => setActiveTab('recorded')}
        >
          Recorded Classes
        </button>
      </div>

      {activeTab === 'live' && (
        <div className="T-L-live-classes-section">
          <h2>Upcoming Live Classes</h2>
          {upcomingClasses.length > 0 ? (
            <div className="T-L-classes-grid">
              {upcomingClasses.map(cls => (
                <div key={cls.id} className="T-L-class-card">
                  <h3>{cls.subject}</h3>
                  <p><strong>Date & Time:</strong> {cls.date} | {cls.time}</p>
                  <p><strong>Duration:</strong> {cls.duration}</p>
                  <p><strong>Class:</strong> {cls.class}</p>
                  <p><strong>Join Link:</strong> <a href={cls.joinLink} target="_blank" rel="noopener noreferrer">{cls.joinLink}</a></p>
                  <div className="T-L-card-actions">
                    <button onClick={() => handleEditClass(cls.id)}>Edit</button>
                    <button onClick={() => handleCancelClass(cls.id)}>Cancel</button>
                    <button onClick={() => handleStartNow(cls.id)}>Start Now</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="T-L-no-classes">
              <div className="T-L-illustration">📅</div>
              <p>No live sessions scheduled yet. Click ‘+ Schedule Live Class’ to start teaching live!</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'recorded' && (
        <div className="T-L-recorded-classes-section">
          <h2>Recorded Classes</h2>
          <div className="T-L-filter-tabs">
            {['All Recorded', '8th', '9th', '10th', '11th', '12th'].map(filter => (
              <button
                key={filter}
                className={`T-L-filter-btn ${recordedFilter === filter ? 'active' : ''}`}
                onClick={() => setRecordedFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="T-L-recorded-grid">
            {filteredRecordedClasses.map(cls => (
              <div key={cls.id} className="T-L-recorded-card">
             {/*  <img src={cls.thumbnail} alt={cls.title} className="T-L-card-thumbnail" onClick={() => handleVideoClick(cls)} />   */}
                <div className="T-L-card-content">
                  <h3>{cls.title}</h3>
                  <p><strong>Subject:</strong> {cls.subject}</p>
                  <p><strong>Uploaded on:</strong> {cls.uploadedOn}</p>
                  <p><strong>Views:</strong> {cls.views}</p>
                  <p><strong>Comments:</strong> {cls.comments}</p>
                  <p><strong>Class:</strong> {cls.class}</p>
                  <div className="T-L-card-actions">
                    <button onClick={() => handleEditRecorded(cls.id)}>Edit</button>
                    <button onClick={() => handleDeleteRecorded(cls.id)}>Delete</button>
                    <button onClick={() => handleViewAnalytics(cls.id)}>View Analytics</button>
                    <button onClick={() => handleCopyLink(cls.videoUrl)}>Copy Link</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analytics Section */}
      <div className="T-L-analytics-section">
        <h3>Analytics Snapshot</h3>
        <div className="T-L-analytics-cards">
          <div className="T-L-analytics-card">
            <h4>Total Live Sessions Conducted</h4>
            <p>{analytics.totalLiveSessions}</p>
          </div>
          <div className="T-L-analytics-card">
            <h4>Total Recordings Uploaded</h4>
            <p>{analytics.totalRecordings}</p>
          </div>
          <div className="T-L-analytics-card">
            <h4>Average Views per Class</h4>
            <p>{analytics.avgViews}</p>
          </div>
          <div className="T-L-analytics-card">
            <h4>Avg Student Rating</h4>
            <p>★{analytics.avgRating}</p>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showScheduleModal && (
        <div className="T-L-modal">
          <div className="T-L-modal-content">
            <h2>Schedule Live Class</h2>
            <form className="T-L-modal-form">
              <label>Subject: <input type="text" placeholder="e.g., Physics" required /></label>
              <label>Class: <select required><option>Class 8</option><option>Class 9</option><option>Class 10</option><option>Class 11</option><option>Class 12</option></select></label>
              <label>Topic Title: <input type="text" placeholder="e.g., Reflection of Light" required /></label>
              <label>Date & Time: <input type="datetime-local" required /></label>
              <label>Duration: <input type="text" placeholder="e.g., 45 mins" required /></label>
              <label>Meeting Type: <select required><option>Jitsi</option><option>Google Meet</option><option>YouTube Live</option></select></label>
              <label><input type="checkbox" /> Auto-record</label>
              <label>Notes/Description: <textarea placeholder="Optional notes"></textarea></label>
              <div className="T-L-modal-actions">
                <button type="button" onClick={handleScheduleLiveClass}>Schedule</button>
                <button type="button" onClick={() => setShowScheduleModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showUploadModal && (
        <div className="T-L-modal">
          <div className="T-L-modal-content">
            <h2>Upload Recorded Class</h2>
            <form className="T-L-modal-form">
              <label>Upload Video File: <input type="file" accept="video/*" required /></label>
              <label>Thumbnail: <input type="file" accept="image/*" /></label>
              <label>Class: <select required><option>Class 8</option><option>Class 9</option><option>Class 10</option><option>Class 11</option><option>Class 12</option></select></label>
              <label>Subject: <input type="text" placeholder="e.g., Physics" required /></label>
              <label>Topic Title: <input type="text" placeholder="e.g., Reflection of Light – Lecture 1" required /></label>
              <label>Description: <textarea placeholder="Brief description" required></textarea></label>
              <label>Attach Study Material: <input type="file" accept=".pdf,.doc,.docx" /></label>
              <div className="T-L-modal-actions">
                <button type="button" onClick={handleUploadRecordedClass}>Upload</button>
                <button type="button" onClick={() => setShowUploadModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showVideoModal && selectedVideo && (
        <div className="T-L-modal">
          <div className="T-L-modal-content video-modal">
            <h2>{selectedVideo.title}</h2>
            <video controls className="T-L-video-player">
              <source src={selectedVideo.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p><strong>Description:</strong> {selectedVideo.description}</p>
            <div className="T-L-video-analytics">
              <p>Views: {selectedVideo.views} | Likes: {selectedVideo.likes} | Comments: {selectedVideo.comments}</p>
            </div>
            <div className="T-L-video-actions">
              <button onClick={() => window.open(selectedVideo.notesUrl, '_blank')}>Download Notes</button>
              <button onClick={() => setShowVideoModal(false)}>Close</button>
            </div>
            {/* Comment section placeholder */}
            <div className="T-L-comments-section">
              <h4>Comments</h4>
              <p>Comments would be displayed here...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherLiveRecordedClasses;

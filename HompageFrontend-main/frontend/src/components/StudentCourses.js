import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentCourses.css';

const StudentCourses = () => {
  const navigate = useNavigate();

  // Mock data for subjects - assuming some are unlocked based on payment
  const [subjects] = useState([
    {
      id: 1,
      title: "Mathematics",
      teacher: "Mr. Sharma",
      progress: 85,
      unlocked: true,
      thumbnailColor: "#FF6B6B",
      description: "Comprehensive coverage of algebra, geometry, and calculus with interactive problem-solving sessions.",
    },
    {
      id: 2,
      title: "Science",
      teacher: "Ms. Patel",
      progress: 72,
      unlocked: true,
      thumbnailColor: "#4ECDC4",
      description: "Physics, Chemistry, and Biology with lab experiments and practical demonstrations.",
    },
    {
      id: 3,
      title: "English",
      teacher: "Mrs. Gupta",
      progress: 90,
      unlocked: true,
      thumbnailColor: "#45B7D1",
      description: "Grammar, literature, and communication skills with creative writing exercises.",
    },
    {
      id: 4,
      title: "Social Studies",
      teacher: "Mr. Kumar",
      progress: 78,
      unlocked: false,
      thumbnailColor: "#96CEB4",
      description: "History, geography, and civics with interactive maps and timeline activities.",
    },
    {
      id: 5,
      title: "Hindi",
      teacher: "Ms. Singh",
      progress: 65,
      unlocked: false,
      thumbnailColor: "#FFEAA7",
      description: "Language skills, literature, and cultural studies with audio-visual content.",
    },
  ]);

  const handleViewDetails = (subjectId, subjectTitle) => {
    // Navigate to subject detail page
    navigate(`/subject/${subjectId}`);
  };

  return (
    <div className="student-classes-section">
      <div className="student-classes-container">
        <div className="student-page-header">
          <h1>My Classes</h1>
          <p>Explore and access course materials for your enrolled subjects.</p>
        </div>

        <div className="courses-content-wrapper">
          <button className="student-classes-back-btn" onClick={() => navigate(-1)}>
            Back to Dashboard
          </button>

          {/* Grid view of subject cards */}
          <div className="subjects-grid">
            {subjects.map((subject) => (
              <div key={subject.id} className={`subject-card ${subject.unlocked ? 'unlocked' : 'locked'}`}>
                <div className="subject-thumbnail" style={{ backgroundColor: subject.thumbnailColor }}>
                  <span className="subject-icon">{subject.title.charAt(0)}</span>
                </div>
                <div className="subject-info">
                  <h3 className="subject-title">{subject.title}</h3>
                  <p className="subject-teacher">Teacher: {subject.teacher}</p>
                  <div className="subject-progress">
                    <span>Progress: {subject.progress}%</span>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${subject.progress}%` }}></div>
                    </div>
                  </div>
                  {!subject.unlocked && <span className="lock-icon">🔒</span>}
                </div>
                <div className="subject-actions">
                  {subject.unlocked ? (
                    <button
                      onClick={() => handleViewDetails(subject.id, subject.title)}
                      className="view-details-btn"
                    >
                      View Details
                    </button>
                  ) : (
                    <button
                      onClick={() => alert(`Unlock ${subject.title} for access`)}
                      className="unlock-btn"
                    >
                      Unlock Subject
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCourses;

import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './SubjectDetail.css';

const SubjectDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data for subject details
  const [subjectData] = useState({
    id: parseInt(id),
    title: "Mathematics",
    teacher: "Mr. Sharma",
    progress: 85,
    chapters: [
      {
        id: 1,
        title: "Algebra Fundamentals",
        progress: 100,
        completed: true,
        content: {
          video: "https://example.com/video1.mp4",
          notes: "Comprehensive notes on basic algebra concepts including variables, equations, and inequalities.",
          assignments: [
            { id: 1, title: "Solve Linear Equations", dueDate: "2023-10-20", status: "completed" }
          ],
          quizzes: [
            { id: 1, title: "Algebra Quiz 1", score: 85, total: 100 }
          ]
        }
      },
      {
        id: 2,
        title: "Geometry Basics",
        progress: 90,
        completed: false,
        content: {
          video: "https://example.com/video2.mp4",
          notes: "Introduction to geometric shapes, angles, and theorems.",
          assignments: [
            { id: 2, title: "Geometry Worksheet", dueDate: "2023-10-25", status: "pending" }
          ],
          quizzes: [
            { id: 2, title: "Geometry Quiz 1", score: null, total: 100 }
          ]
        }
      },
      {
        id: 3,
        title: "Trigonometry",
        progress: 60,
        completed: false,
        content: {
          video: "https://example.com/video3.mp4",
          notes: "Study of triangles, trigonometric ratios, and their applications.",
          assignments: [
            { id: 3, title: "Trigonometry Problems", dueDate: "2023-10-30", status: "pending" }
          ],
          quizzes: [
            { id: 3, title: "Trigonometry Quiz 1", score: null, total: 100 }
          ]
        }
      }
    ]
  });

  const [selectedChapter, setSelectedChapter] = useState(subjectData.chapters[0]);

  const handleChapterClick = (chapter) => {
    setSelectedChapter(chapter);
  };

  const toggleCompletion = (chapterId) => {
    // In a real app, this would update the backend
    alert(`Toggled completion for chapter ${chapterId}`);
  };

  return (
    <div className="subject-detail-section">
      <div className="subject-container">
        <div className="subject-header">
          <button className="back-btn" onClick={() => navigate('/student-courses')}>
            ← Back to My Classes
          </button>
          <div className="subject-info">
            <h1>{subjectData.title}</h1>
            <p>Teacher: {subjectData.teacher}</p>
            <div className="overall-progress">
              <span>Overall Progress: {subjectData.progress}%</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${subjectData.progress}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="subject-content">
          {/* Chapters List */}
          <div className="chapters-sidebar">
            <h3>Chapters</h3>
            <div className="chapters-list">
              {subjectData.chapters.map((chapter) => (
                <div
                  key={chapter.id}
                  className={`chapter-item ${selectedChapter.id === chapter.id ? 'active' : ''}`}
                  onClick={() => handleChapterClick(chapter)}
                >
                  <div className="chapter-header">
                    <h4>{chapter.title}</h4>
                    <button
                      className={`completion-toggle ${chapter.completed ? 'completed' : 'incomplete'}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCompletion(chapter.id);
                      }}
                    >
                      {chapter.completed ? '✓' : '○'}
                    </button>
                  </div>
                  <div className="chapter-progress">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${chapter.progress}%` }}></div>
                    </div>
                    <span>{chapter.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chapter Content */}
          <div className="chapter-content">
            <div className="content-header">
              <h2>{selectedChapter.title}</h2>
              <div className="chapter-progress-large">
                <span>Progress: {selectedChapter.progress}%</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${selectedChapter.progress}%` }}></div>
                </div>
              </div>
            </div>

            <div className="content-sections">
              {/* Video Section */}
              <div className="content-section">
                <h3>Video Lesson</h3>
                <div className="video-container">
                  <video controls>
                    <source src={selectedChapter.content.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>

              {/* Notes Section */}
              <div className="content-section">
                <h3>Study Notes</h3>
                <div className="notes-content">
                  <p>{selectedChapter.content.notes}</p>
                  <button className="download-btn">Download PDF Notes</button>
                </div>
              </div>

              {/* Assignments Section */}
              <div className="content-section">
                <h3>Assignments</h3>
                <div className="assignments-list">
                  {selectedChapter.content.assignments.map((assignment) => (
                    <div key={assignment.id} className="assignment-item">
                      <div className="assignment-info">
                        <h4>{assignment.title}</h4>
                        <p>Due: {assignment.dueDate}</p>
                      </div>
                      <div className="assignment-status">
                        <span className={`status ${assignment.status}`}>{assignment.status}</span>
                        {assignment.status === 'pending' && (
                          <button className="submit-btn">Submit Assignment</button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quizzes Section */}
              <div className="content-section">
                <h3>Quizzes</h3>
                <div className="quizzes-list">
                  {selectedChapter.content.quizzes.map((quiz) => (
                    <div key={quiz.id} className="quiz-item">
                      <div className="quiz-info">
                        <h4>{quiz.title}</h4>
                        {quiz.score !== null ? (
                          <p>Score: {quiz.score}/{quiz.total}</p>
                        ) : (
                          <p>Not attempted</p>
                        )}
                      </div>
                      <div className="quiz-actions">
                        {quiz.score === null ? (
                          <button className="take-quiz-btn">Take Quiz</button>
                        ) : (
                          <button className="review-quiz-btn">Review Quiz</button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectDetail;

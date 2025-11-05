import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentTest.css';

const StudentTest = () => {
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const [studentAnswers, setStudentAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("auth")) || "";
    const userType = localStorage.getItem('userType');
    if (token === "" || userType !== 'student') {
      navigate('/login');
    } else {
      // Mock data for available tests
      const mockTests = [
        {
          id: 1,
          title: 'Algebra Test',
          classNo: 'Class 10',
          subject: 'Mathematics',
          questions: [
            { id: 1, question: 'What is 2 + 2?', options: ['3', '4', '5', '6'], correctAnswer: '4', type: 'multiple-choice' },
            { id: 2, question: 'Solve for x: 2x = 10', options: [], correctAnswer: '5', type: 'short-answer' }
          ],
          autoCheckEnabled: true
        },
        {
          id: 2,
          title: 'Physics Quiz',
          classNo: 'Class 11',
          subject: 'Physics',
          questions: [
            { id: 1, question: 'What is Newton\'s First Law?', options: ['F=ma', 'An object at rest stays at rest', 'Action-Reaction', 'Gravity'], correctAnswer: 'An object at rest stays at rest', type: 'multiple-choice' }
          ],
          autoCheckEnabled: true
        }
      ];
      setTests(mockTests);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('userType');
    navigate('/login');
  };

  const handleAnswerChange = (questionId, answer) => {
    setStudentAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmitTest = () => {
    if (selectedTest && selectedTest.autoCheckEnabled) {
      let correctAnswers = 0;
      selectedTest.questions.forEach(question => {
        if (studentAnswers[question.id] === question.correctAnswer) {
          correctAnswers++;
        }
      });
      setScore(correctAnswers);
      setSubmitted(true);
    }
  };

  const getScoreColor = () => {
    const percentage = (score / selectedTest.questions.length) * 100;
    if (percentage >= 80) return '#28a745';
    if (percentage >= 60) return '#ffc107';
    return '#dc3545';
  };

  return (
    <div className="student-test">
      <div className="st-test-page-header">
       <h1>Take Tests</h1>
        <p>Attempt and review your test results</p>
      </div>

      {/* Main Content */}
      <div className="st-student-test-body">

        {!selectedTest ? (
          <div className="st-tests-list">
            <h2>Available Tests</h2>
            {tests.map(test => (
              <div key={test.id} className="st-test-card">
                <h3>{test.title}</h3>
                <p><strong>Class:</strong> {test.classNo}</p>
                <p><strong>Subject:</strong> {test.subject}</p>
                <p><strong>Questions:</strong> {test.questions.length}</p>
                <button onClick={() => setSelectedTest(test)}>Take Test</button>
              </div>
            ))}
          </div>
        ) : !submitted ? (
          <div className="st-test-taking">
            <h2>{selectedTest.title}</h2>
            <p><strong>Class:</strong> {selectedTest.classNo} | <strong>Subject:</strong> {selectedTest.subject}</p>

            <div className="st-questions-section">
              {selectedTest.questions.map((question, index) => (
                <div key={question.id} className="question-item">
                  <h4>Question {index + 1}: {question.question}</h4>

                  {question.type === 'multiple-choice' ? (
                    <div className="st-options-section">
                      {question.options.map((option, optIndex) => (
                        <label key={optIndex} className="st-option-label">
                          <input
                            type="radio"
                            name={`question-${question.id}`}
                            value={option}
                            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                            checked={studentAnswers[question.id] === option}
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  ) : (
                    <div className="st-short-answer-section">
                      <input
                        type="text"
                        placeholder="Your answer"
                        value={studentAnswers[question.id] || ''}
                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button onClick={handleSubmitTest} className="st-submit-btn">Submit Test</button>
            <button onClick={() => setSelectedTest(null)} className="st-back-btn">Back to Tests</button>
          </div>
        ) : (
          <div className="st-test-results">
            <h2>Test Results</h2>
            <div className="st-score-display" style={{ color: getScoreColor() }}>
              <h3>Score: {score}/{selectedTest.questions.length}</h3>
              <p>Percentage: {((score / selectedTest.questions.length) * 100).toFixed(1)}%</p>
            </div>

            <div className="st-answers-review">
              <h3>Review Your Answers</h3>
              {selectedTest.questions.map((question, index) => (
                <div key={question.id} className="st-answer-review-item">
                  <h4>Question {index + 1}: {question.question}</h4>
                  <p><strong>Your Answer:</strong> {studentAnswers[question.id] || 'Not answered'}</p>
                  <p><strong>Correct Answer:</strong> {question.correctAnswer}</p>
                  <div className={`st-result-indicator ${studentAnswers[question.id] === question.correctAnswer ? 'correct' : 'incorrect'}`}>
                    {studentAnswers[question.id] === question.correctAnswer ? '✓ Correct' : '✗ Incorrect'}
                  </div>
                </div>
              ))}
            </div>

            <button onClick={() => {
              setSelectedTest(null);
              setSubmitted(false);
              setStudentAnswers({});
              setScore(0);
            }} className="st-back-btn">Back to Tests</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentTest;

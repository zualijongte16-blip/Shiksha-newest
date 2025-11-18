import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ClassTest.css';

const ClassTest = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [tests, setTests] = useState({});
  const [selectedClass, setSelectedClass] = useState('');
  const [newTest, setNewTest] = useState({ title: '', questions: [] });
  const [editingTest, setEditingTest] = useState(null);
  const [editingTestData, setEditingTestData] = useState({ title: '', questions: [] });
  const [showAnswers, setShowAnswers] = useState({});

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("auth")) || "";
    const userType = localStorage.getItem('userType');
    if (token === "" || userType !== 'teacher') {
      navigate('/login');
    } else {
      // Mock data for classes taught by the teacher
      const mockClasses = [
        { id: 1, classNo: 'Class 10', subject: 'Mathematics' },
        { id: 2, classNo: 'Class 11', subject: 'Physics' },
        { id: 3, classNo: 'Class 9', subject: 'English' },
      ];
      setClasses(mockClasses);

      // Mock data for tests
      const mockTests = {
        'Class 10': [
          {
            id: 1,
            title: 'Algebra Test',
            questions: [
              { id: 1, question: 'What is 2 + 2?', options: ['3', '4', '5', '6'], correctAnswer: '4', type: 'multiple-choice' },
              { id: 2, question: 'Solve for x: 2x = 10', options: [], correctAnswer: '5', type: 'short-answer' }
            ],
            autoCheckEnabled: false
          },
        ],
        'Class 11': [
          {
            id: 2,
            title: 'Physics Quiz',
            questions: [
              { id: 1, question: 'What is Newton\'s First Law?', options: ['F=ma', 'An object at rest stays at rest', 'Action-Reaction', 'Gravity'], correctAnswer: 'An object at rest stays at rest', type: 'multiple-choice' }
            ],
            autoCheckEnabled: true
          },
        ],
        'Class 9': [],
      };
      setTests(mockTests);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('userType');
    navigate('/login');
  };

  const handleAddTest = (classNo) => {
    if (newTest.title && newTest.questions.length > 0) {
      const newT = {
        id: Date.now(),
        title: newTest.title,
        questions: newTest.questions,
        autoCheckEnabled: false
      };
      setTests(prev => ({
        ...prev,
        [classNo]: [...(prev[classNo] || []), newT],
      }));
      setNewTest({ title: '', questions: [] });
      setSelectedClass('');
    }
  };

  const handleEditTest = (classNo, testId, newTitle, newQuestions) => {
    setTests(prev => ({
      ...prev,
      [classNo]: prev[classNo].map(test => test.id === testId ? { ...test, title: newTitle, questions: newQuestions } : test),
    }));
    setEditingTest(null);
  };

  const handleRemoveTest = (classNo, testId) => {
    setTests(prev => ({
      ...prev,
      [classNo]: prev[classNo].filter(test => test.id !== testId),
    }));
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      question: '',
      options: ['', '', '', ''],
      correctAnswer: '',
      type: 'multiple-choice'
    };
    setNewTest(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }));
  };

  const handleQuestionChange = (index, field, value) => {
    setNewTest(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) =>
        i === index ? { ...q, [field]: value } : q
      )
    }));
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    setNewTest(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) =>
        i === questionIndex
          ? { ...q, options: q.options.map((opt, j) => j === optionIndex ? value : opt) }
          : q
      )
    }));
  };

  const toggleAutoCheck = (classNo, testId) => {
    setTests(prev => ({
      ...prev,
      [classNo]: prev[classNo].map(test =>
        test.id === testId ? { ...test, autoCheckEnabled: !test.autoCheckEnabled } : test
      )
    }));
  };

  const toggleShowAnswers = (testId) => {
    setShowAnswers(prev => ({
      ...prev,
      [testId]: !prev[testId]
    }));
  };

  return (
    <div className="class-test">
      {/* Page Header */}
      <div className="C-T-page-header">
        <h1>Class Test</h1>
      </div>

      {/* Main Content */}
      <div className="C-T-class-test-body">
        <div className="C-T-classes-list">
          {classes.map(cls => (
            <div key={cls.id} className="C-T-class-card">
              <h3>{cls.classNo} - {cls.subject}</h3>
              <div className="C-T-tests-list">
                <h4>Tests</h4>
                {tests[cls.classNo]?.map(test => (
                  <div key={test.id} className="C-T-test-item">
                    {editingTest === test.id ? (
                      <div className="C-T-edit-section">
                        <input
                          type="text"
                          value={editingTestData.title}
                          onChange={(e) => setEditingTestData({ ...editingTestData, title: e.target.value })}
                          placeholder="Test Title"
                        />
                        <div className="C-T-questions-editor">
                          {editingTestData.questions.map((q, qIndex) => (
                            <div key={q.id} className="C-T-question-editor">
                              <input
                                type="text"
                                value={q.question}
                                onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)}
                                placeholder="Question"
                              />
                              <select
                                value={q.type}
                                onChange={(e) => handleQuestionChange(qIndex, 'type', e.target.value)}
                              >
                                <option value="multiple-choice">Multiple Choice</option>
                                <option value="short-answer">Short Answer</option>
                              </select>
                              {q.type === 'multiple-choice' && (
                                <div className="C-T-options-editor">
                                  {q.options.map((opt, optIndex) => (
                                    <input
                                      key={optIndex}
                                      type="text"
                                      value={opt}
                                      onChange={(e) => handleOptionChange(qIndex, optIndex, e.target.value)}
                                      placeholder={`Option ${optIndex + 1}`}
                                    />
                                  ))}
                                </div>
                              )}
                              <input
                                type="text"
                                value={q.correctAnswer}
                                onChange={(e) => handleQuestionChange(qIndex, 'correctAnswer', e.target.value)}
                                placeholder="Correct Answer"
                              />
                            </div>
                          ))}
                        </div>
                        <button onClick={() => {
                          handleEditTest(cls.classNo, test.id, editingTestData.title, editingTestData.questions);
                          setEditingTestData({ title: '', questions: [] });
                        }}>Save</button>
                        <button onClick={() => {
                          setEditingTest(null);
                          setEditingTestData({ title: '', questions: [] });
                        }}>Cancel</button>
                      </div>
                    ) : (
                      <div>
                        <span>{test.title} ({test.questions.length} questions)</span>
                        <div className="C-T-test-controls">
                          <button onClick={() => toggleAutoCheck(cls.classNo, test.id)}>
                            Auto Check: {test.autoCheckEnabled ? 'ON' : 'OFF'}
                          </button>
                          <button onClick={() => toggleShowAnswers(test.id)}>
                            {showAnswers[test.id] ? 'Hide Answers' : 'Show Answers'}
                          </button>
                        </div>
                        {showAnswers[test.id] && (
                          <div className="C-T-answers-preview">
                            {test.questions.map((q, index) => (
                              <div key={q.id} className="C-T-answer-item">
                                <p><strong>Q{index + 1}:</strong> {q.question}</p>
                                <p><strong>Answer:</strong> {q.correctAnswer}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                    <div className="C-T-test-actions">
                      <button onClick={() => {
                        setEditingTest(test.id);
                        setEditingTestData({ title: test.title, questions: [...test.questions] });
                      }}>Edit</button>
                      <button onClick={() => handleRemoveTest(cls.classNo, test.id)}>Remove</button>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => setSelectedClass(cls.classNo)}>Add Test</button>
              {selectedClass === cls.classNo && (
                <div className="C-T-test-section">
                  <input
                    type="text"
                    placeholder="Test Title"
                    value={newTest.title}
                    onChange={(e) => setNewTest({ ...newTest, title: e.target.value })}
                  />
                  <div className="C-T-questions-builder">
                    {newTest.questions.map((q, index) => (
                      <div key={q.id} className="C-T-question-builder">
                        <input
                          type="text"
                          value={q.question}
                          onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                          placeholder="Question"
                        />
                        <select
                          value={q.type}
                          onChange={(e) => handleQuestionChange(index, 'type', e.target.value)}
                        >
                          <option value="multiple-choice">Multiple Choice</option>
                          <option value="short-answer">Short Answer</option>
                        </select>
                        {q.type === 'multiple-choice' && (
                          <div className="C-T-options-builder">
                            {q.options.map((opt, optIndex) => (
                              <input
                                key={optIndex}
                                type="text"
                                value={opt}
                                onChange={(e) => handleOptionChange(index, optIndex, e.target.value)}
                                placeholder={`Option ${optIndex + 1}`}
                              />
                            ))}
                          </div>
                        )}
                        <input
                          type="text"
                          value={q.correctAnswer}
                          onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)}
                          placeholder="Correct Answer"
                        />
                      </div>
                    ))}
                    <button onClick={handleAddQuestion}>Add Question</button>
                  </div>
                  <button onClick={() => handleAddTest(cls.classNo)}>Create Test</button>
                  <button onClick={() => setSelectedClass('')}>Cancel</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassTest;

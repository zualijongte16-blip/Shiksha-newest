import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TeacherAssignments.css';

const TeacherAssignments = () => {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: 'Algebra Homework',
      subject: 'Mathematics',
      class: 'Class 10',
      dueDate: '2023-10-20',
      assignedTo: 'Class 10',
      submissions: '15/20',
      avgScore: '85%',
      status: 'Active',
    },
    {
      id: 2,
      title: 'Physics Lab Report',
      subject: 'Physics',
      class: 'Class 11',
      dueDate: '2023-10-18',
      assignedTo: 'Class 11',
      submissions: '18/20',
      avgScore: '78%',
      status: 'Active',
    },
  ]);

  const [filteredAssignments, setFilteredAssignments] = useState(assignments);
  const [filterSubject, setFilterSubject] = useState('All');
  const [filterClass, setFilterClass] = useState('All');
  const [filterDueDate, setFilterDueDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSubmissionsModal, setShowSubmissionsModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    subject: '',
    class: '',
    topic: '',
    instructions: '',
    attachments: [],
    links: '',
    marks: '',
    dueDate: '',
    allowLate: false,
    solutionFile: null,
    assignTo: '',
  });

  const [submissions] = useState([
    { id: 1, studentName: 'Alice Johnson', submittedOn: '2023-10-15', file: 'algebra_homework.pdf', marks: '90', feedback: 'Excellent work!', status: 'Graded' },
    { id: 2, studentName: 'Bob Smith', submittedOn: '2023-10-16', file: 'algebra_homework.pdf', marks: '', feedback: '', status: 'Pending' },
  ]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("auth")) || "";
    const userType = localStorage.getItem('userType');
    if (token === "" || userType !== 'teacher') {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    let filtered = assignments.filter(assignment => {
      return (
        (filterSubject === 'All' || assignment.subject === filterSubject) &&
        (filterClass === 'All' || assignment.class === filterClass) &&
        (filterDueDate === '' || assignment.dueDate === filterDueDate) &&
        (searchTerm === '' || assignment.title.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });
    setFilteredAssignments(filtered);
  }, [assignments, filterSubject, filterClass, filterDueDate, searchTerm]);

  const handleCreateAssignment = () => {
    const assignment = {
      id: assignments.length + 1,
      title: newAssignment.title,
      subject: newAssignment.subject,
      class: newAssignment.class,
      dueDate: newAssignment.dueDate,
      assignedTo: newAssignment.assignTo,
      submissions: '0/20',
      avgScore: 'N/A',
      status: 'Active',
    };
    setAssignments([...assignments, assignment]);
    setShowCreateModal(false);
    setNewAssignment({
      title: '',
      subject: '',
      class: '',
      topic: '',
      instructions: '',
      attachments: [],
      links: '',
      marks: '',
      dueDate: '',
      allowLate: false,
      solutionFile: null,
      assignTo: '',
    });
    alert('Assignment created and students notified!');
  };

  const handleDelete = (id) => {
    setAssignments(assignments.filter(a => a.id !== id));
  };

  const handleGrade = (submissionId, marks, feedback) => {
    // Mock grading
    alert(`Graded submission ${submissionId} with ${marks} marks.`);
  };

  return (
    <div className="teacher-assignments-page">
      <div className="ta-assignments-header">
        <h1>Assignments & Homework</h1>
        <div className="ta-header-buttons">
          <button className="ta-btn-create" onClick={() => setShowCreateModal(true)}>Create Assignment</button>
          <button className="ta-btn-view" onClick={() => setShowSubmissionsModal(true)}>View Submissions</button>
          <button className="ta-btn-analytics" onClick={() => setShowAnalyticsModal(true)}>Analytics</button>
        </div>
      </div>

      <div className="ta-filters-section">
        <select value={filterSubject} onChange={(e) => setFilterSubject(e.target.value)}>
          <option value="All">All Subjects</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Physics">Physics</option>
          <option value="English">English</option>
        </select>
        <select value={filterClass} onChange={(e) => setFilterClass(e.target.value)}>
          <option value="All">All Classes</option>
          <option value="Class 10">Class 8</option>
          <option value="Class 10">Class 9</option>
          <option value="Class 10">Class 10</option>
          <option value="Class 10">Class 11</option>
          <option value="Class 11">Class 12</option>
        </select>
        <input type="date" value={filterDueDate} onChange={(e) => setFilterDueDate(e.target.value)} />
        <input type="text" placeholder="Search assignments..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>

      <div className="ta-assignments-content">
        {filteredAssignments.length === 0 ? (
          <div className="ta-empty-state">
            <p>No assignments found. Create your first assignment!</p>
          </div>
        ) : (
          <div className="ta-assignments-table">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Subject</th>
                  <th>Class</th>
                  <th>Due Date</th>
                  <th>Assigned To</th>
                  <th>Submissions</th>
                  <th>Avg Score</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssignments.map(assignment => (
                  <tr key={assignment.id}>
                    <td>{assignment.title}</td>
                    <td>{assignment.subject}</td>
                    <td>{assignment.class}</td>
                    <td>{assignment.dueDate}</td>
                    <td>{assignment.assignedTo}</td>
                    <td>{assignment.submissions}</td>
                    <td>{assignment.avgScore}</td>
                    <td>
                      <button onClick={() => setSelectedAssignment(assignment)}>View</button>
                      <button>Edit</button>
                      <button onClick={() => handleDelete(assignment.id)}>Delete</button>
                      <button>Grade</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create Assignment Modal */}
      {showCreateModal && (
        <div className="ta-modal-overlay">
          <div className="ta-modal-content">
            <h2>Create New Assignment</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleCreateAssignment(); }}>
              <input type="text" placeholder="Title" value={newAssignment.title} onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})} required />
              <select value={newAssignment.subject} onChange={(e) => setNewAssignment({...newAssignment, subject: e.target.value})} required>
                <option value="">Select Subject</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
              </select>
              <select value={newAssignment.class} onChange={(e) => setNewAssignment({...newAssignment, class: e.target.value})} required>
                <option value="">Select Class</option>
                <option value="Class 10">Class 8</option>
                <option value="Class 10">Class 9</option>
                <option value="Class 10">Class 10</option>
                <option value="Class 10">Class 11</option>
                <option value="Class 11">Class 12</option>
              </select>
              <input type="text" placeholder="Topic" value={newAssignment.topic} onChange={(e) => setNewAssignment({...newAssignment, topic: e.target.value})} />
              <textarea placeholder="Instructions" value={newAssignment.instructions} onChange={(e) => setNewAssignment({...newAssignment, instructions: e.target.value})} />
              <input type="file" multiple onChange={(e) => setNewAssignment({...newAssignment, attachments: Array.from(e.target.files)})} />
              <input type="text" placeholder="Links" value={newAssignment.links} onChange={(e) => setNewAssignment({...newAssignment, links: e.target.value})} />
              <input type="number" placeholder="Marks" value={newAssignment.marks} onChange={(e) => setNewAssignment({...newAssignment, marks: e.target.value})} />
              <input type="date" value={newAssignment.dueDate} onChange={(e) => setNewAssignment({...newAssignment, dueDate: e.target.value})} required />
              <label><input type="checkbox" checked={newAssignment.allowLate} onChange={(e) => setNewAssignment({...newAssignment, allowLate: e.target.checked})} /> Allow Late Submissions</label>
              <input type="file" onChange={(e) => setNewAssignment({...newAssignment, solutionFile: e.target.files[0]})} />
              <select value={newAssignment.assignTo} onChange={(e) => setNewAssignment({...newAssignment, assignTo: e.target.value})} required>
                <option value="">Assign To</option>
                <option value="">Select Class</option>
                <option value="Class 10">Class 8</option>
                <option value="Class 10">Class 9</option>
                <option value="Class 10">Class 10</option>
                <option value="Class 10">Class 11</option>
                <option value="Class 11">Class 12</option>
              </select>
              <button type="submit">Create Assignment</button>
              <button type="button" onClick={() => setShowCreateModal(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {/* View Submissions Modal */}
      {showSubmissionsModal && (
        <div className="ta-modal-overlay">
          <div className="ta-modal-content">
            <h2>View Submissions</h2>
            <table>
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Submitted On</th>
                  <th>File</th>
                  <th>Marks</th>
                  <th>Feedback</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map(sub => (
                  <tr key={sub.id}>
                    <td>{sub.studentName}</td>
                    <td>{sub.submittedOn}</td>
                    <td>{sub.file}</td>
                    <td><input type="number" value={sub.marks} onChange={(e) => {}} /></td>
                    <td><textarea value={sub.feedback} onChange={(e) => {}} /></td>
                    <td>{sub.status}</td>
                    <td><button onClick={() => handleGrade(sub.id, sub.marks, sub.feedback)}>Grade</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button>Download All as ZIP</button>
            <button onClick={() => setShowSubmissionsModal(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Analytics Modal */}
      {showAnalyticsModal && (
        <div className="ta-modal-overlay">
          <div className="ta-modal-content">
            <h2>Analytics</h2>
            <div className="ta-analytics-charts">
              <div className="ta-chart">Completion Rate: 75%</div>
              <div className="ta-chart">Average Score: 82%</div>
              <div className="ta-chart">Late Submissions: 10%</div>
              <div className="ta-chart">Most Active Class: Class 10</div>
            </div>
            <div className="ta-summary-stats">
              <p>Total Assignments: {assignments.length}</p>
              <p>Avg Score: 80%</p>
              <p>Submission Rate: 85%</p>
            </div>
            <button onClick={() => setShowAnalyticsModal(false)}>Close</button>
          </div>
        </div>
      )}

      {/* FAB for mobile */}
      <button className="ta-fab" onClick={() => setShowCreateModal(true)}>+</button>
    </div>
  );
};

export default TeacherAssignments;

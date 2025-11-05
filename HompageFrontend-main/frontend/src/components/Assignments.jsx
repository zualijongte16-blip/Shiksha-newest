import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Assignments.css';

const Assignments = () => {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      name: "Algebra Homework",
      subject: "Mathematics",
      dueDate: "2023-10-15",
      status: "Pending",
      submitted: false,
      late: false,
      feedback: null,
      file: null,
    },
    {
      id: 2,
      name: "Physics Lab Report",
      subject: "Science",
      dueDate: "2023-10-16",
      status: "Submitted",
      submitted: true,
      late: false,
      feedback: "Good work on the calculations. Please improve the conclusion.",
      file: "physics_lab_report.pdf",
    },
    {
      id: 3,
      name: "Essay on Literature",
      subject: "English",
      dueDate: "2023-10-18",
      status: "Graded",
      submitted: true,
      late: false,
      feedback: "Excellent analysis. Well-structured essay with strong arguments.",
      file: "literature_essay.pdf",
    },
    {
      id: 4,
      name: "History Project",
      subject: "Social Studies",
      dueDate: "2023-10-10",
      status: "Late Submission",
      submitted: true,
      late: true,
      feedback: "Project submitted late. Content is good but needs more sources.",
      file: "history_project.pdf",
    },
  ]);

  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("auth")) || "";
    const userType = localStorage.getItem('userType');
    if (token === "" || userType !== 'student') {
      navigate('/login');
    }
  }, [navigate]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleSubmit = (assignmentId) => {
    if (uploadedFile) {
      const updatedAssignments = assignments.map(assignment => {
        if (assignment.id === assignmentId) {
          const isLate = new Date() > new Date(assignment.dueDate);
          return {
            ...assignment,
            status: isLate ? "Late Submission" : "Submitted",
            submitted: true,
            late: isLate,
            file: uploadedFile.name,
          };
        }
        return assignment;
      });
      setAssignments(updatedAssignments);
      setUploadedFile(null);
      setSelectedAssignment(null);
      alert("Assignment submitted successfully!");
    } else {
      alert("Please select a file to upload.");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return '#fff3cd';
      case 'Submitted': return '#d1ecf1';
      case 'Graded': return '#d4edda';
      case 'Late Submission': return '#f8d7da';
      default: return '#f8f9fa';
    }
  };

  return (
    <div className="a-assignments-page">
      <div className="a-assignments-page-header">
        <h1>Assignments</h1>
        <p>Submit your work and review teacher feedback</p>
      </div>

      <div className="a-assignments-content">
        <table className="a-assignments-table">
          <thead>
            <tr>
              <th>Assignment Name</th>
              <th>Subject</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map(assignment => (
              <tr key={assignment.id}>
                <td>{assignment.name}</td>
                <td>{assignment.subject}</td>
                <td>{assignment.dueDate}</td>
                <td>
                  <span
                    className="a-status-badge"
                    style={{ backgroundColor: getStatusColor(assignment.status) }}
                  >
                    {assignment.status}
                  </span>
                </td>
                <td>
                  {!assignment.submitted ? (
                    <button
                      className="a-submit-btn"
                      onClick={() => setSelectedAssignment(assignment)}
                    >
                      Submit
                    </button>
                  ) : (
                    <button
                      className="a-view-btn"
                      onClick={() => setSelectedAssignment(assignment)}
                    >
                      View Details
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedAssignment && (
          <div className="a-assignment-details-modal">
            <div className="a-modal-content">
              <h2>{selectedAssignment.name}</h2>
              <p><strong>Subject:</strong> {selectedAssignment.subject}</p>
              <p><strong>Due Date:</strong> {selectedAssignment.dueDate}</p>
              <p><strong>Status:</strong> {selectedAssignment.status}</p>

              {selectedAssignment.feedback && (
                <div className="a-feedback-section">
                  <h3>Teacher Feedback</h3>
                  <p>{selectedAssignment.feedback}</p>
                </div>
              )}

              {!selectedAssignment.submitted ? (
                <div className="a-upload-section">
                  <h3>Submit Assignment</h3>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileUpload}
                    className="a-file-input"
                  />
                  {uploadedFile && (
                    <div className="a-file-preview">
                      <p><strong>Selected File:</strong> {uploadedFile.name}</p>
                      <p><strong>Size:</strong> {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  )}
                  <button
                    className="a-submit-assignment-btn"
                    onClick={() => handleSubmit(selectedAssignment.id)}
                  >
                    Submit Assignment
                  </button>
                </div>
              ) : (
                selectedAssignment.file && (
                  <div className="a-submitted-file">
                    <h3>Submitted File</h3>
                    <p>{selectedAssignment.file}</p>
                  </div>
                )
              )}

              <button
                className="a-close-modal-btn"
                onClick={() => setSelectedAssignment(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Assignments;
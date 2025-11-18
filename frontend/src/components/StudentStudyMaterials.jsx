import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentStudyMaterials.css';

const StudentStudyMaterials = () => {
  const navigate = useNavigate();
  const [materials, setMaterials] = useState([
    {
      id: 1,
      name: "Algebra Notes",
      subject: "Mathematics",
      classNo: "Class 10",
      file: "algebra.pdf",
      uploadedDate: "02-11-2025",
    },
    {
      id: 2,
      name: "Geometry Worksheet",
      subject: "Mathematics",
      classNo: "Class 10",
      file: "geometry.pdf",
      uploadedDate: "02-11-2025",
    },
    {
      id: 3,
      name: "Physics Laws",
      subject: "Physics",
      classNo: "Class 11",
      file: "physics.pdf",
      uploadedDate: "02-11-2025",
    },
    {
      id: 4,
      name: "English Grammar",
      subject: "English",
      classNo: "Class 9",
      file: "grammar.pdf",
      uploadedDate: "02-11-2025",
    },
  ]);

  const [selectedMaterial, setSelectedMaterial] = useState(null);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("auth")) || "";
    const userType = localStorage.getItem('userType');
    if (token === "" || userType !== 'student') {
      navigate('/login');
    }
  }, [navigate]);

  const handleDownload = (file) => {
    // Mock download functionality
    alert(`Downloading ${file}`);
    // In a real app, this would trigger a file download
  };

  return (
    <div className="ssm-study-materials-page">
      <div className="ssm-study-materials-page-header">
        <h1>Study Materials</h1>
        <p>Access and download study materials for your classes</p>
      </div>

      <div className="ssm-study-materials-content">
        <table className="ssm-study-materials-table">
          <thead>
            <tr>
              <th>Material Name</th>
              <th>Subject</th>
              <th>Class</th>
              <th>Uploaded Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {materials.map(material => (
              <tr key={material.id}>
                <td>{material.name}</td>
                <td>{material.subject}</td>
                <td>{material.classNo}</td>
                <td>{material.uploadedDate}</td>
                <td>
                  <button
                    className="ssm-download-btn"
                    onClick={() => handleDownload(material.file)}
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedMaterial && (
          <div className="ssm-material-details-modal">
            <div className="ssm-modal-content">
              <h2>{selectedMaterial.name}</h2>
              <p><strong>Subject:</strong> {selectedMaterial.subject}</p>
              <p><strong>Class:</strong> {selectedMaterial.classNo}</p>
              <p><strong>Uploaded Date:</strong> {selectedMaterial.uploadedDate}</p>

              <div className="ssm-download-section">
                <h3>Download Material</h3>
                <p><strong>File:</strong> {selectedMaterial.file}</p>
                <button
                  className="ssm-download-material-btn"
                  onClick={() => handleDownload(selectedMaterial.file)}
                >
                  Download File
                </button>
              </div>

              <button
                className="ssm-close-modal-btn"
                onClick={() => setSelectedMaterial(null)}
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

export { StudentStudyMaterials };

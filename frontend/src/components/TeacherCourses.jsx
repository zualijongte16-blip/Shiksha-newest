import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TeacherCourses.css';

const TeacherCourses = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [materials, setMaterials] = useState({});
  const [selectedClass, setSelectedClass] = useState('');
  const [newMaterial, setNewMaterial] = useState({ title: '', file: null });
  const [editingMaterial, setEditingMaterial] = useState(null);
  const [editingMaterialData, setEditingMaterialData] = useState({ title: '', file: null });

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

      // Mock data for materials
      const mockMaterials = {
        'Class 10': [
          { id: 1, title: 'Algebra Notes', file: 'algebra.pdf' },
          { id: 2, title: 'Geometry Worksheet', file: 'geometry.pdf' },
        ],
        'Class 11': [
          { id: 3, title: 'Physics Laws', file: 'physics.pdf' },
        ],
        'Class 9': [
          { id: 4, title: 'English Grammar', file: 'grammar.pdf' },
        ],
      };
      setMaterials(mockMaterials);


    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('userType');
    navigate('/login');
  };

  const handleUpload = (classNo) => {
    if (newMaterial.title && newMaterial.file) {
      const newMat = {
        id: Date.now(),
        title: newMaterial.title,
        file: newMaterial.file.name,
      };
      setMaterials(prev => ({
        ...prev,
        [classNo]: [...(prev[classNo] || []), newMat],
      }));
      setNewMaterial({ title: '', file: null });
      setSelectedClass('');
    }
  };

  const handleEdit = (classNo, materialId, newTitle, newFile) => {
    setMaterials(prev => ({
      ...prev,
      [classNo]: prev[classNo].map(mat => mat.id === materialId ? { ...mat, title: newTitle, file: newFile || mat.file } : mat),
    }));
    setEditingMaterial(null);
  };

  const handleRemove = (classNo, materialId) => {
    setMaterials(prev => ({
      ...prev,
      [classNo]: prev[classNo].filter(mat => mat.id !== materialId),
    }));
  };



  return (
    <div className="teacher-courses">
      {/* Page Header */}
      <div className="T-C-page-header">
        <h1>Study Materials</h1>
      </div>

      {/* Main Content */}
      <div className="T-C-teacher-courses-body">
        <div className="T-C-classes-list">
          {classes.map(cls => (
            <div key={cls.id} className="T-C-class-card">
              <h3>{cls.classNo} - {cls.subject}</h3>
              <div className="T-C-materials-list">
                {materials[cls.classNo]?.map(mat => (
                  <div key={mat.id} className="T-C-material-item">
                    {editingMaterial === mat.id ? (
                      <div className="T-C-edit-section">
                        <input
                          type="text"
                          value={editingMaterialData.title}
                          onChange={(e) => setEditingMaterialData({ ...editingMaterialData, title: e.target.value })}
                        />
                        <input
                          type="file"
                          onChange={(e) => setEditingMaterialData({ ...editingMaterialData, file: e.target.files[0] })}
                        />
                        <button onClick={() => {
                          handleEdit(cls.classNo, mat.id, editingMaterialData.title, editingMaterialData.file);
                          setEditingMaterialData({ title: '', file: null });
                        }}>Save</button>
                        <button onClick={() => {
                          setEditingMaterial(null);
                          setEditingMaterialData({ title: '', file: null });
                        }}>Cancel</button>
                      </div>
                    ) : (
                      <span>{mat.title}</span>
                    )}
                    <div className="T-C-material-actions">
                      <button onClick={() => {
                        setEditingMaterial(mat.id);
                        setEditingMaterialData({ title: mat.title, file: null });
                      }}>Edit</button>
                      <button onClick={() => handleRemove(cls.classNo, mat.id)}>Remove</button>
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={() => setSelectedClass(cls.classNo)}>Add Material</button>
              {selectedClass === cls.classNo && (
                <div className="T-C-upload-section">
                  <input
                    type="text"
                    placeholder="Material Title"
                    value={newMaterial.title}
                    onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })}
                  />
                  <input
                    type="file"
                    onChange={(e) => setNewMaterial({ ...newMaterial, file: e.target.files[0] })}
                  />
                  <button onClick={() => handleUpload(cls.classNo)}>Upload</button>
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

export default TeacherCourses;

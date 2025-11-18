import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Service from './components/Service';
import ContactPage from './components/ContactPage';
import About from './components/about';
import Footer from './components/Footer';
import Service2 from './components/Service2';
import About2 from './components/About2';
import Contact2 from './components/Contact2';
import Courses from './components/Courses';
import ClassDetail from './components/ClassDetail';
import CeoFounderTeam from './components/CeoFounderTeam';
import TeachersTeam from './components/TeachersTeam';
import DevelopersTeam from './components/DevelopersTeam';
import Teams from './components/Teams';
import VisionPage from './components/VisionPage';
import MissionPage from './components/MissionPage';
import ValuesPage from './components/ValuesPage';
import WhyChooseShikshaPage from './components/WhyChooseShikshaPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import './index.css';
import './App.css';

import StudentCourses from './components/StudentCourses';
import LiveRecordedClasses from './components/LiveRecordedClasses';
import TeacherLiveRecordedClasses from './components/TeacherLiveRecordedClasses';
import Assignments from './components/Assignments';
import Schedule from './components/Schedule';
import Calendar from './components/Calendar';
import TeacherCourses from './components/TeacherCourses';
import ClassTest from './components/ClassTest';
import StudentTest from './components/StudentTest';
import TeacherAssignments from './components/TeacherAssignments';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <div className="App">
      {location.pathname !== '/login' && location.pathname !== '/signup' && location.pathname !== '/student-dashboard' && location.pathname !== '/teacher-dashboard' && location.pathname !== '/student-courses' && location.pathname !== '/live-recorded' && location.pathname !== '/teacher-live-recorded' && location.pathname !== '/student-test' && location.pathname !== '/schedule' &&  location.pathname !== '/teacher-courses' && location.pathname !== '/class-test' && location.pathname !== '/teacher-assignments' && location.pathname !== '/assignments' && <Navbar onLoginClick={handleLoginClick} onSignupClick={handleSignupClick} />}
      <Routes>
        {/* Scrollable landing page */}
        <Route
          path="/"
          element={
            <>
              <Home />
              <Service />
              <About />
              <ContactPage />
              <Footer />
            </>
          }
        />

        {/* Standalone pages */}
        <Route path="/service" element={<><Service2 /><Footer /></>} />
        <Route path="/about" element={<><About2 /><Footer /></>} />
        <Route path="/contact" element={<><Contact2 /><Footer /></>} />
        <Route path="/teams" element={<><Teams /><Footer /></>} />

        {/* Student Courses page */}
        <Route path="/student-courses" element={<StudentCourses />} />

        {/* Courses & class detail pages using the same auth handlers */}
        <Route path="/courses" element={<Courses />} />
        <Route path="/class/:id" element={<ClassDetail />} />

        {/* Team pages */}
        <Route path="/team/ceo-founder" element={<CeoFounderTeam />} />
        <Route path="/team/teachers" element={<TeachersTeam />} />
        <Route path="/team/developers" element={<DevelopersTeam />} />

        {/* Vision page */}
        <Route path="/vision" element={<VisionPage />} />

        {/* Mission page */}
        <Route path="/mission" element={<MissionPage />} />

        {/* Values page */}
        <Route path="/values" element={<ValuesPage />} />

        {/* Why Choose Shiksha page */}
        <Route path="/why-choose-shiksha" element={<WhyChooseShikshaPage />} />

        {/* Auth pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Student Dashboard */}
        <Route path="/student-dashboard" element={<StudentDashboard />} />

        {/* Teacher Dashboard */}
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />

        {/* Live & Recorded Classes */}
        <Route path="/live-recorded" element={<LiveRecordedClasses />} />

        {/* Teacher Live & Recorded Classes */}
        <Route path="/teacher-live-recorded" element={<TeacherLiveRecordedClasses />} />

        {/* Teacher Assignments page */}
        <Route path="/teacher-assignments" element={<TeacherAssignments />} />
        
        {/* Student Test page */}
        <Route path="/student-test" element={<StudentTest />} />

        {/* Teacher Courses page */}
        <Route path="/teacher-courses" element={<TeacherCourses />} />

        {/* Class Test page */}
        <Route path="/class-test" element={<ClassTest />} />

        {/* Assignments */}
        <Route path="/assignments" element={<Assignments />} />

        {/* Schedule */}
        <Route path="/schedule" element={<Schedule />} />

        {/* Calendar */}
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </div>
  );
}

export default App;

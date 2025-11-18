import React, { useState, useEffect, useRef } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import AnimatedCharacter from './AnimatedCharacter';
import Logo from "../images/logo.png";
import GoogleSvg from "../images/icons8-google.svg";
import "./LoginPage.css";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student');
  // const buttonControls = useAnimationControls();
  const [ token, setToken ] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;

    if (email.length > 0 && password.length > 0) {
      if (userType === 'student') {
        // Bypass API for students, directly navigate
        localStorage.setItem('auth', JSON.stringify('dummy-token'));
        localStorage.setItem('userType', userType);
        toast.success("Login successful");
        navigate("/student-dashboard");
      } else if (userType === 'teacher') {
        // Bypass API for teachers, directly navigate
        localStorage.setItem('auth', JSON.stringify('dummy-teacher-token'));
        localStorage.setItem('userType', userType);
        toast.success("Login successful");
        navigate("/teacher-dashboard");
      } else {
        // For other user types, keep the API call (assuming backend is available)
        const formData = {
          email,
          password,
        };
        try {
          const response = await axios.post(
            "http://localhost:3000/api/v1/login",
            formData
          );
          localStorage.setItem('auth', JSON.stringify(response.data.token));
          localStorage.setItem('userType', userType);
          toast.success("Login successful");
          navigate("/dashboard");
        } catch (err) {
          console.log(err);
          toast.error(err.message);
        }
      }
    } else {
      toast.error("Please fill all inputs");
    }
  };



  // Button animation when fields are empty
  // useEffect(() => {
  //   if (email.trim() === '' || password.trim() === '') {
  //     buttonControls.start({
  //       x: [0, -10, 10, -10, 0],
  //       transition: { duration: 0.5, ease: 'easeInOut' },
  //     });
  //   } else {
  //     buttonControls.start({ x: 0 });
  //   }
  // }, [email, password, buttonControls]);

  useEffect(() => {
    if(token !== ""){
      const storedUserType = localStorage.getItem('userType');
      toast.success("You already logged in");
      if (storedUserType === 'student') {
        navigate("/student-dashboard");
      } else if (storedUserType === 'teacher') {
        navigate("/teacher-dashboard");
      } else {
        navigate("/dashboard");
      }
    }
  }, []);

  return (
    <div className="login-main">
      <div className="login-left">
        <AnimatedCharacter showPassword={showPassword} />
      </div>
      <div className="login-right">
        <div className="login-right-container">
          <img src="/cat.png" alt="Cat" className="cat-image" />
          <button className="back-button" onClick={() => navigate('/')}>Back</button>
          <div className="login-logo">
            <img src={Logo} alt="" />
          </div>
          <div className="login-center">
            <h2>Welcome back!</h2>
            <p>Please enter your details</p>
            <form onSubmit={handleLoginSubmit}>
              <select name="userType" value={userType} onChange={(e) => setUserType(e.target.value)} style={{width: '100%', padding: '16px', marginBottom: '16px', border: '0px', borderBottom: '1px solid black', outline: 'none', boxSizing: 'border-box'}}>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>
              <input type={userType === 'student' ? 'email' : 'text'} placeholder={userType === 'student' ? 'Email' : 'User ID'} name="email" />
              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                />
                {showPassword ? (
                  <FaEyeSlash
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                ) : (
                  <FaEye
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                )}
              </div>

              <div className="login-center-options">
                <div className="remember-div">
                  <input type="checkbox" id="remember-checkbox" />
                  <label htmlFor="remember-checkbox">
                    Remember for 30 days
                  </label>
                </div>
                <a href="#" className="forgot-pass-link">
                  Forgot password?
                </a>
              </div>
              <div className="login-center-buttons">
                <button type="submit">Log In</button>
                <button type="submit">
                  <img src={GoogleSvg} alt="" />
                  Log In with Google
                </button>
              </div>
            </form>
          </div>

          <p className="login-bottom-p">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

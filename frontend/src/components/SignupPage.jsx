import React, { useEffect, useState } from "react";
import Logo from "../images/logo.png";
import GoogleSvg from "../images/icons8-google.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import "./SignupPage.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import AnimatedCharacter from "./AnimatedCharacter";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [stream, setStream] = useState('');
  const navigate = useNavigate();
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("auth")) || ""
  );

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    let name = e.target.name.value.trim();
    let lastname = e.target.lastname.value.trim();
    let email = e.target.email.value.trim();
    let password = e.target.password.value;
    let confirmPassword = e.target.confirmPassword.value;

    if (
      name &&
      lastname &&
      email &&
      phone &&
      selectedClass &&
      password &&
      confirmPassword &&
      (selectedClass !== '11' && selectedClass !== '12' || stream)
    ) {
      if (password === confirmPassword) {
        const formData = {
          username: `${name} ${lastname}`,
          email,
          password,
        };

        try {
          const response = await axios.post(
            "http://localhost:3000/api/v1/register",
            formData
          );
          toast.success("Registration successful");
          navigate("/login");
        } catch (err) {
          toast.error(err.message);
        }
      } else {
        toast.error("Passwords don't match");
      }
    } else {
      toast.error("Please fill all inputs");
    }
  };

  useEffect(() => {
    if (token !== "") {
      toast.success("You are already logged in");
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="register-main">
      {/* LEFT SIDE - ANIMATED CHARACTER */}
      <div className="register-left">
        <AnimatedCharacter showPassword={showPassword} />
      </div>

      {/* RIGHT SIDE - SIGNUP FORM */}
      <div className="register-right">
        <div className="register-right-container">
          <img src="/cat.png" alt="Cat" className="cat-image" />
          <button className="back-button" onClick={() => navigate('/')}>Back</button>
          <div className="register-logo">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="register-center">
            <h2>Welcome to SHIKSHA!</h2>
            <p>Please enter your details</p>
            <form onSubmit={handleRegisterSubmit}>
              <input type="text" placeholder="Name" name="name" required />
              <input
                type="text"
                placeholder="Lastname"
                name="lastname"
                required
              />
              <input type="email" placeholder="Email" name="email" required />
              <input type="tel" placeholder="Phone No." name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              <select name="class" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} required style={{width: '100%', padding: '16px', marginBottom: '16px', border: '0px', borderBottom: '1px solid black', outline: 'none', boxSizing: 'border-box'}}>
                <option value="">Select Class</option>
                <option value="8">Class 8</option>
                <option value="9">Class 9</option>
                <option value="10">Class 10</option>
                <option value="11">Class 11</option>
                <option value="12">Class 12</option>
              </select>
              {(selectedClass === '11' || selectedClass === '12') && (
                <select name="stream" value={stream} onChange={(e) => setStream(e.target.value)} required style={{width: '100%', padding: '16px', marginBottom: '16px', border: '0px', borderBottom: '1px solid black', outline: 'none', boxSizing: 'border-box'}}>
                  <option value="">Select Stream</option>
                  <option value="science">Science</option>
                  <option value="arts">Arts</option>
                  <option value="commerce">Commerce</option>
                </select>
              )}
              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  required
                />
                {showPassword ? (
                  <FaEyeSlash
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <FaEye onClick={() => setShowPassword(!showPassword)} />
                )}
              </div>
              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  required
                />
                {showPassword ? (
                  <FaEyeSlash
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <FaEye onClick={() => setShowPassword(!showPassword)} />
                )}
              </div>
              <div className="register-center-buttons">
                <button type="submit">Sign Up</button>
                <button type="submit">
                  <img src={GoogleSvg} alt="Google" />
                  Sign Up with Google
                </button>
              </div>
            </form>
          </div>
          <p className="register-bottom-p">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

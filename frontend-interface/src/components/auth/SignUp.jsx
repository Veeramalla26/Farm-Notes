import React, { useState } from "react";
import "./signup.scss";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../../serviceApis/loginapi";
import logo from "../../assets/FarmNotes.png";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = async () => {
    const { userName, email, password, confirmPassword } = formData;
    if (!userName || !email || !password || !confirmPassword) {
      setError("Please fill all the fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const userData = await signUp({
        userName,
        email,
        password,
        confirmPassword,
      });
      console.log("user->", userData);
      navigate("/login");
    } catch (error) {
      console.error("Error signing up:", error);
      setError("Error signing up. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="log-form">
        <img src={logo} alt="Logo" className="logo" />
        <h4>Create an account</h4>
        <form>
          <input
            type="text"
            name="userName"
            title="UserName"
            placeholder="UserName"
            value={formData.userName}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            title="Email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            title="Password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmPassword"
            title="Confirm Password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {error && <p className="text-danger">{error}</p>}
          <button type="button" className="btn" onClick={handleSignUp}>
            Sign Up
          </button>
          <Link to="/login" className="forgot">
            Already have an account?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

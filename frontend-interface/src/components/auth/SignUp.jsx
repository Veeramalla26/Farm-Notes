import React from "react";
import "./auth.scss";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div>
      <div class="log-form">
        <h2>Create an account</h2>
        <form>
          <input type="text" title="Name" placeholder="Name" />
          <input type="email" title="Email" placeholder="Email" />

          <input type="password" title="password" placeholder="Password" />
          <input
            type="text"
            title="confirmPassword"
            placeholder="Confirm Password"
          />
          <button type="submit" class="btn">
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

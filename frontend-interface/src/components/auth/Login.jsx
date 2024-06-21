import React from "react";
import { postLogin } from "../../serviceApis/loginapi";
import "./auth.scss";
import { Link } from "react-router-dom";

const Login = () => {
  const fetchUserData = async () => {
    try {
      const userData = await postLogin();
      //   setUser(userData);
      console.log("user->", userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  return (
    <div>
      <div class="log-form">
        <h2>Login to your account</h2>
        <form>
          <input type="text" title="username" placeholder="User Name" />
          <input type="password" title="username" placeholder="Password" />
          <button type="submit" class="btn">
            Login
          </button>

          <Link to="/signup" className="forgot">
            Create an Account?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;

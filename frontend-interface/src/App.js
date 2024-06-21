// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
// import Login from "./pages/login/Login";
// import SignUp from "./pages/signup/SignUp";

const App = () => {
  const login = false;
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {login ? (
            <Route path="/" element={<Navigate to="/dashboard" />} />
          ) : (
            <Route path="/" element={<Navigate to="/login" />} />
          )}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <div>Dash</div>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

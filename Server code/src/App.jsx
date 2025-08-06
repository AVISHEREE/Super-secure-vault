import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
const token = localStorage.getItem("token");
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />
        {/* <Route path="/dashboard" element={} /> */}
        <Route
          path="/login"
          element={token ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={token ? <Navigate to="/" /> : <Signup />}
        />
      </Routes>
    </Router>
  );
}

export default App;

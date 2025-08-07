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
import Document from "./pages/Document";
import About from "./pages/AboutMe";
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
        <Route path="/document" element={<Document />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;

import React from "react";
import Admin from "./Admin";
import Login from "./Login";
import Register from "./Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutMe from "./AboutMe";

const AppRouter = () => {

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
  };

 
  // Lógica de autenticación y estado de inicio de sesión

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin}  />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin"
          element={<Admin/>}
        />
        <Route path="/about" element={<AboutMe />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;

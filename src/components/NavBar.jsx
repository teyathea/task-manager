import React, { useState, useEffect, useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import "../styles/NavBar.css";

const NavBar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    setIsLoggedIn(!!currentUser);
  }, [location.pathname]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`navbar ${darkMode ? "dark" : ""}`}>
      <div className="navbar-logo">Task Manager</div>

      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      <div className={`nav-links ${menuOpen ? "show" : ""}`} onClick={closeMenu}>
        {!isHomePage && (
          <NavLink to="/" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            Home
          </NavLink>
        )}
        <NavLink to="/calendar-view" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          Calendar
        </NavLink>
        {!isLoggedIn && (
          <NavLink to="/login" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            Login
          </NavLink>
        )}
        <NavLink to="/settings" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          Settings
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
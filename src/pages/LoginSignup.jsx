import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { getStoredUsers, storeUser, deleteUserFromStorage } from "../utility/localStorage";
import "../styles/LoginSignup.css";

const LoginSignup = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [showUserList, setShowUserList] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    let storedUsers = getStoredUsers();

    if (isSignup) {
      if (!formData.username || !formData.password || !formData.confirmPassword) {
        setError("All fields are required!");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match!");
        return;
      }
      if (Object.keys(storedUsers).length >= 4) {
        setShowUserList(true);
        return;
      }
      if (storedUsers[formData.username]) {
        setError("Username already exists!");
        return;
      }

      storeUser({ username: formData.username, password: formData.password });
      setFormData({ username: "", password: "", confirmPassword: "" });
      dispatch({ type: "LOGIN", payload: { username: formData.username } });
      navigate("/");
    } else {
      if (!formData.username || !formData.password) {
        setError("Please enter both username and password.");
        return;
      }
      if (!storedUsers[formData.username] || storedUsers[formData.username].password !== formData.password) {
        setError("Invalid username or password!");
        return;
      }

      setFormData({ username: "", password: "" });
      dispatch({ type: "LOGIN", payload: { username: formData.username } });
      navigate("/");
    }
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setError("");
    setFormData({ username: "", password: "", confirmPassword: "" });
  };

  const deleteUser = (username) => {
    deleteUserFromStorage(username);
    setShowUserList(false);
  };

  return (
    <div className="auth-container">
      <h2>{isSignup ? "Sign Up" : "Login"}</h2>
      {error && <p className="error-text">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        {isSignup && (
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
        )}
        <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>
      </form>
      <p className="toggle-text">
        {isSignup ? "Already have an account?" : "Don't have an account?"} <span onClick={toggleMode}>{isSignup ? "Login" : "Sign Up"}</span>
      </p>

      {/* Floating User List - Only shows when max users reached */}
      {showUserList && (
        <div className="floating-user-list show">
          <h3>Account Limit Reached</h3>
          <p>Delete an account to create a new one.</p>
          <ul>
            {Object.keys(getStoredUsers() || {}).map((user) => (
              <li key={user}>
                {user} <button className="delete-btn" onClick={() => deleteUser(user)}>✖</button>
              </li>
            ))}
          </ul>
          <button className="cancel-btn" onClick={() => setShowUserList(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default LoginSignup;
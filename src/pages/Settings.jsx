import React, { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import "../styles/Settings.css";

const Settings = () => {
  const currentUser = localStorage.getItem("currentUser");
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  const getStoredSetting = (key, defaultValue) => {
    if (!currentUser) return defaultValue;
    const userSettings = JSON.parse(localStorage.getItem(`users.${currentUser}`)) || {};
    return userSettings[key] ?? defaultValue;
  };

  const [notifications, setNotifications] = useState(() => getStoredSetting("notifications", { taskList: false, dueDate: false }));

  const saveSetting = (key, value) => {
    if (!currentUser) return;
    const userSettings = JSON.parse(localStorage.getItem(`users.${currentUser}`)) || {};
    userSettings[key] = value;
    localStorage.setItem(`users.${currentUser}`, JSON.stringify(userSettings));
  };

  const handleNotificationChange = (type) => {
    setNotifications((prev) => {
      const updatedNotifications = { ...prev, [type]: !prev[type] };
      saveSetting("notifications", updatedNotifications);
      return updatedNotifications;
    });
  };

  return (
    <div className="settings-container">
      <h2 className="settings-title">Settings</h2>

      <div className="current-user">
        {currentUser ? (
          <p>Logged in as: <strong>{currentUser}</strong></p>
        ) : (
          <p className="no-user">No user is logged in.</p>
        )}
      </div>

      <div className="settings-section">
        <div className="settings-option">
          <span>Dark Mode</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={darkMode}
              disabled={!currentUser}
              onChange={() => setDarkMode((prev) => !prev)}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      <div className="settings-section">
        <span className="section-title">Notification Reminder</span>
        <div className="notification-options">
          <div className="settings-option">
            <span>Task List</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={notifications.taskList}
                disabled={!currentUser}
                onChange={() => handleNotificationChange("taskList")}
              />
              <span className="slider"></span>
            </label>
          </div>
          <div className="settings-option">
            <span>Due Date</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={notifications.dueDate}
                disabled={!currentUser}
                onChange={() => handleNotificationChange("dueDate")}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>

      {currentUser && (
        <button className="logout-button" onClick={() => {
          localStorage.removeItem("currentUser");
          window.location.reload();
        }}>Logout</button>
      )}
    </div>
  );
};

export default Settings;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginSignup from './pages/LoginSignup';
import Settings from './pages/Settings';
import TaskList from './components/TaskList';
import CalendarView from './components/CalendarView';
import NavBar from './components/NavBar';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    // <ThemeProvider>
      <AuthProvider>
        <TaskProvider>
          <Router>
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/calendar-view" element={<CalendarView />} />
              <Route path="/tasks" element={<TaskList />} />
              <Route path="/login" element={<LoginSignup />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Router>
        </TaskProvider>
      </AuthProvider>
    // </ThemeProvider>
  );
}

export default App;

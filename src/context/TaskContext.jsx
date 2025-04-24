import React, { createContext, useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { getTasksForUser, storeTask, updateTask as updateStoredTask, removeTask as removeStoredTask } from "../utility/localStorage";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { user } = useContext(AuthContext) || { user: null };

  const [tasks, setTasks] = useState([]);
  const [urgentTasks, setUrgentTasks] = useState([]);

  // Load tasks when user changes
  useEffect(() => {
    if (user) {
      const storedTasks = getTasksForUser(user);
      setTasks(storedTasks);
    }
  }, [user]);

  // Add new task
  const addTask = (task) => {
    setTasks((prevTasks) => {
      const updated = [...prevTasks, task];
      storeTask(user, task);
      return updated;
    });
  };

  // Update a task
  const updateTask = (updatedTask) => {
    setTasks((prevTasks) => {
      const updated = prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      );
      updateStoredTask(user, updatedTask);
      return updated;
    });
  };

  // Remove a task
  const removeTask = (taskId) => {
    setTasks((prevTasks) => {
      const updated = prevTasks.filter((task) => task.id !== taskId);
      removeStoredTask(user, taskId);
      return updated;
    });
  };

  // Urgent task calculation
  useEffect(() => {
    const today = new Date();
    const threeDaysLater = new Date();
    threeDaysLater.setDate(today.getDate() + 3);

    const filtered = tasks.filter((task) => {
      const due = new Date(task.dueDate);
      return due >= today && due <= threeDaysLater;
    });

    setUrgentTasks(filtered);
  }, [tasks]);

  return (
    <TaskContext.Provider value={{ tasks, urgentTasks, addTask, updateTask, removeTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
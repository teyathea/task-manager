import React, { useContext, useState } from "react";
import TaskContext from "../context/TaskContext";
import TaskDetailsModal from "./TaskDetailsModal";
import "../styles/Task.css";

const TaskList = () => {
  const { tasks, removeTask, updateTask } = useContext(TaskContext);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleComplete = (task) => {
    updateTask({ ...task, completed: !task.completed });
  };

  return (
    <div>
      <h2 className="task-list-title">Task List</h2>
      {tasks.length === 0 ? (
        <p className="no-tasks-message">No tasks available.</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`task-item ${task.completed ? "completed" : ""}`}
              onClick={() => setSelectedTask(task)}
            >
              <div className="task-content">
                <div>
                  <h3 className="task-title">{task.title}</h3>
                  <p className="task-description">
                    {task.description || "No description"}
                  </p>
                  <p className="task-details">
                    <span className="due-priority">Due:</span> {task.dueDate}
                    {isDueToday(task.dueDate) && (
                      <span className="ml-2 text-red-600 font-semibold">📌 Today</span>
                    )}
                    {" | "}
                    <span className="due-priority">Priority:</span>
                    <span className={`priority-label ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* MODAL FOR TASK DETAILS */}
      {selectedTask && (
        <TaskDetailsModal
          tasks={[selectedTask]}
          date={selectedTask.dueDate}
          onClose={() => setSelectedTask(null)}
          onEdit={(editedTask) => {
            updateTask(editedTask);
            setSelectedTask(null);
          }}
          onDelete={(taskId) => {
            removeTask(taskId);
            setSelectedTask(null);
          }}
          onComplete={(taskId) => {
            handleComplete(tasks.find((task) => task.id === taskId));
          }}
        />
      )}
    </div>
  );
};

// Function to set priority color
const getPriorityColor = (priority) => {
  switch (priority) {
    case "High":
      return "text-red-600";
    case "Medium":
      return "text-yellow-600";
    case "Low":
      return "text-green-600";
    default:
      return "text-gray-500";
  }
};

// Function to check if task is due today
const isDueToday = (dateString) => {
  const today = new Date();
  const date = new Date(dateString);
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
};

export default TaskList;
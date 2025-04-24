import React, { useContext } from "react";
import TaskContext from "../context/TaskContext";

const UrgentTasks = () => {
  const { tasks } = useContext(TaskContext);
  const today = normalizeDate(new Date());

  const urgentTasks = tasks.filter((task) => {
    const taskDueDate = normalizeDate(new Date(task.dueDate));
    const diffInDays = (taskDueDate - today) / (1000 * 60 * 60 * 24);
    return diffInDays >= 0 && diffInDays <= 3; // Tasks due within 3 days
  });

  return (
    <div className="urgent-tasks-container">
      <h2 className="urgent-title">Urgent Tasks</h2>
      <div className="urgent-tasks-box">
        {urgentTasks.length === 0 ? (
          <p className="no-tasks-message">No urgent tasks.</p>
        ) : (
          <table className="urgent-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Due Date</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {urgentTasks.map((task) => {
                const isToday = normalizeDate(new Date(task.dueDate)).getTime() === today.getTime();

                return (
                  <tr key={task.id} className={isToday ? "today-task" : ""}>
                    <td>{isToday ? "📌 " : ""}{task.title}</td>
                    <td>{task.dueDate}</td>
                    <td className={getPriorityColor(task.priority)}>{task.priority}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

// Normalize date to compare only date part (ignores time)
const normalizeDate = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

// Priority-based styling
const getPriorityColor = (priority) => {
  switch (priority.toLowerCase()) {
    case "high":
      return "high-priority";
    case "medium":
      return "medium-priority";
    case "low":
      return "low-priority";
    default:
      return "";
  }
};

export default UrgentTasks;
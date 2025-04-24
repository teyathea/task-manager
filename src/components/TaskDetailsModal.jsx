import React, { useState } from "react";
import "../styles/TaskDetailsModal.css";

const TaskDetailsModal = ({
  tasks = [],
  date,
  onClose,
  onEdit,
  onDelete,
  onComplete,
}) => {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState(null);

  if (!tasks || tasks.length === 0) return null;

  const handleEditClick = (task) => {
    setEditingTaskId(task.id);
    setEditedTask({ ...task });
  };

  const handleSave = () => {
    if (onEdit && editedTask) {
      onEdit(editedTask);
    }
    setEditingTaskId(null);
    setEditedTask(null);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          X
        </button>
        <h2>Tasks for {date}</h2>

        <ul className="task-list">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`task-item priority-${task.priority} ${task.completed ? "completed" : ""}`}
            >
              {editingTaskId === task.id ? (
                <div className="edit-form">
                  <label>Title:</label>
                  <input
                    type="text"
                    value={editedTask.title}
                    onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                  />

                  <label>Description:</label>
                  <textarea
                    value={editedTask.description}
                    onChange={(e) =>
                      setEditedTask({ ...editedTask, description: e.target.value })
                    }
                  />

                  <label>Due Date:</label>
                  <input
                    type="date"
                    value={editedTask.dueDate}
                    onChange={(e) =>
                      setEditedTask({ ...editedTask, dueDate: e.target.value })
                    }
                  />

                  <label>Priority:</label>
                  <select
                    value={editedTask.priority}
                    onChange={(e) =>
                      setEditedTask({ ...editedTask, priority: e.target.value })
                    }
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              ) : (
                <>
                  <span className="task-title">{task.title}</span>
                  <p className="task-description">{task.description}</p>
                </>
              )}

              <div className="task-actions">
                <button
                  className="complete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onComplete) onComplete(task.id);
                  }}
                >
                  {task.completed ? "❌" : "✔"}
                </button>
                {editingTaskId === task.id ? (
                  <>
                    <button className="save-btn" onClick={handleSave}>
                      Save
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={() => setEditingTaskId(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button className="edit-btn" onClick={() => handleEditClick(task)}>
                    ✏️
                  </button>
                )}
                <button
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onDelete) onDelete(task.id);
                  }}
                >
                  🗑️
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskDetailsModal;
import React, { useState, useContext } from "react";
import TaskContext from "../context/TaskContext";

const TaskForm = () => {
  const { addTask } = useContext(TaskContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !dueDate || !priority) {
      alert("Title, Due Date, and Priority are required.");
      return;
    }

    const newTask = {
      id: Date.now(),
      title,
      description,
      dueDate,
      priority,
    };

    addTask(newTask);

    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("");
  };

  return (
    <div className="task-form-container">
      <h2>Add New Task</h2>
      <div className="task-form-box">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Task Title</label>
            <input
              type="text"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
  
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Description (Optional)</label>
            <textarea
              placeholder="Enter task details"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
            />
          </div>
  
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>
  
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              required
            >
              <option value="" disabled>-- Select Priority --</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
  
          <button type="submit">Add Task</button>
  
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
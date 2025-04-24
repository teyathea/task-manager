import React, { useContext, useState } from "react";
import TaskContext from "../context/TaskContext";
import TaskDetailsModal from "./TaskDetailsModal";
import "../styles/Calendar.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const CalendarView = () => {
  const { tasks, updateTask, removeTask } = useContext(TaskContext);
  const currentDate = new Date();
  const [month, setMonth] = useState(currentDate.getMonth());
  const [year, setYear] = useState(currentDate.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState([]);

  const changeMonth = (direction) => {
    setMonth((prev) => {
      let newMonth = direction === "prev" ? prev - 1 : prev + 1;
      if (newMonth < 0) {
        setYear((prevYear) => prevYear - 1);
        return 11;
      } else if (newMonth > 11) {
        setYear((prevYear) => prevYear + 1);
        return 0;
      }
      return newMonth;
    });
  };

  const openTaskModal = (date, dayTasks) => {
    setSelectedDate(date);
    setSelectedTasks(dayTasks);
  };

  const closeTaskModal = () => {
    setSelectedDate(null);
    setSelectedTasks([]);
  };

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <FaChevronLeft className="nav-arrow left" onClick={() => changeMonth("prev")} />
        <h2 className="calendar-title">
          {new Date(year, month).toLocaleString("default", { month: "long" })} {year}
        </h2>
        <FaChevronRight className="nav-arrow right" onClick={() => changeMonth("next")} />
      </div>

      {/* Weekday Headers */}
      <div className="calendar-weekdays">
        {weekdays.map((day) => (
          <div key={day} className="weekday">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="calendar-grid">
        {/* Empty cells before the first day */}
        {Array.from({ length: firstDay }).map((_, index) => (
          <div key={`empty-${index}`} className="calendar-day empty"></div>
        ))}

        {dates.map((day) => {
          const formattedDate = `${year}-${(month + 1).toString().padStart(2, "0")}-${day
            .toString()
            .padStart(2, "0")}`;
          const dayTasks = tasks.filter((task) => task.dueDate === formattedDate);

          return (
            <div
              key={day}
              className={`calendar-day ${dayTasks.length ? "task-highlight" : ""}`}
              onClick={() => openTaskModal(formattedDate, dayTasks)}
            >
              <span>{day}</span>
              {dayTasks.map((task, index) => (
                <p key={index} className="task-name">{task.title}</p>
              ))}
            </div>
          );
        })}
      </div>

      {selectedDate && (
        <TaskDetailsModal
          tasks={selectedTasks}
          date={selectedDate}
          onClose={closeTaskModal}
          onEdit={updateTask}
          onDelete={removeTask}
          onComplete={(taskId) => {
            const taskToUpdate = tasks.find((task) => task.id === taskId);
            if (taskToUpdate) {
              updateTask({ ...taskToUpdate, completed: !taskToUpdate.completed });
            }
          }}
        />
      )}
    </div>
  );
};

export default CalendarView;
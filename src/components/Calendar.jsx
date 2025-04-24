import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import TaskContext from "../context/TaskContext";
import "../styles/Calendar.css";

const Calendar = () => {
  const { tasks } = useContext(TaskContext);
  const navigate = useNavigate();

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handleCalendarClick = () => {
    navigate("/calendar-view");
  };

  return (
    <div className="calendar-container" onClick={handleCalendarClick} style={{ cursor: "pointer" }}>
      <h2 className="calendar-title">March {year}</h2>

      {/* Weekday Labels */}
      <div className="calendar-weekdays">
        {weekdays.map((day) => (
          <div key={day} className="weekday">
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="calendar-grid">
        {/* Empty cells for alignment */}
        {Array.from({ length: firstDay }).map((_, index) => (
          <div key={`empty-${index}`} className="calendar-day empty"></div>
        ))}

        {dates.map((day) => {
          const formattedDate = `${year}-${(month + 1).toString().padStart(2, "0")}-${day
            .toString()
            .padStart(2, "0")}`;
          const hasTask = tasks.some((task) => task.dueDate === formattedDate);

          return (
            <div key={day} className={`calendar-day ${hasTask ? "task-highlight" : ""}`}>
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;

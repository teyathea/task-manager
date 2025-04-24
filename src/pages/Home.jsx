import React from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import UrgentTasks from "../components/UrgentTasks";
import Calendar from "../components/Calendar";
import NavBar from "../components/NavBar";
import "../styles/Task.css";
import "../styles/Home.css";
import "../styles/Calendar.css";
import "../styles/Global.css";

const Home = () => {
  return (
    <div className="container">
      {/* Navigation Bar */}
      <NavBar />
      {/* <h1 className="title">Task & Memo Manager</h1> */}

      {/* Main Task Section */}
      <div className="task-container">
        <div className="task-box">
          <TaskForm />
        </div>

        <div className="task-box">
          <TaskList />
        </div>

        <div className="task-box">
          <UrgentTasks />
        </div>
      </div>

      {/* Calendar Section */}
      <div className="calendar-box">
        <h2 className="box-title">Calendar</h2>
        <Calendar />
      </div>
    </div>
  );
};

export default Home;
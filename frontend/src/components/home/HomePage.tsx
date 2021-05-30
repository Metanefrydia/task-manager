import React from "react";
// @ts-ignore
import ReactHorizontalDatePicker from "react-horizontal-strip-datepicker";
import "react-horizontal-strip-datepicker/dist/ReactHorizontalDatePicker.css";
import "./HomePage.css";
import TaskList from "../taskList/taskList";

interface State {}

export default function HomePage() {
  const [state, setState] = React.useState<State>({});

  return (
    <div>
      <div className="date-container">
        <ReactHorizontalDatePicker
          // selectedDay={5}
          enableScroll={true}
          enableDays={180}
          enableDaysBefore={1}
        />
      </div>
      <div className="date-container">
        <TaskList />
      </div>
    </div>
  );
}
